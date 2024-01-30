import { ChessPiece, ColourPlayers } from "../chess_settings"
import { Position } from "../notation/boardNotation/Position"
import { Bishop } from "../pieces/bishop/Bishop"
import { King } from "../pieces/king/King"
import { Knight } from "../pieces/knight/Knight"
import { Pawn } from "../pieces/pawn/Pawn"
import { Queen } from "../pieces/queen/Queen"
import { Rook } from "../pieces/rook/Rook"
import { ChessGame } from "./ChessGame"
import { findCheckingPieces, findKingLegalPositions, isCheck, isCheckMate } from "./check"


const positionPropertyTest = function(position: Position){
    return expect.objectContaining({rank: position.rank, file: position.file})
}

const piecePropertiesTest = function(piece: ChessPiece) {
    return expect.objectContaining({
        position: expect.objectContaining({rank: piece.position.rank, file: piece.position.file}), 
        colour : piece.colour, 
        type: piece.type})
} 



describe('Method - isCheck', () => {

    test('Simple check', () => {

        // Define colour of king
        const colour: ColourPlayers = 'white'

        // Define a king
        const kingInCheck = new King(colour, 'c1')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            kingInCheck,
            new Rook('black', 'c8')

        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = isCheck(colour, chess)
        const expected: boolean = true

        expect(result).toEqual(expected)
    })

    test('Double check', () => {

        // Define colour of king
        const colour: ColourPlayers = 'black'

        // Define a king
        const kingInCheck = new King(colour, 'd8')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            kingInCheck,
            new Rook('white', 'd3'),
            new Bishop('white', 'f6')

        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = isCheck(colour, chess)
        const expected: boolean = true

        expect(result).toEqual(expected)
    })

    
    test('Not in check simple', () => {

        // Define colour of king
        const colour: ColourPlayers = 'black'

        // Define a king
        const kingInCheck = new King(colour, 'g3')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            kingInCheck
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = isCheck(colour, chess)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })


    test('Not in check', () => {

        // Define colour of king
        const colour: ColourPlayers = 'white'

        // Define a king
        const kingInCheck = new King(colour, 'c1')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            kingInCheck,
            new Rook('black', 'c6'),
            new Rook('black', 'd8'),
            new Queen('black', 'a4'),
            new Bishop('black', 'a3'),
            new Knight('black', 'b2'),
            new Knight('black', 'e3'),
            new Rook('black', 'f2'),
            new Bishop('black', 'f5'),
            new Pawn('white', 'c3'),
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = isCheck(colour, chess)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })
})


describe('kingCheckLegalSquaresMove', () => {

    test('Only 3 legal moves', () => {

        const king = new King('white', 'b2')

        const pieces: ChessPiece[] = [
            king,
            new Queen('black', 'c4')
        ]

        const chess: ChessGame = new ChessGame(pieces)

        const legalPositions : Position[] = [
            new Position('a1'),
            new Position('a3'),
            new Position('b1'),
        ]

        const results: Position[] = findKingLegalPositions(king, chess)

        expect(results).toEqual(expect.arrayContaining(legalPositions.map(positionPropertyTest)))
        expect(results.length).toEqual(legalPositions.length)
    })

    test('Only 1 legal moves', () => {

        const king = new King('black', 'f6')

        const pieces: ChessPiece[] = [
            king,
            new Queen('white', 'g1'),
            new Bishop('white', 'h7'),
            new Knight('white', 'd8'),
            new Pawn('white', 'f5'),
            new Pawn('black', 'e5')
        ]

        const chess: ChessGame = new ChessGame(pieces)

        const legalPositions : Position[] = [
            new Position('e7'),
        ]

        const results: Position[] = findKingLegalPositions(king, chess)

        expect(results).toEqual(expect.arrayContaining(legalPositions.map(positionPropertyTest)))
        expect(results.length).toEqual(legalPositions.length)
    })


})



