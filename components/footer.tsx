import Link from 'next/link'
import {nav, site} from '@/lib/site'

export function Footer() {
  return <footer>
    <div className="footer-intro"><strong>The Home of Community Intelligence.</strong><p>Original research that turns online conversations into competitive advantage.</p></div>
    <div className="footer-grid">
      <div><h2>Explore</h2>{nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
      <div><h2>The Redditrepreneur</h2><a href={site.main}>Main website</a><a href={site.app}>Platform</a><a href={site.audit}>Community Intelligence Audit</a><Link href="/about">About</Link></div>
      <div><h2>Trust</h2><Link href="/editorial-policy">Editorial policy</Link><Link href="/research-methodology">Research methodology</Link><Link href="/corrections-policy">Corrections policy</Link><Link href="/source-and-citation-policy">Sources and citations</Link></div>
      <div><h2>Follow</h2><a href="https://www.linkedin.com/company/the-redditrepreneur/">LinkedIn</a><a href="https://x.com/Redditrepreneur">X</a><a href="https://www.youtube.com/@theredditrepreneur">YouTube</a><a href="https://www.tiktok.com/@redditrepreneur">TikTok</a></div>
    </div>
    <div className="footer-base"><span>© {new Date().getFullYear()} The Redditrepreneur</span><Link href="/privacy">Privacy</Link><Link href="/cookies">Cookies</Link><Link href="/terms">Terms</Link></div>
  </footer>
}
