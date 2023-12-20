import { ChessBoard } from "../boards/ChessBoard";
import { Knight } from "../pieces/knight/Knight";
import { Position } from "../notation/boardNotation/Position";


describe('Method - findReachablePositions', () => {

    const serialise = function(position) {
        return position.serialise()
    }

    describe('Move freely on empty board', () => {

        test('White Knight', () => {

            const testPositions: string[] = [
                'a2', 'a4', 'b1', 'b5', 'd1', 'd5', 'e2', 'e4'
            ]
    
            const piece: Knight = new Knight('white', new Position('c', 3))
            const board: ChessBoard = new ChessBoard([piece])
    
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })
    
        
        test('Black Knight', () => {
    
            const testPositions: string[] = [
                'e4', 'e6', 'f3', 'f7', 'h7', 'h3'
            ]
    
            const piece: Knight = new Knight('black', new Position('g', 5))
            const board: ChessBoard = new ChessBoard([piece])
    
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })

    })


    describe('Blocked', () => {


        test('White Knight blocked', () => {

            const testPositions: string[] = [
                'c1', 'd4', 'g3', 'g1'
            ]
    
            const piece: Knight = new Knight('white', new Position('e', 2))

            const blockingPieceA = new Knight('white', new Position('c', 3))
            const blockingPieceB = new Knight('white', new Position('f', 4))
            const blockingPieceC = new Knight('black', new Position('d', 4))

            const board: ChessBoard = new ChessBoard([
                piece,
                blockingPieceA,
                blockingPieceB,
                blockingPieceC])
    
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })

        test('Black Knight blocked', () => {

            const testPositions: string[] = [
                'a4', 'c4', 'd7', 'a8'
            ]
    
            const piece: Knight = new Knight('black', new Position('b', 6))

            const blockingPieceA = new Knight('black', new Position('c', 8))
            const blockingPieceB = new Knight('black', new Position('d', 5))
            const blockingPieceC = new Knight('white', new Position('c', 4))
            const blockingPieceD = new Knight('white', new Position('a', 4))

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