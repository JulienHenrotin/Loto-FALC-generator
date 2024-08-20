import * as readline from 'readline'
import * as colors from 'ansi-colors'
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
export function askNumberOfPages(): Promise<number> {
    return new Promise((resolve) => {
        rl.question('🧮 Combien de grilles voulez-vous générer ? ', (answer) => {
            const numberOfGrids = parseInt(answer)
            const numberOfSheets = convertNumberSheet(numberOfGrids)
            const finalNumberOfGrids = numberOfSheets * 4
            
            console.log()
            console.log(colors.green('==============================='))
            console.log(`📊 Vous avez demandé ${colors.yellow(numberOfGrids.toString())} grilles.`)
            console.log(`📝 Cela correspond à ${colors.cyan(numberOfSheets.toString())} feuille(s) de PDF (4 grilles par feuille).`)
            console.log(`🔢 Le nombre final de grilles générées sera ${colors.magenta(finalNumberOfGrids.toString())}.`)
            console.log(colors.green('==============================='))
            
            resolve(numberOfSheets)
            console.time('⏱️ Temps total d\'exécution')
            rl.close()
        })
    })
}