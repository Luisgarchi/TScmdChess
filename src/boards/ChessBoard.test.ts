import { ChessBoard } from "./ChessBoard";
import { Bishop } from "../pieces/bishop/Bishop";
import { ChessPiece } from "../chess_settings";
import { Position } from "../notation/boardNotation/Position";
import ChessBoardError from "../errors/ChessBoardError";




describe('Method - pieceAt', () => {

    test('Find a piece', () => {

        const testPosition: Position = new Position('c', 4)

        const piece: ChessPiece = new Bishop('white', testPosition)

        const board: ChessBoard = new ChessBoard([piece])

        const foundPiece : ChessPiece = board.pieceAt(testPosition)

        expect(foundPiece === piece).toBe(true)
    })

    test('Cant find a piece', () => {

        const testPosition: Position = new Position('c', 4)

        const board: ChessBoard = new ChessBoard()

        const foundPiece : ChessPiece = board.pieceAt(testPosition)

        expect(foundPiece === undefined).toBe(true)
    })

})


describe('Method - movePiece', () => {


    test('Move a piece on the board',() => {

        const startPosition: Position = new Position('c', 4)

        const endPosition: Position = new Position('g', 5)

        const piece: ChessPiece = new Bishop('white', startPosition)

        const board: ChessBoard = new ChessBoard([piece])

        board.movePiece(startPosition, endPosition)

        expect(Position.compare(piece.position, endPosition)).toBe(true)
    })


    test('No piece at starting position',() => {

        const startPosition: Position = new Position('c', 4)
        const wrongPosition: Position = new Position('e', 8)

        const endPosition: Position = new Position('g', 5)

        const piece: ChessPiece = new Bishop('white', wrongPosition)

        const board: ChessBoard = new ChessBoard([piece])
        expect(() => board.movePiece(startPosition, endPosition)).toThrow(ChessBoardError)
    })


    test('Can not move to end position if another piece is there',() => {

        const startPosition: Position = new Position('c', 4)
        const endPosition: Position = new Position('g', 5)

        const piece: ChessPiece = new Bishop('white', startPosition)

        const blockingPiece: ChessPiece = new Bishop('white', endPosition)
        
        const board: ChessBoard = new ChessBoard([piece, blockingPiece])
        expect(() => board.movePiece(startPosition, endPosition)).toThrow(ChessBoardError)
    })

})


describe('Method - capturePiece', () => {


    test('Capture a piece at position',() => {

        const startPosition: Position = new Position('c', 4)

        const piece: ChessPiece = new Bishop('white', startPosition)

        const board: ChessBoard = new ChessBoard([piece])

        board.capturePiece(startPosition)

        expect(board.pieces.length == 0).toBe(true)
        expect(board.capturedPieces[0] === piece).toBe(true)
    })


    test('Can not capture',() => {

        const startPosition: Position = new Position('c', 4)
        const wrongPosition: Position = new Position('f', 2)

        const piece: ChessPiece = new Bishop('white', startPosition)

        const board: ChessBoard = new ChessBoard([piece])

        expect(() => board.capturePiece(wrongPosition)).toThrow(ChessBoardError)
    })

})


/*
describe('Display', () => {

    const piece: ChessPiece = new Bishop('white', new Position('d', 4))

    const board: ChessBoard = new ChessBoard([piece])
    board.buildBoard()
    board.display()
    expect(true).toBe(true)

})
*/