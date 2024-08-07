
function call(investment, estimatedReturns) {
  let percentInvest = (investment / (investment + estimatedReturns)) * 100;
  let estimateInvest =
    (estimatedReturns / (investment + estimatedReturns)) * 100;

  var data = [
    {
      values: [percentInvest, estimateInvest],
      labels: ["Total Investment", "Total Interest"],
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
    title: "PPF Pie-Chart",
    annotations: [
      {
        font: {
          size: 20,
        },
        showarrow: false,
        text: "PPF",
        x: 0.5,
        y: 0.5,
      },
    ],
    grid: { rows: 1, columns: 1 },
  };
  Plotly.newPlot("myDiv", data, layout);
  document.querySelector(
    ".value-invest"
  ).innerHTML = `Invested Amount : ₹ ${investment.toLocaleString('en-IN')}`;
  document.querySelector(
    ".value-return"
  ).innerHTML = `Total Interest : ₹ ${estimatedReturns.toLocaleString('en-IN')}`;
  document.querySelector(".value-total").innerHTML = `Maturity Value :  ₹ ${
    (investment + estimatedReturns).toLocaleString('en-IN')
  } `;
}

let p1 = parseInt(document["myForm"]["investment"].value);
let rate1 = 7.1
let time1 = parseInt(document["myForm"]["time"].value);

document.querySelector(".value-p").innerHTML = `Annual Installment : ₹ ${p1.toLocaleString('en-IN')}`;
document.querySelector(".value-t").innerHTML = `Time period :   ${time1} Yr`;

let r1 = rate1/100; 
let n1=time1; //Years
let investment1 = p1*n1; //Annual Installments
let returns1 = p1*(Math.pow(1.071,n1)-1)/r1;
let estimatedReturns1 = returns1 - investment1; 
call(investment1, estimatedReturns1);

document.getElementById("investment").addEventListener("change", (e) => {
  let p = parseInt(e.currentTarget.value);
  let rate = 7.1
  let time = parseInt(document["myForm"]["time"].value);
  let r = rate/100;
  let n = time;
  let investment = p*n;
  let returns = p*(Math.pow(1.072,n)-1)/r;
  let estimatedReturns = returns - investment;
  document.querySelector(
    ".value-p"
  ).innerHTML = `Annual Installment : ₹  ${p.toLocaleString("en-IN")}`;
  call(investment, estimatedReturns);
});

document.getElementById("time").addEventListener("change", (e) => {
  let time = parseInt(e.currentTarget.value);
  let p = parseInt(document["myForm"]["investment"].value);
  let rate =7.1
  let r = rate/100;
  let n = time;
  let investment = p*n;
  let returns = p*(Math.pow(1.071,n)-1)/r;
  let estimatedReturns = returns - investment;
  document.querySelector(".value-t").innerHTML = `Time period :   ${time} Yr`;
  call(investment, estimatedReturns);
});