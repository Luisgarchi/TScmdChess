import { Piece } from './Piece'
import { Position } from '../board_mechanics/Position'
import { MoveMechanics } from '../board_mechanics/MoveMechanics'
import { factoryBishopMechanics } from '../piece_mechanics/BishopMovement'
import { getChessPieceSymbol } from '../utils/utf8encodings'
import { type ColourPlayers, type NamesOfPieces } from '../chess_settings'


export class Bishop extends Piece {

    /* Constructor */
    constructor(colour: ColourPlayers, position: Position){

        /* Bishop Properties */

        // Name/type of piece
        const type: NamesOfPieces = 'Bishop'

        // Number of points piece is worth
        const points: number = 3

        // Get the correct utf-8 encoding to use as the piece symbol
        const symbol: string = getChessPieceSymbol(colour, type)

        // Define the movement Mechanics
        const movement: MoveMechanics = factoryBishopMechanics()

        // Construct the object
        super(type, colour, symbol, position, points, movement)        
        
    }
}