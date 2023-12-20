import { ChessBoard } from "../boards/ChessBoard";
import { Bishop } from "../pieces/bishop/Bishop";
import { Position } from "../notation/boardNotation/Position";



describe('Method - findReachablePositions', () => {

    const serialise = function(position) {
        return position.serialise()
    }

    describe('Move freely on empty board', () => {
        
        
        test('White Bishop', () => {

            const testPositions: string[] = [
                'a2', 'b3', 'd5', 'e6', 'f7', 'g8',
                'f1', 'e2', 'd3', 'b5', 'a6'
            ]

            const piece: Bishop = new Bishop('white', new Position('c', 4))
            const board: ChessBoard = new ChessBoard([piece])

            const returnedResults = piece.movement.findReachablePositions(piece, board)

            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })

        
        test('Black Bishop', () => {

            const testPositions: string[] = [
                'd8', 'f8', 'a3', 'b4', 'c5', 'd6',
                'f6', 'g5', 'h4'
            ]

            const piece: Bishop = new Bishop('black', new Position('e', 7))
            const board: ChessBoard = new ChessBoard([piece])

            const returnedResults = piece.movement.findReachablePositions(piece, board)

            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })
    })

    describe('Blocked', () => {

        
        test('White Bishop blocked', () => {

            const testPositions: string[] = [
                'c5', 'b6', 'a7', 'e3', 'e5', 'f6'
            ]

            const piece: Bishop = new Bishop('white', new Position('d', 4))

            const blockingPieceA = new Bishop('white', new Position('c', 3))
            const blockingPieceB = new Bishop('white', new Position('f', 2))
            const blockingPieceC = new Bishop('white', new Position('g', 7))

            const board: ChessBoard = new ChessBoard([
                piece, 
                blockingPieceA,
                blockingPieceB, 
                blockingPieceC])

            const returnedResults = piece.movement.findReachablePositions(piece, board)

            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })

        test('Black Bishop blocked', () => {

            const testPositions: string[] = [
                'b1', 'c2', 'd3', 'f3', 'd5', 'f5'
            ]

            const piece: Bishop = new Bishop('black', new Position('e', 4))

            const blockingPieceA = new Bishop('white', new Position('b', 1))
            const blockingPieceB = new Bishop('white', new Position('f', 3))
            const blockingPieceC = new Bishop('black', new Position('c', 6))
            const blockingPieceD = new Bishop('black', new Position('g', 6))

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