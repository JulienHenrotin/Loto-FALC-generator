import * as fs from 'fs'
import { PDFDocument, PDFPage, StandardFonts } from 'pdf-lib'
import * as cliProgress from 'cli-progress'
import { getRandomObject } from './colorsManagement' 

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
    const currentDate = new Date()
    const formattedDate = currentDate.toLocaleString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }).replace(/[\/:]/g, '-')
    console.log("") 
    console.log("📅 Nom du fichier : " , formattedDate)
    const outputFileName = `output/${formattedDate}.pdf`
    fs.writeFileSync(outputFileName, pdfBytes)
} 


async function generateTable(page: PDFPage, grid: number[][], startX: number, startY: number, pdfDoc: PDFDocument) {
    const colors = getRandomObject() // Obtenir un objet couleur aléatoire
    const cellWidth = 529 / 5
    const cellHeight = 362 / 3
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    // Ajuster la hauteur de startY pour que les lignes soient correctement alignées
    const adjustedStartY = startY + cellHeight // Remonter d'une case

    // Dessiner les cellules sans bordures
    for (let row = 0; row < 3; row++) {
        const y = startY - row * cellHeight
        for (let col = 0; col < 5; col++) {
            const x = startX + col * cellWidth

            if (grid[row][col] === 0) {
                page.drawRectangle({
                    x,
                    y,
                    width: cellWidth,
                    height: cellHeight,
                    color: colors.couleurBGsecondary
                })
            } else {
                const imageBytes = await fetchImageByNumber(grid[row][col])
                if (imageBytes) {
                    const image = await pdfDoc.embedPng(imageBytes)
                    const scaledWidth = cellWidth - 30
                    const scaledHeight = cellHeight - 30
                    const scaledImage = image.scaleToFit(scaledWidth, scaledHeight)
                
                    // Dessiner l'image par-dessus le rectangle
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
                    color: colors.couleurText,
                    font: helveticaBoldFont
                })
            }
        }
    }

    // Dessiner les lignes de la grille avec la couleur spécifiée
    const lineColor = colors.couleurBorder
    const lineThickness = 5 
    const lineBorderThickness = 7

    // Dessiner les lignes verticales de la grille
    for (let col = 0; col <= 5; col++) {
        const x = startX + col * cellWidth
        page.drawLine({
            start: { x: x, y: adjustedStartY },
            end: { x: x, y: adjustedStartY - 3 * cellHeight },
            color: lineColor,
            thickness: (col === 0 || col === 5) ? lineBorderThickness : lineThickness,
        })
    }

    // Dessiner les lignes horizontales de la grille
    for (let row = 0; row <= 3; row++) {
        const y = adjustedStartY - row * cellHeight
        page.drawLine({
            start: { x: startX, y: y },
            end: { x: startX + 5 * cellWidth, y: y },
            color: lineColor,
            thickness: (row === 0 || row === 3) ? lineBorderThickness : lineThickness,
        })
    }
}