import { calculateDuplicateProbability } from "./stat"

export function displayNumberDuplicate(grids: number[][][]) {
    const stat = calculateDuplicateProbability(grids.length)

    const formattedStat = Number(stat.toPrecision(1))

    console.log("👀 Proba d'avoir des duplications :" + formattedStat + "%")

    const number = countNumberOccurrences(grids)
    console.log("⚠️ Nombre de grilles dupliquées :", number)
}


export function countNumberOccurrences(grids: number[][][]) {
    // Helper function to count occurrences of numbers in a single grid
    const countOccurrencesInGrid = (grid: number[][]): { [key: number]: number } => {
      const occurrences: { [key: number]: number } = {}
      
      grid.forEach(row => {
        row.forEach(num => {
          occurrences[num] = (occurrences[num] || 0) + 1
        })
      })
      
      return occurrences
    }
  
    // Transform each grid into its number occurrence count
    const gridOccurrences = grids.map(grid => countOccurrencesInGrid(grid))
  
    // Convert each occurrence object to a string for easy comparison
    const occurrencesAsStrings = gridOccurrences.map(occ => JSON.stringify(occ))
  
    // Create a map to count how many times each occurrence appears
    const occurrenceCountMap: { [key: string]: number } = {}
  
    occurrencesAsStrings.forEach(occStr => {
      occurrenceCountMap[occStr] = (occurrenceCountMap[occStr] || 0) + 1
    })
  
    // Calculate the number of duplicates
    let duplicateCount = 0
  
    Object.values(occurrenceCountMap).forEach(count => {
      if (count > 1) {
        // If a grid occurrence appears more than once, it means we have duplicates
        // Add the number of duplicate instances (e.g., if it appears 3 times, it means 2 duplicates)
        duplicateCount += count - 1
      }
    })
  
    // Return the total number of duplicates
    return duplicateCount
  }
  