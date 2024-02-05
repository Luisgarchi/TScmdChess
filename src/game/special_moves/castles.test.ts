import { ChessPiece, ColourPlayers } from "../../chess_settings"
import { Move } from "../../notation/moveNotation/Move"
import { Bishop } from "../../pieces/bishop/Bishop"
import { King } from "../../pieces/king/King"
import { Knight } from "../../pieces/knight/Knight"
import { Pawn } from "../../pieces/pawn/Pawn"
import { Queen } from "../../pieces/queen/Queen"
import { Rook } from "../../pieces/rook/Rook"
import { ChessGame } from "../ChessGame"
import { 
    isCastles,
    isCastlesUCIMove, 
    getRookStartCastle, 
    isKingInstance, 
    isRookInstance, 
    isCastlesBoardCorrect,
    isNoOtherPieceBlocking,
    isOpponentNotControllingCastleSquares, 
} from "./castles"


describe('isCastles', () => {

    describe('True', () => {

        test('Can castle black kingside', () => {

            const answer: boolean = true

            const colour: ColourPlayers = 'black'
            const move: Move = new Move('e8g8', colour)
            const differentColour: ColourPlayers = 'white'

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King(colour, 'e8'),
                new Rook(colour, 'h8'),
                new Pawn(colour, 'g6'),
                new Rook(differentColour, 'h1'),
                new Knight(differentColour, 'f4'),
                new Queen(differentColour, 'g5')
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            const result: boolean = isCastles(move, chess)
            expect(result).toEqual(answer)
        })


        test('Can castle white queenside', () => {

            const answer: boolean = true
            const colour: ColourPlayers = 'white'
            const move: Move = new Move('e1c1', colour)
            const differentColour: ColourPlayers = 'black'

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King(colour, 'e1'),
                new Rook(colour, 'a1'),
                new Pawn(colour, 'a2'),
                new Pawn(colour, 'b2'),
                new Pawn(colour, 'c2'),
                new Knight(differentColour, 'd2'),
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // include random move
            chess.makeMove('b2b4', 'white')

            // Test
            const result: boolean = isCastles(move, chess)
            expect(result).toEqual(answer)
        })
    })

    describe('False', () => {

        test('Check', () => {
            const answer: boolean = false

            const colour: ColourPlayers = 'black'
            const differentColour: ColourPlayers = 'white'

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King(colour, 'e8'),
                new Rook(colour, 'h8'),
                new Queen(differentColour, 'a8'),
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test kingside castles (check)
            const move: Move = new Move('e8g8', colour)
            const result: boolean = isCastles(move, chess)
            expect(result).toEqual(answer)

            // Test queensides castles (no rook queenside)
            const move_2: Move = new Move('e8c8', colour)
            const result_2: boolean = isCastles(move_2, chess)
            expect(result_2).toEqual(answer)
        })

        test('Wrong rook', () => {

            const answer: boolean = false

            const colour: ColourPlayers = 'white'
            const differentColour: ColourPlayers = 'black'

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King(colour, 'e1'),
                new Rook(colour, 'h1'),
                new Rook(colour, 'a1'),
                new Bishop(colour, 'e4'),
                new Queen(differentColour, 'h8'),
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            const kingSideCastle: Move = new Move('e1g1', colour)
            const queenSideCastle: Move = new Move('e1c1', colour)

            // Can castle initially both sides
            expect(isCastles(kingSideCastle, chess)).toEqual(true)
            expect(isCastles(queenSideCastle, chess)).toEqual(true)

            // Simulate white rook captured on h1
            chess.makeMove('h8h1', differentColour)
            // Simulate black queen captured on h1
            chess.makeMove('e4h1', colour)
            // Bishop slides
            chess.makeMove('h1a8', colour)

            // Move Rook
            chess.makeMove('a1a2', colour)
            chess.makeMove('a2h2', colour)
            chess.makeMove('h2h1', colour)
            
            expect(isCastles(kingSideCastle, chess)).toEqual(answer)
        })

    })

})


