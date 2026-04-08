import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts'
import { properties, agents, inquiries } from '../data/mockData'
import './Dashboard.scss'

// Stat card component
function StatCard({ label, value, color }) {
  return (
    <div className="stat-card" style={{ borderTop: `4px solid ${color}` }}>
      <span className="stat-card__value">{value}</span>
      <span className="stat-card__label">{label}</span>
    </div>
  )
}

// Prepare chart data
const propertyTypeData = [
  { name: 'Rent', value: properties.filter(p => p.type === 'rent').length },
  { name: 'Sale', value: properties.filter(p => p.type === 'sale').length },
]

const statusData = [
  { name: 'Available', value: properties.filter(p => p.status === 'available').length },
  { name: 'Sold', value: properties.filter(p => p.status === 'sold').length },
]

const agentActivityData = agents.map(agent => ({
  name: agent.name.split(' ')[0],
  properties: agent.properties.length,
  inquiries: inquiries.filter(i => {
    const prop = properties.find(p => p.id === i.propertyId)
    return prop?.agentId === agent.id
  }).length
}))

const priceTrendData = [
  { month: 'Jan', avgPrice: 600 },
  { month: 'Feb', avgPrice: 750 },
  { month: 'Mar', avgPrice: 700 },
  { month: 'Apr', avgPrice: 850 },
  { month: 'May', avgPrice: 920 },
  { month: 'Jun', avgPrice: 880 },
]

const PIE_COLORS = ['#4f46e5', '#7c3aed']
const STATUS_COLORS = ['#22c55e', '#ef4444']

export default function Dashboard() {
  const available = properties.filter(p => p.status === 'available').length
  const pending = inquiries.filter(i => i.status === 'pending').length

  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Dashboard</h1>

      {/* Stat cards */}
      <div className="dashboard__stats">
        <StatCard label="Total Properties" value={properties.length} color="#4f46e5" />
        <StatCard label="Total Agents" value={agents.length} color="#7c3aed" />
        <StatCard label="Available" value={available} color="#22c55e" />
        <StatCard label="Pending Inquiries" value={pending} color="#f59e0b" />
      </div>

      {/* Charts row 1 */}
      <div className="dashboard__charts">

        <div className="chart-card">
          <h3>Property Types</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={propertyTypeData} cx="50%" cy="50%"
                outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {propertyTypeData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Availability Status</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%"
                outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {statusData.map((_, i) => (
                  <Cell key={i} fill={STATUS_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Agent Activity</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={agentActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="properties" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="inquiries" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Charts row 2 */}
      <div className="chart-card chart-card--full">
        <h3>Price Trend (Monthly Avg)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={priceTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
            <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="avgPrice" stroke="#4f46e5"
              strokeWidth={2} dot={{ fill: '#4f46e5' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}