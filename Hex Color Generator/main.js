const changeColorBtn = document.querySelector('button');
const spanColor = document.querySelector('span');
const chars = ['0123456789ABCDEF'];
let color = [];
let finalColor;
let randomNumber;
let splitChars;


function mainFunction () {

    chars.forEach(char => {
        splitChars = char.split('');
    })
    
    for(let i = 0 ; i < splitChars.length ; i++) {
        randomNumber = Math.floor(Math.random() * splitChars.length);
        color.push(splitChars[randomNumber]);
    }
        finalColor = color.slice(0,6).join('');
        color = [];
        
        changeColorBtn.style.color = `#${finalColor}`;
        document.body.style.backgroundColor = `#${finalColor}`;
        spanColor.innerHTML = `#${finalColor}`;
}


changeColorBtn.addEventListener('click' , mainFunction);