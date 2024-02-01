import { ColourPlayers } from "../../chess_settings"
import { Position } from "../boardNotation/Position"
import { regexUCI } from "../../chess_settings"



export class Move {

    /* Properties */
    
    private _start: Position
    private _end: Position
    private _promote: string | undefined
    private _colour: ColourPlayers

    /* Constructor */ 

    constructor(UCImove: string, colour: ColourPlayers){
        this._start = new Position(UCImove.slice(0,2))
        this._end = new Position(UCImove.slice(2, 4))
        this._promote = (UCImove.length == 5) ? UCImove[4]: undefined
        this._colour = colour
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

    get colour() {
        return this._colour
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
