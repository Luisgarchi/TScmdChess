import { ChessPiece, ColourPlayers, NamesOfPieces } from '../chess_settings'
import { Position } from "../notation/boardNotation/Position"
import { PieceMechanics } from '../notation/boardNotation/PieceMechanics';

interface PieceInterface{
    _type: NamesOfPieces
    _colour: ColourPlayers
    _symbol: string
    _position: Position
    _points: Number
    _movement: PieceMechanics

    readonly type: NamesOfPieces
    readonly colour: ColourPlayers
    readonly symbol: string
    readonly position: Position
    readonly points: Number
}


export abstract class Piece implements PieceInterface{

    /* Properties */ 
    
    readonly _type: NamesOfPieces
    readonly _colour: ColourPlayers       
    readonly _symbol: string
    _position: Position
    readonly _points: Number
    _movement: PieceMechanics
    _startingPosition: Position

    /* Constructor */

    constructor(
        type: NamesOfPieces,
        colour: ColourPlayers, 
        pieceSymbol: string, 
        position: Position | string, 
        points: Number,
        movement: PieceMechanics
    ){
        this._type = type
        this._colour = colour
        this._symbol = pieceSymbol
        this._position = (position instanceof Position) ? position : new Position(position[0], Number(position[1]))
        this._points = points
        this._movement = movement
        this._startingPosition = this._position
    }

    /* Getters */
    public get type(): NamesOfPieces {
        return this._type
    }

    public get colour(): ColourPlayers {
        return this._colour
    }

    public get position(): Position{
        return this._position
    }

    public get symbol(): string{
        return this._symbol
    }

    public get points(): Number{
        return this._points
    }

    public get movement(): PieceMechanics{
        return this._movement
    }

    public get startingPosition(): Position{
        return this._startingPosition
    }

    public set updatePosition(newPosition: Position){
        this._position = newPosition
    }
}

