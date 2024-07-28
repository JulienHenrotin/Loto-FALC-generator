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

async function fetchImageByNumber(number: number, pdfDoc: PDFDocument): Promise<Uint8Array | undefined> {
    try {
        const imagePath = `pictures/${number}.png`
        const imageBytes = fs.readFileSync(imagePath)
        return new Uint8Array(imageBytes)
    } catch (error) {
        console.error(`Error fetching image for number ${number}:`, error)
        return undefined
    }
}

async function createPdf(grids: number[][][]) {
    const pdfDoc = await PDFDocument.create()
    const pageWidth = 1190.55
    const pageHeight = 841.89
    const page = pdfDoc.addPage([pageWidth, pageHeight])

    let currentX = 50
    let currentY = 700

    for (let index = 0; index < grids.length; index++) {
        const grid = grids[index]
        if (index > 0 && index % 2 === 0) {
            currentX = 50
            currentY -= 400
        }
        await generateTable(page, grid, currentX, currentY, pdfDoc)
        currentX += 600
    }

    const pdfBytes = await pdfDoc.save()
    fs.writeFileSync('output.pdf', pdfBytes)
}

async function generateTable(page: PDFPage, grid: number[][], startX: number, startY: number, pdfDoc: PDFDocument) {
    const cellWidth = 529 / 5
    const cellHeight = 362 / 3
    // Couleurs et épaisseurs des bordures
    const outerBorderWidth = 2
    const innerBorderWidth = 1
    const borderColor = rgb(0, 0, 0)
    const grayColor = rgb(0.75, 0.75, 0.75) // Grey color

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

            if (row < 3 && col < 5) {
                if (grid[row][col] === 0) {
                    // Fill the cell with gray color if the value is 0
                    page.drawRectangle({
                        x,
                        y,
                        width: cellWidth,
                        height: cellHeight,
                        color: grayColor
                    })
                } else {
                    const imageBytes = await fetchImageByNumber(grid[row][col], pdfDoc)
                    if (imageBytes) {
                        const image = await pdfDoc.embedPng(imageBytes)
                        const scaledWidth = cellWidth - 30 // Leave some padding around the image
                        const scaledHeight = cellHeight - 30 // Leave some padding around the image
                        const scaledImage = image.scaleToFit(scaledWidth, scaledHeight)
                        page.drawImage(image, {
                            x: x + (cellWidth - scaledImage.width) / 2,
                            y: y + (cellHeight - scaledImage.height) / 2 + 5, // Adjust y to move the image up
                            width: scaledImage.width,
                            height: scaledImage.height,
                        })
                    }
                    page.drawText(grid[row][col].toString(), {
                        x: x + cellWidth / 2 - 10,
                        y: y + 10, // Position the text 10 units from the bottom of the cell
                        size: 20,
                        color: rgb(0, 0, 0)
                    })
                }
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
