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
    path: []
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

    for (let i = 0; i < state.possibleMoves.length; i++) { 
      if (state.possibleMoves[i] == index) {
        game.movePiece(state.selectedPiece.index, index)
        break
      }  

    } 



    
    if (!clickedCell) {
      if (state.selectedPiece !== undefined && !state.possibleMoves.includes(index)) {
        findShortestRoute(state.selectedPiece, index);
        return
      }
      game.changeSelected(undefined);
      return
    }

    game.changeSelected(index);

  }
  const findShortestRoute = (piece, targetIndex) => {
    const [startIndex, type] = [piece.index, piece.type];

    console.log(`StartIndex = ${startIndex}\nType = ${type}`)

    const bfs = (startIndex) => {

        let q = [ [startIndex, []] ];
        let visited = [];
        let c = 0;

        while (q.length) {
          const [currentIndex ,path] = q.shift();
          c++;
          if (c > 1000) break;

          path.push(currentIndex);
          if (currentIndex == targetIndex) {
            return path;
          }

          if (visited.includes(currentIndex)) {
            continue
          } else {
            Knight.getPossibleMovesByIndex(currentIndex).forEach( move => {
              q.push( [move, [...path] ])
            })
          }

        }

    }
    const path = bfs(startIndex);
    setState( prev => {
      const newState = prev;
      newState.path = path

      return newState
    })
    console.log(path);


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
        const pathClass = ((state.path.indexOf(index) == -1) ? null : 'path');
        const cellClasses = `cell ${cellColor} ${isClickable} ${isSelected} ${isPossibleMove ? 'highlight' : null} ${pathClass}`;
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
