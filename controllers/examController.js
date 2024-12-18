import Subject from '../models/subjects.js';
import Exam from '../models/exams.js'
import mongoose from 'mongoose';
import * as fs from 'fs';
import latex from 'node-latex';




// Método de pureba del controlador exam //TODO: Limpiar
export const testExam = (req,res) => {
    return res.status(200).send({
        message: "Mensaje desde el controlador de Exams"
    });
};

// Método para crear un examen.
export const createExam = async (req, res) => {
    try {
        // Obtener los datos de la petición
        let params = req.body;

        // Obtener el usuario que crea el examen desde el token
        let userId = req.user.userId;

        // Validar los datos obtenidos (que los datos obligatorios existan) // subject_id se lo agregamos más adelante
        if( !params.term || !params.subject_id){
            return res.status(400).json({
                status: "error",
                message: "Faltan datos por enviar"
            })
        }

        // Validamos que la materia sea válida
        const examSubject = await Subject.findById(params.subject_id);
        if( !examSubject){
            return res.status(400).send({
                status: "error",
                message: "La materia no está en la base de datos."
            })
        }


        // Crear los correspondientes objectsId para mongo
        // para el userId:
        const userObjectId = new mongoose.Types.ObjectId(userId);
        // para el subject:
        const subjectObjectId = new mongoose.Types.ObjectId(params.subject_id);

        // Cambiamos los ids por objectIds en los parámetros para crear el objeto Exam
        params.user_id = userObjectId;
        params.subject_id = subjectObjectId;


        // Crear el objeto del examen con los datos  que validamos
        let exam_to_save = new Exam(params);

        // guardar el examen en bd
        await exam_to_save.save();

        // Devolver el examen creado
        return res.status(201).json({
            status: "created",
            message: "Examen creado con éxito.",
            exam_to_save
        })


    } catch (error) {
        console.log("Error al crear el examen: ", error);
        return res.status(500).send({
            status: "error",
            message: `Error al crear el examen: ${error}:   ${error.reason}`
        })
    }
};

// Método para obtener un examen
export const getExam = async (req, res ) => {
    try {

        // Obtener el id del examen desde la url
        const examId = req.params.id;

        // Validar que llgue el id del examen en la url
        if(!examId){
            return res.status(400).send({
                status: "error",
                message: "Falta el id del examen en la url."
            })
        }

        // Buscamos el examen en la BD y excluimos los datos que no queremos mostrar
        const examFound = await Exam.findById(examId).select(' -__v');

        // Verificar si la pregunta buscada existe
        if(!examFound){
            return res.status(404).send({
                status: "success",
                message: "Examen no encontrado"
            });
        }

        // Devolver la información del examen
        return res.status(200).json({
            status: "success",
            exam: examFound
        })


    } catch (error) {
        console.log("Error al obtener el examen: "  , error);
        return res.status(500).send({
            status: "error",
            message: `Error al obtener el examen: ${error}:   ${error.reason}`
        })
    }
}

// Método opara obtener todos los exámenes
export const getAllExams = async (req,res) => {
    try {
        // Gestionar la paginación
        // 1. Configurar la página actual
        let page = req.params.page ? parseInt(req.params.page, 10) : 1;

        // 2. Configurar los items por página a mostrar
        let itemsPerPage = req.query.limit ? parseInt(req.query.limit, 10) : 4;

        // Realizar consulta paginada
        const options = {
            page: page,
            limit: itemsPerPage,
            select: '-__v'
        };
        const exams = await Exam.paginate({}, options);

        // Si no existen exámenes en la bd disponibles
        if(!exams || exams.docs.length === 0){
            return res.status(404).send({
                status: "error",
                message: "No existen exámenes en la base de datos"
            });
        }

        // Devolver los exámenes paginados
        return res.status(200).json({
            status: "success",
            exams: exams.docs,
            totalDocs: exams.totalDocs,
            totalPages: exams.totalPages,
            cancelIdleCallbackCurrentPage: exams.page
        })

    } catch (error) {
        console.log("Error al obtener los exámenes: ", error);
        return res.status(500).send({
            status: "error",
            message: `Error al obtener los exámenes: ${error}:   ${error.reason}`
        })
    }
}

// Método para obtener un listado de exámenes mediante filtro TODO

// Método para modificar un examen TODO
    // Deben afectarse las tablas exams, exam_questions

// Método para eliminar un examen TODO
    // Deben afectarse las tablas exams, exam_questions

// Método para eliminar un listado de examenes TODO
    // Deben afectarse las tablas exams, exam_questions

// Método para generar un examen en pdf y guardarlo en el servidor TODO
export const generateExam = async (req,res) => {
    try {

        //obtenemos listado de preguntas del request
        const questionsRequest = req.body.body;
        const questions = JSON.parse(questionsRequest);
        let stringQuestions = "";

        console.log("questions: " , questions);

        //leemos el archivo input para obtener el inicio del documento tex
        const contentFileInput = await fs.promises.readFile('template.tex',{ encoding: 'utf8'});

        // agregamos el encabezado a la variable stringQuestions
        stringQuestions +=  contentFileInput;

        // Agregamos cada pregunta al stringQuestions
        for(let i=0;i<questions.length;i++){
            console.log("question",i," ", questions[i]);
            stringQuestions += `\n \\question \n ${questions[i].content}`;
        }
        // cerramos el documento en la variable stringQuestions:
        stringQuestions += `\n \\end{questions} \n \\end{document}`;

        //console.log("questions:", stringQuestions);

        //Creamos el archivo input.tex para ser luego compilado
        fs.writeFile('input.tex',stringQuestions,function(err){
            if(err){
                return res.status(500).send({
                    status: "error",
                    message: "Error al escribir el archivo input.tex: " + err
                })
            };
            console.log('Archivo input.tex a ser compilado creado con éxito');
        });

        // Leemos el archivo input creado
        const input = fs.createReadStream('input.tex');
        // creamos el archivo output.pdf y compilamos input.tex en el
        const output = fs.createWriteStream("output.pdf");
        const pdf = latex(input);
        const outputCreated = pdf.pipe(output);

        outputCreated.on('finish', ()=> {
            return res.status(201).send({
                message: "success",
                message: "Examen creado correctamente"
            });
        })


        // retornamos mensaje de éxito:
        // return res.status(201).send({
        //     message: "Archivo creado exitosamente"
        // });

    } catch (error) {
        console.log("Error al generarel examen: ", error);
        return res.status(500).send({
            status: "error",
            message: `Error al generarel examen: ${error}:   ${error.reason}`
        })
    }
}

// Método para descargar un examen
export const downloadGeneratedExam = async (req,res) => {
    try {
        return res.download("C:/DWFSV3-270/exam-generator-backend/output.pdf");
    } catch (error) {
        console.log("Error al descargar el examen: ", error);
        return res.status(500).send({
            status: "error",
            message: `Error al descargar el examen: ${error}:   ${error.reason}`
        })
    }
}

// Método para eliminar un archivo de examen que fue generado
