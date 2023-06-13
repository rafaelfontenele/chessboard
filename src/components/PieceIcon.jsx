import { BishopIcon } from '../assets/BishopIcon';
import { KnightIcon } from '../assets/KnightIcon';
import { KingIcon } from '../assets/KingIcon';
import { PawnIcon } from '../assets/PawnIcon';
import { QueenIcon } from '../assets/QueenIcon';
import { RookIcon } from '../assets/RookIcon';

export const PieceIcon = ( {item} ) => {


    return (

        
            {
                'Knight': <KnightIcon color={item.color} />,
                'Bishop': <BishopIcon color={item.color} />,
                'King': <KingIcon color={item.color} />,
                'Pawn': <PawnIcon color={item.color} />,
                'Queen': <QueenIcon color={item.color} />,
                'Rook': <RookIcon color={item.color} />,
            }[item.type]
        



    )
}