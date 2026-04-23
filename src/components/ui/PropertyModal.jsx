import {
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Divider,
  Typography,
} from '@mui/material'
import { agents } from '../../data/mockData'
import './PropertyModal.scss'

function Row({ label, children }) {
  return (
    <div className="prop-modal__section">
      <Typography variant="caption" color="text.secondary" className="prop-modal__label">
        {label}
      </Typography>
      <Box>{children}</Box>
    </div>
  )
}

export default function PropertyModal({ open, onClose, property }) {
  if (!property) return null

  const agent = agents.find((a) => a.id === property.agentId)

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <div className="prop-modal__title">
          <Typography variant="h6">{property.title}</Typography>
          <Chip label={property.type} size="small" color={property.type === 'rent' ? 'primary' : 'secondary'} />
        </div>
      </DialogTitle>

      <DialogContent dividers>
        <div className="prop-modal">
          <Row label="Location">{property.location}</Row>
          <Row label="Price">FRW {property.price.toLocaleString()}</Row>
          <Row label="Status">
            <Chip label={property.status} size="small" color={property.status === 'available' ? 'success' : 'error'} />
          </Row>
          <Row label="Rooms">{property.rooms}</Row>

          <Divider />

          <Row label="Description">{property.description}</Row>
          <Row label="Amenities">
            <div className="prop-modal__chips">
              {property.amenities.map((a) => (
                <Chip key={a} label={a} size="small" variant="outlined" />
              ))}
            </div>
          </Row>

          <Divider />

          <Row label="Assigned Agent">{agent ? agent.name : 'Unassigned'}</Row>
          {agent && (
            <>
              <Row label="Agent Email">{agent.email}</Row>
              <Row label="Agent Phone">{agent.phone}</Row>
            </>
          )}
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
