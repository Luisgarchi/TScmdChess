import { UCI } from "./notation/moveNotation/UCI";
import { ChessBoard } from "./boards/ChessBoard";
import { Position } from "./notation/boardNotation/Position";
import { ChessPiece, ColourPlayers, initialiseStartingChessPieces } from "./chess_settings";
import PromptSync from "prompt-sync";

import ChessGameError from "./errors/ChessGameError";
import { Piece } from "./pieces/Piece";

import { Knight } from "./pieces/knight/Knight";
import { Bishop } from "./pieces/bishop/Bishop";
import { Queen } from "./pieces/queen/Queen";
import { Rook } from "./pieces/rook/Rook";
import { King } from "./pieces/king/King";
import { Pawn } from "./pieces/pawn/Pawn";

import { fileToNum, numToFile } from "./utils/notation";

export class ChessGame {

    /* 
    
    1) Start the game
    2) Get user input
    3) Validate move
    4) Make move
    5) 
    */

    public board: ChessBoard
    public history: string[]
    public UCI: UCI


    constructor(startingPieces?: ChessPiece[]){

        const pieces: ChessPiece[] = (typeof startingPieces === 'undefined') ? initialiseStartingChessPieces() : startingPieces

        this.board = new ChessBoard(pieces)
        this.UCI = new UCI()
        this.history = []
    }


    // Create Player classes


    playerMove(colour: ColourPlayers): void {

        const prompt = PromptSync();

        let isValidMove: boolean = false
        
        let move: string

        while (!isValidMove){

            move = prompt("Enter move: ")

            try {
                isValidMove = this.makeMove(move, colour)
            }
            catch (error){
                console.log(error)
            }
        }
    }


    makeMove(move: string, colour: ColourPlayers): boolean{

        let piece: ChessPiece
        let isLegalRegularMove: boolean 
        let isLegalCastles: boolean
        let isLegalEnpassant: boolean
        let isCapture: boolean
        let start: Position
        let end: Position


        // 1) Wrap everything in a try catch
        try{
            // 2) Check if the UCI notation is valid 
            this.UCI.validate(move)

            // Get start and end position
            start = new Position(move.slice(0,2))
            end = new Position(move.slice(2, 4))

            // 3) Check that there is a piece at start Position
            const isPieceAt: boolean = this.board.isPieceAt(start)
            if (!isPieceAt){
                throw new ChessGameError(`Can not get piece at position ${start.serialise()}. No piece found.`)
            }
            
            // Get the piece
            piece = this.board.getPiece(start)

            // 4) Check if the piece is the same colour as the player
            const isMovePieceColour: boolean = this.isPiecePlayers(piece, colour) 
            if(!isMovePieceColour){
                throw new ChessGameError(`${colour} Player can not move a ${piece.colour} piece`)
            }

            // 5) Check if moving piece to end position is a legal move
            isLegalRegularMove = this.legalRegularMove(piece, end)
            isLegalCastles = this.legalCastles(piece, end)
            isLegalEnpassant = this.legalEnpassant(piece, end)

            const isLegalMove: boolean = isLegalRegularMove || isLegalCastles || isLegalEnpassant

            if(!isLegalMove){
                throw new ChessGameError(`Illegal move, ${piece.type} at ${piece.position.serialise()} can not move to ${end.serialise()}`)
            }
        }
        catch (error) {
            throw error
        }


        // 6) Check if moving to the end results in capture
        isCapture = this.board.isPieceAt(end)
        
        if (isCapture){

            // Get the piece to be captured
            const capturedPiece : ChessPiece = this.board.getPiece(end)

            // Handle the capture on the board
            this.board.removePiece(capturedPiece)
        }

        // 7) handle promotion
        if (move.length == 5){
            const promoteSymbol: string = move[4]
            this.promote(piece, promoteSymbol, end)
        }
        // 8) Move piece normally
        else {
            this.board.movePiece(piece, end)
        }
        

        this.history.push(move)

        // The move was successful
        return true
    }
    
    isPiecePlayers(piece: ChessPiece, colour: ColourPlayers) : boolean {

        if (piece.colour == colour){
            return true
        }
        else {
            return false
        }
    }

