function random_bg_color() {
  var x = Math.floor(Math.random() * 256);
  var y = 100 + Math.floor(Math.random() * 256);
  var z = 50 + Math.floor(Math.random() * 256);
  var bgColor = "rgb(" + x + "," + y + "," + z + ")";
  return bgColor;
}
const chart = {
  charts: [
    {
      title: "Sıcaklık-Zaman Grafiği",
      explanation: "Sıcaklık-zaman grafiği aşağıdadır.",
      config: {
        width: window.innerWidth - window.innerWidth * 0.02,
        height: window.innerHeight - window.innerHeight * 0.05,
        scales: {
          x: {
            time: true,
            //	auto: false,
            //	range: [0, 6],
          },
          y: {
            auto: true,
          },
        },
        axes: [
          {
            //	size: 30,
            label: "Tarih-Saat",
            labelSize: 20,
            stroke: "white",
          },
          {
            space: 50,
            //	size: 40,
            side: -1,
            //	labelSize: 20,
            stroke: "#000",
            class: "text",
            values: (u, vals, space) => vals.map((v) => v.toFixed(10) + " TRY"),
          },
        ],
        series: [
          {},

          {
            label: "Value",
            width: 2,
            stroke: random_bg_color(),
            value: (u, v) => (v == null ? "-" : v.toFixed(10) + " TRY"),
          },
        ],
      },
      data: [[], []],
      dataSet: [
        {
          variable: "addingtime",
          index: 0,
          type: "time",
        },
        {
          variable: "temp",
          index: 1,
        },
      ],
    },
  ],
};

const myChart = uPlot(
  chart.charts[0].config,
  chart.charts[0].data,
  document.body
);
const btcturk = new BtcTurkApi();
setInterval(() => {
  const val = btcturk
    .ticker("SHIB_TRY")
    .then((data) => {
      console.log(data.data[0]);
      chart.charts[0].data[0].push(data.data[0].timestamp);
      chart.charts[0].data[1].push(data.data[0].last);
      myChart.setData(chart.charts[0].data);
    })
    .catch((err) => console.error(err));
}, 1000);
