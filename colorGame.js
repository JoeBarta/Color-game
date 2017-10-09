// need a variable to keep track of what mod we are in
// without this var ,when on easy and click play again we will be playing with
// 6 squares even though we only see 3
var numSquares = 6;

// variable where the colors get chosen from
var colors = generateRandomColors(6);
// select all square divs
var squares = document.querySelectorAll('.square');
// the color that displays at the top of the page
var pickedColor = pickColor();
// target the span to change the picked color
var colorDisplay = document.getElementById('colorDisplay');
colorDisplay.textContent = pickedColor;
// select the message
var messageDisplay = document.querySelector('#message');
var h1 = document.querySelector('h1');
var resetButton = document.querySelector('#reset');
var easyBtn = document.querySelector('#easyBtn');
var hardBtn = document.querySelector('#hardBtn')



// setting the game to display 3 divs only
// easy.. also adds selected CSS class to show which mode you are on
easyBtn.addEventListener('click', function () {
    hardBtn.classList.remove('selected');
    easyBtn.classList.add('selected');
    // checking game mode
    numSquares = 3;
    // only selecting 3
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    // only changing colors for top 3
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.backgroundColor = colors[i];
        } else {
            // hiding the bottom 3 divs
            squares[i].style.display = 'none';
        }
    }
});

// setting the game to dispaly 6 divs when you click on hard mode 
hardBtn.addEventListener('click', function () {
    hardBtn.classList.add('selected');
    easyBtn.classList.remove('selected');
    numSquares = 6;
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].style.display = 'block';
    }
});

// reset button 
resetButton.addEventListener('click', function () {
    // generate all new colors
    colors = generateRandomColors(numSquares);
    // pick a new random color from array
    pickedColor = pickColor();
    // change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    this.textContent = 'New Colors'
    // remove the winning/losing message after reset
    messageDisplay.textContent = '';
    // change color of squares
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
    };
    h1.style.backgroundColor = 'steelblue';
});

//loop through all of the squares assigning them a color
for (var i = 0; i < squares.length; i++) {
    // add initial colors to squares
    squares[i].style.backgroundColor = colors[i];

    // add click listeners to squares
    squares[i].addEventListener('click', function () {
        // grab color of clicked square
        var clickedColor = this.style.backgroundColor;
        // compare color to picked color
        if (clickedColor === pickedColor) {
            // if correct make all the squares the same color 
            this.style.backgroundColor;
            messageDisplay.textContent = 'correct';
            resetButton.textContent = 'Play Again?';
            changeColors(clickedColor);
            h1.style.backgroundColor = clickedColor;
            // if it wrong fade the color to background
        } else {
            this.style.backgroundColor = '#232323';
            messageDisplay.textContent = 'try again';
        }
    });
}

// to keep code more organized create a new function just to change colors
function changeColors(color) {
    // loop through all squares
    for (var i = 0; i < squares.length; i++) {
        // change each color to match given color 
        squares[i].style.backgroundColor = color;
    };
}

// function that chooses a random number and color
function pickColor() {
    // floor number so no decimals, random number
    var random = Math.floor(Math.random() * colors.length);
    // this picks a random number, so it retuns colors[3] for example 
    return colors[random];
}

// inside this function we will use another function
function generateRandomColors(num) {
    // make array
    var arr = []
    // repeat num times
    for (var i = 0; i < num; i++) {
        // get random color and push into arr
        arr.push(randomColor());
    }
    // return that arr
    return arr;
}

// generate a random color
function randomColor() {
    // pick a red from 0 - 255
    // need to multiply by 256 for 255 to be the greatest number possible
    var r = Math.floor(Math.random() * 256);
    // pick green from 0 - 255
    var g = Math.floor(Math.random() * 256);
    // pick a blue from 0 - 255
    var b = Math.floor(Math.random() * 256);
    // make into string
    return "rgb(" + r + ", " + g + ", " + b + ")";
}