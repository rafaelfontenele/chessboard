


export class Pawn {


    static getPossibleMoves = function (Piece) {
        const currIndex = Piece.index;
        
        let movesIndex = [currIndex - 8, currIndex + 8];

        if (Piece.moves == 0) {
            movesIndex.push(currIndex - 16);
            movesIndex.push(currIndex + 16)
        }

        if (Piece.movesToHigherIndex) {
            movesIndex.filter( index => index < currIndex);
        } else {
            movesIndex.filter( index => index > currIndex);
        }
        
        return movesIndex;

    }

}