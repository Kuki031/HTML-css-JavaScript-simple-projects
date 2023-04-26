window.addEventListener("DOMContentLoaded", () => {

    const gameBtns = Array.from(document.querySelectorAll('.btn'));
    const spans = Array.from(document.querySelectorAll('.span'));
    const resetGameBtn = document.querySelector('#reset-btn');
    const simbols = ['👊','✌','📄'];
    let myScore = 0;
    let botScore = 0;
    let randomNum;
    let assignWinner;



    function mainFunction (e) {
        randomNum = Math.floor(Math.random() * gameBtns.length);
        let mainEl = parseInt(e.target.id);

        //Draw
        mainEl === randomNum ? assignWinner = 'Draw!' : null;
        //Fist
        mainEl === 0 && randomNum === 1 ? assignWinner = 'You win!'  : null;
        mainEl === 0 && randomNum === 2 ? assignWinner = 'Opponent wins!' : null;
        //Scissors
        mainEl === 1 && randomNum === 0 ? assignWinner = 'Opponent wins!' : null;
        mainEl === 1 && randomNum === 2 ? assignWinner = 'You win!'  : null;
        //Paper
        mainEl === 2 && randomNum === 0 ? assignWinner = 'You win!'  : null;
        mainEl === 2 && randomNum === 1 ? assignWinner = 'Opponent wins!' : null;
        //Update score
        assignWinner === 'You win!' ? myScore++ : assignWinner === 'Opponent wins!' ? botScore++ : null;


        spans.forEach(span => {
            switch(span.id){
                case "myChoice" :
                    span.textContent = e.target.textContent; 
                    break;
                case "botChoice":
                    span.textContent = simbols[randomNum];
                    break;
                    
                case "winner" :
                    span.textContent = assignWinner;
                    assignWinner === 'You win!' ? span.style.color = 'lime' : assignWinner === 'Opponent wins!' ? span.style.color = 'red' : span.style.color = 'skyblue';
                    break;
        
                case "myScore" :
                    span.textContent = myScore;
                    break;
                case "botScore" :
                    span.textContent = botScore;
                    break;
                    default: undefined;
            }
        })
    }

    gameBtns.forEach((button,index) => {
        button.setAttribute('id',index);
        button.addEventListener('click' , mainFunction);
    })


    function resetGame() {
        myScore = 0;
        botScore = 0;
        spans.forEach(span => span.textContent = '');
    }
    resetGameBtn.addEventListener('click' , resetGame);
})