import { Piece } from '../Piece'
import { Position } from '../../notation/boardNotation/Position'
import { PieceMechanics } from '../../notation/boardNotation/PieceMechanics'
import { factoryPawnMechanics } from './PawnMovement'
import { getChessPieceSymbol } from '../../utils/utf8encodings'
import { type ColourPlayers, type NamesOfPieces } from '../../chess_settings'


export class Pawn extends Piece {

    /* Constructor */
    constructor(colour: ColourPlayers, position: Position | string){

        /* Pawn Properties */

        // Name/type of piece
        const type: NamesOfPieces = 'Pawn'

        // Number of points piece is worth
        const points: number = 1

        // Get the correct utf-8 encoding to use as the piece symbol
        const symbol: string = getChessPieceSymbol(colour, type)

        // Define the movement Mechanics
        const movement: PieceMechanics = factoryPawnMechanics(colour)

        // Construct the object
        super(type, colour, symbol, position, points, movement)        
        
    }

    public makeCopy(): Pawn{
        return new Pawn(this.colour, new Position(this.position.serialise()))
    }
}