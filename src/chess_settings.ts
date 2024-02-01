
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

// Regex for UCI move notation
export const regexUCI: RegExp = /^[a-h][1-8][a-h][1-8][nqbr]?$/

// Starting Pieces

export function initialiseStartingChessPieces(): ChessPiece[] {

    // Define Array to contain all pieces
    const pieces = []

    // Initialize white's Pawns on the second rank
    const whitePawns = [new Pawn("white", 'a2'), new Pawn("white", 'b2'), 
                        new Pawn("white", 'c2'), new Pawn("white", 'd2'), 
                        new Pawn("white", 'e2'), new Pawn("white", 'f2'), 
                        new Pawn("white", 'g2'), new Pawn("white", 'h2')]
    
    // Initialize black's Pawns on the seventh rank
    const blackPawns = [new Pawn("black", 'a7'), new Pawn("black", 'b7'), 
                        new Pawn("black", 'c7'), new Pawn("black", 'd7'), 
                        new Pawn("black", 'e7'), new Pawn("black", 'f7'), 
                        new Pawn("black", 'g7'), new Pawn("black", 'h7')]
    
    
    // Initialize white's Minor and Major Pieces on the first rank 
    const whiteMajorMinor =    [new Rook("white", 'a1'), new Knight("white", 'b1'), 
                                new Bishop("white", 'c1'), new Queen("white", 'd1'), 
                                new King("white", 'e1'), new Bishop("white", 'f1'), 
                                new Knight("white", 'g1'), new Rook("white", 'h1')]

    // Initialize black's Minor and Major Pieces on the eigth rank 
    const blackMajorMinor =    [new Rook("black", 'a8'), new Knight("black", 'b8'), 
                                new Bishop("black", 'c8'), new Queen("black", 'd8'), 
                                new King("black", 'e8'), new Bishop("black", 'f8'), 
                                new Knight("black", 'g8'), new Rook("black", 'h8')]
    
    // Save the initialized pieces
    pieces.push(... whitePawns)
    pieces.push(... blackPawns)
    pieces.push(... whiteMajorMinor)
    pieces.push(... blackMajorMinor)

    return pieces
}

