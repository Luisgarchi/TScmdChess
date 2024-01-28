import { Piece } from '../Piece'
import { Position } from '../../notation/boardNotation/Position'
import { PieceMechanics } from '../../notation/boardNotation/PieceMechanics'
import { factoryKnightMechanics } from './KnightMovement'
import { getChessPieceSymbol } from '../../utils/utf8encodings'
import { type ColourPlayers, type NamesOfPieces } from '../../chess_settings'


export class Knight extends Piece {

    /* Constructor */
    constructor(colour: ColourPlayers, position: Position | string){

        /* Knight Properties */

        // Name/type of piece
        const type: NamesOfPieces = 'Knight'

        // Number of points piece is worth
        const points: number = 3

        // Get the correct utf-8 encoding to use as the piece symbol
        const symbol: string = getChessPieceSymbol(colour, type)

        // Define the movement Mechanics
        const movement: PieceMechanics = factoryKnightMechanics()

        // Construct the object
        super(type, colour, symbol, position, points, movement)        
        
    }

    public makeCopy(): Knight{
        return new Knight(this.colour, new Position(this.position.serialise()))
    }
}