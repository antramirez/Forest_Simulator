// array of emojis
const emojis = ['&emsp;', '&emsp;', '&emsp;', '&emsp;', '🐹', '🐰', '🐊', '🐇', '🌲', '🌳', '🌴', '🌱', '🌿', '🍃', '🎋', '🎍', '🍀', '🌸', '🌼', '🌻', '🌹', '🌷', '💐', '🍄'];

// function that determines Simpson's Index
const simpsonsIndex = forest =>
1 - Object.entries(
[...forest.join("")].reduce(
    (counts, emoji) => ({...counts, [emoji]: (counts[emoji] || 0) + 1}),
    {}
)
).reduce(([top, bottom], [species, count]) => [top + (count * (count - 1)), bottom + count], [0, 0])
.reduce((sumLilN,bigN) => sumLilN / (bigN * (bigN - 1)));

// default number of rows and emojis per row
let numRows = 8;
let numEmojis = 8;

// Simspon's index
let simpsInd = 1.0;

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

  // determine number of rows if there is any user input
  const inputForestVal = document.querySelector('#inputForest').value;
  const inputArr = inputForestVal.split('\n');
  if (inputForestVal) {
    // set number of rows and emoji per row if there is any input,
    // otherwise, the default is 8 for each
    numRows = inputArr.length;
    numEmojis = [...inputArr[0]].length;
  }

  // generate Simpson's Index div, the forest container, and the generate button
  generateDOMelements();

  // generate forest, which depends on whether or not user typed input,
  // using array of every line of the input
  generateForest(inputArr);

  // do not reload page nor send data via form when button is clicked
  evt.preventDefault();
}

function generateDOMelements() {
  // get reference to sim container
  const sim = document.querySelector('#sim');

  // create div for Simpon's Index and append to sim div
  const simpsP = document.createElement('p');
  sim.appendChild(simpsP);

  // create container for forest, initially empty, and append to sim div
  const forestContainer = document.createElement('div');
  for (let i = 0; i < numRows; i++) {
    const row = document.createElement('div');
    row.innerHTML = '';

    // on click handler to save/pin rows
    row.addEventListener('click', selectRow);
    forestContainer.append(row);
  }
  sim.appendChild(forestContainer);

  // create button and add event listener to regenerate non-selected rows
  const btn = document.createElement('button');
  btn.innerText = 'generate';
  btn.addEventListener('click', generateForest);
  sim.appendChild(btn);
}

function generateForest(input) {
  // if there is input, call function with input as parameter to handle user forest
  // it is an array of rows
  const inputForest = document.querySelector('#inputForest');
  if (inputForest.value) {
    userForest(input);
    // clear the text area after the user generates the forest from their input
    // so that if the user clicks generate again, the forest will be randomized
    inputForest.value = '';
  }
  // if no input, randomize the whole forest
  else {
    randomForest();
  }
}

function userForest(input) {
  // get reference to row divs
  const sim = document.querySelector('#sim');
  const rows = sim.children[1].children;
  // create array that will contain every emoji in the forest,
  // to be used to calculate Simpson's Index
  let allEmojis = [];
  for (let i = 0; i < input.length; i++) {
    // get current row and set inner HTML of row div to the current line
    const cur = [...input[i]];
    rows[i].innerHTML = input[i];

    // replace spaces with proper HTML entities
    for (let j = 0; j < cur.length; j++) {
      if (cur[j] === ' ') {
        cur[j] = '&emsp;';
      }
    }
    // add current row's emoji to array
    allEmojis.push(...cur);
  }


}

function randomForest() {
  // create an array that will store all the emoji in the forest,
  // to be used to find Simpson's Index
  let allEmojis = [];
  // get second child element (forest container) of sim container
  const rows = document.querySelector('#sim').children[1].children;
  // loop through the rows
  for (let i = 0; i < rows.length; i++) {
    // if the current row has not been clicked on/selected, randomize its characters with random emojis
    if (!rows[i].classList.contains('selected')) {
      // start row with empty string
      rows[i].innerHTML = '';
      for (let j = 0; j < numEmojis; j++) {
        // check if next character is empty string, and add random emoji
        const index = Math.floor(Math.random() * emojis.length);
        if (emojis[index] !== '') {
          rows[i].innerHTML += emojis[index];
        }
        else {
          rows[i].innerHTML += '&emsp;'
        }
        // add current emoji to array
        allEmojis.push(emojis[index]);
      }
    }
    else {
      // make array out of current row's emojis, meaning don't change them
      const cur = [...rows[i].innerHTML];
      // use spread to add row's emojis to array of all emojis
      allEmojis.push(...cur);
    }
  }

}

function selectRow(evt) {
  // add 'selected'class, which highlights row, and
  // is used when determining which rows to regenerate
  evt.target.classList.add('selected');
}
