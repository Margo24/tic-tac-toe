class TicTacToe {
    constructor() {
        this.player='x';
        this.field = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
    }

    getCurrentPlayerSymbol() {
        //console.log(this.player);
        return this.player;
    }

    nextTurn(rowIndex, columnIndex) {
        if (this.field[rowIndex][columnIndex]===0){
            this.player = (this.player =='x' ? 'o':'x');
            this.field[rowIndex][columnIndex]=this.player;
        }
    }

    isFinished() {
        return (this.getWinner()!==null)||this.isDraw();
    }

    getWinner() {
        const players = ['x','o'];
        let diag1 = [this.field[0][0], this.field[1][1], this.field[2][2]];
        let diag2 = [this.field[0][2], this.field[1][1], this.field[2][0]];

        function rowCheck(matrix, player) {
            for (let i=0; i<matrix.length; i++) {
                let a = matrix[i].filter(item => item == player);
                //console.log(a.length);
                if (a.length===3) {
                    return player;
                }
            }
            return null;
        };

        function transpose(a) {
            return Object.keys(a[0]).map(function(c) {
                return a.map(function(r) {
                    return r[c];
                });
            });
        };

        for (let i=0; i<players.length; i++) {
            const checkDiag1 = diag1.every(elem => elem == players[i]);
            const checkDiag2 = diag2.every(elem => elem == players[i]);
            if (checkDiag1 || checkDiag2) {
                //console.log('here2');
                return players[i];
            } else {
                //console.log('here1');
                 let c=rowCheck(this.field, players[i]);
                 if (!c) {
                     //console.log('here');
                     this.field = transpose(this.field);
                     //console.log(matrix);
                     // console.log(players[i]);
                     // console.log(rowCheck(matrix, players[i]));
                     rowCheck(this.field, players[i]);
                 } else {
                     return c;
                 }
            }
        }
    }

    noMoreTurns() {
        for (let i=0; i<this.field.length; i++) {
            let a = this.field[i].filter(item => item === 0);
            if (a.length>0){
                return false;
            }
        }
        return true;
    }

    isDraw() {
        //console.log(this.field);
        return this.noMoreTurns()&&(this.getWinner()===null);
    }

    getFieldValue(rowIndex, colIndex) {
        return (this.field[rowIndex][colIndex]===0) ? null:this.field[rowIndex][colIndex];
    }
}

module.exports = TicTacToe;
