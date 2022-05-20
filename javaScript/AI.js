
//https://www.youtube.com/watch?v=l-hh51ncgDI

export default class AI {
    constructor(char) {
        this.nodesMap = new Map();
        this.char = char;
    }
    randomFunc() {
        return 1;
    }

    getBestMove(board, current_depth = 0) {
        if (current_depth === 0) this.nodesMap.clear();


        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                this.nodesMap.set(i, 0);
            }
        }

        let square = -1;
        let validSquare = false;


        do {
            let temp = Math.floor(Math.random() * 9);
            if (board[temp] === '') {
                validSquare = true;
                square = temp;
            }

        } while (!validSquare);
        return square;
    }
}