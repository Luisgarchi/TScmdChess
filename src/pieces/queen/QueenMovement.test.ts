import { ChessBoard } from "../../board/ChessBoard";
import { Queen } from "./Queen";
import { Position } from "../../notation/boardNotation/Position";


describe('Method - findReachablePositions', () => {

    const serialise = function(position) {
        return position.serialise()
    }

    describe('Move freely on empty board', () => {

        test('White Queen', () => {

            const testPositions: string[] = [
                'a8', 'b7', 'c6', 'e4', 'f3', 'g2', 'h1',
                'd8', 'd7', 'd6', 'd4', 'd3', 'd2', 'd1',
                'g8', 'f7', 'e6', 'c4', 'b3', 'a2',
                'a5', 'b5', 'c5', 'e5', 'f5', 'g5', 'h5'
            ]
        
            const piece: Queen = new Queen('white', new Position('d', 5))
            const board: ChessBoard = new ChessBoard([piece])
        
            const returnedResults = piece.movement.findReachablePositions(piece, board)
        
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })
        
        
        test('Black Queen', () => {
        
            const testPositions: string[] = [
                'f1', 'f2', 'f3', 'f4', 'f5', 'f7', 'f8',
                'a6', 'b6', 'c6', 'd6', 'e6', 'g6', 'h6',
                'd8', 'e7', 'g5', 'h4',
                'a1', 'b2', 'c3', 'd4', 'e5', 'g7', 'h8'
            ]
        
            const piece: Queen = new Queen('black', new Position('f', 6))
            const board: ChessBoard = new ChessBoard([piece])
        
            const returnedResults = piece.movement.findReachablePositions(piece, board)
        
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })
    })

    describe('Blocked', () =>{


        test('White Queen blocked', () => {

            const testPositions: string[] = [
                'a4', 'a6', 'b5', 'b6', 'b7',
                'c2', 'c3', 'c4', 'c5', 'c7', 'c8',
                'd5', 'd6', 'd7', 'e4', 'e8'
            ]
        
            const piece: Queen = new Queen('white', new Position('c', 6))

            const blockingPieceA = new Queen('white', new Position('a', 8))
            const blockingPieceB = new Queen('white', new Position('e', 6))
            const blockingPieceC = new Queen('black', new Position('c', 2))
            const blockingPieceD = new Queen('black', new Position('e', 4))

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

        test('Black Queen blocked', () => {

            const testPositions: string[] = [
                'c2', 'c4', 'd1', 'd2', 'd3',
                'e1', 'f1', 'f2', 'f3', 
                'g2', 'g4', 'h2', 'h5'
            ]
        
            const piece: Queen = new Queen('black', new Position('e', 2))

            const blockingPieceA = new Queen('white', new Position('c', 2))
            const blockingPieceB = new Queen('black', new Position('e', 3))
            const blockingPieceC = new Queen('black', new Position('b', 5))

            const board: ChessBoard = new ChessBoard([
                piece,
                blockingPieceA,
                blockingPieceB,
                blockingPieceC])
        
            const returnedResults = piece.movement.findReachablePositions(piece, board)
        
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })
    })

})

