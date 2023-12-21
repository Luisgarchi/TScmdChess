import { UCI } from "./notation/moveNotation/UCI";
import { ChessBoard } from "./boards/ChessBoard";
import { Position } from "./notation/boardNotation/Position";
import { ChessPiece, ColourPlayers, STARTING_PIECES } from "./chess_settings";
import PromptSync from "prompt-sync";
import ChessGameError from "./errors/ChessGameError";

export class ChessGame {

    /* 
    
    1) Start the game
    2) Get user input
    3) Validate move
    4) Make move
    5) 
    */

    private chessBoard: ChessBoard
    private history: any[]
    private UCI: UCI


    constructor(){

        this.chessBoard = new ChessBoard(STARTING_PIECES)
        this.UCI = new UCI()
        this.history = []
    }


    // Create Player classes


    playerMove(colour: ColourPlayers): void {

        const prompt = PromptSync();

        let isValidUCI: boolean = false
        let isValidMove: boolean = false
        
        let move: string

        while ((!isValidUCI) || (!isValidMove)){

            move = prompt("Enter move: ")

            try {
                isValidUCI = this.UCI.validate(move)
                isValidMove = this.executeBoardMove(move, colour)
            }
            catch (error){
                console.log(error)
            }
        }

        this.history.push(move)
    }





    executeBoardMove(move: string, colour: ColourPlayers): boolean {

        try {

            // Get start and end positions as string
            const start: string = move.slice(0,2)
            const end: string = move.slice(2, 4)

            // Convert start and end Positions into a Position object
            const startPosition: Position = new Position(start[0], Number(start[1]))
            const endPosition: Position = new Position(end[0], Number(end[1]))

            // Get start piece
            const piece: ChessPiece = this.chessBoard.pieceAt(startPosition)

            // Check that the piece being moved is of the same colour as the player making the move
            const isMovingPieceCorrectColour: boolean = this.isPiecePlayer(startPosition, colour)

            // Check that the piece can move to the end position
            const isLegalMove: boolean = this.legalMove(piece, endPosition)



            
        
        }
        catch (error){
            throw error
        }
    }


    isPiecePlayer(position: Position, colour: ColourPlayers) : boolean {

        const piece = this.chessBoard.pieceAt(position)

        if (piece.colour == colour){
            return true
        }
        else {
            throw new ChessGameError(`${colour} Player can not move a ${piece.colour} piece`)
        }
    }

    legalMove(piece: ChessPiece, endPosition: Position): boolean {
        
        const piecesLegalMoves: Position[] = piece.movement.findReachablePositions(piece, this.chessBoard)

        const serialise = function(position: Position) {
            return position.serialise()
        }

        const serialisedMoves: string[] = piecesLegalMoves.map(serialise)
        const serialisedEndPosition : string = endPosition.serialise()

        const isLegal: boolean = serialisedMoves.includes(serialisedEndPosition)

        if (serialisedEndPosition){
            return true
        }
        else {
            throw new ChessGameError(`Illegal move, ${piece.type} at ${piece.position.serialise()} can not move to ${serialisedEndPosition}`)
        }
        
    }
}
