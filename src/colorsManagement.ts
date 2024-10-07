import { rgb } from 'pdf-lib'

const tableau = [
    // {
    //   name: 'Objet 1',
    //   couleurText: '#000000', 
    //   couleurBGprimary: '#f5f6fc',
    //   couleurBGsecondary: '#8DB9B9',
    //   couleurBorder: '#161414'
    // },
    // {
    //   name: 'Objet 2',
    //   couleurText: '#000000', 
    //   couleurBGprimary: '#f5f6fc',
    //   couleurBGsecondary: '#c5ebc3',
    //   couleurBorder: '#161414'
    // },
    // {
    //   name: 'Objet 2',
    //   couleurText: '#000000', 
    //   couleurBGprimary: '#f5f6fc',
    //   couleurBGsecondary: '#e1ca96',
    //   couleurBorder: '#161414'
    // },
    {
      name: 'Objet 2',
      couleurText: '#000000', 
      couleurBGprimary: '#f5f6fc',
      couleurBGsecondary: '#e4e4e4',
      couleurBorder: '#161414'
    },
    // {
    //   name: 'Objet 2',
    //   couleurText: '#000000', 
    //   couleurBGprimary: '#f5f6fc',
    //   couleurBGsecondary: '#716f6f',
    //   couleurBorder: '#161414'
    // },
  ]
  
  
 export function hexToPdfLibRgb(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    return rgb(r, g, b)
  }
  
  const tableauPdfLib = tableau.map(objet => ({
    ...objet,
    couleurText: hexToPdfLibRgb(objet.couleurText),
    couleurBGprimary: hexToPdfLibRgb(objet.couleurBGprimary),
    couleurBGsecondary: hexToPdfLibRgb(objet.couleurBGsecondary),
    couleurBorder: hexToPdfLibRgb(objet.couleurBorder)
  }))
  
  // Fonction pour obtenir un objet aléatoire du tableau
export function getRandomObject() {
    const randomIndex = Math.floor(Math.random() * tableau.length)
    return tableauPdfLib[randomIndex]
  }