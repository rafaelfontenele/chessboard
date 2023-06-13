import { useState, useEffect } from 'react'
import '../Chessboard.css'
import { Piece } from './Piece';


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
        
        const currPiece = {
          type: initialOrder[index],
        };

        let modifier = ( index < 8 ) ? 56 : 48;
        const secIndex = modifier + index % 8;

        changeBoard( index, 
          {...currPiece,
          color: 'black'});
        changeBoard( secIndex, {
          ...currPiece,
          color: 'white'
        });
        


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

            {index}
            
            {(item !== 0) && (
              <Piece item={item} />
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
