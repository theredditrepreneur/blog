import type {Industry} from '@/lib/industries'

export function IndustryIcon({industry}:{industry:Industry}) {
  const common = {width: 36, height: 36, viewBox: '0 0 36 36', fill: 'none', 'aria-hidden': true} as const
  if (industry.icon === 'controller') return <svg {...common}><path d="M10 14h16c4 0 7 4 7 9s-3 8-6 8c-3 0-4-4-6-4h-6c-2 0-3 4-6 4-4 0-6-3-6-8s3-9 7-9Z"/><path d="M10 19v7M6.5 22.5h7M25 20h.1M29 24h.1"/></svg>
  if (industry.icon === 'spark') return <svg {...common}><path d="m18 3 2.8 9.2L30 15l-9.2 2.8L18 27l-2.8-9.2L6 15l9.2-2.8L18 3Z"/><path d="m28 25 1.2 3.8L33 30l-3.8 1.2L28 35l-1.2-3.8L23 30l3.8-1.2L28 25Z"/></svg>
  if (industry.icon === 'ball') return <svg {...common}><circle cx="18" cy="18" r="14"/><path d="m18 11 6 4-2 7h-8l-2-7 6-4ZM18 11V4M12 15 5 13M14 22l-4 7M22 22l4 7M24 15l7-2"/></svg>
  if (industry.icon === 'window') return <svg {...common}><rect x="4" y="6" width="28" height="24" rx="2"/><path d="M4 12h28M10 9h.1M15 9h.1M8 18h8v7H8M20 18h8M20 23h8"/></svg>
  if (industry.icon === 'bag') return <svg {...common}><path d="M6 12h24l-2 20H8L6 12Z"/><path d="M12 14V9a6 6 0 0 1 12 0v5"/></svg>
  return <svg {...common}><rect x="4" y="6" width="28" height="21" rx="2"/><path d="m15 12 8 5-8 5V12ZM12 32h12M18 27v5"/></svg>
}
