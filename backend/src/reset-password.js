// Сброс/установка пароля администратора.
//   NEW_PASSWORD='новый-пароль' node src/reset-password.js
//   (необязательно) RESET_EMAIL='admin@alladin.club' — по умолчанию берётся ADMIN_EMAIL из .env
import bcrypt from "bcryptjs";
import { pool } from "./db.js";
import { config } from "./config.js";

async function main() {
  const email = process.env.RESET_EMAIL || config.admin.email;
  const password = process.env.NEW_PASSWORD || process.argv[2];
  if (!password) {
    console.error("Укажи новый пароль:  NEW_PASSWORD='новый-пароль' node src/reset-password.js");
    process.exit(1);
  }
  const hash = await bcrypt.hash(password, 10);
  const upd = await pool.query(
    "UPDATE admin_users SET password_hash=$1 WHERE email=$2 RETURNING email",
    [hash, email]
  );
  if (upd.rowCount === 0) {
    await pool.query(
      "INSERT INTO admin_users (email, password_hash, name) VALUES ($1,$2,$3)",
      [email, hash, "Администратор"]
    );
    console.log(`✓ Администратор создан: ${email}`);
  } else {
    console.log(`✓ Пароль обновлён для: ${email}`);
  }
  await pool.end();
}

main().catch((err) => {
  console.error("Ошибка сброса пароля:", err.message);
  process.exit(1);
});
