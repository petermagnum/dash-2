const socket = io();
let date = new Date();

let Fecha =
  date.getFullYear() +
  "-" +
  String(date.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(date.getDate()).padStart(2, "0");

let Hora = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
let eficiencia;


let total = document.getElementById("total");
let infoMaquinaOperario = document.getElementById("info-maquina-operario");
let info2 = document.getElementById("info2");
let info3 = document.getElementById("info3");
let periodo =  document.getElementById("periodo");

let cerradora = "10002824";
let operario = "G. Ormeño";

let uxhr = 0;
let promedioTiempoActiva = 0; // sin considerar anomalias > 30 min
let promedioTiempoDetenida = 0; // sin considerar anomalias > 30 min

let sumaTotal = 0;

var fecha = document.getElementById("fecha");
fecha.addEventListener("change", function () {
  Fecha = this.value;
  socket.emit("fechaSelec", Fecha);
  console.log(Fecha);
});
window.addEventListener("load", function () {
  // captiramos el ingreso a la ventana
});

var oldData = [];
var newData = [];



//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Chart Barras unidades x Hora <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//########################################################################################################################################

// setup
let colorBarras = "rgb(0, 168, 132)";
let colorBorde = "rgb(223, 243, 237)";
let axes = "#DFF3ED";

let data = {
  labels: [
    "[9-10]",
    "[10-11]",
    "[11-12]",
    "[12-13]",
    "[13-14]",
    "[14-15]",
    "[15-16]",
    "[16-17]",
    "[17-18]",
  ],
  datasets: [
    {
      label: "Unidades Cerradas",
      data: oldData,
      backgroundColor: [colorBarras],
      borderColor: [colorBorde],
      borderWidth: 3,
    },
  ],
};
let data2 = {
  labels: [
    "[9-10]",
    "[10-11]",
    "[11-12]",
    "[12-13]",
    "[13-14]",
    "[14-15]",
    "[15-16]",
    "[16-17]",
    "[17-18]",
  ],
  datasets: [
    {
      label: "Unidades Cerradas",
      data: newData,
      backgroundColor: [colorBarras],
      borderColor: [colorBorde],
      borderWidth: 3,
    },
  ],
};

let data3 = {
  labels: [
    "[9-10]",
    "[10-11]",
    "[11-12]",
    "[12-13]",
    "[13-14]",
    "[14-15]",
    "[15-16]",
    "[16-17]",
    "[17-18]",
  ],
  datasets: [
    {
      label: "Unidades Cerradas",
      data: oldData,
      backgroundColor: [colorBarras],
      borderColor: [colorBorde],

      borderWidth: 3,
    },
  ],
};

// config Javascript ES6.
let config = {
  type: "bar",
  data: data,
  options: {
    legend: {
      labels: {
        // This more specific font property overrides the global property
        fontColor: "white",
      },
    },

    scales: {
      x: {
        ticks: {
          color: axes,
        },
        beginAtZero: true,
      },
      y: {
        ticks: {
          color: axes,
        },
        beginAtZero: true,
      },
    },
  },
};

let config2 = {
  type: "bar",
  data: data2,
  options: {
    legend: {
      fontColor: "white",
    },

    scales: {
      x: {
        ticks: {
          color: axes,
        },
        beginAtZero: true,
      },
      y: {
        ticks: {
          color: axes,
        },
        beginAtZero: true,
      },
    },
  },
};

let config3 = {
  type: "bar",
  data: data3,
  options: {
    legend: {
      fontColor: "white",
    },

    scales: {
      x: {
        ticks: {
          color: axes,
        },
        beginAtZero: true,
      },
      y: {
        ticks: {
          color: axes,
        },
        beginAtZero: true,
      },
    },
  },
};

// render init block
var myChart = new Chart(document.getElementById("myChart"), config);
myChart.onclick = function (evt) {
  var activePoints = myLineChart.getElementsAtEvent(evt);
  console.log(activePoints);
};

function renderChartX() {
  myChart.destroy();
  myChart = new Chart(document.getElementById("myChart"), config3);
  myChart.onclick = function (evt) {
    var activePoints = myLineChart.getElementsAtEvent(evt);
    console.log(activePoints);
  };
}
function renderChart() {
  myChart.destroy();
  myChart = new Chart(document.getElementById("myChart"), config2);
  myChart.onclick = function (evt) {
    var activePoints = myLineChart.getElementsAtEvent(evt);
    console.log(activePoints);
  };
}

socket.on("start", function (data) {
  oldData[0] = data[0];
  oldData[1] = data[1];
  oldData[2] = data[2];
  oldData[3] = data[3];
  oldData[4] = data[4];
  oldData[5] = data[5];
  oldData[6] = data[6];
  oldData[7] = data[7];
  oldData[8] = data[8];

  renderChartX();
  sumaTotal =
    data[0] +
    data[1] +
    data[2] +
    data[3] +
    data[4] +
    data[5] +
    data[6] +
    data[7] +
    data[8];

  total.innerHTML = `<h1 id="tot" > ${sumaTotal}</h1> uds. `;
  infoMaquinaOperario.innerHTML = `<h4> C. Veque   n° ${cerradora}</h4>
                                  <h4> Operario: ${operario}</h4>  
                              `;

  socket.on("tasaEstandar", function (datos) {

    eficiencia=Math.round((sumaTotal / datos) * 100);
    info2.innerHTML = ` 
    <h4 id="info">Tasa Estandar: ${datos}</h4> 
    <h4 id="info">Eficiencia: ${eficiencia} %</h4> `;
    console.log('sumaTotal:'+sumaTotal)
    console.log('datos:'+datos)
  });
  var ChartDonut = new Chart(document.getElementById("ChartDonut"), configDonut);

});


function repetirCadaXSegundos() {
  let identificadorIntervaloDeTiempo = setInterval(realTime, 1000);
}

repetirCadaXSegundos();

socket.on("Cerradas", function (data) {
  //newData = data;

  newData[0] = data[0];
  newData[1] = data[1];
  newData[2] = data[2];
  newData[3] = data[3];
  newData[4] = data[4];
  newData[5] = data[5];
  newData[6] = data[6];
  newData[7] = data[7];
  newData[8] = data[8];
  console.log(newData);
  renderChart();
  let sumaTotal =
    data[0] +
    data[1] +
    data[2] +
    data[3] +
    data[4] +
    data[5] +
    data[6] +
    data[7] +
    data[8];
  total.innerHTML = `<h1 id="tot"> ${sumaTotal}</h1> uds. `;
  socket.on("tasaEstandar", function (datos) {
    eficiencia=Math.round((sumaTotal / datos) * 100);
    info2.innerHTML = `
    <h4 id="info">Tasa Estandar: ${datos}</h4> 
    <h4 id="info">Eficiencia: ${Math.round((sumaTotal / datos) * 100)} %</h4> `;

    infoMaquinaOperario.innerHTML = `<h4> C. Veque   n° ${cerradora}</h4>
    <h4> Operario: ${operario}</h4> `;
  });
});
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Iformacion de la Produccion<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//########################################################################################################################################

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Chart pie % productivo % detenido <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//########################################################################################################################################

var productivo = 0;
var detenido = 0;
var dataPie = [];
var datap = {
  labels: ["DETENIDA ", "ACTIVA "],
  datasets: [
    {
      label: "# of Votes",
      data: dataPie,
      borderWidth: 1,
      backgroundColor: ["#DFF3ED", "#00a884"],
      fontColor: "white",
    },
  ],
};

var datap2 = {
  labels: ["DETENIDA", "ACTIVA"],
  datasets: [
    {
      label: "# of Votes",
      data: dataPie,
      borderWidth: 1,
      backgroundColor: ["#DFF3ED", "#00a884"],
      fontColor: "white",
    },
  ],
};
// Removes the alpha channel from background colors
function handleLeave(evt, item, legend) {
  legend.chart.data.datasets[0].backgroundColor.forEach(
    (color, index, colors) => {
      colors[index] = color.length === 9 ? color.slice(0, -2) : color;
    }
  );
  legend.chart.update();
}
// Append '4d' to the colors (alpha channel), except for the hovered index
function handleHover(evt, item, legend) {
  legend.chart.data.datasets[0].backgroundColor.forEach(
    (color, index, colors) => {
      colors[index] =
        index === item.index || color.length === 9 ? color : color + "4D";
    }
  );
  legend.chart.update();
}

const configp = {
  type: "pie",
  data: datap,
  options: {
    plugins: {
      labels: {
        render: "percentage",
        fontColor: "#00a884",
        fontStyle: "bolder",
      },
      animation: {
        animateScale: true,
        animateRotate: true,
      },
      legend: {
        onHover: handleHover,
        onLeave: handleLeave,
        fontColor: "#DFF3ED",
      },
    },
  },
};
const configp2 = {
  type: "pie",
  data: datap2,
  options: {
    plugins: {
      labels: {
        render: "percentage",
        fontColor: "#00a884",
        fontStyle: "bolder",
      },
      animation: {
        animateScale: true,
        animateRotate: true,
      },

      legend: {
        onHover: handleHover,
        onLeave: handleLeave,
        fontColor: "r#DFF3ED",
      },
    },
  },
};

function tiempoEntre(inicio, fin) {
  var dataInicio = inicio.split(":");
  var dataFin = fin.split(":");
  var segInicio = 0;
  var segFin = 0;
  for (let i = 0; i < dataInicio.length; i++) {
    if (i == 0) {
      segInicio += dataInicio[i] * 3600;
      segFin += dataFin[i] * 3600;
    } else if (i == 1) {
      segInicio += dataInicio[i] * 60;
      segFin += dataFin[i] * 60;
    } else {
      segInicio += dataInicio[i] * 1;
      segFin += dataFin[i] * 1;
    }
  }
  return segFin - segInicio;
}

// render init block
var ChartPie = new Chart(document.getElementById("ChartPie"), configp);

function renderChartPie() {
  ChartPie.destroy();
  ChartPie = new Chart(document.getElementById("ChartPie"), configp2);
}

let tiempos = []; // varible of time-line chart
let v1es1 = true;
socket.on("select", function (datos) {
  while (tiempos.length > 0) {
    //para el grafico de linea de tiempo
    tiempos.pop();
  }

  var arr = [];
  dataPie[0] = 0;
  dataPie[1] = 0;

  datos.forEach((result) => {
    arr.push({ v1: result.v1, hora: result.Hora });
  });
  console.log(arr.length);
  console.log(arr);

  //the variable is being used in the time-line chart
  if (arr[0].v1 == 1) {
    v1es1 = true;
  } else {
    v1es1 = false;
  }

  for (let i = 0; i < arr.length; i++) {
    if (i == 0) {
      var t = tiempoEntre("09:00:00", arr[i].hora); // en que casos ??
      tiempos.push(t);
      dataPie[0] += t;
    }

    if (arr[i].v1 == 0 && i < arr.length - 1) {
      //tiepo maquina Detenida
      t = tiempoEntre(arr[i].hora, arr[i + 1].hora);
      dataPie[0] += t;
      tiempos.push(t);
    }

    if (arr[i].v1 == 1 && i < arr.length - 1) {
      //tiempo maquina Activa
      t = tiempoEntre(arr[i].hora, arr[i + 1].hora);
      dataPie[1] += t;
      tiempos.push(t);
    }
  }
  dataPie[0] = dataPie[0] / 3600;
  dataPie[1] = dataPie[1] / 3600;

  renderChartPie();
  console.log(tiempos);
  canvas();

  info3.innerHTML = ` 
  <h4 id="info-activa">Activa:     ${round(dataPie[1])} hrs.</h4>
  <h4 id="info-detenida">Detenida: ${round(dataPie[0])} hrs.</h4> `;
});

function round(num) {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> RealTime <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//########################################################################################################################################

function realTime() {
  date = new Date();
  Hora = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  /*
  if(Hora>'18:00:00'){     implemetar de bueba forma no esta funcionando
    Hora='18:00:00';
  } 
  */     
  horaActual.innerHTML = ` 
  <h4> ${Hora} </h4> `;
  canvas();
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Donut <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//########################################################################################################################################

const dataDonut = {


  labels: ["Eficiencia", ""],
  datasets: [
    {
      label: "My First Dataset",
      data: [83,100-83],
      backgroundColor: ["rgb(0, 168, 132)", "rgb(223, 243, 237)"],
      hoverOffset: 4,
    },
  ],
};

const configDonut = {
  type: "doughnut",
  data: dataDonut,
  options: {
    //cutoutPercentage: 50,
    maintainAspectRatio: true,
    responsive: true,
    legend: {
      display: false,
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  },
  plugins: {
    id: "total",

  },
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> time-line <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//########################################################################################################################################

function canvas() {
  var canvas = document.getElementById("timeline");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 32400, 3000);

  function green(x, w) {
    ctx.fillStyle = "rgb(223, 243, 237)";
    ctx.fillRect(x, 700, w, 1500);
  }
  function red(x, w) {
    ctx.fillStyle = "rgb(0, 168, 132)";
    ctx.fillRect(x, 600, w, 1700);
  }

  // X axes
  ctx.fillStyle = "rgb(223, 243, 237)";
  ctx.fillRect(0, 2300, 32400, 40);
  for (let i = 0; i < 10; i++) {
    if (i == 9) {
      ctx.fillRect(i * 3600 - 90, 2300, 80, 200);
    } else if (i == 0) {
      ctx.fillRect(i * 3600, 2300, 70, 180);
    } else {
      ctx.fillRect(i * 3600 - 70, 2300, 70, 180);
    }
  }
  
  function graficar() {
    var x = 0;
    for (let i = 0; i < tiempos.length; i++) {
      if (v1es1) {
        if (i % 2 != 0) {
          red(x, tiempos[i]);
          x += tiempos[i];
        } else {
          green(x, tiempos[i]);
          x += tiempos[i];
        }

      } else {
        if (i % 2 != 0) {
          green(x, tiempos[i]);
          x += tiempos[i];
        } else {
          red(x, tiempos[i]);
          x += tiempos[i];
        }
      }
      //painting labels of x axes
      ctx.font = "250px Comic Sans MS";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";

      if (i == 0) {
        ctx.fillText(i + 9 + "hrs.", i * 3600 + 300, 2700);
      } else if (i == 9) {
        ctx.fillText(i + 9 + "hrs.", i * 3600 - 100, 2700);
      } else {
        ctx.fillText(i + 9 + "hrs.", i * 3600, 2700);
      }
    }


  
  }
  graficar();
}

//canvas();
