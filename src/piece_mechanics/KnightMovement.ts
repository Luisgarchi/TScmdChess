import { MoveVector } from "../board_mechanics/MoveVector"
import { ChessBoard } from "../boards/ChessBoard"
import { Knight } from "../pieces/Knight"   
import { MoveMechanics, type PieceVectorMechanics } from "../board_mechanics/MoveMechanics"



/* Factory function */

export function factoryKnightMechanics(): MoveMechanics {

    // Knights can move only once along a unit vector in a single move
    const movementUnrestricted: number = 1


    /* Define the Mechanics of each vector */

    // 1) Vector for moving Knight diagonally north north east
    const northNorthEastVector: MoveVector = new MoveVector(2, 1, movementUnrestricted)
    const northNorthEastMechanics: PieceVectorMechanics = [northNorthEastVector, constantMovenet]

    // 2) Vector for moving Knight diagonally north east east
    const northEastEastVector: MoveVector = new MoveVector(1, 2, movementUnrestricted)
    const northEastEastMechanics: PieceVectorMechanics = [northEastEastVector, constantMovenet]


    // 3) Vector for moving Knight diagonally north north west
    const northNorthWestVector: MoveVector = new MoveVector(2, -1, movementUnrestricted)
    const northNorthWestMechanics: PieceVectorMechanics = [northNorthWestVector, constantMovenet]

    // 4) Vector for moving Knight diagonally north west west
    const northWestWestVector: MoveVector = new MoveVector(1, -2, movementUnrestricted)
    const northWestWestMechanics: PieceVectorMechanics = [northWestWestVector, constantMovenet]


    // 5) Vector for moving Knight diagonally south south east
    const southSouthEastVector: MoveVector = new MoveVector(-2, 1, movementUnrestricted)
    const southSouthEastMechanics: PieceVectorMechanics = [southSouthEastVector, constantMovenet]

    // 6) Vector for moving Knight diagonally south east east
    const southEastEastVector: MoveVector = new MoveVector(-1, 2, movementUnrestricted)
    const southEastEastMechanics: PieceVectorMechanics = [southEastEastVector, constantMovenet]


    // 7) Vector for moving Knight diagonally south south west
    const southSouthWestVector: MoveVector = new MoveVector(-2, -1, movementUnrestricted)
    const southSouthWestMechanics: PieceVectorMechanics = [southSouthWestVector, constantMovenet]

    // 8) Vector for moving Knight diagonally south west west
    const southWestWestVector: MoveVector = new MoveVector(-1, -2, movementUnrestricted)
    const southWestWestMechanics: PieceVectorMechanics = [southWestWestVector, constantMovenet]



    // Combine into an array
    const knightMechanics: PieceVectorMechanics[] = [
        northNorthEastMechanics, 
        northEastEastMechanics, 
        northNorthWestMechanics,
        northWestWestMechanics,
        southSouthEastMechanics,
        southEastEastMechanics,
        southSouthWestMechanics,
        southWestWestMechanics
    ]

    return new MoveMechanics(knightMechanics)
}



/* Define callback functions for movement mechanics used in factory function */

export const constantMovenet = function (vector: MoveVector, piece: Knight, board: ChessBoard){

    /* Knights always move the same. No further logic required for Knight movement mechanics*/

    return
}