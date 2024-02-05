import { box } from "../utils/utf8encodings"


export class Board {

    // PRIVATE PROPERTIES
    private _rows: number
    private _columns: number
    private _heightRows : number
    private _heightColumns : number

    private _board: string[][]
    private _visualBoard: string[]

    private _boardEdgeTop: string
    private _boardEdgeBottom: string 
    private _boardEdgeInbetween: string
    private _emptyRow: string



    // CONSTRUCTOR METHOD   

    constructor(rows: number, columns:number, heightRows:number, heightColumns:number) {

        // set the attributes of the board
        this._rows = rows                            // number of rows
        this._columns = columns                      // number of columns
        this._heightRows = heightRows                // relative character size of rows
        this._heightColumns = heightColumns          // relative character size of columns

        // Horizonal spacing between board squares
        const horizontalSpacing: string = box.horizontal.repeat(this._heightColumns)

        /* Repeating patterns for individual squares, each square is from 
        the left most edge (not included) up to an including the rightmost 
        edge separating the current square from the next square */
        const edgeTopSquare: string = horizontalSpacing + box.edgeTop               // ━━━━━┳
        const edgeBottomSquare: string = horizontalSpacing + box.edgeBottom         // ━━━━━┻
        const edgeInbetweenSquare: string = horizontalSpacing + box.cross           // ━━━━━╋
        const emptySquare: string = ' '.repeat(this._heightColumns) + box.vertical  //      ┃
        
        /* Using the above repeating patterns for a single square create all the 
        necessary horizontal lines of a grid necessary to build an empty board */

        // Top most edge of grid/board.     E.g. ┏━━━━━┳━━━━━┳━━...━━━┓
        this._boardEdgeTop       = box.cornerTopLeft + 
                                    edgeTopSquare.repeat(this._columns - 1) + 
                                    horizontalSpacing + box.cornerTopRight

        // Bottom most edge of grid/board.  E.g. ┗━━━━━┻━━━━━┻━━...━━━┛
        this._boardEdgeBottom    = box.cornerBottomLeft + 
                                    edgeBottomSquare.repeat(this._columns - 1) + 
                                    horizontalSpacing + box.cornerBottomRight

        // Central edges of grid/board.     E.g. ┣━━━━━╋━━━━━╋━━...━━━┫
        this._boardEdgeInbetween = box.edgeLeft + 
                                    edgeInbetweenSquare.repeat(this._columns - 1) + 
                                    horizontalSpacing + box.edgeRight
        
        // Square centre in grid/board.     E.g. ┃     ┃     ┃  ...   ┃
        this._emptyRow           = box.vertical + 
                                    emptySquare.repeat(this._columns - 1) + 
                                    emptySquare

        // Create a board represented as a 2d array
        this._board = Array.from(Array(this._rows), _ => Array(this._columns).fill(' '))
        
        /* Initialise empty array. Each entry in visualBoard will be a string 
        representing a row of the board that will be printed in the command line */
        this._visualBoard = []
    }


    // METHODS FOR BUILDING THE VISUAL CMD BOARD

    public buildBoard(): void {

        // Place the top edge of the board
        this._visualBoard.push(this._boardEdgeTop)

        // Handle all rows inbetween top and bottom edge of board
        this._buildRows()

        // Place bottom edge of board
        this._visualBoard.push(this._boardEdgeBottom)
    }


    private _buildRows(): void{

        //  for each row in .board
        for(let i = 0; i < this._board.length - 1; i++){

            /* each row (except last) will consist of the formated .board data sandwiched
            between any padding resulting from the board aspect ratio (_heightRows) */ 
            this._buildPadding()
            this._buildRowData(this._board[i])
            this._buildPadding()

            // add bottom edge of board grid to the row
            this._visualBoard.push(this._boardEdgeInbetween) 
        }
        
        /* Handle last row separetly since boardEdgeBottom is required instead 
        of boardEdgeInbetween and is included already in _buildBoard */
        this._buildPadding()
        this._buildRowData(this._board[this._board.length - 1])
        this._buildPadding()
    }


    private _buildPadding(): void {

        // funuction builds padding for above and below a row containing board data.

        // Substract 1 for board data, divide by 2 since padding is added above and below board data
        const repeatPadding = (this._heightRows - 1) / 2 

        // Push the string represnetation to visual board
        for (let i = 0; i < repeatPadding; i ++) {
            this._visualBoard.push(this._emptyRow)
        } 
    }
 

    private _buildRowData(row: string[]): void{
        
        // construct the string representation of a row containing board data (argument)

        // string representation build from scratch since JS strings are immutables
        let boardRow = ''

        // Set the horizontal padding
        const padding = (this._heightColumns - 1) / 2

        // for each column in row add the padding around the data, prepend a vertical line
        for(let i = 0; i < row.length; i++) {
            boardRow = boardRow + box.vertical + ' '.repeat(padding) + row[i] + ' '.repeat(padding)
        }

        // add final vertical line
        boardRow = boardRow + box.vertical

        // Push the string represnetation to visual board
        this._visualBoard.push(boardRow)
    }

    private _formatRow(row: number): number{
        
        /* subtract 1 from row because board is represented as an array (starts at zero index)
        subtract from _rows since we want lower rows displayed at the bottom of the console instead of at top*/ 
        return (this._rows - 1) - (row - 1)
    }


    private _formatColumn(column: number): number{

        // zero index columns
        return column - 1
    }


    protected addCharacter(character: string, row: number, column: number): void{
 
        // Format row and columns
        const rowIndex = this._formatRow(row)
        const columnIndex = this._formatColumn(column)

        // add to board
        this._board[rowIndex][columnIndex] = character
    }


    protected removeCharacter(row: number, column: number): void{

        // Format row and columns
        const rowIndex = this._formatRow(row)
        const columnIndex = this._formatColumn(column)

        // Add to board
        this._board[rowIndex][columnIndex] = " "
    }

    
    protected moveCharacter(startRow: number, startColumn: number, endRow: number, endColumn: number): void{

        // Get the symbol of the character we want to move
        const startRowIndex = this._formatRow(startRow)
        const startColumnIndex = this._formatColumn(startColumn)
        const symbol = this._board[startRowIndex][startColumnIndex]

        // Remove the character from the starting position
        this.removeCharacter(startRow, startColumn)

        // Add the symbol at the end position
        this.addCharacter(symbol,  endRow, endColumn)
    }

    // Reset Visual Board
    resetVisualBoard(): void {
        this._visualBoard = []
    }

    // PRINT THE BOARD TO THE CMD 

    display(){
        this.resetVisualBoard()
        this.buildBoard()
        // print the visual representation of the board to the console
        for (let i = 0; i < this._visualBoard.length; i++) {
            console.log(this._visualBoard[i])
        }
    }

    get board() {
        return this._board
    }

    
}
