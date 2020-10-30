import { getNames, getAttributes, postApplicant }from './api-calls'

const bios = [
  "I'm a wildcard", 
  "I'll rock your world with ruby and rails", 
  "Hire me and I'll make you good money",
  "If a resume falls in a mailbox and everyone's online to read it, does it make a sound?"
]
const skills = getAttributes('skills').then(atts => atts.data)
const values = getAttributes('values').then(atts => atts.data)

export const postUsers = (n?:number) => {
  n = n ? n : 1
  for (let i = 0; i < n; i++) {
    makeUser().then(user => postApplicant(user))
  }
}

const randomAttributes = (type:[any]) => {
  let indexVals = []
  for(let i = 0; i < randomNumber(undefined, 1); i++) {
    indexVals.push(randomNumber(type.length - 1))
  }
  indexVals = indexVals.reduce((singles:any, val) => {
    if (!singles.includes(val)) {
      singles.push(val)
    } 
    return singles
  }, [])
  return indexVals.map((index:any) => type[index].id)
}

const randomNumber = (limit?: number, x?: number) => {
  x = x ? x : 1
  return Math.round(Math.random() * ((limit ? limit : 10) - x) + x)
}

export const makeUser = async () => {
    const first = await getNames('')
    const last = await getNames('?type=surname')
    return {
      "username": await getNames(),
      "first_name": first,
      "last_name": last,
      "email": first + last + '@hireup.com',
      "bio": bios[randomNumber(bios.length)],
      "skills": randomAttributes(await skills),
      "values": randomAttributes(await values)
    }
  }

  