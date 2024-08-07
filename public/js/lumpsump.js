function call(investment, estimatedReturns) {
  let percentInvest = (investment / (investment + estimatedReturns)) * 100;
  let estimateInvest =
    (estimatedReturns / (investment + estimatedReturns)) * 100;


  var data = [
    {
      values: [percentInvest, estimateInvest],
      labels: ["Invested Amount", "Estimated Amount"],
      marker: {
        colors: ['#FF6347', '#5CB85C' ]  // Colors for each slice
      },
      domain: { column: 0 },
      name: "LumpSump",
      hoverinfo: "label",
      hole: ".5",
      type: "pie",
    },
  ];

  var layout = {
    title: "LumpSump Pie-Chart",
    annotations: [
      {
        font: {
          size: 15,
        },
        showarrow: false,
        text: "LS",
        x: 0.5,
        y: 0.5,
      },
    ],
    grid: { rows: 1, columns: 1 },
  };
  Plotly.newPlot("myDiv", data, layout);
  document.querySelector(
    ".value-invest"
  ).innerHTML = `Invested Amount : ₹ ${investment.toLocaleString("en-IN")}`;
  document.querySelector(
    ".value-return"
  ).innerHTML = `Estimated Returns : ₹ ${estimatedReturns.toLocaleString(
    "en-IN"
  )}`;
  document.querySelector(".value-total").innerHTML = `Total Value :  ₹ ${(
    investment + estimatedReturns
  ).toLocaleString("en-IN")} `;
}

let p1 = parseInt(document["myForm"]["investment"].value);
let rate1 = parseInt(document["myForm"]["rate"].value);
let time1 = parseInt(document["myForm"]["time"].value);

document.querySelector(
  ".value-p"
).innerHTML = `Total Investment : ₹ ${p1.toLocaleString("en-IN")}`;
document.querySelector(".value-r").innerHTML = `Annual Rate : ${rate1}%`;
document.querySelector(".value-t").innerHTML = `Time period :   ${time1} Yr`;

let r1 = rate1 / 100;
let n1 = 1;
let t1 = time1;
let investment1 = p1;
let returns1 = p1 * Math.pow(1 + r1 / n1, n1 * t1);
let estimatedReturns1 = returns1 - investment1;
call(investment1, estimatedReturns1);

document.getElementById("investment").addEventListener("change", (e) => {
  let p = parseInt(e.currentTarget.value);
  let rate = parseInt(document["myForm"]["rate"].value);
  let time = parseInt(document["myForm"]["time"].value);
  let r = rate / 100;
  let n = 1;
  let investment = p;
  let returns = p * Math.pow(1 + r / n, n * time);
  let estimatedReturns = returns - investment;
  document.querySelector(
    ".value-p"
  ).innerHTML = `Total Investment : ₹  ${p.toLocaleString("en-IN")}`;
  call(investment, estimatedReturns);
});

document.getElementById("rate").addEventListener("change", (e) => {
  let rate = parseInt(e.currentTarget.value);
  let p = parseInt(document["myForm"]["investment"].value);
  let time = parseInt(document["myForm"]["time"].value);
  let r = rate / 100;
  let n = 1;
  let investment = p;
  let returns = p * Math.pow(1 + r / n, n * time);
  let estimatedReturns = returns - investment;
  document.querySelector(".value-r").innerHTML = `Annual Rate : ${rate}%`;
  call(investment, estimatedReturns);
});

document.getElementById("time").addEventListener("change", (e) => {
  let time = parseInt(e.currentTarget.value);
  let p = parseInt(document["myForm"]["investment"].value);
  let rate = parseInt(document["myForm"]["rate"].value);
  let r = rate / 100;
  let n = 1;
  let investment = p;
  let returns = p * Math.pow(1 + r / n, n * time);
  let estimatedReturns = returns - investment;
  document.querySelector(".value-t").innerHTML = `Time period :   ${time} Yr`;
  call(investment, estimatedReturns);
});
