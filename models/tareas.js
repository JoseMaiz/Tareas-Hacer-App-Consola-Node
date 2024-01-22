const Tarea = require("./tarea");
const colors = require("colors");

class Tareas{
    _listado = {};

    get listadoArr(){
        const listado = [];

        Object.keys(this._listado).forEach( key =>{
            const tarea =this._listado[key];
            listado.push(tarea);
        } )

        return listado
    }
    constructor(){
        this._listado= {};
    }
    borrarTareas(id = ""){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray (tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = ""){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto(){
        let index = 1;
        console.log();
        for (const tarea of this.listadoArr) {
            if (!tarea.completadoEn) {
                console.log(`${colors.green(index+".")} ${tarea.desc} :: ${"Pendiente".red}`);
            }else{
                console.log(`${colors.green(index+".")} ${tarea.desc} :: ${"Completado".green}`);
            }
            index++
            //*Otra manera de hacer esto es con el forEach
        }

    }

    listarPendientesCompletadas(completadas = true){
        let index = 1;
        console.log();
        this.listadoArr.forEach((tarea)=>{
            if (completadas) {
                if (tarea.completadoEn) {
                    console.log(`${colors.green(index+".")} ${tarea.desc} :: ${tarea.completadoEn.green}`);
                    index++
                }
            }else{
                if (!tarea.completadoEn){
                    console.log(`${colors.green(index+".")} ${tarea.desc} :: ${"Pendiente".red}`);
                    index++
                }
            }
        })
    }

    toggleCompletadas(ids = []){
        ids.forEach(id =>{

            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toLocaleDateString()
            }
        });

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}



module.exports = Tareas;