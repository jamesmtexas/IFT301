"use strict";

/*
	Author: James Murphy
	Date: 09/21/2022
	File: combat.js

	Combat Level Calculator
*/

function runCalculator() {
  /* Retrieve data from form */
  var hp = validateInput(parseInt(document.getElementById("hitpoints").value), true);
  var att = validateInput(parseInt(document.getElementById("attack").value), false);
  var str = validateInput(parseInt(document.getElementById("strength").value), false);
  var def = validateInput(parseInt(document.getElementById("defence").value), false);
  var ranged = validateInput(parseInt(document.getElementById("ranged").value), false);
  var magic = validateInput(parseInt(document.getElementById("magic").value), false);
  var prayer = validateInput(parseInt(document.getElementById("prayer").value), false);

  /* Calculate current combat level */
  var cblevel = calculateCombatLevel(hp, att, str, def, ranged, magic, prayer);

  /* Update HTML with calculated combat level */
  var cbHTML = document.getElementById("cblevel");
  cbHTML.textContent = "Combat level: " + cblevel;

  // If not max combat
  if (cblevel < 126) {
    /* Calculate string of level requirements for next combat level */
    var nextLevelReqs = calculateNextLevelReqs(cblevel, hp, att, str, def, ranged, magic, prayer);

    /* Update HTML with requirements */
    var nextLevelHTML = document.getElementById("nextLevel");
    nextLevelHTML.textContent = "Skills needed to reach combat level " + (cblevel + 1) + ":";

    var reqsHTML = document.getElementById("reqs");
    reqs.textContent = nextLevelReqs;
  }
  else {
    var nextLevelHTML = document.getElementById("nextLevel");
    nextLevelHTML.textContent = "";
    var reqsHTML = document.getElementById("reqs");
    reqs.textContent = "";
  }
}

function calculateCombatLevel(hp,att,str,def,ranged,magic,prayer) {
  /* Take Prayer level, divide by two and round down */
  var step1 = Math.floor(prayer/2);

  /* Add the result to Hitpoints and Defence, divide the result by 4 */
  var base = (step1 + hp + def) / 4;

  /* Add Strength and Attack levels together and multiply by 0.325. */
  var meleeBase = (att + str) * 0.325;

  /* Divide magic level by 2 and round down, then add magic level to result. Multiply by 0.325. */
  var mageBase = (Math.floor(magic / 2) + magic) * 0.325;

  /* Divide ranged level by 2 and round down, then add ranged level to result. Multiply by 0.325. */
  var rangeBase = (Math.floor(ranged / 2) + ranged) * 0.325;

  /* Add the highest value of the above to the base combat level to obtain the final combat level */
  var cblevel = Math.floor(Math.max(meleeBase, mageBase, rangeBase) + base);

  return cblevel;
}

function calculateNextLevelReqs(cblevel, hp, att, str, def, ranged, magic, prayer) {

  var requirements = "";

  // HP level requirement
  var i = 1;
  while (calculateCombatLevel(hp+i,att,str,def,ranged,magic,prayer) === cblevel) {
    i++
  }
  requirements += "HP: " + i + ", ";

  // Attack level requirement
  i = 1;
  while (calculateCombatLevel(hp,att+i,str,def,ranged,magic,prayer) === cblevel) {
    i++
  }
  requirements += "Attack: " + i + ", ";

  // Strength level requirement
  i = 1;
  while (calculateCombatLevel(hp,att,str+i,def,ranged,magic,prayer) === cblevel) {
    i++
  }
  requirements += "Strength: " + i + ", ";

  // Defence level requirement
  i = 1;
  while (calculateCombatLevel(hp,att,str,def+i,ranged,magic,prayer) === cblevel) {
    i++
  }
  requirements += "Defence: " + i + ", ";

  // Ranged level requirement
  i = 1;
  while (calculateCombatLevel(hp,att,str,def,ranged+i,magic,prayer) === cblevel) {
    i++
  }
  requirements += "Ranged: " + i + ", ";

  // Magic level requirement
  i = 1;
  while (calculateCombatLevel(hp,att,str,def,ranged,magic+i,prayer) === cblevel) {
    i++
  }
  requirements += "Magic: " + i + ", ";

  // Prayer level requirement
  i = 1;
  while (calculateCombatLevel(hp,att,str,def,ranged,magic,prayer+i) === cblevel) {
    i++
  }
  requirements += "Prayer: " + i + ", ";


  return requirements;
}

function validateInput(value, isHP){
  if (isHP) { if (value < 10) {return 10;} }
  if (value < 1) {
    return 1;
  } else if (value > 99) {
    return 99;
  } else {
    return value;
  }
}
