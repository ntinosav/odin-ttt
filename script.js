console.log("Test");


// GameBoard Object

function  GameBoard() {
    this.board = [['-','-','-'],['-','-','-'],['-','-','-']];

    this.showBoard = function() {
        for (let i = 0; i < 3; i++) {
            console.log(this.board[i][0], this.board[i][1], this.board[i][2]);
    }
};

    this.resetBoard = function() {
        for (let i=0; i < 3; i++){
            for (let j=0; j < 3; j++){
                this.board[i][j] = '-';
            }
        }
    };

    this.checkEmpty = function(x,y){
        return this.board[x][y] != 'X' && this.board[x][y] != 'O';
    };
};



function Player(name, symbol, number){
    this.name = name;
    this.symbol = symbol;
    this.number = number;
}

const Game = {
    end: false,
    moves: 0,
    p1: new Player('Ntinos', 'X', 1),
    p2: new Player('John','O',2),
    gb: new GameBoard(),

    checkWin: function() {
        let win = false;
        // check Rows
        for (let i=0; i<3; i++){
            if (this.gb.board[i][0] == this.gb.board[i][1] && this.gb.board[i][1] == this.gb.board[i][2] && this.gb.board[i][0] != '-'){
                win = true;
            }      
        }

        // check Columns
         for (let j=0; j<3; j++){
            if (this.gb.board[0][j] == this.gb.board[1][j] && this.gb.board[1][j] == this.gb.board[2][j] && this.gb.board[0][j] != '-'){
                win = true;
            }      
        }

        // check Diagonally
        if (this.gb.board[0][0] == this.gb.board[1][1] && this.gb.board[1][1] == this.gb.board[2][2] && this.gb.board[0][0] != '-'){
            win = true;
        }

        if (this.gb.board[0][2] == this.gb.board[1][1] && this.gb.board[1][1] == this.gb.board[2][0] && this.gb.board[0][2] != '-') {
            win = true;
        }
        return win;
    },

    playGame: function() {
        let currPlayer = this.p1;
        this.gb.showBoard();
        while(!this.end){
            do {
                row = prompt(`Player ${currPlayer.number} : Choose row :`);
                col = prompt(`Player ${currPlayer.number} : Choose column :`);
                if (row > 2 || col > 2){
                    empty = false;
                }else{
                    empty = this.gb.checkEmpty(row,col);
                }
            }while(!empty)
            
            this.gb.board[row][col] = currPlayer.symbol;
            this.moves++;
            this.gb.showBoard();
            console.log("+++++++++++++++++");
            if (this.checkWin() || this.moves == 9){
                this.end = true;
            }else{
                if (currPlayer === this.p1){
                currPlayer = this.p2;
                }else{
                    currPlayer = this.p1;
                }
            }
            
        }

        if (this.checkWin()){
            alert(`${currPlayer.name} is the winner`);
        }else{
            alert("It's a tie.")
        }
    }
}


