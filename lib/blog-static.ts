import type { BlogMeta } from '@/lib/blog'

export const blogPreviewPosts: BlogMeta[] = [
  {
    slug: 'rag-retrieval-augmented-generation',
    title: "RAG nədir və LLM-i necə 'yalan danışmamağa' kömək edir?",
    date: '2026-06-03',
    tags: ['RAG', 'LLM', 'AI', 'Vector Database', 'GenAI'],
    summary:
      'Retrieval-Augmented Generation (RAG) LLM-lərin halüsinasiya problemini həll etmək üçün xarici bilik bazasından məlumat çəkib modelin kontekstinə əlavə edən bir arxitekturadır.',
  },
  {
    slug: 'boyuk-dil-modelleri-llm',
    title: 'Böyük Dil Modelləri (LLM)',
    date: '2026-06-02',
    tags: ['LLM', 'AI', 'Transformer', 'Neural Networks', 'GenAI'],
    summary:
      'LLM-lərin nə olduğu, parametrlər və neyron şəbəkələri, transformer arxitekturası, təlim mərhələləri (pre-training, fine-tuning, RLHF) və əsas məhdudiyyətlər haqqında ətraflı baxış.',
  },
  {
    slug: 'suni-intellekt-ml-dl-genai-baxis',
    title: 'Süni İntellekt, Maşın Öyrənməsi, Dərin Öyrənmə və Generativ Süni İntellektə Baxış',
    date: '2026-06-01',
    tags: ['AI', 'Machine Learning', 'Deep Learning', 'GenAI', 'LLM'],
    summary:
      'AI, ML, DL və GenAI anlayışlarının bir-biri ilə əlaqəsi, ənənəvi ML ilə generativ modellər arasındakı fərq və LLM-lərin rolu haqqında ümumi baxış.',
  },
  {
    slug: 'niye-virtual-dom',
    title: 'Niyə Virtual DOM yaranıb?',
    date: '2025-12-15',
    tags: ['Virtual DOM', 'Browser', 'Performance', 'React'],
    summary: 'Bu məqalə Virtual DOM-un yaranma səbəbləri və brauzerin məzmunu necə anladığı haqqındadır.',
  },
  {
    slug: 'react-key-ne-ucundur',
    title: 'React-də `key` nə üçündür və niyə vacibdir?',
    date: '2025-12-15',
    tags: ['React', 'Virtual DOM', 'Reconciliation', 'Performance'],
    summary:
      '`key` anlayışı React-in diff və reconciliation mexanizminin əsas hissəsidir. Bu məqalədə düzgün və səhv istifadənin nəticələri izah olunur.',
  },
  {
    slug: 'browser-render-pipeline',
    title: 'Brauzer HTML-i DOM-a necə çevirir (render pipeline)',
    date: '2025-12-05',
    tags: ['Browser', 'DOM', 'Render pipeline', 'Performance'],
    summary:
      'Bu məqalə brauzerin HTML-i necə oxuyub DOM-a çevirdiyini və sonradan ekrana necə çəkdiyini addım-addım izah edir.',
  },
]
