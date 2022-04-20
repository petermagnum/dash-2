
const socket = io();
var oldData =[];
var productivo=0;
var detenido=0;
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
    return (segFin - segInicio);
  }

socket.on("select", function (datos) {
    var arr=[];
    datos.forEach((result) => {
       
        //console.log(result.Hora);
       
        arr.push({ v1:result.v1 , hora:result.Hora })
     
      });
      //console.log(arr[0].v1==  1)
      //console.log(tiempoEntre(arr[0], arr[6]) );

      for (let i = 0; i < arr.length; i++) {
        if(arr[i].v1 == 1 && i< arr.length-1){
            console.log(arr[i].hora );

            var t = tiempoEntre(arr[i].hora, arr[i+1].hora);
            productivo+=t;

        }
        if(arr[i].v1 == 0 && i< arr.length-1){
            console.log(arr[i].hora );

            var t2 = tiempoEntre(arr[i].hora, arr[i+1].hora);
            detenido+=t2;

        }
      }
  });
  const data = {
    labels: ['Detenido', 'Productivo'],
    datasets: [{
      label: '# of Votes',
      data: [detenido,productivo],
      borderWidth: 1,
      backgroundColor: ['#CB4335','#27AE60'],
    }]
  };
  // Removes the alpha channel from background colors
function handleLeave(evt, item, legend) {
    legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
      colors[index] = color.length === 9 ? color.slice(0, -2) : color;
    });
    legend.chart.update();
  }
  // Append '4d' to the colors (alpha channel), except for the hovered index
function handleHover(evt, item, legend) {
    legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
      colors[index] = index === item.index || color.length === 9 ? color : color + '4D';
    });
    legend.chart.update();
  }

  const config = {
    type: 'pie',
    data: data,
    options: {
      plugins: {
        legend: {
          onHover: handleHover,
          onLeave: handleLeave
        }
      }
    }
  };

  myChart = new Chart(document.getElementById("myChart"), config);
  myChart.destroy();
  myChart = new Chart(document.getElementById("myChart"), config);







