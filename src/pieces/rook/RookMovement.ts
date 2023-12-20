import { MoveVector } from "../../notation/boardNotation/MoveVector"
import { PieceMechanics, type VectorMechanics } from "../../notation/boardNotation/PieceMechanics"
import { genericChessPieceMovement } from "../genericMovement"


/* Factory function */

export function factoryRookMechanics(): PieceMechanics {

    // Rooks can move any amount of squares along a unit vector * 
    const movementUnrestricted: number = 0


    /* Define the Mechanics of each vector */

    // 1) Vector for moving Rook north
    const northVector: MoveVector = new MoveVector(1, 0, movementUnrestricted)
    const northMechanics: VectorMechanics = [
        northVector, 
        genericChessPieceMovement
    ]

    // 2) Vector for moving Rook south
    const southVector= new MoveVector(-1, 0, movementUnrestricted)
    const southMechanics : VectorMechanics = [
        southVector, 
        genericChessPieceMovement
    ]

    // 3) Vector for moving Rook east
    const eastVector = new MoveVector(0, 1, movementUnrestricted)
    const eastMechanics : VectorMechanics = [
        eastVector, 
        genericChessPieceMovement
    ]

    // 4) Vector for moving Rook west
    const westVector = new MoveVector(0, -1, movementUnrestricted)
    const westMechanics : VectorMechanics = [
        westVector, 
        genericChessPieceMovement
    ]
    
    // Combine into an array
    const rookMechanics: VectorMechanics[] = [
        northMechanics, 
        eastMechanics, 
        southMechanics,
        westMechanics
    ]

    return new PieceMechanics(rookMechanics)
}

