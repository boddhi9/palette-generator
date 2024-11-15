import { useCallback } from 'react'
import { Slider } from '@/components/ui/slider'

type PaletteSizeSliderProps = {
  size: number
  onChange: (size: number) => void
}

const PaletteSizeSlider = ({ size, onChange }: PaletteSizeSliderProps) => {
  const handleChange = useCallback(
    (value: number[]) => {
      onChange(value[0])
    },
    [onChange]
  )

  return (
    <div className="space-y-2">
      <label htmlFor="paletteSize" className="text-sm font-medium">
        Palette Size: {size}
      </label>
      <Slider
        id="paletteSize"
        min={3}
        max={10}
        step={1}
        value={[size]}
        onValueChange={handleChange}
      />
    </div>
  )
}

export default PaletteSizeSlider
