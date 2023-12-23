
import { Pawn } from "./pieces/pawn/Pawn"
import { Bishop } from "./pieces/bishop/Bishop"
import { Knight } from "./pieces/knight/Knight"
import { Rook } from "./pieces/rook/Rook"
import { Queen } from "./pieces/queen/Queen"
import { King } from "./pieces/king/King"

import { Position } from "./notation/boardNotation/Position"

export type ChessPiece = Pawn | Bishop | Knight | Rook | Queen | King

// Chess Game
export type ColourPlayers = 'white' | 'black'
export type NamesOfPieces = 'Pawn' | 'Bishop' | 'Knight' | 'Rook' | 'Queen' | 'King'

// Board Settings
export const SQUARE_BOARD_SIZE: number = 8
export const START_FILE : string = 'a'
export const START_RANK : number = 1

// Starting Pieces

export function initialiseStartingChessPieces(): ChessPiece[] {

    // Define Array to contain all pieces
    const pieces = []

    // Initialize white's Pawns on the second rank
    const whitePawns = [new Pawn("white", new Position('a', 2)), new Pawn("white", new Position('b', 2)), 
                        new Pawn("white", new Position('c', 2)), new Pawn("white", new Position('d', 2)), 
                        new Pawn("white", new Position('e', 2)), new Pawn("white", new Position('f', 2)), 
                        new Pawn("white", new Position('g', 2)), new Pawn("white", new Position('h', 2))]
    
    // Initialize black's Pawns on the seventh rank
    const blackPawns = [new Pawn("black", new Position('a', 7)), new Pawn("black", new Position('b', 7)), 
                        new Pawn("black", new Position('c', 7)), new Pawn("black", new Position('d', 7)), 
                        new Pawn("black", new Position('e', 7)), new Pawn("black", new Position('f', 7)), 
                        new Pawn("black", new Position('g', 7)), new Pawn("black", new Position('h', 7))]
    
    
    // Initialize white's Minor and Major Pieces on the first rank 
    const whiteMajorMinor =    [new Rook("white", new Position('a', 1)), new Knight("white", new Position('b', 1)), 
                                new Bishop("white", new Position('c', 1)), new Queen("white", new Position('d', 1)), 
                                new King("white", new Position('e', 1)), new Bishop("white", new Position('f', 1)), 
                                new Knight("white", new Position('g', 1)), new Rook("white", new Position('h', 1))]

    // Initialize black's Minor and Major Pieces on the eigth rank 
    const blackMajorMinor =    [new Rook("black", new Position('a', 8)), new Knight("black", new Position('b', 8)), 
                                new Bishop("black", new Position('c', 8)), new Queen("black", new Position('d', 8)), 
                                new King("black", new Position('e', 8)), new Bishop("black", new Position('f', 8)), 
                                new Knight("black", new Position('g', 8)), new Rook("black", new Position('h', 8))]
    
    // Save the initialized pieces
    pieces.push(... whitePawns)
    pieces.push(... blackPawns)
    pieces.push(... whiteMajorMinor)
    pieces.push(... blackMajorMinor)

    return pieces
}

