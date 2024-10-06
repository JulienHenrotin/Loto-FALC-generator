function factorial(n: number): number {
    if (n === 0 || n === 1) return 1
    let result = 1
    for (let i = 2; i <= n; i++) {
      result *= i
    }
    return result
  }
  
  function combinations(n: number, k: number): number {
    return factorial(n) / (factorial(k) * factorial(n - k))
  }
  
  export function calculateDuplicateProbability(gridsCount: number): number {
    const totalCombinations = combinations(50, 15)
  
    // If the number of grids is larger than total combinations, probability is 100%
    if (gridsCount > totalCombinations) {
      return 1
    }
  
    let probabilityNoDuplicate = 1
  
    for (let i = 0; i < gridsCount; i++) {
      probabilityNoDuplicate *= (totalCombinations - i) / totalCombinations
    }
  
    // Probability of having at least one duplicate is the complement
    const probabilityDuplicate = 1 - probabilityNoDuplicate
  
    return probabilityDuplicate * 100
  } 