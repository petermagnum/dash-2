//fecha actual
let date = new Date();

let Fecha =
  date.getFullYear() +
  "-" +
  String(date.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(date.getDate()).padStart(2, "0");

//let Fecha ='2022-04-15'

//ARCHIVO DEL SERVIDOR
const path = require("path"); // modulo para trabajar con las rutas y unir directorios
const express = require("express"); // srevidor llamado express
const app = express(); //el modulo app es el encargado de tener todo el codigo del servidor

//settings
app.set("port", process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/hola", (req, res) => {
  res.send("hola mundo");
});
//start server
const server = app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});

//web sockets
const SocketIO = require("socket.io");
const io = SocketIO(server);

io.on("connection", (socket) => {
  socket.on("fechaSelec", (data) => {
    Fecha = data;
    console.log(Fecha);
    nuevoRegistro = true;
    //unDiarias(Fecha);
    //io.sockets.emit("start", uCerradas);
  });

  //el primer evento a escuchar es cuando se conecta un nuevo cliente
  console.log("Socket conection Exitosa", socket.id);
  queryBD();
  io.sockets.emit("start", uCerradas);
 
});

//BD
var mysql = require("mysql");
var tabla ="tb_Registro_Proc_10002824";// "tb_Registro_Proc_10002824";"cerradoras" ;

var conexion = mysql.createConnection({
  //tb_Registro_Proc_10002824
/*
  host: "localhost",
  database: "rosen",
  user: "root",
  password: "",
 */
  host: "172.16.44.150",
  database: "db_MODBUS",
  user: "ctrujillo",
  password: "d2021ct",
 
});

conexion.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("Base de Datos conexion exitosa!");
  }
});

//Variables Globales
var uCerradas = [];
let numeroRegistrosDB = 0;
let nuevoRegistro = false;


// consultas

function EscucharBD() {
  conexion.query(
    "select count(*) as registros from " + tabla + " where v1 = 0",
    function (error, results, fields) {
      if (error) throw error;
      results.forEach((result) => {
        var nRegistrosActual = result.registros;

        if (nRegistrosActual > numeroRegistrosDB) {
          numeroRegistrosDB = nRegistrosActual;
          nuevoRegistro = true;
          console.log("n° registros BD = " + numeroRegistrosDB);
        } else {
          nuevoRegistro = false;
        }
      });
    }
  );
}
function Contar(hi, hf, fecha) {
  conexion.query(
    "select count(*) as registros from " +
      tabla +
      " where Fecha = '" +
      fecha +
      "' and v1= 0 and Hora>= '" +
      hi +
      "' and Hora < '" +
      hf +
      "'",
    function (error, results, fields) {
      if (error) throw error;

      nCerrados = results[0].registros;

      console.log(
        "n° cerrados en " +
          fecha +
          " entre [" +
          hi +
          ", " +
          hf +
          "] = " +
          nCerrados
      );
      uCerradas.push(nCerrados);
      // console.log(uCerradas);
      if (uCerradas.length == 9) {
        io.sockets.emit("Cerradas", uCerradas);
      }
    }
  );
}
function unDiarias(fecha) {
  if (nuevoRegistro) {
    Contar("09:00:00", "10:00:00", fecha);
    Contar("10:00:00", "11:00:00", fecha);
    Contar("11:00:00", "12:00:00", fecha);
    Contar("12:00:00", "13:00:00", fecha);
    Contar("13:00:00", "14:00:00", fecha);
    Contar("14:00:00", "15:00:00", fecha);
    Contar("15:00:00", "16:00:00", fecha);
    Contar("16:00:00", "17:00:00", fecha);
    Contar("17:00:00", "18:00:00", fecha);

    //io.sockets.emit("Cerradas", uCerradas);
    while (uCerradas.length > 0) {
      uCerradas.pop();
    }
  }
}

function inicio() {
  conexion.query(
    "SELECT * FROM " + tabla + " ORDER by ID DESC LIMIT 4",
    function (error, results, fields) {
      if (error) throw error;
      results.forEach((result) => {
        console.log(result);
        // io.sockets.emit("server:message", result);
      });
    }
  );
}
function select(fecha) {
  if (nuevoRegistro) {
    conexion.query(
      "SELECT * FROM " + tabla + " where Fecha = '" + fecha + "' and Hora>= '09:00:00' and Hora<= '18:00:00'",

      function (error, results, fields) {
        if (error) throw error;

        io.sockets.emit("select", results);
      }
    );
  }
}

function queryBD() {
  EscucharBD();
  select(Fecha);
  unDiarias(Fecha);
}

function repetirCadaXSegundos() {
  let identificadorIntervaloDeTiempo = setInterval(queryBD, 1000);
}

repetirCadaXSegundos();
