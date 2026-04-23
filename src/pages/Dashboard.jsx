import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from 'recharts'
import { Grid, Paper, Stack, Typography } from '@mui/material'
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import GroupsIcon from '@mui/icons-material/Groups'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HourglassTopIcon from '@mui/icons-material/HourglassTop'
import { properties, agents, inquiries } from '../data/mockData'
import './Dashboard.scss'

function StatCard({ label, value, colorClass, icon, meta, progress }) {
  return (
    <Paper className={`stat-card ${colorClass}`}>
      <div className="stat-card__top">
        <div>
          <Typography variant="body2" color="text.secondary" className="stat-card__label">
            {label}
          </Typography>
          <Typography variant="h4" className="stat-card__value">
            {value}
          </Typography>
        </div>
        <div className="stat-card__icon">{icon}</div>
      </div>
      <Typography variant="caption" className="stat-card__meta">
        {meta}
      </Typography>
      <div className="stat-card__bar">
        <span style={{ width: `${progress}%` }} />
      </div>
    </Paper>
  )
}

const propertyTypeData = [
  { name: 'Rent', value: properties.filter((p) => p.type === 'rent').length },
  { name: 'Sale', value: properties.filter((p) => p.type === 'sale').length },
]

const statusData = [
  { name: 'Available', value: properties.filter((p) => p.status === 'available').length },
  { name: 'Sold', value: properties.filter((p) => p.status === 'sold').length },
]

const agentActivityData = agents.map((agent) => ({
  name: agent.name.split(' ')[0],
  properties: agent.properties.length,
  inquiries: inquiries.filter((i) => {
    const prop = properties.find((p) => p.id === i.propertyId)
    return prop?.agentId === agent.id
  }).length,
}))

const priceTrendData = [
  { month: 'Jan', avgPrice: 480000 },
  { month: 'Feb', avgPrice: 520000 },
  { month: 'Mar', avgPrice: 575000 },
  { month: 'Apr', avgPrice: 610000 },
  { month: 'May', avgPrice: 640000 },
  { month: 'Jun', avgPrice: 690000 },
]

const PIE_COLORS = ['#FE2C55', '#25F4EE']
const STATUS_COLORS = ['#22c55e', '#FE2C55']

export default function Dashboard() {
  const available = properties.filter((p) => p.status === 'available').length
  const pending = inquiries.filter((i) => i.status === 'pending').length
  const sold = properties.filter((p) => p.status === 'sold').length

  return (
    <Stack spacing={2} className="dashboard">
      <Typography variant="h5" className="dashboard__title">
        Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            label="Total Properties"
            value={properties.length}
            colorClass="stat-card--primary"
            icon={<HomeWorkIcon />}
            meta={`${sold} sold, ${available} available`}
            progress={100}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            label="Total Agents"
            value={agents.length}
            colorClass="stat-card--secondary"
            icon={<GroupsIcon />}
            meta={`${Math.max(1, Math.round(properties.length / agents.length))} listings per agent avg`}
            progress={72}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            label="Available"
            value={available}
            colorClass="stat-card--success"
            icon={<CheckCircleIcon />}
            meta={`${Math.round((available / properties.length) * 100)}% of total inventory`}
            progress={Math.round((available / properties.length) * 100)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            label="Pending Inquiries"
            value={pending}
            colorClass="stat-card--warning"
            icon={<HourglassTopIcon />}
            meta={`${Math.round((pending / inquiries.length) * 100)}% awaiting response`}
            progress={Math.round((pending / inquiries.length) * 100)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper className="chart-card">
            <Typography variant="subtitle1" className="chart-card__title">
              Property Types
            </Typography>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={propertyTypeData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {propertyTypeData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper className="chart-card">
            <Typography variant="subtitle1" className="chart-card__title">
              Availability Status
            </Typography>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={STATUS_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper className="chart-card">
            <Typography variant="subtitle1" className="chart-card__title">
              Agent Activity
            </Typography>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={agentActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="properties" fill="#FE2C55" radius={[4, 4, 0, 0]} />
                <Bar dataKey="inquiries" fill="#25F4EE" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <Paper className="chart-card chart-card--wide">
        <Typography variant="subtitle1" className="chart-card__title">
          Price Trend (Monthly Avg, FRW)
        </Typography>
        <div className="chart-card__trend">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.15} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => [`FRW ${Number(value).toLocaleString()}`, 'Avg Price']} />
              <Legend />
              <Line type="monotone" dataKey="avgPrice" stroke="#FE2C55" strokeWidth={2} dot={{ fill: '#FE2C55' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Paper>
    </Stack>
  )
}
