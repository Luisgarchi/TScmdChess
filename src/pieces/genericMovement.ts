import { Position } from "../notation/boardNotation/Position";
import { MoveVector } from "../notation/boardNotation/MoveVector";
import { ChessPiece } from "../chess_settings";
import { ChessBoard } from "../boards/ChessBoard";
import { PositionsAlongVector } from "../notation/boardNotation/PieceMechanics";
import { fileToNum, numToFile } from "../utils/notation";
import { ColourPlayers } from "../chess_settings";


export const genericChessPieceMovement : PositionsAlongVector = function(
    vector: MoveVector, 
    piece: ChessPiece, 
    board: ChessBoard
    ){

    const allPositions : Position[] = allVectorPositionsOnBoard(vector, piece, board)
    const restrictedPositions : Position[] = filterPositionsRestricted(allPositions, vector)
    const removeBlockedPositions: Position[] = filterBlockingPieces(restrictedPositions, piece, board)
    
    return removeBlockedPositions
}


export const allVectorPositionsOnBoard: PositionsAlongVector = function(
    vector: MoveVector, 
    piece: ChessPiece, 
    board: ChessBoard){

    // Function that accepts a move vector and returns an array of Positions that are
    // located along the vector. The starting position this not included in the array. 
    
    const positions: Position[] = []

    // Get the board dimensions in numbers
    const minFile: number = fileToNum(board.boardDimensions.fileStart)
    const maxFile: number = fileToNum(board.boardDimensions.fileEnd)
    const minRank: number = board.boardDimensions.rankStart
    const maxRank: number = board.boardDimensions.rankEnd

    // Function checks if a file and rank are on a board
    const isOnBoard = function (file: number, rank: number) : boolean {
        return (
            (file >= minFile) && 
            (file <= maxFile) && 
            (rank >= minRank) && 
            (rank <= maxRank)
        )
    }

    // Calculate the next file and rank after moving once along a vector
    let nextFile = fileToNum(piece.position.file) + vector.fileComponent
    let nextRank = piece.position.rank + vector.rankComponent

    while (isOnBoard(nextFile, nextRank)){

        // Create a new position and append it to array
        const newPosition: Position = new Position(numToFile(nextFile), nextRank)
        positions.push(newPosition)

        // Create the next vector
        nextFile += vector.fileComponent
        nextRank += vector.rankComponent
    }
    return positions
}


export const filterPositionsRestricted = function (
    positions: Position[], 
    vector: MoveVector){
    
    // Function that filters an array of position based on the
    // vector restricted property

    if (vector.restricted == 0){
        // Value 0 means unrestricted 
        return positions
    }
    else {
        return positions.slice(0, vector.restricted)
    }
}


export const filterBlockingPieces = function(
    positions: Position[],
    piece: ChessPiece, 
    board: ChessBoard){

    /* Function returns a filtered array of positions a piece can legally move to. 
    
    Logic: A piece can move to a new position if it is not blocked by a piece
    of the same colour, if there is a piece of a different colour, it can move to 
    said square by capturing the piece but not any further along the vector */
        
    let positionsSerialised: string[] = positions.map((position) => position.serialise())

    const boardPieces: ChessPiece[] = board.pieces

    for (let i = 0; i < boardPieces.length; i++){

        // Get the current piece position and colour
        const blockingPiece: ChessPiece = boardPieces[i]
        const blockingPosition: Position = blockingPiece.position
        const blockingPositionSerialised: string = blockingPosition.serialise()
        const blockingColour: ColourPlayers = blockingPiece.colour


        // Only positions that lie on the vector
        if (positionsSerialised.includes(blockingPositionSerialised)){

            // Find the index of the blocking piece
            function matchingIndex(piecesPosition){
                return piecesPosition == blockingPositionSerialised
            }

            const index = positionsSerialised.findIndex(matchingIndex)
            
            // Handle logic for same and different coloured pieces
            if (piece.colour == blockingColour){
                
                // Same colour piece can only move to the index/position before blocking position
                if (index == 0){
                    return []
                }
                positionsSerialised = positionsSerialised.slice(0, index)
                positions = positions.slice(0, index)
            }
            else{

                // Different colour piece can move to the position by capturing
                positionsSerialised = positionsSerialised.slice(0, index + 1)
                positions = positions.slice(0, index + 1)
            }
        }
    }

    return positions
}

