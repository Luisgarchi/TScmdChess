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