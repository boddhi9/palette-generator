import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

type DownloadButtonProps = {
  palette: string[]
}

const DownloadButton = ({ palette }: DownloadButtonProps) => {
  const downloadPalette = useCallback(() => {
    const text = palette.map((color, index) => `Color ${index + 1}: ${color}`).join('\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'color-palette.txt'
    a.click()
    URL.revokeObjectURL(url)
  }, [palette])

  return (
    <Button onClick={downloadPalette} className="w-1/2">
      <Download className="w-4 h-4 mr-2" />
      Download Palette
    </Button>
  )
}

export default DownloadButton
