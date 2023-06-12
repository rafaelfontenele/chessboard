import { useState, useEffect } from 'react'
import './Chessboard.css'
import { KnightIcon } from './assets/KnightIcon'


function Chessboard() {
  
  const [state, setState] = useState( {
    board: new Array(64).fill(0),
    turn: undefined,
    selected: undefined
 } )


  const changeBoard = (index, item) => {


    setState( prev => {
      const newState = {...state};
      newState.board[index] = item;
      return newState;
    })
  }


  const initiateBoard = () => {
    // rook, knight, bishop, queen, king, bishop, knight, rook, pawn * 8
    const initialOrder = ['Rook', 'Knight', 'Bishop', 'Queen', 'King', 'Bishop', 'Knight', 'Rook',
     'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn'];
    for (let index=0; index<initialOrder.length; index++) {
      if (index < initialOrder.length) {
        
        const currPiece = initialOrder[index];

        let modifier = ( index < 8 ) ? 56 : 48;
        const secIndex = modifier + index % 8;

        changeBoard( index, currPiece);
        changeBoard( secIndex, currPiece);
        


      }

    }

  }


  useEffect( () => {
    initiateBoard();
  }, [])


  return (
    <>

    <div className="board-wrapper">
      <div className="board">
        
      {state.board.map( (item, index) => {
        const color = ( (   (index + 1)  +   Math.floor( (index) / 8 )    ) %2) ? 'light' : 'dark';

        return (
          <div className={`cell ${color}`} onClick={() => changeBoard(index, 'Knight')} key={index} style={{fontSize: '18px'}}> 

            {item[0]}
            
            {item && (
              <Piece type={item} />
            )}
           </div>
        )
      })}

      </div>
      </div>

    </>
  )
}

export default Chessboard
