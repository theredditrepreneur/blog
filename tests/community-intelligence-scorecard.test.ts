import {describe,expect,it} from 'vitest'
import {approvedRobloxScorecardValues,barclaysScorecard,gymsharkScorecard} from '../lib/scorecard-records'
import {calculateOverallScore,calculatePillarScore,deriveScorecard,getOverallRating,validateCriterionScores} from '../lib/community-intelligence-scorecard'

describe('nine criterion Scorecard methodology',()=>{
  it('calculates the supplied Roblox example',()=>{
    expect(calculateOverallScore({...approvedRobloxScorecardValues})).toBe(88)
    expect(getOverallRating(88)).toBe('Excellent')
  })
  it('uses exact rating boundaries',()=>{
    expect([49,50,59,60,69,70,79,80,89,90,100].map(getOverallRating)).toEqual(['At Risk','Mixed','Mixed','Developing','Developing','Strong','Strong','Excellent','Excellent','Exceptional','Exceptional'])
  })
  it('calculates each pillar from exactly three scores',()=>{
    expect(calculatePillarScore({...approvedRobloxScorecardValues},'perception')).toBe(88)
    expect(calculatePillarScore({...approvedRobloxScorecardValues},'participation')).toBe(91)
    expect(calculatePillarScore({...approvedRobloxScorecardValues},'strategicValue')).toBe(84)
  })
  it('rejects incomplete, unknown and out of range data',()=>{
    expect(()=>validateCriterionScores({})).toThrow('Missing Scorecard criteria')
    expect(()=>validateCriterionScores({...approvedRobloxScorecardValues,legacy:4})).toThrow('Unknown Scorecard criteria')
    expect(()=>validateCriterionScores({...approvedRobloxScorecardValues,brandTrust:11})).toThrow('between 0 and 10')
  })
  it('migrates Barclays and Gymshark consistently',()=>{
    expect(deriveScorecard(barclaysScorecard)).toMatchObject({overallScore:81,rating:'Excellent'})
    expect(deriveScorecard(gymsharkScorecard)).toMatchObject({overallScore:91,rating:'Exceptional'})
  })
})
