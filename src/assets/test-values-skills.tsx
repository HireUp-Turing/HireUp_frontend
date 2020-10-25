export const skillsData = [
  'creativity', 
  'communication', 
  'critical thinking', 
  'problem solving', 
  'public speaking',
  'customer service',
  'teamwork',
  'communication',
  'accounting',
  'active listening',
  'adaptability',
  'negotiation',
  'conflict resolution',
  'decision-making',
  'empathy',
  'customer service',
  'decision making',
  'management',
  'leadership',
  'organization',
  'foreign languages',
  'social media',
  'teaching',
  'design',
  'project management',
  'computer technology',
  'accounting',
  'business & data analysis',
  'nursing',
  'economics',
  'automotive services',
  'SEO/SEM marketing',
  'cloud and distributed',
  'data presentation'
]
// .map(skill => (
  // {attribute: skill, checked: false}
// ))

export const valuesData = [
  //team values
  'engages with community',
  'team is diverse',
  'continuous feedback',
  'impressive team members',
  'bonded by love for product',
  'creative & innovative',
  'cross-department collaboration',
  'open communication',
  'eq > iq',
  'flat organization',
  'risk-taking > stability',
  'wears many hats',
  'heavily team oriented',
  //career growth
  'promotes from within',
  'internal mobility',
  'good for juniors',
  'has internships',
  'high employee retention',
  //personal health
  'actively practices inclusion',
  'work/life balance',
  'committed to personal growth',
  'ideal for parents',
  'safe environment to fail',
  'supports physical wellness',
  'fosters psychological',
  //daily routines
  'eats lunch together',
  'flexible work arrangements',
  'light meetings',
  'friends outside of work',
  'has good beer',
  'thoughtful office layout',
  //strategy
  'customer first',
  'engineering-driven',
  'product-driven',
  'design-driven',
  'data-driven',
  'rapidly growing team',
  // company properties
  'B2B',
  'B2C',
  'self-funded',
  'technical founder(s)',
  'PBC / B-CORP'
]
// .map(skill => (
  // {attribute: skill, checked: false}
// ))


// const Search: React.FC = () => {
// 	const [values, setValues] = useState<Array<string>>([])
// 	const [skills, setSkills] = useState<Array<string>>([])

// 	const setOption = (event: {target: HTMLInputElement}) => {
// 		const type = event.target.id.split('-')[0]
// 		const attribute = event.target.value
// 		const state = type === 'skill' ? skills : values
// 		if (state.includes(attribute)) {
// 			const index = state.indexOf(attribute)
// 			console.log(index)
// 			state.splice(index, 1)
// 		} else {
// 			state.push(attribute)	
// 		}
// 		type === 'skill' ? setSkills(state) : setValues(state)
// 	}

// 	const checkIfSelected = (attribute:string, type:string): boolean => {
// 		const state = type === 'skill' ? skills : values 
// 		return state.includes(attribute)
// 	}

// 	const makeOptions = (options:Array<string>, type:string) => {
// 		return options.map((attribute: any, i) => {
// 			const isChecked: boolean = checkIfSelected(attribute, type)
// 			return (
// 				<div className="option" key={`${type}-option-${i}`}>
// 					<input 
// 						id={`${type}-option-${i}`} 
// 						type="radio" 
// 						value={attribute} 
// 						onChange={setOption}
// 						checked={isChecked}				
// 					/>
// 					<label htmlFor={`option-${i}`}>{attribute}</label>
// 				</div>
// 			)
// 		})
// 	}
