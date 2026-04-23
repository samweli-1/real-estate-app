import { Typography } from '@mui/material'
import './Footer.scss'

export default function Footer() {
  return (
    <footer className="footer">
      <Typography variant="body2" color="text.secondary">
        {`© ${new Date().getFullYear()} RealEstate Management System. All rights reserved.`}
      </Typography>
    </footer>
  )
}
