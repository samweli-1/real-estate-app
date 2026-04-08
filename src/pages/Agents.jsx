import { agents, properties } from '../data/mockData'
import { Chip } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import './Agents.scss'

export default function Agents() {
  return (
    <div className="agents">
      <h1 className="agents__title">Agents</h1>

      <div className="agents__grid">
        {agents.map(agent => {
          const assignedProperties = properties.filter(p =>
            agent.properties.includes(p.id)
          )

          return (
            <div key={agent.id} className="agent-card">
              <div className="agent-card__avatar">
                <PersonIcon sx={{ fontSize: 48 }} />
              </div>

              <div className="agent-card__info">
                <h2>{agent.name}</h2>
                <p>{agent.email}</p>
                <p>{agent.phone}</p>
              </div>

              <div className="agent-card__stats">
                <div className="agent-card__stat">
                  <span className="agent-card__stat-value">
                    {assignedProperties.length}
                  </span>
                  <span className="agent-card__stat-label">Properties</span>
                </div>
                <div className="agent-card__stat">
                  <span className="agent-card__stat-value">
                    {assignedProperties.filter(p => p.status === 'available').length}
                  </span>
                  <span className="agent-card__stat-label">Available</span>
                </div>
              </div>

              <div className="agent-card__properties">
                <span className="agent-card__section-label">Assigned Properties</span>
                <div className="agent-card__chips">
                  {assignedProperties.map(p => (
                    <Chip
                      key={p.id}
                      label={p.title}
                      size="small"
                      variant="outlined"
                      color={p.status === 'available' ? 'success' : 'error'}
                    />
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}