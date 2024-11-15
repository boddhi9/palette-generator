import { useCallback, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Clipboard } from 'lucide-react'
import { hexToRgb, rgbToHsl } from '@/lib/colorUtils'
import { toast } from '@/hooks/use-toast'

type CopyButtonsProps = {
  palette: string[]
}

const CopyButtons = ({ palette }: CopyButtonsProps) => {
  const [copying, setCopying] = useState(false)

  const copyToClipboard = useCallback(
    (format: 'hex' | 'rgb' | 'hsl') => {
      let text = ''
      switch (format) {
        case 'hex':
          text = palette.join(', ')
          break
        case 'rgb':
          text = palette
            .map((color) => {
              const [r, g, b] = hexToRgb(color)
              return `rgb(${r}, ${g}, ${b})`
            })
            .join(', ')
          break
        case 'hsl':
          text = palette
            .map((color) => {
              const [r, g, b] = hexToRgb(color)
              const [h, s, l] = rgbToHsl(r, g, b)
              return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
            })
            .join(', ')
          break
      }
      navigator.clipboard.writeText(text)
      setCopying(true)
      setTimeout(() => setCopying(false), 500)
      toast({
        title: 'Copied to clipboard',
        description: `Palette copied in ${format.toUpperCase()} format.`,
      })
    },
    [palette]
  )

  return (
    <Tabs defaultValue="hex" className="w-1/2">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="hex">HEX</TabsTrigger>
        <TabsTrigger value="rgb">RGB</TabsTrigger>
        <TabsTrigger value="hsl">HSL</TabsTrigger>
      </TabsList>
      <TabsContent value="hex">
        <Button onClick={() => copyToClipboard('hex')} className="w-full relative overflow-hidden">
          <span
            className={`absolute inset-0 bg-white/20 transition-transform duration-300 ease-out ${copying ? 'translate-y-0' : 'translate-y-full'}`}
          />
          <Clipboard className="w-4 h-4 mr-2" />
          Copy HEX Values
        </Button>
      </TabsContent>
      <TabsContent value="rgb">
        <Button onClick={() => copyToClipboard('rgb')} className="w-full relative overflow-hidden">
          <span
            className={`absolute inset-0 bg-white/20 transition-transform duration-300 ease-out ${copying ? 'translate-y-0' : 'translate-y-full'}`}
          />
          <Clipboard className="w-4 h-4 mr-2" />
          Copy RGB Values
        </Button>
      </TabsContent>
      <TabsContent value="hsl">
        <Button onClick={() => copyToClipboard('hsl')} className="w-full relative overflow-hidden">
          <span
            className={`absolute inset-0 bg-white/20 transition-transform duration-300 ease-out ${copying ? 'translate-y-0' : 'translate-y-full'}`}
          />
          <Clipboard className="w-4 h-4 mr-2" />
          Copy HSL Values
        </Button>
      </TabsContent>
    </Tabs>
  )
}

export default CopyButtons
