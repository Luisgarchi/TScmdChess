import { ChessBoard } from "../../boards/ChessBoard";
import { King } from "./King";
import { Position } from "../../notation/boardNotation/Position";
import { ChessPiece } from "../../chess_settings";
import { Queen } from "../queen/Queen";
import { ChessGame } from "../../ChessGame";
import { Bishop } from "../bishop/Bishop";
import { Pawn } from "../pawn/Pawn";
import { Knight } from "../knight/Knight";


describe('Method - findReachablePositions', () => {

    const serialise = function(position) {
        return position.serialise()
    }


    describe('Move freely on empty board', () => {

        test('White King', () => {

            const testPositions: string[] = [
                'c5', 'd5', 'e5', 'e4', 'e3', 'd3', 'c3', 'c4'
            ]
    
            const piece: King = new King('white', new Position('d', 4))
            const board: ChessBoard = new ChessBoard([piece])
    
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })
    
        
        test('Black White', () => {
    
            const testPositions: string[] = [
                'f8', 'f7', 'g7', 'h8', 'h7'
            ]
    
            const piece: King = new King('black', new Position('g', 8))
            const board: ChessBoard = new ChessBoard([piece])
    
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })
    })
    

    describe('Blocked', () => {

        test('White King blocked', () => {

            const testPositions: string[] = [
                'g6', 'h6', 'g8', 'h8'
            ]
    
            const piece: King = new King('white', new Position('h', 7))

            const blockingPieceA = new King('white', new Position('g', 7))
            const blockingPieceB = new King('black', new Position('h', 8))

            const board: ChessBoard = new ChessBoard([
                piece,
                blockingPieceA,
                blockingPieceB,])
    
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })


        test('White King blocked', () => {

            const testPositions: string[] = [
                'b5', 'c5','b6', 'b7', 'c7', 'd5'
            ]
    
            const piece: King = new King('black', new Position('c', 6))

            const blockingPieceA = new King('white', new Position('b', 5))
            const blockingPieceB = new King('white', new Position('c', 5))
            const blockingPieceC = new King('black', new Position('d', 6))
            const blockingPieceD = new King('black', new Position('d', 7))

            const board: ChessBoard = new ChessBoard([
                piece,
                blockingPieceA,
                blockingPieceB,
                blockingPieceC,
                blockingPieceD])
    
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })

    })


})


const positionPropertyTest = function(position: Position){
    return expect.objectContaining({rank: position.rank, file: position.file})
}

describe('kingLegalSquaresMove', () => {

    test('Only 3 legal moves', () => {

        const king = new King('white', new Position('b2'))

        const pieces: ChessPiece[] = [
            king,
            new Queen('black', new Position('c4'))
        ]

        const chess: ChessGame = new ChessGame(pieces)

        const legalPositions : Position[] = [
            new Position('a1'),
            new Position('a3'),
            new Position('b1'),
        ]

        const results: Position[] = king.legalSquaresMove(chess.board)

        expect(results).toEqual(expect.arrayContaining(legalPositions.map(positionPropertyTest)))
        expect(results.length).toEqual(legalPositions.length)
    })

    test('Only 1 legal moves', () => {

        const king = new King('black', new Position('f6'))

        const pieces: ChessPiece[] = [
            king,
            new Queen('white', new Position('g1')),
            new Bishop('white', new Position('h7')),
            new Knight('white', new Position('d8')),
            new Pawn('white', new Position('f5')),
            new Pawn('black', new Position('e5'))
        ]

        const chess: ChessGame = new ChessGame(pieces)

        const legalPositions : Position[] = [
            new Position('e7'),
        ]

        const results: Position[] = king.legalSquaresMove(chess.board)

        expect(results).toEqual(expect.arrayContaining(legalPositions.map(positionPropertyTest)))
        expect(results.length).toEqual(legalPositions.length)
    })


})