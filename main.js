const gameboard=(function (){
    let board=[];
    
    let isGameOver=false;
    let player1=Createplayer("p1","X");       
    let player2=Createplayer("p2","O");

    let domReset=function domreset(){

        const tic_div=document.querySelectorAll(".tic_div");
        div_arr=Array.from(tic_div);
        div_arr.forEach(div  => {
            div.textContent="";
        });
        
        board=[];
        isGameOver=false;
        player1.reset();
        player2.reset();
    }
    function checkwin(playerobj) {
        let player = playerobj.getPlayerBoard();
        const win = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
    
        for (let index of win) {
            if (index.every(v => player.includes(v))) {
                isGameOver = true;
                alert(`${playerobj.getname()} wins`);
                return;
            }
        }
    
        if (gameboard.board().length === 9 && !isGameOver) {
            isGameOver = true;
            alert("It's a tie!");
        }
    }
    
   return {
    board:()=>board,
    check:checkwin,
    player1,
    player2,
    gameOver:()=>isGameOver,
    domReset,
   }
})();

function Createplayer(name,mark){
    let playername=name;
    let points=0;
    let playerBoard=[];
    let turn=function playerturn(index)
    { 
            
        gameboard.board().push(index);
        playerBoard.push(index);
        gameboard.check(this);   
    }

    
    return {
            getname:()=>playername,
            getmark:()=>mark,
            getpoints:()=>points,
            addpoints:()=>{ points++; return points},
            turn:turn,
            getPlayerBoard:()=>playerBoard,
            reset:()=>playerBoard=[],
            }
}

function playgame(gameboard) {
    let i = 0;
    currentPlayer=gameboard.player2;
    const divs=document.querySelectorAll(".tic_div");
        div_arr=Array.from(divs);
        divs.forEach(div=>{
            div.addEventListener("click",()=>
            {
                let index=div.getAttribute("data-index");
                if(gameboard.gameOver())
                {
                    alert("Game Over!!!! Restart");
                    return;
                }
                else if(gameboard.board().includes(index))
                {
                    alert("already occupied");
                }
                
                else
                {
                currentPlayer.turn(index);
                div.textContent=currentPlayer.getmark();
                gameboard.check(currentPlayer);
                }
                currentPlayer=(currentPlayer==gameboard.player2)?gameboard.player1:gameboard.player2
            })
         })

    
    
    const reset=document.querySelector(".reset")
    reset.addEventListener("click",()=>
        gameboard.domReset())
    console.log("Game over");
}

function render(div,player)
{   
    value=`.b${div}`
    div_box=document.querySelector(value);
    console.log(div_box)
    div_box.textContent=player.getmark();
}

playgame(gameboard);

