// Авторизация админки: JWT.
import jwt from "jsonwebtoken";
import { config } from "./config.js";

export function signToken(user) {
  return jwt.sign({ sub: user.id, email: user.email, name: user.name }, config.jwtSecret, {
    expiresIn: config.jwtExpires,
  });
}

// Express-middleware: требует валидный Bearer-токен.
export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Требуется авторизация" });
  try {
    req.user = jwt.verify(token, config.jwtSecret);
    next();
  } catch {
    return res.status(401).json({ error: "Недействительный или просроченный токен" });
  }
}
