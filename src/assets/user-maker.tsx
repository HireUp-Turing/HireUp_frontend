import { getNames, getAttributes, postApplicant }from './api-calls'

const bios = [
  "I'm a wildcard", 
  "I'll rock your world with ruby and rails", 
  "Hire me and I'll make you good money",
  "If a resume falls in a mailbox and everyone's online to read it, does it make a sound?",
  "Designer of Google logo. Fascinated by ancient technology like Blockbuster. Looking for senior full stack position.",
  "Fascinated by ornithology and avian related legal needs. Author of Bird Law. Philly based. Bird attorney",
  "Bob Vance, Vance Refrigeration",
  "Based in Allen, TX. I sell propane and propane accessories.",
  "Trying to make fetch happen. My father invented the toaster strudel. Not looking for work.",
  "Enjoys working on the beach. Has sandproof laptop, needs seagull proofing.",
  "I'll hire you if you hire me first",
  "Talk about classifieds, am I right?",
  "People describe me as the essential oil to a smooth workflow",
  "Looking for work, OBO.",
  "I desinged every website you've ever been to. Looking to keep my streak going.",
  "Can work weekends, nothing esle.",
  "Has extensive expirience getting hired.",
  "I lost my job as a psychic. I did not see that coming.",
  "Getting into astronomy, my career is looking up!",
  "Used to work for Nike. Just couldn't do it anymore",
  "I'm the best maze designer in the buisiness, I'm frequently lost in my work",
  "Inspecting mirrors is a job I could really see myself doing",
  "Professional fisher, but I can't live on my net income alone",
  "My last job was helping a one-armed typist do capital letters. It was shift work.",
  "I just wrote a book on reverse psychology. Please don't read it."
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

  