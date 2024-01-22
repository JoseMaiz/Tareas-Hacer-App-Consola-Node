const colors = require("colors");
const { inquirerMenu, 
        inquirerPausa, 
        leerInput, 
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
// const { mostrarMenu, pausa } = require("./helpers/mensajes");


const main = async ()=>{
    let opt = "";
    const tareas = new Tareas();

    const tareasDB = leerDB();
    
    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case "1":
                const desc = await leerInput("Descripción:");
                tareas.crearTarea(desc);
            break;
            case "2":
                tareas.listadoCompleto();
                break;
            case "3": //*Listar completadas
                tareas.listarPendientesCompletadas();
                break;
            case "4": //*Listar pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case "5": //*Completado | Pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case "6": //*Borrar tareas
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== "0"){
                    const ok = await confirmar("¿Estas seguro?");
                    if(ok){
                        tareas.borrarTareas(id);
                        console.log("Tarea borrada");
                    }
                }
                break;
        }

        guardarDB(tareas.listadoArr);

        await inquirerPausa();
        
    } while (opt !== "0");

};
main();
