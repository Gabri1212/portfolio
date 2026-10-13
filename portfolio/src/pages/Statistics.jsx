import { useEffect, useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { ShieldAlert, Users, MapPin, Target, Activity } from 'lucide-react';

const COLORS = ['#0d6efd', '#198754', '#ffc107', '#0dcaf0', '#d63384'];
const ATTACK_COLORS = ['#dc3545', '#fd7e14', '#ffc107', '#d63384', '#6f42c1'];

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Errore fetch API:", err);
        setLoading(false);
      });
  }, []);

  // Mappatura Heatmap
  const { heatmapMatrix, maxAttacks } = useMemo(() => {
    const matrix = {};
    let max = 1;
    if (data?.heatmapData && Array.isArray(data.heatmapData)) {
      data.heatmapData.forEach(({ giorno_num, ora, totale_eventi }) => {
        matrix[`${giorno_num}-${ora}`] = totale_eventi;
        if (totale_eventi > max) max = totale_eventi;
      });
    }
    return { heatmapMatrix: matrix, maxAttacks: max };
  }, [data]);

  // Colore rosso dinamico per la Heatmap
  const getHeatmapColor = (count) => {
    if (!count) return '#212529'; // Dark slate/gray
    const intensity = count / maxAttacks;
    if (intensity < 0.25) return '#58151c';
    if (intensity < 0.5) return '#842029';
    if (intensity < 0.75) return '#b02a37';
    return '#dc3545';
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
        <div className="spinner-border text-primary me-2" role="status"></div>
        <span>Loading data...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-5 bg-dark text-danger text-truncater vh-100">
        <h4>Connection error. Please mail me about this.</h4>
      </div>
    );
  }

  return (
    <div className="bg-dark text-light min-vh-100 p-4 font-sans">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom border-secondary">
          <h2 className="h4 m-0 d-flex align-items-center gap-2">
            <ShieldAlert className="text-danger" size={28} /> WAF & Traffic Analytics
          </h2>
          <span className="badge bg-secondary">Live Connection</span>
        </div>

        {/* GRIGLIA CARD: 2 PER RIGA (col-md-6) */}
        <div className="row g-4">

          {/* CARD 1: PANORAMICA METRICHE */}
          <div className="col-12 col-md-6">
            <div className="card bg-secondary bg-opacity-10 border-secondary text-light h-100">
              <div className="card-header bg-transparent border-secondary fw-semibold d-flex align-items-center gap-2">
                <Users className="text-primary" size={20} /> Traffic overview
              </div>
              <div className="card-body d-flex align-items-center">
                <div className="row w-100 text-center g-2">
                  <div className="col-4">
                    <div className="bg-dark p-3 rounded border border-secondary">
                      <small className="text-muted d-block">Total unique visitors</small>
                      <strong className="fs-4 text-light">{data.stats?.totalVisits ?? 0}</strong>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="bg-dark p-3 rounded border border-secondary">
                      <small className="text-muted d-block">Real visitors</small>
                      <strong className="fs-4 text-success">{data.stats?.realVisits ?? 0}</strong>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="bg-dark p-3 rounded border border-secondary">
                      <small className="text-muted d-block">Suspects</small>
                      <strong className="fs-4 text-danger">{data.stats?.suspiciousVisits ?? 0}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: TOP ENDPOINTS ATTACCATI */}
          <div className="col-12 col-md-6">
            <div className="card bg-secondary bg-opacity-10 border-secondary text-light h-100">
              <div className="card-header bg-transparent border-secondary fw-semibold d-flex align-items-center gap-2">
                <Target className="text-warning" size={20} /> Most requested endpoints
              </div>
              <div className="card-body">
                {data.topAttackEndpoints && data.topAttackEndpoints.length > 0 ? (
                  <div className="d-flex flex-column gap-2">
                    {data.topAttackEndpoints.slice(0, 4).map((item, idx) => (
                      <div key={idx} className="d-flex justify-content-between align-items-center bg-dark p-2 px-3 rounded border border-secondary">
                        <span className="font-monospace text-warning text-truncate me-2" style={{ maxWidth: '300px' }} title={item.path}>
                          {item.path}
                        </span>
                        <span className="badge bg-danger text-wrap">{item.cnt} requests</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted text-center my-auto">No attacks yet.</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card bg-secondary bg-opacity-10 border-secondary text-light h-100">
              <div className="card-header bg-transparent border-secondary fw-semibold d-flex align-items-center gap-2">
                <MapPin className="text-success" size={20} /> Top friendly countries
              </div>
              <div className="card-body" style={{ height: '240px' }}>
                {data.topRealCountries && data.topRealCountries.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.topRealCountries} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="country" type="category" stroke="#adb5bd" fontSize={12} width={70} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#212529', borderColor: '#495057', borderRadius: '6px', color: '#fff' }} />
                      <Bar dataKey="cnt" radius={[0, 4, 4, 0]} barSize={18}>
                        {data.topRealCountries.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="d-flex h-100 align-items-center justify-content-center text-muted">No data available</div>
                )}
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card bg-secondary bg-opacity-10 border-secondary text-light h-100">
              <div className="card-header bg-transparent border-secondary fw-semibold d-flex align-items-center gap-2">
                <ShieldAlert className="text-danger" size={20} /> Top attackers countries
              </div>
              <div className="card-body" style={{ height: '240px' }}>
                {data.topAttackerCountries && data.topAttackerCountries.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.topAttackerCountries} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="country" type="category" stroke="#adb5bd" fontSize={12} width={70} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#212529', borderColor: '#495057', borderRadius: '6px', color: '#fff' }} />
                      <Bar dataKey="cnt" radius={[0, 4, 4, 0]} barSize={18}>
                        {data.topAttackerCountries.map((_, index) => (
                          <Cell key={`cell-atk-${index}`} fill={ATTACK_COLORS[index % ATTACK_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="d-flex h-100 align-items-center justify-content-center text-muted">No data available</div>
                )}
              </div>
            </div>
          </div>

        </div>

        <div className="row mt-4">
          <div className="col-12">
            <div className="card bg-secondary bg-opacity-10 border-secondary text-light">
              <div className="card-header bg-transparent border-secondary fw-semibold d-flex align-items-center gap-2">
                <Activity className="text-danger" size={20} />Attacks heatmap distribution
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <div style={{ minWidth: '750px' }}>

                    {/* Header Ore 00 -> 23 */}
                    <div className="d-grid gap-1 mb-2 text-center" style={{ gridTemplateColumns: '110px repeat(24, 1fr)' }}>
                      <small className="fw-bold text-muted text-start ps-1">Day / Hour</small>
                      {HOURS.map((h) => (
                        <small key={h} className="font-monospace text-muted" style={{ fontSize: '11px' }}>
                          {h.toString().padStart(2, '0')}
                        </small>
                      ))}
                    </div>

                    {DAYS.map((dayName, dayIdx) => (
                      <div key={dayName} className="d-grid gap-1 mb-1 align-items-center" style={{ gridTemplateColumns: '110px repeat(24, 1fr)' }}>
                        <small className="text-light fw-medium ps-1" style={{ fontSize: '12px' }}>{dayName}</small>
                        {HOURS.map((hour) => {
                          const count = heatmapMatrix[`${dayIdx}-${hour}`] || 0;
                          return (
                            <div
                              key={hour}
                              title={`${dayName}@${hour}:00 - ${count} attacks`}
                              className="d-flex align-items-center justify-content-center rounded border border-secondary select-none"
                              style={{
                                height: '28px',
                                backgroundColor: getHeatmapColor(count),
                                fontSize: '10px',
                                fontWeight: 'bold',
                                color: count > 0 ? '#ffffff' : 'transparent',
                                cursor: 'pointer'
                              }}
                            >
                              {count > 0 ? count : ''}
                            </div>
                          );
                        })}
                      </div>
                    ))}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
