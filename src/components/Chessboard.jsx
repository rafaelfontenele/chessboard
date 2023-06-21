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
    typesNotImplemented: ['Queen', 'Bishop', 'King'],
    selectedType: 'King',
 } )

 const game = Game(state, setState);


  useEffect( () => {
    //game.initiateBoard();
  }, [])

  useEffect( () => {
    game.updatePossibleMoves();
  }, [state.selectedPiece])

  useEffect( () => {

    
    game.addPiece(state.selectedType, '#000000','p1',27);

  }, [state.selectedType])

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
        game.changeSelected(-1);
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
    game.clearBoard();

    return
    if (!state.selectedPiece || state.path) return


    let indexFrom = state.selectedPiece.index;
    const path = state.path.slice(1);
    console.log(path);
    let c = 1;

    path.forEach( nextIndex => {
      c += 1;
      setTimeout( () => {
        console.log(indexFrom, nextIndex, c);
        game.movePiece(indexFrom, nextIndex);
        indexFrom = nextIndex;    
      }, 2000 * i)
    })

    

    setState( prev => {
      const newState = prev;
      newState.path = [];
      return newState;
    })

  }


const availableTypes = ['Knight', 'Pawn', 'Rook', 'King','Queen','Bishop'];
  return (
    <>

    <button className='go-btn' onClick={() => go()}>Go</button>
    <div className="type-selection">
      
      {availableTypes.map( type => {
        const isSelectedType = (state.selectedType == type) ? 'selected' : null
        return (
          <button className={`type-btn ${isSelectedType}`} key={availableTypes.indexOf(type)} onClick={() => game.changeSelectedType(type)}>{type}</button>
        )
})}

    </div>
      <ol className='info'>
      <li>BFS path finder</li>
      <li>-Select piece type</li>
      <li>-Click on piece</li>
      <li>-Click on endpoint or move</li>
      <li style={{fontSize: '1.2rem'}}>-Click GO!</li>

      </ol>

    <div className="board-wrapper">

      <div className="board">
        
      {state.board.map( (item, index) => {

        const cellColor = ( (   (index + 1)  +   Math.floor( (index) / 8 )    ) %2) ? 'light' : 'dark';
        const isClickable = item ? 'clickable' : 'clickable';
        const isSelected = state.selectedPiece ? (state.selectedPiece.index === index ? 'selected' : null) : null;
        let isPossibleMove = (state.possibleMoves.indexOf(index) == -1 ? false : true);
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
