export function greatestCommonDivisor(a: number, b: number): number {

    // A recursive function that returns the Greates Common Divisor using Euclids algorithm
    return (!b) ? a : greatestCommonDivisor(b, a%b)
}