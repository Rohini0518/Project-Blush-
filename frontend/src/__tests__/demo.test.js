import {expect, test} from 'vitest'
import { sum } from './sum'

test(" sum test",()=>{
  expect(sum(2,4)).toBe(6)
})