let game = document.querySelector('.game');
let start = document.querySelector('.start-game');
let restart = document.querySelector('.restart-game');
let clouds = document.querySelector('.clouds');
let pipe = document.querySelector('.pipe');
let mario = document.querySelector('.mario');
let scoreNumber = document.querySelector('.number');

let lifes = 3;
let score = -1;

function gameInit(){
    setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const cloudsPosition = clouds.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 190){
            stopGame(pipePosition, cloudsPosition, marioPosition);
            clearInterval(gameInit);
        }
    }, 10);
}

function jump(){
    if(!game.classList.contains('stoped')){
        if(mario.classList.contains('start')){
            mario.classList.add('jump');
            setTimeout(() => {
                mario.classList.remove('jump');
            }, 500);
            score++;
            scoreNumber.innerText = score;
        }
    }
}

function stopGame(pipePosition, cloudsPosition, marioPosition){
    pipe.style.animation = 'none';
    mario.style.animation = 'none';
    clouds.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;
    clouds.style.left = `${cloudsPosition}px`;
    mario.style.bottom = `${marioPosition}px`;
    mario.src = './dist/img/mario-stoped.png';
    game.classList.add('stoped');
    restart.style.display = 'block';
}

function startGame(){
    start.style.display = 'none';

    pipe.classList.add('start');
    clouds.classList.add('start');
    mario.classList.add('start');

    mario.src = './dist/img/mario.gif';
    
    gameInit();
}

function restartGame(){
    restart.style.display = 'none';
    game.classList.remove('stoped');
    pipe.attributeStyleMap.delete('animation');
    pipe.attributeStyleMap.delete('left');
    clouds.attributeStyleMap.delete('animation');
    clouds.attributeStyleMap.delete('left');
    mario.attributeStyleMap.delete('animation');
    mario.attributeStyleMap.delete('bottom');
    mario.src = './dist/img/mario.gif';
    score = -1;
}

document.addEventListener('click', jump);
document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        jump();
    }
});