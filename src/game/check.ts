import { ChessGame } from "./ChessGame"
import { ColourPlayers } from "../chess_settings"
import { ChessPiece } from "../chess_settings"
import { King } from "../pieces/king/King"
import { Position } from "../notation/boardNotation/Position"
import { Move } from "../notation/moveNotation/Move"



export function isCheck(colour: ColourPlayers, chessInstance: ChessGame): boolean {
    
    /**
     * Function that checks if the king of specified colour is in check.
     * 
     * Step 1) Get the king and its position
     * Step 2) Find all enemy piece on the board
     * Step 3) Check if any of the enemy piece control the square of kings position
     */

    // 1)
    // Get the 'colour' king 
    const king: King = chessInstance.board.getKing(colour)

    // Get the kings position
    const kingPosition: Position = king.position
    
    //2)
    // filter for opposite coloured pieces
    const diffColourPieces: ChessPiece[] = chessInstance.board.pieces.filter(
        (piece) => piece.colour != colour)

    // 3)
    //Check each opposite coloured piece
    for (let i = 0; i < diffColourPieces.length; i++){

        // Get potential checking piece
        const checkingPiece: ChessPiece = diffColourPieces[i]

        // Get all positions piece can move to ("controls")
        const allPositions: Position[] = checkingPiece.movement.findReachablePositions(checkingPiece, chessInstance.board)
        
        // Check if the piece controls the kings position
        if (Position.includes(allPositions, kingPosition)){

            // If true the king is in check return true
            return true
        }
    }

    // No piece was found checking the king return false
    return false
}



const findCheckingPieces = function(colour: ColourPlayers, chessInstance: ChessGame): ChessPiece[]{

    /**
     * Function that returns an array of all pieces checking the king of specified colour.
     * 
     * The logic is very similar to the isCheck function, but rather we find and store all checking
     * piece; returning an array of checking piece at the end instead of a boolean.
     * 
     * Step 1) Get the king and its position
     * Step 2) Find all enemy piece on the board
     * Step 3) Initialise an empty array to store any checking pieces
     * Step 4) Check if enemy pieces control the kings position, adding such to the array
     */

    // 1)
    // Get the 'colour' king 
    const king: King = chessInstance.board.getKing(colour)

    // Get the kings position
    const kingPosition: Position = king.position

    // 2)
    // filter for opposite coloured pieces
    const diffColourPieces: ChessPiece[] = chessInstance.board.pieces.filter(
        (piece) => piece.colour != this.colour)

    // 3)
    // Init empty array
    const allCheckingPieces: ChessPiece[] = []

    // 4) 
    //Check each opposite coloured piece
    for (let i = 0; i < diffColourPieces.length; i++){

        // Get potential checking piece
        const checkingPiece: ChessPiece = diffColourPieces[i]

        // Get all positions piece can move to ("controls")
        const allPositions: Position[] = checkingPiece.movement.findReachablePositions(checkingPiece, chessInstance.board)
        if (Position.includes(allPositions, kingPosition)){

            // If true, king is checked by current piece, add it to array
            allCheckingPieces.push(checkingPiece)
        }
    }
    // Return the array with the checking pieces
    return allCheckingPieces
}




const isCheckMate = function(colour: ColourPlayers, chessInstance: ChessGame): boolean {

    /**
     * Function that checks if the "colour" king is in checkmate.
     * 
     * Precondition the king must be in check already
     * 
     * Step 1) Get the king and its position
     * Step 2) Precondition the king must already be in check
     * Step 3) Get and check the positions king can move to
     * Step 4) Otherwise check if there are any other pieces that can block check
     */

    // 1)
    // Get the 'colour' king 
    const king: King = this.board.getKing(colour)

    // 2)
    // Check that the king in question is in check
    const precondition: boolean = isCheck(colour, chessInstance)

    // If the King is not in check then we can not have checkmate.
    if (!precondition) {
        return false
    }

    // 3)
    // Get the legal positions the king can move to
    const legalSquares: Position[] = findKingLegalPositions(king, chessInstance)

    // if the king has at least one legal move then it can not be check mate
    if (legalSquares.length >= 1){
        return false
    }

    // 4)
    // Check if another piece can block
    const checkingPieces: ChessPiece[] = findCheckingPieces(colour, chessInstance)

    // If there is more than one checking piece it is impossible to block
    if (checkingPieces.length > 1){
        return true
    }

    // Get the checking piece and see if it can be blocked by a piece
    const checkingPiece: ChessPiece = checkingPieces[0]
    
    const blockOrCapture: boolean = canBlockOrCapture(checkingPiece, king, chessInstance)
    
    // If player can block then it will not be checkmate: return false, 
    // otherwise player can not block and it will be checkmate: return true
    return !blockOrCapture
}




