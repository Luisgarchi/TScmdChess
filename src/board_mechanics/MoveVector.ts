import {greatestCommonDivisor} from "../utils/math"


export class MoveVector {

    /* Properties */

    private _rankComponent: number
    private _fileComponent: number
    private _restricted: number
    private _activated: boolean

    
    /* Constructor */ 

    constructor(rankComponent:number, fileComponent: number, restricted?: number, activated?: boolean){
        this._rankComponent = rankComponent
        this._fileComponent = fileComponent
        this._restricted = (typeof activated === 'undefined') ? 0 : restricted
        this._activated = (typeof activated === 'undefined') ? true : activated
    }

    /* Getters */

    get rankComponent(): number {
        return this._rankComponent;
    }

    get fileComponent(): number {
        return this._fileComponent
    }

    get restricted(): number {
        return this._restricted
    }

    get activated(): boolean {
        return this._activated
    }

    /* Setters */

    public set updateRankComponent(rankComponent){
        this._rankComponent = rankComponent
    }

    public set updateFileComponent(fileComponent){
        this._fileComponent = fileComponent
    }

    public set updateRestricted(restricted){
        this._restricted = restricted
    }

    public set updateActivated(activated){
        this._activated = activated
    }

    /* Methods */

    getUnitVector(): MoveVector {

        /* Function finds the unit vector */

        const vectorRank: number = this._rankComponent
        const vectorFile: number = this._fileComponent

        // Check for horizontal movement in rank, true: set vector = [+/- 1, 0] 
        if (vectorFile == 0){
            return new MoveVector(vectorRank / Math.abs(vectorRank), 0, 0) 
        } 
        // Check for horizontal movement in file: true set vector = [0, +/- 1]
        else if (vectorRank == 0){
            return new MoveVector(0, vectorFile / Math.abs(vectorFile), 0)
        }
        // Otherwise there are two components to vector.
        else {
            // Find the unit vector by dividing by the greatsest common divisor
            const divideByGCD = greatestCommonDivisor(vectorFile, vectorRank)
            return new MoveVector(vectorRank/divideByGCD , vectorFile/divideByGCD, 0)
        }
    }

}


