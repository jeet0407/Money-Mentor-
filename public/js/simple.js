function call(investment, estimatedReturns) {
    let percentInvest = (investment / (investment + estimatedReturns)) * 100;
    let estimateInvest =
      (estimatedReturns / (investment + estimatedReturns)) * 100;
  
  
    var data = [
      {
        values: [percentInvest, estimateInvest],
        labels: ["Principal Amount", "Total Interest"],
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
      title: "Simple Interest Pie-Chart",
      annotations: [
        {
          font: {
            size: 15,
          },
          showarrow: false,
          text: "SI",
          x: 0.5,
          y: 0.5,
        },
      ],
      grid: { rows: 1, columns: 1 },
    };
    Plotly.newPlot("myDiv", data, layout);
    document.querySelector(
      ".value-invest"
    ).innerHTML = `Principal Amount : ₹ ${investment.toLocaleString("en-IN")}`;
    document.querySelector(
      ".value-return"
    ).innerHTML = `Total Interest : ₹ ${estimatedReturns.toLocaleString(
      "en-IN"
    )}`;
    document.querySelector(".value-total").innerHTML = `Total Amount :  ₹ ${(
      investment + estimatedReturns
    ).toLocaleString("en-IN")} `;
  }
  // Start

  let p1 = parseInt(document["myForm"]["investment"].value);
  let rate1 = parseInt(document["myForm"]["rate"].value);
  let time1 = parseInt(document["myForm"]["time"].value);
  
  document.querySelector(
    ".value-p"
  ).innerHTML = `Total Investment : ₹ ${p1.toLocaleString("en-IN")}`;
  document.querySelector(".value-r").innerHTML = `Annual Rate : ${rate1}%`;
  document.querySelector(".value-t").innerHTML = `Time period :   ${time1} Yr`;
  
  let interest=p1*rate1*time1/100;
  console.log(interest);
  call(p1, interest);
  
  document.getElementById("investment").addEventListener("change", (e) => {
    let p = parseInt(e.currentTarget.value);
    let rate = parseInt(document["myForm"]["rate"].value);
    let time = parseInt(document["myForm"]["time"].value);
    document.querySelector(
      ".value-p"
    ).innerHTML = `Principal Amount : ₹  ${p.toLocaleString("en-IN")}`;
    call(p, p*rate*time/100);
  });
  
  document.getElementById("rate").addEventListener("change", (e) => {
    let rate = parseInt(e.currentTarget.value);
    let p = parseInt(document["myForm"]["investment"].value);
    let time = parseInt(document["myForm"]["time"].value);
    document.querySelector(".value-r").innerHTML = `Rate of interest[p.a] : ${rate}%`;
    call(p, p*rate*time/100);
  });
  
  document.getElementById("time").addEventListener("change", (e) => {
    let time = parseInt(e.currentTarget.value);
    let p = parseInt(document["myForm"]["investment"].value);
    let rate = parseInt(document["myForm"]["rate"].value);
    document.querySelector(".value-t").innerHTML = `Time period : ${time} Yr`;
    call(p, p*rate*time/100);
  });