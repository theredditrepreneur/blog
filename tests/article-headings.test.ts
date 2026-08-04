import {describe,expect,it} from 'vitest'
import {preparePortableHeadings} from '../lib/article-headings'

describe('portable article headings',()=>{
  it('builds a nested outline with stable unique ids',()=>{
    const result=preparePortableHeadings([
      {_type:'block',_key:'a',style:'h2',children:[{text:'What happened'}]},
      {_type:'block',_key:'b',style:'h3',children:[{text:'The simple answer'}]},
      {_type:'block',_key:'c',style:'h2',children:[{text:'What happened'}]},
      {_type:'block',_key:'d',style:'normal',children:[{text:'Not a heading'}]},
    ])
    expect(result.headings).toEqual([
      {id:'what-happened',label:'What happened',level:2},
      {id:'the-simple-answer',label:'The simple answer',level:3},
      {id:'what-happened-2',label:'What happened',level:2},
    ])
    expect(result.idsByKey).toEqual({a:'what-happened',b:'the-simple-answer',c:'what-happened-2'})
  })
})
