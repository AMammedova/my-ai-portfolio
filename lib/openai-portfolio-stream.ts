/** Parses OpenAI chat completions SSE stream (`data: {...}` lines). */
export async function consumeOpenAIChatStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  onDelta: (chunk: string) => void,
): Promise<void> {
  const decoder = new TextDecoder()
  let buffer = ''

  const flushLine = (line: string) => {
    const trimmed = line.trim()
    if (!trimmed.startsWith('data:')) return
    const data = trimmed.slice(5).trim()
    if (data === '[DONE]') return
    try {
      const json = JSON.parse(data) as {
        choices?: Array<{ delta?: { content?: string | null } }>
      }
      const content = json.choices?.[0]?.delta?.content
      if (typeof content === 'string' && content.length > 0) onDelta(content)
    } catch {
      // ignore partial JSON lines
    }
  }

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''
    for (const line of lines) flushLine(line)
  }

  for (const line of buffer.split('\n')) flushLine(line)
}
