import Login from './pages/Login';
import Register from './pages/Register';

// Application
import Dashboard from './pages/Dashboard/Dashboard';

// Member
import ScreenMember from './pages/Dashboard/Member';
// Post
import ScreenPost from './pages/Dashboard/Post';
// Like
import ScreenLike from './pages/Dashboard/Like';
// USER
import Profile from './pages/Dashboard/User/Profile';
import UpdateInformation from './pages/Dashboard/User/Updateinformation';
import ChangePassword from './pages/Dashboard/User/Changepassword';
// import {
// 	Profile,
// 	UpdateInformation,
// 	ChangePassword
// } from './pages/Dashboard/User';

export const routes = [
	{
		label: 'Login',
		path: '/login',
		component: Login
	},
	{
		label: 'Register',
		path: '/register',
		component: Register
	},
	{
		label: 'Dashboard',
		path: '/',
		exact: true,
		private: true,
		component: Dashboard,
		routes: [
			{
				label: 'members',
				path: '/members',
				component: ScreenMember
			},
			{
				label: 'posts',
				path: '/posts',
				component: ScreenPost
			},
			{
				label: 'likes',
				path: '/likes',
				component: ScreenLike
			},
			{
				label: 'profile',
				path: '/profile',
				component: Profile
			},
			{
				label: 'updateinformation',
				path: '/updateinformation',
				component: UpdateInformation
			},
			{
				label: 'changepassword',
				path: '/changepassword',
				component: ChangePassword
			}
		]
	}
];

export const siderRoutes = [
	{
		label: 'dashboard',
		icon: 'dashboard',
		path: '/'
	},
	{
		label: 'members',
		icon: 'team',
		path: '/members'
	},
	{
		label: 'posts',
		icon: 'file',
		path: '/posts'
	},
	{
		label: 'likes',
		icon: 'like',
		path: '/likes'
	}
];

export const headerRoutes = [
	{
		label: 'my profile',
		path: '/profile'
	},
	{
		label: 'update information',
		path: '/updateinformation'
	},
	{
		label: 'change password',
		path: '/changepassword'
	}
];
