import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
	Form,
	Input,
	Icon,
	Button,
	Row,
	Col,
	Typography,
	Checkbox,
	Divider
} from 'antd'

const { Title, Text } = Typography
export class Register extends Component {
	state = {
		email: 'chin@gmail.com',
		password: '1',
		loading: false,
		errors: []
	}
	componentWillMount() {
		const token = localStorage.getItem('access-token')
		if (token) {
			this.props.history.push('/')
		}
	}
	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	onSubmit = e => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values)
				const { email, password } = values
			}
		})
	}
	render() {
		const { email, password, errors, loading } = this.state
		const { getFieldDecorator } = this.props.form
		return (
			<>
				<Row id="layout-login">
					<Col
						xs={{ span: 24, offset: 0 }}
						sm={{ span: 16, offset: 8 }}
						md={{ span: 14, offset: 10 }}
						lg={{ span: 12, offset: 12 }}
						xl={{ span: 7, offset: 17 }}
					>
						<div id="components-form-demo-normal-login">
							<Form onSubmit={this.handleSubmit} className="login-form">
								<div className="login-form-header">
									<Title level={1}>Chnirt</Title>
									<Title level={4}>
										Sign up to see photos and videos from your friends.
									</Title>
								</div>
								<Form.Item>
									{getFieldDecorator('email', {
										valuePropName: 'defaultValue',
										initialValue: email,
										rules: [
											{
												type: 'email',
												message: 'The input is not valid E-mail!'
											},
											{
												required: true,
												message: 'Please input your E-mail!'
											}
										]
									})(
										<Input
											prefix={
												<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
											}
											placeholder="Your@email.com"
										/>
									)}
								</Form.Item>
								<Form.Item>
									{getFieldDecorator('password', {
										valuePropName: 'defaultValue',
										initialValue: password,
										rules: [
											{
												required: true,
												message: 'Please input your Password!'
											}
										]
									})(
										<Input
											prefix={
												<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
											}
											type="password"
											placeholder="Password"
										/>
									)}
								</Form.Item>
								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										className="login-form-button"
										loading={loading}
									>
										{!loading ? <Icon type="user-add" /> : null}
										Register
									</Button>
									<Text>{errors && errors.map(error => error)}</Text>
									<Divider>OR</Divider>
									Already have an account?<Link to="/login"> Login.</Link>
								</Form.Item>
							</Form>
						</div>
					</Col>
				</Row>
			</>
		)
	}
}

export default Form.create({ name: 'register' })(Register)
