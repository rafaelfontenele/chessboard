import { Piece } from './pieces/PieceBehavior';

export const Game = ( state, setState ) => {

    const getPossibleMoves = () => {
        //current selected piece >> find possible moves based on specific piece rules >> filter out impossible moves(friendly fire, outside board etc)
        const [index, piece] = [state.selectedPiece.index, state.selectedPiece];        



        let moves = piece.possibleMoves();

        moves.filter( index => index < 0 || index > 63); ///filter outside the board indexes
        
       
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
          newState.selectedPiece = state.board[newIndex];
          return newState;
        })
      }

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

            const type = initialOrder[index];

    
            let modifier = ( index < 8 ) ? 56 : 48;
            const secIndex = modifier + index % 8;
    
            const piece1 = new Piece(`${type}`, '#000000', 'p1', index)
            const piece2 = new Piece(`${type}`, '#883000', 'p2', secIndex)
            
            changeBoard( index, piece1 )
            changeBoard( secIndex, piece2 )
            
    
    
          }
    
        }
    
      }


    return { alert, changeSelected, changeBoard, initiateBoard, getPossibleMoves }


}