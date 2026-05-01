// Typing animation configuration and utilities

export const TYPING_CONFIG = {
  CHAR_DELAY: 8, // ms between each character
  FIRST_MESSAGE_DELAY: 280, // ms before first message starts typing
  CURSOR_BLINK_SPEED: 530, // ms for cursor blink animation
  MESSAGE_STAGGER: 35, // ms delay between messages
}

// Simulates typing effect by revealing text character by character
export async function simulateTyping(
  text: string,
  onCharacter: (char: string, index: number) => void,
  startDelay: number = 0
): Promise<void> {
  if (startDelay > 0) {
    await new Promise(resolve => setTimeout(resolve, startDelay))
  }

  for (let i = 0; i < text.length; i++) {
    onCharacter(text[i], i)
    await new Promise(resolve => setTimeout(resolve, TYPING_CONFIG.CHAR_DELAY))
  }
}

// Formats a response into chunks for multi-message display
export function formatResponseChunks(
  intro: string,
  content: string,
  suggestion?: string
): Array<{ text: string; type: 'intro' | 'content' | 'suggestion' }> {
  const chunks: Array<{ text: string; type: 'intro' | 'content' | 'suggestion' }> = []

  if (intro) chunks.push({ text: intro, type: 'intro' })
  if (content) chunks.push({ text: content, type: 'content' })
  if (suggestion) chunks.push({ text: suggestion, type: 'suggestion' })

  return chunks
}

// Calculate staggered delay for multi-message animations
export function getMessageDelay(messageIndex: number): number {
  if (messageIndex === 0) {
    return TYPING_CONFIG.FIRST_MESSAGE_DELAY
  }
  // Each subsequent message waits for previous one plus stagger
  return (messageIndex * TYPING_CONFIG.MESSAGE_STAGGER)
}

// CSS keyframes for cursor blinking animation
export const cursorStyles = `
  @keyframes blink {
    0%, 49%, 100% { opacity: 1; }
    50%, 99% { opacity: 0; }
  }

  .typing-cursor {
    display: inline-block;
    width: 2px;
    height: 1em;
    background-color: currentColor;
    margin-left: 2px;
    animation: blink ${TYPING_CONFIG.CURSOR_BLINK_SPEED}ms infinite;
  }

  .blinking-input::placeholder {
    animation: blink ${TYPING_CONFIG.CURSOR_BLINK_SPEED}ms infinite;
  }
`

// Typing indicator animation (dots)
export const typingIndicatorStyles = `
  @keyframes typing {
    0%, 60%, 100% { opacity: 0.5; transform: translateY(0); }
    30% { opacity: 1; transform: translateY(-10px); }
  }

  .typing-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: currentColor;
    margin: 0 3px;
    animation: typing 1.4s infinite;
  }

  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }
`

// Glow effect for active chat
export const glowStyles = `
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
    50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.8); }
  }

  .chat-glow {
    animation: glow 2s ease-in-out infinite;
  }

  .chat-glow-pulse {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
  }
`