describe('isCastlesUCIMove', () => {

    test('White allowed castling moves are true UCI notation', () => {

        const answer: boolean = true
        const colour: ColourPlayers = 'white'

        const movesStr: string[] = ['e1g1', 'e1c1']

        const testMoves: Move[] = movesStr.map((move)=> new Move(move, colour))

        for(let i = 0; i < testMoves.length; i++){
            expect(isCastlesUCIMove(testMoves[i])).toBe(answer)
        }
    })

    test('Black allowed castling moves are true UCI notation', () => {

        const answer: boolean = true
        const colour: ColourPlayers = 'black'

        const movesStr: string[] = ['e8g8', 'e8c8']

        const testMoves: Move[] = movesStr.map((move)=> new Move(move, colour))

        for(let i = 0; i < testMoves.length; i++){
            expect(isCastlesUCIMove(testMoves[i])).toBe(answer)
        }
    })

    test('Wrong Castles UCI notation is false', () => {

        const answer: boolean = false

        const movesStrWhite: string[] = ['e1f1', 'e7g8', 'f1c1', 'e8d8']
        const testMovesWhite: Move[] = movesStrWhite.map((move)=> new Move(move, 'white'))

        for(let i = 0; i < testMovesWhite.length; i++){
            expect(isCastlesUCIMove(testMovesWhite[i])).toBe(answer)
        }

        const movesStrBlack: string[] = ['e1f1', 'e7g8', 'f1c1', 'e8d8']
        const testMovesBlack: Move[] = movesStrBlack.map((move)=> new Move(move, 'black'))

        for(let i = 0; i < testMovesBlack.length; i++){
            expect(isCastlesUCIMove(testMovesBlack[i])).toBe(answer)
        }
    })
})



describe('getRookStartCastle', () => {


    test('All positions', () => {

        const movesStrWhite: string[] = [
            'e1g1',         // white kingside 
            'e1c1',         // white queenside
        ]
        const testMovesWhite: Move[] = movesStrWhite.map((move)=> new Move(move, 'white'))

        const answersStrWhite = [
            'h1',       // white kingside
            'a1',       // white queenside
        ]

        for(let i = 0; i < testMovesWhite.length; i++){
            expect(
                getRookStartCastle(testMovesWhite[i]).serialise()
            ).toBe(answersStrWhite[i])
        }

        const movesStrBlack: string[] = [
        'e8g8',         // black kingside
        'e8c8'          // black queenside
        ]

        const testMovesBlack: Move[] = movesStrBlack.map((move)=> new Move(move, 'black'))

        const answersStrBlack = [
        'h8',       // black kingside
        'a8'        // black queenside
        ]

        for(let i = 0; i < testMovesBlack.length; i++){
            expect(
                getRookStartCastle(testMovesBlack[i]).serialise()
            ).toBe(answersStrBlack[i])
        }
    })


})


describe('Type guards', () => {
    
    describe('Type guard King', () => {

        test('Is King Type', () => {
            const answer: boolean = true
            const piece: ChessPiece = new King('black', 'a1')
            expect(isKingInstance(piece)).toBe(answer)
        })

        test('Not King Type', () => {
            const answer: boolean = false
            const piece: ChessPiece = new Rook('black', 'a1')
            expect(isKingInstance(piece)).toBe(answer)
        })
    })

    describe('Type guard Rook', () => {

        test('Is Rook Type', () => {
            const answer: boolean = true
            const piece: ChessPiece = new Rook('black', 'a1')
            expect(isRookInstance(piece)).toBe(answer)
        })
        
        test('Not Rook Type', () => {
            const answer: boolean = false
            const piece: ChessPiece = new King('black', 'a1')
            expect(isRookInstance(piece)).toBe(answer)
        })
    })

})


