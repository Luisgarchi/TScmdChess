import { ChessBoard } from "./ChessBoard";
import { Bishop } from "../pieces/bishop/Bishop";
import { ChessPiece } from "../chess_settings";
import { Position } from "../notation/boardNotation/Position";
import ChessBoardError from "../errors/ChessBoardError";




describe('Method - getPiece', () => {

    test('Find a piece', () => {

        const testPosition: Position = new Position('c', 4)

        const piece: ChessPiece = new Bishop('white', testPosition)

        const board: ChessBoard = new ChessBoard([piece])

        const foundPiece : ChessPiece = board.getPiece(testPosition)

        expect(foundPiece === piece).toBe(true)
    })

    test('Cant find a piece', () => {

        const testPosition: Position = new Position('c', 4)

        const board: ChessBoard = new ChessBoard()

        expect(() => board.getPiece(testPosition)).toThrow(ChessBoardError)
    })

})


describe('Method - movePiece', () => {


    test('Move a piece on the board',() => {

        const startPosition: Position = new Position('c', 4)

        const endPosition: Position = new Position('g', 5)

        const piece: ChessPiece = new Bishop('white', startPosition)

        const board: ChessBoard = new ChessBoard([piece])

        board.movePiece(piece, endPosition)

        expect(Position.compare(piece.position, endPosition)).toBe(true)
    })


    test('Can not move to end position if another piece is there',() => {

        const startPosition: Position = new Position('c', 4)
        const endPosition: Position = new Position('g', 5)

        const piece: ChessPiece = new Bishop('white', startPosition)

        const blockingPiece: ChessPiece = new Bishop('white', endPosition)
        
        const board: ChessBoard = new ChessBoard([piece, blockingPiece])
        expect(() => board.movePiece(piece, endPosition)).toThrow(ChessBoardError)
    })

})


describe('Method - capturePiece', () => {


    test('Capture a piece at position',() => {

        const startPosition: Position = new Position('c', 4)

        const piece: ChessPiece = new Bishop('white', startPosition)

        const board: ChessBoard = new ChessBoard([piece])

        board.removePiece(piece)

        expect(board.pieces.length == 0).toBe(true)
        expect(board.capturedPieces[0] === piece).toBe(true)
    })


    test('Can not capture',() => {

        const startPosition: Position = new Position('c', 4)
        const wrongPosition: Position = new Position('f', 2)

        const piece: ChessPiece = new Bishop('white', startPosition)
        const wrongPiece: ChessPiece = new Bishop('white', wrongPosition)

        const board: ChessBoard = new ChessBoard([piece])

        expect(() => board.removePiece(wrongPiece)).toThrow(ChessBoardError)
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