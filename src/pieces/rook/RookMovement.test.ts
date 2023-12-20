import { ChessBoard } from "../../boards/ChessBoard";
import { Rook } from "./Rook";
import { Position } from "../../notation/boardNotation/Position";



describe('Method - findReachablePositions', () => {

    const serialise = function(position) {
        return position.serialise()
    }

    describe('Move freely on empty board', () => {


        test('White Rook', () => {

            const testPositions: string[] = [
                'f1', 'f2', 'f3', 'f4', 'f5', 'f7', 'f8',
                'a6', 'b6', 'c6', 'd6', 'e6', 'g6', 'h6'
            ]
    
            const piece: Rook = new Rook('white', new Position('f', 6))
            const board: ChessBoard = new ChessBoard([piece])
    
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })
    
        
        test('Black Rook', () => {
    
            const testPositions: string[] = [
                'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8',
                'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'
            ]
    
            const piece: Rook = new Rook('black', new Position('a', 1))
            const board: ChessBoard = new ChessBoard([piece])
    
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })

    })

    describe('Blocked', () => {


        test('White Rook blocked', () => {
    
            const testPositions: string[] = [
                'a4', 'b4', 'c4', 'e4', 'f4', 'g4', 'h4', 'd5', 'd6', 'd7'
            ]
    
            const piece: Rook = new Rook('white', new Position('d', 4))

            const blockingPieceA = new Rook('white', new Position('d', 3))
            const blockingPieceB = new Rook('black', new Position('a', 4))
            const blockingPieceC = new Rook('black', new Position('d', 7))

            const board: ChessBoard = new ChessBoard([
                piece,
                blockingPieceA,
                blockingPieceB,
                blockingPieceC])
    
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })

        test('Black Rook blocked', () => {
    
            const testPositions: string[] = [
                'f8', 'h8', 'g7', 'g6', 'g5'
            ]
    
            const piece: Rook = new Rook('black', new Position('g', 8))

            const blockingPieceA = new Rook('white', new Position('g', 5))
            const blockingPieceB = new Rook('black', new Position('e', 8))

            const board: ChessBoard = new ChessBoard([
                piece,
                blockingPieceA,
                blockingPieceB])
    
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })

    })


})
