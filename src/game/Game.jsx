import { Piece } from './pieces/PieceBehavior';

export const Game = ( state, setState ) => {

    const updatePossibleMoves = () => {
        //current selected piece >> find possible moves based on specific piece rules >> filter out impossible moves(friendly fire, outside board etc)
        const piece = state.selectedPiece;

        if (!piece) {
          changePossibleMoves([]);
          return
        }


        let moves = piece.possibleMoves(state.board);

        moves.filter( index => index < 0 || index > 63); ///filter outside the board indexes
        
        changePossibleMoves(moves);
       
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


    return { alert, changeSelected, changeBoard, initiateBoard, updatePossibleMoves, addPiece, movePiece, convertIndexToPosition, convertPosToIndex }


}