import { ChessGame } from "./ChessGame"
import { ChessPiece, ColourPlayers } from "../chess_settings"
import ChessGameError from "../errors/ChessGameError"
import UCIError from "../errors/UCIError"
import { Position } from "../notation/boardNotation/Position"
import { Bishop } from "../pieces/bishop/Bishop"
import { King } from "../pieces/king/King"
import { Knight } from "../pieces/knight/Knight"
import { Pawn } from "../pieces/pawn/Pawn"
import { Queen } from "../pieces/queen/Queen"
import { Rook } from "../pieces/rook/Rook"




const piecePropertiesTest = function(piece: ChessPiece) {
    return expect.objectContaining({
        position: expect.objectContaining({rank: piece.position.rank, file: piece.position.file}), 
        colour : piece.colour, 
        type: piece.type})
} 


const positionPropertyTest = function(position: Position){
    return expect.objectContaining({rank: position.rank, file: position.file})
}


describe('kingCheckLegalSquaresMove', () => {

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

        const results: Position[] = chess.kingCheckLegalSquaresMove(king)

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

        const results: Position[] = chess.kingCheckLegalSquaresMove(king)

        expect(results).toEqual(expect.arrayContaining(legalPositions.map(positionPropertyTest)))
        expect(results.length).toEqual(legalPositions.length)
    })


})


