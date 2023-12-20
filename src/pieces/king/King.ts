import { Piece } from '../Piece'
import { Position } from '../../notation/boardNotation/Position'
import { PieceMechanics } from '../../notation/boardNotation/PieceMechanics'
import { factoryKingMechanics } from './KingMovement'
import { getChessPieceSymbol } from '../../utils/utf8encodings'
import { type ColourPlayers, type NamesOfPieces } from '../../chess_settings'


export class King extends Piece {

    /* Constructor */
    constructor(colour: ColourPlayers, position: Position){

        /* King Properties */

        // Name/type of piece
        const type: NamesOfPieces = 'King'

        // Number of points piece is worth
        const points: number = 0

        // Get the correct utf-8 encoding to use as the piece symbol
        const symbol: string = getChessPieceSymbol(colour, type)

        // Define the movement Mechanics
        const movement: PieceMechanics = factoryKingMechanics()

        // Construct the object
        super(type, colour, symbol, position, points, movement)        
        
    }
}