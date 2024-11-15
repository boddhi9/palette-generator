import { ColorHarmony } from '@/types/color'

export const hexToRgb = (hex: string): [number, number, number] => {
  const rgb = parseInt(hex.slice(1), 16)
  return [(rgb >> 16) & 0xff, (rgb >> 8) & 0xff, rgb & 0xff]
}

export const rgbToHex = (r: number, g: number, b: number): string =>
  `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`

export const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0,
    s = 0

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return [h * 360, s, l]
}

export const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  h /= 360
  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

export const generateHarmony = (
  baseRgb: [number, number, number],
  angle: number
): [number, number, number] => {
  const [r, g, b] = baseRgb
  const hsl = rgbToHsl(r, g, b)
  hsl[0] = (hsl[0] + angle) % 360
  return hslToRgb(hsl[0], hsl[1], hsl[2])
}

export const generateRandomColor = (): string => {
  return rgbToHex(
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256)
  )
}

export const generatePalette = (
  baseColor: string,
  paletteSize: number,
  harmony: ColorHarmony
): string[] => {
  const baseRgb = hexToRgb(baseColor)
  let newPalette: string[] = []

  switch (harmony) {
    case 'analogous':
      newPalette = [
        rgbToHex(...baseRgb),
        rgbToHex(...generateHarmony(baseRgb, 30)),
        rgbToHex(...generateHarmony(baseRgb, -30)),
        rgbToHex(...generateHarmony(baseRgb, 60)),
        rgbToHex(...generateHarmony(baseRgb, -60)),
      ]
      break
    case 'complementary':
      newPalette = [rgbToHex(...baseRgb), rgbToHex(...generateHarmony(baseRgb, 180))]
      break
    case 'triadic':
      newPalette = [
        rgbToHex(...baseRgb),
        rgbToHex(...generateHarmony(baseRgb, 120)),
        rgbToHex(...generateHarmony(baseRgb, 240)),
      ]
      break
    case 'tetradic':
      newPalette = [
        rgbToHex(...baseRgb),
        rgbToHex(...generateHarmony(baseRgb, 90)),
        rgbToHex(...generateHarmony(baseRgb, 180)),
        rgbToHex(...generateHarmony(baseRgb, 270)),
      ]
      break
    case 'random':
      newPalette = Array(paletteSize)
        .fill(0)
        .map(() => generateRandomColor())
      break
    case 'monochromatic':
    default:
      for (let i = 0; i < paletteSize; i++) {
        // Adjust factor to avoid reaching pure white
        const factor = i / (paletteSize - 1 + 0.5) // Added 0.5 to reduce the blend towards white
        const newRgb = baseRgb.map((c) => Math.round(c + (255 - c) * factor)) as [
          number,
          number,
          number,
        ]
        newPalette.push(rgbToHex(...newRgb))
      }
      break
  }

  return newPalette
}

export const getContrastColor = (hexColor: string): string => {
  const [r, g, b] = hexToRgb(hexColor)
  return (r * 299 + g * 587 + b * 114) / 1000 > 128 ? '#000000' : '#ffffff'
}
