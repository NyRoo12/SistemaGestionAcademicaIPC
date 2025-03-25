import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'config.json');

export const saveConfig_ = (configData) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(configPath, JSON.stringify(configData, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};