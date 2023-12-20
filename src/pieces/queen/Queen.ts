import { Piece } from '../Piece'
import { Position } from '../../notation/boardNotation/Position'
import { PieceMechanics } from '../../notation/boardNotation/PieceMechanics'
import { factoryQueenMechanics } from './QueenMovement'
import { getChessPieceSymbol } from '../../utils/utf8encodings'
import { type ColourPlayers, type NamesOfPieces } from '../../chess_settings'


export class Queen extends Piece {

    /* Constructor */
    constructor(colour: ColourPlayers, position: Position){

        /* Queen Properties */

        // Name/type of piece
        const type: NamesOfPieces = 'Queen'

        // Number of points piece is worth
        const points: number = 9

        // Get the correct utf-8 encoding to use as the piece symbol
        const symbol: string = getChessPieceSymbol(colour, type)

        // Define the movement Mechanics
        const movement: PieceMechanics = factoryQueenMechanics()

        // Construct the object
        super(type, colour, symbol, position, points, movement)        
        
    }
}