import * as fs from 'fs'
import * as cliProgress from 'cli-progress' 
import { magenta } from 'ansi-colors'
// Import function
import { createPdf } from './pdf'
import { askNumberOfPages } from './userInterface'
import { displayNumberDuplicate } from './gridUtils'
import { addBlack, generateGridRandom } from './generateGrid'


/**
* MAIN
*/
askNumberOfPages().then(async numberOfPages => {
    const rows = 3
    const cols = 5
    const grids = []
    
    // Initialisation de la barre de progression
    const totalGrids = numberOfPages * 4
    
    for (let i = 0; i < totalGrids; i++) {
        let grid = generateGridRandom(rows, cols)
        grid = addBlack(grid)
        grids.push(grid)
    }
    
    // Enregistrer les grilles dans un fichier JSON
    const gridsJson = JSON.stringify(grids, null, 2) 
    await fs.writeFileSync('grids.json', gridsJson)
    
    const progressBar = new cliProgress.SingleBar({
        format: `${magenta('{bar}')} {percentage}% | ETA: {eta}s | {value}/{total}`
    }, cliProgress.Presets.shades_classic)
    console.log()
    progressBar.start(totalGrids, 0) 
    await createPdf(grids , progressBar)
    .then(() => {
        console.log()
        console.log('🟢 PDF créé avec succès')
    })
    .catch(err => console.error('Erreur lors de la création du PDF:', err))
    progressBar.stop()
    console.log()
    console.log('🟢 Grilles enregistrées dans grids.json')
    

    /**
    * Gestion doublons
    */
    displayNumberDuplicate(grids)
    
    console.log()
    console.timeEnd('⏱️ Temps total d\'exécution')
})
