import { useCallback } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ColorHarmony } from '@/types/color'

type HarmonySelectorProps = {
  harmony: ColorHarmony
  onChange: (harmony: ColorHarmony) => void
}

const HarmonySelector = ({ harmony, onChange }: HarmonySelectorProps) => {
  const handleChange = useCallback(
    (value: string) => {
      onChange(value as ColorHarmony)
    },
    [onChange]
  )

  return (
    <Select value={harmony} onValueChange={handleChange}>
      <SelectTrigger className="w-full h-[40px]">
        <SelectValue placeholder="Select harmony" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="monochromatic">Monochromatic</SelectItem>
        <SelectItem value="analogous">Analogous</SelectItem>
        <SelectItem value="complementary">Complementary</SelectItem>
        <SelectItem value="triadic">Triadic</SelectItem>
        <SelectItem value="tetradic">Tetradic</SelectItem>
        <SelectItem value="random">Random</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default HarmonySelector
