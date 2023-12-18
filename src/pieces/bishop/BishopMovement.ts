import { MoveVector } from "../../board_mechanics/MoveVector"
import { PieceMechanics, type VectorMechanics } from "../../board_mechanics/PieceMechanics"
import { genericChessPieceMovement } from "../../piece_mechanics/genericMovement"


/* Factory function */

export function factoryBishopMechanics(): PieceMechanics {

    // Bishops can move any amount of squares along a unit vector
    const movementUnrestricted: number = 0


    /* Define the Mechanics of each vector */

    // 1) Vector for moving Bishop diagonally north east
    const northEastVector: MoveVector = new MoveVector(1, 1, movementUnrestricted)
    const northEastMechanics: VectorMechanics = [
        northEastVector, 
        genericChessPieceMovement
    ]

    // 2) Vector for moving Bishop diagonally north west
    const northWestVector= new MoveVector(1, -1, movementUnrestricted)
    const northWestMechanics : VectorMechanics = [
        northWestVector, 
        genericChessPieceMovement
    ]

    // 3) Vector for moving Bishop diagonally south east
    const southEastVector = new MoveVector(-1, 1, movementUnrestricted)
    const southEastMechanics : VectorMechanics = [
        southEastVector, 
        genericChessPieceMovement
    ]

    // 3) Vector for moving Bishop diagonally south east
    const southWestVector = new MoveVector(-1, -1, movementUnrestricted)
    const southWestMechanics : VectorMechanics = [
        southWestVector, 
        genericChessPieceMovement
    ]
    
    // Combine into an array
    const bishopMechanics: VectorMechanics[] = [
        northEastMechanics, 
        northWestMechanics, 
        southEastMechanics,
        southWestMechanics
    ]

    return new PieceMechanics(bishopMechanics)
}