    legalRegularMove(piece: ChessPiece, endPosition: Position): boolean {
        
        // Get all the positions a piece can move to
        const piecesLegalMoves: Position[] = piece.movement.findReachablePositions(piece, this.board)

        // Make the comparison
       return Position.includes(piecesLegalMoves, endPosition)
    }

    legalEnpassant(piece: ChessPiece, endPosition: Position){

        const colour: ColourPlayers = piece.colour

        // 1) Check that the moving piece is a Pawn
        if (!(piece instanceof Pawn)){
            return false
        }


        // 2) Check piece is on correct rank
        const legalRank: number = (colour == 'white') ? 5 : 4
        if (legalRank != piece.position.rank){
            return false
        }


        // 3) Check endPosition is correct
        const currentFileNum: number = fileToNum(piece.position.file)

        // Get the adjacent files and filter incase off the board
        const fileNumbers: number[] = [currentFileNum + 1, currentFileNum -1].filter(
            (file) => ((file > 0) && (file <= 8))
        )
        
        // convert back to string
        const files: string[] = fileNumbers.map((file) => numToFile(file))
        
        // Get the allowed end rank of the moving pawn
        const endRank: number =  (colour == 'white') ? 6 : 3
        
        // construct the end positions of potential enpassant
        const enpassantEndPositions: Position[] = files.map(
            (file) => new Position(file, endRank)
        )
        
        // return false if end Position is not one of the allowed enpassant positions
        if (!(Position.includes(enpassantEndPositions, endPosition))){
            return false
        }


        // 4) Check that there is a pawn on CAPTURE position
        const caputrePosition = new Position(endPosition.file, legalRank)

        const isPiece: Boolean = this.board.isPieceAt(caputrePosition)

        // no piece at the end position
        if(!(isPiece)){
            return false
        }

        // Get piece
        const potentialPawn: ChessPiece = this.board.getPiece(endPosition)

        // Check piece is a pawn and of opposite colour
        if ((!(potentialPawn instanceof Pawn)) || (potentialPawn.colour == colour) ){
            return false
        }


        // 5) Check that the last move made was the opponents pawn from the pawns start rank

        // Get the starting position of enemy pawn the previous move for legal en passant
        const startRank: number = (colour == 'white') ? 2 : 7
        const startPosition: Position = new Position(endPosition.file, startRank)

        // Parse the UCI move for enemy pawn to reach capturing position
        const move: string = startPosition.serialise() + caputrePosition.serialise()

        // Check if the last move in the board history is the necessary one for a legal en passant
        const lastMove: string = this.history.slice(-1)[0]

        // The move is a legal en passant move
        return (lastMove == move)
    }

