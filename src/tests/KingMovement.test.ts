import { ChessBoard } from "../boards/ChessBoard";
import { King } from "../pieces/king/King";
import { Position } from "../notation/boardNotation/Position";


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