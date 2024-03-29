import { Piece } from '../Piece'
import { Position } from '../../notation/boardNotation/Position'
import { PieceMechanics } from '../../notation/boardNotation/PieceMechanics'
import { factoryBishopMechanics } from './BishopMovement'
import { getChessPieceSymbol } from '../../utils/utf8encodings'
import { type ColourPlayers, type NamesOfPieces } from '../../chess_settings'


export class Bishop extends Piece {

    /* Constructor */
    constructor(colour: ColourPlayers, position: Position | string){

        /* Bishop Properties */

        // Name/type of piece
        const type: NamesOfPieces = 'Bishop'

        // Number of points piece is worth
        const points: number = 3

        // Get the correct utf-8 encoding to use as the piece symbol
        const symbol: string = getChessPieceSymbol(colour, type)

        // Define the movement Mechanics
        const movement: PieceMechanics = factoryBishopMechanics()

        // Construct the object
        super(type, colour, symbol, position, points, movement)        
        
    }

    public makeCopy(): Bishop{
        return new Bishop(this.colour, new Position(this.position.serialise()))
    }
}