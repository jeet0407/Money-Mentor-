let p1 = parseInt(document["myForm"]["investment"].value);
let rate1=parseFloat(document["myForm"]["rate"].value);
let time1 = parseInt(document["myForm"]["time"].value);
let withdrawalMonth = parseInt(document["myForm"]["month"].value);

document.querySelector(
  ".value-p"
).innerHTML = `Total Investment : ₹ ${p1.toLocaleString("en-IN")}`;
document.querySelector(
  ".value-m"
).innerHTML = `Withdrawal  :  ₹ ${withdrawalMonth.toLocaleString(
  "en-IN"
)}/month`;

document.querySelector(".value-r").innerHTML = `Annual Rate : ${rate1}%`;
document.querySelector(".value-t").innerHTML = `Time period :   ${time1} Yr`;

let r = rate1 / 1200;
let finalValue =
  p1 * Math.pow(1 + r, time1 * 12) -
  withdrawalMonth * (Math.pow(1 + r, time1 * 12) - 1) / r;

document.querySelector(
  ".value-invest"
).innerHTML = `Total Investment : ₹ ${p1.toLocaleString("en-IN")}`;
document.querySelector(
  ".value-withdrawal"
).innerHTML = `Total Withdrawal : ₹ ${(
  withdrawalMonth *
  time1 *
  12
).toLocaleString("en-IN")}`;
document.querySelector(
  ".value-final"
).innerHTML = `Final Value: ₹ ${finalValue.toLocaleString("en-IN")}`;

document.getElementById("investment").addEventListener("change", (e) => {
  let p = parseInt(e.currentTarget.value);
  let rate = parseFloat(document["myForm"]["rate"].value);
  let time = parseInt(document["myForm"]["time"].value);
  let withdrawal = parseInt(document["myForm"]["month"].value);

  rate = rate / 1200;
  let final =
    p * Math.pow(1 + rate, time * 12) -
    (withdrawal * (Math.pow(1 + rate, time * 12) - 1)) / rate;

  document.querySelector(
    ".value-p"
  ).innerHTML = `Total Investment : ₹  ${p.toLocaleString("en-IN")}`;

  document.querySelector(
    ".value-invest"
  ).innerHTML = `Total Investment : ₹ ${p.toLocaleString("en-IN")}`;

  document.querySelector(
    ".value-final"
  ).innerHTML = `Final Value: ₹ ${final.toLocaleString("en-IN")}`;
});

document.getElementById("rate").addEventListener("change", (e) => {
  let rate = parseFloat(e.currentTarget.value);
  let p = parseInt(document["myForm"]["investment"].value);
  let time = parseInt(document["myForm"]["time"].value);
  let withdrawal = parseInt(document["myForm"]["month"].value);
  let rate2 = rate / 1200;
  let final =
    p * Math.pow(1 + rate2, time * 12) -
    (withdrawal * (Math.pow(1 + rate2, time * 12) - 1)) / rate2;

  document.querySelector(".value-r").innerHTML = `Annual Rate : ${
    rate
  }%`;

  document.querySelector(
    ".value-final"
  ).innerHTML = `Final Value: ₹ ${final.toLocaleString("en-IN")}`;
});

document.getElementById("time").addEventListener("change", (e) => {
  let time = parseInt(e.currentTarget.value);
  let p = parseInt(document["myForm"]["investment"].value);
  let rate = parseFloat(document["myForm"]["rate"].value);
  let withdrawal = parseInt(document["myForm"]["month"].value);
  rate = rate / 1200;
  let final =
    p * Math.pow(1 + rate, time * 12) -
    (withdrawal * (Math.pow(1 + rate, time * 12) - 1)) / rate;

  document.querySelector(".value-t").innerHTML = `Time period :   ${time} Yr`;

  document.querySelector(
    ".value-withdrawal"
  ).innerHTML = `Total Withdrawal : ₹ ${(
    withdrawal *
    time*12
  ).toLocaleString("en-IN")}`;

  document.querySelector(
    ".value-final"
  ).innerHTML = `Final Value: ₹ ${final.toLocaleString("en-IN")}`;
});

document.getElementById("month").addEventListener("change", (e) => {
  let withdrawal = parseInt(e.currentTarget.value);
  let p = parseInt(document["myForm"]["investment"].value);
  let rate = parseFloat(document["myForm"]["rate"].value);
  let time = parseInt(document["myForm"]["time"].value);

  rate = rate / 1200;
  let final =
    p * Math.pow(1 + rate, time * 12) -
    (withdrawal * (Math.pow(1 + rate, time * 12) - 1)) / rate;

  document.querySelector(
    ".value-m"
  ).innerHTML = `Withdrawal  :  ₹ ${withdrawal.toLocaleString("en-IN")}/month`;

  document.querySelector(
    ".value-withdrawal"
  ).innerHTML = `Total Withdrawal : ₹ ${(
    withdrawal *
    time*12
  ).toLocaleString("en-IN")}`;
  document.querySelector(
    ".value-final"
  ).innerHTML = `Final Value: ₹ ${final.toLocaleString("en-IN")}`;
});
