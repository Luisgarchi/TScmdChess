import { ChessPiece, ColourPlayers } from "../chess_settings"
import { Position } from "../notation/boardNotation/Position"
import { Move } from "../notation/moveNotation/Move"
import { King } from "../pieces/king/King"
import { Rook } from "../pieces/rook/Rook"
import { fileToNum, numToFile } from "../utils/notation"
import { ChessGame } from "./ChessGame"
import { isCheck } from "./check"



export const isCastles = function(move: Move, chessInstance: ChessGame): boolean{

    /**
     * Function that checks if a move is a legal castling move.
     * The function knows not of the colour of the players making the move.
     * If a move is in the correct notation it assumes the player making the move
     * is the colour of starting piece being moved.
     * 
     * Step 1) Check that the UCI move is a valid castling moves
     * Step 2) Ensure that all preconditions for castling have been met (King and rook
     *         are on their starting squares and have not moved)
     * Step 3) 
     * Step 4) 
     */

    return (
        isCastlesUCIMove(move) &&
        isCastlesBoardCorrect(move, chessInstance) && 
        (!isCheck(castleColour(move), chessInstance)) &&
        isNoOtherPieceBlocking(move, chessInstance) &&
        isOpponentNotControllingCastleSquares(move, chessInstance) 
    )
}


export const isCastlesUCIMove = function(move: Move): boolean{

    /**
     * Function that checks if a move in UCI notation is in the correct notation
     * for either king side or queenside castling for black or white.
     */
    const allowedCastles: string[] = ['e1g1', 'e8g8', 'e1c1', 'e8c8']

    // 1) Get the string representation of the move
    const moveString: string = move.serialise()

    // 2) heck if the move is one of the allowed
    return allowedCastles.includes(moveString)
}


export const castleColour = function(move: Move): ColourPlayers {

    /**
     * Return whether the castles move is white or black
     */
    
    const whiteCastles: string[] = [
        'e1g1',         // kingside
        'e1c1'          // queenside
    ]

    const blackCastles: string[] = [
        'e8g8',         // kingside
        'e8c8'          // queenside
    ]

    const moveString: string = move.serialise()
    
    if (whiteCastles.includes(moveString)){
        return 'white'
    }
    else if (blackCastles.includes(moveString)){
        return 'black'
    }
    else{
        throw new Error('Invalid move for castles')
    }
}


export const isCastlesBoardCorrect = function(move: Move, chessInstance: ChessGame): boolean {

    /**
     * Function that checks the king and rook are in their correct positions
     * 
     * Step 1) Get the pieces on the king and rook inital castling squares
     * Step 2) Test that the king and rook are in right position and havent moved
     */

    // 1
    // Get king and rook positions
    const kingPosition: Position = move.start
    const rookPosition: Position = getRookStartCastle(move)
    
    // Check there is a piece on the king and rookk positions
    const isKingPosition: boolean = chessInstance.board.isPieceAt(kingPosition)
    const isRookPosition: boolean = chessInstance.board.isPieceAt(rookPosition)

    // If there is not a piece on each position can not castle return false
    if(!(isKingPosition && isRookPosition)){
        return false
    }

    const king: ChessPiece = chessInstance.board.getPiece(kingPosition)
    const rook: ChessPiece = chessInstance.board.getPiece(rookPosition)


    const colour: ColourPlayers = castleColour(move)
    // 2)
    return (
        // king checks
        isKingInstance(king) && 
        (king.colour == colour) &&
        (Position.compare(king.startingPosition, kingPosition)) && 

        // rook checks
        isRookInstance(rook) &&
        (rook.colour == colour) &&
        (Position.compare(rook.startingPosition, rookPosition)) && 

        // Check not start in correct position and moved out of and back to same position
        rookKingNotMoved(move, chessInstance)
    )
}


export const getRookStartCastle = function(move: Move): Position {
        
    // The start square of the rook is going to depend on the player colour 
    // that is castling and the direction of the castles (king vs queen side)
    // we can get this information using the kings end square and mapping the
    // starting rook position to the corner of the direction the king moves

    const rookPreCastlePosition = new Map([
        ['g1', 'h1'],       // white kingside
        ['g8', 'h8'],       // black kingside
        ['c1', 'a1'],       // white queenside
        ['c8', 'a8']        // black queenside
    ])

    // Get kind end square
    const kingMoveDirection: string = move.end.serialise()

    // Map King position (string) to Rook position (string) convert to Position
    return new Position(rookPreCastlePosition.get(kingMoveDirection))
}


export const isKingInstance = function(piece: ChessPiece): piece is King {
    // Type guard function to check if the value is an instance of King
    return piece instanceof King
}


export const isRookInstance = function(piece: ChessPiece): piece is Rook {
    // Type guard function to check if the value is an instance of Rook
    return piece instanceof Rook
}


