import { ChessBoard } from "../../board/ChessBoard";
import { Pawn } from "./Pawn";
import { Position } from "../../notation/boardNotation/Position";
import { MoveVector } from "../../notation/boardNotation/MoveVector";



/*
describe('Pawn Movement Mechanics', () => {


    const vectorPropertiesTest = function(vector) {
        return expect.objectContaining({
            rankComponent: vector.rankComponent,
            fileComponent: vector.fileComponent,
            restricted: vector.restricted,
            activated: vector.activated
        })
    }


    test('White Pawn is not on start rank and can not capture', () => {

        const testResults: MoveVector[] = [
            new MoveVector(1, 0, 1),
            new MoveVector(1, 1, 1, false),
            new MoveVector(1, -1, 1, false),
        ]

        const piece: Pawn = new Pawn('white', new Position('a', 5))
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

        const piece: Pawn = new Pawn('black', new Position('g', 2))
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

        const piece: Pawn = new Pawn('white', new Position('f', 2))
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

        const piece: Pawn = new Pawn('black', new Position('e', 7))
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

        const piece: Pawn = new Pawn('white', new Position('e', 2))

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

        const piece: Pawn = new Pawn('black', new Position('h', 7))

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

        const piece: Pawn = new Pawn('white', new Position('c', 4))

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

        const piece: Pawn = new Pawn('black', new Position('d', 5))

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

        const piece: Pawn = new Pawn('white', new Position('c', 3))

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

        const piece: Pawn = new Pawn('black', new Position('b', 7))

        const enemyPieceA = new Pawn('black', new Position('a', 6))
        const enemyPieceB = new Pawn('black', new Position('c', 6))

        const board: ChessBoard = new ChessBoard([piece, enemyPieceA, enemyPieceB])
        
        piece.movement.initializeVectorMechanics(piece, board)
        const returnedResults = piece.movement.moveMechanics.map((vectorMechanics) => vectorMechanics[0])

        expect(returnedResults).toEqual(expect.arrayContaining(testResults.map(vectorPropertiesTest)))
    })

})
*/