    legalCastles(piece: ChessPiece, endPosition: Position): boolean {

        // 1) Check that the start piece is a king
        if (!(piece instanceof King)){
            return false
        }

        // 2) Check that the king is in the starting position
        const kingPosition: Position = (piece.colour == 'white') ? new Position('e1') : new Position('e8')
        
        if (this.board.isPieceAt(kingPosition)){

            const potentialKing: ChessPiece = this.board.getPiece(kingPosition)

            // Check that piece is a king of correct colour
            if (!(
                (potentialKing instanceof King) || 
                (potentialKing.colour == piece.colour)
                )){
                return false
            }
        }
        else{
            return false
        }

        const king: King = piece as King

        // 3) Check that the king is not in check
        if (this.isCheck(king.colour)){
            return false
        }

    
        // 4) Check for the correct castling notation 
        // king side castle is on g file, queen side castle is c file
        if (king.colour == 'white'){
            if (!['g1', 'c1'].includes(endPosition.serialise())){
                return false
            }
        }
        else {
            if (!['g8', 'c8'].includes(endPosition.serialise())){
                return false
            }
        }

        // 5) Check that rook is in starting position
        // Mapping to get position where rook should be for castling.
        // The rook position (from second half of UCI notation)

        const rookPreCastlePosition = new Map();
        rookPreCastlePosition.set('g1', 'h1');
        rookPreCastlePosition.set('g8', 'h8');
        rookPreCastlePosition.set('c1', 'a1');
        rookPreCastlePosition.set('c8', 'a8');

        // Get the rook position
        const rookPosition: Position = new Position(rookPreCastlePosition.get(endPosition.serialise()))
        
        // Check that there is a piece at said position
        if (!(this.board.isPieceAt(rookPosition))){
            return false
        }

        // check that said piece is a rook
        const potentialRook: ChessPiece = this.board.getPiece(rookPosition)

        if (!(potentialRook instanceof Rook)){
            return false
        }

        // Check that rook is the starting rook
        const rook: Rook = potentialRook as Rook

        if (!(Position.compare(rook.startingPosition, rookPosition))){
            return false
        }

        // 6) Check that rook and king have not been moved.

        // Need to check that the rook and king start on their original squares
        if ((!(Position.compare(rook.startingPosition, rookPosition))) ||
            (!(Position.compare(king.startingPosition, kingPosition)))) {
            return false
        }

        const mustNotHaveMoved: string[] = [rookPosition.serialise(), kingPosition.serialise()]

        for (let i = 0; i < this.history.length; i++){

            const movingPiecePosition: string = this.history[i].slice(0,2)
            if (mustNotHaveMoved.includes(movingPiecePosition)){
                return false
            }
        }

        // 7) Check that no pieces blocks the positions between the king and the rook
        // - get the positions inbetween the king and rook
        const rank: number = king.position.rank

        const kingFile: number = fileToNum(king.position.file)
        const rookFile: number = fileToNum(rook.position.file)

        const small: number = (kingFile > rookFile) ? rookFile : kingFile
        const big: number = (kingFile > rookFile) ? kingFile : rookFile

        const files: number[] = []

        const n: number = big - small
        for (let i = 1; i < n; i++){
            files.push(small + i)
        }

        const positionsInbetween: Position[] = files.map((x) => new Position(numToFile(x), rank))

        // Check to see if any pieces are on these positions
        const allPieces: ChessPiece[] = this.board.pieces

        for (let i = 0; i < allPieces.length; i++){

            const potentialBlockPiecePosition: Position = allPieces[i].position
            if (Position.includes(positionsInbetween, potentialBlockPiecePosition)){
                return false
            }
        }

        // 8) Check that no pieces control the positions between teh king and the rook

        // filter for opposite coloured pieces
        const diffColourPieces: ChessPiece[] = this.board.pieces.filter(
            (piece) => piece.colour != king.colour)
        
        // check for each piece all the positions it controls
        for (let i = 0; i < diffColourPieces.length; i++){

            const checkPiece: ChessPiece = diffColourPieces[i]
            const allPositions: Position[] = checkPiece.movement.findReachablePositions(checkPiece, this.board)
            
            // Check if any of those positions are inbetween the king and the rook
            for (let j = 0; j < positionsInbetween.length; j++){
                const individualInbetween: Position = positionsInbetween[j]
                if (Position.includes(allPositions, individualInbetween)){
                    return false
                }                
            }
        }
    
        // 9) All the conditions have been met and so castling is a legal move
        return true
    }


    promote(piece: ChessPiece, promoteSymbol: string, position: Position): void{

        const colour: ColourPlayers = piece.colour
        let promotePiece: ChessPiece

        if (promoteSymbol == 'q'){
            promotePiece = new Queen(colour, position)
        }
        else if (promoteSymbol == 'r'){
            promotePiece = new Rook(colour, position)
        }
        else if (promoteSymbol == 'b'){
            promotePiece = new Bishop(colour, position)
        }
        else if (promoteSymbol == 'n'){
            promotePiece = new Knight(colour, position)
        }

        this.board.removePiece(piece)
        this.board.addPiece(promotePiece)
    }

    isCheck(colour: ColourPlayers): boolean {

        // Get the 'colour' king 
        const king: King = this.board.getKing(colour)
        
        // Check if the king is in check
        return king.isInCheck(this.board)
    }

    checkingPieces(colour: ColourPlayers): ChessPiece[]{

        // Return an array of all the pieces checking the 'colour' king

        // Get the 'colour' king 
        const king: King = this.board.getKing(colour)

        // Return an array of checking pieces
        return king.getCheckingPieces(this.board)
    }


