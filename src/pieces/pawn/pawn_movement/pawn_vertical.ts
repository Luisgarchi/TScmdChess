import { PositionsAlongVector } from "../../../board_mechanics/PieceMechanics"
import { MoveVector } from "../../../board_mechanics/MoveVector"
import { ChessBoard } from "../../../boards/ChessBoard"
import { ChessPiece } from "../../../chess_settings"
import { Pawn } from "../Pawn"
import { Position } from "../../../board_mechanics/Position"

import { 
    allVectorPositionsOnBoard,
    filterPositionsRestricted 
} from "../../../piece_mechanics/genericMovement"


export const pawnVerticalMovement: PositionsAlongVector =  function(
    vector: MoveVector, 
    piece: ChessPiece, 
    board: ChessBoard
    ){
        configPawnMoveIfOnStartRank(vector, piece)
        const allPositions = allVectorPositionsOnBoard(vector, piece, board)
        const restrictedPositions : Position[] = filterPositionsRestricted(allPositions, vector)
        const removedPositions = pawnBlockedVeritcal(restrictedPositions, board)
        return removedPositions
    }



export function configPawnMoveIfOnStartRank(vector: MoveVector, piece: Pawn) : void {
    /* Set the Pawns vector's vertical restriction to  1 or 2 depending on if the 
    Pawn is in it's starting rank*/
    
    // A Pawn can only move 2 squares along a file if it is in it's starting rank
    const startingRank: number = piece.position.rank
    if (
        // Starting rank for white Pawn is 2nd rank
        ((piece.colour == "white") && (startingRank == 2)) ||    // OR

        // Starting rank for black Pawn is 7th rank
        ((piece.colour == "black") && (startingRank == 7))){

        vector.updateRestricted = 2
    }
    else{
        vector.updateRestricted = 1
    }
}   


export const pawnBlockedVeritcal = function(
    positions: Position[],
    board: ChessBoard){

    /* Function returns a filtered array of positions a pawn can move vertically 
    A pawn can only move to a new position along the same file if NO piece, (no
    matter the colour) is blocking it */
        
    let positionsSerialised: string[] = positions.map((position) => position.serialise())

    const boardPieces: ChessPiece[] = board.pieces

    for (let i = 0; i < boardPieces.length; i++){

        // Get the current piece position and colour
        const blockingPiece: ChessPiece = boardPieces[i]
        const blockingPosition: Position = blockingPiece.position
        const blockingPositionSerialised: string = blockingPosition.serialise()

        // Only positions that lie on the vector
        if (positionsSerialised.includes(blockingPositionSerialised)){

            // Find the index of the blocking piece
            function matchingIndex(piecesPosition){
                return piecesPosition == blockingPositionSerialised
            }

            const index = positionsSerialised.findIndex(matchingIndex)

            // Same colour piece can only move to the index/position before blocking position
            if (index == 0){
                return []
            }
            positionsSerialised = positionsSerialised.slice(0, index)
            positions = positions.slice(0, index)
        }
    }
    return positions
}