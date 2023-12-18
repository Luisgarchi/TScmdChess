import { Pawn } from "./pieces/pawn/Pawn"

export type ChessPiece = Pawn 

// Chess Game
export type ColourPlayers = 'white' | 'black'
export type NamesOfPieces = 'Pawn' | 'Bishop' | 'Knight' | 'Rook' | 'Queen' | 'King'

// Board Settings
export const SQUARE_BOARD_SIZE: number = 8
export const START_FILE : string = 'a'
export const START_RANK : number = 1
