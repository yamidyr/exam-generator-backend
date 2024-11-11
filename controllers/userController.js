import latex from 'node-latex';
import User from '../models/users.js';
import bcrypt from 'bcrypt';
import * as fs from 'fs';


// Método de pureba del controlador user  //TODO: Limpiar
export const testUser = (req,res) => {

    try {
          return res.download("C:/DWFSV3-270/exam-generator-backend/output.pdf");
      } catch (error) {
        console.log("Error al descargar el archivo: ", error)
        return res.status(500).send({
            message: "Error al descargar el archivo:"
        });
      }

    // try {

    //     function resolveAfter2Seconds(x) {
    //         const input = fs.createReadStream('input.tex')
    //         const output = fs.createWriteStream("output.pdf")
    //         const pdf = latex(input)
    //         pdf.pipe(output)
    //         return new Promise((resolve) => {
    //             setTimeout(() => {
    //             resolve(x);
    //             }, 2000);
    //         });
    //     }

    //     // async function wasThefileCreated() {
    //     //     let x = await resolveAfter2Seconds(10);
    //     //     console.log(x); // 10
    //     //     try {
    //     //         if(fs.accessSync('C:/DWFSV3-270/exam-generator-backend/output.pdf')) {
    //     //           return true;
    //     //         }
    //     //       } catch (e) {
    //     //         return false;
    //     //       }
    //     //   }
    //     // wasThefileCreated();

    //     async function f1() {
    //         let x = await resolveAfter2Seconds(10);
    //         console.log(x); // 10
    //       }

    //       f1();


    //     //pdf.on('error', err => console.error(err))
    //     //pdf.on('finish', () => console.log('PDF generated!'))

    //     return res.download("C:/DWFSV3-270/exam-generator-backend/output.pdf");

    // } catch (error) {
    //     console.log("Error: ", error);
    //     return "Error al enviar el pdf"
    // }

};

// Método de prueba para generar archivos:
export const generatePdfFile = (req,res) => {
    try {
        const input = fs.createReadStream('input.tex')
        const output = fs.createWriteStream("output.pdf")
        const pdf = latex(input)
        pdf.pipe(output)
        return res.status(200).send({
            message: "Archivo creado exitosamente"
        })
    } catch (error) {
        console.log("Error al generar el archivo: ", error)
        return res.status(500).send({
            message: "Error al generar el archivo:"
        })
    }
}

// Método de registro de usuarios TODO

// Método de Login ( Usar JWT ) TODO

// Método para obtener info de un usuario TODO

// Método para obtener un listado de usuarios TODO

// Método para actualizar los datos de un usuario TODO

// Método para subir foto de usuario TODO

// Método para mostrar imagen de usuario TODO

