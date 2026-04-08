import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Chip, Divider } from '@mui/material'
import { agents } from '../../data/mockData'

export default function PropertyModal({ open, onClose, property }) {
  if (!property) return null

  const agent = agents.find(a => a.id === property.agentId)

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>
        {property.title}
        <Chip
          label={property.type}
          size="small"
          color={property.type === 'rent' ? 'primary' : 'secondary'}
          sx={{ ml: 1 }}
        />
      </DialogTitle>

      <DialogContent dividers>
        <div className="prop-modal">

          <div className="prop-modal__section">
            <span className="prop-modal__label">Location</span>
            <span>{property.location}</span>
          </div>

          <div className="prop-modal__section">
            <span className="prop-modal__label">Price</span>
            <span>${property.price.toLocaleString()}</span>
          </div>

          <div className="prop-modal__section">
            <span className="prop-modal__label">Status</span>
            <Chip
              label={property.status}
              size="small"
              color={property.status === 'available' ? 'success' : 'error'}
            />
          </div>

          <div className="prop-modal__section">
            <span className="prop-modal__label">Rooms</span>
            <span>{property.rooms}</span>
          </div>

          <Divider sx={{ my: 1.5 }} />

          <div className="prop-modal__section">
            <span className="prop-modal__label">Description</span>
            <span>{property.description}</span>
          </div>

          <div className="prop-modal__section">
            <span className="prop-modal__label">Amenities</span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {property.amenities.map(a => (
                <Chip key={a} label={a} size="small" variant="outlined" />
              ))}
            </div>
          </div>

          <Divider sx={{ my: 1.5 }} />

          <div className="prop-modal__section">
            <span className="prop-modal__label">Assigned Agent</span>
            <span>{agent ? agent.name : 'Unassigned'}</span>
          </div>

          {agent && (
            <>
              <div className="prop-modal__section">
                <span className="prop-modal__label">Agent Email</span>
                <span>{agent.email}</span>
              </div>
              <div className="prop-modal__section">
                <span className="prop-modal__label">Agent Phone</span>
                <span>{agent.phone}</span>
              </div>
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