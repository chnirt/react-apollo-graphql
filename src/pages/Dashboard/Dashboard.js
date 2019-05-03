import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import { AgGridReact } from 'ag-grid-react'
export class Dashboard extends Component {
	state = {
		loading: true,
		users: [],
		columnDefs: [
			{
				headerName: 'Make',
				field: 'make',
				filter: 'agTextColumnFilter',
				suppressMenu: true,
				enablePivot: true,
				// rowGroup: true
				// suppressSizeToFit: true,
				checkboxSelection: function(params) {
					return params.columnApi.getRowGroupColumns().length === 0
				},
				headerCheckboxSelection: function(params) {
					return params.columnApi.getRowGroupColumns().length === 0
				}
			},
			{
				headerName: 'Model',
				field: 'model',
				filter: 'agTextColumnFilter'
			},
			{
				headerName: 'Price',
				field: 'price',
				filter: 'agNumberColumnFilter'
			}
		],
		defaultColDef: {
			sortable: true,
			filter: true,
			resizable: true
		},
		rowData: null,
		rowGroupPanelShow: 'always',
		autoGroupColumnDef: {
			headerName: 'Model',
			field: 'model',
			cellRenderer: 'agGroupCellRenderer',
			cellRendererParams: {
				checkbox: true
			}
		},
		statusBar: {
			statusPanels: [
				{
					statusPanel: 'agTotalRowCountComponent',
					align: 'left'
				},
				{ statusPanel: 'agFilteredRowCountComponent' },
				{ statusPanel: 'agSelectedRowCountComponent' },
				{ statusPanel: 'agAggregationComponent' }
			]
		}
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
	onGridReady = params => {
		this.gridApi = params.api
		this.gridColumnApi = params.columnApi

		fetch('https://api.myjson.com/bins/ly7d1')
			.then(result => result.json())
			.then(rowData => this.setState({ rowData }))
	}

	onFirstDataRendered(params) {
		params.api.sizeColumnsToFit()
	}

	render() {
		const { users, loading } = this.state
		if (loading) {
			return <h4>Loading</h4>
		}
		return (
			<>
				Dashboard
				<div
					className="ag-theme-balham"
					style={{
						height: '500px',
						width: '100%'
					}}
				>
					<AgGridReact
						columnDefs={this.state.columnDefs}
						defaultColDef={this.state.defaultColDef}
						animateRows={true}
						rowData={this.state.rowData}
						floatingFilter={true}
						rowSelection="multiple"
						groupSelectsChildren={true}
						autoGroupColumnDef={this.state.autoGroupColumnDef}
						onGridReady={this.onGridReady}
						onFirstDataRendered={this.onFirstDataRendered.bind(this)}
						enableRangeSelection={true}
						statusBar={this.state.statusBar}
						pagination={true}
						debug={true}
					/>
				</div>
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
