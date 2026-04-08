import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Chip, Box, TextField, MenuItem } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { properties as initialProperties, agents } from '../data/mockData'
import PropertyModal from '../components/ui/PropertyModal'
import DeleteDialog from '../components/ui/DeleteDialog'
import AddPropertyForm from '../components/ui/AddPropertyForm'
import './Properties.scss'

export default function Properties() {
  const [rows, setRows] = useState(initialProperties)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  const [viewProperty, setViewProperty] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)

  const getAgentName = (agentId) => {
    const agent = agents.find(a => a.id === agentId)
    return agent ? agent.name : 'Unassigned'
  }

  const filtered = rows.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === 'all' || p.type === typeFilter
    return matchesSearch && matchesType
  })

  const handleDelete = () => {
    setRows(prev => prev.filter(p => p.id !== deleteTarget.id))
    setDeleteTarget(null)
  }

  const handleAdd = (newProperty) => {
    setRows(prev => [...prev, newProperty])
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'title', headerName: 'Property', flex: 1, minWidth: 160 },
    { field: 'location', headerName: 'Location', flex: 1, minWidth: 160 },
    {
      field: 'type', headerName: 'Type', width: 100,
      renderCell: (params) => (
        <Chip label={params.value} size="small"
          color={params.value === 'rent' ? 'primary' : 'secondary'} />
      )
    },
    { field: 'price', headerName: 'Price ($)', width: 110, type: 'number' },
    {
      field: 'status', headerName: 'Status', width: 110,
      renderCell: (params) => (
        <Chip label={params.value} size="small"
          color={params.value === 'available' ? 'success' : 'error'} />
      )
    },
    {
      field: 'agentId', headerName: 'Agent', width: 150,
      renderCell: (params) => getAgentName(params.value)
    },
    {
      field: 'actions', headerName: 'Actions', width: 180, sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Button size="small" variant="outlined"
            onClick={() => setViewProperty(params.row)}>
            View
          </Button>
          <Button size="small" variant="outlined" color="error"
            onClick={() => setDeleteTarget(params.row)}>
            Delete
          </Button>
        </Box>
      )
    }
  ]

  return (
    <div className="properties">
      <div className="properties__header">
        <h1>Properties</h1>
        <Button variant="contained" startIcon={<AddIcon />}
          onClick={() => setShowAddForm(true)}>
          Add Property
        </Button>
      </div>

      <div className="properties__filters">
        <TextField label="Search by title or location" size="small"
          value={search} onChange={e => setSearch(e.target.value)}
          sx={{ minWidth: 260 }} />
        <TextField select label="Type" size="small"
          value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
          sx={{ minWidth: 140 }}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="rent">Rent</MenuItem>
          <MenuItem value="sale">Sale</MenuItem>
        </TextField>
      </div>

      <div className="properties__table">
        <DataGrid
          rows={filtered}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          autoHeight
        />
      </div>

      <PropertyModal
        open={!!viewProperty}
        property={viewProperty}
        onClose={() => setViewProperty(null)}
      />

      <DeleteDialog
        open={!!deleteTarget}
        propertyTitle={deleteTarget?.title}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />

      <AddPropertyForm
        open={showAddForm}
        onClose={() => setShowAddForm(false)}
        onAdd={handleAdd}
      />
    </div>
  )
}