describe('isCastlesBoardCorrect', () => {

    describe('Pieces on start square (true)', () => {

        test('Kingside white', () => {
            
            const answer: boolean = true
            
            const colour: ColourPlayers = 'white'
            const move: Move = new Move('e1g1', colour)

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King(colour, 'e1'),
                new Rook(colour, 'h1'),
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            const result: boolean = isCastlesBoardCorrect(move, chess)
            expect(result).toBe(answer)
        })

        test('Queenside white', () => {
            
            const answer: boolean = true
            
            const colour: ColourPlayers = 'white'
            const move: Move = new Move('e1c1', colour)

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King(colour, 'e1'),
                new Rook(colour, 'a1'),
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            expect(isCastlesBoardCorrect(move, chess)).toBe(answer)
        })

        test('Kingside black', () => {
            
            const answer: boolean = true
            
            const colour: ColourPlayers = 'black'
            const move: Move = new Move('e8g8', colour)

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King(colour, 'e8'),
                new Rook(colour, 'h8'),
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            expect(isCastlesBoardCorrect(move, chess)).toBe(answer)
        })

        test('Queenside black', () => {
            
            const answer: boolean = true
            
            
            const colour: ColourPlayers = 'black'
            const move: Move = new Move('e8c8', colour)


            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King(colour, 'e8'),
                new Rook(colour, 'a8'),
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            expect(isCastlesBoardCorrect(move, chess)).toBe(answer)
        })

    })

    describe('Piece not on start Square (false)', () => {
        
        test('No King on board', () => {
            
            const answer: boolean = false
            
            const colour: ColourPlayers = 'black'
            const move: Move = new Move('e8g8', colour)

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new Pawn(colour, 'e8'),
                new Rook(colour, 'h8'),
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            expect(isCastlesBoardCorrect(move, chess)).toBe(answer)
        })

        test('No Rook on board', () => {
            
            const answer: boolean = false
        
            const colour: ColourPlayers = 'white'
            const move: Move = new Move('e1g1', colour)


            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King(colour, 'e1')
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            expect(isCastlesBoardCorrect(move, chess)).toBe(answer)
        })

        test('King not on start square', () => {
            
            const answer: boolean = false
        
            const colour: ColourPlayers = 'white'

            const move: Move = new Move('e1c1', colour)

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King('black', 'e1'),
                new Rook(colour, 'a1')
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            expect(isCastlesBoardCorrect(move, chess)).toBe(answer)
        })

        test('Rook not on start square', () => {
            
            const answer: boolean = false
            
            const colour: ColourPlayers = 'black'

            const move: Move = new Move('e8c8', colour)

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King(colour, 'e8'),
                new Rook(colour, 'b8')
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            // Test
            expect(isCastlesBoardCorrect(move, chess)).toBe(answer)
        })
   
    })

    describe('Correct positions but has moved (false)', () => {

        test('King has moved (wrong start square)', () => {
            const answer: boolean = false
            
            const colour: ColourPlayers = 'black'

            const move: Move = new Move('e8c8', colour)

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King(colour, 'e7'),
                new Rook(colour, 'a8'),
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            const kingMove: Move = new Move('e7e8', colour)

            // Make a random move
            chess.makeMove(kingMove.serialise(), colour)
            // Test
            const result: boolean = isCastlesBoardCorrect(move, chess)
            expect(result).toBe(answer)
        })

        test('Rook has moved (wrong start square)', () => {

            const answer: boolean = false
        
            const colour: ColourPlayers = 'white'
            const move: Move = new Move('e1g1', colour)

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King(colour, 'e1'),
                new Rook(colour, 'h7'),
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            const rookMove: Move = new Move('h7h1', colour)

            // Make a random move
            chess.makeMove(rookMove.serialise(), colour)
            // Test
            const result: boolean = isCastlesBoardCorrect(move, chess)
            expect(result).toBe(answer)
        })
        
        test('King has moved (correct start square)', () => {

            const answer: boolean = false
            
            const colour: ColourPlayers = 'white'
            const move: Move = new Move('e1c1', colour)

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King(colour, 'e1'),
                new Rook(colour, 'a1'),
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            const kingMove: Move = new Move('e1e2', colour)
            const kingMoveBack: Move = new Move('e2e1', colour)

            // Make a random move
            chess.makeMove(kingMove.serialise(), colour)
            chess.makeMove(kingMoveBack.serialise(), colour)

            // Test
            const result: boolean = isCastlesBoardCorrect(move, chess)
            expect(result).toBe(answer)
        })

        test('King has moved (correct start square)', () => {

            const answer: boolean = false

            const colour: ColourPlayers = 'black'
            
            const move: Move = new Move('e8c8', colour)
            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King(colour, 'e8'),
                new Rook(colour, 'a8'),
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)

            const kingMove: Move = new Move('a8a7', colour)
            const kingMoveBack: Move = new Move('a7a8', colour)

            // Make a random move
            chess.makeMove(kingMove.serialise(), colour)
            chess.makeMove(kingMoveBack.serialise(), colour)
            
            // Test
            const result: boolean = isCastlesBoardCorrect(move, chess)
            expect(result).toBe(answer)
        })

    })


})


