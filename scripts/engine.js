const state = {
    view: {
        squares: document.querySelectorAll (".square"),
        enemy: document.querySelector (".enemy"),
        timeLeft: document.querySelector ("#time-left"),
        score: document.querySelector ("#score"),
    },
    values: {
        timerId: null, 
        countDownTimerId: setInterval(countDown, 1000),
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,

    },
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        // Exibe o alert com o tempo acabado e o resultado
        alert("Seu tempo acabou! Seu resultado foi: " + state.values.result + "\nO jogo será reiniciado.");
        
        // Aqui pode ser chamada uma função para reiniciar o jogo, por exemplo:
        resetGame();
    }
}



function playSound (audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.3;
    audio.play();
}


function randomSquare() {
    state.view.squares.forEach ((square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor (Math.random () * 9);
    let randomSquare = state.view.squares [randomNumber];
    randomSquare.classList.add ("enemy");
    state.values.hitPosition = randomSquare.id;
    }

    function moveEnemy() {
        // Função para aumentar a velocidade com base na pontuação
        function updateGameVelocity() {
            // Aumenta a velocidade a cada 5 pontos de score
            if (state.values.result % 5 === 0 && state.values.result > 0) {
                // Diminui o intervalo, tornando o jogo mais rápido (com limite mínimo de 200ms)
                state.values.gameVelocity = Math.max(200, state.values.gameVelocity - 50);
            }
        }
    
        // Atualiza a velocidade com base no score
        updateGameVelocity();
    
        // Inicia ou mantém o movimento do inimigo com o intervalo ajustado
        state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
    }
    
    

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                // Incrementa o resultado e atualiza a pontuação
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;

                // Altera o fundo para vermelho
                square.style.backgroundColor = "red";
                
                // Adiciona o efeito shake
                square.classList.add("shake");
                
                // Remove o shake após a animação e o fundo volta ao normal
                setTimeout(() => {
                    square.classList.remove("shake");
                    square.style.backgroundColor = "rgb(6, 161, 110)";
                }, 300); // O fundo volta ao normal após 300ms

                // Toca o som de acerto
                playSound("hit");
            }
        });
    });
}


function initialize() {
    moveEnemy();
    addListenerHitBox();


}

initialize();