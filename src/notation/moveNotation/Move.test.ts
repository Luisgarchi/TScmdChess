import { Position } from "../boardNotation/Position";
import { Move } from "./Move";

test('UCI string', () => {

    const move: string = 'a1a2'

    const myMove: Move = new Move(move)
    const resultMove: string = myMove.serialise()
    expect(resultMove).toEqual(move)

})

test('UCI string with promote', () => {

    const move: string = 'a1a2q'

    const myMove: Move = new Move(move)
    const resultMove: string = myMove.serialise()
    expect(resultMove).toEqual(move)

})

test('Both positions', () => {

    const move: string = 'a1a2'
    const start: Position = new Position('a1')
    const end: Position = new Position('a2')

    const myMove: Move = new Move(start, end)
    const resultMove: string = myMove.serialise()
    expect(resultMove).toEqual(move)

})

test('Both positions with promote', () => {

    const move: string = 'a1a2n'
    const start: Position = new Position('a1')
    const end: Position = new Position('a2')
    const promote: string = 'n'

    const myMove: Move = new Move(start, end, promote)
    const resultMove: string = myMove.serialise()
    expect(resultMove).toEqual(move)

})