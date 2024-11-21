'use client'

import { useReducer, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Action, ColorHarmony, State } from '@/types/color'
import { generatePalette, generateRandomColor } from '@/lib/colorUtils'
import ColorPicker from './color-picker'
import HarmonySelector from './harmony-selector'
import PaletteSizeSlider from './palette-size-slider'
import ColorPalette from './color-palette'
import CopyButtons from './copy-buttons'
import DownloadButton from './download-button'

const initialState: State = {
  baseColor: '#3498db',
  paletteSize: 5,
  harmony: 'monochromatic',
  palette: [],
  copying: false,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_BASE_COLOR':
      if (state.baseColor === action.payload) return state;
      return { ...state, baseColor: action.payload };
    case 'SET_PALETTE_SIZE':
      if (state.paletteSize === action.payload) return state;
      return { ...state, paletteSize: action.payload };
    case 'SET_HARMONY':
      if (state.harmony === action.payload) return state;
      return { ...state, harmony: action.payload };
    case 'SET_PALETTE':
      return { ...state, palette: action.payload };
    case 'SET_COPYING':
      if (state.copying === action.payload) return state;
      return { ...state, copying: action.payload };
    default:
      return state;
  }
}

const ColorPaletteGenerator = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const updateBaseColor = useCallback((color: string) => {
    dispatch({ type: 'SET_BASE_COLOR', payload: color })
  }, [])

  const updateHarmony = useCallback((harmony: ColorHarmony) => {
    dispatch({ type: 'SET_HARMONY', payload: harmony })
  }, [])

  const updatePaletteSize = useCallback((size: number) => {
    dispatch({ type: 'SET_PALETTE_SIZE', payload: size })
  }, [])

  const generateRandomBaseColor = useCallback(() => {
    const randomColor = generateRandomColor()
    dispatch({ type: 'SET_BASE_COLOR', payload: randomColor })
  }, [])

  useEffect(() => {
    const newPalette = generatePalette(state.baseColor, state.paletteSize, state.harmony)
    dispatch({ type: 'SET_PALETTE', payload: newPalette })
  }, [state.baseColor, state.paletteSize, state.harmony])

  return (
    <Card className="w-full max-w-6xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold bg-clip-text">Palette Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 space-y-4">
            <div className="flex items-center space-x-2">
              <ColorPicker color={state.baseColor} onChange={updateBaseColor} />
              <div className="flex-1 flex space-x-2">
                <HarmonySelector harmony={state.harmony} onChange={updateHarmony} />
                <button
                  onClick={generateRandomBaseColor}
                  className="h-[40px] px-4 py-2 text-sm bg-gray-800 text-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 ease-in-out flex-none w-[150px]" // Specify width
                >
                  Random color
                </button>
              </div>
            </div>
            {state.harmony === 'monochromatic' && (
              <PaletteSizeSlider size={state.paletteSize} onChange={updatePaletteSize} />
            )}
          </div>
        </div>
        <ColorPalette palette={state.palette} />
        <div className="flex space-x-4 items-end">
          <CopyButtons palette={state.palette} />
          <DownloadButton palette={state.palette} />
        </div>
      </CardContent>
    </Card>
  )
}

export default ColorPaletteGenerator
