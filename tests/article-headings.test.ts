import {describe,expect,it} from 'vitest'
import {preparePortableHeadings} from '../lib/article-headings'

describe('portable article headings',()=>{
  it('builds a nested outline with stable unique ids',()=>{
    const result=preparePortableHeadings([
      {_type:'block',_key:'heading-one',style:'h1',children:[{text:'Main body section'}]},
      {_type:'block',_key:'a',style:'h2',children:[{text:'What happened'}]},
      {_type:'block',_key:'b',style:'h3',children:[{text:'The simple answer'}]},
      {_type:'block',_key:'c',style:'h2',children:[{text:'What happened'}]},
      {_type:'block',_key:'d',style:'normal',children:[{text:'Not a heading'}]},
    ])
    expect(result.headings).toEqual([
      {id:'main-body-section',label:'Main body section',level:1},
      {id:'what-happened',label:'What happened',level:2},
      {id:'the-simple-answer',label:'The simple answer',level:3},
      {id:'what-happened-2',label:'What happened',level:2},
    ])
    expect(result.idsByKey).toEqual({'heading-one':'main-body-section',a:'what-happened',b:'the-simple-answer',c:'what-happened-2'})
  })
})
