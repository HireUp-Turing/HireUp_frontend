import { Attribute } from "./definitions";

type attributeObject = {
  id?: number, 
  name?: string,
  attribute?: string
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


