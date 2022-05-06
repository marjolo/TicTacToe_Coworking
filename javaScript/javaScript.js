'use strict';

(function() {
    let board;
    let x = "X";
    let o = "O";
    let current_player = x;
    let spelActief = true;

    window.onload = function (){
        console.log("Window loaded")
        setBoard();
    }

    function setBoard() {

        board = ['', '', '', '', '', '', '', '', ''];


        for (let r = 0; r < 3; r++){
            for (let k = 0; k < 3; k++){
                //<div id="0-0" class="tile"></div>
                let tile = document.createElement("div");
                tile.id = r.toString() + "-" + k.toString();
                tile.classList.add("tile");

                if (r === 0 || r === 1) {
                    tile.classList.add("horizontal-line");
                }
                if (k === 0 || k === 1) {
                    tile.classList.add("vertical-line");
                }

                tile.innerText = "";
                tile.addEventListener('click', setTile);
                document.querySelector("#board").append(tile);
            }
        }

        console.log("Board set");
    }


    function setTile() {
        console.log("tile clicked");
        //console.log(this);

        let coords = this.id.split("-");    //"1-2" -> ["1", "2'"]
        let r = parseInt(coords[0]);
        let k = parseInt(coords[1]);

        if (this.innerHTML === "" && spelActief) {

            //this.innerHTML;
            if (current_player === x){
                this.innerHTML = x;
                const positie = r * 3 + k;
                board[positie] = current_player;

                console.log(positie);

                current_player = o;
            }
            else if (current_player === o){
                this.innerHTML = o;
                const positie = r * 3 + k;
                board[positie] = current_player;
                console.log(positie);

                current_player = x;
            }
            winnen();
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
    const winnen = function () {
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


        }
        else if(!board.includes("")){
            console.log("tie")
        }
        
    }


})();