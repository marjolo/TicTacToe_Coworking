//https://www.youtube.com/watch?v=l-hh51ncgDI

export default class AI {
    constructor(char) {
        this.nodesMap = new Map();
        this.char = char;
        this.maximizing = char === 'X' ? true : false;
    }
    randomFunc() {
        return 1;
    }
    score = {
        X: 1,
        O: -1,
        TIE: 0,
        NONE: 10
    }

    getBestMove(board) {
        let bestScore = this.maximizing ? -Infinity : Infinity;
        let bestMove;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = this.char;
                let score = this.minimax(board, !this.maximizing);
                if (this.maximizing){
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = i;
                    }
                }
                else {
                    if (score < bestScore) {
                        bestScore = score;
                        bestMove = i;
                    }
                }
                board[i] = '';
            }
        }



        return bestMove;
    }
    minimax(board, isMaximizing, current_depth = 0) {
        let bestScore;
        let win = this.checkWin(board);
        if (win !== this.score.NONE) {
            return win;
        }
        if(isMaximizing) {
            bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'X';
                    let score = this.minimax(board, !isMaximizing, current_depth + 1);
                    bestScore = Math.max(score, bestScore);
                    
                    board[i] = '';
                }
            }
        }
        else {
            bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'O';
                    let score = this.minimax(board, !isMaximizing, current_depth + 1);
                    bestScore = Math.min(score, bestScore);
                    board[i] = '';
                }
            }
        }
        return bestScore;
    }
    checkWin(board) {
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
        for(let i = 0; i < 8; i++){
            const winConditie = winCondities[i];
            const a = board[winConditie[0]];
            const b = board[winConditie[1]];
            const c = board[winConditie[2]];

            if(a === "" || b === "" || c === "") {
            }
            else if(a === b && b === c) {
                return a === 'X' ? this.score.X : this.score.O;
            }
        }
        return board.includes('') ? this.score.NONE : this.score.TIE;
    }
}