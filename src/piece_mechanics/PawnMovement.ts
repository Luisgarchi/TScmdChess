import { MoveVector } from "../board_mechanics/MoveVector"
import { Pawn } from "../pieces/Pawn"
import { ChessBoard } from "../boards/ChessBoard"
import { MoveMechanics, type PieceVectorMechanics } from "../board_mechanics/MoveMechanics"
import { type ColourPlayers } from "../chess_settings"



/* Factory function */

export function factoryPawnMechanics(colour: ColourPlayers): MoveMechanics {

    /* Factory function used to create a Pawn's movement mechanics. */

    // The direction is included since pawn movement vectors are not symetric.
    const direction: number = (colour == "white") ? 1 : -1
    // By adding this variable, it establishes the directions black/white pawns move in

    // Pawns generally only move along a unit vector 1 square
    const movementRestricted: number = 1


    /* Define the Mechanics of each vector */

    // 1) Vector for moving Pawn vertically along files
    const verticalVector: MoveVector = new MoveVector(direction, 0, movementRestricted)
    const vecticalMechanics: PieceVectorMechanics = [verticalVector, pawnRestrictVeritcal]

    // 2) Vector for moving Pawn diagonally capture right *
    const diagonalVectorRight = new MoveVector(direction, 1, movementRestricted, false)
    const diagonalRightMechanics : PieceVectorMechanics = [diagonalVectorRight, pawnCaptureDiagonal]

    // 3) Vector for moving Pawn diagonally capture left * 
    const diagonalVectorLeft = new MoveVector(direction, -1, movementRestricted, false)
    const diagonalLeftMechanics : PieceVectorMechanics = [diagonalVectorLeft, pawnCaptureDiagonal]
    
    // Combine into an array
    const pawnMechanics: PieceVectorMechanics[] = [
        vecticalMechanics, 
        diagonalRightMechanics, 
        diagonalLeftMechanics
    ]

    return new MoveMechanics(pawnMechanics)
}



/* Define callback functions for movement mechanics used in factory function */



export const pawnRestrictVeritcal = function(vector: MoveVector, piece: Pawn, board: ChessBoard): void {

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



export const pawnCaptureDiagonal = function(vector: MoveVector, piece: Pawn, board: ChessBoard): void {

    /* Set the Pawn vector's diagonal to activated (true) or deactivativate (false),
    if there is a piece on the diagonal that can be captured */

    // Get all of the opposing players pieces (differernt colour)
    const enemyPieces: any[] = board.pieces.filter((checkPiece) => checkPiece.colour != piece.colour)

    // Get the position on the board that an enemy piece must be at for diagonal pawn capture
    const postionCapture = piece.position.findPositionsAlongVector(vector)[0]

    // Iterate over enemy pieces
    for (let i = 0; i < enemyPieces.length; i++) {

        // Check if position is equal to capturing position
        if (postionCapture &&
            (enemyPieces[i].position.file == postionCapture.file) && 
            (enemyPieces[i].position.rank == postionCapture.rank)){
                // Activate movement along vector
                vector.updateActivated = true
                return
            }
    }
    // Deactivate movement along vector
    vector.updateActivated= false
}