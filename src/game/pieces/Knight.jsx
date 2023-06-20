


export class Knight {


    static getPossibleMoves = function (Piece) {
        
        const currIndex = Piece.index;
        
        
        const [y, x] = [Math.floor(currIndex / 8), currIndex % 8];
        const [up, right, down, left] = [ y - 2, x + 2, y + 2, x - 2];
        const movesIndex = [];

        for (let i=0;i<8;i++) {
                for (let j=0;j<8;j++) {
                    let position = ( i * 8 ) + j;
                    
                    if (i === up || i == down) {
                        if (j == x -1 || j == x + 1) {
                            movesIndex.push(position);
                        }
                    }

                    if (j == left || j == right) {
                        if (i == y - 1 || i == y + 1) {
                            movesIndex.push(position);
                        }
                    }

            }
        }

       
        return movesIndex;

    }


    static getPossibleMovesByIndex = function (currIndex) {
        
        
        const [y, x] = [Math.floor(currIndex / 8), currIndex % 8];
        const [up, right, down, left] = [ y - 2, x + 2, y + 2, x - 2];
        const movesIndex = [];

        for (let i=0;i<8;i++) {
                for (let j=0;j<8;j++) {
                    let position = ( i * 8 ) + j;
                    
                    if (i === up || i == down) {
                        if (j == x -1 || j == x + 1) {
                            movesIndex.push(position);
                        }
                    }

                    if (j == left || j == right) {
                        if (i == y - 1 || i == y + 1) {
                            movesIndex.push(position);
                        }
                    }

            }
        }

       
        return movesIndex;

    }

}