import { Piece } from './pieces/PieceBehavior';

export const Game = ( state, setState ) => {


    const findShortestRoute = (piece, targetIndex) => {
    const [startIndex, type, color, owner, moves, movesToHigherIndex] = [piece.index, piece.type, piece.color, piece.owner, piece.moves, piece.movesToHigherIndex]; //other types of piece still to be implemented, for the moment only knight available

    const bfs = (startIndex) => {

        let q = [ [startIndex, []] ];
        let visited = [];
        let c = 0;

        while (q.length) {
          const [currentIndex ,path] = q.shift();
          c++;
          console.log(`c=${c}`)
          if (c > 100000) {
            q = [];
            return q
          };

          path.push(currentIndex);
          if (currentIndex == targetIndex) {
            return path;
          }

          if (visited.includes(currentIndex)) {
            continue
          } else {
            
            //const possibleMoves = Knight.getPossibleMovesByIndex(currentIndex);
            const newPiece = new Piece(
                type,
                color,
                owner,
                currentIndex
            )

            const possibleMoves = newPiece.possibleMoves(state.board);


            possibleMoves.filter( index => {
              const targetIsBigger = (targetIndex > currentIndex);
              return ( targetIsBigger == (index > currentIndex));   ////trying to filter out unwanted calculations of movements(the king is giving me a hard time tbh)
            }).forEach( move => {
              q.push( [move, [...path] ])
            })
          }

        }
        
      }
      
      const newPath = bfs(startIndex);
      changePath(newPath);
  
}
    const changePath = (newPath) => {
      setState( prev => {
        return {...prev,
        path: newPath}
      })
    }


    const updatePossibleMoves = () => {
        //current selected piece >> find possible moves based on specific piece rules >> filter out impossible moves(friendly fire, outside board etc)
        const piece = state.selectedPiece;

        if (!piece) {
          changePossibleMoves([]);
          return
        }


        //let moves = piece.possibleMoves(state.board);
        let moves = piece.possibleMoves(state.board);

        moves.filter( index => index < 0 || index > 63); ///filter outside the board indexes
        changePossibleMoves(moves);
       
        }    
      const changeSelectedType = (type) => {
        
        if (state.gameLocked) {
          return
        }

        if (state.typesNotImplemented.indexOf(type) !== -1) {
          return
        }
        if (state.selectedType == type) {
          return
        }


          clearBoard();
          setState( prev => {
            return {
              ...prev, 
              selectedType: type
                  };
          })
        }
      const movePiece = (indexFrom, indexTo) => {

        const piece = state.board[indexFrom];
        piece.changeIndex(indexTo);
        piece.incrementMove();

        setState( prev => {
          const newState = {...prev};
          if (newState.board[indexTo] == undefined) {
            newState.board[indexTo] = piece;
          } else {
            const pieceTaken = newState.board[indexTo];
            newState.board[indexTo] = piece;
          }
          newState.board[indexFrom] = undefined;
          

          return newState;
        })
        
      }

      const changePossibleMoves = (newPossibleMoves) => {
        setState( prev => {
          const newState = {...state};
          newState.possibleMoves = newPossibleMoves;
          return newState;
        })
      }

      const changeSelected = (newIndex) => {
        setState( prev => {
          const newState = {...state};
          newState.selectedPiece = (newIndex == -1) ? undefined : state.board[newIndex];
          return newState;
        })
      }

      const changeBoard = (item, index) => {


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

            const type = initialOrder[index];

    
            let modifier = ( index < 8 ) ? 56 : 48;
            const secIndex = modifier + index % 8;
    
            const piece1 = new Piece(`${type}`, '#000000', 'p1', index);
            const piece2 = new Piece(`${type}`, '#883000', 'p2', secIndex)
            
            changeBoard( index, piece1 )
            changeBoard( secIndex, piece2 )
            
    
    
          }
    
        }
    
      }

      const addPiece = (type, color = '#000000', player='p1', index) => {
        const piece = new Piece(`${type}`, player == 'p1' ? '#000000' : '#FFFFFF', player, index);
        changeBoard( piece, index);
      }

      const convertIndexToPosition = (index) => {
          return [index % 8, Math.floor( index / 8) ];
      }
      const convertPosToIndex = (pos) => {
        const [x, y] = [...pos];
        return (y * 8 + x);
      }

      const clearBoard = () => {
          
        setState( prev => {
        return {...prev,
            board: new Array(64).fill(undefined),
            selectedPiece: undefined,
            selectedType: undefined,
            possibleMoves: [],
            path: []
            }
        })
      }

      const findOnlyPiece = () => {
        const index = undefined;
        for (let i=0;i<state.board.length;i++) {
          if (!state.board === undefined) {
            return index;
          }
        }
      }
      
      


    return { alert, changePath, changeSelectedType, clearBoard, changeSelected, changeBoard, initiateBoard, updatePossibleMoves, addPiece, movePiece, convertIndexToPosition, convertPosToIndex, findShortestRoute}


}