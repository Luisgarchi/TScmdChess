import { ChessBoard } from "../boards/ChessBoard";
import { ChessPiece } from "../chess_settings";
import { Pawn } from "../pieces/Pawn";
import { Bishop } from "../pieces/Bishop";
import { Knight } from "../pieces/Knight";
import { Position } from "./Position";
import { Rook } from "../pieces/Rook";
import { Queen } from "../pieces/Queen";
import { King } from "../pieces/King";
import { MoveVector } from "./MoveVector";



const vectorPropertiesTest = function(vector) {
    return expect.objectContaining({
        rankComponent: vector.rankComponent,
        fileComponent: vector.fileComponent,
        restricted: vector.restricted,
        activated: vector.activated
    })
}


describe('Pawn Movement Mechanics', () => {

    test('White Pawn is not on start rank and can not capture', () => {

        const testResults: MoveVector[] = [
            new MoveVector(1, 0, 1),
            new MoveVector(1, 1, 1, false),
            new MoveVector(1, -1, 1, false),
        ]

        const piece: ChessPiece = new Pawn('white', new Position('a', 5))
        const board: ChessBoard = new ChessBoard([piece])
        
        piece.movement.initializeVectorMechanics(piece, board)
        const returnedResults = piece.movement.moveMechanics.map((vectorMechanics) => vectorMechanics[0])

        expect(returnedResults).toEqual(expect.arrayContaining(testResults.map(vectorPropertiesTest)))
    })

    test('Black Pawn is not on start rank and can not capture', () => {

        const testResults: MoveVector[] = [
            new MoveVector(-1, 0, 1),
            new MoveVector(-1, 1, 1, false),
            new MoveVector(-1, -1, 1, false),
        ]

        const piece: ChessPiece = new Pawn('black', new Position('g', 2))
        const board: ChessBoard = new ChessBoard([piece])
        
        piece.movement.initializeVectorMechanics(piece, board)
        const returnedResults = piece.movement.moveMechanics.map((vectorMechanics) => vectorMechanics[0])

        expect(returnedResults).toEqual(expect.arrayContaining(testResults.map(vectorPropertiesTest)))
    })


    test('White Pawn is on start rank and can not capture', () => {

        const testResults: MoveVector[] = [
            new MoveVector(1, 0, 2),
            new MoveVector(1, 1, 1, false),
            new MoveVector(1, -1, 1, false),
        ]

        const piece: ChessPiece = new Pawn('white', new Position('f', 2))
        const board: ChessBoard = new ChessBoard([piece])
        
        piece.movement.initializeVectorMechanics(piece, board)
        const returnedResults = piece.movement.moveMechanics.map((vectorMechanics) => vectorMechanics[0])

        expect(returnedResults).toEqual(expect.arrayContaining(testResults.map(vectorPropertiesTest)))
    })


    test('Black Pawn is on start rank and can not capture', () => {

        const testResults: MoveVector[] = [
            new MoveVector(-1, 0, 2),
            new MoveVector(-1, 1, 1, false),
            new MoveVector(-1, -1, 1, false),
        ]

        const piece: ChessPiece = new Pawn('black', new Position('e', 7))
        const board: ChessBoard = new ChessBoard([piece])
        
        piece.movement.initializeVectorMechanics(piece, board)
        const returnedResults = piece.movement.moveMechanics.map((vectorMechanics) => vectorMechanics[0])

        expect(returnedResults).toEqual(expect.arrayContaining(testResults.map(vectorPropertiesTest)))
    })


    test('White Pawn can capture', () => {

        const testResults: MoveVector[] = [
            new MoveVector(1, 0, 2),
            new MoveVector(1, 1, 1, true),
            new MoveVector(1, -1, 1, false),
        ]

        const piece: ChessPiece = new Pawn('white', new Position('e', 2))

        const enemyPieceA = new Pawn('black', new Position('f', 3))

        const board: ChessBoard = new ChessBoard([piece, enemyPieceA])
        
        piece.movement.initializeVectorMechanics(piece, board)
        const returnedResults = piece.movement.moveMechanics.map((vectorMechanics) => vectorMechanics[0])

        expect(returnedResults).toEqual(expect.arrayContaining(testResults.map(vectorPropertiesTest)))
    })

    test('Black Pawn can capture', () => {

        const testResults: MoveVector[] = [
            new MoveVector(-1, 0, 2),
            new MoveVector(-1, 1, 1, false),
            new MoveVector(-1, -1, 1, true),
        ]

        const piece: ChessPiece = new Pawn('black', new Position('h', 7))

        const enemyPieceA = new Pawn('white', new Position('g', 6))

        const board: ChessBoard = new ChessBoard([piece, enemyPieceA])
        
        piece.movement.initializeVectorMechanics(piece, board)
        const returnedResults = piece.movement.moveMechanics.map((vectorMechanics) => vectorMechanics[0])

        expect(returnedResults).toEqual(expect.arrayContaining(testResults.map(vectorPropertiesTest)))
    })


    test('White Pawn can capture twice', () => {

        const testResults: MoveVector[] = [
            new MoveVector(1, 0, 1),
            new MoveVector(1, 1, 1, true),
            new MoveVector(1, -1, 1, true),
        ]

        const piece: ChessPiece = new Pawn('white', new Position('c', 4))

        const enemyPieceA = new Pawn('black', new Position('b', 5))
        const enemyPieceB = new Pawn('black', new Position('d', 5))

        const board: ChessBoard = new ChessBoard([piece, enemyPieceA, enemyPieceB])
        
        piece.movement.initializeVectorMechanics(piece, board)
        const returnedResults = piece.movement.moveMechanics.map((vectorMechanics) => vectorMechanics[0])

        expect(returnedResults).toEqual(expect.arrayContaining(testResults.map(vectorPropertiesTest)))
    })


    test('Black Pawn can capture twice', () => {

        const testResults: MoveVector[] = [
            new MoveVector(-1, 0, 1),
            new MoveVector(-1, 1, 1, true),
            new MoveVector(-1, -1, 1, true),
        ]

        const piece: ChessPiece = new Pawn('black', new Position('d', 5))

        const enemyPieceA = new Pawn('white', new Position('c', 4))
        const enemyPieceB = new Pawn('white', new Position('e', 4))

        const board: ChessBoard = new ChessBoard([piece, enemyPieceA, enemyPieceB])
        
        piece.movement.initializeVectorMechanics(piece, board)
        const returnedResults = piece.movement.moveMechanics.map((vectorMechanics) => vectorMechanics[0])

        expect(returnedResults).toEqual(expect.arrayContaining(testResults.map(vectorPropertiesTest)))
    })


    test('White Pawn cannot capture white piece', () => {

        const testResults: MoveVector[] = [
            new MoveVector(1, 0, 1),
            new MoveVector(1, 1, 1, false),
            new MoveVector(1, -1, 1, false),
        ]

        const piece: ChessPiece = new Pawn('white', new Position('c', 3))

        const enemyPieceA = new Pawn('white', new Position('b', 4))
        const enemyPieceB = new Pawn('white', new Position('d', 4))

        const board: ChessBoard = new ChessBoard([piece, enemyPieceA, enemyPieceB])
        
        piece.movement.initializeVectorMechanics(piece, board)
        const returnedResults = piece.movement.moveMechanics.map((vectorMechanics) => vectorMechanics[0])

        expect(returnedResults).toEqual(expect.arrayContaining(testResults.map(vectorPropertiesTest)))
    })


    test('Black Pawn cannot capture black piece', () => {

        const testResults: MoveVector[] = [
            new MoveVector(-1, 0, 2),
            new MoveVector(-1, 1, 1, false),
            new MoveVector(-1, -1, 1, false),
        ]

        const piece: ChessPiece = new Pawn('black', new Position('b', 7))

        const enemyPieceA = new Pawn('black', new Position('a', 6))
        const enemyPieceB = new Pawn('black', new Position('c', 6))

        const board: ChessBoard = new ChessBoard([piece, enemyPieceA, enemyPieceB])
        
        piece.movement.initializeVectorMechanics(piece, board)
        const returnedResults = piece.movement.moveMechanics.map((vectorMechanics) => vectorMechanics[0])

        expect(returnedResults).toEqual(expect.arrayContaining(testResults.map(vectorPropertiesTest)))
    })
    

})



