import { ChessPiece, ColourPlayers } from "../chess_settings";
import ChessGameError from "../errors/ChessGameError";
import { Position } from "../notation/boardNotation/Position";
import { Move } from "../notation/moveNotation/Move";
import { UCI} from "../notation/moveNotation/UCI";
import { King } from "../pieces/king/King";
import { ChessGame } from "./ChessGame";
import { isCastles } from "./castles";
import { isCheckOnNextMove } from "./check";
import { isEnpassant } from "./enpassant";
import {isPromotion } from "./promotion";


export type validatorResponse = {
    isValidMove:    boolean;
    isEnpassant:    boolean;
    isPromotion:    boolean;
    isCastles:      boolean;
    move:           Move | undefined;
    piece:          ChessPiece | undefined;
    errorMessages:  string[];
}


function initValidatorObj(): validatorResponse {
    return {
        isValidMove:  false,
        isEnpassant:  false,
        isPromotion:  false,
        isCastles:    false,
        move:         undefined,
        piece:        undefined,
        errorMessages: []
    }
}


export const validateMove = function(moveStr: string, colour: ColourPlayers, chessInstance: ChessGame): validatorResponse {

    /**
     * This method checks whether a move is valid given a chessInstance.
     * It returns a validation object with information about whether the
     * move was valid or not, as well as the type of move being made.
     */

    // Step 0) Init variables

    // Initialise the validation object to be returned
    const validateObj: validatorResponse = initValidatorObj()

    // Init a piece variable
    let piece: ChessPiece
    let move: Move

    // Step 1) Basic checks
    // Start of by performing some preliminary checks. Failiure results in error which
    // is caught and its respective message attached to validation object and returned
    try{
        // Check that the move is valid UCI syntax
        const validateUCI = new UCI() 
        validateUCI.validate(moveStr)

        move = new Move(moveStr, colour)
        validateObj.move = move

        // Get the piece at the start position
        piece = chessInstance.board.getPiece(move.start)
        validateObj.piece = piece

        // Check that piece colour matches player making move
        checkCorrectColour(move, piece)

    // Catch errors appending to object and returning object
    }catch (error){
        validateObj.errorMessages.push(error.msg)
        return validateObj
    }


    // Step 2) Evaluate moves
    // Normal piece move
    const normalMove: boolean = legalRegularMove(piece, move.end, chessInstance)

    // Special moves not included in normal piece move
    const castles = isCastles(move, chessInstance)
    const enpassant = isEnpassant(piece, move.end, chessInstance)

    // Promotion is a special case of a regular move
    let promotion: boolean
    try {
        promotion = isPromotion(piece, move, chessInstance)
    // Error is thrown if pawn should promote but does include promoting piece in move
    }catch (error){
        validateObj.errorMessages.push(error.msg)
        return validateObj
    }

    // Step 3) Check that making the move does not result in check which would be an illegal move

    let legalMove: boolean              // redundant variable

    try {
        legalMove = legalMoveNotCheck(move, piece, chessInstance)
    }
    catch (error){
        validateObj.errorMessages.push(error.msg)
        return validateObj
    }

    // Step 4) Fill in details of validation object

    // A move is valid if it is a normal move, enpassant, or castles 
    // (not promotion as it is a special case of normal moves)
    if (normalMove || castles || enpassant){
        validateObj.isValidMove = true
    }
    else {
        return validateObj
    }

    // Append the remainder of the details to validation object
    validateObj.isCastles = castles
    validateObj.isEnpassant = enpassant
    validateObj.isPromotion = promotion
    
    // return object
    return validateObj
}


export function checkCorrectColour(move: Move, piece: ChessPiece): void {

    if (move.colour == piece.colour){
        return
    }
    throw new ChessGameError(`${move.colour} Player can not move a ${piece.colour} piece`)
}


export function legalRegularMove(piece: ChessPiece, endPosition: Position, chessInstance:ChessGame): boolean {
        
    // Get all the positions a piece can move to
    const piecesLegalMoves: Position[] = piece.movement.findReachablePositions(piece, chessInstance.board)

    // Make the comparison
   return Position.includes(piecesLegalMoves, endPosition)
}


export function legalMoveNotCheck(move: Move, piece: ChessPiece, chessInstance: ChessGame): boolean{
    
    if(isCheckOnNextMove(move, chessInstance)){

        if(piece instanceof King) {
            throw new ChessGameError(`Illegal move. King at ${piece.position.serialise()} 
                                        can not walk into Check at ${move.end.serialise()}`)
        }
        else {
            throw new ChessGameError(`Illegal move. Piece at ${piece.position.serialise()}
                                        is pinned`)
        }
    }
    return true
}


export function isCapture(capturingPiece: ChessPiece, endPosition: Position, chessInstance:ChessGame){

    // Get piece at positon to check capturelocation
    const isPiece: boolean = chessInstance.board.isPieceAt(endPosition)

    // No piece no capture
    if(!isPiece){
        return false
    }

    // Get the piece at endPosition
    const potentialCapturedPiece: ChessPiece = chessInstance.board.getPiece(endPosition)

    // Check if the capturing and captured piece are of different colour
    return potentialCapturedPiece.colour != capturingPiece.colour
}



