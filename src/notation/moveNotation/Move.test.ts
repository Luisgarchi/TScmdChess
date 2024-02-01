import { ColourPlayers } from "../../chess_settings";
import { Position } from "../boardNotation/Position";
import { Move } from "./Move";

test('UCI string', () => {

    const move: string = 'a1a2'
    const colour: ColourPlayers = 'white'
    const myMove: Move = new Move(move, colour)
    const resultMove: string = myMove.serialise()
    expect(resultMove).toEqual(move)

})

test('UCI string with promote', () => {

    const move: string = 'a1a2q'
    const colour: ColourPlayers = 'white'
    const myMove: Move = new Move(move, colour)
    const resultMove: string = myMove.serialise()
    expect(resultMove).toEqual(move)

})