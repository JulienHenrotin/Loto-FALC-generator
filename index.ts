import fs from 'fs'
import path from 'path'
import { PDFDocument } from 'pdf-lib'

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

/**
 * GENERATION PDF
 */

async function fetchImageByNumber(number: number): Promise<Uint8Array> {
    const imagePath =  `pictures/${number}.jpg`
    const imageBytes = fs.readFileSync(imagePath)
    return new Uint8Array(imageBytes)
}

async function createPdf(numbers: number[]) {
    const pdfDoc = await PDFDocument.create()
    const pageWidth = 841.89
    const pageHeight = 1190.55
    const page = pdfDoc.addPage([pageWidth, pageHeight])


    for (const number of numbers) {
        const imageBytes = await fetchImageByNumber(number)
        const image = await pdfDoc.embedJpg(imageBytes)
        const imageDims = image.scale(0.5) // Adjust the scale as needed

        page.drawImage(image, {
            x: 50,
            width: 20,
            height: 20,
        })

    }

    const pdfBytes = await pdfDoc.save()
    fs.writeFileSync('output.pdf', pdfBytes)
}

/**
 * MAIN
 */
const rows = 3
const cols = 5
let grid = generateGridRandom(rows, cols)
grid = addBlack(grid)

const testArray = [1 , 2 ,3]
createPdf(testArray)
    .then(() => console.log('PDF créé avec succès'))
    .catch(err => console.error('Erreur lors de la création du PDF:', err))


console.log(grid)
