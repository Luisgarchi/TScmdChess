import { Piece } from '../Piece'
import { Position } from '../../notation/boardNotation/Position'
import { PieceMechanics } from '../../notation/boardNotation/PieceMechanics'
import { factoryRookMechanics } from './RookMovement'
import { getChessPieceSymbol } from '../../utils/utf8encodings'
import { type ColourPlayers, type NamesOfPieces } from '../../chess_settings'


export class Rook extends Piece {

    _startingPosition: Position

    /* Constructor */
    constructor(colour: ColourPlayers, position: Position){

        /* Rook Properties */

        // Name/type of piece
        const type: NamesOfPieces = 'Rook'

        // Number of points piece is worth
        const points: number = 5

        // Get the correct utf-8 encoding to use as the piece symbol
        const symbol: string = getChessPieceSymbol(colour, type)

        // Define the movement Mechanics
        const movement: PieceMechanics = factoryRookMechanics()

        // Construct the object
        super(type, colour, symbol, position, points, movement)

        this._startingPosition = position
        
    }

    public get startingPosition(): Position{
        return this._startingPosition
    }

    public makeCopy(): Rook{
        return new Rook(this.colour, new Position(this.position.serialise()))
    }
}