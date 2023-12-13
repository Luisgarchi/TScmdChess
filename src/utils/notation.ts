
import { START_FILE, START_RANK, SQUARE_BOARD_SIZE } from "../chess_settings"


export function fileToNum(file: string): number {

    // Get the number representation of the file
    const numberRepresentation: number = file.charCodeAt(0)

    // Get the number to subtract from acording to the starting file
    const startNum: number = START_FILE.charCodeAt(0) -1

    return numberRepresentation - startNum
}


export function numToFile(fileNum: number): string {

    // Get the number starting file number representation
    const startNum: number = START_FILE.charCodeAt(0) - 1

    return String.fromCharCode(startNum + fileNum)
}

export interface BoardNotationObject{
    fileStart: string
    rankStart: number
    fileEnd: string
    rankEnd: number
}

export function squareBoardNotationFactory(dimension: number): BoardNotationObject {
    const boardNotation: BoardNotationObject = {
        fileStart: START_FILE,
        rankStart: START_RANK,
        fileEnd: numToFile((fileToNum(START_FILE) - 1) +  dimension),
        rankEnd: (START_RANK - 1) +  dimension
    }
    return boardNotation
}

export const BOARD_DIMENSIONS : BoardNotationObject = squareBoardNotationFactory(SQUARE_BOARD_SIZE);
