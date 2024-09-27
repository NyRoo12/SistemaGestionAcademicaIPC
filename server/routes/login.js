const express = require('express');
const bcrypt = require('bcryptjs'); // Usar bcryptjs para comparar contraseñas
const router = express.Router(); // Crea un router
const db = require('../config/db'); // Asegúrate de que el archivo db.js esté bien configurado para la conexión a la base de datos

// Ruta de login
router.post('/login', (req, res) => {
    const { password } = req.body;
  
    // Obtener el hash de la contraseña almacenado en la base de datos
    const sql = 'SELECT hashed_password FROM user LIMIT 1'; // Cambia la consulta según tu estructura
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error de servidor' });
      }
  
      if (result.length > 0) {
        const storedHashedPassword = result[0].hashed_password;
  
        // Comparar la contraseña ingresada con la almacenada
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
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
    });
});

// Exportar el router
module.exports = router;