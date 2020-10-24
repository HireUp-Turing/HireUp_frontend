import applicant from './applicant'
import searchResults from './searchResults'
import home from './home'

// assigne cp
export const routes = Object.assign(applicant, searchResults, home)

// or

// export const routes = [applicant, searchResults]
