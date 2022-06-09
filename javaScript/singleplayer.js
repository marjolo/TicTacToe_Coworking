import AI from './AI.js';

'use strict';

(function() {
    const uitkomsten = {
        X: 'X',
        O: 'O',
        TIE: 'T',
        NONE: ''
    }
    const resetKnop = document.querySelector("#resetButton");
    const menuKnop = document.querySelector('#menuButton');
    const bowserImg = document.querySelector('#imgBowser');
    const marioImg = document.querySelector('#imgMario');
    const marioScore = document.querySelector('#scoreMario');
    const bowserScore = document.querySelector('#scoreBowser');
    const marioWins = document.querySelector("#marioWins");
    const bowserWins = document.querySelector("#bowserWins");
    const close1 = document.querySelector('.close1');
    const close2 = document.querySelector('.close2');
    const maxRondes = 3;

    let board;
    let x = uitkomsten.X,counterX;
    let o = uitkomsten.O,counterO;
    let beginSpeler = x;
    let current_player = beginSpeler;
    let spelActief = true;
    let boards = [];
    let bigBoardConvertedToSingle = ['', '', '', '', '', '', '', '', ''];
    let ai;

    document.addEventListener('DOMContentLoaded', () => {
        setBoards();
        //make AI random bowser or mario -> notify player which charcter he is
        decideOnPlayer();
    });

    menuKnop.addEventListener("click", () => {
        window.location.href = "../index.html";
    });
    const decideOnPlayer = () => {
        let r = Math.floor(Math.random() * 2);
        if (r === 0) {
            //player is bowser
            ai = new AI(o);
        }
        else {
            //player is Mario
            ai = new AI(x);
            setTimeout(makeAiMove, 500);
        }

    }


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
        if (current_player !== ai.char) {
            let coords = this.id.split("-");    //"1-2" -> ["1", "2'"]
            let r = parseInt(coords[0]);
            let k = parseInt(coords[1]);
            const bord = this.id.slice(-1);
            const positie = r * 3 + k;
            setInBoard(bord, positie, current_player);
        }
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
            if (resultaatTotal !== uitkomsten.NONE) {
                gameOver(resultaatTotal);
                return;
            }
        }
        current_player === x ? current_player = o : current_player = x;
        showPlayer(current_player);
        if (current_player === ai.char) {
            setTimeout(makeAiMove, 1000);
        } //else wait for player

    }
    const makeAiMove = () => {
        const AIResponse = ai.getBestMove(Object.assign([],boards), Object.assign([], bigBoardConvertedToSingle));
        setInBoard(AIResponse.resultBig, AIResponse.resultSmall, ai.char);
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
        if (uitkomst === uitkomsten.TIE) {
            console.log('The game ended in a tie');
        }
        else {
            console.log(current_player + " wint")
            if(uitkomst === x){
                counterX = bowserScore.innerHTML;
                counterX++;
                bowserScore.innerHTML = counterX;
                if (counterX === maxRondes) {
                    popup(x);
                }
            }
            else if(current_player === o){
                counterO = marioScore.innerHTML;
                counterO++;
                marioScore.innerHTML = counterO;
                if (counterO === maxRondes) {
                    popup(o);
                }
            }
        }
        setTimeout(reset, 2000);
    }



    const reset = function() {
        bigBoardConvertedToSingle = ['', '', '', '', '', '', '', '', ''];

        boards.forEach((element,index) =>{
            let bord = boards[index];
            bord.forEach((element,index) =>{
                bord[index] = '';
            })
        })
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
        beginSpeler = beginSpeler === x ? o : x;
        current_player = beginSpeler;

        for (let i = 0; i < 9; i++){
            const game = document.getElementById(`game${i}`);
            game.classList.remove('xWint', 'oWint');
        }
        if (current_player === ai.char) {
            makeAiMove();
        }
    }
    resetKnop.addEventListener('click', function(){
        reset();
    });

    const disableBoard = function(boardNum) {

        const boardToDisable = document.querySelector(`#game${boardNum}`);
        const children = boardToDisable.children;
        for (let i = 0; i < children.length; i++) {
            children[i].removeEventListener('click', setTile);
        }
    }
    const popup = function(winner) {
        bowserScore.innerHTML = 0;
        marioScore.innerHTML = 0;
        if (winner === x) {
            document.querySelector('#bowserWins p').innerHTML = ai.char === x ? "You lose!" : "You win!";
            bowserWins.setAttribute('aria-expanded', true);
            bowserWins.classList.add('bounce-in-right');
            let img = document.querySelector('#bowserWins img')
            img.src = ai.char === x ? '../images/sadMario.png' : '../images/bowser.png';
            img.alt = ai.char === x ? 'Mario is looking sad' : 'Bowser grins';
        }
        else {
            document.querySelector('#marioWins p').innerHTML = ai.char === o ? "You lose!" : "You win!";
            marioWins.setAttribute('aria-expanded', true);
            marioWins.classList.add('bounce-in-right');
            let img = document.querySelector('#marioWins img');
            img.src = ai.char === o ? '../images/sadBowser.png' : '../images/marioWins.png';
            img.alt = ai.char === o ? 'Bowser is sad and lying on the ground' : 'Mario cheeres';
        }
    }
    close1.addEventListener('click',function() {
        bowserWins.setAttribute('aria-expanded', false);
        bowserWins.classList.remove('bounce-in-right');
    })
    close2.addEventListener('click',function() {
        marioWins.setAttribute('aria-expanded', false);
        marioWins.classList.remove('bounce-in-right');
    })
})();