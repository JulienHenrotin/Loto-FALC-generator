import { generateGridRandom, addBlack } from './grid'
import { createPdf } from './pdf'

const rows = 3
const cols = 5
const grids = []

for (let i = 0; i < 4; i++) {
    let grid = generateGridRandom(rows, cols)
    grid = addBlack(grid)
    grids.push(grid)
}

createPdf(grids).then(() => console.log('PDF créé avec succès')).catch(err => console.error('Erreur lors de la création du PDF:', err))

console.log(grids)
