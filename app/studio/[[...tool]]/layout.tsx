import type {Metadata} from 'next'

export const metadata:Metadata={
  title:'Editorial Studio | The Redditrepreneur',
  description:'The editorial publishing workspace for The Redditrepreneur Research.',
  robots:{index:false,follow:false},
}

export default function StudioLayout({children}:{children:React.ReactNode}){
  return children
}