const rookKingNotMoved = function(move: Move, chessInstance: ChessGame): boolean {

    /**
     * Function that checks if any move has been made throughout a chess game 
     * concerning the king and rooks starting squares for castling
     * 
     * Step 1) Get a string represntation of the UCI position for king and rook 
     * Step 2) Iterate over the chess games move history to see if a piece has at any 
     *         point been moved from these position. If they have then we can not castle.
     * Step 3) If we sucessfully complete iterating over the history without returning from the 
     *         function then we are certain that king and rook have not been moved: return true
     */

    // 1) Get position for king and rook
    const mustNotHaveMoved: string[] = [
        move.start.serialise(),                 // King square
        getRookStartCastle(move).serialise()    // Rook square
    ]

    // 2) Iterate over histroy
    for (let i = 0; i < chessInstance.history.length; i++){

        const movingPiecePosition: string = chessInstance.history[i].slice(0,2)

        if (mustNotHaveMoved.includes(movingPiecePosition)){
            return false
        }
    }

    // 3) No move has been found return true
    return true
}


const getPositionsAlongRank = function(start: Position, end: Position): Position[] {

    /**
     * Function that gets the positions (not inclusive) between start and end position
     * for moves along a rank
     */

    // Get the rank they both lie on
    const rank: number = start.rank

    // Get the file of each piece as a number
    const startFile: number = fileToNum(start.file)
    const endFile: number = fileToNum(end.file)

    // sort the files into small and big
    const small: number = (startFile > endFile) ? endFile : startFile
    const big: number = (startFile > endFile) ? startFile : endFile

    // Create empty list to store files in between
    const files: number[] = []

    // File files inbetween (hence start at i = 1; and end index not inclusive)
    const n: number = big - small
    for (let i = 1; i < n; i++){
        files.push(small + i)
    }

    // convert numeric files into positions with the starting rank
    const positionsInbetween: Position[] = files.map((x) => new Position(numToFile(x), rank))

    return positionsInbetween
}


export const isNoOtherPieceBlocking = function(move: Move, chessInstance: ChessGame): boolean {

    /**
     * Function that checks no pieces blocks the positions between the king and the rook
     * 
     * Step 1) Get the positions inbetween the king and rook
     * Step 2) Check if there are any piece on the board on these positions
     */

    // 1) Get Positions inbetween
    // Get king and rook positions
    const kingPosition: Position = move.start
    const rookPosition: Position = getRookStartCastle(move)

    // Get positions (not inclusive)
    const positionsInbetween: Position[] = getPositionsAlongRank(kingPosition, rookPosition)

    // 2)Check to see if any pieces are on these positions
    const allPieces: ChessPiece[] = chessInstance.board.pieces

    for (let i = 0; i < allPieces.length; i++){

        // Get each piece
        const potentialBlockPiecePosition: Position = allPieces[i].position
        
        // Check if blocking
        if (Position.includes(positionsInbetween, potentialBlockPiecePosition)){
            return false
        }
    }

    // No pieces found blocking, return true
    return true
}


export const isOpponentNotControllingCastleSquares = function(move: Move, chessInstance: ChessGame): boolean {
    
    /**
     * The rook can pass through an attacked square when castling while the king cannot.
     * 
     * Step 1) Get the squares the king has to move through
     * Step 2) Check that no enemy piece controls these squares
     */

    // 1)
    // Get king start and end positions
    const kingStart: Position = move.start
    const kingEnd: Position = move.end

    // Get all the positions inbetween (not inclusive)
    const kingMovesThrough: Position[] = getPositionsAlongRank(kingStart, kingEnd)

    // Add the kings destination square since (king start is should already be enforced 
    // by making sure the king is not in check)
    kingMovesThrough.push(kingEnd)


    // 2)
    // Get colour
    const colour: ColourPlayers = castleColour(move)

    // Filter for opposite coloured pieces
    const diffColourPieces: ChessPiece[] = chessInstance.board.pieces.filter(
        (piece) => piece.colour != colour)
    
    // Check for each piece all the positions it controls
    for (let i = 0; i < diffColourPieces.length; i++){

        // Get the enemy piece
        const checkPiece: ChessPiece = diffColourPieces[i]

        // Get all the positions the enemy piece controls
        const allPositions: Position[] = checkPiece.movement.findReachablePositions(checkPiece, chessInstance.board)
        
        // Check if any of those positions are inbetween the king and the rook
        for (let j = 0; j < kingMovesThrough.length; j++){
            const individualInbetween: Position = kingMovesThrough[j]
            if (Position.includes(allPositions, individualInbetween)){
                return false
            }                
        }
    }

    // Otherwise no enemy piece has be found controlling the squares. Return true
    return true
}
