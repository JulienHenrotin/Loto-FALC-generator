import { rgb, RGB } from 'pdf-lib'

type Couleur = {
  name: string,
  couleurText: string,
  couleurBGprimary: string,
  couleurBGsecondary: string,
  couleurBorder: string
}

type CouleurPdfLib = {
  name: string,
  couleurText: RGB,
  couleurBGprimary: RGB,
  couleurBGsecondary: RGB,
  couleurBorder: RGB
}

const tableau: Couleur[] = [
  {
    name: 'Rose Pale',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#f7d3e3',
    couleurBorder: '#b8a7a1'
  },
  {
    name: 'Vert Clair',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#b7e4c7',
    couleurBorder: '#a89c8f'
  },
  {
    name: 'Turquoise',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#a8dadc',
    couleurBorder: '#b4a7d6'
  },
  {
    name: 'Beige Pale',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#f8edeb',
    couleurBorder: '#b0a1ba'
  },
  {
    name: 'Jaune Pale',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#ffedcc',
    couleurBorder: '#a5a58d'
  },
  {
    name: 'Orange Pale',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#ffd6a5',
    couleurBorder: '#b3b3b3'
  },
  {
    name: 'Vert Menthe',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#c8e7e4',
    couleurBorder: '#9a9a9a'
  },
  {
    name: 'Rose Pastel',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#ffcbf2',
    couleurBorder: '#a8a8c4'
  },
  {
    name: 'Jaune Pastel',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#faedcd',
    couleurBorder: '#b0b0aa'
  },
  {
    name: 'Vert Pomme',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#b9fbc0',
    couleurBorder: '#a2a2a2'
  },
  {
    name: 'Turquoise Foncé',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#8DB9B9',
    couleurBorder: '#161414'
  },
  {
    name: 'Vert Clair 2',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#c5ebc3',
    couleurBorder: '#161414'
  },
  {
    name: 'Beige Foncé',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#e1ca96',
    couleurBorder: '#161414'
  },
  {
    name: 'Gris Clair',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#e4e4e4',
    couleurBorder: '#161414'
  },
  {
    name: 'Gris Foncé',
    couleurText: '#000000',
    couleurBGprimary: '#f5f6fc',
    couleurBGsecondary: '#716f6f',
    couleurBorder: '#161414'
  }
]

export function hexToPdfLibRgb(hex: string): RGB {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  return rgb(r, g, b)
}

const tableauPdfLib: CouleurPdfLib[] = tableau.map(objet => ({
  ...objet,
  couleurText: hexToPdfLibRgb(objet.couleurText),
  couleurBGprimary: hexToPdfLibRgb(objet.couleurBGprimary),
  couleurBGsecondary: hexToPdfLibRgb(objet.couleurBGsecondary),
  couleurBorder: hexToPdfLibRgb(objet.couleurBorder)
}))

// Fonction pour obtenir un objet aléatoire du tableau
export function getRandomObject(): CouleurPdfLib {
  const randomIndex = Math.floor(Math.random() * tableau.length)
  return tableauPdfLib[randomIndex]
}