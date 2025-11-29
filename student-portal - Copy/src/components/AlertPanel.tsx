import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { apiService } from '../services/ApiService';

const AlertPanel: React.FC = () => {
  const { data: alerts, loading } = useApi(() => apiService.getAlerts());
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());

  const handleDismissAlert = (alertId: string) => {
    setDismissedAlerts(prev => new Set(prev).add(alertId));
  };

  const handleMarkAllAsRead = () => {
    if (alerts) {
      const allAlertIds = alerts.map(alert => alert.id);
      setDismissedAlerts(new Set(allAlertIds));
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'danger': return '🚨';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      case 'success': return '✅';
      default: return '📢';
    }
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      'high': 'danger',
      'medium': 'warning',
      'low': 'info'
    };
    return `badge bg-${priorityConfig[priority as keyof typeof priorityConfig]}`;
  };

  const activeAlerts = alerts?.filter(alert => !dismissedAlerts.has(alert.id)) || [];

  if (loading) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center">
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading alerts...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0">📢 Active Alerts</h5>
        <div>
          <span className="badge bg-danger me-2">{activeAlerts.length}</span>
          <button 
            className="btn btn-sm btn-outline-secondary"
            onClick={handleMarkAllAsRead}
            disabled={activeAlerts.length === 0}
          >
            Mark All Read
          </button>
        </div>
      </div>
      <div className="card-body p-0">
        {activeAlerts.length === 0 ? (
          <div className="text-center py-4 text-muted">
            <div className="fs-1">🎉</div>
            <p className="mb-0">No active alerts</p>
            <small>All systems are running smoothly</small>
          </div>
        ) : (
          activeAlerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.type} alert-dismissible fade show m-3 mb-2`} role="alert">
              <div className="d-flex align-items-start">
                <span className="fs-5 me-2">{getAlertIcon(alert.type)}</span>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start">
                    <strong>{alert.title}</strong>
                    <span className={getPriorityBadge(alert.priority)}>
                      {alert.priority}
                    </span>
                  </div>
                  {alert.message}
                  <br />
                  <small className="text-muted">{alert.timestamp}</small>
                </div>
              </div>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => handleDismissAlert(alert.id)}
              ></button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlertPanel;