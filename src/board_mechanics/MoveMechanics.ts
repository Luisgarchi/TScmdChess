import { Position } from "./Position";
import { MoveVector } from "./MoveVector";
import { ChessBoard } from "../boards/ChessBoard"
import { type ChessPiece } from "../chess_settings";


/*  A Piece can move along multiple vectors each specified in a 'MoveVector' class. Movement 
    along each vector is subject to different conditions depending on the current state of 
    the board/chess game. 

    A callback function is associated to each vector and uses the current piece and board 
    to change the movement mechanics throughout a chess game. 
    
    The vector and callback are grouped together in a tupple of type 'PieceVectorMechanics'. 
    The function in question creates an array of objects type 'PieceVectorMechanics' to 
    initializes and return an object of type 'MoveMechanics' describing the Piece's movement 
*/

export type PieceVectorMechanics = [MoveVector, (vector: MoveVector, piece: ChessPiece, board: ChessBoard) => void];



export class MoveMechanics {

    /* Properties*/

    private _moveMechanics: PieceVectorMechanics
    

    /* Constructor */

    constructor(moveMechanics){
        this._moveMechanics = moveMechanics
    }


    /* Getters */

    get moveMechanics(): PieceVectorMechanics {
        return this._moveMechanics
    }


    /* Methods */


    initializeVectorMechanics(piece: ChessPiece, board: ChessBoard){


        for(let i = 0; i < this._moveMechanics.length; i++){

            const vector = this._moveMechanics[i][0]
            const callback = this._moveMechanics[i][1]

            callback(vector, piece, board)
        }
    }


    findReachablePositions(piece: ChessPiece, board: ChessBoard): string[] {

        /* finds and returns a serialised repesentation of all the positions 
        a piece placed on an empty board can move to */

        // Initialize the correct vectors based on the piece and chess board
        this.initializeVectorMechanics(piece, board)

        // Initialize an array where the positions will be stored when found.
        const allPositions = []

        // Iterate over all vectors, find and storing all positions along that vector
        for (let i = 0; i < this._moveMechanics.length; i++){

            // get the vector
            const vector: MoveVector = this._moveMechanics[i][0]
            if (vector.activated){
                // find the positions along vector for the current position of the piece
                const positionsVector: Position[] = piece.position.findPositionsAlongVector(vector)
                allPositions.push(...positionsVector)
            }

        }

        const serialisedPositions: string[] =  allPositions.map((position) => position.serialise())
        return serialisedPositions
    }
    



}