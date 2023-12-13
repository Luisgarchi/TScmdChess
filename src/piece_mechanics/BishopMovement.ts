import { MoveVector } from "../board_mechanics/MoveVector"
import { ChessBoard } from "../boards/ChessBoard"
import { Bishop } from "../pieces/Bishop"   
import { MoveMechanics, type PieceVectorMechanics } from "../board_mechanics/MoveMechanics"



/* Factory function */

export function factoryBishopMechanics(): MoveMechanics {

    // Bishops can move any amount of squares along a unit vector
    const movementUnrestricted: number = 0


    /* Define the Mechanics of each vector */

    // 1) Vector for moving Bishop diagonally north east
    const northEastVector: MoveVector = new MoveVector(1, 1, movementUnrestricted)
    const northEastMechanics: PieceVectorMechanics = [northEastVector, constantMovenet]

    // 2) Vector for moving Bishop diagonally north west
    const northWestVector= new MoveVector(1, -1, movementUnrestricted)
    const northWestMechanics : PieceVectorMechanics = [northWestVector, constantMovenet]

    // 3) Vector for moving Bishop diagonally south east
    const southEastVector = new MoveVector(-1, 1, movementUnrestricted)
    const southEastMechanics : PieceVectorMechanics = [southEastVector, constantMovenet]

    // 3) Vector for moving Bishop diagonally south east
    const southWestVector = new MoveVector(-1, -1, movementUnrestricted)
    const southWestMechanics : PieceVectorMechanics = [southWestVector, constantMovenet]
    
    // Combine into an array
    const bishopMechanics: PieceVectorMechanics[] = [
        northEastMechanics, 
        northWestMechanics, 
        southEastMechanics,
        southWestMechanics
    ]

    return new MoveMechanics(bishopMechanics)
}



/* Define callback functions for movement mechanics used in factory function */

export const constantMovenet = function (vector: MoveVector, piece: Bishop, board: ChessBoard){

    /* Bishops always move the same. No further logic required for Bishop movement mechanics*/

    return
}