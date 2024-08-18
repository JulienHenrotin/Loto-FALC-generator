import * as fs from 'fs'
import { PDFDocument, PDFPage, rgb } from 'pdf-lib'
import * as readline from 'readline'

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

function generateGridRandom(rows: number, cols: number): number[][] {
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

    // Boucle pour créer une page à chaque ensemble de 4 grilles
    for (let pageIndex = 0; pageIndex < grids.length; pageIndex += 4) {
        const page = pdfDoc.addPage([pageWidth, pageHeight])
        let currentX = 50
        let currentY = 700

        // Ajouter jusqu'à 4 grilles par page
        for (let gridIndex = 0; gridIndex < 4; gridIndex++) {
            const grid = grids[pageIndex + gridIndex]
            if (grid) {
                if (gridIndex > 0 && gridIndex % 2 === 0) {
                    currentX = 50
                    currentY -= 400
                }
                await generateTable(page, grid, currentX, currentY, pdfDoc)
                currentX += 600
            }
        }
    }

    const pdfBytes = await pdfDoc.save()
    fs.writeFileSync('output.pdf', pdfBytes)
}

async function generateTable(page: PDFPage, grid: number[][], startX: number, startY: number, pdfDoc: PDFDocument) {
    const cellWidth = 529 / 5
    const cellHeight = 362 / 3
    const outerBorderWidth = 2
    const innerBorderWidth = 1
    const borderColor = rgb(0, 0, 0)
    const grayColor = rgb(0.75, 0.75, 0.75)

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
                        const scaledWidth = cellWidth - 30
                        const scaledHeight = cellHeight - 30
                        const scaledImage = image.scaleToFit(scaledWidth, scaledHeight)
                        page.drawImage(image, {
                            x: x + (cellWidth - scaledImage.width) / 2,
                            y: y + (cellHeight - scaledImage.height) / 2 + 5,
                            width: scaledImage.width,
                            height: scaledImage.height,
                        })
                    }
                    page.drawText(grid[row][col].toString(), {
                        x: x + cellWidth / 2 - 10,
                        y: y + 10,
                        size: 20,
                        color: rgb(0, 0, 0)
                    })
                }
            }
        }
    }
}

/**
 * INTERFACE USER
 */
// Création de l'interface pour lire l'entrée utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function convertNumberSheet(number: number): number {
    return Math.ceil(number / 4)
}

// Fonction pour demander le nombre de pages
function askNumberOfPages(): Promise<number> {
    return new Promise((resolve) => {
        rl.question('🧮 Combien de grilles voulez-vous générer ? ', (answer) => {
            const numberOfGrids = parseInt(answer)
            const numberOfSheets = convertNumberSheet(numberOfGrids)
            const finalNumberOfGrids = numberOfSheets * 4

            // Codes ANSI pour la couleur
            const reset = '\x1b[0m'
            const brightYellow = '\x1b[93m'
            const brightCyan = '\x1b[96m'
            const brightGreen = '\x1b[92m' // Couleur verte brillante pour les séparateurs
            const brightMagenta = '\x1b[95m' // Magenta vif pour le nombre final de grilles

            console.log(`${brightGreen}===============================${reset}`)
            console.log(`📊 Vous avez demandé ${brightYellow}${numberOfGrids}${reset} grilles.`)
            console.log(`📝 Cela correspond à ${brightCyan}${numberOfSheets}${reset} feuille(s) de PDF (4 grilles par feuille).`)
            console.log(`🔢 Le nombre final de grilles générées sera ${brightMagenta}${finalNumberOfGrids}${reset}.`)
            console.log(`${brightGreen}===============================${reset}`)

            resolve(numberOfSheets)
            rl.close()
        })

    })
}



/**
 * MAIN
 */
askNumberOfPages().then(numberOfPages => {
    const rows = 3
    const cols = 5
    const grids = []

    for (let i = 0; i < numberOfPages * 4; i++) {
        let grid = generateGridRandom(rows, cols)
        grid = addBlack(grid)
        grids.push(grid)
    }

    // Enregistrer les grilles dans un fichier JSON
    const gridsJson = JSON.stringify(grids, null, 2) // Formatage avec indentation
    fs.writeFileSync('grids.json', gridsJson)

    createPdf(grids).then(() => console.log('🟢PDF créé avec succès')).catch(err => console.error('Erreur lors de la création du PDF:', err))

    console.log('🟢 Grilles enregistrées dans grids.json')
})