describe('legalCastles', () => {

    describe('Basic castling criteria', () => {

        test('King is moving piece (false)',() => {

            // Define colour to move
            const colour: ColourPlayers = 'white'

            // Define piece to move and end position
            const pieceToMove: ChessPiece = new Pawn(colour, new Position('e2'))

            const endPosition: Position = new Position('e3')

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King(colour, new Position('e1')),
                pieceToMove
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            const result: boolean = chess.legalCastles(pieceToMove, endPosition)
            const expected: boolean = false

            expect(result).toEqual(expected)
        })

        describe('Not in starting square', () => {

            test('King is not in starting square',() => {

                // Define colour to move
                const colour: ColourPlayers = 'black'

                // Define king and rook
                const king: ChessPiece = new King(colour, new Position('e5'))
                const rook: ChessPiece = new Rook(colour, new Position('h8'))

                const endPosition: Position = new Position('g8')

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    king,
                    rook
                ]

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                const result: boolean = chess.legalCastles(king, endPosition)
                const expected: boolean = false

                expect(result).toEqual(expected)
            })

            test('Rook is not in starting square',() => {

                // Define colour to move
                const colour: ColourPlayers = 'white'

                // Define king and rook
                const king: ChessPiece = new King(colour, new Position('e1'))
                const rook: ChessPiece = new Rook(colour, new Position('a2'))

                const endPosition: Position = new Position('c3')

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    king,
                    rook
                ]

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                const result: boolean = chess.legalCastles(king, endPosition)
                const expected: boolean = false

                expect(result).toEqual(expected)
            })
        })

        describe('In start square has moved', () => {

            test(`King is in starting square but has moved - 1 
            (King starts on original square)'`,() => {

                // Define colour to move
                const colour: ColourPlayers = 'white'

                // Define king and rook
                const king: ChessPiece = new King(colour, new Position('e1'))
                const rook: ChessPiece = new Rook(colour, new Position('h1'))

                const endPosition: Position = new Position('g1')

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    king,
                    rook
                ]

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Move king to initial square
                const move: string = 'e1e2'
                chess.makeMove(move, colour)
                const undoMove: string = 'e2e1'
                chess.makeMove(undoMove, colour)

                // Test
                const result: boolean = chess.legalCastles(king, endPosition)
                const expected: boolean = false

                expect(result).toEqual(expected)
            })

            test(`King is in starting square but has moved - 2 
                    (King does not start on original square)'`,() => {

                // Define colour to move
                const colour: ColourPlayers = 'black'

                // Define king and rook
                const king: ChessPiece = new King(colour, new Position('e7'))
                const rook: ChessPiece = new Rook(colour, new Position('a8'))

                const endPosition: Position = new Position('c8')

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    king,
                    rook
                ]

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Move king to initial square
                const move: string = 'e7e8'
                chess.makeMove(move, colour)

                // Test
                const result: boolean = chess.legalCastles(king, endPosition)
                const expected: boolean = false

                expect(result).toEqual(expected)
            })

            test(`Rook is in starting square but has moved - 1 
            (Rook starts on original square)'`,() => {

                // Define colour to move
                const colour: ColourPlayers = 'black'

                // Define king and rook
                const king: ChessPiece = new King(colour, new Position('e8'))
                const rook: ChessPiece = new Rook(colour, new Position('a8'))

                const endPosition: Position = new Position('c8')

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    king,
                    rook
                ]

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Move king to initial square
                const move: string = 'a8d8'
                chess.makeMove(move, colour)
                const undoMove: string = 'd8a8'
                chess.makeMove(undoMove, colour)

                // Test
                const result: boolean = chess.legalCastles(king, endPosition)
                const expected: boolean = false

                expect(result).toEqual(expected)
            })

            test(`Rook is in starting square but has moved - 2 
            (Rook does not start on original square)'`,() => {

                // Define colour to move
                const colour: ColourPlayers = 'white'

                // Define king and rook
                const king: ChessPiece = new King(colour, new Position('e1'))
                const rook: ChessPiece = new Rook(colour, new Position('h8'))

                const endPosition: Position = new Position('c8')

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    king,
                    rook
                ]

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Move king to initial square
                const move: string = 'h8h1'
                chess.makeMove(move, colour)

                // Test
                const result: boolean = chess.legalCastles(king, endPosition)
                const expected: boolean = false

                expect(result).toEqual(expected)
            })

        })

    })

    describe('Castling squares controlled by opponent', () => {
        
        test('White queenside controlled by oppoenent', () => {
            
            // Define colour to move
            const colour: ColourPlayers = 'white'
            const differentColour: ColourPlayers = 'black' 

            // Define pieces
            const king: ChessPiece = new King(colour, new Position('e1'))
            const rook: ChessPiece = new Rook(colour, new Position('a1'))

            const enemy: ChessPiece = new Bishop(differentColour, new Position('f5'))

            // King moves to end position
            const endPosition: Position = new Position('c1')

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                king,
                rook,
                enemy
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            const result: boolean = chess.legalCastles(king, endPosition)
            const expected: boolean = false

            expect(result).toEqual(expected)
        })

        test('White kingside controlled by oppoenent', () => {
            
            // Define colour to move
            const colour: ColourPlayers = 'white'
            const differentColour: ColourPlayers = 'black' 

            // Define pieces
            const king: ChessPiece = new King(colour, new Position('e1'))
            const rook: ChessPiece = new Rook(colour, new Position('h1'))

            const enemy: ChessPiece = new Knight(differentColour, new Position('e3'))

            // King moves to end position
            const endPosition: Position = new Position('g1')

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                king,
                rook,
                enemy
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            const result: boolean = chess.legalCastles(king, endPosition)
            const expected: boolean = false

            expect(result).toEqual(expected)
        })

        test('Black kingside controlled by oppoenent', () => {
            
            // Define colour to move
            const colour: ColourPlayers = 'black'
            const differentColour: ColourPlayers = 'white' 

            // Define pieces
            const king: ChessPiece = new King(colour, new Position('e8'))
            const rook: ChessPiece = new Rook(colour, new Position('h8'))

            const enemy: ChessPiece = new Queen(differentColour, new Position('g5'))

            // King moves to end position
            const endPosition: Position = new Position('g8')

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                king,
                rook,
                enemy
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            const result: boolean = chess.legalCastles(king, endPosition)
            const expected: boolean = false

            expect(result).toEqual(expected)
        })

        test('Black queenside controlled by oppoenent', () => {
            
            // Define colour to move
            const colour: ColourPlayers = 'black'
            const differentColour: ColourPlayers = 'white' 

            // Define pieces
            const king: ChessPiece = new King(colour, new Position('e8'))
            const rook: ChessPiece = new Rook(colour, new Position('a8'))

            const enemy: ChessPiece = new Queen(differentColour, new Position('c3'))

            // King moves to end position
            const endPosition: Position = new Position('c8')

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                king,
                rook,
                enemy
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            const result: boolean = chess.legalCastles(king, endPosition)
            const expected: boolean = false

            expect(result).toEqual(expected)
        })

    })

    describe('Castling in check', () => {

        test('King can not castle during check', () => {

            // Define colour to move
            const colour: ColourPlayers = 'black'
            const differentColour: ColourPlayers = 'white' 

            // Define pieces
            const king: ChessPiece = new King(colour, new Position('e8'))
            const rook: ChessPiece = new Rook(colour, new Position('h8'))

            const enemy: ChessPiece = new Rook(differentColour, new Position('e2'))

            // King moves to end position
            const endPosition: Position = new Position('g8')

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                king,
                rook,
                enemy
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            const result: boolean = chess.legalCastles(king, endPosition)
            const expected: boolean = false

            expect(result).toEqual(expected)
        })
    })


    describe('Castling no other pieces', () => {

        test('Simple castle kingside black',() => {

            // Define colour to move
            const colour: ColourPlayers = 'black'

            // Define king and rook
            const king: ChessPiece = new King(colour, new Position('e8'))
            const rook: ChessPiece = new Rook(colour, new Position('h8'))

            const endPosition: Position = new Position('g8')

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                king,
                rook
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            const result: boolean = chess.legalCastles(king, endPosition)
            const expected: boolean = true

            expect(result).toEqual(expected)
        })

        test('Simple castle kingside white',() => {

            // Define colour to move
            const colour: ColourPlayers = 'white'

            // Define king and rook
            const king: ChessPiece = new King(colour, new Position('e1'))
            const rook: ChessPiece = new Rook(colour, new Position('h1'))

            const endPosition: Position = new Position('g1')

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                king,
                rook
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            const result: boolean = chess.legalCastles(king, endPosition)
            const expected: boolean = true

            expect(result).toEqual(expected)
        })

        test('Simple castle queenside black',() => {

            // Define colour to move
            const colour: ColourPlayers = 'black'

            // Define king and rook
            const king: ChessPiece = new King(colour, new Position('e8'))
            const rook: ChessPiece = new Rook(colour, new Position('a8'))

            const endPosition: Position = new Position('c8')

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                king,
                rook
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            const result: boolean = chess.legalCastles(king, endPosition)
            const expected: boolean = true

            expect(result).toEqual(expected)
        })

        test('Simple castle kingside white',() => {

            // Define colour to move
            const colour: ColourPlayers = 'white'

            // Define king and rook
            const king: ChessPiece = new King(colour, new Position('e1'))
            const rook: ChessPiece = new Rook(colour, new Position('a1'))

            const endPosition: Position = new Position('c1')

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                king,
                rook
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            const result: boolean = chess.legalCastles(king, endPosition)
            const expected: boolean = true

            expect(result).toEqual(expected)
        })

    })

    describe('Castling blocked by piece same colour', () => {

        test('Castle blocked kingside black',() => {

            // Define colour to move
            const colour: ColourPlayers = 'black'
            
            // Define king and rook
            const king: ChessPiece = new King(colour, new Position('e8'))
            const rook: ChessPiece = new Rook(colour, new Position('h8'))
            const blockingPiece: ChessPiece = new Bishop(colour, new Position('f8'))

            const endPosition: Position = new Position('g8')

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                king,
                rook,
                blockingPiece
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            const result: boolean = chess.legalCastles(king, endPosition)
            const expected: boolean = false

            expect(result).toEqual(expected)
        })

        test('Castle blocked kingside white',() => {

            // Define colour to move
            const colour: ColourPlayers = 'white'

            // Define king and rook
            const king: ChessPiece = new King(colour, new Position('e1'))
            const rook: ChessPiece = new Rook(colour, new Position('h1'))
            const blockingPiece: ChessPiece = new Knight(colour, new Position('g1'))

            const endPosition: Position = new Position('g1')

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                king,
                rook,
                blockingPiece
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            const result: boolean = chess.legalCastles(king, endPosition)
            const expected: boolean = false

            expect(result).toEqual(expected)
        })

        test('Castle blocked queenside black',() => {

            // Define colour to move
            const colour: ColourPlayers = 'black'

            // Define king and rook
            const king: ChessPiece = new King(colour, new Position('e8'))
            const rook: ChessPiece = new Rook(colour, new Position('a8'))
            const blockingPiece: ChessPiece = new Queen(colour, new Position('d8'))

            const endPosition: Position = new Position('c8')

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                king,
                rook,
                blockingPiece
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            const result: boolean = chess.legalCastles(king, endPosition)
            const expected: boolean = false

            expect(result).toEqual(expected)
        })

        test('Castle blocked kingside white',() => {

            // Define colour to move
            const colour: ColourPlayers = 'white'

            // Define king and rook
            const king: ChessPiece = new King(colour, new Position('e1'))
            const rook: ChessPiece = new Rook(colour, new Position('a1'))
            const blockingPiece: ChessPiece = new Bishop(colour, new Position('c1'))

            const endPosition: Position = new Position('c1')

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                king,
                rook,
                blockingPiece
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            const result: boolean = chess.legalCastles(king, endPosition)
            const expected: boolean = false

            expect(result).toEqual(expected)
        })

    })

    describe('Castling blocked by piece different colour', () => {

        test('Castle blocked kingside black',() => {

            // Define colour to move
            const colour: ColourPlayers = 'black'
            const differentColour: ColourPlayers = 'white'

            // Define king and rook
            const king: ChessPiece = new King(colour, new Position('e8'))
            const rook: ChessPiece = new Rook(colour, new Position('h8'))
            const blockingPiece: ChessPiece = new Bishop(differentColour, new Position('f8'))

            const endPosition: Position = new Position('g8')

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                king,
                rook,
                blockingPiece
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            const result: boolean = chess.legalCastles(king, endPosition)
            const expected: boolean = false

            expect(result).toEqual(expected)
        })

        test('Castle blocked kingside white',() => {

            // Define colour to move
            const colour: ColourPlayers = 'white'
            const differentColour: ColourPlayers = 'white'

            // Define king and rook
            const king: ChessPiece = new King(colour, new Position('e1'))
            const rook: ChessPiece = new Rook(colour, new Position('h1'))
            const blockingPiece: ChessPiece = new Knight(differentColour, new Position('g1'))

            const endPosition: Position = new Position('g1')

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                king,
                rook,
                blockingPiece
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            const result: boolean = chess.legalCastles(king, endPosition)
            const expected: boolean = false

            expect(result).toEqual(expected)
        })

        test('Castle blocked queenside black',() => {

            // Define colour to move
            const colour: ColourPlayers = 'black'
            const differentColour: ColourPlayers = 'white'

            // Define king and rook
            const king: ChessPiece = new King(colour, new Position('e8'))
            const rook: ChessPiece = new Rook(colour, new Position('a8'))
            const blockingPiece: ChessPiece = new Knight(differentColour, new Position('d8'))

            const endPosition: Position = new Position('c8')

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                king,
                rook,
                blockingPiece
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            const result: boolean = chess.legalCastles(king, endPosition)
            const expected: boolean = false

            expect(result).toEqual(expected)
        })

        test('Castle blocked kingside white',() => {

            // Define colour to move
            const colour: ColourPlayers = 'white'
            const differentColour: ColourPlayers = 'white'

            // Define king and rook
            const king: ChessPiece = new King(colour, new Position('e1'))
            const rook: ChessPiece = new Rook(colour, new Position('a1'))
            const blockingPiece: ChessPiece = new Bishop(differentColour, new Position('c1'))

            const endPosition: Position = new Position('c1')

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                king,
                rook,
                blockingPiece
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            const result: boolean = chess.legalCastles(king, endPosition)
            const expected: boolean = false

            expect(result).toEqual(expected)
        })

    })


})



