const mysql = require("mysql2");
const crypto = require('crypto');
// MYSQL

function hoy() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const seconds = String(today.getSeconds()).padStart(2, '0');
    const ampm = today.getHours() >= 12 ? 'PM' : 'AM';

    const hoy = `${year}${month}${day}${hours}${minutes}${seconds}${ampm}`;
    return hoy
}

function generarToken() {
    
  const caracteresPermitidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  const longitudToken = 15;

  
  const buffer = crypto.randomBytes(longitudToken);

  
  let token = '';

  
  for (let i = 0; i < buffer.length; i++) {
      const indice = buffer.readUInt8(i) % caracteresPermitidos.length;
      token += caracteresPermitidos.charAt(indice);
  }

  return token;
}

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "todolist",
});

connection.connect(function (error) {
    if (error) {
      console.log(`[-] Error: ${error}`);
    } else {
      console.log("[+] Conexión exitosa");
    }
});


module.exports = {connection,hoy,generarToken};

