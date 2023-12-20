import expect from "expect";
import { MoveVector } from "./MoveVector";

const vectorPropertiesTest = function(vector: MoveVector){
    return expect.objectContaining({rankComponent: vector.rankComponent, fileComponent: vector.fileComponent})
}

describe('Method - getUnitVector', () => {

    test('Unit vector', () => {

        // Define a vector to test
        const vector: MoveVector = new MoveVector(1, 1, 0)

        // Define expected unit vector of vector
        const unitVector: MoveVector = new MoveVector(1, 1, 0)

        // Call method to get the unit vector
        const testVector: MoveVector = vector.getUnitVector()

        // Test the return result matches the expected value
        expect(testVector).toEqual(vectorPropertiesTest(unitVector))
        
    })

    test('Vertical vector', () => {
        // Define a vector to test
        const vector: MoveVector = new MoveVector(10, 0, 0)

        // Define expected unit vector of vector
        const unitVector: MoveVector = new MoveVector(1, 0, 0)

        // Call method to get the unit vector
        const testVector: MoveVector = vector.getUnitVector()

        // Test the return result matches the expected value
        expect(testVector).toEqual(vectorPropertiesTest(unitVector))
    })

    test('Horizontal vector', () => {
        // Define a vector to test
        const vector: MoveVector = new MoveVector(0, 4, 0)

        // Define expected unit vector of vector
        const unitVector: MoveVector = new MoveVector(0, 1, 0)

        // Call method to get the unit vector
        const testVector: MoveVector = vector.getUnitVector()

        // Test the return result matches the expected value
        expect(testVector).toEqual(vectorPropertiesTest(unitVector))
    })

    test('Diagonal vector', () => {
        // Define a vector to test
        const vector: MoveVector = new MoveVector(33, 33, 0)

        // Define expected unit vector of vector
        const unitVector: MoveVector = new MoveVector(1, 1, 0)

        // Call method to get the unit vector
        const testVector: MoveVector = vector.getUnitVector()

        // Test the return result matches the expected value
        expect(testVector).toEqual(vectorPropertiesTest(unitVector))
    })

    test('Irregular vector', () => {
        // Define a vector to test
        const vector: MoveVector = new MoveVector(8, 72, 0)

        // Define expected unit vector of vector
        const unitVector: MoveVector = new MoveVector(1, 9, 0)

        // Call method to get the unit vector
        const testVector: MoveVector = vector.getUnitVector()

        // Test the return result matches the expected value
        expect(testVector).toEqual(vectorPropertiesTest(unitVector))
    })

})