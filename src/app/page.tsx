'use client'
import * as Form from '@radix-ui/react-form'
import { LoadingSpinner } from '@/components/Spinner'
import { useGenerateImg } from '@/hook/useGenerateImg'

export default function Home() {
  const {
    downloadImg,
    generateImgSujest,
    handleSubmit,
    imgs,
    isLoadingSujestImg,
    isLoadingUserCreateImg,
    placeholder,
    prompt,
    setPrompt,
  } = useGenerateImg()

  return (
    <div className="h-screen w-full bg-zinc-800 text-zinc-100 flex flex-col items-center justify-center">
      <main className="max-w-2xl w-full">
        <h1 className="text-2xl text-violet-500 font-bold mt-16">
          Descreva sua criacao em detalhes
        </h1>
        <h2 className="text-xl text-zinc-200 mt-4 mb-8">
          Gere imagens com inteligencia artifical gratuito.
        </h2>
        <Form.Root onSubmit={handleSubmit}>
          <Form.Field name="prompt">
            <Form.Control asChild>
              <textarea
                className="bg-zinc-900 border-none rounded text-zinc-50 p-4 w-full h-40 text-base"
                placeholder={placeholder || 'Deixe sua criatividade rolar'}
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
              />
            </Form.Control>
          </Form.Field>

          <Form.Submit asChild>
            <button
              className="flex items-center cursor-pointer justify-center mt-4 w-full bg-violet-500 rounded text-zinc-100 h-14 font-bold hover:bg-violet-600 transition-colors disabled:bg-violet-300 disabled:cursor-wait"
              type="submit"
              disabled={isLoadingUserCreateImg}
            >
              {isLoadingUserCreateImg ? (
                <LoadingSpinner />
              ) : (
                <span>Gerar imagem</span>
              )}
            </button>
          </Form.Submit>

          <button
            className="flex items-center cursor-pointer justify-center mt-4 w-full bg-emerald-500 rounded text-zinc-100 h-14 font-bold hover:bg-emerald-600 transition-colors disabled:bg-violet-300 disabled:cursor-wait"
            onClick={generateImgSujest}
            disabled={isLoadingSujestImg}
          >
            {isLoadingSujestImg ? (
              <LoadingSpinner />
            ) : (
              <span>Usar sujetao de imagen</span>
            )}
          </button>
        </Form.Root>

        {imgs && (
          <div className="flex items-center justify-center gap-2 flex-wrap mt-8">
            {imgs?.map((img, index) => (
              <button
                key={index}
                type="button"
                onClick={() => downloadImg(img.url)}
              >
                <img
                  className="rounded-sm overflow-hidden"
                  onClick={() => null}
                  alt={prompt}
                  src={img.url}
                />
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
