import React from 'react';
import Headerlayout from './Headerlayout';
import Siderlayout from './Siderlayout';
import Breadcumblayout from './Breadcumblayout';
import Footerlayout from './Footerlayout';

import { Layout } from 'antd';

const { Content } = Layout;

const Main = props => {
	return (
		<Layout style={{ height: '100vh' }}>
			{/* Header */}
			<Headerlayout />
			{/* Body */}
			<Content style={{ marginTop: 64 }}>
				{/* Sider */}
				<Siderlayout />
				{/* Content */}
				<Layout style={{ marginLeft: 200 }}>
					{/* Breadcumb */}
					<Breadcumblayout />

					{/* Component */}
					<Content style={{ margin: '0px 16px 0 16px' }}>
						<div
							style={{
								padding: 24,
								background: '#fff',
								textAlign: 'center'
							}}
						>
							{props.children}
							...
							<br />
							Really
							<br />
							...
							<br />
							Really
							<br />
							...
							<br />
							Really
							<br />
							...
							<br />
							content
						</div>
					</Content>
					{/* Footer */}
					<Footerlayout />
				</Layout>
			</Content>
		</Layout>
	);
};

export default Main;
