import { Position } from "../notation/boardNotation/Position"
import { ColourPlayers } from "../chess_settings"
import { ChessGame } from "./ChessGame"
import { ChessPiece } from "../chess_settings"
import { Pawn } from "../pieces/pawn/Pawn"
import { King } from "../pieces/king/King"

import { isEnpassant } from "./enpassant"


describe('Method - legalEnpassant', () => {

    test('Not pawn move - no en passant ', () => {
        
        // Define colour of king
        const colour: ColourPlayers = 'white'
        const differentColour: ColourPlayers = 'black'

        const notAPawn: ChessPiece = new King(colour, 'd5')
        const endPosition: Position = new Position('e6')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(differentColour,'d8'),
            new Pawn(differentColour, 'e7'),

            notAPawn
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Make a random move
        const randomMove: string = 'd8c8'
        chess.makeMove(randomMove, differentColour)

        // Test

        const result: boolean = isEnpassant(notAPawn, endPosition, chess)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })

    test('Not on adequate rank', () => {
        
        // Define colour of king
        const colour: ColourPlayers = 'white'
        const differentColour: ColourPlayers = 'black'

        const myPawn: ChessPiece = new Pawn(colour, 'd4')
        const endPosition: Position = new Position('e6')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(differentColour, 'd8'),
            new Pawn(differentColour, 'e7'),

            myPawn
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Make a random move
        const randomMove: string = 'd8c8'
        chess.makeMove(randomMove, differentColour)

        // Test
        const result: boolean = isEnpassant(myPawn, endPosition, chess)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })


    test('Wrong UCI input for end position', () => {
        
        // Define colour of king
        const colour: ColourPlayers = 'black'
        const differentColour: ColourPlayers = 'white'

        const myPawn: ChessPiece = new Pawn(colour, 'd4')
        const endPosition: Position = new Position('e2')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(differentColour, 'd1'),
            new Pawn(differentColour, 'e2'),

            myPawn
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Make a random move
        const randomMove: string = 'd1c1'
        chess.makeMove(randomMove, differentColour)

        // Test
        const result: boolean = isEnpassant(myPawn, endPosition, chess)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })

    test('No enemy pawn for enpassant', () => {
        
        // Define colour of king
        const colour: ColourPlayers = 'black'
        const differentColour: ColourPlayers = 'white'

        const myPawn: ChessPiece = new Pawn(colour, 'd4')
        const endPosition: Position = new Position('c3')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(differentColour, 'd1'),
            new Pawn(differentColour, 'e2'),

            myPawn
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Make a random move
        const randomMove: string = 'd1c1'
        chess.makeMove(randomMove, differentColour)

        // Test
        const result: boolean = isEnpassant(myPawn, endPosition, chess)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })



    test('Random previous move No en passant for white', () => {
        
        // Define colour of king
        const colour: ColourPlayers = 'white'
        const differentColour: ColourPlayers = 'black'

        const pawnEnpassant: ChessPiece = new Pawn(colour, 'd5')
        const endPosition: Position = new Position('e6')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(differentColour, 'd8'),
            new Pawn(differentColour, 'e7'),

            pawnEnpassant
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Make a random move
        const randomMove: string = 'd8c8'
        chess.makeMove(randomMove, differentColour)

        // Test
        const enpassantMove: string = 'd5e6'

        const result: boolean = isEnpassant(pawnEnpassant, endPosition, chess)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })

    test('Random previous move - No en passant for black', () => {
        
        // Define colour of king
        const colour: ColourPlayers = 'black'
        const differentColour: ColourPlayers = 'white'

        const pawnEnpassant: ChessPiece = new Pawn(colour, 'd4')
        const endPosition: Position = new Position('e3')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(differentColour, 'c1'),
            new Pawn(differentColour, 'e2'),

            pawnEnpassant
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Make a random move
        const randomMove: string = 'c1c2'
        chess.makeMove(randomMove, differentColour)

        // Test
        const enpassantMove: string = 'd4e3'

        const result: boolean = isEnpassant(pawnEnpassant, endPosition, chess)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })

    test('Correct pieces + random previous move - No en passant for white', () => {
        
        // Define colour of king
        const colour: ColourPlayers = 'white'
        const differentColour: ColourPlayers = 'black'

        const pawnEnpassant: ChessPiece = new Pawn(colour, 'd5')
        const endPosition: Position = new Position('e6')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(differentColour, 'a8'),
            new Pawn(differentColour, 'e5'),

            pawnEnpassant
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Make a random move
        const randomMove: string = 'a8b7'
        chess.makeMove(randomMove, differentColour)

        // Test
        const enpassantMove: string = 'd5d6'

        const result: boolean = isEnpassant(pawnEnpassant, endPosition, chess)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })

    test('Correct pieces - successful en passant for white', () => {
        
        // Define colour of king
        const colour: ColourPlayers = 'white'
        const differentColour: ColourPlayers = 'black'

        const pawnEnpassant: ChessPiece = new Pawn(colour, 'd5')
        const endPosition: Position = new Position('e6')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(differentColour, 'a8'),
            new Pawn(differentColour, 'e7'),

            pawnEnpassant
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Make a random move
        const enpassantPreconditionMove: string = 'e7e5'
        chess.makeMove(enpassantPreconditionMove, differentColour)

        // Test
        const enpassantMove: string = 'd5d6'

        const result: boolean = isEnpassant(pawnEnpassant, endPosition, chess)
        const expected: boolean = true

        expect(result).toEqual(expected)
    })


    test('Correct pieces + random previous move - No en passant for black', () => {
        
        // Define colour of king
        const colour: ColourPlayers = 'black'
        const differentColour: ColourPlayers = 'white'

        const pawnEnpassant: ChessPiece = new Pawn(colour, 'g4')
        const endPosition: Position = new Position('h3')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(differentColour, 'c5'),
            new Pawn(differentColour, 'h2'),

            pawnEnpassant
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Make a random move
        const randomMove: string = 'c5c4'
        chess.makeMove(randomMove, differentColour)

        // Test
        const enpassantMove: string = 'g4h3'

        const result: boolean = isEnpassant(pawnEnpassant, endPosition, chess)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })

    test('Correct pieces - successful en passant for black', () => {
        
        // Define colour of king
        const colour: ColourPlayers = 'black'
        const differentColour: ColourPlayers = 'white'

        const pawnEnpassant: ChessPiece = new Pawn(colour, 'g4')
        const endPosition: Position = new Position('h3')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(differentColour, 'c5'),
            new Pawn(differentColour, 'h2'),

            pawnEnpassant
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Make a random move
        const enpassantPreconditionMove: string = 'h2h4'
        chess.makeMove(enpassantPreconditionMove, differentColour)

        // Test
        const enpassantMove: string = 'g4h3'

        const result: boolean = isEnpassant(pawnEnpassant, endPosition, chess)
        const expected: boolean = true

        expect(result).toEqual(expected)
    })

    test('Can en passant with two different pawns (black)', () => {
        
        // Define colour of king
        const colour: ColourPlayers = 'black'
        const differentColour: ColourPlayers = 'white'

        const pawnEnpassant_A: ChessPiece = new Pawn(colour, 'h4')
        const pawnEnpassant_B: ChessPiece = new Pawn(colour, 'f4')

        const endPosition: Position = new Position('g3')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(differentColour, 'c5'),
            new Pawn(differentColour, 'g2'),

            pawnEnpassant_A, pawnEnpassant_B
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Make a random move
        const enpassantPreconditionMove: string = 'g2g4'
        chess.makeMove(enpassantPreconditionMove, differentColour)

        // Test A
        const enpassantMove_A: string = 'h4g3'

        const result_A: boolean = isEnpassant(pawnEnpassant_A, endPosition, chess)
        const expected_A: boolean = true

        expect(result_A).toEqual(expected_A)

        // Test B
        const enpassantMove_B: string = 'f4g3'

        const result_B: boolean = isEnpassant(pawnEnpassant_B, endPosition, chess)
        const expected_B: boolean = true

        expect(result_B).toEqual(expected_B)
    })

})