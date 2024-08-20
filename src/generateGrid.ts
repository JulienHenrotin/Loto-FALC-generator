/**
* GENERATION GRID DE NUMERO
*/

function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateRandomNumberWithExclude(min: number, max: number, exclude: Set<number>): number {
    let randomNumber: number
    do {
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
    } while (exclude.has(randomNumber))
        exclude.add(randomNumber)
    return randomNumber
}

export function generateGridRandom(rows: number, cols: number): number[][] {
    const grid: number[][] = []
    const colSets: Set<number>[] = Array.from({ length: cols }, () => new Set<number>())
    
    for (let i = 0; i < rows; i++) {
        const row: number[] = []
        for (let j = 0; j < cols; j++) {
            const min = j * 10 + 1
            const max = (j + 1) * 10
            row.push(generateRandomNumberWithExclude(min, max, colSets[j]))
        }
        grid.push(row)
    }
    
    return grid
}

export function addBlack(grid: number[][]) {
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