describe('Method - findReachablePositions',() => {

    
    test('White Pawn, start rank no capture', () => {

        const testPositions: string[] = [
            'b3', 'b4'
        ]

        const piece: ChessPiece = new Pawn('white', new Position('b', 2))
        const board: ChessBoard = new ChessBoard([piece])

        const returnedResults = piece.movement.findReachablePositions(piece, board)

        expect(returnedResults).toEqual(expect.arrayContaining(testPositions))
        expect(returnedResults.length).toEqual(testPositions.length)
    })

    test('White Pawn, capture', () => {

        const testPositions: string[] = [
            'b3', 'b4', 'c3', 'a3'
        ]

        const piece: ChessPiece = new Pawn('white', new Position('b', 2))
        const enemyPieceA = new Pawn('black', new Position('c', 3))
        const enemyPieceB = new Pawn('black', new Position('a', 3))
        const board: ChessBoard = new ChessBoard([piece, enemyPieceA, enemyPieceB])

        const returnedResults = piece.movement.findReachablePositions(piece, board)

        expect(returnedResults).toEqual(expect.arrayContaining(testPositions))
        expect(returnedResults.length).toEqual(testPositions.length)
    })


    test('Black Pawn, start rank no capture', () => {

        const testPositions: string[] = [
            'g6', 'g5'
        ]

        const piece: ChessPiece = new Pawn('black', new Position('g', 7))
        const board: ChessBoard = new ChessBoard([piece])

        const returnedResults = piece.movement.findReachablePositions(piece, board)

        expect(returnedResults).toEqual(expect.arrayContaining(testPositions))
        expect(returnedResults.length).toEqual(testPositions.length)
    })

    test('Black Pawn, capture', () => {

        const testPositions: string[] = [
            'f3', 'e3', 'g3'
        ]

        const piece: ChessPiece = new Pawn('black', new Position('f', 4))
        const enemyPieceA = new Pawn('white', new Position('e', 3))
        const enemyPieceB = new Pawn('white', new Position('g', 3))
        const board: ChessBoard = new ChessBoard([piece, enemyPieceA, enemyPieceB])

        const returnedResults = piece.movement.findReachablePositions(piece, board)

        expect(returnedResults).toEqual(expect.arrayContaining(testPositions))
        expect(returnedResults.length).toEqual(testPositions.length)
    })

    test('White Bishop', () => {

        const testPositions: string[] = [
            'a2', 'b3', 'd5', 'e6', 'f7', 'g8',
            'f1', 'e2', 'd3', 'b5', 'a6'
        ]

        const piece: ChessPiece = new Bishop('white', new Position('c', 4))
        const board: ChessBoard = new ChessBoard([piece])

        const returnedResults = piece.movement.findReachablePositions(piece, board)

        expect(returnedResults).toEqual(expect.arrayContaining(testPositions))
        expect(returnedResults.length).toEqual(testPositions.length)
    })

    
    test('Black Bishop', () => {

        const testPositions: string[] = [
            'd8', 'f8', 'a3', 'b4', 'c5', 'd6',
            'f6', 'g5', 'h4'
        ]

        const piece: ChessPiece = new Bishop('black', new Position('e', 7))
        const board: ChessBoard = new ChessBoard([piece])

        const returnedResults = piece.movement.findReachablePositions(piece, board)

        expect(returnedResults).toEqual(expect.arrayContaining(testPositions))
        expect(returnedResults.length).toEqual(testPositions.length)
    })

    test('White Knight', () => {

        const testPositions: string[] = [
            'a2', 'a4', 'b1', 'b5', 'd1', 'd5', 'e2', 'e4'
        ]

        const piece: ChessPiece = new Knight('white', new Position('c', 3))
        const board: ChessBoard = new ChessBoard([piece])

        const returnedResults = piece.movement.findReachablePositions(piece, board)

        expect(returnedResults).toEqual(expect.arrayContaining(testPositions))
        expect(returnedResults.length).toEqual(testPositions.length)
    })

    
    test('Black Knight', () => {

        const testPositions: string[] = [
            'e4', 'e6', 'f3', 'f7', 'h7', 'h3'
        ]

        const piece: ChessPiece = new Knight('black', new Position('g', 5))
        const board: ChessBoard = new ChessBoard([piece])

        const returnedResults = piece.movement.findReachablePositions(piece, board)

        expect(returnedResults).toEqual(expect.arrayContaining(testPositions))
        expect(returnedResults.length).toEqual(testPositions.length)
    })

    test('White Rook', () => {

        const testPositions: string[] = [
            'f1', 'f2', 'f3', 'f4', 'f5', 'f7', 'f8',
            'a6', 'b6', 'c6', 'd6', 'e6', 'g6', 'h6'
        ]

        const piece: ChessPiece = new Rook('white', new Position('f', 6))
        const board: ChessBoard = new ChessBoard([piece])

        const returnedResults = piece.movement.findReachablePositions(piece, board)

        expect(returnedResults).toEqual(expect.arrayContaining(testPositions))
        expect(returnedResults.length).toEqual(testPositions.length)
    })

    
    test('Black Rook', () => {

        const testPositions: string[] = [
            'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8',
            'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'
        ]

        const piece: ChessPiece = new Rook('black', new Position('a', 1))
        const board: ChessBoard = new ChessBoard([piece])

        const returnedResults = piece.movement.findReachablePositions(piece, board)

        expect(returnedResults).toEqual(expect.arrayContaining(testPositions))
        expect(returnedResults.length).toEqual(testPositions.length)
    })

    test('White Queen', () => {

        const testPositions: string[] = [
            'a8', 'b7', 'c6', 'e4', 'f3', 'g2', 'h1',
            'd8', 'd7', 'd6', 'd4', 'd3', 'd2', 'd1',
            'g8', 'f7', 'e6', 'c4', 'b3', 'a2',
            'a5', 'b5', 'c5', 'e5', 'f5', 'g5', 'h5'
        ]

        const piece: ChessPiece = new Queen('white', new Position('d', 5))
        const board: ChessBoard = new ChessBoard([piece])

        const returnedResults = piece.movement.findReachablePositions(piece, board)

        expect(returnedResults).toEqual(expect.arrayContaining(testPositions))
        expect(returnedResults.length).toEqual(testPositions.length)
    })

    
    test('Black Queen', () => {

        const testPositions: string[] = [
            'f1', 'f2', 'f3', 'f4', 'f5', 'f7', 'f8',
            'a6', 'b6', 'c6', 'd6', 'e6', 'g6', 'h6',
            'd8', 'e7', 'g5', 'h4',
            'a1', 'b2', 'c3', 'd4', 'e5', 'g7', 'h8'
        ]

        const piece: ChessPiece = new Queen('black', new Position('f', 6))
        const board: ChessBoard = new ChessBoard([piece])

        const returnedResults = piece.movement.findReachablePositions(piece, board)

        expect(returnedResults).toEqual(expect.arrayContaining(testPositions))
        expect(returnedResults.length).toEqual(testPositions.length)
    })

    test('White King', () => {

        const testPositions: string[] = [
            'c5', 'd5', 'e5', 'e4', 'e3', 'd3', 'c3', 'c4'
        ]

        const piece: ChessPiece = new King('white', new Position('d', 4))
        const board: ChessBoard = new ChessBoard([piece])

        const returnedResults = piece.movement.findReachablePositions(piece, board)

        expect(returnedResults).toEqual(expect.arrayContaining(testPositions))
        expect(returnedResults.length).toEqual(testPositions.length)
    })

    
    test('Black White', () => {

        const testPositions: string[] = [
            'f8', 'f7', 'g7', 'h8', 'h7'
        ]

        const piece: ChessPiece = new King('black', new Position('g', 8))
        const board: ChessBoard = new ChessBoard([piece])

        const returnedResults = piece.movement.findReachablePositions(piece, board)

        expect(returnedResults).toEqual(expect.arrayContaining(testPositions))
        expect(returnedResults.length).toEqual(testPositions.length)
    })


})