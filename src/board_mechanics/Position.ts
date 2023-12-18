import { MoveVector } from "./MoveVector"
import { fileToNum, numToFile} from "../utils/notation" 


export class Position {

    /* Properties */
    
    public _file: string
    public _rank: number

    /* Constructor */ 

    constructor(file: string, rank: number){
        this._file = file
        this._rank = rank
    }

    public static compare(positionA: Position, positionB: Position): boolean {
        return ((positionA.file == positionB.file) && (positionA.rank == positionB.rank))
    }

    /* Getters */
    get file() {
        return this._file
    }

    get rank() {
        return this._rank
    }
    
    /* Setters */
    set updateFile(newFile: string) {
        this._file = newFile
    }

    set updateRank(newRank: number) {
        this._rank = newRank
    }

    /* Methods */

    serialise(): string {
        return this._file + this._rank.toString()
    }
    
    /*
    findPositionsAlongVector(vector: MoveVector): Position[] {

        // Function that accepts a move vector and returns an array of Positions that are
        // located along the vector. The starting position this not included in the array. 
        
        const positions: Position[] = []

        // Get the board dimensions in numbers
        const minFile: number = fileToNum(this._boardDimensions.fileStart)
        const maxFile: number = fileToNum(this._boardDimensions.fileEnd)
        const minRank: number = this._boardDimensions.rankStart
        const maxRank: number = this._boardDimensions.rankEnd

        // Function checks if a file and rank are on a board
        const isOnBoard = (file: number, rank: number) : boolean => ((file >= minFile) && (file <= maxFile) && 
                                                                     (rank >= minRank) && (rank <= maxRank))

        // Check if the movement is restricted for each successive move
        const stopAfter = (vector.restricted) ? (i: number) => i <= vector.restricted : (i: number) => true

        // Calculate the next file and rank after moving once along a vector
        let nextFile = fileToNum(this._file) + vector.fileComponent
        let nextRank = this._rank + vector.rankComponent

        // Set the move iteration to 1 as per the definition of nexFile and nextRank above
        let moveIteration = 1

        // Find all the positions along the vector that lie on the board
        while (stopAfter(moveIteration) && isOnBoard(nextFile, nextRank)){

                // Create a new position and append it to array
                const newPosition: Position = new Position(numToFile(nextFile), nextRank)
                positions.push(newPosition)

                // Get the next vector and increment the move iteration
                nextFile += vector.fileComponent
                nextRank += vector.rankComponent
                moveIteration ++ 
            }
        return positions
    }
    */
}