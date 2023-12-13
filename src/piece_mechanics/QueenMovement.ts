import { MoveVector } from "../board_mechanics/MoveVector"
import { ChessBoard } from "../boards/ChessBoard"
import { Queen } from "../pieces/Queen"   
import { MoveMechanics, type PieceVectorMechanics } from "../board_mechanics/MoveMechanics"



/* Factory function */

export function factoryQueenMechanics(): MoveMechanics {

    // Queens can move any amount of squares along a unit vector
    const movementUnrestricted: number = 0


    /* Define the Mechanics of each vector */


    // 1) Vector for moving Queen north
    const northVector: MoveVector = new MoveVector(1, 0, movementUnrestricted)
    const northMechanics: PieceVectorMechanics = [northVector, constantMovenet]

    // 2) Vector for moving Queen south
    const southVector= new MoveVector(-1, 0, movementUnrestricted)
    const southMechanics : PieceVectorMechanics = [southVector, constantMovenet]

    // 3) Vector for moving Queen east
    const eastVector = new MoveVector(0, 1, movementUnrestricted)
    const eastMechanics : PieceVectorMechanics = [eastVector, constantMovenet]

    // 4) Vector for moving Queen west
    const westVector = new MoveVector(0, -1, movementUnrestricted)
    const westMechanics : PieceVectorMechanics = [westVector, constantMovenet]



    // 5) Vector for moving Queen diagonally north east
    const northEastVector: MoveVector = new MoveVector(1, 1, movementUnrestricted)
    const northEastMechanics: PieceVectorMechanics = [northEastVector, constantMovenet]

    // 6) Vector for moving Queen diagonally north west
    const northWestVector= new MoveVector(1, -1, movementUnrestricted)
    const northWestMechanics : PieceVectorMechanics = [northWestVector, constantMovenet]

    // 7) Vector for moving Queen diagonally south east
    const southEastVector = new MoveVector(-1, 1, movementUnrestricted)
    const southEastMechanics : PieceVectorMechanics = [southEastVector, constantMovenet]

    // 8) Vector for moving Queen diagonally south east
    const southWestVector = new MoveVector(-1, -1, movementUnrestricted)
    const southWestMechanics : PieceVectorMechanics = [southWestVector, constantMovenet]
    
    

    // Combine into an array
    const queenMechanics: PieceVectorMechanics[] = [
        northMechanics, 
        eastMechanics, 
        southMechanics,
        westMechanics,
        northEastMechanics,
        northWestMechanics,
        southEastMechanics,
        southWestMechanics
    ]

    return new MoveMechanics(queenMechanics)
}



/* Define callback functions for movement mechanics used in factory function */

export const constantMovenet = function (vector: MoveVector, piece: Queen, board: ChessBoard){

    /* Queens always move the same. No further logic required for Queen movement mechanics*/

    return
}