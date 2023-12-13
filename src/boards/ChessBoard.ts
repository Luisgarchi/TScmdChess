import { ChessPiece } from "../chess_settings"
import { Pawn } from "../pieces/Pawn"

export class ChessBoard {
    
    /* Properties */

    private _pieces: ChessPiece[]
    private _history: any[]


    /* Constructor */
    
    constructor(pieces: ChessPiece[]){
        this._pieces = pieces
    }

    public get pieces(): ChessPiece[] {
        return this._pieces
    }

    public get history(): any[] {
        return this._history
    }

}