describe('isNoOtherPieceBlocking', () => {

    describe('Castling blocked by piece same colour', () => {

        test('Castle blocked kingside black',() => {

            const answer: boolean = false

            const colour: ColourPlayers = 'black'

            const move: Move = new Move('e8g8', colour)      

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King(colour, 'e8'),
                new Rook(colour, 'h8'),
                new Bishop(colour, 'f8')        // blocking piece
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)
    
            // Test
            const result: boolean = isNoOtherPieceBlocking(move, chess)
            expect(result).toEqual(answer)
        })

        test('Castle blocked kingside white',() => {

            const answer: boolean = false
            
            const colour: ColourPlayers = 'white'

            const move: Move = new Move('e1g1', colour)
            
            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King(colour, 'e1'),
                new Rook(colour, 'h1'),
                new Knight(colour, 'g1')        // blocking piece
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)
    
            // Test
            const result: boolean = isNoOtherPieceBlocking(move, chess)
            expect(result).toEqual(answer)
        })

        test('Castle blocked queenside black',() => {

            const answer: boolean = false
            const colour: ColourPlayers = 'black'
            const move: Move = new Move('e8c8', colour)         

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King(colour, 'e8'),
                new Rook(colour, 'a8'),
                new Knight(colour, 'd8')        // blocking piece
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)
    
            // Test
            const result: boolean = isNoOtherPieceBlocking(move, chess)
            expect(result).toEqual(answer)
        })

        test('Castle blocked queenside white',() => {

            const answer: boolean = false

            const colour: ColourPlayers = 'white'
            const move: Move = new Move('e1c1', colour)
        
            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King(colour, 'e1'),
                new Rook(colour, 'a1'),
                new Knight(colour, 'c1')        // blocking piece
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)
    
            // Test
            const result: boolean = isNoOtherPieceBlocking(move, chess)
            expect(result).toEqual(answer)
        })
    })

    describe('Castling blocked by piece same colour', () => {

        test('Castle blocked kingside black',() => {

            const answer: boolean = false
            const colour: ColourPlayers = 'black'


            const differentColour: ColourPlayers = 'white'
            const move: Move = new Move('e8g8', colour)

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King(colour, 'e8'),
                new Rook(colour, 'h8'),
                new Knight(differentColour, 'g8')        // blocking piece
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)
    
            // Test
            const result: boolean = isNoOtherPieceBlocking(move, chess)
            expect(result).toEqual(answer)
        })

        test('Castle blocked kingside white',() => {

            const answer: boolean = false

            const colour: ColourPlayers = 'white'
            const differentColour: ColourPlayers = 'black'

            const move: Move = new Move('e1g1', colour)

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King(colour, 'e1'),
                new Rook(colour, 'h1'),
                new Bishop(differentColour, 'f1')        // blocking piece
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)
    
            // Test
            const result: boolean = isNoOtherPieceBlocking(move, chess)
            expect(result).toEqual(answer)
        })

        test('Castle blocked queenside black',() => {

            const answer: boolean = false

            const colour: ColourPlayers = 'black'
            const differentColour: ColourPlayers = 'white'

            const move: Move = new Move('e8c8', colour)

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King(colour, 'e8'),
                new Rook(colour, 'a8'),
                new Knight(differentColour, 'b8')        // blocking piece
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)
    
            // Test
            const result: boolean = isNoOtherPieceBlocking(move, chess)
            expect(result).toEqual(answer)
        })

        test('Castle blocked queenside white',() => {

            const answer: boolean = false

            const colour: ColourPlayers = 'white'
            const differentColour: ColourPlayers = 'black'

            const move: Move = new Move('e1c1', colour)

            // Define starting pieces on board
            const pieces: ChessPiece[] = [
                new King(colour, 'e1'),
                new Rook(colour, 'a1'),
                new Bishop(differentColour, 'd1')        // blocking piece
            ]

            // Init game
            const chess: ChessGame = new ChessGame(pieces)
    
            // Test
            const result: boolean = isNoOtherPieceBlocking(move, chess)
            expect(result).toEqual(answer)
        })
    })

})


describe('isOpponentNotControllingCastleSquares', () => {

    test('White queenside controlled by oppoenent', () => {
        const answer: boolean = false

        const colour: ColourPlayers = 'white'
        const differentColour: ColourPlayers = 'black'

        const move: Move = new Move('e1c1', colour)
        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, 'e1'),
            new Rook(colour, 'a1'),
            new Rook(differentColour, 'd8')        // controlling piece
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = isOpponentNotControllingCastleSquares(move, chess)
        expect(result).toEqual(answer)
    })

    test('White kingside controlled by oppoenent', () => {
        const answer: boolean = false

        const colour: ColourPlayers = 'white'
        const differentColour: ColourPlayers = 'black'

        const move: Move = new Move('e1g1', colour)

        // Define starting pieces on board

        const pieces: ChessPiece[] = [
            new King(colour, 'e1'),
            new Rook(colour, 'h1'),
            new Bishop(differentColour, 'c4')        // controlling piece
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = isOpponentNotControllingCastleSquares(move, chess)
        expect(result).toEqual(answer)
    })

    test('Black queenside controlled by oppoenent', () => {
        const answer: boolean = false

        const colour: ColourPlayers = 'black'
        const differentColour: ColourPlayers = 'white'

        const move: Move = new Move('e8c8', colour)

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, 'e8'),
            new Rook(colour, 'a8'),
            new Queen(differentColour, 'h3')        // controlling piece
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = isOpponentNotControllingCastleSquares(move, chess)
        expect(result).toEqual(answer)
    })

    test('Black kingside controlled by oppoenent', () => {
        const answer: boolean = false

        const colour: ColourPlayers = 'black'
        const differentColour: ColourPlayers = 'white'

        const move: Move = new Move('e8g8', colour)

        // Define starting pieces on board
        const pieces: ChessPiece[] = [
            new King(colour, 'e8'),
            new Rook(colour, 'h8'),
            new Knight(differentColour, 'g6')        // controlling piece
        ]

        // Init game
        const chess: ChessGame = new ChessGame(pieces)

        // Test
        const result: boolean = isOpponentNotControllingCastleSquares(move, chess)
        expect(result).toEqual(answer)
    })
})


