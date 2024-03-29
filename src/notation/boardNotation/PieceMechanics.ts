import { Position }   from "./Position";
import { MoveVector } from "./MoveVector";
import { ChessPiece } from "../../chess_settings";
import { ChessBoard } from "../../board/ChessBoard";


/* Define the type for a callback function that modifies the vector 
based on a piece's position on the board. */

export type ConfigureVector = (
    vector: MoveVector, 
    piece: ChessPiece, 
    board: ChessBoard
    ) => void

/* Define the type for a callback function that calculates all the positions
a piece can move to on the board along the specified vector. */

export type PositionsAlongVector = (
    vector: MoveVector, 
    piece: ChessPiece, 
    board: ChessBoard
    ) => Position[]


/* Define the type of a tupple containing all the functionality required 
for finding the board squares a chess piece can move to along a vector */

export type VectorMechanics = [
    MoveVector, 
    PositionsAlongVector
];



export class PieceMechanics {

    /* Properties*/
    private _mechanics: VectorMechanics[]
    
    /* Constructor */
    constructor(moveMechanics){
        this._mechanics = moveMechanics
    }

    /* Methods */

    findReachablePositions(piece: ChessPiece, board: ChessBoard): Position[] {

        /* Return the positions a piece can move to in a move */

        // Initialize the correct vectors based on the piece and chess board
        //this.initializeVectorMechanics(piece, board)

        // Initialize an array where the positions will be stored when found.
        const allPositions = []

        // Filter for only active vectors
        const activeVectors: VectorMechanics[] = this._mechanics.filter(
            (mechanics) => mechanics[0].activated
        )

        // Iterate over all vectors, find and storing all positions along that vector
        for (let i = 0; i < activeVectors.length; i++){

            // get the vector
            const vector: MoveVector = this._mechanics[i][0]

            // get the associated function used to find positions along said vector
            const findPositions: PositionsAlongVector = this._mechanics[i][1]

            // find the positions along vector for the current piece on the board
            const positionsVector: Position[] = findPositions(vector, piece, board)

            // Store the positions
            allPositions.push(...positionsVector)

        }
        return allPositions
    }

    findSquaresForVectorContainingPosition(piece: ChessPiece, position: Position, board: ChessBoard): Position[] {
        
        const activeVectors: VectorMechanics[] = this._mechanics.filter(
            (mechanics) => mechanics[0].activated
        )

        for (let i = 0; i < activeVectors.length; i++){

            // get the vector
            const vector: MoveVector = this._mechanics[i][0]

            // get the associated function used to find positions along said vector
            const findPositions: PositionsAlongVector = this._mechanics[i][1]

            // find the positions along vector for the current piece on the board
            const positionsVector: Position[] = findPositions(vector, piece, board)

            if (Position.includes(positionsVector, position)){
                return positionsVector
            }

        }
        throw new Error(`Can not find the positions along a vector that indlude ${position.serialise()}`)
    }

    get mechanics(){
        return this._mechanics
    }

}