describe('Method - isCheck', () => {

    test('Simple check', () => {

        // Define colour of king
        const colour: ColourPlayers = 'white'

        // Define a king
        const kingInCheck = new King(colour, new Position('c1'))

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            kingInCheck,
            new Rook('black', new Position('c8'))

        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = chess.isCheck(colour)
        const expected: boolean = true

        expect(result).toEqual(expected)
    })

    test('Double check', () => {

        // Define colour of king
        const colour: ColourPlayers = 'black'

        // Define a king
        const kingInCheck = new King(colour, new Position('d8'))

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            kingInCheck,
            new Rook('white', new Position('d3')),
            new Bishop('white', new Position('f6'))

        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = chess.isCheck(colour)
        const expected: boolean = true

        expect(result).toEqual(expected)
    })

    
    test('Not in check simple', () => {

        // Define colour of king
        const colour: ColourPlayers = 'black'

        // Define a king
        const kingInCheck = new King(colour, new Position('g3'))

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            kingInCheck
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = chess.isCheck(colour)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })


    test('Not in check', () => {

        // Define colour of king
        const colour: ColourPlayers = 'white'

        // Define a king
        const kingInCheck = new King(colour, new Position('c1'))

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            kingInCheck,
            new Rook('black', new Position('c6')),
            new Rook('black', new Position('d8')),
            new Queen('black', new Position('a4')),
            new Bishop('black', new Position('a3')),
            new Knight('black', new Position('b2')),
            new Knight('black', new Position('e3')),
            new Rook('black', new Position('f2')),
            new Bishop('black', new Position('f5')),
            new Pawn('white', new Position('c3')),
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = chess.isCheck(colour)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })
})

