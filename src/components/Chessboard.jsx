import { useState, useEffect } from 'react'
import '../Chessboard.css'
import { PieceComponent } from './PieceComponent';
import { Game } from '../game/Game.jsx';
import { Knight } from '../game/pieces/Knight';

function Chessboard() {
  
  const [state, setState] = useState( {
    board: new Array(64).fill(undefined),
    turn: undefined,
    selectedPiece: undefined,
    possibleMoves: [],
    firstClick: true
 } )

 const game = Game(state, setState);


  useEffect( () => {
    //game.initiateBoard();
    game.addPiece( 'Knight', "#000000", 'p1', 36)

  }, [])

  useEffect( () => {
    

    game.updatePossibleMoves();


  }, [state.selectedPiece])

  const hoverCell = (index) => {
    const hoveredCell = state.board[index];
    if (hoveredCell === undefined) return
    console.log(hoveredCell);
  }

  const handleCellClick = (index) => {
    
    const clickedCell = state.board[index];
    
    if (state.firstClick) {
      findShortestRoute(36, index);
    }

    for (let i = 0; i < state.possibleMoves.length; i++) { 
      if (state.possibleMoves[i] == index) {
        game.movePiece(state.selectedPiece.index, index)
        
        break
      } 
    }

    
    if (!clickedCell) {
      game.changeSelected(undefined);
      return
    }

    game.changeSelected(index);

  }
  const findShortestRoute = (indexFrom, indexTo) => {
    const [p1, p2] = [game.convertIndexToPosition(indexFrom), game.convertIndexToPosition(indexTo)];
    console.log( ` P1 = ${p1}\nP2 = ${p2}`);
    const [i1, i2] = [game.convertPosToIndex(p1), game.convertPosToIndex(p2)];
    console.log( ` I1 = ${i1}\nI2 = ${i2}`);
  }


  const test = () => {


  }


  return (
    <>

    <button className='test-btn' onClick={() => test()}>TEST</button>
    <div className="current-turn">{state.turn}</div>
    <div className="board-wrapper">
      <div className="board">
        
      {state.board.map( (item, index) => {

        const cellColor = ( (   (index + 1)  +   Math.floor( (index) / 8 )    ) %2) ? 'light' : 'dark';
        const isClickable = item ? 'clickable' : null;
        const isSelected = state.selectedPiece ? (state.selectedPiece.index === index ? 'selected' : null) : null;
        const isPossibleMove = (state.possibleMoves.indexOf(index) == -1 ? false : true);
        const cellClasses = `cell ${cellColor} ${isClickable} ${isSelected} ${isPossibleMove ? 'highlight' : null}`;
        const [x, y] = [...game.convertIndexToPosition(index)]

        return (
        
          <div onMouseEnter={() => hoverCell(index)} onClick={() => handleCellClick(index)} className={cellClasses} key={index} style={{fontSize: '18px'}}>    
          
          {index}

          {item && (
              <PieceComponent item={item} />
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
