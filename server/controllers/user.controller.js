import {getUserPassword_} from "../repository/user.repository.js";
import bcrypt from "bcryptjs";

export async function getUserPassword(req, res) {
  const { password } = req.body;

  getUserPassword_().then(data => {
    if (data.length > 0) {
      const storedHashedPassword = data[0].hashed_password;

      // Comparar la contraseña ingresada con el hash almacenado
      bcrypt.compare(password, storedHashedPassword, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ error: 'Error de servidor' });
        }

        if (isMatch) {
          // Contraseña correcta
          return res.json({ success: true, message: 'Login exitoso' });
        } else {
          // Contraseña incorrecta
          return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
      });
    } else {
      // Usuario no encontrado
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
  }, error => {
    res.status(400).json({status : false, error : error.message })
  })
}