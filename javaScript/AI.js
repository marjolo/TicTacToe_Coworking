//https://www.youtube.com/watch?v=l-hh51ncgDI

export default class AI {
    constructor(char) {
        this.char = char;
        this.maximizing = char === 'X' ? true : false;
    }
    score = {
        X: 1,
        O: -1,
        TIE: 0,
        NONE: 10
    }
    getBestMove(bigBoard, bigBoardConverted) {
        let resultBig = this.#getBestMoveSingle(bigBoardConverted);
        let resultSmall = this.#getBestMoveSingle(bigBoard[resultBig]);
        return {resultBig, resultSmall};
    }
    #getBestMoveSingle(board) {
        let bestScore = this.maximizing ? {score: -Infinity, depth: Infinity} : {score: Infinity, depth: Infinity};
        let bestMove;
        let count = 0;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                count++;
                board[i] = this.char;
                let score = this.minimax(board, !this.maximizing);
                if (this.maximizing){
                    //starten in de hoek is het beste voor X --> als O niet in het midden gaat is dit een winnende positie
                    if (i === 0 || i === 2 || i === 6 || i === 8) {
                        score.score += .5;
                    }
                    if (score.score > bestScore.score && bestScore.score !== 1) {
                        bestScore = score;
                        bestMove = i;
                    }
                    else if (score.score === bestScore.score || score.score >= 1) {
                        if (score.depth < bestScore.depth) {
                            bestScore = score;
                            bestMove = i;
                        }
                    }
                }
                else {
                    //als O in het midden kan zetten is dit minstens een draw
                    if (i === 4) {
                        score.score -= .5;
                    }
                    if (score.score < bestScore.score && bestScore.score !== -1) {
                        bestScore = score;
                        bestMove = i;
                    }
                    else if (score.score === bestScore.score || score.score <= -1) {
                        if (score.depth < bestScore.depth) {
                            bestScore = score;
                            bestMove = i;
                        }
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
            const returnType = {score: win, depth: current_depth};
            return returnType;
        }
        if(isMaximizing) {
            bestScore = {score: -Infinity, depth: Infinity};
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'X';
                    let minmax = this.minimax(board, !isMaximizing, current_depth + 1);
                    if (minmax.score > bestScore.score) {
                        bestScore = minmax;
                    }
                    else if (minmax.score === bestScore.score) {
                        bestScore = minmax.depth < bestScore.depth ? minmax : bestScore;
                    }
                    
                    board[i] = '';
                }
            }
        }
        else {
            bestScore = {score: Infinity, depth: Infinity};
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'O';
                    let minmax = this.minimax(board, !isMaximizing, current_depth + 1);
                    if (minmax.score < bestScore.score) {
                        bestScore = minmax;
                    }
                    else if (minmax.score === bestScore.score) {
                        bestScore = minmax.depth < bestScore.depth ? minmax : bestScore;
                    }
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
                if (a !== 'T' && a !== '') {
                    return a === 'X' ? this.score.X : this.score.O;
                }
            }
        }
        return board.includes('') ? this.score.NONE : this.score.TIE;
    }
}