import { Bishop } from './Bishop';
import { King } from './King';
import { Knight } from './Knight';
import { Pawn } from './Pawn';
import { Rook } from './Rook';
import { Queen } from './Queen';


export class Piece {
    constructor(type, color, owner, index) {
        this.type = type;
        this.color = color;
        this.owner = owner
        this.index = index;
        this.firstMove = true;
        this.movesToHigherIndex = this.owner == 'p1' ? false : true; /// refers to movement direction i.e going down means moving to higher indexes in the board && vice versa
    }


    possibleMoves = () => { ///only gets possible moves referring to each piece type rules, filtering out the impossible moves is done at the Game.jsx level
        
        return Pawn.getPossibleMoves(Piece);
        
        //Pawn.prototype.call(test);
        return

        switch (this.type) {
            case 'Pawn':
                moves = Pawn.getPossibleMoves();
                break;
            case 'Rook':
                moves = Rook.getPossibleMoves();
                break;
            case 'Bishop':
                moves = Bishop.getPossibleMoves();
                break;
            case 'Knight':
                moves = Knight.getPossibleMoves();
                break;
            case 'Queen':
                moves = Queen.getPossibleMoves();
                break;
            case 'King':
                moves = King.getPossibleMoves();
                break;
            default:
                break;
    }

}



}
