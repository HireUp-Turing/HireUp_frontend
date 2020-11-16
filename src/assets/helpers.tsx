import { Attribute, Applicant } from "./definitions";

type attributeObject = {
  id?: number, 
  name?: string,
  attribute?: string
}

type cleanApplicants = {
  id: number,
  username:string,
  bio:string,
  email:string,
	skills:Array<string | attributeObject>,
	values:Array<string | attributeObject> 
}

type attributes = Array<string | attributeObject>;

export const cleanAttributes = (attributes: attributes) => {
  return attributes.map((attribute:attributeObject | string):Attribute => {
    if (typeof attribute === 'string') {
      return {
        attribute
      }
    } else if (attribute.name) {
      return {
        attribute: attribute.name,
        id: attribute.id
      }
    } else {
      return attribute
    }
  })
}

export const cleanApplicant = (applicants:cleanApplicants):Applicant => {
  return {
    id: applicants.id,
    username: applicants.username,
    bio: applicants.bio,
    email: applicants.email,
    skills: cleanAttributes(applicants.skills),
    values: cleanAttributes(applicants.values)
  }
}

export const cleanApplicants = (applicants:Array<cleanApplicants>) => {
  return applicants.map((applicant:cleanApplicants) => {
    return cleanApplicant(applicant)
  })
}
