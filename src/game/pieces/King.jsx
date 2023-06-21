import { Utils } from "../utils/convert";
export class King {
    
 
    static getPossibleMoves = function (Piece) {

        const [currX, currY] = Utils.convertIndexToPosition(Piece.index);
        let movesIndex = [];

        const directions = [
            [-1, -1], [0, -1], [+1, -1],
            [-1, 0],            [+1, 0],
            [-1, +1], [0, +1], [+1, +1]
        ]

        for (let y=0;y<8;y++) {
            for (let x=0;x<8;x++) {
                let index = Utils.convertPosToIndex([x, y]);
                
                if (index == Piece.index) continue;

                if (Math.abs(x-currX) <= 1 && Math.abs(y - currY) <=1) {
                    movesIndex.push(index)
                }

        }
        }
        return movesIndex;

    }

}



/*
        directions.map( mod => {
            const [xMod, yMod] = [...mod];
            const newX = x + xMod;
            const newY = y + yMod;
            const newPos = [ newX, newY]
            const moveIndex = Utils.convertPosToIndex( newPos )
            
            if (!moveIndex == -1){//avoiding cases where movement goes around board
                
                movesIndex.push(moveIndex); 
                
            } 

        })
*/


/*

The king can move only one square horizontally, vertically, or diagonally. 
Once in the game, each king is allowed to make a special double move, to castle. 
Castling consists of moving the king two squares towards a rook, then moving the rook onto the square over which the king crossed.
 Castling is only permissible if all of the following conditions hold:

The player must never have moved both the king and the rook involved in castling.
There must be no pieces between the king and the rook.
The king may not currently be in check, nor may the king pass through squares that are under attack by enemy pieces. As with any move, castling is illegal if it would place the king in check.
The king and the rook must be on the same rank (to exclude castling with a promoted pawn).

*/