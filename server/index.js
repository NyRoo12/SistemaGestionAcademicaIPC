import dotenv from 'dotenv';
dotenv.config();

import app from "./app.js";
import { sequelize } from "./config/db.js";

async function main() {
  await sequelize.sync({ force: false });

  const ip = process.env.IP || '146.83.216.166';
  const port = process.env.PORT || 4006;

  app.listen(port, () => {
    console.log(`Server is running on http://${ip}:${port}`);
  });
}

main();