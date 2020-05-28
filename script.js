const gameContainer = document.getElementById("game");
const body = document.querySelector("body");
const startBtn = document.querySelector("#start");
const restartBtn = document.createElement('button');
const scoreBoard = document.querySelector('span[id="current"]');
const highest = document.querySelector('span[id="highest"]');
const cards = document.querySelector('form');
const history = localStorage.getItem("highscore");

let matches = 0;
let oldHigh = 0;
let numOfCards = 0;
let shuffledColors;

const COLORS = [];

startBtn.addEventListener("click",wipeClean);
restartBtn.setAttribute("id","restart");
restartBtn.innerText = "RESTART!";
restartBtn.addEventListener("click",wipeClean);
highest.innerText = parseInt(history);

cards.addEventListener("submit",function(evt){
  evt.preventDefault();
  for (let i = COLORS.length-1; i >= 0 ; i--){
    gameContainer.removeChild(gameContainer.children[i]);
  }
  COLORS.length = 0;
  numOfCards = cards.querySelector('input[id="cards"]').value;
  console.log("card you wanna play is", numOfCards);
  generateRandomColors(numOfCards/2);
  console.log(COLORS);
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  matches = 0;
  scoreBoard.innerText = matches;
  clickCount = 0;
  restartBtn.remove();
})


function generateRandomColors(numOfColors){
  for (let i = 0; i < numOfColors; i++){
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    COLORS.push(`rgb(${r},${g},${b})`);
    COLORS.push(`rgb(${r},${g},${b})`);
  }

}

// const COLORS = [
//   "red",
//   "blue",
//   "green",
//   "orange",
//   "purple",
//   "red",
//   "blue",
//   "green",
//   "orange",
//   "purple"
// ];



// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  //console.log('shuffshuffshuff');
  return array;
}

//let shuffledColors = shuffle(COLORS);


// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let clickCount = 0;
let firstColor;
let firstTarget;
let secondColor;
let secondTarget;
//unfold all the cards except that with class "match"
function reset(){
  console.log('resetting!!!');
  for (let i = 0; i < COLORS.length; i ++){
    //console.log('what is inside',gameContainer.children);
    if (!(gameContainer.children[i].classList.contains("match"))){
      gameContainer.children[i].style.backgroundColor = 'white';
    }    
  }
  clickCount = 0;
}

function wipeClean(){
  for (let i = COLORS.length-1; i >= 0 ; i--){
    gameContainer.removeChild(gameContainer.children[i]);
  }  
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  matches = 0;
  scoreBoard.innerText = matches;
  clickCount = 0;
  restartBtn.remove();
}
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //console.log("you just clicked", event.target);
  clickCount += 1;
  //console.log("clickCount is", clickCount);
  //console.log("its color is", event.target.classList);
  event.target.style.backgroundColor = event.target.classList[0];
  
  if (clickCount === 1){
    firstColor = event.target.classList[0];
    firstTarget = event.target;
    //console.log("firstColor,firstTarget",firstColor,firstTarget);
    //setTimeout(reset,10000);
  }else if(clickCount === 2){
    secondColor = event.target.classList[0];
    secondTarget = event.target;
    if ((firstColor === secondColor) && (firstTarget !== secondTarget)){
      firstTarget.classList.add("match");
      secondTarget.classList.add("match");
      matches += 1;
      scoreBoard.innerText = matches;
      updateHighest(matches);
      reset();
    }else{
      setTimeout(reset,1000);
      //clickCount = 0;
    }
  }else{
    reset();
  }
  if (matches === (COLORS.length/2)){
    body.append(restartBtn);
  }
}

// when the DOM loads
//createDivsForColors(shuffledColors);

function updateHighest(score){  
  if (!history){
    console.log('history is', history);
    oldHigh = 0;
  }else{
    console.log('wtf');
    oldHigh = parseInt(history);
  }
  if (score > oldHigh){
    oldHigh = score;
    console.log('new high score', oldHigh);
    highest.innerText = oldHigh;
  }
  localStorage.setItem("highscore",oldHigh);

}

