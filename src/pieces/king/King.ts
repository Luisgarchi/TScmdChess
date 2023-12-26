import { Piece } from '../Piece'
import { Position } from '../../notation/boardNotation/Position'
import { PieceMechanics } from '../../notation/boardNotation/PieceMechanics'
import { factoryKingMechanics } from './KingMovement'
import { getChessPieceSymbol } from '../../utils/utf8encodings'
import { ChessPiece, type ColourPlayers, type NamesOfPieces } from '../../chess_settings'
import { ChessBoard } from '../../boards/ChessBoard'


export class King extends Piece {

    /* Constructor */
    constructor(colour: ColourPlayers, position: Position){

        /* King Properties */

        // Name/type of piece
        const type: NamesOfPieces = 'King'

        // Number of points piece is worth
        const points: number = 0

        // Get the correct utf-8 encoding to use as the piece symbol
        const symbol: string = getChessPieceSymbol(colour, type)

        // Define the movement Mechanics
        const movement: PieceMechanics = factoryKingMechanics()

        // Construct the object
        super(type, colour, symbol, position, points, movement)        
        
    }

    isInCheck(board: ChessBoard): boolean {

        // Check if the king is in check

        const kingPosition: Position = this.position

        // filter for opposite coloured pieces
        const diffColourPieces: ChessPiece[] = board.pieces.filter(
            (piece) => piece.colour != this.colour)
        
        //Check each opposite coloured piece
        for (let i = 0; i < diffColourPieces.length; i++){

            const checkingPiece: ChessPiece = diffColourPieces[i]
            const allPositions: Position[] = checkingPiece.movement.findReachablePositions(checkingPiece, board)
            if (Position.includes(allPositions, kingPosition)){
                return true
            }
        }

        return false
    }

    getCheckingPieces(board: ChessBoard): ChessPiece[] {

        // return an array of all of the pieces checking the king
        const kingPosition: Position = this.position

        const allCheckingPieces: Piece[] = []

        // filter for opposite coloured pieces
        const diffColourPieces: ChessPiece[] = board.pieces.filter(
            (piece) => piece.colour != this.colour)
        
        //Check each opposite coloured piece
        for (let i = 0; i < diffColourPieces.length; i++){

            const checkingPiece: ChessPiece = diffColourPieces[i]
            const allPositions: Position[] = checkingPiece.movement.findReachablePositions(checkingPiece, board)
            if (Position.includes(allPositions, kingPosition)){
                allCheckingPieces.push(checkingPiece)
            }
        }
        return allCheckingPieces
    }

    legalSquaresMove(board: ChessBoard): Position[] {

        // Get all of the squares the king can move
        const legalSquares: Position[] = this.movement.findReachablePositions(this, board)
        
        // Filter since it only concerns "attacking" or "opposite coloured" pieces
        const diffColourPieces: ChessPiece[] = board.pieces.filter(
            (piece) => piece.colour != this.colour)

        // Iterate over the attacking pieces
        for (let i = 0; i < diffColourPieces.length; i++){

            // Get the attacking piece and all the positions controlled by said piece
            const attackingPiece: ChessPiece = diffColourPieces[i]
            const attackingPiecePositions: Position[] = attackingPiece.movement.findReachablePositions(attackingPiece, board)

            // Iterate over the controlled positions
            for (let j = 0; j < attackingPiecePositions.length; j++){
                
                // Get the current position
                const checkPosition : Position = attackingPiecePositions[j]

                // Check if the current position is one of the positions the king can move to 
                if (Position.includes(legalSquares, checkPosition)){

                    // Find the index of said position in the king's legalSquare's array
                    function matchingIndex(piecesPosition: Position){
                        return Position.compare(piecesPosition, checkPosition)
                    }

                    const index = legalSquares.findIndex(matchingIndex)

                    // Remove this position from the kings legal positions
                    legalSquares.splice(index, 1)
                }
            }
        }
        return legalSquares
    }



}