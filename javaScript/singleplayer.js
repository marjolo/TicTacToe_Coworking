import AI from './AI.js';

'use strict';

(function() {
    const uitkomsten = {
        X: 'X',
        O: 'O',
        TIE: 'T',
        NONE: ''
    }
    let resetKnop = document.querySelector("#resetButton");
    let menuKnop = document.getElementById('menuButton');
    let bowserImg = document.getElementById('imgBowser');
    let marioImg = document.getElementById('imgMario');

    let board;
    let x = uitkomsten.X,counterX;
    let o = uitkomsten.O,counterO;
    let beginSpeler = x;
    let current_player = beginSpeler;
    let spelActief = true;
    let boards = [];
    let bigBoardConvertedToSingle = ['', '', '', '', '', '', '', '', ''];
    let ai = new AI(o);

    document.addEventListener('DOMContentLoaded', () => {
        setBoards();
    });

    menuKnop.addEventListener("click", () => {
        window.location.href = "../index.html";
    });


    function setBoards() {
        for (let i = 0; i < 9; i++) {
            setBoard(document.querySelector(`#game${i}`));
        }
        showPlayer(current_player);
    }
    function setBoard(div) {

        board = ['', '', '', '', '', '', '', '', ''];
        boards.push(board);

        for (let r = 0; r < 3; r++){
            for (let k = 0; k < 3; k++){
                //<div id="0-0" class="tile"></div>
                let tile = document.createElement("div");
                tile.id = r.toString() + "-" + k.toString() + "/" + div.id;
                tile.classList.add("tile");

                if (r === 0 || r === 1) {
                    tile.classList.add("horizontal-line");
                }
                if (k === 0 || k === 1) {
                    tile.classList.add("vertical-line");
                }

                tile.innerText = "";
                tile.addEventListener('click', setTile);
                div.append(tile);
            }
        }
    }


    function setTile() {

        let coords = this.id.split("-");    //"1-2" -> ["1", "2'"]
        let r = parseInt(coords[0]);
        let k = parseInt(coords[1]);
        const bord = this.id.slice(-1);
        const positie = r * 3 + k;
        setInBoard(bord, positie, current_player);
    }


    const setInBoard = (boardId, pos, player) => {
        if (spelActief && player !== x && player !== o) return;

        if (boards[boardId][pos] !== '') return;

        const tile = document.querySelector(`#game${boardId} > div:nth-child(${pos + 1})`);
        tile.classList.add('tileAnimation');
        boards[boardId][pos] = player;
        tile.innerHTML = player;

        const uitkomst = checkWin(boards[boardId]);
        if (uitkomst !== uitkomsten.NONE) {
            //disable board
            disableBoard(boardId);

            //animation
            if (uitkomst === uitkomsten.X) {
                tile.parentElement.classList.add('xWint');
            }
            else if (uitkomst === uitkomsten.O) {
                tile.parentElement.classList.add('oWint');
            }
            
            console.log(uitkomst + ' wint dit bord');
            bigBoardConvertedToSingle[boardId] = uitkomst;
            const resultaatTotal = checkWin(bigBoardConvertedToSingle);
            if (resultaatTotal !== uitkomsten.NONE)
                gameOver(resultaatTotal);
        }
        current_player === x ? current_player = o : current_player = x;
        showPlayer(current_player);
        if (current_player === ai.char) {
            const AIResponse = ai.getBestMove(Object.assign([],boards), Object.assign([], bigBoardConvertedToSingle));
            setInBoard(AIResponse.resultBig, AIResponse.resultSmall, ai.char);
        }
        else {
            //wait for user
        }

    }
    const showPlayer = function(player){
        if(player === x){
            bowserImg.style.backgroundColor = "red";
            marioImg.style.removeProperty("background-color");
        }
        else{
            marioImg.style.backgroundColor = "yellow";
            bowserImg.style.removeProperty("background-color");
        }
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
    const checkWin = board => {
        for(let i = 0; i < 8; i++){
            const winConditie = winCondities[i];
            const a = board[winConditie[0]];
            const b = board[winConditie[1]];
            const c = board[winConditie[2]];
            if(a === b && b === c) {
                if (a !== uitkomsten.TIE && a !== uitkomsten.NONE) {
                    return a === uitkomsten.X ? uitkomsten.X : uitkomsten.O;
                }
            }
        }
        return board.includes('') ? uitkomsten.NONE : uitkomsten.TIE;
    }

    const gameOver = uitkomst => {
        spelActief = false;
        if (uitkomst === uitkomsten.TIE) {
            console.log('The game ended in a tie');
        }
        else {
            console.log(current_player + " wint")
            if(uitkomst === x){
                let bowser = document.getElementById('scoreBowser');
                counterX = bowser.innerHTML;
                counterX++;
                bowser.innerHTML = counterX
                //const myTimeout = setTimeout(reset, 3000);
            }
            else if(current_player === o){
                let mario = document.getElementById('scoreMario');
                counterO = mario.innerHTML;
                counterO++;
                mario.innerHTML = counterO;
                //const myTimeout = setTimeout(reset, 3000);
            }
        }
    }
    /*
    const spelWinnen = function (ID) {
        let winSpel = false;
        for(let i = 0; i < spelBoard.length; i++){
            //let game = document.getElementById(`game${i}`);
            winnen(i, ID);
        }
        for(let i = 0; i < 8; i++){
            const winConditie = winCondities[i];
            const a = spelBoard[winConditie[0]];
            const b = spelBoard[winConditie[1]];
            const c = spelBoard[winConditie[2]];
            if(a === "" || b === "" || c === ""){
                winSpel = false;
            }
            else if(a === b && b === c && a !== "T" && b !== "T" && c !== "T"){
                winSpel = true;
                break;
            }
        }

        if(winSpel){
            spelActief = false;
            console.log(current_player + " wint")
            if(current_player === x){
                let bowser = document.getElementById('scoreBowser');
                counterX = bowser.innerHTML;
                counterX++;
                bowser.innerHTML = counterX
                const myTimeout = setTimeout(reset, 3000);
            }
            else if(current_player === o){
                let mario = document.getElementById('scoreMario');
                counterO = mario.innerHTML;
                counterO++;
                mario.innerHTML = counterO;
                const myTimeout = setTimeout(reset, 3000);
            }
        }
        else if(!spelBoard.includes("")){
            spelActief = false;
            console.log("tie")
            const myTimeout = setTimeout(reset, 3000);
        }

    }
    */

    const winnen = function (index, idChild) {
        let winRonde = false;
        let activeBoard = boards[index];
        for(let i = 0; i < 8; i++){
            const winConditie = winCondities[i];
            const a = activeBoard[winConditie[0]];
            const b = activeBoard[winConditie[1]];
            const c = activeBoard[winConditie[2]];

            if(a === "" || b === "" || c === ""){
                winRonde = false;
            }
            else if(a === b && b === c){
                winRonde = true;
                break;
            }
        }
        if(winRonde){

            spelBoard[index] = current_player;
            console.log(idChild);
            const child = document.getElementById(idChild);
            const parent = child.parentElement;
            console.log(parent.id);
            let gameIndex = 'game' + index;
            console.log(gameIndex)
            console.log(index)
            if(parent.id === gameIndex){
                if (current_player === "X"){
                    parent.classList.add('xWint');
                    console.log("X vak gekleurd");
                } else if (current_player === "O"){
                    parent.classList.add('oWint');
                    console.log("O vak gekleurd");
                }
            }
            disableBoard(index);
            
            let bord = boards[index];
            bord.forEach((element,index) =>{
                bord[index] = '';
            })
            
        }
        else if(!boards[index].includes("")){
            console.log("tie");
            
            let bord = boards[index];
            bord.forEach((element,index) =>{
                bord[index] = '';
            })
            spelBoard[index] = "T";
        }

    }

    const reset = function() {

        boards.forEach((element,index) =>{
            let bord = boards[index];
            bord.forEach((element,index) =>{
                bord[index] = '';
            })
            console.log(boards[index])
        })
        spelBoard = ['','','','','','','','',''];
        spelActief = true;
        let smallBoard = document.querySelectorAll('.games');
        for (let i = 0; i < smallBoard.length; i++) {
            let game = smallBoard[i];
            let children = game.children;
            for(let i = 0; i < children.length; i++){
                let child = children[i]; //games
                child.innerText = "";
            }
        }
        for (let i = 0; i < smallBoard.length; i++) {
            const resetListener = document.querySelector(`#game${i}`);
            const children = resetListener.children;
            for (let i = 0; i < children.length; i++) {
                children[i].addEventListener('click', setTile);
            }
        }

        if(beginSpeler === x){
            beginSpeler = o;
        }
        else{
            beginSpeler = x;
        }
        current_player = beginSpeler;

        for (let i = 0; i < 9; i++){
            const game = document.getElementById(`game${i}`);
            game.classList.remove('xWint', 'oWint');
        }
    }
    resetKnop.addEventListener('click', function(){
        reset();
        puntenReset();
    });

    const disableBoard = function(boardNum) {

        const boardToDisable = document.querySelector(`#game${boardNum}`);
        const children = boardToDisable.children;
        for (let i = 0; i < children.length; i++) {
            children[i].removeEventListener('click', setTile);
        }
    }

    const puntenReset = function () {
        document.getElementById('scoreBowser').innerHTML = 0;
        document.getElementById('scoreMario').innerHTML = 0;
    }
})();