    isCheckMate(colour: ColourPlayers): boolean {

        // Get the 'colour' king 
        const king: King = this.board.getKing(colour)

        // Check that the king in question is in check
        const isCheck: boolean = king.isInCheck(this.board)

        // If the king is not in check then it can not be in check mate
        if (!isCheck){
            return false
        }

        // Get king legal positions it can move to
        const kingLegalSquares: Position[] = this.kingCheckLegalSquaresMove(king)

        if (kingLegalSquares.length >= 1){
            return false
        }

        // If there are no legal moves, Check if another piece can block
        const checkingPieces: ChessPiece[] = this.checkingPieces(colour)

        // If king is in check with no legal moves and there is more than one checking piece it is mate
        if (checkingPieces.length > 1){
            return true
        }

        // Get the checking piece and see if it can be blocked by a piece
        const checkingPiece: ChessPiece = checkingPieces[0]

        return !this.canBlockOrCapture(checkingPiece, king)
    }

    

    canBlockOrCapture(checkingPiece: ChessPiece, kingInCheck: King): boolean {

        const blockingPositons: Position[] = checkingPiece.movement.findCheckingVectorPositions(checkingPiece, kingInCheck.position, this.board)

        // remove the last position because it is the positon of the king
        blockingPositons.splice(blockingPositons.length - 1, 1)

        // Add the starting position of the checking piece since it can be captured
        blockingPositons.push(checkingPiece.position)

        // check if any piece can block (piece must not be pinned)
        kingInCheck

        // Get all the pieces of the same colour that can potentially block or capture
        const potentialBlockingPieces: ChessPiece[] = this.board.pieces.filter(
            (piece) =>  (piece.colour == kingInCheck.colour) && 
                        (!(piece instanceof King))
        )

        // Iterate over all potential blocking pieces
        for (let i = 0; i < potentialBlockingPieces.length; i++){

            const potentialBlockPiece: ChessPiece = potentialBlockingPieces[i]

            // Get all the positions said piece can move to
            const potentialBlockPositions: Position[] = potentialBlockPiece.movement.findReachablePositions(potentialBlockPiece, this.board)

            // Check if the any of the reachable positions is one along the blocking vector 
            for (let j = 0; j < blockingPositons.length; j++){

                const blockingPositionAlongCheck: Position = blockingPositons[j]
                
                if (Position.includes(potentialBlockPositions, blockingPositionAlongCheck)){
                    
                    // All thats left to check is if the pieceis not pinned

                    // Initialise a new test chess game instance
                    const testGame: ChessGame = new ChessGame(this.board.copyPieces())

                    // Parse the move 
                    const startPosition: string = potentialBlockPiece.position.serialise()
                    const endPosition: string = blockingPositionAlongCheck.serialise()
                    const move: string = startPosition + endPosition

                    // Make the move
                    testGame.makeMove(move, kingInCheck.colour)

                    // Boolean variable checks if move is legal
                    const isPinned: boolean = testGame.isCheck(kingInCheck.colour)

                    if (!isPinned){
                        return true
                    }
                }      
            }
        }

        // No piece was found that can block or capture so return false
        return false


    }  



    kingCheckLegalSquaresMove(king: King): Position[] {

        // Get all of the square the king can move to
        const allSquares: Position[] = king.movement.findReachablePositions(king, this.board)

        const startPosition : string = king.position.serialise()
        
        // Iterate over all the positions the king can move to
        let index: number = 0
        
        while(index < allSquares.length){

            // Initialise a new test chess game instance
            const testGame: ChessGame = new ChessGame(this.board.copyPieces())

            // Get parse the move 
            const endPosition: string = allSquares[index].serialise()
            const move: string = startPosition + endPosition

            // Make the move
            testGame.makeMove(move, king.colour)

            // Boolean variable checks if move is legal
            const isCheck: boolean = testGame.isCheck(king.colour)

            // Remove the current index
            if (isCheck){
                allSquares.splice(index, 1)
            }
            // Increment index if it is legal (check next position)
            else {
                index ++
            }
        }
        return allSquares
    }


}
