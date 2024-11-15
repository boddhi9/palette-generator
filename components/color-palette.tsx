import { useCallback } from 'react'
import { getContrastColor } from '@/lib/colorUtils'
import { toast } from '@/hooks/use-toast'

type ColorPaletteProps = {
  palette: string[]
}

const ColorPalette = ({ palette }: ColorPaletteProps) => {
  const handleColorClick = useCallback((color: string) => {
    navigator.clipboard.writeText(color)
    toast({
      title: `${color} has been copied to your clipboard.`,
    })
  }, [])

  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-2 mt-6">
      {palette.map((color, index) => (
        <div key={`${color}-${index}`} className="relative group">
          <div
            className="w-16 h-16 rounded-lg shadow-lg flex items-center justify-center text-xs font-mono cursor-pointer transition-transform transform group-hover:scale-105"
            style={{ backgroundColor: color, color: getContrastColor(color) }}
            onClick={() => handleColorClick(color)}
          >
            {color}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ColorPalette
