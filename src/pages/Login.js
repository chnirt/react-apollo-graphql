import React, { Component } from 'react'
import Auth from '../auth/Authenticate'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

export class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: 'chin@gmail.com',
			password: 'd3f4ultP4ssword!',
			errors: []
		}
	}
	componentWillMount() {
		const token = localStorage.getItem('token')
		if (token) {
			this.props.history.push('/')
		}
	}
	componentWillUpdate
	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	onLogin = e => {
		e.preventDefault()

		const { client } = this.props
		const { email, password } = this.state

		client
			.mutate({
				mutation: USER_LOGIN,
				variables: {
					userInput: {
						email,
						password
					}
				}
			})
			.then(res => {
				Auth.authenticate(() => {
					localStorage.setItem('token', res.data.login.token)
					this.props.history.push('/')
				})
			})
			.catch(res => {
				console.log(res)
				const errors = res.graphQLErrors.map(error => error.message)
				this.setState({
					errors
				})
			})
	}
	render() {
		const { email, password, errors } = this.state
		return (
			<>
				<div
					style={{
						margin: 'auto',
						width: '50%',
						border: '3px solid green',
						padding: '10px'
					}}
				>
					Login
					<form onSubmit={this.onLogin}>
						<input name="email" onChange={this.onChange} value={email} />
						<br />
						<input
							type="password"
							name="password"
							onChange={this.onChange}
							value={password}
						/>
						<br />
						<button type="submit">Login</button>
					</form>
					{errors && errors.map((error, i) => <h4 key={i}>{error}</h4>)}
				</div>
			</>
		)
	}
}

const USER_LOGIN = gql`
	mutation($userInput: LoginUserInput!) {
		login(userInput: $userInput) {
			token
		}
	}
`

export default withApollo(Login)
