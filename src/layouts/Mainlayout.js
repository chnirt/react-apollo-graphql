import React from 'react'
import Headerlayout from './Headerlayout'
import Siderlayout from './Siderlayout'
import Breadcumblayout from './Breadcumblayout'
import Footerlayout from './Footerlayout'

import { Layout, BackTop } from 'antd'

const { Content } = Layout

const Main = props => {
	return (
		<Layout>
			{/* Header */}
			<Headerlayout />
			{/* Body */}
			<Layout style={{ marginTop: 64 }}>
				{/* Sider */}
				<Siderlayout />
				{/* Content */}
				<Layout style={{ marginLeft: 200 }}>
					{/* Breadcumb */}
					<Breadcumblayout />
					{/* Component */}
					<Content
						style={{
							margin: '0px 16px 0 16px',
							overflow: 'auto'
						}}
					>
						<div
							style={{
								padding: 24,
								background: '#fff',
								minHeight: '81vh'
							}}
						>
							{props.children}
							<BackTop />
						</div>
					</Content>
					{/* Footer */}
					<Footerlayout />
				</Layout>
			</Layout>
		</Layout>
	)
}

export default Main
