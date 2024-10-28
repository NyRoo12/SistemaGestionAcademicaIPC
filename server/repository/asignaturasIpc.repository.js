import { AsignaturasIPC } from "../models/AsignaturasIPC.js";

export async function getAsignaturasIPC_(){
    try {
        const asignaturasIpc = await AsignaturasIPC.findAll();
        return asignaturasIpc
    } catch (error) {
        throw new Error("Sucedio un error......")
    }

}