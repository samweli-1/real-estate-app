import { Avatar, Chip, Grid, Paper, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import { agents, properties } from '../data/mockData'
import './Agents.scss'

export default function Agents() {
  return (
    <div className="agents">
      <Typography variant="h5" className="agents__title">
        Agents
      </Typography>

      <Grid container spacing={2}>
        {agents.map((agent) => {
          const assignedProperties = properties.filter((p) => agent.properties.includes(p.id))
          const availableCount = assignedProperties.filter((p) => p.status === 'available').length

          return (
            <Grid key={agent.id} size={{ xs: 12, md: 6, xl: 4 }}>
              <Paper className="agent-card">
                <div className="agent-card__top">
                  <Avatar className="agent-card__avatar">
                    <PersonIcon />
                  </Avatar>
                  <div className="agent-card__info">
                    <Typography variant="subtitle1">{agent.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {agent.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {agent.phone}
                    </Typography>
                  </div>
                </div>

                <div className="agent-card__stats">
                  <div className="agent-card__stat">
                    <span className="agent-card__stat-value">{assignedProperties.length}</span>
                    <span className="agent-card__stat-label">Properties</span>
                  </div>
                  <div className="agent-card__stat">
                    <span className="agent-card__stat-value">{availableCount}</span>
                    <span className="agent-card__stat-label">Available</span>
                  </div>
                </div>

                <div className="agent-card__chips">
                  {assignedProperties.map((p) => (
                    <Chip
                      key={p.id}
                      label={p.title}
                      size="small"
                      variant="outlined"
                      color={p.status === 'available' ? 'success' : 'error'}
                    />
                  ))}
                </div>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}
