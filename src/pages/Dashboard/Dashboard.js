import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

export class Dashboard extends Component {
	state = {
		loading: true,
		users: []
	}
	componentDidMount() {
		const { client } = this.props

		client
			.query({ query: USERS })
			.then(res => {
				console.log(res.data.users)
				this.setState({
					users: res.data.users,
					loading: false
				})
			})
			.catch(err => console.log(err))
	}
	render() {
		const { users, loading } = this.state
		if (loading) {
			return <h4>Loading</h4>
		}
		return (
			<>
				Dashboard
				{users &&
					users.map((user, i) => (
						<ul key={i}>
							<li>{user._id} </li>
							<li>{user.username}</li>
						</ul>
					))}
			</>
		)
	}
}

const USERS = gql`
	query {
		users {
			_id
			username
			chats {
				_id

				users {
					_id
				}
				messages {
					_id
				}
				lastMessage {
					_id
				}
			}
		}
	}
`

export default withApollo(Dashboard)
