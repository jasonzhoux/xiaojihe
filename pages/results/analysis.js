//函数备份
/*var chicks = 10;
var topten = 12;
var killmax = 14;
var killsum = 130;
var matchsum = 13;
var headshotsum = 60;
var deathsum = 3;*/
var compare = function () {
  var temp = arguments[0]
  for (var i = 1; i < arguments.length; i++) {
    if (temp < arguments[i]) {
      temp = arguments[i]
    }
  }
  return temp
}
var sum = function () {
  var sum = 0
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i]
  }
  return sum
}
var analysis = function (chicks, topten, killmax, killsum, matchsum, headshotsum, deathsum){

  var weight = 0;

  var weight_headshot = 0.40;
  var weight_chicks = 0.20;
  var weight_topten = 0.05;
  var weight_kda = 0.25;
  var weight_killmax = 0.10;

  var analy_headshot;
  var analy_chicks;
  var analy_topten;
  var analy_kda;
  var analy_killmax;

  var e = 2.7183;
  //headshot
  if (killsum <= 10) {
    weight = 0.2;
  }
  else if (killsum <= 50) {
    weight = 0.5;
  }
  else if (killsum <= 100) {
    weight = 0.8;
  }
  else {
    weight = 1;
  }
  var headshotrate = headshotsum / killsum;

  if (headshotrate > 0.69) {
    analy_headshot = 1;
  }
  else {
    analy_headshot = weight * (2 * (Math.pow(1.06, 1.5 * (headshotrate * 100) - 10) + 5) + 0.1 * (headshotrate * 100)) / 100;
  }


  if (analy_headshot < 0) {
    analy_headshot = 0;
  }
  else if (analy_headshot > 1) {
    analy_headshot = 1;
  }
  //alert(analy_headshot);



  //chicks
  if (matchsum <= 10) {
    weight = 0.3;
  }
  else if (matchsum <= 30) {
    weight = 0.6;
  }
  else if (matchsum <= 50) {
    weight = 0.9;
  }
  else {
    weight = 1;
  }
  var chicksrate = chicks / matchsum;


  if (chicksrate > 0.83) {
    analy_chicks = 1;
  }
  else {
    analy_chicks = weight * (0.18 * (Math.pow(chicksrate * 100, 1.7)) + 5) / 100;
  }


  if (analy_chicks < 0) {
    analy_chicks = 0;
  }
  else if (analy_chicks > 1) {
    analy_chicks = 1;
  }
  //alert(analy_chicks);



  //topten
  if (matchsum <= 10) {
    weight = 0.75;
  }
  else if (matchsum <= 30) {
    weight = 0.85;
  }
  else if (matchsum <= 50) {
    weight = 0.95;
  }
  else {
    weight = 1;
  }
  var toptenrate = topten / matchsum;

  analy_topten = weight * (0.19 * Math.pow((toptenrate * 100), 1.43)) / 100;


  if (analy_topten < 0) {
    analy_topten = 0;
  }
  else if (analy_topten > 1) {
    analy_topten = 1;
  }
  //alert(analy_topten);




  //kda
  if (matchsum <= 10) {
    weight = 0.45;
  }
  else if (matchsum <= 30) {
    weight = 0.85;
  }
  else if (matchsum <= 50) {
    weight = 0.95;
  }
  else {
    weight = 1;
  }
  var kda = killsum / (deathsum === 0 ? deathsum + 1 : deathsum)
  if (kda >= 16) {
    analy_kda = 1;
  }
  else {
    analy_kda = weight * (100 * Math.pow(e, (-3.5 + 0.6 * kda)) / (1 + Math.pow(e, (-3.5 + 0.6 * kda)))) / 100;
  }
  if (analy_kda < 0) {
    analy_kda = 0;
  }
  else if (analy_kda > 1) {
    analy_kda = 1;
  }
  //alert(analy_kda);


  //killmax
  if (matchsum <= 10) {
    weight = 1;
  }
  else if (matchsum <= 30) {
    weight = 0.99;
  }
  else if (matchsum <= 50) {
    weight = 0.98;
  }
  else {
    weight = 0.97;
  }
  analy_killmax = weight * (5 * killmax) / 100;
  if (analy_killmax < 0) {
    analy_killmax = 0;
  }
  else if (analy_killmax > 1) {
    analy_killmax = 1;
  }
  //alert(analy_killmax);

  var analy = analy_headshot * weight_headshot + analy_chicks * weight_chicks + analy_topten * weight_topten + analy_kda * weight_kda + analy_killmax * weight_killmax;

  //alert(analy);
  var specialtreatment = false;
  if (matchsum >= 15 && (killmax >= 20 || kda > 15 || headshotrate >= 0.6 || chicksrate >= 0.6)) {
    analy = 0.99;
    specialtreatment = true;
  }
  else if (analy >= 0.99) {
    analy = 0.99;
  }
  else {
    analy = analy.toFixed(2);
  }

  var result = {
    "specialtreatment": specialtreatment,
    "analy": analy,
    "static": {

      "analy_headshot": analy_headshot,
      "analy_chicks": analy_chicks,
      "analy_topten": analy_topten,
      "analy_kda": analy_kda,
      "analy_killmax": analy_killmax
    }

  }
  return result;

}


function chg2level(value) {
  value = value.toFixed(2);
  if (value < 0 || value > 1.00) {
    return false;
  }
  else if (value >= 0 && value < 0.20) {
    return "never";
  }
  else if (value >= 0.20 && value < 0.50) {
    return "normal";
  }
  else if (value >= 0.50 && value < 0.85) {
    return "almost";
  }
  else if (value >= 0.85 && value <= 1.00) {
    return "extreme"
  }

}

module.exports = {
  analysis:analysis,
  compare:compare,
  sum:sum
}