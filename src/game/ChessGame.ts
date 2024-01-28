import { UCI } from "../notation/moveNotation/UCI";
import { ChessBoard } from "../board/ChessBoard";
import { Position } from "../notation/boardNotation/Position";
import { ChessPiece, ColourPlayers, initialiseStartingChessPieces } from "../chess_settings";
import PromptSync from "prompt-sync";

import ChessGameError from "../errors/ChessGameError";

import { Knight } from "../pieces/knight/Knight";
import { Bishop } from "../pieces/bishop/Bishop";
import { Queen } from "../pieces/queen/Queen";
import { Rook } from "../pieces/rook/Rook";
import { King } from "../pieces/king/King";
import { Pawn } from "../pieces/pawn/Pawn";

import { fileToNum, numToFile } from "../utils/notation";


import { islegalEnpassant } from "./enpassant";

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


    constructor(startingPieces?: ChessPiece[], history?: string[]){

        const pieces: ChessPiece[] = (typeof startingPieces === 'undefined') ? initialiseStartingChessPieces() : startingPieces

        this.board = new ChessBoard(pieces)
        this.UCI = new UCI()
        this.history = (typeof history === 'undefined') ? [] : history
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
        let isMovePromotion: boolean
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
            isLegalEnpassant = islegalEnpassant(piece, end, this.board, this.history)

            const isLegalMove: boolean = isLegalRegularMove || isLegalCastles || isLegalEnpassant

            if(!isLegalMove){
                throw new ChessGameError(`Illegal move, ${piece.type} at ${piece.position.serialise()} can not move to ${end.serialise()}`)
            }
            
            // 6) Check if the move 'promotes'
            isMovePromotion = this.isPromotion(piece, end)

            if (isMovePromotion){

                // If it does then check that the promotion is 'legal'

                const isLegalPromotion: boolean = this.legalPromotion(piece, end, move)

                if (!isLegalPromotion){
                    // throw error if illegal
                    throw new ChessGameError(`Illegal UCI syntax for promotional move, ${piece.type} at ${piece.position.serialise()}. 
                                              Can not promote without specifying the piece to promote to.
                                              Please specify as the 3rd argument (5th letter) in the UCI syntax 
                                              ('q' queen, 'n' = knight, 'r' = rook, 'b' = bishop)`)
                }
            }

            // 7) Check that making a regular move the piece does not walk into check
            // NB. castles and enpassant allready enforce this

            const isPinned: boolean = this.isCheckOnNextMove(start, end)

            if (isPinned){

                if(piece instanceof King) {
                    throw new ChessGameError(`Illegal move. King at ${piece.position.serialise()} 
                                                can not walk into Check at ${end.serialise()}`)
                }
                else {
                    throw new ChessGameError(`Illegal move. Piece at ${piece.position.serialise()}
                                                is pinned`)
                }
            }
        }
        catch (error) {
            throw error
        }

        // The move has passed all the checks and can be executed
        this.executeMove(piece, end, move, isLegalCastles, isLegalEnpassant, isMovePromotion)

        // return true success
        return true
    }

    isCheckOnNextMove(startPosition: Position, endPosition: Position){
        /* Logic
        Check that moving the piece to the next position does not result in check
        */

        // Create test game
        const testGame: ChessGame = new ChessGame(this.board.copyPieces(), [... this.history])

        const piece: ChessPiece = testGame.board.getPiece(startPosition)

        // EXECUTE the REGULAR move we want to test
        testGame.executeRegularMove(piece, endPosition)

        // Check if there is a king on the board. 
        // Logic follows a piece can only be pined if its king is on the board
        if (this.board.isKing(piece.colour)){
            // Return whether the king is in check or not
            
            return testGame.isCheck(piece.colour)
        }
        else {
            return false
        }
    }


    executeMove(
        piece: ChessPiece,
        endPosition: Position,
        move: string,
        castles: boolean,
        enpassant: boolean,
        promotion: boolean
    ){
        // Check special moves first, otherwise it will be a regular move

        // Check for castles
        if (castles){
            this.executeCastles(piece as King, endPosition)
        }
        // Check for enpassant
        else if (enpassant){
            this.executeEnpassant(piece as Pawn, endPosition)
        }
        // Check for promotion
        else if (promotion) {
            this.executePromotion(piece as Pawn, endPosition, move[4])
        }
        // otherwise it is just a regular move
        else {
            this.executeRegularMove(piece, endPosition)
        }
        
        // 3) Save move to history
        this.history.push(move)
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
        if (this.isCapture(piece, endPosition)){
            // Get the piece to be captured
            const capturePiece: ChessPiece = this.board.getPiece(endPosition)

            // Capture (i.e. remove) the captured piece
            this.board.removePiece(capturePiece)
        }
        
        // 2) Move piece
        this.board.movePiece(piece, endPosition)
    }

    isCapture(capturingPiece: ChessPiece, endPosition: Position){

        // Get piece at positon to check capturelocation
        const isPiece: boolean = this.board.isPieceAt(endPosition)

        // No piece no capture
        if(!isPiece){
            return false
        }

        // Get the piece at endPosition
        const potentialCapturedPiece: ChessPiece = this.board.getPiece(endPosition)

        // Check if the capturing and captured piece are of different colour
        return potentialCapturedPiece.colour != capturingPiece.colour
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
        if (this.isCapture(pawn, endPosition)){
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

    isPromotion(piece: ChessPiece, endPosition: Position){

        // Piece must me a pawn and on their respective second to last rank before promotion

        if(!(piece instanceof Pawn)){
            return false
        }
        const piece_rank: number = piece.position.rank
        const rank_for_promotion: number = (piece.colour == 'white') ? 7 : 2

        if (piece_rank != rank_for_promotion){
            return false
        }

        // promotion pawn must move have at leat one regular move forward
        return this.legalRegularMove(piece, endPosition)
    }

    legalPromotion(piece: ChessPiece, endPosition: Position, move: string){

        // Piece must me a pawn and on their respective second to last rank before promotion

        return ((this.isPromotion(piece, endPosition)) && (move.length == 5))
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


// --------------------- CHECKING METHODS---------------------


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

        // Get all the pieces of the same colour that can potentially block or capture
        const potentialBlockingPieces: ChessPiece[] = this.board.pieces.filter(
            (piece) =>  (piece.colour == kingInCheck.colour) && 
                        (!(piece instanceof King))
        )

        // Iterate over all potential blocking pieces
        for (let i = 0; i < potentialBlockingPieces.length; i++){

            // Get the piece and position
            const potentialBlockPiece: ChessPiece = potentialBlockingPieces[i]
            const potentialBlockPiecePosition: Position = potentialBlockPiece.position

            // Get all the positions said piece can move to
            const potentialBlockPositions: Position[] = potentialBlockPiece.movement.findReachablePositions(potentialBlockPiece, this.board)

            // Check if the any of the reachable positions is one along the blocking vector 
            for (let j = 0; j < blockingPositons.length; j++){

                const blockingPositionAlongCheck: Position = blockingPositons[j]
                
                if (Position.includes(potentialBlockPositions, blockingPositionAlongCheck)){
                    
                    // All thats left to check is if the piece is not pinned

                    // Boolean variable checks if move is legal
                    const isPinned: boolean = this.isCheckOnNextMove(
                        potentialBlockPiecePosition, blockingPositionAlongCheck
                    )

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

        const startPosition : Position = king.position
        
        // Iterate over all the positions the king can move to
        let index: number = 0
        
        while(index < allSquares.length){

            // Get parse the move 
            const endPosition: Position = allSquares[index]

            const isCheck: boolean = this.isCheckOnNextMove(startPosition, endPosition)

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
