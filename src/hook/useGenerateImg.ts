import { openIaConfig } from '@/service/openIaConfig'
import { ImagesResponseDataInner } from 'openai'
import { FormEvent, useCallback, useEffect, useState } from 'react'
import { saveAs } from 'file-saver'

export function useGenerateImg() {
  const [placeholder, setPlaceholder] = useState<string | null>(null)
  const [imgs, setImgs] = useState<ImagesResponseDataInner[]>()
  const [isLoadingUserCreateImg, setIsLoadingUserCreateImg] = useState(false)
  const [isLoadingSujestImg, setIsLoadingSujestImg] = useState(false)
  const [prompt, setPrompt] = useState('')
  const { openai } = openIaConfig()

  async function generateImgSujest() {
    if (placeholder) {
      setIsLoadingSujestImg(true)

      await handleGenerateImg(placeholder)

      setIsLoadingSujestImg(false)
    }
  }

  const sujestCreateImg = useCallback(async () => {
    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        max_tokens: 100,
        temperature: 0.8,
        messages: [
          {
            role: 'assistant',
            content:
              'escreva um prompt de texto aleatório para o DALL-E gerar uma imagem, esse prompt será mostrado ao usuário, inclua detalhes como fundo, ação para o sujeito da imagem',
          },
        ],
      })

      const responseText = response.data.choices[0].message?.content

      if (responseText) {
        setPlaceholder(responseText)
      }
    } catch (err) {
      console.log(err)
    }
  }, [openai])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      setIsLoadingUserCreateImg(true)

      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        max_tokens: 150,
        temperature: 0.8,
        messages: [
          {
            role: 'assistant',
            content: `escreva um prompt de texto para o DALL-E gerar uma imagem, usando essa frase ${prompt}, esse prompt será mostrado ao usuário, inclua detalhes como fundo, ação para o sujeito da imagem`,
          },
        ],
      })

      const responseText = response.data.choices[0].message?.content

      console.log(responseText)

      if (responseText) {
        await handleGenerateImg(responseText)
      }
    } catch {
      console.log('deu ruim na geracao da img')
    } finally {
      setIsLoadingUserCreateImg(false)
    }
  }

  async function handleGenerateImg(text: string) {
    try {
      const response = await openai.createImage({
        prompt: text,
        n: 2,
        size: '256x256',
      })

      setImgs(response.data.data)
    } catch (err) {
      console.log('deu ruim', err)
    }
  }

  function downloadImg(urlImg?: string) {
    if (urlImg) {
      saveAs(urlImg, 'img-01')
    }
  }

  useEffect(() => {
    sujestCreateImg()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    generateImgSujest,
    imgs,
    downloadImg,
    handleSubmit,
    isLoadingUserCreateImg,
    isLoadingSujestImg,
    placeholder,
    prompt,
    setPrompt,
  }
}
