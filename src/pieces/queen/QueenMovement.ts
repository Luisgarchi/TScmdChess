import { MoveVector } from "../../board_mechanics/MoveVector"
import { PieceMechanics, type VectorMechanics } from "../../board_mechanics/PieceMechanics"
import { genericChessPieceMovement } from "../../piece_mechanics/genericMovement"


/* Factory function */

export function factoryQueenMechanics(): PieceMechanics {

    // Queens can move any amount of squares along a unit vector
    const movementUnrestricted: number = 0


    /* Define the Mechanics of each vector */


    // 1) Vector for moving Queen north
    const northVector: MoveVector = new MoveVector(1, 0, movementUnrestricted)
    const northMechanics: VectorMechanics = [
        northVector, 
        genericChessPieceMovement
    ]

    // 2) Vector for moving Queen south
    const southVector= new MoveVector(-1, 0, movementUnrestricted)
    const southMechanics : VectorMechanics = [
        southVector, 
        genericChessPieceMovement
    ]

    // 3) Vector for moving Queen east
    const eastVector = new MoveVector(0, 1, movementUnrestricted)
    const eastMechanics : VectorMechanics = [
        eastVector, 
        genericChessPieceMovement
    ]

    // 4) Vector for moving Queen west
    const westVector = new MoveVector(0, -1, movementUnrestricted)
    const westMechanics : VectorMechanics = [
        westVector, 
        genericChessPieceMovement
    ]



    // 5) Vector for moving Queen diagonally north east
    const northEastVector: MoveVector = new MoveVector(1, 1, movementUnrestricted)
    const northEastMechanics: VectorMechanics = [
        northEastVector, 
        genericChessPieceMovement
    ]

    // 6) Vector for moving Queen diagonally north west
    const northWestVector= new MoveVector(1, -1, movementUnrestricted)
    const northWestMechanics : VectorMechanics = [
        northWestVector, 
        genericChessPieceMovement
    ]

    // 7) Vector for moving Queen diagonally south east
    const southEastVector = new MoveVector(-1, 1, movementUnrestricted)
    const southEastMechanics : VectorMechanics = [
        southEastVector, 
        genericChessPieceMovement
    ]

    // 8) Vector for moving Queen diagonally south east
    const southWestVector = new MoveVector(-1, -1, movementUnrestricted)
    const southWestMechanics : VectorMechanics = [
        southWestVector, 
        genericChessPieceMovement
    ]
    
    

    // Combine into an array
    const queenMechanics: VectorMechanics[] = [
        northMechanics, 
        eastMechanics, 
        southMechanics,
        westMechanics,
        northEastMechanics,
        northWestMechanics,
        southEastMechanics,
        southWestMechanics
    ]

    return new PieceMechanics(queenMechanics)
}
