let board;

window.onload = function (){
    console.log("Window loaded")
    setBoard();
}

function setBoard() {

    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]

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

            document.getElementById("board").append(tile);
        }
    }

    console.log("Board set")
}
