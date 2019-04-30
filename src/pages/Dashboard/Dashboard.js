import React, { Component } from 'react'
import { BrowserRouter, Switch, withRouter } from 'react-router-dom'
import RouteWithSubRoutes from '../../utils/RouteWithSubRoutes'
import Main from '../../layouts/Mainlayout'

export class Dashboard extends Component {
	render() {
		const { routes } = this.props
		return (
			<div>
				<BrowserRouter>
					<Main>
						<Switch>
							{routes.map((route, i) => (
								<RouteWithSubRoutes key={i} {...route} />
							))}
						</Switch>
					</Main>
				</BrowserRouter>
			</div>
		)
	}
}

export default withRouter(Dashboard)
