function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateGridRandom(rows: number, cols: number): number[][] {
    const grid: number[][] = []
    for (let i = 0; i < rows; i++) {
        const row: number[] = []
        for (let j = 0; j < cols; j++) {
            const min = j * 10 + 1
            const max = (j + 1) * 10
            row.push(generateRandomNumber(min, max))
        }
        grid.push(row)
    }
    return grid
}

function addBlack(grid : number[][]){
    return grid.map(row => {
        const cols = row.length
        const firstIndex = generateRandomNumber(0, cols - 1)
        let secondIndex
        do {
            secondIndex = generateRandomNumber(0, cols - 1)
        } while (secondIndex === firstIndex)
        
        row[firstIndex] = 0
        row[secondIndex] = 0
        return row
    })
}

const rows = 3
const cols = 5
let grid = generateGridRandom(rows, cols)
grid = addBlack(grid)

console.log(grid)
