import Link from 'next/link'

const footerLinks=[['Research','/research'],['Gaming','/industries/gaming'],['AI','/industries/ai'],['Sport','/industries/sport'],['SaaS','/industries/saas'],['Consumer Brands','/industries/consumer-brands'],['Entertainment','/industries/entertainment'],['Frameworks','/frameworks'],['About','/about'],['RSS','/rss.xml'],['Search','/search']] as const

export function Footer({statement,publicationName='The Redditrepreneur Research'}:{statement?:string,publicationName?:string}) {
  return <footer className="publication-footer">
    <div className="footer-intro"><strong>{statement||"The Redditrepreneur publishes Community Intelligence for the world's most important industries."}</strong></div>
    <nav className="publication-footer-links" aria-label="Footer navigation">{footerLinks.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}</nav>
    <div className="footer-base"><span>© {new Date().getFullYear()} {publicationName}</span><Link href="/editorial-policy">Editorial policy</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
  </footer>
}
