import * as fs from 'fs'
import { PDFDocument, PDFPage, rgb , StandardFonts } from 'pdf-lib'
import * as cliProgress from 'cli-progress' 

/**
* GENERATION PDF
*/
async function fetchImageByNumber(number: number): Promise<Uint8Array | undefined> {
    try {
        const imagePath = `picto2/${number}.png`
        const imageBytes = fs.readFileSync(imagePath)
        return new Uint8Array(imageBytes)
    } catch (error) {
        console.error(`Error fetching image for number ${number}:`, error)
        return undefined
    }
}

export async function createPdf(grids: number[][][], progressBar: cliProgress.SingleBar) {
    const pdfDoc = await PDFDocument.create()
    const pageWidth = 1190.55
    const pageHeight = 841.89
    let printedGrids = 0
    
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
                printedGrids++
                progressBar.update(printedGrids)
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
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

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
                    const imageBytes = await fetchImageByNumber(grid[row][col])
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
                        color: rgb(0, 0, 0), 
                        font : helveticaBoldFont
                    })
                }
            }
        }
    }
}