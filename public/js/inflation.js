function call(investment, estimatedReturns) {
  let percentInvest = (investment / (investment + estimatedReturns)) * 100;
  let estimateInvest =
    (estimatedReturns / (investment + estimatedReturns)) * 100;

  var data = [
    {
      values: [percentInvest, estimateInvest],
      labels: ["Current Cost", "Total Inflation"],
      marker: {
        colors: ['#FF6347', '#5CB85C' ]  // Colors for each slice
      },
      domain: { column: 0 },
      name: "Inflation",
      hoverinfo: "label",
      hole: ".5",
      type: "pie",
    },
  ];

  var layout = {
    title: "Inflation Pie-Chart",
    annotations: [
      {
        font: {
          size: 15,
        },
        showarrow: false,
        text: "Inflation",
        x: 0.5,
        y: 0.5,
      },
    ],
    grid: { rows: 1, columns: 1 },
  };
  Plotly.newPlot("myDiv", data, layout);

  document.querySelector(
    ".value-invest"
  ).innerHTML = `Current Cost: ₹ ${investment.toLocaleString("en-IN")}`;
  document.querySelector(
    ".value-return"
  ).innerHTML = `Cost Increase : ₹ ${estimatedReturns.toLocaleString("en-IN")}`;
  document.querySelector(".value-total").innerHTML = `Future Value :  ₹ ${(
    investment + estimatedReturns
  ).toLocaleString("en-IN")} `;
}

let p1 = parseInt(document["myForm"]["investment"].value);
let rate1 = parseInt(document["myForm"]["rate"].value);
let time1 = parseInt(document["myForm"]["time"].value);

document.querySelector(
  ".value-p"
).innerHTML = `Current Cost : ₹ ${p1.toLocaleString("en-IN")}`;
document.querySelector(".value-r").innerHTML = `Rate of inflation : ${rate1}%`;
document.querySelector(".value-t").innerHTML = `Time period :   ${time1} Yr`;

let r1 = rate1 / 100;
let t1 = time1;
let currentValue1 = p1;

let futureValue1 = currentValue1 * Math.pow(1 + r1, t1);
let costIncrease1 = futureValue1 - currentValue1;
call(currentValue1, costIncrease1);

document.getElementById("investment").addEventListener("change", (e) => {
  let p = parseInt(e.currentTarget.value);
  let rate = parseInt(document["myForm"]["rate"].value);
  let time = parseInt(document["myForm"]["time"].value);
  let r = rate / 100;
  let t = time;
  let currentValue = p;
  let futureValue = p * Math.pow(1 + r, t);
  let costIncrease = futureValue - currentValue;
  document.querySelector(
    ".value-p"
  ).innerHTML = `Current Value : ₹  ${p.toLocaleString("en-IN")}`;
  call(currentValue, costIncrease);
});

document.getElementById("rate").addEventListener("change", (e) => {
  let rate = parseInt(e.currentTarget.value);
  let p = parseInt(document["myForm"]["investment"].value);
  let time = parseInt(document["myForm"]["time"].value);
  let r = rate / 100;
  let t = time;
  let currentValue = p;
  let futureValue = p * Math.pow(1 + r, t);
  let costIncrease = futureValue - currentValue;
  document.querySelector(".value-r").innerHTML = `Rate of inflation : ${rate}%`;
  call(currentValue, costIncrease);
});

document.getElementById("time").addEventListener("change", (e) => {
  let time = parseInt(e.currentTarget.value);
  let p = parseInt(document["myForm"]["investment"].value);
  let rate = parseInt(document["myForm"]["rate"].value);
  let r = rate / 100;
  let t = time;
  let currentValue = p;
  let futureValue = p * Math.pow(1 + r, t);
  let costIncrease = futureValue - currentValue;
  document.querySelector(".value-t").innerHTML = `Time period :   ${time} Yr`;
  call(currentValue, costIncrease);
});
