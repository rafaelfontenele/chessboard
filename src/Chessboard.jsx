import { useState, useEffect } from 'react'
import './Chessboard.css'


function Chessboard() {
  
  //const color = ( (   (index + 1)  +   Math.floor( (index) / 8 )    ) %2) ? 'black' : 'white';
  const [board, setBoard] = useState(new Array(64).fill(0));
  const [selected, setSelected] = useState(undefined);




  const initiateBoard = () => {
    // rook, knight, bishop, queen, king, bishop, knight, rook, pawn * 8
    const initialOrder = ['Rook', 'Knight', 'Bishop', 'Queen', 'King', 'Bishop', 'Knight', 'Rook',
     'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn'];
    for (let i=0; i<initialOrder.length; i++) {
      if (i < initialOrder.length) {
        const currPiece = initialOrder[i];
        let modifier = ( i < 8 ) ? 56 : 48;

        setBoard( prev => {
          ...prev.slice(0,i),
          ...currPiece,
          ...prev,slice(i)
        })


        board[modifier + i % 8] = {
          type: currPiece,
          color: 'white',

        };

      };
    }

    console.log(board);


  }


  useEffect( () => {
    initiateBoard();
  }, [])


  return (
    <>

    <div className="board-wrapper">
      <div className="board">
        
      {board.map( (item, index) => {
        const color = ( (   (index + 1)  +   Math.floor( (index) / 8 )    ) %2) ? 'white' : 'dark';

        return (
          <div className={`cell ${color}`} key={index} style={{fontSize: '18px'}}> 



           </div>
        )
      })}

      </div>
      </div>

    </>
  )
}

export default Chessboard
