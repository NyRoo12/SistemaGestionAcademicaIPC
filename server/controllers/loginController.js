const loginModel = require("../models/loginModel");
const bcrypt = require("bcryptjs");

exports.login = (req, res) => {
  const { password } = req.body;

  // Consultar la base de datos para obtener el hash de la contraseña
  loginModel.getUserPassword((err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error de servidor' });
    }

    if (result.length > 0) {
      const storedHashedPassword = result[0].hashed_password;

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
  });
};
