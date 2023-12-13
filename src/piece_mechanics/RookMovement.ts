import { MoveVector } from "../board_mechanics/MoveVector"
import { ChessBoard } from "../boards/ChessBoard"
import { Rook } from "../pieces/Rook"   
import { MoveMechanics, type PieceVectorMechanics } from "../board_mechanics/MoveMechanics"



/* Factory function */

export function factoryRookMechanics(): MoveMechanics {

    // Rooks can move any amount of squares along a unit vector * 
    const movementUnrestricted: number = 0


    /* Define the Mechanics of each vector */

    // 1) Vector for moving Rook north
    const northVector: MoveVector = new MoveVector(1, 0, movementUnrestricted)
    const northMechanics: PieceVectorMechanics = [northVector, constantMovenet]

    // 2) Vector for moving Rook south
    const southVector= new MoveVector(-1, 0, movementUnrestricted)
    const southMechanics : PieceVectorMechanics = [southVector, constantMovenet]

    // 3) Vector for moving Rook east
    const eastVector = new MoveVector(0, 1, movementUnrestricted)
    const eastMechanics : PieceVectorMechanics = [eastVector, constantMovenet]

    // 4) Vector for moving Rook west
    const westVector = new MoveVector(0, -1, movementUnrestricted)
    const westMechanics : PieceVectorMechanics = [westVector, constantMovenet]
    
    // Combine into an array
    const rookMechanics: PieceVectorMechanics[] = [
        northMechanics, 
        eastMechanics, 
        southMechanics,
        westMechanics
    ]

    return new MoveMechanics(rookMechanics)
}



/* Define callback functions for movement mechanics used in factory function */

export const constantMovenet = function (vector: MoveVector, piece: Rook, board: ChessBoard){

    /* Rooks always move the same. No further logic required for Rook movement mechanics*/

    return
}