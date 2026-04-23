import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Chip, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'
import { inquiries, properties, agents } from '../data/mockData'
import './Inquiries.scss'

export default function Inquiries() {
  const [statusFilter, setStatusFilter] = useState('all')

  const getProperty = (id) => properties.find((p) => p.id === id)
  const getAgent = (propertyId) => {
    const prop = getProperty(propertyId)
    if (!prop) return 'N/A'
    const agent = agents.find((a) => a.id === prop.agentId)
    return agent ? agent.name : 'N/A'
  }

  const filtered = inquiries.filter((i) => statusFilter === 'all' || i.status === statusFilter)

  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Customer', flex: 1, minWidth: 160 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 180 },
    {
      field: 'propertyId',
      headerName: 'Property',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => getProperty(params.value)?.title || 'N/A',
    },
    {
      field: 'agent',
      headerName: 'Agent',
      width: 160,
      renderCell: (params) => getAgent(params.row.propertyId),
    },
    { field: 'message', headerName: 'Message', flex: 1, minWidth: 240 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip label={params.value} size="small" color={params.value === 'pending' ? 'warning' : 'success'} />
      ),
    },
  ]

  return (
    <Stack spacing={2} className="inquiries">
      <div className="inquiries__header">
        <Typography variant="h5">Customer Inquiries</Typography>
        <TextField
          select
          className="inquiries__status"
          label="Status"
          size="small"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="resolved">Resolved</MenuItem>
        </TextField>
      </div>

      <Paper className="inquiries__table">
        <DataGrid
          rows={filtered}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 6 } } }}
          pageSizeOptions={[6, 10]}
          disableRowSelectionOnClick
          autoHeight
        />
      </Paper>
    </Stack>
  )
}
