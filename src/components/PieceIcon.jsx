import { BishopIcon } from '../assets/BishopIcon';
import { KnightIcon } from '../assets/KnightIcon';
import { KingIcon } from '../assets/KingIcon';
import { PawnIcon } from '../assets/PawnIcon';
import { QueenIcon } from '../assets/QueenIcon';
import { RookIcon } from '../assets/RookIcon';

export const PieceIcon = ( {type} ) => {
    return (

        
            {
                'Knight': <KnightIcon />,
                'Bishop': <BishopIcon />,
                'King': <KingIcon />,
                'Pawn': <PawnIcon />,
                'Queen': <QueenIcon />,
                'Rook': <RookIcon />,
            }[type]
        



    )
}