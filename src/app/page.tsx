"use client"

import { FormEvent, useState } from "react"
import * as Form from '@radix-ui/react-form';
import { openIaConfig } from "@/service/openIaConfig"
import { ImagesResponseDataInner } from "openai";
import { LoadingSpinner } from "@/components/Spinner";
import {saveAs} from "file-saver"

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [imgs, setImgs] = useState<ImagesResponseDataInner[]>()
  const [isLoading, setIsLoading] = useState(false)
  const { openai } = openIaConfig()

  async function handleGenerateImg(event: FormEvent) {
    event.preventDefault()
    
    try {
      setIsLoading(true)
      const response = await openai.createImage({
        prompt,
        n: 4,
        size: '256x256'
      })

      setImgs(response.data.data)
    }catch(err){
      console.log('deu ruim', err)
    }finally {
      setIsLoading(false)
    }
  }

  function downloadImg(urlImg?: string){
    if(urlImg){
      saveAs(urlImg, 'img-01')
    }
  }

  return (
    <div className="h-screen w-full bg-zinc-800 text-zinc-100 flex flex-col items-center justify-center">
      <main className="max-w-2xl w-full">
        <h1 className="text-2xl text-violet-500 font-bold mt-16">Descreva sua criacao em detalhes</h1>
        <h2 className="text-xl text-zinc-200 mt-4 mb-8">Gere imagens com inteligencia artifical gratuito.</h2>
        <Form.Root onSubmit={handleGenerateImg}>
          <Form.Field name="prompt">
            <Form.Control asChild>
              <input 
                className="bg-zinc-900 border-none rounded text-zinc-100 p-1 w-full h-14 text-base" 
                placeholder="Deixe sua criatividade rolar" 
                value={prompt} 
                onChange={event => setPrompt(event.target.value)} 
              />
            </Form.Control>
          </Form.Field>

          
          
          <Form.Submit asChild>
            <button
              className="flex items-center cursor-pointer justify-center mt-4 w-full bg-violet-500 rounded text-zinc-100 h-14 font-bold hover:bg-violet-600 transition-colors disabled:bg-violet-300 disabled:cursor-wait" 
              type="submit"
              disabled={isLoading}
            >
              {
                isLoading ? <LoadingSpinner /> : <span>Gerar imagem</span>
              }  
            </button>
          </Form.Submit>
        </Form.Root>

        {
          imgs && (
            <div className="flex items-center justify-center gap-2 flex-wrap mt-8">
              {
                imgs?.map((img, index) => (
                    <button key={index} type="button" onClick={() => downloadImg(img.url)}>
                      <img className="rounded-sm overflow-hidden" onClick={() => null} alt={prompt} src={img.url} />
                    </button>
                ))
              }
            </div>
          )
        }
      </main>
    </div>
    
  )
}
