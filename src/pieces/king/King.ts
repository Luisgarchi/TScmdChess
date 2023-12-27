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

    public makeCopy(): King {
        return new King(this.colour, new Position(this.position.serialise()))
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

        const allCheckingPieces: ChessPiece[] = []

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
}