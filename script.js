const stat = document.getElementById("status");
const newGB = document.getElementById("new-game");

const players = document.getElementById("players");

const pl1 = document.getElementById("p1");
const pl2 = document.getElementById("p2");



function newGame(){
    // let name1 = prompt("Enter 1st player's name :");
    // let name2 = prompt("Enter 2nd player's name:");


    const createPlayer = function (name, number, symbol) {
        return {name, number, symbol};
    }   


    // 1st and 2nd properties: the two Players
    const p1 = createPlayer('Player1', 1, 'O');
    const p2 = createPlayer('Player2', 2, 'X');

    let currPlayer = p1;
    
    // 3rd property : the GameBoard

    const createBoard = function(){
        let board = [['-','-','-'],['-','-','-'],['-','-','-']];

        function showBoard(){
            for (let i = 0; i < 3; i++) {
                console.log(board[i][0], board[i][1], board[i][2]);
            }
        };

        function resetBoard(){
            for (let i=0; i < 3; i++){
                for (let j=0; j < 3; j++){
                    board[i][j] = '-';
            }
            }
        };

        function checkEmpty(x,y){
            return board[x][y] != 'X' && board[x][y] != 'O';
        };

        function clearBoard() {
        for (let i=0; i<3; i++){
            for (let j=0; j<3; j++){
                board[i][j] = '-';
            }
        }
    }
        

        return {board, showBoard, resetBoard, checkEmpty, clearBoard};
    }

    const gBoard = createBoard();  


    function checkWin() {
        let win = false;
        // check Rows
        for (let i=0; i<3; i++){
            if (gBoard.board[i][0] == gBoard.board[i][1] && gBoard.board[i][1] == gBoard.board[i][2] && gBoard.board[i][0] != '-'){
                win = true;
            }      
        }

        // check Columns
         for (let j=0; j<3; j++){
            if (gBoard.board[0][j] == gBoard.board[1][j] && gBoard.board[1][j] == gBoard.board[2][j] && gBoard.board[0][j] != '-'){
                win = true;
            }      
        }

        // check Diagonally
        if (gBoard.board[0][0] == gBoard.board[1][1] && gBoard.board[1][1] == gBoard.board[2][2] && gBoard.board[0][0] != '-'){
            win = true;
        }

        if (gBoard.board[0][2] == gBoard.board[1][1] && gBoard.board[1][1] == gBoard.board[2][0] && gBoard.board[0][2] != '-') {
            win = true;
        }
        return win;
    }
    




    return {p1, p2, currPlayer, gBoard, checkWin};
}


function display(){

    
    const cells = [[0,0,0],[0,0,0],[0,0,0]];     
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            let elem = (i+1)*10+(j+1);
            let elemStr = elem.toString();
            cells[i][j] = document.getElementById(elemStr);
            console.log(cells[i][j]);
        }
    }

    // display names
    function displayNames(){


        pl1.innerText = game.p1.name;
        pl2.innerText = game.p2.name;
    }

    // function displayCurrPlayer(player) {
        

    //     cPlayer.innerText = player.name;
    // }
    
    function displayBoard(){
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                cells[i][j].innerText = game.gBoard.board[i][j];
            }
        }
    }
    displayBoard();
    return {displayNames, displayBoard}
    
}


const cells = document.querySelectorAll("td>div");


cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        if (begin){
            let row = Math.floor(cell.id/10); 
            let col = Number(cell.id%10);
            console.log(row, col);
            if (row > 3 || col > 3){
                empty = false;
            }else{
                empty = game.gBoard.checkEmpty(row-1,col-1);
            }
        
            if (empty) {
                game.gBoard.board[row-1][col-1] = game.currPlayer.symbol;
                moves++;
                screen.displayBoard();
                if (!game.checkWin()){
                    if (moves != 9){
                        if (game.currPlayer === game.p1) {
                            game.currPlayer = game.p2;
                            pl2.style.textDecorationLine = "underline";
                            pl1.style.textDecorationLine = "none";
                        }else{
                            game.currPlayer = game.p1;
                            pl1.style.textDecorationLine = "underline";
                            pl2.style.textDecorationLine = "none";
                        }
                        // screen.displayCurrPlayer(game.currPlayer);  
                    }else{
                        stat.innerText = "It's a tie.";
                    }
                    
                }else{
                    if (game.currPlayer === game.p1) {
                        pl1.style.color = 'green';
                    }else{
                        pl2.style.color = 'green';
                    }
                    stat.innerText = `${game.currPlayer.name} won !`;
                }
                
            }
            // Put symbol
        }

            
            
})
})


let begin = false;
const game = newGame();


const newG = document.getElementById("new-game");

newG.addEventListener("click", function() {
        begin = true;
        moves = 0;
        let name1 = prompt("Enter 1st player's name :");
        let name2 = prompt("Enter 2nd player's name :");
        game.p1.name = name1;
        game.p2.name = name2;
        screen.displayNames();
        game.currPlayer = game.p1;
        pl1.style.textDecorationLine = "underline";
        pl2.style.textDecorationLine = "none";
        game.gBoard.clearBoard();
        screen.displayBoard()

    })



const screen = display();
screen.displayNames()
let moves = 0;
let end = false;
        




        