describe('Method - isCheckMate', () => {

    test('Not in check = no check mate', () => {

        // Define colour of king
        const colour: ColourPlayers = 'white'

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, new Position('f2')),
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = chess.isCheckMate(colour)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })

    test('White checkmate', () => {

        // Define colour of king
        const colour: ColourPlayers = 'white'
        const oppositeColour: ColourPlayers = 'black'

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, new Position('f2')),

            new Queen(oppositeColour, new Position('f3')),
            new Rook(oppositeColour, new Position('a1')),
            new Knight(oppositeColour, new Position('d4')),

        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = chess.isCheckMate(colour)
        const expected: boolean = true

        expect(result).toEqual(expected)
    })

    test('White king can run', () => {

        // Define colour of king
        const colour: ColourPlayers = 'white'
        const oppositeColour: ColourPlayers = 'black'

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, new Position('c2')),

            new Queen(oppositeColour, new Position('b2')),
            new Rook(oppositeColour, new Position('b1')),
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = chess.isCheckMate(colour)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })

    test('White can block checkmate with capture', () => {

        // Define colour of king
        const colour: ColourPlayers = 'white'
        const oppositeColour: ColourPlayers = 'black'

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, new Position('f2')),
            new Bishop(colour, new Position('h8')),

            new Queen(oppositeColour, new Position('f4')),
            new Rook(oppositeColour, new Position('a1')),
            new Knight(oppositeColour, new Position('d4')),
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = chess.isCheckMate(colour)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })


    test('White can block checkmate', () => {

        // Define colour of king
        const colour: ColourPlayers = 'white'
        const oppositeColour: ColourPlayers = 'black'

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, new Position('f2')),
            new Bishop(colour, new Position('c3')),

            new Queen(oppositeColour, new Position('f4')),
            new Rook(oppositeColour, new Position('a1')),
            new Knight(oppositeColour, new Position('d4')),
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = chess.isCheckMate(colour)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })

    test('Black checkmate', () => {

        // Define colour of king
        const colour: ColourPlayers = 'black'
        const oppositeColour: ColourPlayers = 'white'

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, new Position('b8')),

            new Pawn(oppositeColour, new Position('a7')),
            new Pawn(oppositeColour, new Position('b7')),
            new Queen(oppositeColour, new Position('b6')),
            new Rook(oppositeColour, new Position('c1')),
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = chess.isCheckMate(colour)
        const expected: boolean = true

        expect(result).toEqual(expected)
    })

    test('Black king can run', () => {

        // Define colour of king
        const colour: ColourPlayers = 'black'
        const oppositeColour: ColourPlayers = 'white'

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, new Position('d6')),

            new Knight(oppositeColour, new Position('f6')),
            new Pawn(oppositeColour, new Position('g3')),
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = chess.isCheckMate(colour)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })


    test('Black king can run', () => {

        // Define colour of king
        const colour: ColourPlayers = 'black'
        const oppositeColour: ColourPlayers = 'white'

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, new Position('d6')),

            new Knight(oppositeColour, new Position('f6')),
            new Pawn(oppositeColour, new Position('g3')),
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = chess.isCheckMate(colour)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })


    test('Black can block', () => {

        // Define colour of king
        const colour: ColourPlayers = 'black'
        const oppositeColour: ColourPlayers = 'white'

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, new Position('a4')),
            new Rook(colour, new Position('f5')),

            new Queen(oppositeColour, new Position('a8')),
            new Rook(oppositeColour, new Position('b1')),
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = chess.isCheckMate(colour)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })


    test('Black can block checkmate with capture', () => {

        // Define colour of king
        const colour: ColourPlayers = 'black'
        const oppositeColour: ColourPlayers = 'white'

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, new Position('g8')),
            new Rook(colour, new Position('f8')),
            new Pawn(colour, new Position('f7')),
            new Pawn(colour, new Position('g7')),
            new Knight(colour, new Position('f6')),
            new Queen(oppositeColour, new Position('h7')),
            new Bishop(oppositeColour, new Position('d3')),
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = chess.isCheckMate(colour)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })




    test('Smoothered checkmate', () => {

        // Define colour of king
        const colour: ColourPlayers = 'black'
        const oppositeColour: ColourPlayers = 'white'

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, new Position('f8')),
            new Bishop(colour, new Position('e8')),
            new Pawn(colour, new Position('f7')),
            new Knight(colour, new Position('g8')),

            new Knight(oppositeColour, new Position('e6')),
            new Bishop(oppositeColour, new Position('h4')),
            new Rook(oppositeColour, new Position('f1')),
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = chess.isCheckMate(colour)
        const expected: boolean = true

        expect(result).toEqual(expected)
    })

})


describe('Method - legalPromotion', () => {


    test('White legal promotion', () => {
        
        // Define colour of king
        const colour: ColourPlayers = 'white'

        const pawn: ChessPiece = new Pawn(colour, new Position('b7'))
        const endPosition: Position = new Position('b8')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            pawn
        ]

        // Move
        const move: string = 'b7b8n'

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = chess.legalPromotion(pawn, endPosition, move)
        const expected: boolean = true

        expect(result).toEqual(expected)
    })

    test('Black legal promotion', () => {
        
        // Define colour of king
        const colour: ColourPlayers = 'black'

        const pawn: ChessPiece = new Pawn(colour, new Position('e2'))
        const endPosition: Position = new Position('e1')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            pawn
        ]

        // Move
        const move: string = 'e2e1q'

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = chess.legalPromotion(pawn, endPosition, move)
        const expected: boolean = true

        expect(result).toEqual(expected)
    })

    test('White illegal promotion (no promotional piece specified)', () => {
        
        // Define colour of king
        const colour: ColourPlayers = 'white'

        const pawn: ChessPiece = new Pawn(colour, new Position('b7'))
        const endPosition: Position = new Position('b8')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            pawn
        ]

        // Move
        const move: string = 'b7b8'

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = chess.legalPromotion(pawn, endPosition, move)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })

    test('Black illegal promotion (no promotional piece specified)', () => {
        
        // Define colour of king
        const colour: ColourPlayers = 'black'

        const pawn: ChessPiece = new Pawn(colour, new Position('e2'))
        const endPosition: Position = new Position('e1')

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            pawn
        ]

        // Move
        const move: string = 'e2e1'

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = chess.legalPromotion(pawn, endPosition, move)
        const expected: boolean = false

        expect(result).toEqual(expected)
    })
})


