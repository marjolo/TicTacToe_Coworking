'use strict';

(function() {
    let board;
    let x = "X";
    let o = "O";
    let current_player = x;

    window.onload = function (){
        console.log("Window loaded")
        setBoard();
    }

    function setBoard() {

        board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];


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

                tile.innerText = " ";
                tile.addEventListener('click', setTile);
                document.getElementById("board").append(tile);
            }
        }

        console.log("Board set");
    }

    function setTile() {
        console.log("tile cliked");
        //console.log(this);

        let coords = this.id.split("-");    //"1-2" -> ["1", "2'"]
        let r = parseInt(coords[0]);
        let k = parseInt(coords[1]);

        if (this.innerHTML === " "){
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
        }


    }



})();