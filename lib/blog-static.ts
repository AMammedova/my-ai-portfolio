import type { BlogMeta } from '@/lib/blog'

export const blogPreviewPosts: BlogMeta[] = [
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
