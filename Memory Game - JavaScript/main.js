"use strict";

const spanScore = document.querySelector('#card-match-score');
const spanTime = document.querySelector('#time-left');
const btnsOptions = Array.from(document.querySelectorAll('.btn'));
const fieldsAll = Array.from(document.querySelectorAll('.card'));
const cardSimbols = ['⚡','⚽','⛏','⭐','🌞','🌛','⚡','⚽','⛏','⭐','🌞','🌛'];
let matchingArr = [];
let fieldsActive = [];
let inactiveFields = [];
let shuffleArr;
let gameActive = false;
let score = 0;
let timeLeft = 60;
let startingInterval;




function startGame () {
        if(!gameActive) return startGame;
        else {
        shuffleArr = cardSimbols.sort(function () {
            return Math.random() - 0.5;
        })
        fieldsAll.forEach((field,index) => {
            field.addEventListener('click' , () => {
                fieldsActive.push(field);
                field.textContent = shuffleArr[index];
                matchingArr.push(shuffleArr[index]);
                inactiveFields.push(field);
                if(matchingArr.length < 2) {
                    inactiveFields.forEach(field => {
                        field.setAttribute('disabled','disabled');
                        field.style.color = 'black';
                    })
                } 
                else {
                    inactiveFields.forEach(field => {
                        field.removeAttribute('disabled');
                        field.style.color = 'black';
                    })
                }
                
                if(matchingArr.length === 2) {
                    for(let i = 0 ; i < matchingArr.length ; i++) {
                        if(matchingArr[0] === matchingArr[1]) {
                            inactiveFields.forEach(field => field.setAttribute('disabled','disabled'));
                            inactiveFields = [];           
                            score = score + 2;
                            if(score >= cardSimbols.length) {
                                setTimeout(() => {
                                    endGame();
                                },500);
                            }
                            spanScore.textContent = score;
                            matchingArr = [];
                            fieldsActive.slice(0,1);
                            fieldsActive = [];
                            break;
                        }
                        else {
                            setTimeout(() => {
                                inactiveFields = [];
                                matchingArr = [];
                                fieldsActive.forEach(field => field.textContent = '');
                                fieldsActive = [];
                            },300)
                        }
                    }
                }
            })
        })
    }   
}

function timeDec () {
    timeLeft--;
    spanTime.textContent = timeLeft;
    if(timeLeft === 0) endGame();
}

function endGame () {
    alert(`You matched : ${score/2} cards!`);
    spanTime.textContent = '';
    clearInterval(startingInterval);
    fieldsAll.forEach(field => {
        field.setAttribute('disabled','disabled');
        field.textContent = '';
    });
    return timeDec;
}

btnsOptions.forEach(button => {
    switch(button.id) {
        case "start-game" :
            button.addEventListener('click' , () => {
                gameActive = true;
                startGame();
                startingInterval = setInterval(timeDec,500);
                button.setAttribute('disabled','true');
            });
            break;
            
        case "new-game" :
            button.addEventListener('click' , () => window.location.reload());
            break;

            default : undefined;
    }
})