import { Piece } from './Piece'
import { Position } from '../board_mechanics/Position'
import { MoveMechanics } from '../board_mechanics/MoveMechanics'
import { factoryPawnMechanics } from '../piece_mechanics/PawnMovement'
import { getChessPieceSymbol } from '../utils/utf8encodings'
import { type ColourPlayers, type NamesOfPieces } from '../chess_settings'


export class Pawn extends Piece {

    /* Constructor */
    constructor(colour: ColourPlayers, position: Position){

        /* Pawn Properties */

        // Name/type of piece
        const type: NamesOfPieces = 'Pawn'

        // Number of points piece is worth
        const points: number = 1

        // Get the correct utf-8 encoding to use as the piece symbol
        const symbol: string = getChessPieceSymbol(colour, type)

        // Define the movement Mechanics
        const movement: MoveMechanics = factoryPawnMechanics(colour)

        // Construct the object
        super(type, colour, symbol, position, points, movement)        
        
    }
}