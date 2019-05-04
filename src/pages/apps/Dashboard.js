import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import { AgGridReact } from 'ag-grid-react'
export class Dashboard extends Component {
	state = {
		columnDefs: [
			{
				headerName: 'Id',
				field: '_id',
				filter: 'agTextColumnFilter',
				// suppressMenu: true,
				// enablePivot: true,
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
				headerName: 'Email',
				field: 'email',
				filter: 'agTextColumnFilter'
			},
			{
				headerName: 'Username',
				field: 'username',
				filter: 'agTextColumnFilter'
			}
		],
		defaultColDef: {
			sortable: true,
			filter: true,
			resizable: true
		},
		rowSelection: 'multiple',
		rowData: null,
		overlayNoRowsTemplate:
			'<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">This is a custom \'no rows\' overlay</span>',
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
	onGridReady = params => {
		this.gridApi = params.api
		this.gridColumnApi = params.columnApi
		const { client } = this.props
		client
			.query({ query: USERS })
			.then(res => {
				this.setState({
					rowData: res.data.users
				})
			})
			.catch(err => console.log(err))
		// this.setState({ rowData: [] })
	}

	onFirstDataRendered(params) {
		params.api.sizeColumnsToFit()
	}

	render() {
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
						rowSelection={this.state.rowSelection}
						// groupSelectsChildren={true}
						// autoGroupColumnDef={this.state.autoGroupColumnDef}
						overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
						onGridReady={this.onGridReady}
						onFirstDataRendered={this.onFirstDataRendered.bind(this)}
						enableRangeSelection={true}
						statusBar={this.state.statusBar}
						pagination={true}
						// debug={true}
					/>
				</div>
			</>
		)
	}
}

const USERS = gql`
	query {
		users {
			_id
			username
			email
			firstLetterOfEmail
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
