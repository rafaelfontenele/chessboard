
export class King {


    static getPossibleMoves = function (Piece) {
        
        const curr = Piece.index;
        
        const movesIndex = [curr - 9, curr -8, curr - 7, curr -1, curr + 1, curr + 7, curr + 8, curr + 9]

        
        return movesIndex;

    }

}




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