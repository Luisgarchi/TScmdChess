import { ChessPiece } from "../chess_settings"
import ChessBoardError from "../errors/ChessBoardError"
import { Position } from "../notation/boardNotation/Position"

import { BoardNotationObject, BOARD_DIMENSIONS} from "../utils/notation"


export class ChessBoard {
    
    /* Properties */

    private _pieces: ChessPiece[]
    private _capturedPieces: ChessPiece[]
    private _history: any[]
    private _boardDimensions: BoardNotationObject


    /* Constructor */
    
    constructor(pieces?: ChessPiece[], capturedPieces?:ChessPiece[], history?:any){
        this._pieces =  [] 
        if (typeof pieces != 'undefined'){
            this.addPieces(pieces)
        }

        this._capturedPieces = (typeof pieces === 'undefined') ? [] : capturedPieces
        this._history = (typeof pieces === 'undefined') ? [] : history
        
        this._boardDimensions = BOARD_DIMENSIONS
    }

    public get pieces(): ChessPiece[] {
        return this._pieces
    }

    public get capturedPieces(): ChessPiece[] {
        return this._capturedPieces
    }

    public get history(): any[] {
        return this._history
    }

    public get boardDimensions(): BoardNotationObject {
        return this._boardDimensions
    }

    addPiece(piece: ChessPiece): void {

        // Add a new piece to the board

        // Check there is not a piece already on the position
        const otherPiece: ChessPiece | undefined = this.pieceAt(piece.position)

        // Throw error if there is a piece, since there can not be 2 on same position
        if (otherPiece){
            throw new ChessBoardError(`Two piece can not be on the same position '${piece.position.serialise()}'`)
        }

        // Add piece to the pieces array
        this._pieces.push(piece)
    }

    addPieces(pieces: ChessPiece[]): void {
        
        // Add an array of pieces
        for(let i = 0; i < pieces.length; i++){
            this.addPiece(pieces[i])
        }
    }

    pieceAt(position: Position): ChessPiece {
        
        /* Find and return the piece located at provided position
        If there is no piece present return undefined */

        // Iterate over all the piece on the board
        for (let i = 0; i < this._pieces.length; i++) {

            const piece : ChessPiece = this._pieces[i]

            // Check if a piece matches is on the required position
            if (Position.compare(piece.position, position)) {
                return piece
            }
        }
        return undefined
    }

    movePiece(startPosition: Position, endPosition: Position): void{
        
        // Get the piece at the starting position
        const piece: ChessPiece = this.pieceAt(startPosition)
        

        // Double check there is not already a piece at the end position
        const otherPiece: ChessPiece | undefined = this.pieceAt(endPosition)

        // throw error if there is a piece, since there can not be 2 on same position
        if (otherPiece){
            throw new ChessBoardError(`Two piece can not be on the same position '${endPosition.serialise()}'`)
        }

        // Update the pieces position to the end position
        piece.updatePosition = endPosition
    }

    capturePiece(position: Position) : void{

        // Find the piece at the position to be captured
        for (let i = 0; i < this._pieces.length; i++) {

            const piece : ChessPiece = this._pieces[i]

            // Check if a piece matches is on the required position
            if (Position.compare(piece.position, position)) {
                // remove the piece from the pieces array
                this._pieces.splice(i, 1)

                // add the piece to the captured piece array
                this._capturedPieces.push(piece)
                return
            }
        }
    }
}