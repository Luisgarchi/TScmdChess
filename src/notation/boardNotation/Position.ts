export class Position {

    /* Properties */
    
    public _file: string
    public _rank: number

    /* Constructor */ 

    constructor(file: string, rank?: number){

        this._rank = (typeof rank === 'undefined') ? Number(file[1]) : rank
        this._file = (typeof rank === 'undefined') ? file[0] : file
        
    }

    public static compare(positionA: Position, positionB: Position): boolean {
        return ((positionA.file == positionB.file) && (positionA.rank == positionB.rank))
    }

    public static includes(positions: Position[], position: Position): boolean {
        
        for (let i = 0; i < positions.length; i++){

            const checkPosition: Position = positions[i]

            if (this.compare(checkPosition, position)){
                return true
            }
        }
        return false
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
}