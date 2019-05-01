import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import { headerRoutes } from '../routes'
import Auth from '../auth/Authenticate'

const { Header } = Layout

const SubMenu = Menu.SubMenu

const Headerlayout = props => {
	const { location, history } = props
	function onLogout() {
		Auth.logout(() => {
			localStorage.removeItem('token')
			history.push('/login')
		})
	}
	return (
		<Header
			id="components-layout-demo-fixed"
			style={{
				background: '#ffff',
				position: 'fixed',
				zIndex: '1',
				width: '100%',
				boxShadow: '0px 0px 5px 0px rgba(50, 50, 50, 0.75)'
			}}
		>
			<div className="logo" />
			<Menu
				mode="horizontal"
				style={{ float: 'right', lineHeight: '62px' }}
				defaultSelectedKeys={[location.pathname]}
				selectable={false}
			>
				<SubMenu
					key="sub1"
					title={<Icon type="user" style={{ marginRight: '0px' }} />}
				>
					{headerRoutes &&
						headerRoutes.map((headerRoute, i) => (
							<Menu.Item key={i}>
								<Link to={headerRoute.path}>
									{headerRoute.label.toUpperCase()}
								</Link>
							</Menu.Item>
						))}
					<Menu.Divider />
					<Menu.Item onClick={() => onLogout()}>LOG OUT</Menu.Item>
				</SubMenu>
			</Menu>
		</Header>
	)
}

export default withRouter(Headerlayout)
