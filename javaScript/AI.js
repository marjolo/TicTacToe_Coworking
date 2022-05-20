
export default class AI {
    constructor(maxDepth = 0, char) {
        this.maxDepth = maxDepth;
        this.nodesMap = new Map();
        this.char = char;
    }

    getBestMove(board) {
        let square = -1;
        let validSquare = false;

        do {
            let temp = Math.floor(Math.random() * 9);
            if (board[temp] === '') {
                square = temp;
            }

        } while (!validSquare);
        console.warn(board);
        return square;
    }
}