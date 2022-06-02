import AI from './AI.js';

'use strict';

(function() {
    let resetKnop = document.querySelector("#resetButton");
    let board;
    let x = "X",counterX;
    let o = "O",counterO;
    let beginSpeler = x;
    let current_player = beginSpeler;
    let spelActief = true;
    let boards = [];
    let spelBoard = ['','','','','','','','',''];

    let ai = new AI(o);

    document.addEventListener('DOMContentLoaded', () => {
        console.log("Window loaded");
        setBoards();
    })

    function setBoards() {
        for (let i = 0; i < 9; i++) {
            setBoard(document.querySelector(`#game${i}`));
        }
        console.log(boards)
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

        console.log("Board set");
    }


    function setTile() {
        console.log("tile clicked");
        console.log("ID: " + this.id);

        let coords = this.id.split("-");    //"1-2" -> ["1", "2'"]
        let r = parseInt(coords[0]);
        let k = parseInt(coords[1]);
        //let game = document.getElementById(`game${r}`);
        let bord = boards[this.id.slice(-1)];

        if (this.innerHTML === "" && spelActief) {

            //this.innerHTML;
            if (current_player === x){
                this.innerHTML = x;
                this.classList.add('tileAnimation');
                const positie = r * 3 + k;
                if(plaatsen(this.id.slice(-1))) {
                    bord[positie] = current_player;
                    this.innerHTML = x;
                    console.log(this.id.slice(-1));
                }
                console.log(ai.getBestMove(Object.assign([], bord)));

            }
            else if (current_player === o){
                this.innerHTML = o;
                this.classList.add('tileAnimation');
                const positie = r * 3 + k;
                if(plaatsen(this.id.slice(-1))) {
                    bord[positie] = current_player;
                    this.innerHTML = o;
                    console.log(this.id.slice(-1));
                }

            }
            spelWinnen(this.id);
            current_player === x? current_player = o : current_player = x;

            
        }

    }

    const plaatsen = function (index) {
        if (spelBoard[index] === "X" || spelBoard[index] === "O"){
            console.log('kan niet')
            return false;
        }
        console.log('ok')
        return true;
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