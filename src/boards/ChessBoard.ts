import { ChessPiece, ColourPlayers } from "../chess_settings"
import ChessBoardError from "../errors/ChessBoardError"
import { Position } from "../notation/boardNotation/Position"
import { Board } from "./Board"
import { BoardNotationObject, BOARD_DIMENSIONS} from "../utils/notation"
import { fileToNum } from "../utils/notation"
import { King } from "../pieces/king/King"

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

    
    addPieces(pieces: ChessPiece[]): void {
        
        // Add an array of pieces
        for(let i = 0; i < pieces.length; i++){
            this.addPiece(pieces[i])
        }
    }


    addPiece(piece: ChessPiece): void {

        // Check there is not already another piece at the end position
        let otherPiece: ChessPiece

        if (this.isPieceAt(piece.position)){
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

    
    getPiece(position: Position): ChessPiece {
        
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
        throw new ChessBoardError(`Can not get piece at position ${position.serialise()}. No piece found.`)
    }

    isPieceAt(position: Position): boolean {

        // Return true / false if there is a piece at said location

        // Iterate over all the piece on the board
        for (let i = 0; i < this._pieces.length; i++) {

            const piece : ChessPiece = this._pieces[i]

            // Check if a piece matches is on the required position
            if (Position.compare(piece.position, position)) {
                return true
            }
        }
        return false
    }
    

    movePiece(piece: ChessPiece, endPosition: Position): void{

        // Check there is not already another piece at the end position


        if (this.isPieceAt(endPosition)){
            throw new ChessBoardError(`Two piece can not be on the same position '${endPosition.serialise()}'`)
        }

        // Get numerical representation of rows and columns for board
        const startRow: number = piece.position.rank
        const startCol: number = fileToNum(piece.position.file)

        const endRow: number = endPosition.rank
        const endCol: number = fileToNum(endPosition.file)
        
        // Move the character on the board representation
        this.moveCharacter(startRow, startCol, endRow, endCol)        
        
        // Update the pieces position to the end position
        piece.updatePosition = endPosition
    }


    removePiece(piece: ChessPiece) : void{

        const position: Position = piece.position

        // Find the piece at the position to be captured
        for (let i = 0; i < this._pieces.length; i++) {

            const checkPiece : ChessPiece = this._pieces[i]

            // Check if a piece matches is on the required position
            if (Position.compare(checkPiece.position, position)) {
                // remove the piece from the pieces array
                this._pieces.splice(i, 1)

                // add the piece to the captured piece array
                this._capturedPieces.push(checkPiece)

                // Move the character on the board representation
                const startRow: number = position.rank
                const startCol: number = fileToNum(position.file)

                this.removeCharacter(startRow, startCol)

                // Exit the function
                return
            }
        }

        // throw error if there is no piece to be captured
        throw new ChessBoardError(`No piece on board at position '${position.serialise()}'.`)
    }

    copyPieces(): ChessPiece[]{

        const piecesCopy: ChessPiece[] = []

        for (let i = 0; i < this.pieces.length; i++){
            
            const currentPiece: ChessPiece = this.pieces[i]
            piecesCopy.push(currentPiece.makeCopy()) 
        }
        return piecesCopy
    }

    getKing(colour: ColourPlayers): King {
        
        // Get the King of the specified colour
        const king: King | undefined = this.pieces.find(
            (piece) => (piece instanceof King) && (piece.colour == colour)
        ) as King
        
        // Throw an error if there is no king of that colour
        if (typeof king === 'undefined'){
            throw new ChessBoardError(`Chess board missing King of colour ${colour}`)
        }

        return king
    }
}