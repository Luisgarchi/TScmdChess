import { BoardNotationObject, BOARD_DIMENSIONS } from "../../utils/notation"
import UCIError from "../../errors/UCIError"

export class UCI {
    
    private _validLenghts
    private _promotions
    private _boardDimensions: BoardNotationObject

    constructor(){
        this._validLenghts = [4, 5]
        this._promotions = ['q', 'r', 'b', 'n']
        this._boardDimensions = BOARD_DIMENSIONS
    }

    validate(move: string): boolean {

        // Check if the move is valid UCI

        try {

            // 1) Length
            const isValidLength: boolean = this.validLenght(move)

            const startPosition: string = move.slice(0,2)
            const endPosition: string = move.slice(2,4)
            
            // 2) Promotion
            const isValidPromotion : boolean = (move.length == 5) ? this.validPromotion(move[4]): true

            // 3) Position
            const isValidStart : boolean = this.validBoardPosition(startPosition)
            const isValidEnd : boolean = this.validBoardPosition(endPosition)

            return (isValidLength && isValidPromotion && isValidStart && isValidEnd)
        }
        catch (error){
            throw error
        }

    }

    private validLenght(move: string) : boolean {

        if (!(this._validLenghts.includes(move.length))){
            throw new UCIError('UCI notation should be 4 characters long or 5 for promotion.')
        }
        return true

    }


    private validBoardPosition(position): boolean {
        
        /* This method takes a string with two characters and checks if it is a valid
        position/square */

        // Decompose the position into file and rank
        const file = position[0]
        const rank: number = Number(position[1])

        if (isNaN(rank)){
            throw new UCIError('Rank must be a number')
        }

        // Check file lower limit 
        if (file < this._boardDimensions.fileStart){
            throw new UCIError(`File exceeds the minimum board value of '${this._boardDimensions.fileStart}'`)
        }

        // Check file upper limit
        else if (file > this._boardDimensions.fileEnd) {
            throw new UCIError(`File exceeds the maximum board value of '${this._boardDimensions.fileEnd}'`)
        }

        // Check rank lower limit
        if (rank < this._boardDimensions.rankStart){
            throw new UCIError(`Rank exceeds the minimum board value of '${this._boardDimensions.rankStart}'`)
        }

        // Check rank upper limit
        else if (rank > this._boardDimensions.rankEnd) {
            throw new UCIError(`Rank exceeds the maximum board value of '${this._boardDimensions.rankEnd}'`)
        }

        return true
    }

    private validPromotion(pieceSymbol): boolean {
        if(!(this._promotions.includes(pieceSymbol))){
            throw new UCIError(`Can only promote to one of the following characters '${this._promotions}'`)
        }
        return true 
    }

}