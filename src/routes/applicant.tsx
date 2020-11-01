import Applicant from '../components/Applicant/Applicant'
import ApplicantForm from '../components/ApplicantForm/ApplicantForm'
import Inbox from '../components/Inbox/Inbox'

export default {
  applicant: {
    path: '/applicant/:id/',
    component: Applicant,
	},
	applicantForm: {
		path: '/create-applicant',
		component: ApplicantForm
	},
	applicantInbox: {
		path: '/applicant/:id/inbox',
		component: Inbox
	}
}