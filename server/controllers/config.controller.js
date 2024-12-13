import { saveConfig_ } from '../repository/config.repository.js';

export const saveConfig = async (req, res) => {
  const configData = req.body;

  try {
    await saveConfig_(configData);
    res.status(200).json({ message: 'Configuración guardada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar la configuración', error });
  }
};
