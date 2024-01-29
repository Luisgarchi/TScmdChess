import { Position } from "../boardNotation/Position"

export class Move {

    /* Properties */
    
    private _start: Position
    private _end: Position
    private _promote: string | undefined


    /* Constructor */ 

    constructor(move: string){
        
        this._start = new Position(move.slice(0,2))
        this._end = new Position(move.slice(2, 4))
        this._promote = (move.length == 5) ? move[4]: undefined
    }

    /* Getters */
    get start() {
        return this._start
    }

    get end() {
        return this._end
    }

    get promote() {
        return this._promote
    }
        
    serialise(): string {
        const move: string = this._start.serialise() + this._end.serialise()

        if (typeof this._promote === 'undefined') {
            return move
        }
        else {
            return move + this._promote
        }
    }

}
