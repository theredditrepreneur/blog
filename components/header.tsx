import Image from 'next/image'
import Link from 'next/link'
import {nav} from '@/lib/site'
import {industries} from '@/lib/industries'

function IndustryMenu(){return <details className="industry-menu"><summary>Industries</summary><div>{industries.map(industry=><Link key={industry.slug} href={`/industries/${industry.slug}`}><strong>{industry.name}</strong><span>{industry.description}</span></Link>)}</div></details>}

export function Header() {
  const directNav=nav.filter(([label])=>label!=='Industries')
  return <header className="site-header">
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="header-inner">
      <Link className="brand" href="/" aria-label="The Redditrepreneur Research home">
        <Image src="/redditrepreneur-logo.png" width={232} height={95} alt="The Redditrepreneur Research" priority />
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/research">Research</Link><IndustryMenu/>{directNav.filter(([label])=>label!=='Research').map(([label,href])=><Link key={href} href={href}>{label}</Link>)}
      </nav>
      <details className="mobile-menu">
        <summary aria-label="Open navigation">Menu</summary>
        <nav aria-label="Mobile navigation">
          {nav.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}
          <div className="mobile-industries">{industries.map(industry=><Link key={industry.slug} href={`/industries/${industry.slug}`}>{industry.name}</Link>)}</div>
        </nav>
      </details>
    </div>
  </header>
}
