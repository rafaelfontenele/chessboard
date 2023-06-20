


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

    static checkForUpgrade = (Piece) => {
        console.log(`${Piece.index}`);
        const topRow = [0,1,2,3,4,5,6,7];
        const bottomRow = [57,58,59,60,61,62,63];
        if (Piece.movesToHigherIndex && bottomRow.includes(Piece.index)) {
            console.log('bottom G queen');
        } 
        else if (!Piece.movesToHigherIndex && topRow.includes(Piece.index)) {
            console.log('TOP G queen');
        } 
    }
}