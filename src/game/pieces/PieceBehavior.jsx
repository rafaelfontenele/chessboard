import { Bishop } from './Bishop';
import { King } from './King';
import { Knight } from './Knight';
import { Pawn } from './Pawn';
import { Rook } from './Rook';
import { Queen } from './Queen';


export class Piece {

    constructor(type, color, owner, index) {
        this.type = type;
        this.moves = 0;
        this.owner = owner
        this.index = index;
        this.color = color;
        this.movesToHigherIndex = (this.owner == 'p1') ? false : true; /// refers to movement direction i.e going down means moving to higher indexes in the board && vice versa
    }

    incrementMove = () => {
        this.moves = this.moves + 1;
    }
    changeIndex = (newIndex) => {
        this.index = newIndex;

        if (this.type == "Pawn") {
            Pawn.checkForUpgrade(this);
        }
    }


    possibleMoves = (board) => { ///only gets possible moves referring to each piece type rules, filtering out the impossible moves is done at the Game.jsx level

        let moves;

        switch (this.type) {
            case 'Pawn':
                moves = Pawn.getPossibleMoves(this);
                break;
            case 'Rook':
                moves = Rook.getPossibleMoves(this, board);
                break;
            case 'Bishop':
                moves = Bishop.getPossibleMoves(this, board);
                break;
            case 'Knight':
                moves = Knight.getPossibleMoves(this);
                break;
            case 'Queen':
                moves = Pawn.getPossibleMoves(this);
                break;
            case 'King':
                moves = Pawn.getPossibleMoves(this);
                break;
            default:
                break;
    }


    return moves.filter( index => index >=0 && index <= 63);

}



}
