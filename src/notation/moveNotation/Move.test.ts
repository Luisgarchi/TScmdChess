import { Move } from "./Move";

test('method', () => {

    const move: string = 'a1a2'

    const myMove: Move = new Move(move)
    const resultMove: string = myMove.serialise()
    expect(resultMove).toEqual(move)

})

test('method1', () => {

    const move: string = 'a1a2b'

    const myMove: Move = new Move(move)
    const resultMove: string = myMove.serialise()
    expect(resultMove).toEqual(move)

})