const findKingLegalPositions = function(king: King, chessInstance: ChessGame): Position[] {

    /**
     * Function that returns an array of all the legal positions the provided king can move to.
     * A legal square is one the king can move which in not controlled by an enemy piece
     * 
     * Step 1) Get an array of all the squares the king can move to (not considering check at next move)
     * Step 2) For each square check if moving the king from its current position to the 
     *         square in question results in the king being in check.
     *         - If so remove it from the array
     */

    // 1) 
    // Get square king can move to
    const allSquares: Position[] = king.movement.findReachablePositions(king, chessInstance.board)


    // 2)
    // Get king starting position
    const startPosition : Position = king.position
    
    // Iterate over all the positions the king can move to
    let index: number = 0
    
    while(index < allSquares.length){

        // Get the current square
        const endPosition: Position = allSquares[index]

        // Parse the move
        const move: Move = new Move(startPosition, endPosition)

        // Check if moving king results in check
        const isCheckNextMove: boolean = isCheckOnNextMove(move, chessInstance)

        if (isCheckNextMove){
            // True: remove the square from the array
            allSquares.splice(index, 1)
        }
        else {
            // Otherwise False: Increment the index to check the next square
            index ++
        }
    }

    // return the filter array of squares the king can move to
    return allSquares
}



const isCheckOnNextMove = function(move: Move, chessInstance: ChessGame){
    
    /**
     * Function that checks if executing "move" results in the king being in check.
     * 
     * This function is used for both:
     *  - Checking if moving a piece is illegal because it is pinned and...
     *  - Checking if the king can move to a square that is not controlled by an enemy piece
     * 
     * Assumption: 
     *  - The move contains the information of which colour player is making the move
     * 
     * Step 1) Get the player colour being moved
     * Step 2) Check whether there is a king on the board for the player making the move**
     *         This check is included for completeness. Helps during testing.
     * Step 3) Create a test game
     * Step 4) Make the move on the test game
     * Step 5) Check if the player that just made the move is in check
     */


    // 0)
    // Decompose move into start and end positions
    const startPosition: Position = move.start
    const endPosition: Position = move.end

    // 1)
    // Get the colour of the player making the move
    // The piece at the start position indicates the colour of the player
    const colour: ColourPlayers = chessInstance.board.getPiece(startPosition).colour

    // 2)
    // Check if there is a king of said colour on the board. **
    if (!chessInstance.board.isKing(colour)){
        // If not return false since no "colour" king is on the board and thus can not be checked
        return false
    }

    // 3
    // Create test game
    const testGame: ChessGame = chessInstance.createGameCopy()

    // 4)
    // Get the peice
    const movingPiece: ChessPiece = testGame.board.getPiece(startPosition)

    // EXECUTE the REGULAR move we want to test
    testGame.executeRegularMove(movingPiece, endPosition)

    // 5)
    // Return whether the king is in check or not    
    return testGame.isCheck(colour)
}



const canBlockOrCapture = function(checkingPiece: ChessPiece, kingInCheck: King, chessInstance: ChessGame): boolean {

    /**
     * Function
     * 
     * Step 1)
     */

    const blockingPositons: Position[] = checkingPiece.movement.findCheckingVectorPositions(checkingPiece, kingInCheck.position, this.board)

    // remove the last position because it is the positon of the king
    blockingPositons.splice(blockingPositons.length - 1, 1)

    // Add the starting position of the checking piece since it can be captured
    blockingPositons.push(checkingPiece.position)

    // check if any piece can block (piece must not be pinned)

    // Get all the pieces of the same colour that can potentially block or capture
    const potentialBlockingPieces: ChessPiece[] = this.board.pieces.filter(
        (piece) =>  (piece.colour == kingInCheck.colour) && 
                    (!(piece instanceof King))
    )

    // Iterate over all potential blocking pieces
    for (let i = 0; i < potentialBlockingPieces.length; i++){

        // Get the piece and position
        const potentialBlockPiece: ChessPiece = potentialBlockingPieces[i]
        const potentialBlockPiecePosition: Position = potentialBlockPiece.position

        // Get all the positions said piece can move to
        const potentialBlockPositions: Position[] = potentialBlockPiece.movement.findReachablePositions(potentialBlockPiece, this.board)

        // Check if the any of the reachable positions is one along the blocking vector 
        for (let j = 0; j < blockingPositons.length; j++){

            const blockingPositionAlongCheck: Position = blockingPositons[j]
            
            if (Position.includes(potentialBlockPositions, blockingPositionAlongCheck)){
                
                // All thats left to check is if the piece is not pinned

                // Boolean variable checks if move is legal
                const isPinned: boolean = this.isCheckOnNextMove(
                    potentialBlockPiecePosition, blockingPositionAlongCheck
                )

                if (!isPinned){
                    return true
                }
            }      
        }
    }

    // No piece was found that can block or capture so return false
    return false
}  




isCheckOnNextMove(startPosition: Position, endPosition: Position, chessInstance: ChessGame){
    /* Logic
    Check that moving the piece to the next position does not result in check
    */

    // Create test game
    const testGame: ChessGame = new ChessGame(this.board.copyPieces(), [... this.history])

    const piece: ChessPiece = testGame.board.getPiece(startPosition)

    // EXECUTE the REGULAR move we want to test
    testGame.executeRegularMove(piece, endPosition)

    // Check if there is a king on the board. 
    // Logic follows a piece can only be pined if its king is on the board
    if (this.board.isKing(piece.colour)){
        // Return whether the king is in check or not
        
        return testGame.isCheck(piece.colour)
    }
    else {
        return false
    }
}