function call(investment, estimatedReturns) {
    let percentInvest = (investment / (investment + estimatedReturns)) * 100;
    let estimateInvest =
      (estimatedReturns / (investment + estimatedReturns)) * 100;
  
    //For colors checking...
    // var data = [
    //   {
    //     values: [percentInvest, estimateInvest],
    //     marker: {
    //       colors: ['#FF6347', '#FFA07A']  // Colors for each slice
    //     },
    //     labels: ["Principal Amount", "Interest Amount"],
    //     domain: { column: 0 },
    //     name: "EMI",
    //     hoverinfo: "label",
    //     hole: ".5",
    //     type: "pie",
    //   },
    // ];

    var data = [
      {
        values: [percentInvest, estimateInvest],
        labels: ["Principal Amount", "Interest Amount"],
        marker: {
          colors: ['#FF6347', '#5CB85C' ]  // Colors for each slice
        },
        domain: { column: 0 },
        name: "EMI",
        hoverinfo: "label",
        hole: .5,
        type: "pie",
      },
    ];
    
    
    //Layout for plotly...
    var layout = {
      title: "EMI Pie-Chart",
      annotations: [
        {
          font: {
            size: 15,
          },
          showarrow: false,
          text: "EMI",
          x: 0.5,
          y: 0.5,
        },
      ],
      grid: { rows: 1, columns: 1 },
    };
    Plotly.newPlot("myDiv", data, layout);
    let totalMonths = parseInt(document["myForm"]["time"].value)*12;
    document.querySelector(
      ".value-invest"
    ).innerHTML = `Monthly EMI : ₹ ${((investment+estimatedReturns)/totalMonths).toLocaleString("en-IN")}`;
    document.querySelector(
      ".value-return"
    ).innerHTML = `Total Interest : ₹ ${estimatedReturns.toLocaleString(
      "en-IN"
    )}`;
    document.querySelector(".value-total").innerHTML = `Total Amount :  ₹ ${(
      investment + estimatedReturns
    ).toLocaleString("en-IN")} `;
  }
  
  let p1 = parseInt(document["myForm"]["investment"].value);
  let rate1 = parseInt(document["myForm"]["rate"].value);
  let time1 = parseInt(document["myForm"]["time"].value);
  
  document.querySelector(
    ".value-p"
  ).innerHTML = `Principal Amount : ₹ ${p1.toLocaleString("en-IN")}`;
  document.querySelector(".value-r").innerHTML = `Rate of  Interest : ${rate1}%`;
  document.querySelector(".value-t").innerHTML = `Loan Tenure :   ${time1} Yr`;
  
  let r1 = rate1 / 1200;
  let t1 = time1 *12; 
  let investment1 = p1;
  let monthlyEmi1 = p1 * r1*  Math.pow(1 + r1 ,t1)/(Math.pow(1+r1,t1)-1);
  let interest1 = monthlyEmi1*t1 - p1;
  let totalValue1=interest1+p1;
  call(investment1, interest1);
  
  document.getElementById("investment").addEventListener("change", (e) => {
    let p = parseInt(e.currentTarget.value);
    let rate = parseInt(document["myForm"]["rate"].value);
    let time = parseInt(document["myForm"]["time"].value);
    let r = rate / 1200;
    let n = time*12;
    let investment = p;
    let monthlyEmi = p *r* Math.pow(1 + r , n)/(Math.pow(1+r,n)-1);
    let interest=monthlyEmi*n-p;
    document.querySelector(
      ".value-p"
    ).innerHTML = `Principal Amount : ₹  ${p.toLocaleString("en-IN")}`;
    call(investment, interest);
  });
  
  document.getElementById("rate").addEventListener("change", (e) => {
    let rate = parseInt(e.currentTarget.value);
    let p = parseInt(document["myForm"]["investment"].value);
    let time = parseInt(document["myForm"]["time"].value);
    let r = rate / 1200;
    let n = time*12;
    let investment = p;
    let monthlyEmi = p *r* Math.pow(1 + r , n)/(Math.pow(1+r,n)-1);
    let interest=monthlyEmi*n-p;
    document.querySelector(".value-r").innerHTML = `Rate of Interest : ${rate}%`;
    call(investment, interest);
  });
  
  document.getElementById("time").addEventListener("change", (e) => {
    let time = parseInt(e.currentTarget.value);
    let p = parseInt(document["myForm"]["investment"].value);
    let rate = parseInt(document["myForm"]["rate"].value);
    let r = rate / 1200;
    let n = time*12;
    let investment = p;
    let monthlyEmi = p *r* Math.pow(1 + r , n)/(Math.pow(1+r,n)-1);
    let interest=monthlyEmi*n-p;
    document.querySelector(".value-t").innerHTML = `Loan Tenure :   ${time} Yr`;
    call(investment, interest);
  });