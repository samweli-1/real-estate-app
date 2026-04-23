import { NavLink } from 'react-router-dom'
import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import HomeIcon from '@mui/icons-material/Home'
import PeopleIcon from '@mui/icons-material/People'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import './Sidebar.scss'

const navItems = [
  { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { label: 'Properties', path: '/properties', icon: <HomeIcon /> },
  { label: 'Agents', path: '/agents', icon: <PeopleIcon /> },
  { label: 'Inquiries', path: '/inquiries', icon: <QuestionAnswerIcon /> },
]

function DrawerContent({ onToggle }) {
  return (
    <Box className="sidebar__content">
      <div className="sidebar__logo">
        <HomeIcon className="sidebar__logo-icon" />
        <Typography variant="h6" className="sidebar__logo-text">
          RwEstate
        </Typography>
      </div>

      <Divider />

      <List className="sidebar__nav">
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'
            }
            onClick={() => {
              if (window.innerWidth < 900) onToggle()
            }}
          >
            <ListItemIcon className="sidebar__icon">{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}

export default function Sidebar({ onToggle, isOpen }) {
  return (
    <>
      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={onToggle}
        ModalProps={{ keepMounted: true }}
        className="sidebar sidebar--mobile"
        PaperProps={{ className: 'sidebar__paper' }}
      >
        <DrawerContent onToggle={onToggle} />
      </Drawer>

      <Drawer
        variant="permanent"
        open
        className="sidebar sidebar--desktop"
        PaperProps={{ className: 'sidebar__paper' }}
      >
        <DrawerContent onToggle={onToggle} />
      </Drawer>
    </>
  )
}
