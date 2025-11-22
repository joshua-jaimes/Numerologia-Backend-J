import pool from '../config/db.js';

export async function crearLectura({ usuario_id, tipo, contenido }) {
  const sql = 'INSERT INTO lecturas (usuario_id, tipo, contenido) VALUES (?, ?, ?)';
  const [result] = await pool.execute(sql, [usuario_id, tipo, contenido]);
  return { id: result.insertId, usuario_id, tipo, contenido };
}

export async function obtenerLecturasPorUsuario(usuario_id) {
  const [rows] = await pool.execute('SELECT * FROM lecturas WHERE usuario_id = ? ORDER BY fecha_lectura DESC', [usuario_id]);
  return rows;
}

export async function obtenerLecturaPorId(id) {
  const [rows] = await pool.execute('SELECT * FROM lecturas WHERE id = ?', [id]);
  return rows[0];
}

export async function existeLecturaPrincipal(usuario_id) {
  const [rows] = await pool.execute('SELECT id FROM lecturas WHERE usuario_id = ? AND tipo = "principal" LIMIT 1', [usuario_id]);
  return rows.length > 0;
}