describe('Method - findReachablePositions', () => {


    const serialise = function(position) {
        return position.serialise()
    }
    

    describe('Move freely on empty board',  () => {

        test('White Pawn, start rank no capture', () => {

            const testPositions: string[] = [
                'b3', 'b4'
            ]

            const piece: Pawn = new Pawn('white', new Position('b', 2))
            const board: ChessBoard = new ChessBoard([piece])

            const returnedResults = piece.movement.findReachablePositions(piece, board)

            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })
        
        test('Black Pawn, start rank no capture', () => {

            const testPositions: string[] = [
                'g6', 'g5'
            ]
    
            const piece: Pawn = new Pawn('black', new Position('g', 7))
            const board: ChessBoard = new ChessBoard([piece])
    
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })
    })



    describe('Pawn Caputre', () => {

        test('White Pawn, capture', () => {

            const testPositions: string[] = [
                'b3', 'b4', 'c3', 'a3'
            ]
    
            const piece: Pawn = new Pawn('white', new Position('b', 2))
            
            const enemyPieceA = new Pawn('black', new Position('c', 3))
            const enemyPieceB = new Pawn('black', new Position('a', 3))
            const board: ChessBoard = new ChessBoard([piece, enemyPieceA, enemyPieceB])
    
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })
    
    
        test('Black Pawn, capture', () => {
    
            const testPositions: string[] = [
                'f3', 'e3', 'g3'
            ]
    
            const piece: Pawn = new Pawn('black', new Position('f', 4))
            const enemyPieceA = new Pawn('white', new Position('e', 3))
            const enemyPieceB = new Pawn('white', new Position('g', 3))
            const board: ChessBoard = new ChessBoard([piece, enemyPieceA, enemyPieceB])
    
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })
    })

    describe('Blocked along file', () => {
        

        test('White Pawn, blocked same colour piece, not on starting rank', () => {
            
            // expect no positions
            const testPositions: string[] = []
            
            // Piece
            const piece: Pawn = new Pawn('white', new Position('f', 4))

            // Blocking piece
            const blockingPiece = new Pawn('white', new Position('f', 5))

            // Board configuration
            const board: ChessBoard = new ChessBoard([piece, blockingPiece])
            
            // tests
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })

        test('Black Pawn, blocked same colour piece, not on starting rank', () => {
            
            // expect no positions
            const testPositions: string[] = []
            
            // Piece
            const piece: Pawn = new Pawn('black', new Position('f', 4))

            // Blocking piece
            const blockingPiece = new Pawn('black', new Position('f', 3))

            // Board configuration
            const board: ChessBoard = new ChessBoard([piece, blockingPiece])
            
            // tests
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })


        test('White Pawn, blocked different colour piece, not on starting rank', () => {
            
            // expect no positions
            const testPositions: string[] = []
            
            // Piece
            const piece: Pawn = new Pawn('white', new Position('f', 4))

            // Blocking piece
            const blockingPiece = new Pawn('black', new Position('f', 5))

            // Board configuration
            const board: ChessBoard = new ChessBoard([piece, blockingPiece])
            
            // tests
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })


        test('Black Pawn, blocked different colour piece, not on starting rank', () => {
            
            // expect no positions
            const testPositions: string[] = []
            
            // Piece
            const piece: Pawn = new Pawn('black', new Position('g', 4))

            // Blocking piece
            const blockingPiece = new Pawn('white', new Position('g', 3))

            // Board configuration
            const board: ChessBoard = new ChessBoard([piece, blockingPiece])
            
            // tests
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })


        test('White Pawn, blocked same colour piece, on starting rank', () => {
            
            // expect no positions
            const testPositions: string[] = []
            
            // Piece
            const piece: Pawn = new Pawn('white', new Position('a', 2))

            // Blocking piece
            const blockingPiece = new Pawn('white', new Position('a', 3))

            // Board configuration
            const board: ChessBoard = new ChessBoard([piece, blockingPiece])
            
            // tests
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })


        test('Black Pawn, blocked same colour piece, on starting rank', () => {
            
            // expect no positions
            const testPositions: string[] = []
            
            // Piece
            const piece: Pawn = new Pawn('black', new Position('c', 7))

            // Blocking piece
            const blockingPiece = new Pawn('black', new Position('c', 6))

            // Board configuration
            const board: ChessBoard = new ChessBoard([piece, blockingPiece])
            
            // tests
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })


        test('White Pawn, blocked different colour piece, on starting rank', () => {
            
            // expect no positions
            const testPositions: string[] = []
            
            // Piece
            const piece: Pawn = new Pawn('white', new Position('a', 2))

            // Blocking piece
            const blockingPiece = new Pawn('black', new Position('a', 3))

            // Board configuration
            const board: ChessBoard = new ChessBoard([piece, blockingPiece])
            
            // tests
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })

        test('black Pawn, blocked different colour piece, on starting rank', () => {
            
            // expect no positions
            const testPositions: string[] = []
            
            // Piece
            const piece: Pawn = new Pawn('black', new Position('e', 7))

            // Blocking piece
            const blockingPiece = new Pawn('white', new Position('e', 6))

            // Board configuration
            const board: ChessBoard = new ChessBoard([piece, blockingPiece])
            
            // tests
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })

        test('White Pawn, blocked same colour piece, 2nd square, on starting rank', () => {
            
            // expect no positions
            const testPositions: string[] = [
                'a3'
            ]
            
            // Piece
            const piece: Pawn = new Pawn('white', new Position('a', 2))

            // Blocking piece
            const blockingPiece = new Pawn('white', new Position('a', 4))

            // Board configuration
            const board: ChessBoard = new ChessBoard([piece, blockingPiece])
            
            // tests
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })

        test('Black Pawn, blocked same colour piece, 2nd square, on starting rank', () => {
            
            // expect no positions
            const testPositions: string[] = [
                'h6'
            ]
            
            // Piece
            const piece: Pawn = new Pawn('black', new Position('h', 7))

            // Blocking piece
            const blockingPiece = new Pawn('black', new Position('h', 5))

            // Board configuration
            const board: ChessBoard = new ChessBoard([piece, blockingPiece])
            
            // tests
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })

        test('White Pawn, blocked different colour piece, 2nd square, on starting rank', () => {
            
            // expect no positions
            const testPositions: string[] = [
                'a3'
            ]
            
            // Piece
            const piece: Pawn = new Pawn('white', new Position('a', 2))

            // Blocking piece
            const blockingPiece = new Pawn('black', new Position('a', 4))

            // Board configuration
            const board: ChessBoard = new ChessBoard([piece, blockingPiece])
            
            // tests
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })

        test('Black Pawn, blocked different colour piece, 2nd square, on starting rank', () => {
            
            // expect no positions
            const testPositions: string[] = [
                'h6'
            ]
            
            // Piece
            const piece: Pawn = new Pawn('black', new Position('h', 7))

            // Blocking piece
            const blockingPiece = new Pawn('white', new Position('h', 5))

            // Board configuration
            const board: ChessBoard = new ChessBoard([piece, blockingPiece])
            
            // tests
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })
    })



    describe('Blocked along file but can capture', () => {


        test('White Pawn, blocked but can capture 2nd square, on starting rank', () => {
            
            // expect no positions
            const testPositions: string[] = [
                'a3',
                'b3'
            ]
            
            // Piece
            const piece: Pawn = new Pawn('white', new Position('b', 2))

            // Blocking piece
            const blockingPiece = new Pawn('black', new Position('b', 4))

            // Captured piece
            const capturedPiece = new Pawn('black', new Position('a', 3))

            // Board configuration
            const board: ChessBoard = new ChessBoard([piece, blockingPiece, capturedPiece])
            
            // tests
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })


        test('Black Pawn, blocked but can capture 2nd square, not on starting rank', () => {
            
            // expect no positions
            const testPositions: string[] = [
                'e4',
                'g4'
            ]
            
            // Piece
            const piece: Pawn = new Pawn('black', new Position('f', 5))

            // Blocking piece
            const blockingPiece = new Pawn('black', new Position('f', 4))

            // Captured piece
            const capturedPiece1 = new Pawn('white', new Position('e', 4))
            const capturedPiece2 = new Pawn('white', new Position('g', 4))

            // Board configuration
            const board: ChessBoard = new ChessBoard([piece, blockingPiece, capturedPiece1, capturedPiece2])
            
            // tests
            const returnedResults = piece.movement.findReachablePositions(piece, board)
    
            expect(returnedResults.map(serialise)).toEqual(expect.arrayContaining(testPositions))
            expect(returnedResults.length).toEqual(testPositions.length)
        })

    })


})