export type ColorHarmony =
  | 'analogous'
  | 'complementary'
  | 'triadic'
  | 'tetradic'
  | 'monochromatic'
  | 'random'

export type State = {
  baseColor: string
  paletteSize: number
  harmony: ColorHarmony
  palette: string[]
  copying: boolean
}

export type Action =
  | { type: 'SET_BASE_COLOR'; payload: string }
  | { type: 'SET_PALETTE_SIZE'; payload: number }
  | { type: 'SET_HARMONY'; payload: ColorHarmony }
  | { type: 'SET_PALETTE'; payload: string[] }
  | { type: 'SET_COPYING'; payload: boolean }
