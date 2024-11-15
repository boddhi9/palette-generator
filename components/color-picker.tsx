import { useCallback } from 'react'
import { Input } from '@/components/ui/input'

type ColorPickerProps = {
  color: string
  onChange: (color: string) => void
}

const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const handleColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  return (
    <>
      <Input
        type="color"
        value={color}
        onChange={handleColorChange}
        className="w-12 h-12 p-1 hover:shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-shadow duration-150 cursor-pointer"
      />

      <Input
        type="text"
        value={color}
        onChange={handleColorChange}
        className="w-24 px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-150"
        placeholder="Enter hex"
        maxLength={7}
      />
    </>
  )
}

export default ColorPicker
