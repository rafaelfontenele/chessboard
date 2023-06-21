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
/*
        if (this.type == "Pawn") {
            Pawn.checkForUpgrade(this);
        }

        */


    }


     possibleMoves = (board) => { 
        const moves = Piece.getMovesByType(this, board);
        return moves;
}



  static getMovesByType = (Piece, board) => { ///only gets possible moves referring to each piece type rules, filtering out the impossible moves is done at the Game.jsx level

    let moves;

    switch (Piece.type) {
        case 'Pawn':
            moves = Pawn.getPossibleMoves(Piece);
            break;
        case 'Rook':
            moves = Rook.getPossibleMoves(Piece, board);
            break;
        case 'Bishop':
            moves = Bishop.getPossibleMoves(Piece, board);
            break;
        case 'Knight':
            moves = Knight.getPossibleMoves(Piece);
            break;
        case 'Queen':
            moves = Pawn.getPossibleMoves(Piece);
            break;
        case 'King':
            moves = King.getPossibleMoves(Piece);
            break;
        default:
            break;
}


    return moves;

}




}
