


export class Knight {


    static getPossibleMoves = function (Piece) {

        const currIndex = Piece.index;
        
        
        const [y, x] = [Math.floor(currIndex / 8), currIndex % 8];
        console.log( x , y);
        const [up, right, down, left] = [ y - 2, x + 2, y + 2, x - 2];
        const movesIndex = [];

        for (let i=0;i<8;i++) {
                for (let j=0;j<8;j++) {
                    let position = ( i * 8 ) + j;
                    
                    if (i === y ) {
                        if (j == left) {
                            movesIndex.push(position);
                        }
                        if (j == right) {
                            movesIndex.push(position);
                        }
                    }
                    if (j == x) {
                        if (i == up) {
                            movesIndex.push(position);
                        }
                        if (i == down) {
                            movesIndex.push(position);
                        }
                    }

            }
        }



        //const pos = ( i * 8 ) + j;

        console.log(movesIndex);

        
        
        return movesIndex;

    }

}