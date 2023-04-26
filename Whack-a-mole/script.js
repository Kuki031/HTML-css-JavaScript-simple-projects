window.addEventListener("DOMContentLoaded" , () => {

    const difficultyBtns = Array.from(document.querySelectorAll('.btn'));
    const gameFields = Array.from(document.querySelectorAll('.cell'));
    const resetBtn = document.querySelector('#reset-btn');
    const molePic = new Image();
          molePic.src = 'img/mole.jpg';
          molePic.classList.add('cell');
    let startInterval;
    let isChoosenDifficulty = false;
    let choosenDifficulty;
    let choosenDifficultyStr;
    let randomNum;
    let score = document.querySelector('#score');
    let scoreCount = 0;
    let timeDecrement = 60;
    let time = document.querySelector('#time-span');

        function startGame () {
            timeDecrement--;
            time.textContent = timeDecrement;
            randomNum = Math.floor(Math.random() * gameFields.length);
            for(let i = 0 ; i < gameFields.length ; i++) {
                gameFields[randomNum].append(molePic);
                molePic.classList.contains('cell') ? molePic.classList.toggle('hidden') : molePic.classList.add('cell');
            }
            if(timeDecrement === 0){
                alert(`You finished the game with the score of : ${scoreCount} on ${choosenDifficultyStr}!`);
                clearFunc();
                }
        }
        molePic.addEventListener('click' , () => {
            scoreCount++;
            score.textContent = scoreCount;
            molePic.classList.add('hidden');
        })
        
        function chooseDiff (e) {
            let btn = e.target;
            switch(btn.id) {
                case "easy" :
                    choosenDifficulty = 1200;
                    choosenDifficultyStr = 'Easy';
                    break;
                case "moderate" :
                    choosenDifficulty = 900;
                    choosenDifficultyStr = 'Moderate';
                    break;
                case "hard" :
                    choosenDifficulty = 600;
                    choosenDifficultyStr = 'Hard';
                    break;
                    default : null;   
            }
                    difficultyBtns.forEach(button => button.setAttribute('disabled','disabled'));
                    isChoosenDifficulty = true;
                   
                        isChoosenDifficulty === true ? startInterval = setInterval(startGame,choosenDifficulty) : clearInterval(startInterval);
                        btn.style.backgroundColor = 'skyblue';
        }


        function clearFunc () {
            isChoosenDifficulty = false;
            timeDecrement = 60;
            scoreCount = 0;
            time.textContent = '';
            score.textContent = '';
            clearInterval(startInterval);
            difficultyBtns.forEach(button => {
                button.removeAttribute('disabled');
                button.style.backgroundColor = 'transparent';
            });
            molePic.classList.add('hidden');
        }

        resetBtn.addEventListener('click' , clearFunc);

        difficultyBtns.forEach(button => {
            button.addEventListener('click' , chooseDiff);
        })
})