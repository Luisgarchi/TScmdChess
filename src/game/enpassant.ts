import { ChessPiece } from "../chess_settings"
import { Position } from "../notation/boardNotation/Position"
import { ColourPlayers } from "../chess_settings"
import { Pawn } from "../pieces/pawn/Pawn"
import { fileToNum, numToFile } from "../utils/notation"
import { ChessBoard } from "../board/ChessBoard"
import { ChessGame } from "./ChessGame"




export function isEnpassant(piece: ChessPiece, endPosition: Position, chessInstance: ChessGame):  boolean {

    
    const board: ChessBoard = chessInstance.board
    const moveHistory: string[] = chessInstance.history

    // Get the colour of the pawn we want to 
    const colour: ColourPlayers = piece.colour

    // Get the correct starting rank depending on the pieces colour
    const legalRank: number = (colour == 'white') ? 5 : 4

    return (
        isPawn(piece) && 
        correctRank(piece, legalRank) && 
        correctEndPosition(piece, endPosition) && 
        isEnemyPawnOnCapture(colour, legalRank, endPosition, board) &&
        enemyPawnLastMove(colour,legalRank, endPosition, moveHistory) 
    )

}



const isPawn = function(piece: ChessPiece): boolean {
    // Check if the piece is a pawn
    return (piece instanceof Pawn)
}



const correctRank = function(piece: ChessPiece, legalRank: number): boolean {

    // Check if piece's rank matches the necessary for enpassant
    return (legalRank == piece.position.rank)
}



const correctEndPosition = function(piece: ChessPiece, endPosition: Position): boolean {

    // Check endPosition is correct
    const currentFileNum: number = fileToNum(piece.position.file)

    // Get the adjacent files and filter incase off the board
    const fileNumbers: number[] = [currentFileNum + 1, currentFileNum -1].filter(
        (file) => ((file > 0) && (file <= 8))
    )

    // Convert back to string
    const files: string[] = fileNumbers.map((file) => numToFile(file))
    
    // Get the allowed end rank of the moving pawn
    const endRank: number =  (piece.colour == 'white') ? 6 : 3
    
    // construct the end positions of potential enpassant
    const enpassantEndPositions: Position[] = files.map(
        (file) => new Position(file, endRank)
    )

    return (Position.includes(enpassantEndPositions, endPosition))
}



const getCapturePosition = function(endPosition:Position, legalRank: number): Position {

    return new Position(endPosition.file, legalRank)
}



const isEnemyPawnOnCapture = function (
    colour: ColourPlayers, 
    legalRank: number, 
    endPosition: Position, 
    board: ChessBoard
    ): boolean {

    // Get the capturing position
    const caputrePosition = getCapturePosition(endPosition, legalRank)

    // Check if there is a piece on the capturing position
    const isPiece: Boolean = board.isPieceAt(caputrePosition)

    if(!(isPiece)){
        return false
    }

    // Get the piece, check if it is a pawn and it is of different colour
    const potentialPawn: ChessPiece = board.getPiece(caputrePosition)

    // Check piece is a pawn and of opposite colour

    return (potentialPawn instanceof Pawn && potentialPawn.colour != colour)
}



const enemyPawnLastMove = function(
    colour: ColourPlayers,
    legalRank: number, 
    endPosition: Position,
    moveHistory: string[]
    ) : boolean {

    // Check that the previous move made by the opponent was from the start rank to the capture position

    // Get the capture position
    const caputrePosition = getCapturePosition(endPosition, legalRank)

    // Check that the last move made was the opponents pawn from the pawns start rank
    const startRank: number = (colour != 'white') ? 2 : 7

    // Get the starting position of enemy pawn the previous move for legal en passant
    const startPosition: Position = new Position(endPosition.file, startRank)
    
    // Parse the UCI move for enemy pawn to reach capturing position
    const move: string = startPosition.serialise() + caputrePosition.serialise()

    // Check if the last move in the board history is the necessary one for a legal en passant
    const lastMove: string = moveHistory.slice(-1)[0]

    // The move is a legal en passant move
    return (lastMove == move)
}