import { MoveVector } from "./MoveVector";
import { Position } from "./Position";


const positionPropertiesTest = function(position){
    return expect.objectContaining({file: position.file, rank: position.rank})
}



describe('Method - findPositionsAlongVector', () => {




    describe('Restricted Movement', () => {

        


        describe('Basic Movement', () => {

            test('Move forward 1', () => {

                // Define a position and vector to test
                const startPosition: Position = new Position('d', 5)
                const vector: MoveVector = new MoveVector(1, 0, 1)
                
                // Define the the expected return array of positions along the vector
                const allPositions : Position[] = [
                    new Position('d', 6)
                ]

                // Call the method to get the positions
                const positions: Position[] = startPosition.findPositionsAlongVector(vector)

                // Test the returned results match the expected values
                expect(positions).toEqual(expect.arrayContaining(allPositions.map(positionPropertiesTest)))
            })

            test('Move right 1', () => {

                // Define a position and vector to test
                const startPosition: Position = new Position('d', 7)
                const vector: MoveVector = new MoveVector(0, 1, 1)
                
                // Define the the expected return array of positions along the vector
                const allPositions : Position[] = [
                    new Position('e', 7)
                ]

                // Call the method to get the positions
                const positions: Position[] = startPosition.findPositionsAlongVector(vector)

                // Test the returned results match the expected values
                expect(positions).toEqual(expect.arrayContaining(allPositions.map(positionPropertiesTest)))
            })

            test('Move backward 1', () => {

                // Define a position and vector to test
                const startPosition: Position = new Position('c', 3)
                const vector: MoveVector = new MoveVector(-1, 0, 1)
                
                // Define the the expected return array of positions along the vector
                const allPositions : Position[] = [
                    new Position('c', 2)
                ]

                // Call the method to get the positions
                const positions: Position[] = startPosition.findPositionsAlongVector(vector)

                // Test the returned results match the expected values
                expect(positions).toEqual(expect.arrayContaining(allPositions.map(positionPropertiesTest)))
            })

            test('Move left 1', () => {

                // Define a position and vector to test
                const startPosition: Position = new Position('f', 6)
                const vector: MoveVector = new MoveVector(0, -1, 1)
                
                // Define the the expected return array of positions along the vector
                const allPositions : Position[] = [
                    new Position('e', 6)
                ]

                // Call the method to get the positions
                const positions: Position[] = startPosition.findPositionsAlongVector(vector)

                // Test the returned results match the expected values
                expect(positions).toEqual(expect.arrayContaining(allPositions.map(positionPropertiesTest)))
            })


            test('Move forward 1 and right 1', () => {

                // Define a position and vector to test
                const startPosition: Position = new Position('a', 1)
                const vector: MoveVector = new MoveVector(1, 1, 1)
                
                // Define the the expected return array of positions along the vector
                const allPositions : Position[] = [
                    new Position('b', 2)
                ]

                // Call the method to get the positions
                const positions: Position[] = startPosition.findPositionsAlongVector(vector)

                // Test the returned results match the expected values
                expect(positions).toEqual(expect.arrayContaining(allPositions.map(positionPropertiesTest)))
            })

            test('Move forward 1 and left 1', () => {

                // Define a position and vector to test
                const startPosition: Position = new Position('b', 4)
                const vector: MoveVector = new MoveVector(1, -1, 1)
                
                // Define the the expected return array of positions along the vector
                const allPositions : Position[] = [
                    new Position('a', 5)
                ]

                // Call the method to get the positions
                const positions: Position[] = startPosition.findPositionsAlongVector(vector)

                // Test the returned results match the expected values
                expect(positions).toEqual(expect.arrayContaining(allPositions.map(positionPropertiesTest)))
            })

            test('Move backwards 1 and left 1', () => {

                // Define a position and vector to test
                const startPosition: Position = new Position('g', 5)
                const vector: MoveVector = new MoveVector(-1, -1, 1)
                
                // Define the the expected return array of positions along the vector
                const allPositions : Position[] = [
                    new Position('f', 4)
                ]

                // Call the method to get the positions
                const positions: Position[] = startPosition.findPositionsAlongVector(vector)

                // Test the returned results match the expected values
                expect(positions).toEqual(expect.arrayContaining(allPositions.map(positionPropertiesTest)))
            })

            test('Move backwards 1 and right 1', () => {

                // Define a position and vector to test
                const startPosition: Position = new Position('d', 3)
                const vector: MoveVector = new MoveVector(-1, 1, 1)
                
                // Define the the expected return array of positions along the vector
                const allPositions : Position[] = [
                    new Position('e', 2)
                ]

                // Call the method to get the positions
                const positions: Position[] = startPosition.findPositionsAlongVector(vector)

                // Test the returned results match the expected values
                expect(positions).toEqual(expect.arrayContaining(allPositions.map(positionPropertiesTest)))
            })                
        })





        describe('Blocked', () => {
            
            test('Blocked: Move forward 1', () => {

                // Define a position and vector to test
                const startPosition: Position = new Position('8', 5)
                const vector: MoveVector = new MoveVector(1, 0, 1)
                
                // Define the the expected return array of positions along the vector
                const allPositions : Position[] = []

                // Call the method to get the positions
                const positions: Position[] = startPosition.findPositionsAlongVector(vector)

                // Test the returned results match the expected values
                expect(positions).toEqual(allPositions)
            })

            test('Blocked: Move right 1', () => {

                // Define a position and vector to test
                const startPosition: Position = new Position('h', 7)
                const vector: MoveVector = new MoveVector(0, 1, 1)
                
                // Define the the expected return array of positions along the vector
                const allPositions : Position[] = []

                // Call the method to get the positions
                const positions: Position[] = startPosition.findPositionsAlongVector(vector)

                // Test the returned results match the expected values
                expect(positions).toEqual(allPositions)
            })

            test('Blocked: Move backward 1', () => {

                // Define a position and vector to test
                const startPosition: Position = new Position('c', 1)
                const vector: MoveVector = new MoveVector(-1, 0, 1)
                
                // Define the the expected return array of positions along the vector
                const allPositions : Position[] = []

                // Call the method to get the positions
                const positions: Position[] = startPosition.findPositionsAlongVector(vector)

                // Test the returned results match the expected values
                expect(positions).toEqual(allPositions)
            })

            test('Blcoked: Move left 1', () => {

                // Define a position and vector to test
                const startPosition: Position = new Position('a', 6)
                const vector: MoveVector = new MoveVector(0, -1, 1)
                
                // Define the the expected return array of positions along the vector
                const allPositions : Position[] = []

                // Call the method to get the positions
                const positions: Position[] = startPosition.findPositionsAlongVector(vector)

                // Test the returned results match the expected values
                expect(positions).toEqual(allPositions)
            })


            test('Blocked: Move forward 1 and right 1', () => {
                
                // Define vector to test
                const vector: MoveVector = new MoveVector(1, 1, 1)
                
                // Define the the expected return array of positions along the vector
                const allPositions : Position[] = []


                /* Test Position A */
                const startPositionA: Position = new Position('a', 8)
                const positionsA: Position[] = startPositionA.findPositionsAlongVector(vector)
                expect(positionsA).toEqual(allPositions)


                /* Test Position B */
                const startPositionB: Position = new Position('h', 5)
                const positionsB: Position[] = startPositionB.findPositionsAlongVector(vector)
                expect(positionsB).toEqual(allPositions)
                
                /* Test Position C */
                const startPositionC: Position = new Position('h', 8)
                const positionsC: Position[] = startPositionC.findPositionsAlongVector(vector)
                expect(positionsC).toEqual(allPositions)
            })

            test('Move forward 1 and left 1', () => {

                // Define vector to test
                const vector: MoveVector = new MoveVector(1, -1, 1)

                // Define the the expected return array of positions along the vector
                const allPositions : Position[] = []


                /* Test Position A */
                const startPositionA: Position = new Position('a', 8)
                const positionsA: Position[] = startPositionA.findPositionsAlongVector(vector)
                expect(positionsA).toEqual(allPositions)


                /* Test Position B */
                const startPositionB: Position = new Position('a', 5)
                const positionsB: Position[] = startPositionB.findPositionsAlongVector(vector)
                expect(positionsB).toEqual(allPositions)
                
                /* Test Position C */
                const startPositionC: Position = new Position('a', 8)
                const positionsC: Position[] = startPositionC.findPositionsAlongVector(vector)
                expect(positionsC).toEqual(allPositions)

            })

            test('Move backwards 1 and left 1', () => {

                // Define vector to test
                const vector: MoveVector = new MoveVector(-1, -1, 1)
                
                // Define the the expected return array of positions along the vector
                const allPositions : Position[] = []



                /* Test Position A */
                const startPositionA: Position = new Position('f', 1)
                const positionsA: Position[] = startPositionA.findPositionsAlongVector(vector)
                expect(positionsA).toEqual(allPositions)


                /* Test Position B */
                const startPositionB: Position = new Position('a', 5)
                const positionsB: Position[] = startPositionB.findPositionsAlongVector(vector)
                expect(positionsB).toEqual(allPositions)
                
                /* Test Position C */
                const startPositionC: Position = new Position('a', 1)
                const positionsC: Position[] = startPositionC.findPositionsAlongVector(vector)
                expect(positionsC).toEqual(allPositions)
            })

            test('Move backwards 1 and right 1', () => {

                // Define a vector to test
                const vector: MoveVector = new MoveVector(-1, 1, 1)
                
                // Define the the expected return array of positions along the vector
                const allPositions : Position[] = []

                
                /* Test Position A */
                const startPositionA: Position = new Position('g', 1)
                const positionsA: Position[] = startPositionA.findPositionsAlongVector(vector)
                expect(positionsA).toEqual(allPositions)


                /* Test Position B */
                const startPositionB: Position = new Position('h', 5)
                const positionsB: Position[] = startPositionB.findPositionsAlongVector(vector)
                expect(positionsB).toEqual(allPositions)
                
                /* Test Position C */
                const startPositionC: Position = new Position('h', 1)
                const positionsC: Position[] = startPositionC.findPositionsAlongVector(vector)
                expect(positionsC).toEqual(allPositions)

            })
        }) 





        describe('Restricted greater than one move', () => {


            test('Move right 3', () => {

                // Define a position and vector to test
                const startPosition: Position = new Position('d', 7)
                const vector: MoveVector = new MoveVector(0, 1, 3)
                
                // Define the the expected return array of positions along the vector
                const allPositions : Position[] = [
                    new Position('g', 7)
                ]

                // Call the method to get the positions
                const positions: Position[] = startPosition.findPositionsAlongVector(vector)

                // Test the returned results match the expected values
                expect(positions).toEqual(expect.arrayContaining(allPositions.map(positionPropertiesTest)))
            })

            test('Move backward 5', () => {

                // Define a position and vector to test
                const startPosition: Position = new Position('c', 7)
                const vector: MoveVector = new MoveVector(-1, 0, 5)
                
                // Define the the expected return array of positions along the vector
                const allPositions : Position[] = [
                    new Position('c', 2)
                ]

                // Call the method to get the positions
                const positions: Position[] = startPosition.findPositionsAlongVector(vector)

                // Test the returned results match the expected values
                expect(positions).toEqual(expect.arrayContaining(allPositions.map(positionPropertiesTest)))
            })



            test('Move forward 2 and left 2', () => {

                // Define a position and vector to test
                const startPosition: Position = new Position('g', 4)
                const vector: MoveVector = new MoveVector(1, -1, 2)
                
                // Define the the expected return array of positions along the vector
                const allPositions : Position[] = [
                    new Position('f', 5),
                    new Position('e', 6),
                ]

                // Call the method to get the positions
                const positions: Position[] = startPosition.findPositionsAlongVector(vector)

                // Test the returned results match the expected values
                expect(positions).toEqual(expect.arrayContaining(allPositions.map(positionPropertiesTest)))
            })

            

        })        

    })

    



    describe('Unrestricted Movement', () => {
        test('Forward 1', () => {

            // Define a position and vector to test
            const startPosition: Position = new Position('c', 2)
            const vector: MoveVector = new MoveVector(1, 0, 0)
            
            // Define the the expected return array of positions along the vector
            const allPositions : Position[] = [
                new Position('c', 3),
                new Position('c', 4),
                new Position('c', 5),
                new Position('c', 6),
                new Position('c', 7),
                new Position('c', 8)
            ]

            // Call the method to get the positions
            const positions: Position[] = startPosition.findPositionsAlongVector(vector)

            // Test the returned results match the expected values
            expect(positions).toEqual(expect.arrayContaining(allPositions.map(positionPropertiesTest)))
        })

        test('Right 1', () => {

            // Define a position and vector to test
            const startPosition: Position = new Position('a', 7)
            const vector: MoveVector = new MoveVector(0, 1, 0)
            
            // Define the the expected return array of positions along the vector
            const allPositions : Position[] = [
                new Position('b', 7),
                new Position('c', 7),
                new Position('d', 7),
                new Position('e', 7),
                new Position('f', 7),
                new Position('g', 7),
                new Position('h', 7)
            ]

            // Call the method to get the positions
            const positions: Position[] = startPosition.findPositionsAlongVector(vector)

            // Test the returned results match the expected values
            expect(positions).toEqual(expect.arrayContaining(allPositions.map(positionPropertiesTest)))
        })

        test('Backward 1', () => {

            // Define a position and vector to test
            const startPosition: Position = new Position('c', 3)
            const vector: MoveVector = new MoveVector(-1, 0, 0)
            
            // Define the the expected return array of positions along the vector
            const allPositions : Position[] = [
                new Position('c', 2),
                new Position('c', 1)
            ]

            // Call the method to get the positions
            const positions: Position[] = startPosition.findPositionsAlongVector(vector)

            // Test the returned results match the expected values
            expect(positions).toEqual(expect.arrayContaining(allPositions.map(positionPropertiesTest)))
        })

        test('Left 1', () => {

            // Define a position and vector to test
            const startPosition: Position = new Position('f', 6)
            const vector: MoveVector = new MoveVector(0, -1, 0)
            
            // Define the the expected return array of positions along the vector
            const allPositions : Position[] = [
                new Position('e', 6),
                new Position('d', 6),
                new Position('c', 6),
                new Position('b', 6),
                new Position('a', 6)
            ]

            // Call the method to get the positions
            const positions: Position[] = startPosition.findPositionsAlongVector(vector)

            // Test the returned results match the expected values
            expect(positions).toEqual(expect.arrayContaining(allPositions.map(positionPropertiesTest)))
        })


        test('Forward 1 and right 1', () => {

            // Define a position and vector to test
            const startPosition: Position = new Position('a', 1)
            const vector: MoveVector = new MoveVector(1, 1, 0)
            
            // Define the the expected return array of positions along the vector
            const allPositions : Position[] = [
                new Position('b', 2),
                new Position('c', 3),
                new Position('d', 4),
                new Position('e', 5),
                new Position('f', 6),
                new Position('g', 7),
                new Position('h', 8)
            ]

            // Call the method to get the positions
            const positions: Position[] = startPosition.findPositionsAlongVector(vector)

            // Test the returned results match the expected values
            expect(positions).toEqual(expect.arrayContaining(allPositions.map(positionPropertiesTest)))
        })

        test('Forward 1 and left 1', () => {

            // Define a position and vector to test
            const startPosition: Position = new Position('b', 4)
            const vector: MoveVector = new MoveVector(1, -1, 0)
            
            // Define the the expected return array of positions along the vector
            const allPositions : Position[] = [
                new Position('a', 5)
            ]

            // Call the method to get the positions
            const positions: Position[] = startPosition.findPositionsAlongVector(vector)

            // Test the returned results match the expected values
            expect(positions).toEqual(expect.arrayContaining(allPositions.map(positionPropertiesTest)))
        })

        test('Backwards 1 and left 1', () => {

            // Define a position and vector to test
            const startPosition: Position = new Position('g', 5)
            const vector: MoveVector = new MoveVector(-1, -1, 0)
            
            // Define the the expected return array of positions along the vector
            const allPositions : Position[] = [
                new Position('f', 4),
                new Position('e', 3),
                new Position('d', 2),
                new Position('c', 1)
            ]

            // Call the method to get the positions
            const positions: Position[] = startPosition.findPositionsAlongVector(vector)

            // Test the returned results match the expected values
            expect(positions).toEqual(expect.arrayContaining(allPositions.map(positionPropertiesTest)))
        })

        test('Move backwards 1 and right 1', () => {

            // Define a position and vector to test
            const startPosition: Position = new Position('d', 3)
            const vector: MoveVector = new MoveVector(-1, 1, 0)
            
            // Define the the expected return array of positions along the vector
            const allPositions : Position[] = [
                new Position('e', 2),
                new Position('f', 1),
            ]

            // Call the method to get the positions
            const positions: Position[] = startPosition.findPositionsAlongVector(vector)

            // Test the returned results match the expected values
            expect(positions).toEqual(expect.arrayContaining(allPositions.map(positionPropertiesTest)))
        })                

    })


    describe('Irregular Vectors', () => {

        test('Move forward 2, left 1 (Restricted)', () => {

            // Define a position and vector to test
            const startPosition: Position = new Position('d', 5)
            const vector: MoveVector = new MoveVector(2, -1, 1)
            
            // Define the the expected return array of positions along the vector
            const allPositions : Position[] = [
                new Position('c', 7)
            ]

            // Call the method to get the positions
            const positions: Position[] = startPosition.findPositionsAlongVector(vector)

            // Test the returned results match the expected values
            expect(positions).toEqual(expect.arrayContaining(allPositions.map(positionPropertiesTest)))
        })


        test('Move forward 2, right 1 (Unrestricted)', () => {

            // Define a position and vector to test
            const startPosition: Position = new Position('a', 1)
            const vector: MoveVector = new MoveVector(2, 1, 0)
            
            // Define the the expected return array of positions along the vector
            const allPositions : Position[] = [
                new Position('b', 3),
                new Position('c', 5),
                new Position('d', 7),
            ]

            // Call the method to get the positions
            const positions: Position[] = startPosition.findPositionsAlongVector(vector)

            // Test the returned results match the expected values
            expect(positions).toEqual(expect.arrayContaining(allPositions.map(positionPropertiesTest)))
        })


    })




}) 