describe('Method - isCheckMate', () => {

    test('Not in check = no check mate', () => {

        // Define colour of king
        const colour: ColourPlayers = 'white'

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, 'f2'),
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = isCheckMate(colour, chess)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })

    test('White checkmate', () => {

        // Define colour of king
        const colour: ColourPlayers = 'white'
        const oppositeColour: ColourPlayers = 'black'

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, new Position('f2')),

            new Queen(oppositeColour, 'f3'),
            new Rook(oppositeColour, 'a1'),
            new Knight(oppositeColour, 'd4'),

        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = isCheckMate(colour, chess)
        const expected: boolean = true

        expect(result).toEqual(expected)
    })

    test('White king can run', () => {

        // Define colour of king
        const colour: ColourPlayers = 'white'
        const oppositeColour: ColourPlayers = 'black'

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, 'c2'),

            new Queen(oppositeColour, 'b2'),
            new Rook(oppositeColour, 'b1'),
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = isCheckMate(colour, chess)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })

    test('White can block checkmate with capture', () => {

        // Define colour of king
        const colour: ColourPlayers = 'white'
        const oppositeColour: ColourPlayers = 'black'

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, 'f2'),
            new Bishop(colour, 'h8'),

            new Queen(oppositeColour, 'f4'),
            new Rook(oppositeColour, 'a1'),
            new Knight(oppositeColour, 'd4'),
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = isCheckMate(colour, chess)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })


    test('White can block checkmate', () => {

        // Define colour of king
        const colour: ColourPlayers = 'white'
        const oppositeColour: ColourPlayers = 'black'

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, 'f2'),
            new Bishop(colour, 'c3'),

            new Queen(oppositeColour, 'f4'),
            new Rook(oppositeColour, 'a1'),
            new Knight(oppositeColour, 'd4'),
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = isCheckMate(colour, chess)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })

    test('Black checkmate', () => {

        // Define colour of king
        const colour: ColourPlayers = 'black'
        const oppositeColour: ColourPlayers = 'white'

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, 'b8'),

            new Pawn(oppositeColour, 'a7'),
            new Pawn(oppositeColour, 'b7'),
            new Queen(oppositeColour, 'b6'),
            new Rook(oppositeColour,'c1'),
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = isCheckMate(colour, chess)
        const expected: boolean = true

        expect(result).toEqual(expected)
    })

    test('Black king can run', () => {

        // Define colour of king
        const colour: ColourPlayers = 'black'
        const oppositeColour: ColourPlayers = 'white'

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, 'd6'),

            new Knight(oppositeColour, 'f6'),
            new Pawn(oppositeColour, 'g3'),
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = isCheckMate(colour, chess)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })


    test('Black king can run', () => {

        // Define colour of king
        const colour: ColourPlayers = 'black'
        const oppositeColour: ColourPlayers = 'white'

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, 'd6'),

            new Knight(oppositeColour, 'f6'),
            new Pawn(oppositeColour, 'g3'),
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = isCheckMate(colour, chess)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })


    test('Black can block', () => {

        // Define colour of king
        const colour: ColourPlayers = 'black'
        const oppositeColour: ColourPlayers = 'white'

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, 'a4'),
            new Rook(colour, 'f5'),

            new Queen(oppositeColour, 'a8'),
            new Rook(oppositeColour, 'b1'),
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = isCheckMate(colour, chess)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })


    test('Black can block checkmate with capture', () => {

        // Define colour of king
        const colour: ColourPlayers = 'black'
        const oppositeColour: ColourPlayers = 'white'

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, 'g8'),
            new Rook(colour, 'f8'),
            new Pawn(colour, 'f7'),
            new Pawn(colour, 'g7'),
            new Knight(colour, 'f6'),
            new Queen(oppositeColour, 'h7'),
            new Bishop(oppositeColour, 'd3'),
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = isCheckMate(colour, chess)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })




    test('Smoothered checkmate', () => {

        // Define colour of king
        const colour: ColourPlayers = 'black'
        const oppositeColour: ColourPlayers = 'white'

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, 'f8'),
            new Bishop(colour, 'e8'),
            new Pawn(colour, 'f7'),
            new Knight(colour, 'g8'),

            new Knight(oppositeColour, 'e6'),
            new Bishop(oppositeColour, 'h4'),
            new Rook(oppositeColour, 'f1'),
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = isCheckMate(colour, chess)
        const expected: boolean = true

        expect(result).toEqual(expected)
    })

})


describe('method - checkingPieces', () => {


    test('No checking pieces', () => {

        // Define colour of king
        const colour: ColourPlayers = 'black'

        // Define a king
        const king= new King(colour, 'g3')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            king
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: ChessPiece[] = findCheckingPieces(colour, chess)

        expect(result).toHaveLength(0)
    })

    
    test('One checking piece', () => {

        // Define colour of king
        const colour: ColourPlayers = 'white'

        // Define a king
        const king = new King(colour, 'g1')

        const checkingPiece = new Knight('black', 'e2')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            king,
            checkingPiece
        ]
        
        const checkingPieces = [
            checkingPiece
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: ChessPiece[] = findCheckingPieces(colour, chess)
        
        expect(result).toEqual(expect.arrayContaining(checkingPieces.map(piecePropertiesTest)))
        expect(result.length).toEqual(checkingPieces.length)
    })

    test('Two checking pieces', () => {

        // Define colour of king
        const colour: ColourPlayers = 'black'

        // Define a king
        const king = new King(colour, 'h5')

        const checkingPieceA= new Queen('white', 'h4')
        const checkingPieceB= new Bishop('white', 'f3')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            king,
            checkingPieceA,
            checkingPieceB
        ]
        
        const checkingPieces = [
            checkingPieceA,
            checkingPieceB
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: ChessPiece[] = findCheckingPieces(colour, chess)
        
        expect(result).toEqual(expect.arrayContaining(checkingPieces.map(piecePropertiesTest)))
        expect(result.length).toEqual(checkingPieces.length)
    })

    
    test('Multiple checking pieces', () => {

        // Define colour of king
        const colour: ColourPlayers = 'white'

        // Define a king
        const king = new King(colour, 'd4')

        const checkingPieceA = new Queen('black', 'd1')
        const checkingPieceB = new Rook('black', 'a4')
        const checkingPieceC = new Pawn('black', 'c5')
        const checkingPieceD = new Knight('black', 'e2')
        const checkingPieceE = new Bishop('black', 'h8')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            king,
            checkingPieceA,
            checkingPieceB,
            checkingPieceC,
            checkingPieceD,
            checkingPieceE
        ]
        
        const checkingPieces = [
            checkingPieceA,
            checkingPieceB,
            checkingPieceC,
            checkingPieceD,
            checkingPieceE
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: ChessPiece[] = findCheckingPieces(colour, chess)
        
        expect(result).toEqual(expect.arrayContaining(checkingPieces.map(piecePropertiesTest)))
        expect(result.length).toEqual(checkingPieces.length)
    })
})