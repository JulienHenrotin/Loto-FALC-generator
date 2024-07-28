import fs from 'fs'
import { PDFDocument, PDFPage, rgb } from 'pdf-lib'

/**
 * GENERATION GRID DE NUMERO
 */

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

function addBlack(grid: number[][]) {
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

/**
 * GENERATION PDF
 */

async function fetchImageByNumber(number: number): Promise<Uint8Array> {
    const imagePath = `pictures/${number}.jpeg`
    const imageBytes = fs.readFileSync(imagePath)
    return new Uint8Array(imageBytes)
}

async function createPdf(grids: number[][][]) {
    const pdfDoc = await PDFDocument.create()
    const pageWidth = 1190.55
    const pageHeight = 841.89
    const page = pdfDoc.addPage([pageWidth, pageHeight])

    let currentX = 50
    let currentY = 700

    grids.forEach((grid, index) => {
        if (index > 0 && index % 2 === 0) {
            currentX = 50
            currentY -= 400
        }
        generateTable(page, grid, currentX, currentY)
        currentX += 600
    })

    const pdfBytes = await pdfDoc.save()
    fs.writeFileSync('output.pdf', pdfBytes)
}

function generateTable(page: PDFPage, grid: number[][], startX: number, startY: number) {
    const cellWidth = 529 / 5
    const cellHeight = 362 / 3
    // Couleurs et épaisseurs des bordures
    const outerBorderWidth = 2
    const innerBorderWidth = 1
    const borderColor = rgb(0, 0, 0)

    // Dessine les bordures du tableau
    for (let row = 0; row <= 2; row++) {
        const y = startY - row * cellHeight
        for (let col = 0; col <= 5; col++) {
            const x = startX + col * cellWidth
            const borderWidth = outerBorderWidth
            page.drawRectangle({
                x,
                y,
                width: col === 5 ? 0 : cellWidth,
                height: row === 3 ? 0 : cellHeight,
                borderColor,
                borderWidth,
            })
            if (row < 3 && col < 5 && grid[row][col] !== 0) {
                page.drawText(grid[row][col].toString(), {
                    x: x + cellWidth / 2 - 10,
                    y: y + cellHeight / 2 - 10,
                    size: 20,
                    color: rgb(0, 0, 0)
                })
            }
        }
    }
}

/**
 * MAIN
 */
const rows = 3
const cols = 5
const grids = []
for (let i = 0; i < 4; i++) {
    let grid = generateGridRandom(rows, cols)
    grid = addBlack(grid)
    grids.push(grid)
}

createPdf(grids)
    .then(() => console.log('PDF créé avec succès'))
    .catch(err => console.error('Erreur lors de la création du PDF:', err))

console.log(grids)
