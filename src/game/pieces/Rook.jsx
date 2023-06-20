


export class Rook {


    static getPossibleMoves = function (Piece, board) {

        const currIndex = Piece.index;
        
        
        const directions = [[+1, 0], [-1, 0], [0, -1], [0, +1]];
        const movesIndex = [];

        directions.forEach( dir => {
            const [xMod, yMod] = [...dir];
            const [x, y] = [ currIndex % 8, Math.floor(currIndex / 8) ];

            for (let i=1; i<8;i++) {
                let newX = x + (xMod * i);
                let newY = y + (yMod * i);
                let position = ( newY * 8 ) + newX;
                let cell = board[position];

                if (( newX < 0 || newX > 7) || (newY < 0 || newY > 7)) continue; //filter spillover
                
                
                movesIndex.push(position);
                
                if (cell !== undefined) { //friendly fire to be remove on the piecebehavior.jsx level
                    break
                }
                
            }
        })

       
        return movesIndex;

    }

}