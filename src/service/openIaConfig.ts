import { Configuration, OpenAIApi } from 'openai'

export function openIaConfig() {
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  })

  delete configuration.baseOptions.headers['User-Agent']

  const openai = new OpenAIApi(configuration)

  return {
    openai,
  }
}
