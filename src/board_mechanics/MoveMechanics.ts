import { Position } from "./Position";
import { MoveVector } from "./MoveVector";
import { ChessBoard } from "../boards/ChessBoard"
import { fileToNum, numToFile} from "../utils/notation" 
import { BoardNotationObject, BOARD_DIMENSIONS } from "../utils/notation"
import { type ChessPiece, ColourPlayers } from "../chess_settings";


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
    private _boardDimensions: BoardNotationObject
    

    /* Constructor */

    constructor(moveMechanics){
        this._moveMechanics = moveMechanics
        this._boardDimensions = BOARD_DIMENSIONS
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


    findReachablePositions(piece: ChessPiece, board: ChessBoard): Position[] {

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
                const positionsVector: Position[] = this.findPositionsAlongVector(vector, piece, board)
                allPositions.push(...positionsVector)
            }
        }
        return allPositions
    }



    findPositionsAlongVector(vector: MoveVector, piece: ChessPiece, board: ChessBoard): Position[] {

        /* Function that accepts a move vector and returns an array of Positions that are
        located along the vector. The starting position this not included in the array. */ 
        
        const positions: Position[] = []

        // Get the board dimensions in numbers
        const minFile: number = fileToNum(this._boardDimensions.fileStart)
        const maxFile: number = fileToNum(this._boardDimensions.fileEnd)
        const minRank: number = this._boardDimensions.rankStart
        const maxRank: number = this._boardDimensions.rankEnd


        // Check if the movement is restricted for each successive move
        const stopAfter = (vector.restricted) ? (i: number) => i <= vector.restricted : (i: number) => true

        // Function checks if a file and rank are on a board
        const isOnBoard = (file: number, rank: number) : boolean => ((file >= minFile) && (file <= maxFile) && 
                                                                     (rank >= minRank) && (rank <= maxRank))
        
        // Calculate the next file and rank after moving once along a vector
        let nextFile = fileToNum(piece.position.file) + vector.fileComponent
        let nextRank = piece.position.rank + vector.rankComponent

        // Set the move iteration to 1 as per the definition of nexFile and nextRank above
        let moveIteration = 1

        // ç
        const pieceColour: ColourPlayers = piece.colour
        const sameColour = (piece: ChessPiece) => piece.colour == pieceColour
        const differentColour = (piece: ChessPiece) => piece.colour != pieceColour

        // Find all the positions along the vector that lie on the board
        while (stopAfter(moveIteration) && 
               isOnBoard(nextFile, nextRank) &&
               this.isNotBlocked(new Position(numToFile(nextFile), nextRank), board, sameColour)
               ){

                // Create a new position and append it to array
                const newPosition: Position = new Position(numToFile(nextFile), nextRank)
                positions.push(newPosition)

                // Check if moving to this position is a capture
                if (this.isNotBlocked(new Position(numToFile(nextFile), nextRank), board, differentColour)){
                    break
                }

                // Get the next vector and increment the move iteration
                nextFile += vector.fileComponent
                nextRank += vector.rankComponent
                moveIteration ++ 
            }
        return positions
    }
    
    isNotBlocked(position: Position, board: ChessBoard, filterPiecesBy?: (piece: ChessPiece) => boolean): boolean {
        
        const filterPieces = (typeof filterPiecesBy === 'undefined') ? (piece: ChessPiece) => true : filterPiecesBy
    
        // Check if any of the pieces on the board block the piece from moving to targetPosition
        const pieces: ChessPiece[] = board.pieces.filter(filterPieces)

        for (let i = 0; i < pieces.length; i++){
            
            const piece: ChessPiece = pieces[i]
            
            if((piece.position.file == position.file) && (piece.position.rank == position.rank)){
                return false
            }
        }
        return true
    }


    

    calculateVector(startPosition: Position, endPosition: Position): MoveVector{
            
        // Takes two positions and finds the vector between the two
        
        // Calculate direction components
        const fileVector = fileToNum(startPosition.file) - fileToNum(endPosition.file)
        const rankVector = startPosition.rank - endPosition.rank 

        // Compose vector
        return new MoveVector(rankVector, fileVector)

    }

    
    isMoveUnimpeded(targetPosition: Position, piece: ChessPiece, board: ChessBoard): boolean{

        // Get all of the actice vectors to test
        const activeVectors: MoveVector[]= this._moveMechanics
            .map((moveMechanic) => moveMechanic[0])
            .filter((vector) => vector.activated)
            

        // Iterate over all vectors
        for (let i = 0; i < activeVectors.length; i++){

            // get the vector
            const vector: MoveVector = activeVectors[i]

            // find the positions along vector for the current position of the piece
            const serialisedPositions: string[] = piece.position
                .findPositionsAlongVector(vector)
                .map((position) => position.serialise())

            // First check if the target square lies on the vector (continue if not)
            const targetSquare : string = targetPosition.serialise()
            if (serialisedPositions.includes(targetSquare)){

                const isVectorBlocked = this.checkVectorBlocked()
                
                if (isVectorBlocked){
                    return false
                }
            }
        }

        // otherwise return true
        return true
    }


}

