import Applicant from '../components/Applicant/Applicant'
import ApplicantForm from '../components/ApplicantForm/ApplicantForm'

export default {
  applicant: {
    path: '/applicant/:id/',
    component: Applicant,
	},
	applicantForm: {
		path: '/create-applicant',
		component: ApplicantForm
	}
}