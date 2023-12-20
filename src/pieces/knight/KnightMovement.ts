import { MoveVector } from "../../notation/boardNotation/MoveVector"
import { PieceMechanics, type VectorMechanics } from "../../notation/boardNotation/PieceMechanics"
import { genericChessPieceMovement } from "../genericMovement"


/* Factory function */

export function factoryKnightMechanics(): PieceMechanics {

    // Knights can move only once along a unit vector in a single move
    const movementUnrestricted: number = 1


    /* Define the Mechanics of each vector */

    // 1) Vector for moving Knight diagonally north north east
    const northNorthEastVector: MoveVector = new MoveVector(2, 1, movementUnrestricted)
    const northNorthEastMechanics: VectorMechanics = [
        northNorthEastVector, 
        genericChessPieceMovement
    ]

    // 2) Vector for moving Knight diagonally north east east
    const northEastEastVector: MoveVector = new MoveVector(1, 2, movementUnrestricted)
    const northEastEastMechanics: VectorMechanics = [
        northEastEastVector, 
        genericChessPieceMovement
    ]


    // 3) Vector for moving Knight diagonally north north west
    const northNorthWestVector: MoveVector = new MoveVector(2, -1, movementUnrestricted)
    const northNorthWestMechanics: VectorMechanics = [
        northNorthWestVector, 
        genericChessPieceMovement
    ]

    // 4) Vector for moving Knight diagonally north west west
    const northWestWestVector: MoveVector = new MoveVector(1, -2, movementUnrestricted)
    const northWestWestMechanics: VectorMechanics = [
        northWestWestVector, 
        genericChessPieceMovement
    ]


    // 5) Vector for moving Knight diagonally south south east
    const southSouthEastVector: MoveVector = new MoveVector(-2, 1, movementUnrestricted)
    const southSouthEastMechanics: VectorMechanics = [
        southSouthEastVector,
        genericChessPieceMovement
    ]

    // 6) Vector for moving Knight diagonally south east east
    const southEastEastVector: MoveVector = new MoveVector(-1, 2, movementUnrestricted)
    const southEastEastMechanics: VectorMechanics = [
        southEastEastVector, 
        genericChessPieceMovement
    ]


    // 7) Vector for moving Knight diagonally south south west
    const southSouthWestVector: MoveVector = new MoveVector(-2, -1, movementUnrestricted)
    const southSouthWestMechanics: VectorMechanics = [
        southSouthWestVector, 
        genericChessPieceMovement
    ]

    // 8) Vector for moving Knight diagonally south west west
    const southWestWestVector: MoveVector = new MoveVector(-1, -2, movementUnrestricted)
    const southWestWestMechanics: VectorMechanics = [
        southWestWestVector, 
        genericChessPieceMovement
    ]



    // Combine into an array
    const knightMechanics: VectorMechanics[] = [
        northNorthEastMechanics, 
        northEastEastMechanics, 
        northNorthWestMechanics,
        northWestWestMechanics,
        southSouthEastMechanics,
        southEastEastMechanics,
        southSouthWestMechanics,
        southWestWestMechanics
    ]

    return new PieceMechanics(knightMechanics)
}
