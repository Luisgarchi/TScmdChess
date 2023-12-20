import { MoveVector } from "../../../notation/boardNotation/MoveVector"
import { PositionsAlongVector } from "../../../notation/boardNotation/PieceMechanics"
import { Position } from "../../../notation/boardNotation/Position"
import { ChessBoard } from "../../../boards/ChessBoard"
import { ChessPiece } from "../../../chess_settings"
import { 
    allVectorPositionsOnBoard, 
    filterPositionsRestricted 
} from "../../genericMovement"



export const pawnCapture: PositionsAlongVector = function(
    vector: MoveVector, 
    piece: ChessPiece, 
    board: ChessBoard): Position[] {
        const allPositions = allVectorPositionsOnBoard(vector, piece, board)
        const restrictedPositions : Position[] = filterPositionsRestricted(allPositions, vector)
        const removedPositions : Position[] = pawnDiagonalCapture(restrictedPositions, piece, board)
        return removedPositions
    }


export const pawnDiagonalCapture = function(
    positions: Position[],
    piece: ChessPiece,
    board: ChessBoard){

    /* Function returns a filtered array of positions a pawn can move vertically 
    A pawn can only move to a new position along the same file if NO piece, (no
    matter the colour) is blocking it */
    
    if (positions.length == 0) {
        return []
    }

    const positionToCapture = positions[0]

    const capturePieces: ChessPiece[] = board.pieces.filter(
            (capturingPiece) => capturingPiece.colour != piece.colour
        )

    for (let i = 0; i < capturePieces.length; i++){

        // Get the current piece position and colour
        const currentPiece: ChessPiece = capturePieces[i]
        const currentPosition: Position = currentPiece.position

        // Only positions that lie on the vector
        if (Position.compare(currentPosition, positionToCapture)){
            return [currentPosition]
        }
    }
    return []
}

