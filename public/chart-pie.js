//socket = io();
var productivo = 0;
var detenido = 0;
var dataPie=[1,1];
var datap = {
  labels: ["detenido", "productivo"],
  datasets: [
    {
      label: "# of Votes",
      data: dataPie,
      borderWidth: 1,
      backgroundColor: ["#CB4335", "#27AE60"],
    },
  ],
};
var datap2 = {
  labels: ["detenido", "productivo"],
  datasets: [
    {
      label: "# of Votes",
      data: dataPie,
      borderWidth: 1,
      backgroundColor: ["#CB4335", "#27AE60"],
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
      legend: {
        onHover: handleHover,
        onLeave: handleLeave,
      },
    },
  },
};
const configp2 = {
  type: "pie",
  data: datap2,
  options: {
    plugins: {
      legend: {
        onHover: handleHover,
        onLeave: handleLeave,
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
var ChartPie= new Chart(document.getElementById("ChartPie"), configp);

function renderChart() {
  ChartPie.destroy();
  ChartPie = new Chart(document.getElementById("ChartPie"), configp2);
  
}


socket.on("select", function (datos) {
  
  var arr = [];
  datos.forEach((result) => {
    

    arr.push({ v1: result.v1, hora: result.Hora });
  });
  console.log(arr);


  for (let i = 0; i < arr.length; i++) {
    if (arr[i].v1 == 1 && i < arr.length - 1) {
      console.log(arr[i].hora);

      var t = tiempoEntre(arr[i].hora, arr[i + 1].hora);
      dataPie[1] += t;
    }
    if (arr[i].v1 == 0 && i < arr.length - 1) {
      console.log(arr[i].hora);

      var t2 = tiempoEntre(arr[i].hora, arr[i + 1].hora);
      dataPie[0] += t2;
    }
  }
 // newData[0]=detenido;
  //newData[1]=productivo;
  renderChart();
  console.log(dataPie);

});




