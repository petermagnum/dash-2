const socket = io();

var oldData = [1,2,3,4,5,6,7,8,9];
var newData = [];

// setup
let data = {
  labels: [
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ],
  datasets: [
    {
      label: "Unidades Cerradas",
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
var myChart;

function renderChart() {
  myChart.destroy();
  myChart = new Chart(document.getElementById("myChart"), config2);
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
  myChart = new Chart(document.getElementById("myChart"), config);
});

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
  
  
});


