import { ChessGame } from "./ChessGame"
import { ChessPiece, ColourPlayers } from "../chess_settings"
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




describe('Method - makeMove', () => {


    test('fail (no piece at start)', () => {
    
        // Define move and colour of player making the move
        const move: string = 'b3b4'
        const colour: ColourPlayers = 'white'

        // Init game with pieces at starting position
        const chess: ChessGame = new ChessGame()

        const result: boolean = chess.makeMove(move, colour)
        // Test
        expect(result).toBe(false)
    })

    test('b29b4 fail bad UCI notation', () => {

        // Define move and colour of player making the move
        const move: string = 'b29b4'
        const colour: ColourPlayers = 'white'

        // Initialise normal chess board with pieces at starting position
        const chess: ChessGame = new ChessGame()

        const result: boolean = chess.makeMove(move, colour)
        // Test
        expect(result).toBe(false)
    })

    

    describe('Pawn', () => {

        describe('Normal movement', () => {


            test('White success normal - g2g3', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', 'g2'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'g2g3'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Pawn('white', 'g3'),
                ]
        
                // Make move
                const result : boolean = chess.makeMove(move, colour)
                
                // Test
                expect(result).toBe(true)
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })
        
        
            test('White success start rank - b2b4', () => {
        
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', 'b2'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'b2b4'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Pawn('white', 'b4'),
                ]
        
                // Make move
                const result : boolean = chess.makeMove(move, colour)
                
                // Test
                expect(result).toBe(true)
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

            
            test('Black success normal - a5a4', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', 'a5'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'a5a4'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Pawn('black', 'a4'),
                ]
        
                // Make move
                const result : boolean = chess.makeMove(move, colour)
                
                // Test
                expect(result).toBe(true)
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })


            test('Black success start rank - g7g5', () => {
        
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', 'g7'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'g7g5'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Pawn('black', 'g5'),
                ]
        
                // Make move
                const result : boolean = chess.makeMove(move, colour)
                
                // Test
                expect(result).toBe(true)
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })
        
        

        })

        describe('Pawn Capture', () => {


            test('White Pawn capture (right) - c4d5', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', 'c4'),
                    new Queen('black', 'd5'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'c4d5'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Pawn('white', 'd5'),
                ]
        
                // Make move
                const result : boolean = chess.makeMove(move, colour)
                
                // Test
                expect(result).toBe(true)
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })


            test('White Pawn capture (left) - b2a3', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', 'b2'),
                    new Knight('black', 'a3'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'b2a3'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Pawn('white', 'a3'),
                ]
        
                // Make move
                const result : boolean = chess.makeMove(move, colour)
                
                // Test
                expect(result).toBe(true)
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

            test('Black Pawn capture (right) - f4e3', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', 'f4'),
                    new Queen('white', 'e3'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'f4e3'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Pawn('black', 'e3'),
                ]
        
                // Make move
                const result : boolean = chess.makeMove(move, colour)
                
                // Test
                expect(result).toBe(true)
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })


            test('Black Pawn capture (left) - c5d4', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', 'c5'),
                    new Bishop('white', 'd4'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'c5d4'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Pawn('black', 'd4'),
                ]
        
                // Make move
                const result : boolean = chess.makeMove(move, colour)
                
                // Test
                expect(result).toBe(true)
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

        })

        describe('Promotion', () => {


            test('White h7h8q promotion - Queen', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', 'h7')
                ]
        
                // Define move and colour of player making the move
                const move: string = 'h7h8q'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Queen('white', 'h8'),
                ]
        
                // Make move
                const result : boolean = chess.makeMove(move, colour)
                
                // Test
                expect(result).toBe(true)
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

            
            test('White f7f8n promotion - Knight', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', 'f7'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'f7f8n'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Knight('white', 'f8'),
                ]
        
                // Make move
                const result : boolean = chess.makeMove(move, colour)
                
                // Test
                expect(result).toBe(true)
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

            test('White c7c8b promotion - Bishop', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', 'c7'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'c7c8b'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Bishop('white', 'c8'),
                ]
        
                // Make move
                const result : boolean = chess.makeMove(move, colour)
                
                // Test
                expect(result).toBe(true)
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

            
            test('White e7e8r promotion - Rook', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', 'e7'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'e7e8r'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Rook('white', 'e8'),
                ]
        
                // Make move
                const result : boolean = chess.makeMove(move, colour)
                
                // Test
                expect(result).toBe(true)
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })


            
            test('Black c2c1 promotion - Queen', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', 'c2'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'c2c1q'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Queen('black', 'c1'),
                ]
        
                // Make move
                const result : boolean = chess.makeMove(move, colour)
                
                // Test
                expect(result).toBe(true)
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
                    new Knight('black', 'a1'),
                ]
        
                // Make move
                const result : boolean = chess.makeMove(move, colour)
                
                // Test
                expect(result).toBe(true)
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
                    new Pawn('black', 'f2'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'f2f1r'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Rook('black', 'f1'),
                ]
        
                // Make move
                const result : boolean = chess.makeMove(move, colour)
                
                // Test
                expect(result).toBe(true)
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

        })

        describe('Promote and capture', () => {

            test('White capture promote Queen f7e8q', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', 'f7'),
                    new Rook('black', 'e8'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'f7e8q'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Queen('white', 'e8'),
                ]
        
                // Make move
                const result : boolean = chess.makeMove(move, colour)
                
                // Test
                expect(result).toBe(true)
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })


            test('Black capture promote Knight c2b1n', () => {
                
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', 'c2'),
                    new Rook('white', 'b1'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'c2b1n'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Knight('black', 'b1'),
                ]
        
                // Make move
                const result : boolean = chess.makeMove(move, colour)
                
                // Test
                expect(result).toBe(true)
                expect(chess.board.pieces).toEqual(expect.arrayContaining(piecesResult.map(piecePropertiesTest)))
                expect(chess.board.pieces.length).toEqual(piecesResult.length)
            })

        })

        describe('Blocked', () => {


            test('Blocked white, same colour - c2c3', ()=>{

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', 'c2'),
                    new Knight('white', 'c3'),
                ]

                // Define move and colour of player making the move
                const move: string = 'c2c3'
                const colour: ColourPlayers = 'white'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)      
            })


            test('Blocked white, different colour - f4f5', ()=>{

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', 'f4'),
                    new Pawn('black', 'f5'),
                ]

                // Define move and colour of player making the move
                const move: string = 'f4f5'
                const colour: ColourPlayers = 'white'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)   
            })

            test('Blocked black, same colour - h4h3', ()=>{

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', 'h4'),
                    new Pawn('black', 'h3'),
                ]

                // Define move and colour of player making the move
                const move: string = 'h4h3'
                const colour: ColourPlayers = 'black'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)              
            })


            test('Blocked black, different colour - b6b5', ()=>{

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', 'b6'),
                    new Bishop('white', 'b5'),
                ]

                // Define move and colour of player making the move
                const move: string = 'b6b5'
                const colour: ColourPlayers = 'black'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)                 
            })

            
            test('Capture blocked white - e6d7', ()=>{

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', 'e6'),
                    new King('white', 'd7'),
                ]

                // Define move and colour of player making the move
                const move: string = 'e6d7'
                const colour: ColourPlayers = 'white'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)            
            })


            test('Capture blocked black - f4e3', ()=>{

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', 'f4'),
                    new King('black', 'e3'),
                ]

                // Define move and colour of player making the move
                const move: string = 'f4e3'
                const colour: ColourPlayers = 'black'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)               
            })
        })

        describe('Illegal',() => {


            test('Wrong colour - b2b4 (white)', () => {
        
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', 'b2'),
                ]
                // Define move
                const move: string = 'b2b4'

                // Define WRONG colour
                const colour: ColourPlayers = 'black'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)   
            })

            test('Wrong colour - f3f2 (black)', () => {
        
                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', 'f3'),
                ]
                // Define move
                const move: string = 'f3f2'

                // Define WRONG colour
                const colour: ColourPlayers = 'white'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)   
            })
        
        
            
            test('Illegal move white - d3d5', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('white', 'd3'),
                ]

                // Define move and colour of player making the move
                const move: string = 'd3d5'
                const colour: ColourPlayers = 'white'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)   
            })

            test('Illegal move black - h6h7', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn('black', 'h6'),
                ]

                // Define move and colour of player making the move
                const move: string = 'h6h7'
                const colour: ColourPlayers = 'black'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)   
            })

        })

        describe('Enpassant', () => {

            test('Normal enpassant white', () => {

                // Define colour of king
                const colour: ColourPlayers = 'white'
                const differentColour: ColourPlayers = 'black'

                const pawnEnpassant: ChessPiece = new Pawn(colour, 'd5')

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new King(differentColour, 'a8'),
                    new Pawn(differentColour, 'e7'),
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
                    new King(differentColour, 'a8'),
                    new Pawn(colour, 'e6'),
                ]
                const capturedPiecesResult: ChessPiece[] = [
                    new Pawn(differentColour, 'e5'),
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

                const pawnEnpassant: ChessPiece = new Pawn(colour, 'h4')

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Pawn(differentColour, 'g2'),
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
                    new Pawn(colour, 'g3'),
                ]
                const capturedPiecesResult: ChessPiece[] = [
                    new Pawn(differentColour, 'g4'),
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
                    new Knight('white', 'd4'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'd4f3'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Knight('white', 'f3'),
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
                    new Knight('black', 'c6'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'c6e5'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Knight('black', 'e5'),
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
                    new Knight('white', 'e4'),
                    new Pawn('black', 'f6')
                ]
        
                // Define move and colour of player making the move
                const move: string = 'e4f6'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Knight('white', 'f6'),
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
                    new Knight('black', 'c2'),
                    new Knight('white', 'b4')
                ]
        
                // Define move and colour of player making the move
                const move: string = 'c2b4'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Knight('black', 'b4'),
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
                    new Knight('white', 'g7'),
                    new Rook('white', 'f5'),
                ]

                // Define move and colour of player making the move
                const move: string = 'g7f5'
                const colour: ColourPlayers = 'white'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })

            test('Black blocked (same colour)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Knight('black', 'e5'),
                    new Pawn('black', 'c4'),
                ]

                // Define move and colour of player making the move
                const move: string = 'e5c4'
                const colour: ColourPlayers = 'black'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })
        })

        describe('Illegal', () => {

            test('Illegal move white', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Knight('white', 'b4'),
                ]

                // Define move and colour of player making the move
                const move: string = 'b4f3'
                const colour: ColourPlayers = 'white'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })
            

            test('Illegal move Black', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Knight('black', 'g7'),
                ]

                // Define move and colour of player making the move
                const move: string = 'g7g5'
                const colour: ColourPlayers = 'black'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })

            test('Wrong Colour - c5e4 (white)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Knight('white', 'c5'),
                ]
                // Define move
                const move: string = 'c5e4'

                // Define WRONG colour
                const colour: ColourPlayers = 'black'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })

            test('Wrong Colour (black)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Knight('black', 'h4'),
                ]
                // Define move
                const move: string = 'h4f3'

                // Define WRONG colour
                const colour: ColourPlayers = 'white'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })

        })
    })



    describe('Bishop', () => {

        describe('Normal movement', () => {


            test('White success normal, c6f3', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Bishop('white', 'c6'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'c6f3'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Bishop('white', 'f3'),
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
                    new Bishop('black', 'd4'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'd4g7'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Bishop('black', 'g7'),
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
                    new Bishop('white', 'c8'),
                    new Knight('black', 'f5')
                ]
        
                // Define move and colour of player making the move
                const move: string = 'c8f5'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Bishop('white', 'f5'),
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
                    new Bishop('black', 'd3'),
                    new Queen('white', 'c4')
                ]
        
                // Define move and colour of player making the move
                const move: string = 'd3c4'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Bishop('black', 'c4'),
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
                    new Bishop('white', 'c4'),
                    new Rook('white', 'd5'),
                ]

                // Define move and colour of player making the move
                const move: string = 'c4e6'
                const colour: ColourPlayers = 'white'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)        
            })

            test('Black blocked (same colour)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Bishop('black', 'g7'),
                    new Rook('black', 'f8'),
                ]

                // Define move and colour of player making the move
                const move: string = 'g7f8'
                const colour: ColourPlayers = 'black'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)      
            })
        })

        describe('Illegal', () => {

            test('Illegal move white', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Bishop('white', 'e5'),
                ]

                // Define move and colour of player making the move
                const move: string = 'e5f7'
                const colour: ColourPlayers = 'white'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })
            

            test('Illegal move Black', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Bishop('black', 'a3'),
                ]

                // Define move and colour of player making the move
                const move: string = 'a3a5'
                const colour: ColourPlayers = 'black'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })

            test('Wrong Colour - d7f5 (white)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Bishop('white', 'd7')
                ]
                // Define move
                const move: string = 'd7f5'

                // Define WRONG colour
                const colour: ColourPlayers = 'black'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })

            test('Wrong Colour (black)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Bishop('black', 'h6'),
                ]
                // Define move
                const move: string = 'h6c1'

                // Define WRONG colour
                const colour: ColourPlayers = 'white'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })

        })
    })


    describe('Rook', () => {

        describe('Normal movement', () => {


            test('White success normal, a1h1', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Rook('white', 'a1'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'a1h1'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Rook('white', 'h1'),
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
                    new Rook('black', 'd6'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'd6d3'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Rook('black', 'd3'),
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
                    new Rook('white', 'g2'),
                    new Rook('black', 'g6')
                ]
        
                // Define move and colour of player making the move
                const move: string = 'g2g6'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Rook('white', 'g6'),
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
                    new Rook('black', 'f7'),
                    new Pawn('white', 'a7')
                ]
        
                // Define move and colour of player making the move
                const move: string = 'f7a7'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Rook('black', 'a7'),
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
                    new Rook('white', 'b5'),
                    new Bishop('white', 'e5'),
                ]

                // Define move and colour of player making the move
                const move: string = 'b5f5'
                const colour: ColourPlayers = 'white'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)     
            })

            test('Black blocked (same colour)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Rook('black', 'e3'),
                    new Knight('black', 'e4'),
                ]

                // Define move and colour of player making the move
                const move: string = 'e3e6'
                const colour: ColourPlayers = 'black'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)     
            })
        })

        describe('Illegal', () => {

            test('Illegal move white', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Rook('white', 'b5'),
                ]

                // Define move and colour of player making the move
                const move: string = 'b5e7'
                const colour: ColourPlayers = 'white'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })
            

            test('Illegal move Black', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Rook('black', 'e3'),
                ]

                // Define move and colour of player making the move
                const move: string = 'e3g5'
                const colour: ColourPlayers = 'black'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })

            test('Wrong Colour - d7f5 (white)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Rook('white', 'd7'),
                ]
                // Define move
                const move: string = 'd7d5'

                // Define WRONG colour
                const colour: ColourPlayers = 'black'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })

            test('Wrong Colour (black)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Rook('black', 'a2'),
                ]
                // Define move
                const move: string = 'a2h2'

                // Define WRONG colour
                const colour: ColourPlayers = 'white'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })

        })
    })




    describe('Queen', () => {

        describe('Normal movement', () => {


            test('White success normal, g3c3', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Queen('white','g3'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'g3c3'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Queen('white', 'c3'),
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
                    new Queen('black', 'e7'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'e7h4'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Queen('black', 'h4'),
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
                    new Queen('white', 'e4'),
                    new Pawn('black', 'c2')
                ]
        
                // Define move and colour of player making the move
                const move: string = 'e4c2'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Queen('white', 'c2'),
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
                    new Queen('black', 'f5'),
                    new Bishop('white', 'f1'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'f5f1'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new Queen('black', 'f1'),
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
                    new Queen('white', 'b5'),
                    new Pawn('white', 'c5'),
                ]

                // Define move and colour of player making the move
                const move: string = 'b5e5'
                const colour: ColourPlayers = 'white'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })

            test('Black blocked (same colour)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Queen('black', 'e3'),
                    new Knight('black', 'c6'),
                ]

                // Define move and colour of player making the move
                const move: string = 'e3b7'
                const colour: ColourPlayers = 'black'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })
        })

        describe('Illegal', () => {

            test('Illegal move white', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Queen('white', 'b5'),
                ]

                // Define move and colour of player making the move
                const move: string = 'b5d6'
                const colour: ColourPlayers = 'white'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })
            

            test('Illegal move Black', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Queen('black','g2'),
                ]

                // Define move and colour of player making the move
                const move: string = 'g2c7'
                const colour: ColourPlayers = 'black'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })

            test('Wrong Colour - d7f5 (white)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Queen('white', 'd7'),
                ]
                // Define move
                const move: string = 'd7d5'

                // Define WRONG colour
                const colour: ColourPlayers = 'black'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })

            test('Wrong Colour (black)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new Queen('black', 'a2'),
                ]
                // Define move
                const move: string = 'a2h2'

                // Define WRONG colour
                const colour: ColourPlayers = 'white'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })
        })
    })


    describe('King', () => {

        describe('Normal movement', () => {


            test('White success normal, b1a1', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new King('white', 'b1'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'b1a1'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new King('white', 'a1'),
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
                    new King('black', 'f5'),
                ]
        
                // Define move and colour of player making the move
                const move: string = 'f5g6'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new King('black', 'g6'),
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
                    new King('white', 'e2'),
                    new Queen('black','e3')
                ]
        
                // Define move and colour of player making the move
                const move: string = 'e2e3'
                const colour: ColourPlayers = 'white'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new King('white', 'e3'),
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
                    new King('black', 'b7'),
                    new Rook('white', 'c6')
                ]
        
                // Define move and colour of player making the move
                const move: string = 'b7c6'
                const colour: ColourPlayers = 'black'
        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new King('black', 'c6'),
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
                    new King('white', 'd4'),
                    new Pawn('white', 'd5'),
                ]

                // Define move and colour of player making the move
                const move: string = 'd4d5'
                const colour: ColourPlayers = 'white'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })

            test('Black blocked (same colour)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new King('black', 'f6'),
                    new Knight('black', 'e7'),
                ]

                // Define move and colour of player making the move
                const move: string = 'f6e7'
                const colour: ColourPlayers = 'black'

                // Init game
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)      
            })
        })

        describe('Illegal', () => {

            test('Illegal move white', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new King('white', 'b5'),
                ]

                // Define move and colour of player making the move
                const move: string = 'b5b7'
                const colour: ColourPlayers = 'white'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)

                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })
            

            test('Illegal move Black', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new King('black', 'd7'),
                ]

                // Define move and colour of player making the move
                const move: string = 'd7c5'
                const colour: ColourPlayers = 'black'
                
                // Init game with pieces at starting position
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })

            test('Wrong Colour - h6g6 (white)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new King('white', 'h6'),
                ]
                // Define move
                const move: string = 'h6g6'

                // Define WRONG colour
                const colour: ColourPlayers = 'black'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })

            test('Wrong Colour (black)', () => {

                // Define starting pieces on board
                const pieces: ChessPiece[] = [
                    new King('black', 'f3'),
                ]
                // Define move
                const move: string = 'f3f4'

                // Define WRONG colour
                const colour: ColourPlayers = 'white'
                
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
                
                // Test
                const result : boolean = chess.makeMove(move, colour)
                expect(result).toBe(false)    
            })
        })

        describe('Castles', () => {

            test('White castles king side', () => {

                // Define starting pieces on board

                const colour: ColourPlayers = 'white'

                const pieces: ChessPiece[] = [
                    new King(colour, 'e1'),
                    new Rook(colour, 'h1')
                ]
        
                // Define move and colour of player making the move
                const move: string = 'e1g1'

        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new King(colour, 'g1'),
                    new Rook(colour, 'f1')
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
                    new King(colour, 'e1'),
                    new Rook(colour, 'a1')
                ]
        
                // Define move and colour of player making the move
                const move: string = 'e1c1'

        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new King(colour, 'c1'),
                    new Rook(colour, 'd1')
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
                    new King(colour, 'e8'),
                    new Rook(colour, 'h8')
                ]
        
                // Define move and colour of player making the move
                const move: string = 'e8g8'

        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new King(colour, 'g8'),
                    new Rook(colour, 'f8')
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
                    new King(colour, 'e8'),
                    new Rook(colour,'a8')
                ]
        
                // Define move and colour of player making the move
                const move: string = 'e8c8'

        
                // Init game
                const chess: ChessGame = new ChessGame(pieces)
        
                // Define expected pieces after move
                const piecesResult: ChessPiece[] = [
                    new King(colour, 'c8'),
                    new Rook(colour, 'd8')
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