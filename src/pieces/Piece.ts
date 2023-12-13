import { ColourPlayers, NamesOfPieces } from '../chess_settings'
import { Position } from "../board_mechanics/Position"
import { MoveMechanics } from '../board_mechanics/MoveMechanics';

interface PieceInterface{
    _type: NamesOfPieces
    _colour: ColourPlayers
    _symbol: string
    _position: Position
    _points: Number
    _movement: MoveMechanics

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
    _movement: MoveMechanics


    /* Constructor */

    constructor(
        type: NamesOfPieces,
        colour: ColourPlayers, 
        pieceSymbol: string, 
        position: Position, 
        points: Number,
        movement: MoveMechanics
    ){
        this._type = type
        this._colour = colour
        this._symbol = pieceSymbol
        this._position = position
        this._points = points
        this._movement = movement
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

    public get movement(): MoveMechanics{
        return this._movement
    }

    
}

