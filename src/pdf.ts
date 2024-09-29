import * as fs from 'fs'
import jsPDF from 'jspdf'
import * as cliProgress from 'cli-progress'

/**
 * GÉNÉRATION PDF
 */
async function fetchImageByNumber(number: number): Promise<string | undefined> {
    try {
        const imagePath = `picto2/${number}.png`
        return imagePath
    } catch (error) {
        console.error(`Erreur lors de la récupération de l'image pour le numéro ${number}:`, error)
        return undefined
    }
}

export async function createPdf(grids: number[][][], progressBar: cliProgress.SingleBar) {
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a3'
    })
    
    const pageWidth = 420
    const pageHeight = 297
    let printedGrids = 0

    // Boucle pour créer une page à chaque ensemble de 4 grilles
    for (let pageIndex = 0; pageIndex < grids.length; pageIndex += 4) {
        if (pageIndex > 0) {
            doc.addPage()
        }
        let currentX = 20
        let currentY = 20
        
        // Ajouter jusqu'à 4 grilles par page
        for (let gridIndex = 0; gridIndex < 4; gridIndex++) {
            const grid = grids[pageIndex + gridIndex]
            if (grid) {
                if (gridIndex > 0 && gridIndex % 2 === 0) {
                    currentX = 20
                    currentY += 140
                }
                await generateTable(doc, grid, currentX, currentY)
                printedGrids++
                progressBar.update(printedGrids)
                currentX += 210
            }
        }
    }
    
    doc.save('output.pdf')
}

async function generateTable(doc: jsPDF, grid: number[][], startX: number, startY: number) {
    const cellWidth = 40
    const cellHeight = 40
    const outerBorderWidth = 0.5
    const innerBorderWidth = 0.2

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 5; col++) {
            const x = startX + col * cellWidth
            const y = startY + row * cellHeight
            
            // Dessiner le contour de la cellule
            doc.setLineWidth(outerBorderWidth)
            doc.rect(x, y, cellWidth, cellHeight)
            
            if (grid[row][col] === 0) {
                // Remplir la cellule en gris
                doc.setFillColor(200, 200, 200)
                doc.rect(x, y, cellWidth, cellHeight, 'F')
            } else {
                const imagePath = await fetchImageByNumber(grid[row][col])
                if (imagePath) {
                    // Ajouter l'image
                    doc.addImage(imagePath, 'PNG', x + 2, y + 2, cellWidth - 4, cellHeight - 4)
                }
                // Ajouter le numéro
                doc.setFontSize(12)
                doc.setFont('helvetica', 'bold')
                doc.text(grid[row][col].toString(), x + cellWidth / 2, y + cellHeight - 2, { align: 'center' })
            }
        }
    }
}