const tiles = Array.from(document.querySelectorAll('.tile'));
const bigTiles = Array.from(document.querySelectorAll('.tileBig'));
const playerDisplay = document.querySelector('.display-player');
const resetButton = document.querySelector('#reset');
const announcer = document.querySelector('.announcer');

let smallBoard = ['','','','','','','','',''];
let bigBoard = ['','','','','','','','',''];
let currentPlayer = 'X';
let spelActief = true;
let startSpeler = 'X';
const PLAYERX_WON = 'PLAYERX_WON';
const PLAYERO_WON = 'PLAYERO_WON';
const TIE = 'TIE';

tiles.forEach((tile,index) => {
    tile.addEventListener('click',() => spelerActie(tile,index));
});
bigTiles.forEach((bigTile, index) => {

});

const checkTile = (tile) => {
    if (tile.innerText === 'X' || tile.innerText === 'O'){
        return false;
    }

    return true;
};
const updateBoard =  (index) => {
    smallBoard[index] = currentPlayer;
}

const spelerActie = (tile, index) => {
    if (checkTile(tile) && spelActief) {
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        winnen();
        spelerChange();
    }
};
const spelerChange = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X'? 'O': 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`)
}
const winCondities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const winnen = function () {
    let winRonde = false;
    for(let i = 0; i < 8; i++){
        const winConditie = winCondities[i];
        const a = smallBoard[winConditie[0]];
        const b = smallBoard[winConditie[1]];
        const c = smallBoard[winConditie[2]];
        if(a === "" || b === "" || c === ""){
            winRonde = false;
        }
        else if(a === b && b === c){
            winRonde = true;
            break;
        }
    }
    if(winRonde){
        displayWinst(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
        spelActief = false;
    }
    else if(!smallBoard.includes("")) displayWinst(TIE);
}
const displayWinst = function(type) {
    switch(type){
        case PLAYERO_WON:
            announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
            break;
        case PLAYERX_WON:
            announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
            break;
        case TIE:
            announcer.innerText = 'Tie';
    }
    announcer.classList.remove('hide');
};
const reset = function() {
    let smallBoard = ['','','','','','','','',''];
    spelActief = true;
    announcer.classList.add('hide');
    if(startSpeler === 'X'){
        startSpeler = 'O';
    }
    else{
        startSpeler = 'X';
    }

    tiles.forEach(tile => {
        tile.innerText = '';
        tile.classList.remove('playerX');
        tile.classList.remove('playerO');
    });
}
resetButton.addEventListener('click', reset);