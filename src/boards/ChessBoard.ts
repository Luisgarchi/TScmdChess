import { ChessPiece } from "../chess_settings"
import ChessBoardError from "../errors/ChessBoardError"
import { Position } from "../notation/boardNotation/Position"
import { Board } from "./Board"
import { BoardNotationObject, BOARD_DIMENSIONS} from "../utils/notation"
import { fileToNum } from "../utils/notation"

export class ChessBoard extends Board{
    
    /* Properties */

    private _pieces: ChessPiece[]
    private _capturedPieces: ChessPiece[]
    private _history: any[]
    private _boardDimensions: BoardNotationObject


    /* Constructor */
    
    constructor(pieces?: ChessPiece[], capturedPieces?:ChessPiece[], history?:any){

        super(8, 8, 1, 5)

        this._pieces =  [] 
        if (typeof pieces != 'undefined'){
            this.addPieces(pieces)
        }

        this._capturedPieces = (typeof capturedPieces === 'undefined') ? [] : capturedPieces
        this._history = (typeof history === 'undefined') ? [] : history
        
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

        // Add the character on the board representation
        const startRow: number = piece.position.rank
        const startCol: number = fileToNum(piece.position.file)
        const symbol: string = piece.symbol

        this.addCharacter(symbol, startRow, startCol)
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

        // throw error if there is not a piece at start position
        if (!piece){
            throw new ChessBoardError(`Can not move piece when there is no piece at '${startPosition.serialise()}'`)
        }

        // Double check there is not already a piece at the end position
        const otherPiece: ChessPiece | undefined = this.pieceAt(endPosition)

        // throw error if there is a piece, since there can not be 2 on same position
        if (otherPiece){
            throw new ChessBoardError(`Two piece can not be on the same position '${endPosition.serialise()}'`)
        }

        // Update the pieces position to the end position
        piece.updatePosition = endPosition

        // Move the character on the board representation
        const startRow: number = startPosition.rank
        const startCol: number = fileToNum(startPosition.file)

        const endRow: number = endPosition.rank
        const endCol: number = fileToNum(endPosition.file)
        
        this.moveCharacter(startRow, startCol, endRow, endCol)
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

                // Move the character on the board representation
                const startRow: number = position.rank
                const startCol: number = fileToNum(position.file)

                this.removeCharacter(startRow, startCol)

                // Exit the function
                return
            }
        }

        // throw error if there is no piece to be captured
        throw new ChessBoardError(`Can not capture. No piece at position '${position.serialise()}'.`)
    }
}