const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const colors = ['#BD162C', '#8e44ad', '#FBE122', '#00A0DE', '#FFFFFF', '#00A19B', '#FF8000'];
let timer;
let time = 0;
let score = 0;

startBtn.addEventListener('click', event => {
    event.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('date-time'))
        screens[1].classList.add('up');
        startGame();
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
})

function startGame() {
    timer = setInterval(decreseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let currentTime = --time;
        if (currentTime < 10) {
            currentTime = `0${currentTime}`
        }
        setTime(currentTime)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    clearInterval(timer);
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`;

    const button = document.createElement('button');
    button.classList.add('time-btn');
    button.textContent = 'Новая игра';

    button.addEventListener('click', event => {
        event.preventDefault();
        screens[1].classList.remove('up');
        board.innerHTML = ''
        timeEl.parentNode.classList.remove('hide');
    });

    board.append(button);
}

function createRandomCircle() {
    const circle = document.createElement("div");
    const size = getRandomNumber(10, 60);

    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');

    const color = getRandomColor()
    circle.style.backgroundColor = color;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}







