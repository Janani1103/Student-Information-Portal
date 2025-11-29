import React from 'react';

interface KPICardsProps {
  onKpiClick?: (kpiTitle: string) => void;
}

const KPICards: React.FC<KPICardsProps> = ({ onKpiClick }) => {
  const kpis = [
    {
      title: 'Total Students',
      value: '2,847',
      change: '+5.2%',
      icon: '👥',
      color: 'primary',
      description: 'Active students'
    },
    {
      title: 'Active Courses',
      value: '156',
      change: '+3',
      icon: '📚',
      color: 'success',
      description: 'This semester'
    },
    {
      title: 'Seats Filled',
      value: '87%',
      change: '+2.1%',
      icon: '🪑',
      color: 'info',
      description: 'Average occupancy'
    },
    {
      title: 'Waitlist Size',
      value: '324',
      change: '-12',
      icon: '⏳',
      color: 'warning',
      description: 'Pending enrollments'
    },
    {
      title: 'Pending Overrides',
      value: '47',
      change: '+8',
      icon: '⚡',
      color: 'danger',
      description: 'Require approval'
    },
    {
      title: 'Upcoming Exams',
      value: '23',
      change: 'Next 7 days',
      icon: '📝',
      color: 'secondary',
      description: 'Scheduled'
    }
  ];

  return (
    <div className="row g-3 mb-4">
      {kpis.map((kpi, index) => (
        <div key={index} className="col-xl-2 col-md-4 col-sm-6">
          <div 
            className={`card border-${kpi.color} shadow-sm h-100 clickable`}
            onClick={() => onKpiClick?.(kpi.title)}
            style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title text-muted mb-1">{kpi.title}</h6>
                  <h3 className="fw-bold mb-0">{kpi.value}</h3>
                  <small className={`text-${kpi.change.startsWith('+') ? 'success' : kpi.change.startsWith('-') ? 'danger' : 'muted'}`}>
                    {kpi.change}
                  </small>
                  <div className="text-muted small mt-1">{kpi.description}</div>
                </div>
                <div className={`display-4 text-${kpi.color} opacity-75`}>
                  {kpi.icon}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;