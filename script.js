const start = document.querySelector('#button_start');
const first_screen = document.querySelector('#first_screen')
const main_screen = document.querySelector('#main_screen');
const countdown = document.querySelector('#countdown');
const select_img = document.querySelectorAll('.select_img');
const player = document.querySelector('#player__choice');
const animPlayer = document.querySelector('#animPlayer');
const images = ['./rock.svg', './scissors.svg', './paper.svg'];
const overlays = document.querySelectorAll('.overlay');
const animComp = document.querySelector('#animComp');
const computer = document.querySelector('#computer__choice');
const pScore = document.querySelector('#pScore');
const cScore = document.querySelector('#cScore');
const resultOutput = document.querySelector('#result');
const finalRes = document.querySelector('#final_result');
const finalScreen = document.querySelector('#final_screen');
const rules = document.querySelector('#btn_rls');
const rulesText = document.querySelector('#rules');
const buttons = document.querySelector('#buttons');
const closeRules = document.querySelector('#closeRules');
const play = document.querySelector('#start');
const properties = document.querySelector('#props');
const colors = document.querySelectorAll('input[name="color"]')
const playerLayout = document.querySelector('#playerLayout');
const regimes = document.querySelectorAll('input[name="regime"]');
const playerName = document.querySelector('#name');
const nameOutput = document.querySelector('#nameOutput');
const condition = document.querySelector('#win_conditn');
const selectOver = document.querySelectorAll('.select_over');
const props_back = document.querySelector('#props__back')

let player_choice;
let pCount = 0;
let cCount = 0;
let forWin = 5;
let pColor;
start.onclick = function(){
    buttons.style.display = 'none';
    properties.style.display = 'flex';
}

playerName.oninput = function(){
    playerName.value.length<3 || playerName.value.length>15 ? playerName.style.borderColor = 'red' : playerName.style.borderColor='green';
}

play.onclick = function(){
    if(playerName.value.length>=3&&playerName.value.length<=15){
        first_screen.style.display = 'none';
        main_screen.style.display = 'flex';
        properties.style.display = 'none';
        buttons.style.display = 'grid';
        pCount = 0;
        cCount = 0;
        pScore.innerText = pCount;
        cScore.innerText = cCount;
        for(let color of colors){
            if(color.checked){
                pColor = color.value;
                playerLayout.style.backgroundColor = 'rgb('+pColor+')';
            }
        }
        for(let select of selectOver){
            select.style.backgroundColor = 'rgba('+pColor+' ,0.8)';
        }
        for(let regime of regimes){
            if(regime.checked){
                forWin = +(regime.value);
            }
        }
        nameOutput.innerText = playerName.value;
        condition.innerText = 'Игра до ' + forWin;
        Reset();
        }
    else{
        playerName.style.borderColor = 'red';
    }
}
finalScreen.onclick = function(){
    finalScreen.style.display = 'none';
    first_screen.style.display = 'flex';
}
closeRules.onclick = function(){
    rulesText.style.display = 'none';
    buttons.style.display = 'grid';
}
rules.onclick = function(){
    rulesText.style.display = 'block';
    buttons.style.display = 'none';
}
props_back.onclick = function(){
    buttons.style.display = 'flex';
    properties.style.display = 'none';
}

function Winner(){
    for(let j=0;j<overlays.length;j++){
        overlays[j].style.display='none';
    }
    finalScreen.style.display = 'flex';
    main_screen.style.display = 'none';
    if(pCount==forWin){
        finalRes.innerText = 'Вы победили!'
        finalRes.style.color = 'rgb('+pColor+')';
    }
    if(cCount==forWin){
        finalRes.innerText = 'Вы проиграли!'
        finalRes.style.color = 'red';
    }
}

function Reset(){
    player.src = images[0];
    computer.src = images[0];
    resultOutput.classList.remove('active');
}

function ComputerChoice(){
    return Math.floor(Math.random() * 3);
}

function ShowResult(p, c){
    resultOutput.classList.add('active');
    if(p==c){
        resultOutput.innerText = 'Ничья';
        resultOutput.style.color = 'yellow';
    }
    if(p==0 && c==1){
        resultOutput.innerText = 'Победа'
        resultOutput.style.color = 'rgb('+pColor+')';
        pCount +=1;
    }
    if(p==0 && c==2){
        resultOutput.innerText = 'Поражение'
        resultOutput.style.color = 'red';
        cCount += 1;
    }
    if(p==1 && c==0){
        resultOutput.innerText = 'Поражение'
        resultOutput.style.color = 'red';
        cCount += 1;
    }
    if(p==1 && c==2){
        resultOutput.innerText = 'Победа'
        resultOutput.style.color = 'rgb('+pColor+')';
        pCount +=1;
    }
    if(p==2 && c==0){
        resultOutput.innerText = 'Победа'
        resultOutput.style.color = 'rgb('+pColor+')';
        pCount +=1;
    }
    if(p==2 && c==1){
        resultOutput.innerText = 'Поражение'
        resultOutput.style.color = 'red';

        cCount += 1;
    }
}

for(let i = 0; i<select_img.length; i++){
    select_img[i].addEventListener('click', e=>{
        if(e.target.classList.contains('overlay')){
            return;
        }
        else{
            Reset();
            for(let j=0;j<overlays.length;j++){
                overlays[j].style.display='block';
            }
            let compChoice = ComputerChoice();
            animPlayer.classList.add('anim');
            animComp.classList.add('anim');
        setTimeout(()=>{
            plChoice = i;
            ShowResult(plChoice, compChoice);
            player.src = images[i];
            computer.src = images[compChoice];
            animPlayer.classList.remove('anim');
            animComp.classList.remove('anim');
            pScore.innerText = pCount;
            cScore.innerText = cCount;
            if(pCount==forWin-1&&cCount==forWin-1&&forWin>1){
                forWin +=1;
                condition.innerText = 'Игра до ' + forWin;
            }
            for(let j=0;j<overlays.length;j++){
                overlays[j].style.display='none';
            }
            if(pCount == forWin||cCount == forWin){
                for(let j=0;j<overlays.length;j++){
                    overlays[j].style.display='block';
                }
                setTimeout(Winner,1000)
            }
        },1250)
        } 
    })
}
