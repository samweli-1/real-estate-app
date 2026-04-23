import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

export default function DeleteDialog({ open, onClose, onConfirm, propertyTitle }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle className="delete-dialog__title">
        <WarningAmberIcon />
        Confirm Delete
      </DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete <strong>{propertyTitle}</strong>? This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
