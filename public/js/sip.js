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
        name: "SIP",
        hoverinfo: "label",
        hole: ".5",
        type: "pie",
      },
    ];

    var layout = {
      title: "SIP Pie-Chart",
      annotations: [
        {
          font: {
            size: 20,
          },
          showarrow: false,
          text: "SIP",
          x: 0.5,
          y: 0.5,
        },
      ],
      grid: { rows: 1, columns: 1 },
    };
    Plotly.newPlot("myDiv", data, layout);
    document.querySelector(
      ".value-invest"
    ).innerHTML = `Total Investment : ₹ ${investment.toLocaleString('en-IN')}`;
    document.querySelector(
      ".value-return"
    ).innerHTML = `Estimated Value : ₹ ${estimatedReturns.toLocaleString('en-IN')}`;
    document.querySelector(".value-total").innerHTML = `Your SIP :  ₹ ${
      (investment + estimatedReturns).toLocaleString('en-IN')
    } `;
  }

  let p1 = parseInt(document["myForm"]["investment"].value);
  let rate1 = parseInt(document["myForm"]["rate"].value);
  let time1 = parseInt(document["myForm"]["time"].value);

  document.querySelector(".value-p").innerHTML = `Monthly Investment : ₹ ${p1.toLocaleString('en-IN')}`;
  document.querySelector(".value-r").innerHTML = `Annual Rate : ${rate1}%`;
  document.querySelector(".value-t").innerHTML = `Time period :   ${time1} Yr`;

  let r1 = rate1 / 1200;
  let n1 = 12 * time1;
  let investment1 = p1 * n1;
  let returns1 = (p1 * (1 + r1) * (Math.pow(1 + r1, n1) - 1)) / r1;
  let estimatedReturns1 = returns1 - investment1;
  //   console.log(investment1,estimatedReturns1);
  call(investment1, estimatedReturns1);

  document.getElementById("investment").addEventListener("change", (e) => {
    let p = e.currentTarget.value;
    let rate = document["myForm"]["rate"].value;
    let time = document["myForm"]["time"].value;
    let r = rate / 1200;
    let n = 12 * time;
    let investment = p * n;
    let returns = (p * (1 + r) * (Math.pow(1 + r, n) - 1)) / r;
    let estimatedReturns = returns - investment;

    document.querySelector(
      ".value-p"
    ).innerHTML = `Monthly Investment : ₹  ${p.toLocaleString("en-IN")}`;
    console.log(investment, estimatedReturns);
    call(investment, estimatedReturns);
  });

  document.getElementById("rate").addEventListener("change", (e) => {
    let rate = e.currentTarget.value;
    let p = document["myForm"]["investment"].value;
    let time = document["myForm"]["time"].value;
    let r = rate / 1200;
    let n = 12 * time;
    let investment = p * n;
    let returns = (p * (1 + r) * (Math.pow(1 + r, n) - 1)) / r;
    let estimatedReturns = returns - investment;
    document.querySelector(".value-r").innerHTML = `Annual Rate : ${rate}%`;
    console.log(investment, estimatedReturns);
    call(investment, estimatedReturns);
  });

  document.getElementById("time").addEventListener("change", (e) => {
    let time = e.currentTarget.value;
    let p = document["myForm"]["investment"].value;
    let rate = document["myForm"]["rate"].value;
    let r = rate / 1200;
    let n = 12 * time;
    let investment = p * n;
    let returns = (p * (1 + r) * (Math.pow(1 + r, n) - 1)) / r;
    let estimatedReturns = returns - investment;
    document.querySelector(".value-t").innerHTML = `Time period :   ${time} Yr`;
    console.log(investment, estimatedReturns);
    call(investment, estimatedReturns);
  });