import { UCI } from "./UCI";
import UCIError from "../../errors/UCIError";

describe('UCI (Universal Chess Interface)', () => {


    test('Valid notation', () => {
        
        const move = 'a1b7'
        const testUCI = new UCI()

        const isValid = testUCI.validate(move)
        expect(isValid).toEqual(true)

    })

    test('Valid promoton', () => {
        
        const move = 'a1b7q'
        const testUCI = new UCI()

        const isValid = testUCI.validate(move)
        expect(isValid).toEqual(true)

    })

    test('Invalid length', () => {
        const move = 'a1b'
        const testUCI = new UCI()

        expect(() => testUCI.validate(move)).toThrow(UCIError)
    })

    test('Invalid start position, file', () => {
        const move = 't1b2'
        const testUCI = new UCI()

        expect(() => testUCI.validate(move)).toThrow(UCIError)
    })

    test('Invalid start position, rank', () => {
        const move = 'a9b2'
        const testUCI = new UCI()

        expect(() => testUCI.validate(move)).toThrow(UCIError)
    })

    test('Invalid end position, file', () => {
        const move = 'h4.5'
        const testUCI = new UCI()

        expect(() => testUCI.validate(move)).toThrow(UCIError)
    })

    test('Invalid end position, rank', () => {
        const move = 'h4d_'
        const testUCI = new UCI()

        expect(() => testUCI.validate(move)).toThrow(UCIError)
    })


    test('Invalid promotion position', () => {
        const move = 'a1a2v'
        const testUCI = new UCI()

        expect(() => testUCI.validate(move)).toThrow(UCIError)
    })
    


})