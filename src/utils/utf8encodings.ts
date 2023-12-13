import { type ColourPlayers, type NamesOfPieces } from "../chess_settings"

// Pieces
const chessPieces = {
    white: {
        // White Pieces
        King   : '♔',
        Queen  : '♕',
        Rook   : '♖',
        Bishop : '♗',
        Knight : '♘',
        Pawn   : '♙',
    },

    black: {
        // Black Pieces
        King    : '♚',
        Queen   : '♛',
        Rook    : '♜',
        Bishop  : '♝',
        Knight  : '♞',
        Pawn    : '♟︎',
    },
}

export function getChessPieceSymbol(colour: ColourPlayers, piece: NamesOfPieces): string {

    return chessPieces[colour][piece]
}


export const box = {
    // Lines
    horizontal        : '━',
    vertical          : '┃',

    // Corners
    cornerTopLeft     : '┏',
    cornerTopRight    : '┓',
    cornerBottomLeft  : '┗',
    cornerBottomRight : '┛',

    // Edges
    edgeTop           : '┳',
    edgeBottom        : '┻',
    edgeRight         : '┫',
    edgeLeft          : '┣',

    // Cross 
    cross             : '╋',
}