describe('method - checkingPieces', () => {


    test('No checking pieces', () => {

        // Define colour of king
        const colour: ColourPlayers = 'black'

        // Define a king
        const king= new King(colour, new Position('g3'))

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            king
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: ChessPiece[] = chess.checkingPieces(colour)

        expect(result).toHaveLength(0)
    })

    
    test('One checking piece', () => {

        // Define colour of king
        const colour: ColourPlayers = 'white'

        // Define a king
        const king = new King(colour, new Position('g1'))

        const checkingPiece = new Knight('black', new Position('e2'))

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            king,
            checkingPiece
        ]
        
        const checkingPieces = [
            checkingPiece
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: ChessPiece[] = chess.checkingPieces(colour)
        
        expect(result).toEqual(expect.arrayContaining(checkingPieces.map(piecePropertiesTest)))
        expect(result.length).toEqual(checkingPieces.length)
    })

    test('Two checking pieces', () => {

        // Define colour of king
        const colour: ColourPlayers = 'black'

        // Define a king
        const king = new King(colour, new Position('h5'))

        const checkingPieceA= new Queen('white', new Position('h4'))
        const checkingPieceB= new Bishop('white', new Position('f3'))

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            king,
            checkingPieceA,
            checkingPieceB
        ]
        
        const checkingPieces = [
            checkingPieceA,
            checkingPieceB
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: ChessPiece[] = chess.checkingPieces(colour)
        
        expect(result).toEqual(expect.arrayContaining(checkingPieces.map(piecePropertiesTest)))
        expect(result.length).toEqual(checkingPieces.length)
    })

    
    test('Multiple checking pieces', () => {

        // Define colour of king
        const colour: ColourPlayers = 'white'

        // Define a king
        const king = new King(colour, new Position('d4'))

        const checkingPieceA = new Queen('black', new Position('d1'))
        const checkingPieceB = new Rook('black', new Position('a4'))
        const checkingPieceC = new Pawn('black', new Position('c5'))
        const checkingPieceD = new Knight('black', new Position('e2'))
        const checkingPieceE = new Bishop('black', new Position('h8'))

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            king,
            checkingPieceA,
            checkingPieceB,
            checkingPieceC,
            checkingPieceD,
            checkingPieceE
        ]
        
        const checkingPieces = [
            checkingPieceA,
            checkingPieceB,
            checkingPieceC,
            checkingPieceD,
            checkingPieceE
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: ChessPiece[] = chess.checkingPieces(colour)
        
        expect(result).toEqual(expect.arrayContaining(checkingPieces.map(piecePropertiesTest)))
        expect(result.length).toEqual(checkingPieces.length)
    })
})




