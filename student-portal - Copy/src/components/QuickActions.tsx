import React from 'react';

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const actions = [
    { 
      icon: '➕', 
      label: 'Create Course', 
      color: 'primary',
      description: 'Add new course'
    },
    { 
      icon: '🎯', 
      label: 'Open Enrollment', 
      color: 'success',
      description: 'Start enrollment period'
    },
    { 
      icon: '📊', 
      label: 'Run Graduation Audit', 
      color: 'info',
      description: 'Check graduation eligibility'
    },
    { 
      icon: '📢', 
      label: 'Publish Announcement', 
      color: 'warning',
      description: 'Notify students'
    },
    { 
      icon: '🔄', 
      label: 'Sync Calendar', 
      color: 'secondary',
      description: 'Update schedules'
    },
    { 
      icon: '📋', 
      label: 'Generate Reports', 
      color: 'dark',
      description: 'Create analytics'
    }
  ];

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0">🚀 Quick Actions</h5>
        <small className="text-muted">Frequently used tasks</small>
      </div>
      <div className="card-body">
        <div className="row g-3">
          {actions.map((action, index) => (
            <div key={index} className="col-xl-2 col-md-4 col-sm-6">
              <button 
                className={`btn btn-outline-${action.color} w-100 h-100 py-3 d-flex flex-column`}
                onClick={() => onActionClick(action.label)}
              >
                <div className="fs-2 mb-2">{action.icon}</div>
                <div className="fw-semibold">{action.label}</div>
                <small className="text-muted mt-1">{action.description}</small>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;