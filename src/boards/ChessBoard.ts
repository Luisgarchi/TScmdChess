import { ChessPiece } from "../chess_settings"
import { Pawn } from "../pieces/pawn/Pawn"

import { BoardNotationObject, BOARD_DIMENSIONS} from "../utils/notation"


export class ChessBoard {
    
    /* Properties */

    private _pieces: ChessPiece[]
    private _history: any[]
    private _boardDimensions: BoardNotationObject


    /* Constructor */
    
    constructor(pieces: ChessPiece[]){
        this._pieces = pieces
        this._boardDimensions = BOARD_DIMENSIONS
    }

    public get pieces(): ChessPiece[] {
        return this._pieces
    }

    public get history(): any[] {
        return this._history
    }

    public get boardDimensions(): BoardNotationObject {
        return this._boardDimensions
    }


    pieceAt(position): ChessPiece {
        
        /* Find and return the piece located at provided position
        If there is no piece present return undefined */

        // Iterate over all the piece on the board
        for (let i = 0; i < this._pieces.length; i++) {

            const piece : ChessPiece = this._pieces[i]
            // Check if a piece matches is on the required position
            if (piece.position == position) {
                return piece
            }
        }

        return undefined
    }




}