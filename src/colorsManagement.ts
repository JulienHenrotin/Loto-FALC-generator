import { rgb } from 'pdf-lib'

const tableau = [
    {
      name: 'Objet 1',
      couleurText: '#1A2B3C', 
      couleurBGprimary: '#f5f6fc',
      couleurBGsecondary: '#72A752',
      couleurBorder: '#333333'
    },
    {
      name: 'Objet 2',
      couleurText: '#4F6B8C',
      couleurBGprimary: '#d9dade',
      couleurBGsecondary: '#E94B16',
      couleurBorder: '#993377'
    },
    {
        name: 'Objet Mel',
        couleurText: '#000814', 
        couleurBGprimary: '#e1e6ed', 
        couleurBGsecondary: '#001d3d', 
        couleurBorder: '#40916c' 
      },
      {
        name: 'Objet 3',
        couleurText: '#231942', 
        couleurBGprimary: '#e1e6ed', 
        couleurBGsecondary: '#be95c4', 
        couleurBorder: '#5e548e' 
      },
      {
        name: 'Objet 4',
        couleurText: '#073b4c', 
        couleurBGprimary: '#e1e6ed', 
        couleurBGsecondary: '#118ab2', 
        couleurBorder: '#06d6a0' 
      },
      {
        name: 'Objet 5',
        couleurText: '#333533', 
        couleurBGprimary: '#e1e6ed', 
        couleurBGsecondary: '#f5cb5c', 
        couleurBorder: '#242423' 
      },
      {
        name: 'Objet 6',
        couleurText: '#606c38', 
        couleurBGprimary: '#e1e6ed', 
        couleurBGsecondary: '#dda15e', 
        couleurBorder: '#283618' 
      },
      {
        name: 'Objet NoirBlanc 1',
        couleurText: '#000000', // Noir
        couleurBGprimary: '#FFFFFF', // Blanc
        couleurBGsecondary: '#E0E0E0', // Gris clair
        couleurBorder: '#444444' // Gris foncé
      },
      {
        name: 'Objet NoirBlanc 2',
        couleurText: '#333333', // Gris foncé
        couleurBGprimary: '#F2F2F2', // Très clair
        couleurBGsecondary: '#B0B0B0', // Gris moyen
        couleurBorder: '#000000' // Noir
      },
      {
        name: 'Objet NoirBlanc 3',
        couleurText: '#FFFFFF', // Blanc
        couleurBGprimary: '#CCCCCC', // Gris moyen
        couleurBGsecondary: '#999999', // Gris un peu plus foncé
        couleurBorder: '#222222' // Très foncé
      }
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