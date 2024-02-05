import { ChessBoard } from "../board/ChessBoard";
import { Position } from "../notation/boardNotation/Position";
import { ChessPiece, ColourPlayers, initialiseStartingChessPieces } from "../chess_settings";
import PromptSync from "prompt-sync";

import { Knight } from "../pieces/knight/Knight";
import { Bishop } from "../pieces/bishop/Bishop";
import { Queen } from "../pieces/queen/Queen";
import { Rook } from "../pieces/rook/Rook";
import { King } from "../pieces/king/King";
import { Pawn } from "../pieces/pawn/Pawn";

import { validateMove, isCapture, validatorResponse } from "./moveValidator";
import { isCheckMate } from "./check";




export class ChessGame {

    public board: ChessBoard
    public history: string[]


    constructor(startingPieces?: ChessPiece[], history?: string[]){

        const pieces: ChessPiece[] = (typeof startingPieces === 'undefined') ? initialiseStartingChessPieces() : startingPieces
        
        this.board = new ChessBoard(pieces)
        this.history = (typeof history === 'undefined') ? [] : history
    }

    public playGame():void{

        let isWHiteTurn: boolean = true
        let currentPlayer: ColourPlayers = (isWHiteTurn == true) ? 'white' : 'black'

        while(!isCheckMate(currentPlayer, this)){
            
            // Display the board
            this.board.display()

            // Player must make a valid move
            this.playerMove(currentPlayer)

            // Switch the player turn 
            isWHiteTurn = !isWHiteTurn
            currentPlayer = (isWHiteTurn == true) ? 'white' : 'black'
        }

        // Display the winner
        this.board.display()
        const winner: ColourPlayers = (currentPlayer == 'white') ? 'black' : 'white'
        console.log(`Checkmate! ${winner} wins!`)
    }


    playerMove(colour: ColourPlayers): void {

        const prompt = PromptSync();

        let isValidMove: boolean = false
        let move: string

        while (!isValidMove){
            move = prompt(`Enter move ${colour} player: `)
            isValidMove = this.makeMove(move, colour)
        }
    }


    makeMove(move: string, colour: ColourPlayers): boolean{


        const responObj: validatorResponse = validateMove(move, colour, this)

        if (responObj.isValidMove){
            // The move has passed all the checks and can be executed
            this.executeMove(responObj)
            return true
        }
        else{
            for (let i = 0; i < responObj.errorMessages.length; i++) {
                console.log(responObj.errorMessages[i])
            }
            return false
        }
    }

    createGameCopy(): ChessGame {
        const piecesCopy: ChessPiece[] = this.board.copyPieces()
        const moveHistoryCopy: string[] = [... this.history]

        return new ChessGame(piecesCopy, moveHistoryCopy)
    }

    executeMove(responObject: validatorResponse){
        // Check special moves first, otherwise it will be a regular move

        // Check for castles
        if (responObject.isCastles){
            this.executeCastles(responObject.piece as King, responObject.move.end)
        }
        // Check for enpassant
        else if (responObject.isEnpassant){
            this.executeEnpassant(responObject.piece as Pawn, responObject.move.end)
        }
        // Check for promotion
        else if (responObject.isPromotion) {
            this.executePromotion(responObject.piece as Pawn, responObject.move.end, responObject.move.promote)
        }
        // otherwise it is just a regular move
        else {
            this.executeRegularMove(responObject.piece, responObject.move.end)
        }
        
        // 3) Save move to history
        this.history.push(responObject.move.serialise())
    }

    
    executeRegularMove(
        piece: ChessPiece,
        endPosition: Position
    ){
        /*
        1) Handle capture if neccessary
        2) Move piece
        */

        // 1) Handle capture
        if (isCapture(piece, endPosition, this)){
            // Get the piece to be captured
            const capturePiece: ChessPiece = this.board.getPiece(endPosition)

            // Capture (i.e. remove) the captured piece
            this.board.removePiece(capturePiece)
        }
        
        // 2) Move piece
        this.board.movePiece(piece, endPosition)
    }

// ---------------------PROMOTION METHODS---------------------

