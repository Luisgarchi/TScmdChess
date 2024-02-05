import { ChessPiece } from "../../chess_settings"
import { Position } from "../../notation/boardNotation/Position"
import { Move } from "../../notation/moveNotation/Move"
import { Pawn } from "../../pieces/pawn/Pawn"
import { ChessGame } from "../ChessGame"
import { BOARD_DIMENSIONS } from "../../utils/notation"
import ChessGameError from "../../errors/ChessGameError"
import { legalRegularMove } from "../moveValidator"


export const isPawnInstance = function(piece: ChessPiece): piece is Pawn {
    // Type guard function to check if the value is an instance of Pawn
    return piece instanceof Pawn
}


export const isPromoteRank = function(move: Move, chessInstance: ChessGame): boolean {

    // Step 1) Correct promotion notation
    const startRank: number = move.start.rank
    const endRank: number = move.end.rank
    
    const correctStartRank: number = (move.colour == 'white') ? BOARD_DIMENSIONS.rankEnd - 1 : BOARD_DIMENSIONS.rankStart + 1
    const correctEndRank: number = (move.colour == 'white') ? BOARD_DIMENSIONS.rankEnd : BOARD_DIMENSIONS.rankStart
    
    return((startRank == correctStartRank) && (endRank == correctEndRank))
}


export const isPromotion = function(piece: ChessPiece, move: Move, chessInstance: ChessGame){
    
    // Piece must me a pawn and on their respective second to last rank before promotion

    // Step 2) Get supposed pawn at start position
    // Set start position


    const normalMove: boolean = legalRegularMove(piece, move.end, chessInstance)

    if (normalMove && isPawnInstance(piece) && isPromoteRank(move, chessInstance)){

        // Check the the move specifies a promoting piece
        if (! (typeof move.promote === 'undefined')){
            return true
        }
        else{
            throw new ChessGameError(`Illegal UCI syntax for promotional move, ${piece.type} at ${piece.position.serialise()}. 
            Can not promote without specifying the piece to promote to.
            Please specify as the 3rd argument (5th letter) in the UCI syntax 
            ('q' queen, 'n' = knight, 'r' = rook, 'b' = bishop)`)
        }
    }
    return false
}
