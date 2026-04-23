import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Typography,
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { agents } from '../../data/mockData'
import './AddPropertyForm.scss'

const emptyForm = {
  title: '',
  type: 'rent',
  price: '',
  location: '',
  status: 'available',
  rooms: '',
  description: '',
  agentId: '',
  amenities: '',
}

export default function AddPropertyForm({ open, onClose, onAdd }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [images, setImages] = useState([])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  const handleImages = (e) => {
    const files = Array.from(e.target.files)

    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    const invalidType = files.find((f) => !validTypes.includes(f.type))
    if (invalidType) {
      setErrors((prev) => ({ ...prev, images: 'Only JPG, PNG, WEBP allowed' }))
      return
    }

    const tooBig = files.find((f) => f.size > 2 * 1024 * 1024)
    if (tooBig) {
      setErrors((prev) => ({ ...prev, images: 'Each image must be under 2MB' }))
      return
    }

    setErrors((prev) => ({ ...prev, images: '' }))
    const previews = files.map((f) => URL.createObjectURL(f))
    setImages(previews)
  }

  const validate = () => {
    const newErrors = {}

    if (!form.title.trim()) newErrors.title = 'Title is required'
    if (!form.location.trim()) newErrors.location = 'Location is required'
    if (!form.description.trim()) newErrors.description = 'Description is required'

    if (!form.price) {
      newErrors.price = 'Price is required'
    } else if (isNaN(form.price) || Number(form.price) <= 0) {
      newErrors.price = 'Price must be a positive number'
    }

    if (!form.rooms) {
      newErrors.rooms = 'Rooms is required'
    } else if (!Number.isInteger(Number(form.rooms)) || Number(form.rooms) <= 0) {
      newErrors.rooms = 'Rooms must be a positive whole number'
    }

    if (!form.agentId) newErrors.agentId = 'Please assign an agent'

    return newErrors
  }

  const handleSubmit = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const newProperty = {
      id: Date.now(),
      ...form,
      price: Number(form.price),
      rooms: Number(form.rooms),
      agentId: Number(form.agentId),
      amenities: form.amenities
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean),
      images,
    }

    onAdd(newProperty)
    setForm(emptyForm)
    setImages([])
    setErrors({})
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Property</DialogTitle>

      <DialogContent dividers>
        <div className="add-property-form">
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
            size="small"
          />

          <TextField
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            error={!!errors.location}
            helperText={errors.location}
            fullWidth
            size="small"
          />

          <div className="add-property-form__row">
            <TextField
              label="Price (FRW)"
              name="price"
              value={form.price}
              onChange={handleChange}
              error={!!errors.price}
              helperText={errors.price}
              fullWidth
              size="small"
            />

            <TextField
              label="Rooms"
              name="rooms"
              value={form.rooms}
              onChange={handleChange}
              error={!!errors.rooms}
              helperText={errors.rooms}
              fullWidth
              size="small"
            />
          </div>

          <div className="add-property-form__row">
            <TextField select label="Type" name="type" value={form.type} onChange={handleChange} fullWidth size="small">
              <MenuItem value="rent">Rent</MenuItem>
              <MenuItem value="sale">Sale</MenuItem>
            </TextField>

            <TextField
              select
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              fullWidth
              size="small"
            >
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="sold">Sold</MenuItem>
            </TextField>
          </div>

          <TextField
            select
            label="Assign Agent"
            name="agentId"
            value={form.agentId}
            onChange={handleChange}
            error={!!errors.agentId}
            helperText={errors.agentId}
            fullWidth
            size="small"
          >
            {agents.map((a) => (
              <MenuItem key={a.id} value={a.id}>
                {a.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Amenities (comma separated)"
            name="amenities"
            value={form.amenities}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder="Amazi meza, Parking, Kamera"
          />

          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
            fullWidth
            size="small"
            multiline
            rows={3}
          />

          <div className="img-upload">
            <label className="img-upload__btn">
              <CloudUploadIcon />
              <span>Upload Images</span>
              <input type="file" multiple accept="image/*" onChange={handleImages} hidden />
            </label>
            {errors.images && <Typography color="error">{errors.images}</Typography>}
            {images.length > 0 && (
              <div className="img-upload__preview">
                {images.map((src, i) => (
                  <img key={i} src={src} alt={`preview-${i}`} />
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add Property
        </Button>
      </DialogActions>
    </Dialog>
  )
}
