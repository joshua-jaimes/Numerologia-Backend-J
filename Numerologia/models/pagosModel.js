 import pool from '../config/db.js';


export async function obtenerPagos() {

    const obtener = await pool.query(
        'SELECT * FROM pagos'
    )
    return obtener;
    
}








export async function obtenerPagosId(usuario_id){
    const [obtener] = await pool.query(
        'SELECT * FROM pagos WHERE usuario_id = ?',[usuario_id]
    )
    return obtener;
}




export async function crearPago(usuario_id,{monto,fecha_pago}){

    const [crearPago] = await pool.query(
        'INSERT INTO pagos (usuario_id,monto,fecha_pago) VALUES (?,?,?)',[usuario_id,monto,fecha_pago]
    )
    return crearPago
}


 


export async function obtenerEstadoID(id){

    const pagoEstado = await pool.query(
        'SELECT estado * FROM pagos WHERE id = ?',[id]
    )
    return pagoEstado;
}














