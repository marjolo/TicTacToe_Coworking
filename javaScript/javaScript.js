'use strict';

(function() {
    let resetKnop = document.querySelector("#resetButton");
    let board;
    let x = "X";
    let o = "O";
    let beginSpeler = x;
    let current_player = beginSpeler;
    let spelActief = true;


    window.onload = function (){
        console.log("Window loaded")
        setBoards();
    }

    function setBoards() {
        for (let i = 0; i < 9; i++) {
            setBoard(document.querySelector(`#game${i}`));
        }
    }

    function setBoard(div) {

        board = ['', '', '', '', '', '', '', '', ''];


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

        if (this.innerHTML === "" && spelActief) {

            if (current_player === x){
                this.innerHTML = x;
                const positie = r * 3 + k;
                board[positie] = current_player;

                //console.log(positie);
                
            }
            else if (current_player === o){
                this.innerHTML = o;
                const positie = r * 3 + k;
                board[positie] = current_player;
                console.log(positie);

            }
            winnen(this.id);
            current_player === x? current_player = o : current_player = x;
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
    const winnen = function (idChild) {
        let winRonde = false;
        for(let i = 0; i < 8; i++){
            const winConditie = winCondities[i];
            const a = board[winConditie[0]];
            const b = board[winConditie[1]];
            const c = board[winConditie[2]];
            if(a === "" || b === "" || c === ""){
                winRonde = false;
            }
            else if(a === b && b === c){
                winRonde = true;
                break;
            }
        }
        if(winRonde){
            spelActief = false;
            console.log(current_player + "wint")

            console.log(idChild);
            const child = document.getElementById(idChild);
            const parent = child.parentElement;
            console.log(parent.id);

            if (current_player === "X"){
                child.parentElement.classList.add('xWint');
                console.log("X vak gekleurd");
            } else if (current_player === "O"){
                child.parentElement.classList.add('oWint');
                console.log("O vak gekleurd");
            }


        }
        else if(!board.includes("")){
            console.log("tie")
        }

    }
    const reset = function() {
        board = ['','','','','','','','',''];
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

        if(beginSpeler === x){
            beginSpeler = o;
        }
        else{
            beginSpeler = x;
        }
        current_player = beginSpeler;
    }
    resetKnop.addEventListener('click', reset);


})();