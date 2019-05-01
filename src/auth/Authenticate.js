const Auth = {
	isAuthenticated: localStorage.getItem('token') ? true : false,
	authenticate(cb) {
		this.isAuthenticated = true
		setTimeout(cb, 200)
	},
	logout(cb) {
		this.isAuthenticated = false
		setTimeout(cb, 200)
	}
}

export default Auth
