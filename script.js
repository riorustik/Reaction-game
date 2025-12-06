const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const watch = document.querySelector('#time');
const board = document.querySelector('#board');
let time = 0;
let score = 0;

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click', (e) => {
    if (e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
})

board.addEventListener('click', (e) => {
    if(e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
    watch.innerHTML = `00:${time}`;
}

function decreaseTime() {
    if(time === 0 ){
        finishGame();
    }else {
        let currentTime = --time;
        if(currentTime < 10) {
            currentTime = `0${currentTime}`;
        }
        setTime(currentTime);
    }

}

function setTime(time){
    watch.innerHTML = `00:${time}`;
}

function finishGame() {
    watch.parentNode.classList.add('hide');
    // board.classList.add('finish-board');    //функицонал возвращения назад
    board.innerHTML = `<h1>Счет : <span class="primary">${score}</span></h1>`;
    // const upBtn = document.createElement('button'); //функицонал возвращения назад
    // upBtn.textContent = 'Назад'
    // upBtn.classList.add('up-btn');
    // upBtn.addEventListener('click', () => {
    //     screens[1].classList.remove('up');
    // })
    // board.append(upBtn);

}

function createRandomCircle(){
    const circle = document.createElement('div');
    const size= getRandomNumber(10, 70);
    const  {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    board.append(circle);
}

function getRandomNumber(min, max){
    return Math.round(Math.random() * (max - min)) + min;
}