describe('Method - makeMove', () => {


    test('fail (no piece at start)', () => {
    
        // Define move and colour of player making the move
        const move: string = 'b3b4'
        const colour: ColourPlayers = 'white'

        // Init game with pieces at starting position
        const chess: ChessGame = new ChessGame()

        // Test
        expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
    })

    test('b29b4 fail bad UCI notation', () => {

        // Define move and colour of player making the move
        const move: string = 'b29b4'
        const colour: ColourPlayers = 'white'

        // Initialise normal chess board with pieces at starting position
        const chess: ChessGame = new ChessGame()

        // Test
        expect(() => chess.makeMove(move, colour)).toThrow(UCIError)
    })

    

    describe('Pawn', () => {

        describe('Normal movement', () => {


            test('White success normal - g2g3', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', new Position('g2')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'g2g3'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Pawn('white', new Position('g3')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })
        
        
            test('White success start rank - b2b4', () => {
        
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', new Position('b2')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'b2b4'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Pawn('white', new Position('b4')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

            
            test('Black success normal - a5a4', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', new Position('a5')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'a5a4'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Pawn('black', new Position('a4')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })


            test('Black success start rank - g7g5', () => {
        
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', new Position('g7')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'g7g5'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Pawn('black', new Position('g5')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })
        
        

        })

        describe('Pawn Capture', () => {


            test('White Pawn capture (right) - c4d5', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', new Position('c4')),
                    new Queen('black', new Position('d5')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'c4d5'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Pawn('white', new Position('d5')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })


            test('White Pawn capture (left) - b2a3', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', new Position('b2')),
                    new Knight('black', new Position('a3')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'b2a3'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Pawn('white', new Position('a3')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

            test('Black Pawn capture (right) - f4e3', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', new Position('f4')),
                    new Queen('white', new Position('e3')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'f4e3'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Pawn('black', new Position('e3')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })


            test('Black Pawn capture (left) - c5d4', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', new Position('c5')),
                    new Bishop('white', new Position('d4')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'c5d4'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Pawn('black', new Position('d4')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

        })

        describe('Promotion', () => {


            test('White h7h8q promotion - Queen', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', new Position('h7')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'h7h8q'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Queen('white', new Position('h8')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

            
            test('White f7f8n promotion - Knight', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', new Position('f7')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'f7f8n'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Knight('white', new Position('f8')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

            test('White c7c8b promotion - Bishop', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', new Position('c7')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'c7c8b'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Bishop('white', new Position('c8')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

            
            test('White e7e8r promotion - Rook', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', new Position('e7')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'e7e8r'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Rook('white', new Position('e8')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })


            
            test('Black c2c1 promotion - Queen', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', new Position('c2')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'c2c1q'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Queen('black', new Position('c1')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

            
            test('Black a2a1n promotion - Knight', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', new Position('a2')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'a2a1n'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Knight('black', new Position('a1')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

            test('Black g2g1b promotion - Bishop', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', new Position('g2')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'g2g1b'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Bishop('black', new Position('g1')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

            
            test('Black f2f1r promotion - Rook', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', new Position('f2')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'f2f1r'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Rook('black', new Position('f1')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

        })

        describe('Promote and capture', () => {

            test('White capture promote Queen f7e8q', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', new Position('f7')),
                    new Rook('black', new Position('e8')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'f7e8q'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Queen('white', new Position('e8')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })


            test('Black capture promote Knight c2b1n', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', new Position('c2')),
                    new Rook('white', new Position('b1')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'c2b1n'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Knight('black', new Position('b1')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

        })

        describe('Blocked', () => {


            test('Blocked white, same colour - c2c3', ()=>{

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', new Position('c2')),
                    new Knight('white', new Position('c3')),
                ]

                // Define move and colour of player making the move
                const move: string = 'c2c3'
                const colour: ColourPlayers = 'white'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)                
            })


            test('Blocked white, different colour - f4f5', ()=>{

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', new Position('f4')),
                    new Pawn('black', new Position('f5')),
                ]

                // Define move and colour of player making the move
                const move: string = 'f4f5'
                const colour: ColourPlayers = 'white'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)                
            })

            test('Blocked black, same colour - h4h3', ()=>{

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', new Position('h4')),
                    new Pawn('black', new Position('h3')),
                ]

                // Define move and colour of player making the move
                const move: string = 'h4h3'
                const colour: ColourPlayers = 'black'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)                
            })


            test('Blocked black, different colour - b6b5', ()=>{

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', new Position('b6')),
                    new Bishop('white', new Position('b5')),
                ]

                // Define move and colour of player making the move
                const move: string = 'b6b5'
                const colour: ColourPlayers = 'black'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)                
            })

            
            test('Capture blocked white - e6d7', ()=>{

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', new Position('e6')),
                    new King('white', new Position('d7')),
                ]

                // Define move and colour of player making the move
                const move: string = 'e6d7'
                const colour: ColourPlayers = 'white'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)                
            })


            test('Capture blocked black - f4e3', ()=>{

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', new Position('f4')),
                    new King('black', new Position('e3')),
                ]

                // Define move and colour of player making the move
                const move: string = 'f4e3'
                const colour: ColourPlayers = 'black'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)                
            })
        })

        describe('Illegal',() => {


            test('Wrong colour - b2b4 (white)', () => {
        
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', new Position('b2')),
                ]
                // Define move
                const move: string = 'b2b4'

                // Define WRONG colour
                const colour: ColourPlayers = 'black'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })

            test('Wrong colour - f3f2 (black)', () => {
        
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', new Position('f3')),
                ]
                // Define move
                const move: string = 'f3f2'

                // Define WRONG colour
                const colour: ColourPlayers = 'white'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })
        
        
            
            test('Illegal move white - d3d5', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', new Position('d3')),
                ]

                // Define move and colour of player making the move
                const move: string = 'd3d5'
                const colour: ColourPlayers = 'white'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })

            test('Illegal move black - h6h7', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', new Position('h6')),
                ]

                // Define move and colour of player making the move
                const move: string = 'h6h7'
                const colour: ColourPlayers = 'black'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })

        })

        describe('Enpassant', () => {

            test('Normal enpassant white', () => {

                // Define colour of king
                const colour: ColourPlayers = 'white'
                const differentColour: ColourPlayers = 'black'

                const pawnEnpassant: ChessPiece = new Pawn(colour, new Position('d5'))

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new King(differentColour, new Position('a8')),
                    new Pawn(differentColour, new Position('e7')),

                    pawnEnpassant
                ]

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Make enpassant move
                const enpassantPreconditionMove: string = 'e7e5'
                chess.makeMove(enpassantPreconditionMove, differentColour)

                // Test
                const enpassantMove: string = 'd5e6'
                chess.makeMove(enpassantMove, colour)


                // Define expected pieces after enpassant
                const piecesResult: ChessPiece[] = [
                    new King(differentColour, new Position('a8')),
                    new Pawn(colour, new Position('e6')),
                ]
                const capturedPiecesResult: ChessPiece[] = [
                    new Pawn(differentColour, new Position('e5')),
                ]

        
                // Test 
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)

                expect(chess.board.capturedPieces).toEqual(expect.arrayContaining(capturedPiecesResult.map(piecePropertiesTest)))
                expect(chess.board.capturedPieces.length).toEqual(capturedPiecesResult.length)
            })


            test('Normal enpassant black', () => {

                // Define colour of king
                const colour: ColourPlayers = 'black'
                const differentColour: ColourPlayers = 'white'

                const pawnEnpassant: ChessPiece = new Pawn(colour, new Position('h4'))

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn(differentColour, new Position('g2')),
                    pawnEnpassant
                ]

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Make enpassant move
                const enpassantPreconditionMove: string = 'g2g4'
                chess.makeMove(enpassantPreconditionMove, differentColour)

                // Test
                const enpassantMove: string = 'h4g3'
                chess.makeMove(enpassantMove, colour)


                // Define expected pieces after enpassant
                const piecesResult: ChessPiece[] = [
                    new Pawn(colour, new Position('g3')),
                ]
                const capturedPiecesResult: ChessPiece[] = [
                    new Pawn(differentColour, new Position('g4')),
                ]

        
                // Test 
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)

                expect(chess.board.capturedPieces).toEqual(expect.arrayContaining(capturedPiecesResult.map(piecePropertiesTest)))
                expect(chess.board.capturedPieces.length).toEqual(capturedPiecesResult.length)
            })

        })
    })
    

    describe('Knight', () => {

        describe('Normal movement', () => {


            test('White success normal, d4f3', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Knight('white', new Position('d4')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'd4f3'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Knight('white', new Position('f3')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })


            test('Black success normal, c6e5', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Knight('black', new Position('c6')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'c6e5'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Knight('black', new Position('e5')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })
        })

        describe('Capture', () => {
            

            test('White capture, e4f6', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Knight('white', new Position('e4')),
                    new Pawn('black', new Position('f6'))
                ]
        
                // Define move and colour of player making the move
                const move: string = 'e4f6'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Knight('white', new Position('f6')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

            test('Black capture, c2b4', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Knight('black', new Position('c2')),
                    new Knight('white', new Position('b4'))
                ]
        
                // Define move and colour of player making the move
                const move: string = 'c2b4'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Knight('black', new Position('b4')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })
        })

        describe('Blocked', () => {

            test('White blocked (same colour)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Knight('white', new Position('g7')),
                    new Rook('white', new Position('f5')),
                ]

                // Define move and colour of player making the move
                const move: string = 'g7f5'
                const colour: ColourPlayers = 'white'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)     
            })

            test('Black blocked (same colour)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Knight('black', new Position('e5')),
                    new Pawn('black', new Position('c4')),
                ]

                // Define move and colour of player making the move
                const move: string = 'e5c4'
                const colour: ColourPlayers = 'black'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)     
            })
        })

        describe('Illegal', () => {

            test('Illegal move white', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Knight('white', new Position('b4')),
                ]

                // Define move and colour of player making the move
                const move: string = 'b4f3'
                const colour: ColourPlayers = 'white'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })
            

            test('Illegal move Black', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Knight('black', new Position('g7')),
                ]

                // Define move and colour of player making the move
                const move: string = 'g7g5'
                const colour: ColourPlayers = 'black'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })

            test('Wrong Colour - c5e4 (white)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Knight('white', new Position('c5')),
                ]
                // Define move
                const move: string = 'c5e4'

                // Define WRONG colour
                const colour: ColourPlayers = 'black'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })

            test('Wrong Colour (black)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Knight('black', new Position('h4')),
                ]
                // Define move
                const move: string = 'h4f3'

                // Define WRONG colour
                const colour: ColourPlayers = 'white'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })

        })
    })



    describe('Bishop', () => {

        describe('Normal movement', () => {


            test('White success normal, c6f3', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Bishop('white', new Position('c6')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'c6f3'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Bishop('white', new Position('f3')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })


            test('Black success normal, d4g7', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Bishop('black', new Position('d4')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'd4g7'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Bishop('black', new Position('g7')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })
        })

        describe('Capture', () => {
            

            test('White capture, c8f5', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Bishop('white', new Position('c8')),
                    new Knight('black', new Position('f5'))
                ]
        
                // Define move and colour of player making the move
                const move: string = 'c8f5'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Bishop('white', new Position('f5')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

            test('Black capture, d3c4', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Bishop('black', new Position('d3')),
                    new Queen('white', new Position('c4'))
                ]
        
                // Define move and colour of player making the move
                const move: string = 'd3c4'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Bishop('black', new Position('c4')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })
        })

        describe('Blocked', () => {

            test('White blocked (same colour)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Bishop('white', new Position('c4')),
                    new Rook('white', new Position('d5')),
                ]

                // Define move and colour of player making the move
                const move: string = 'c4e6'
                const colour: ColourPlayers = 'white'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)     
            })

            test('Black blocked (same colour)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Bishop('black', new Position('g7')),
                    new Rook('black', new Position('f8')),
                ]

                // Define move and colour of player making the move
                const move: string = 'g7f8'
                const colour: ColourPlayers = 'black'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)     
            })
        })

        describe('Illegal', () => {

            test('Illegal move white', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Bishop('white', new Position('e5')),
                ]

                // Define move and colour of player making the move
                const move: string = 'e5f7'
                const colour: ColourPlayers = 'white'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })
            

            test('Illegal move Black', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Bishop('black', new Position('a3')),
                ]

                // Define move and colour of player making the move
                const move: string = 'a3a5'
                const colour: ColourPlayers = 'black'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })

            test('Wrong Colour - d7f5 (white)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Bishop('white', new Position('d7')),
                ]
                // Define move
                const move: string = 'd7f5'

                // Define WRONG colour
                const colour: ColourPlayers = 'black'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })

            test('Wrong Colour (black)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Bishop('black', new Position('h6')),
                ]
                // Define move
                const move: string = 'h6c1'

                // Define WRONG colour
                const colour: ColourPlayers = 'white'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })

        })
    })


    describe('Rook', () => {

        describe('Normal movement', () => {


            test('White success normal, a1h1', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Rook('white', new Position('a1')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'a1h1'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Rook('white', new Position('h1')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })


            test('Black success normal, d4g7', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Rook('black', new Position('d6')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'd6d3'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Rook('black', new Position('d3')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })
        })

        describe('Capture', () => {
            

            test('White capture, g2g6', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Rook('white', new Position('g2')),
                    new Rook('black', new Position('g6'))
                ]
        
                // Define move and colour of player making the move
                const move: string = 'g2g6'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Rook('white', new Position('g6')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

            test('Black capture, f7a7', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Rook('black', new Position('f7')),
                    new Pawn('white', new Position('a7'))
                ]
        
                // Define move and colour of player making the move
                const move: string = 'f7a7'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Rook('black', new Position('a7')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })
        })

        describe('Blocked', () => {

            test('White blocked (same colour)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Rook('white', new Position('b5')),
                    new Bishop('white', new Position('e5')),
                ]

                // Define move and colour of player making the move
                const move: string = 'b5f5'
                const colour: ColourPlayers = 'white'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)     
            })

            test('Black blocked (same colour)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Rook('black', new Position('e3')),
                    new Knight('black', new Position('e4')),
                ]

                // Define move and colour of player making the move
                const move: string = 'e3e6'
                const colour: ColourPlayers = 'black'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)     
            })
        })

        describe('Illegal', () => {

            test('Illegal move white', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Rook('white', new Position('b5')),
                ]

                // Define move and colour of player making the move
                const move: string = 'b5e7'
                const colour: ColourPlayers = 'white'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })
            

            test('Illegal move Black', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Rook('black', new Position('e3')),
                ]

                // Define move and colour of player making the move
                const move: string = 'e3g5'
                const colour: ColourPlayers = 'black'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })

            test('Wrong Colour - d7f5 (white)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Rook('white', new Position('d7')),
                ]
                // Define move
                const move: string = 'd7d5'

                // Define WRONG colour
                const colour: ColourPlayers = 'black'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })

            test('Wrong Colour (black)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Rook('black', new Position('a2')),
                ]
                // Define move
                const move: string = 'a2h2'

                // Define WRONG colour
                const colour: ColourPlayers = 'white'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })

        })
    })




    describe('Queen', () => {

        describe('Normal movement', () => {


            test('White success normal, g3c3', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Queen('white', new Position('g3')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'g3c3'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Queen('white', new Position('c3')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })


            test('Black success normal, e7h4', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Queen('black', new Position('e7')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'e7h4'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Queen('black', new Position('h4')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })
        })

        describe('Capture', () => {
            

            test('White capture, e4c2', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Queen('white', new Position('e4')),
                    new Pawn('black', new Position('c2'))
                ]
        
                // Define move and colour of player making the move
                const move: string = 'e4c2'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Queen('white', new Position('c2')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

            test('Black capture, f5f1', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Queen('black', new Position('f5')),
                    new Bishop('white', new Position('f1')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'f5f1'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Queen('black', new Position('f1')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })
        })

        describe('Blocked', () => {

            test('White blocked (same colour)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Queen('white', new Position('b5')),
                    new Pawn('white', new Position('c5')),
                ]

                // Define move and colour of player making the move
                const move: string = 'b5e5'
                const colour: ColourPlayers = 'white'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)     
            })

            test('Black blocked (same colour)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Queen('black', new Position('e3')),
                    new Knight('black', new Position('c6')),
                ]

                // Define move and colour of player making the move
                const move: string = 'e3b7'
                const colour: ColourPlayers = 'black'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)     
            })
        })

        describe('Illegal', () => {

            test('Illegal move white', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Queen('white', new Position('b5')),
                ]

                // Define move and colour of player making the move
                const move: string = 'b5d6'
                const colour: ColourPlayers = 'white'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })
            

            test('Illegal move Black', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Queen('black', new Position('g2')),
                ]

                // Define move and colour of player making the move
                const move: string = 'g2c7'
                const colour: ColourPlayers = 'black'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })

            test('Wrong Colour - d7f5 (white)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Queen('white', new Position('d7')),
                ]
                // Define move
                const move: string = 'd7d5'

                // Define WRONG colour
                const colour: ColourPlayers = 'black'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })

            test('Wrong Colour (black)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Queen('black', new Position('a2')),
                ]
                // Define move
                const move: string = 'a2h2'

                // Define WRONG colour
                const colour: ColourPlayers = 'white'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })
        })
    })


    describe('King', () => {

        describe('Normal movement', () => {


            test('White success normal, b1a1', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new King('white', new Position('b1')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'b1a1'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new King('white', new Position('a1')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })


            test('Black success normal, f5g6', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new King('black', new Position('f5')),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'f5g6'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new King('black', new Position('g6')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })
        })

        describe('Capture', () => {
            

            test('White capture, e4c2', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new King('white', new Position('e2')),
                    new Queen('black', new Position('e3'))
                ]
        
                // Define move and colour of player making the move
                const move: string = 'e2e3'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new King('white', new Position('e3')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

            test('Black capture, b7c6', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new King('black', new Position('b7')),
                    new Rook('white', new Position('c6'))
                ]
        
                // Define move and colour of player making the move
                const move: string = 'b7c6'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new King('black', new Position('c6')),
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })
        })

        describe('Blocked', () => {

            test('White blocked (same colour)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new King('white', new Position('d4')),
                    new Pawn('white', new Position('d5')),
                ]

                // Define move and colour of player making the move
                const move: string = 'd4d5'
                const colour: ColourPlayers = 'white'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)     
            })

            test('Black blocked (same colour)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new King('black', new Position('f6')),
                    new Knight('black', new Position('e7')),
                ]

                // Define move and colour of player making the move
                const move: string = 'f6e7'
                const colour: ColourPlayers = 'black'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)     
            })
        })

        describe('Illegal', () => {

            test('Illegal move white', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new King('white', new Position('b5')),
                ]

                // Define move and colour of player making the move
                const move: string = 'b5b7'
                const colour: ColourPlayers = 'white'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })
            

            test('Illegal move Black', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new King('black', new Position('d7')),
                ]

                // Define move and colour of player making the move
                const move: string = 'd7c5'
                const colour: ColourPlayers = 'black'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })

            test('Wrong Colour - h6g6 (white)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new King('white', new Position('h6')),
                ]
                // Define move
                const move: string = 'h6g6'

                // Define WRONG colour
                const colour: ColourPlayers = 'black'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })

            test('Wrong Colour (black)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new King('black', new Position('f3')),
                ]
                // Define move
                const move: string = 'f3f4'

                // Define WRONG colour
                const colour: ColourPlayers = 'white'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
            })
        })

        describe('Castles', () => {

            test('White castles king side', () => {

                // Define starting pieces on board

                const colour: ColourPlayers = 'white'

                const pieces: ChessPiece[] = [
                    new King(colour, new Position('e1')),
                    new Rook(colour, new Position('h1'))
                ]
        
                // Define move and colour of player making the move
                const move: string = 'e1g1'

        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new King(colour, new Position('g1')),
                    new Rook(colour, new Position('f1'))
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })


            test('White castles queen side', () => {
                // Define starting pieces on board

                const colour: ColourPlayers = 'white'

                const pieces: ChessPiece[] = [
                    new King(colour, new Position('e1')),
                    new Rook(colour, new Position('a1'))
                ]
        
                // Define move and colour of player making the move
                const move: string = 'e1c1'

        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new King(colour, new Position('c1')),
                    new Rook(colour, new Position('d1'))
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })


            
            test('Black castles king side', () => {
                // Define starting pieces on board

                const colour: ColourPlayers = 'black'

                const pieces: ChessPiece[] = [
                    new King(colour, new Position('e8')),
                    new Rook(colour, new Position('h8'))
                ]
        
                // Define move and colour of player making the move
                const move: string = 'e8g8'

        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new King(colour, new Position('g8')),
                    new Rook(colour, new Position('f8'))
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

            
            test('Black castles queen side', () => {
                // Define starting pieces on board

                const colour: ColourPlayers = 'black'

                const pieces: ChessPiece[] = [
                    new King(colour, new Position('e8')),
                    new Rook(colour, new Position('a8'))
                ]
        
                // Define move and colour of player making the move
                const move: string = 'e8c8'

        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new King(colour, new Position('c8')),
                    new Rook(colour, new Position('d8'))
                ]
        
                // Make move
                chess.makeMove(move, colour)
                
                // Test
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })
        })
    })

})