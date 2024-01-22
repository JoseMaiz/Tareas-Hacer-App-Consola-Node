const fs = require("fs")

const archivo = "./db/data.json";

const guardarDB = (data)=>{
    
    //*Mediante JSON.stringify se convierte los objetos literarios o class en un array de un jason
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDB = ()=>{
    //*fs.existsSync esto para verificar la existencia de un archivo
    if(!fs.existsSync(archivo)){
        return null
    }
    //*fs.existsSync este comando es para poder leer un archivo que se necesite extraer datos
    const info = fs.readFileSync(archivo,{encoding: "utf-8"});
    const data = JSON.parse(info);
    return data;
}


module.exports = {
    guardarDB,
    leerDB,
}
