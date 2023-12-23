import { ChessGame } from "./ChessGame"
import { ChessPiece, ColourPlayers } from "./chess_settings"
import ChessGameError from "./errors/ChessGameError"
import UCIError from "./errors/UCIError"
import { Position } from "./notation/boardNotation/Position"
import { Bishop } from "./pieces/bishop/Bishop"
import { Knight } from "./pieces/knight/Knight"
import { Pawn } from "./pieces/pawn/Pawn"
import { Queen } from "./pieces/queen/Queen"
import { Rook } from "./pieces/rook/Rook"



const piecePropertiesTest = function(piece: ChessPiece) {
    return expect.objectContaining({
        position: expect.objectContaining({rank: piece.position.rank, file: piece.position.file}), 
        colour : piece.colour, 
        type: piece.type})
} 



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

    


    describe('Pawn movement', () => {


        test('g2g3 success', () => {

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
    
    
    
        test('b2b4 success', () => {
    
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
    
        
    
        test('wrong colour fail - b2b4 black', () => {
    
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
    
        
        test('b2b5 fail (illegal move)', () => {
            
            // Define move and colour of player making the move
            const move: string = 'b2b5'
            const colour: ColourPlayers = 'white'
            
            // Init game with pieces at starting position
            const chess: ChessGame = new ChessGame()
            
            // Test
            expect(() => chess.makeMove(move, colour)).toThrow(ChessGameError)
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

    describe('Knight move', () => {



    })





})