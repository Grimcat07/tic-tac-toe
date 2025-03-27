const gameboard=(function (){
    let board=[];
    
    player1=Createplayer("p1","X");       
    player2=Createplayer("p2","O");

    let reset=function resetGBoard(){
        board=[];
    }

    function checkwin(playerobj)
    {
        let player=playerobj.getPlayerBoard();
        const win=[[0,1,2],[3,4,5],[6,7,8],
                   [0,3,6],[1,4,7],[2,5,8],
                   [0,4,8],[2,4,6]];
        console.log(player);
        win.forEach(index=>{
            if(index.every(v => player.includes(v)))
            {
                console.log(`${playerobj.getname()} wins`);
                gameboard.reset();

                playerobj.addpoints();
                
                player1.reset();
                player2.reset();

             }
             
            });
            
    }
   return {
    board:()=>board,
    check:checkwin,
    player1,
    player2,
    reset,
   }
})();

function Createplayer(name,mark){
    let playername=name;
    let points=0;
    let playerBoard=[];
    let turn=function playerturn(index){
        if(gameboard.board().includes(index))
        {
            console.log("already occupied");
        }
        else if(index===null)
        {
            alert("cant enter null value");
        }
        else
        {
            gameboard.board().push(index);
            playerBoard.push(index);
            gameboard.check(this)
        } 
    
    }
    
    return {
            getname:()=>playername,
            getmark:()=>mark,
            getpoints:()=>points,
            addpoints:()=>{ return points=points++;},
            turn:turn,
            getPlayerBoard:()=>playerBoard,
            reset:()=>playerBoard=[],
            }
}

function playgame(gameboard) {
    let i = 0;
    let turn = 0;
    
    while (i < 9) {
        if (turn === 0) {
            console.log("Player 1's turn (X)");
            let index=Number(prompt("enter the index to play"));
            gameboard.player1.turn(index);
            turn = 1; 
        } else {
            console.log("Player 2's turn (O)");
            let index=Number(prompt("enter the index to play"));
            gameboard.player2.turn(index);
            turn = 0; 
        }
        i++;
    }
    console.log("Game over");
}

//playgame(gameboard);


