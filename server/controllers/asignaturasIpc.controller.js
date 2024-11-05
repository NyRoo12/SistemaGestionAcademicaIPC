import {getAsignaturasIPC_} from "../repository/asignaturasIpc.repository.js";

export async function getAsignaturasIPC(req, res) {
  getAsignaturasIPC_().then(data => {
    res.status(200).json({status : true, data : data})
  }, error => {
    res.status(400).json({status : false, error : error.message })
  })
}

