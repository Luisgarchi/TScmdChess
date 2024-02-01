import { ChessPiece, ColourPlayers } from "../chess_settings"
import ChessGameError from "../errors/ChessGameError"
import { Position } from "../notation/boardNotation/Position"
import { Move } from "../notation/moveNotation/Move"
import { Pawn } from "../pieces/pawn/Pawn"
import { ChessGame } from "./ChessGame"
import { isPromotion } from "./promotion"





describe('isPromotion', () => {


    test('White legal promotion', () => {
        
        // Define colour of king
        const colour: ColourPlayers = 'white'

        // Move
        const move: Move = new Move('b7b8n', colour)

        const pawn: ChessPiece = new Pawn(colour, 'b7')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            pawn
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = isPromotion(pawn, move, chess)
        const expected: boolean = true

        expect(result).toEqual(expected)
    })

    test('Black legal promotion', () => {
        
        // Define colour of king
        const colour: ColourPlayers = 'black'

        // Move
        const move: Move = new Move('e2e1q', colour)

        const pawn: ChessPiece = new Pawn(colour, new Position('e2'))

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            pawn
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = isPromotion(pawn, move, chess)
        const expected: boolean = true

        expect(result).toEqual(expected)
    })


    test('White illegal promotion (no promotional piece specified)', () => {
        
        // Define colour of king
        const colour: ColourPlayers = 'white'

        // Move
        const move: Move = new Move('b7b8', colour)

        const pawn: ChessPiece = new Pawn(colour, 'b7')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            pawn
        ]
        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        expect(() => isPromotion(pawn, move, chess)).toThrow(ChessGameError)
    })

    test('Black illegal promotion (no promotional piece specified)', () => {
        
        // Define colour of king
        const colour: ColourPlayers = 'black'

        // Move
        const move: Move = new Move('e2e1', colour)

        const pawn: ChessPiece = new Pawn(colour, 'e2')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            pawn
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        expect(() => isPromotion(pawn, move, chess)).toThrow(ChessGameError)
    })
})