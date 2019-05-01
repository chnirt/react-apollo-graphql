import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Breadcrumb } from 'antd'
// import { routes } from '../routes';

const breadcrumbNameMap = {
	'/': 'dashboard',
	'/login': 'login',
	'/register': 'register',
	'/members': 'members',
	'/posts': 'posts',
	'/likes': 'likes',
	'/profile': 'profiles',
	'/updateinformation': 'updateinformation',
	'/changepassword': 'changepassword'
}

const Breadcumblayout = props => {
	const { location } = props
	const pathSnippets = location.pathname.split('/').filter(i => i)

	const extraBreadcrumbItems = pathSnippets.map((_, index) => {
		const url = `/${pathSnippets.slice(0, index + 1).join('/')}`

		const validateUrl = `${pathSnippets.slice(0, index + 1)}`
		if (!Object.values(breadcrumbNameMap).indexOf(validateUrl) > -1) {
			return null
		}
		return (
			<Breadcrumb.Item key={url}>
				<Link to={url}>{breadcrumbNameMap[url].toUpperCase()}</Link>
			</Breadcrumb.Item>
		)
	})
	const breadcrumbItems = [
		<Breadcrumb.Item key="/">
			<Link to="/">{breadcrumbNameMap['/'].toUpperCase()}</Link>
		</Breadcrumb.Item>
	].concat(extraBreadcrumbItems)

	return (
		<Breadcrumb style={{ margin: '16px 16px' }}>{breadcrumbItems}</Breadcrumb>
	)
}

export default withRouter(Breadcumblayout)
