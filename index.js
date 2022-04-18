//ARCHIVO DEL SERVIDOR
const path = require("path"); // modulo para trabajar con las rutas y unir directorios
const express = require("express"); // srevidor llamado express
const app = express(); //el modulo app es el encargado de tener todo el codigo del servidor

//settings
app.set("port", process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname, "public")));

//start server
const server = app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});

//web sockets
const SocketIO = require("socket.io");
const io = SocketIO(server);

io.on("connection", (socket) => {
  //el primer evento a escuchar es cuando se conecta un nuevo cliente
  console.log("Socket conection Exitosa", socket.id);
 // registo=true;
 // queryBD();


});


//BD
var mysql = require("mysql");
var tabla= 'cerradoras';
let numeroRegistrosDB = 0;
let registro = false;
let Fecha= Date.now();

var conexion = mysql.createConnection({
  //tb_Registro_Proc_10002824
  host: "localhost",
  database: "rosen",
  user: "root",
  password: "",

});

conexion.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("Base de Datos conexion exitosa!");
  }
});


// consultas
function ContarXFecha(){
  conexion.query(
    "select count(*) from "+tabla+ " where Fecha = '2022-04-15'",
    function (error, results, fields) {
      if (error) throw error;
      results.forEach((result) => {
        var nRegistrosActual = parseInt(
          JSON.stringify(result).split(":")[1].split("}")[0]
        );

        if (nRegistrosActual > numeroRegistrosDB) {
          numeroRegistrosDB = nRegistrosActual;
          registro = true;
          console.log("n° registros acutales " + numeroRegistrosDB);
        } else {
          registro = false;
        }
      });
    }
  );
}
function select() {  
  if (registro == true) {
    conexion.query(
      "SELECT * FROM "+tabla+" ORDER by ID DESC LIMIT 1",
      function (error, results, fields) {
        if (error) throw error;
        results.forEach((result) => {
          //console.log(result);
          io.sockets.emit("server:message", result);
        });
      }
    );
  }
}

function queryBD(){
  ContarXFecha();
  select();

}

function repetirCadaXSegundos() {
  
 let identificadorIntervaloDeTiempo = setInterval(queryBD, 1000);
}
repetirCadaXSegundos();

/*

*/