    executePromotion(
        pawn: Pawn,
        endPosition: Position,
        promotionSymbol: string
    ){

        /* Logic
        1) Handle any captures
        2) Remove promoting pawn
        3) Add promoted piece
        */

        // 1) Check capture
        if (isCapture(pawn, endPosition, this)){
            // Get the piece to be captured
            const capturePiece: ChessPiece = this.board.getPiece(endPosition)

            // Capture (i.e. remove) the captured piece
            this.board.removePiece(capturePiece)
        }

        // 2) Remove pawn
        this.board.removePiece(pawn)

        // 3) Create and add the piece to be promoted
        const promotedPiece: ChessPiece = this.makePromotedPiece(
            pawn.colour, promotionSymbol, endPosition
        )
        
        this.board.addPiece(promotedPiece)
    }

    makePromotedPiece(colour: ColourPlayers, promoteSymbol: string, position: Position): ChessPiece{
        
        // creates the new piece on promotion initialising, colour, type of piece and position
        if (promoteSymbol == 'q'){
            return new Queen(colour, position)
        }
        else if (promoteSymbol == 'r'){
            return new Rook(colour, position)
        }
        else if (promoteSymbol == 'b'){
            return new Bishop(colour, position)
        }
        else if (promoteSymbol == 'n'){
            return new Knight(colour, position)
        }
    }

// --------------------- ENPASSANT METHODS---------------------


    executeEnpassant(
        pawn: Pawn,
        endPosition: Position
    ){ 
        /* Logic
        1) Get the enemy pawn to be captured
        2) Capture the enemy pawn
        3) Move the moving pawn to the end position
        */
        const colour: ColourPlayers = pawn.colour

        // 1) 

        // Get the capture position
        const legalRank: number = (colour == 'white') ? 5 : 4
        const caputrePosition = new Position(endPosition.file, legalRank)

        // Get the captured pawn
        const capturedPawn: ChessPiece = this.board.getPiece(caputrePosition)

        // 2) Capture the pawn
        this.board.removePiece(capturedPawn)

        // 3) Move the capturING pawn
        this.board.movePiece(pawn, endPosition)
    }


// --------------------- CASTLE METHODS---------------------


    executeCastles(
        king: King,
        kingEndPosition: Position
    ){
        /* Logic
        1) Get the position the Rook has to move to
        2) Move the King to the endPosition
        3) Move the Rook to its end position
        */
        
        // 1) Get the Rook and the rook end position

        // Get Rook start position
        const rookPreCastlePosition = new Map();
        rookPreCastlePosition.set('g1', 'h1');
        rookPreCastlePosition.set('g8', 'h8');
        rookPreCastlePosition.set('c1', 'a1');
        rookPreCastlePosition.set('c8', 'a8');

        const rookStartStringPosition = rookPreCastlePosition.get(kingEndPosition.serialise())
        const rookStartPosition = new Position(rookStartStringPosition)

        // Get rook
        const rook: ChessPiece = this.board.getPiece(rookStartPosition)

        // Get the rook end position
        const rookEndPositionFromKing = new Map();
        rookEndPositionFromKing.set('g1', 'f1');
        rookEndPositionFromKing.set('g8', 'f8');
        rookEndPositionFromKing.set('c1', 'd1');
        rookEndPositionFromKing.set('c8', 'd8');

        const rookEndStringPosition: string = rookEndPositionFromKing.get(kingEndPosition.serialise())
        const rookEndPosition: Position = new Position(rookEndStringPosition)


        // 2) Move the King
        this.board.movePiece(king, kingEndPosition)

        // 3) Move the Rook
        this.board.movePiece(rook, rookEndPosition)
    }

}
