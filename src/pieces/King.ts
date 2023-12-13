import { Piece } from './Piece'
import { Position } from '../board_mechanics/Position'
import { MoveMechanics } from '../board_mechanics/MoveMechanics'
import { factoryKingMechanics } from '../piece_mechanics/KingMovement'
import { getChessPieceSymbol } from '../utils/utf8encodings'
import { type ColourPlayers, type NamesOfPieces } from '../chess_settings'


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
        const movement: MoveMechanics = factoryKingMechanics()

        // Construct the object
        super(type, colour, symbol, position, points, movement)        
        
    }
}