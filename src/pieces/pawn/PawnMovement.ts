import { MoveVector } from "../../notation/boardNotation/MoveVector"
import { PieceMechanics, type VectorMechanics } from "../../notation/boardNotation/PieceMechanics"
import { type ColourPlayers } from "../../chess_settings"
import { pawnVerticalMovement } from "./pawn_movement/pawn_vertical"
import { pawnCapture } from "./pawn_movement/pawn_capture"

/* Factory function */


export function factoryPawnMechanics(colour: ColourPlayers): PieceMechanics {

    /* Factory function used to create a Pawn's movement mechanics. */

    // The direction is included since pawn movement vectors are not symetric.
    const direction: number = (colour == "white") ? 1 : -1
    // By adding this variable, it establishes the directions black/white pawns move in

    // Pawns generally only move along a unit vector 1 square
    const movementRestricted: number = 1


    /* Define the Mechanics of each vector */

    // 1) Vector for moving Pawn vertically along files
    const verticalVector: MoveVector = new MoveVector(direction, 0, movementRestricted)
    const vecticalMechanics: VectorMechanics = [
        verticalVector, 
        pawnVerticalMovement
    ]

    // 2) Vector for moving Pawn diagonally capture right *
    const diagonalVectorRight = new MoveVector(direction, 1, movementRestricted)
    const diagonalRightMechanics : VectorMechanics = [
        diagonalVectorRight, 
        pawnCapture
    ]

    // 3) Vector for moving Pawn diagonally capture left * 
    const diagonalVectorLeft = new MoveVector(direction, -1, movementRestricted)
    const diagonalLeftMechanics : VectorMechanics = [
        diagonalVectorLeft, 
        pawnCapture
    ]
    
    // Combine into an array
    const pawnMechanics: VectorMechanics[] = [
        vecticalMechanics, 
        diagonalRightMechanics, 
        diagonalLeftMechanics
    ]

    return new PieceMechanics(pawnMechanics)
}
