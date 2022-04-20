const socket = io();

var oldData =[];

// setup
let data = {
  labels: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8"],
  datasets: [
    {
      label: "unidades Cerradas",
      data: oldData,
      backgroundColor: [
        "rgba(255, 26, 104, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(0, 0, 0, 0.2)",
      ],
      borderColor: [
        "rgba(255, 26, 104, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(0, 0, 0, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
let data2 = {
  labels: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8"],
  datasets: [
    {
      label: "unidades Cerradas",
      data: oldData,
      backgroundColor: [
        "rgba(255, 26, 104, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(0, 0, 0, 0.2)",
      ],
      borderColor: [
        "rgba(255, 26, 104, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(0, 0, 0, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

// config Javascript ES6.
let config = {
  type: "bar",
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};
let config2 = {
  type: "bar",
  data: data2,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

// render init block
var myChart = new Chart(document.getElementById("myChart"), config);

function renderChart() {
  myChart.destroy();
  myChart = new Chart(document.getElementById("myChart"), config2);
}

socket.on("server:total", function (datos) {

  oldData[0]=datos;


  renderChart();
  console.log(oldData)
  console.log(datos);
});






