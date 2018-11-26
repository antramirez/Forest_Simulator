// array of emojis
const emojis = ['\xa0\xa0\xa0\xa0\xa0', '\xa0\xa0\xa0\xa0\xa0', '🐹', '🐰', '🐊', '🐇', '🌲', '🌳', '🌴', '🌱', '🌿', '🍃', '🎋', '🎍', '🍀', '☘️', '🌸', '🌼', '🌻', '🌹', '🌷', '💐', '🍄'];

const simpsonsIndex = forest =>
1 - Object.entries(
[...forest.join("")].reduce(
    (counts, emoji) => ({...counts, [emoji]: (counts[emoji] || 0) + 1}),
    {}
)
).reduce(([top, bottom], [species, count]) => [top + (count * (count - 1)), bottom + count], [0, 0])
.reduce((sumLilN,bigN) => sumLilN / (bigN * (bigN - 1)));

// run main function once DOM content has loaded
document.addEventListener('DOMContentLoaded', main);

function main() {
  // add event listener to the generate button,
  // which will hide intro and show sim div
  const btn = document.querySelector('button');
  btn.addEventListener('click', generate);
}

function generate(evt) {
  // hide intro
  const intro = document.querySelector('#intro');
  intro.classList.add('hidden');
  // show sim div
  const sim = document.querySelector('#sim');
  sim.classList.remove('hidden');

  // generate forest, which depends on whether or not user typed input
  generateForest();

  // do not reload page nor send data via form
  evt.preventDefault();
}

function generateForest() {
  let userInput = false;
  const inputForest = document.querySelector('#inputForest');
  if (inputForest.value) {
    userForest(inputForest.value);
  }
  else {
    randomForest();
  }

  // create button and append it to sim div
  const btn = document.createElement('button');
  btn.innerText = 'regenerate';
  const sim = document.querySelector('#sim');
  sim.appendChild(btn);
  // add event listener to regnerate non-selected rows
  btn.addEventListener('click', regenerate)
}

function userForest(input) {

}

function randomForest() {
  for (let i = 0; i < 8; i++) {
    // create a new div for each row
    const row = document.createElement('div');
    // row.textContext = '';
    for (let j = 0; j < 8; j++) {
      // add random emoji from array to new div
      const index = Math.floor(Math.random() * emojis.length);
      row.innerText += emojis[index];
      // console.log(row.textContext);
    }
    // append new div to sim container
    const sim = document.querySelector('#sim');
    sim.appendChild(row);

    // on click handler to save/pin rows
    row.addEventListener('click', selectRow);
  }
}

function regenerate() {
  // get child elements of sim container (though the last one is a button)
  const rows = document.querySelector('#sim').children;
  // loop through 8 children (the rows)
  for (let i = 0; i < 8; i++) {
    // if the current row has not been clicked on/selected, randomize its 8 characters with random emojis
    if (!rows[i].classList.contains('selected')) {
      rows[i].innerText = '';
      for (let j = 0; j < 8; j++) {
        const index = Math.floor(Math.random() * emojis.length);
        rows[i].innerText += emojis[index];
      }
    }
  }
  // console.log(simpsonsIndex);
}

function selectRow(evt) {
  // highlight row if clicked on, and add 'selected'class,
  // which is used when determining which rows to regenerate
  evt.target.style.width = '175px';
  evt.target.style.backgroundColor = 'blue';
  evt.target.classList.add('selected');
}
