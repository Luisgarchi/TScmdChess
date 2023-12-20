import { MoveVector } from "../../notation/boardNotation/MoveVector"
import { PieceMechanics, type VectorMechanics } from "../../notation/boardNotation/PieceMechanics"
import { genericChessPieceMovement } from "../genericMovement"


/* Factory function */

export function factoryKingMechanics(): PieceMechanics {

    // Kings can only move 1 square at a time
    const movementRestricted: number = 1


    /* Define the Mechanics of each vector */


    // 1) Vector for moving King north
    const northVector: MoveVector = new MoveVector(1, 0, movementRestricted)
    const northMechanics: VectorMechanics = [
        northVector, 
        genericChessPieceMovement
    ]

    // 2) Vector for moving King south
    const southVector= new MoveVector(-1, 0, movementRestricted)
    const southMechanics : VectorMechanics = [
        southVector, 
        genericChessPieceMovement
    ]

    // 3) Vector for moving King east
    const eastVector = new MoveVector(0, 1, movementRestricted)
    const eastMechanics : VectorMechanics = [
        eastVector, 
        genericChessPieceMovement
    ]

    // 4) Vector for moving King west
    const westVector = new MoveVector(0, -1, movementRestricted)
    const westMechanics : VectorMechanics = [
        westVector, 
        genericChessPieceMovement
    ]



    // 5) Vector for moving King diagonally north east
    const northEastVector: MoveVector = new MoveVector(1, 1, movementRestricted)
    const northEastMechanics: VectorMechanics = [
        northEastVector, 
        genericChessPieceMovement
    ]

    // 6) Vector for moving King diagonally north west
    const northWestVector= new MoveVector(1, -1, movementRestricted)
    const northWestMechanics : VectorMechanics = [
        northWestVector, 
        genericChessPieceMovement
    ]

    // 7) Vector for moving King diagonally south east
    const southEastVector = new MoveVector(-1, 1, movementRestricted)
    const southEastMechanics : VectorMechanics = [
        southEastVector, 
        genericChessPieceMovement
    ]

    // 8) Vector for moving King diagonally south east
    const southWestVector = new MoveVector(-1, -1, movementRestricted)
    const southWestMechanics : VectorMechanics = [
        southWestVector, 
        genericChessPieceMovement
    ]

    
    

    // Combine into an array
    const kingMechanics: VectorMechanics[] = [
        northMechanics, 
        eastMechanics, 
        southMechanics,
        westMechanics,
        northEastMechanics,
        northWestMechanics,
        southEastMechanics,
        southWestMechanics
    ]

    return new PieceMechanics(kingMechanics)
}

