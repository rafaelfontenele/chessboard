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
    path: [],
    typesNotImplemented: ['Queen'],
    selectedType: undefined,
 } )

 const game = Game(state, setState);


  useEffect( () => {
    //game.initiateBoard();
  }, [])

  useEffect( () => {
    game.updatePossibleMoves();
  }, [state.selectedPiece])

  useEffect( () => {

    game.clearBoard();
    game.addPiece(state.selectedType, '#000000','p1',27);

  }, [state.selectedType])

  const hoverCell = (index) => {
    const hoveredCell = state.board[index];
    if (hoveredCell === undefined) return
  }

  const handleCellClick = (index) => {
    
    const clickedCell = state.board[index];

    for (let i = 0; i < state.possibleMoves.length; i++) { 
      if (state.possibleMoves[i] == index) {
        game.movePiece(state.selectedPiece.index, index)
        if (state.path.indexOf(index) == -1) {
          game.changePath([]);
        }
        //game.changeSelected(-1);
        break
      }  

    } 

    

    
    if (!clickedCell) {
      if (state.selectedPiece !== undefined && !state.possibleMoves.includes(index)) {
        game.findShortestRoute(state.selectedPiece, index);
        return
      }
      game.changeSelected(undefined);
      return
    }

    game.changeSelected(index);

  }



  const go = () => {
    
    if (!state.selectedPiece) console.log('No selected piece');
    if (!state.selectedType) console.log('No type');
    if (state.path.length == 0) console.log('no path');
    if (state.board.indexOf(state.selectedPiece) !== state.path[0]) console.log('Piece must be in starting position')
    return 

    let pathMoves = [];
    let indexFrom = state.selectedPiece.index;
    for (let i = 0;i<state.path.slice(1).length;i++) {
      const indexTo = state.path[i];
      pathMoves.push([indexFrom, indexTo]);
      indexFrom = indexTo;
    }

    console.log(indexMoves);


  }


const availableTypes = ['Knight', 'Bishop', 'Rook', 'Pawn', 'King','Queen'];
  return (
    <>

    <button className='go-btn' onClick={() => go()}>Go</button>
    <div className="type-selection">
      
      {availableTypes.map( type => {
        const isSelectedType = (state.selectedType == type) ? 'selected' : null
        const isBlocked = (state.typesNotImplemented.includes(type)) ? 'blocked' : null;
        return (
          <button className={`type-btn ${isBlocked} ${isSelectedType}}`}
           key={availableTypes.indexOf(type)} onClick={() => game.changeSelectedType(type)}>{type}</button>
        )
})}

    </div>
      <ol className='info'>
      <li>BFS path finder</li>
      <li>-Select piece type</li>
      <li>-Click on piece</li>
      <li>-Click on endpoint and move</li>

      </ol>

    <div className="board-wrapper">

      <div className="board">
        
      {state.board.map( (item, index) => {

        const cellColor = ( (   (index + 1)  +   Math.floor( (index) / 8 )    ) %2) ? 'light' : 'dark';
        const isClickable = item ? 'clickable' : 'clickable';
        const isSelected = state.selectedPiece ? (state.selectedPiece.index === index ? 'selected' : null) : null;
        let isPossibleMove = (state.possibleMoves.indexOf(index) == -1 ? false : true);
        const pathClass = ((state.path.slice(1).indexOf(index) == -1) ? null : 'path');
        const cellClasses = `cell ${cellColor} ${isClickable} ${isSelected} ${isPossibleMove ? 'highlight' : null} ${pathClass}`;
        const [x, y] = [...game.convertIndexToPosition(index)]

        return (
          <div onMouseEnter={() => hoverCell(index)} onClick={() => handleCellClick(index)} className={cellClasses} key={index} style={{fontSize: '18px'}}>    
          

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
