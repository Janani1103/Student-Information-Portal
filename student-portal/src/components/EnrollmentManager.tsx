import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { apiService } from '../services/ApiService';
import type { Enrollment } from '../types';

const EnrollmentManager: React.FC = () => {
  const { data: enrollments, loading, error, refetch } = useApi(() => apiService.getEnrollments());
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [overrideReason, setOverrideReason] = useState('');

  const filteredEnrollments = enrollments?.filter(enrollment => 
    selectedStatus === 'all' || enrollment.status === selectedStatus
  );

  const statusCounts = enrollments?.reduce((acc, enrollment) => {
    acc[enrollment.status] = (acc[enrollment.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  const handleStatusUpdate = async (enrollmentId: string, newStatus: string) => {
    try {
      await apiService.updateEnrollmentStatus(enrollmentId, newStatus);
      alert(`Enrollment status updated to ${newStatus}`);
      refetch();
    } catch (error) {
      alert('Error updating enrollment status');
    }
  };

  const handleOverrideRequest = (enrollment: Enrollment) => {
    setSelectedEnrollment(enrollment);
    setShowOverrideModal(true);
  };

  const submitOverride = async () => {
    if (selectedEnrollment) {
      try {
        await apiService.updateEnrollmentStatus(selectedEnrollment.id, 'Approved', overrideReason);
        alert('Override approved successfully');
        setShowOverrideModal(false);
        setOverrideReason('');
        refetch();
      } catch (error) {
        alert('Error processing override');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Enrolled': 'success',
      'Waitlisted': 'warning',
      'Pending': 'info',
      'Dropped': 'secondary',
      'Approved': 'success',
      'Rejected': 'danger'
    };
    return `badge bg-${statusConfig[status as keyof typeof statusConfig]}`;
  };

  if (loading) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading enrollments...</span>
          </div>
          <p className="mt-2 text-muted">Loading enrollment data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center py-5">
          <div className="alert alert-danger">
            <h5>❌ Error Loading Enrollments</h5>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={refetch}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card shadow-sm">
        <div className="card-header bg-light">
          <h5 className="mb-0">📊 Enrollment Management</h5>
          <small className="text-muted">Manage course enrollments and overrides</small>
        </div>

        <div className="card-body border-bottom">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="btn-group">
                <button 
                  className={`btn btn-outline-secondary ${selectedStatus === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedStatus('all')}
                >
                  All ({enrollments?.length || 0})
                </button>
                {Object.entries(statusCounts).map(([status, count]) => (
                  <button
                    key={status}
                    className={`btn btn-outline-secondary ${selectedStatus === status ? 'active' : ''}`}
                    onClick={() => setSelectedStatus(status)}
                  >
                    {status} ({count})
                  </button>
                ))}
              </div>
            </div>
            <div className="col-md-6 text-end">
              <button className="btn btn-primary">
                📥 Export Enrollments
              </button>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Status</th>
                  <th>Enrollment Date</th>
                  <th>Grade</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnrollments?.map(enrollment => (
                  <tr key={enrollment.id}>
                    <td>
                      <strong>{enrollment.studentName}</strong>
                      <br />
                      <small className="text-muted">{enrollment.studentId}</small>
                    </td>
                    <td>
                      <strong>{enrollment.courseCode}</strong>
                      <br />
                      <small>{enrollment.courseName}</small>
                    </td>
                    <td>
                      <span className={getStatusBadge(enrollment.status)}>
                        {enrollment.status}
                      </span>
                    </td>
                    <td>
                      {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                    </td>
                    <td>
                      {enrollment.grade ? (
                        <span className="badge bg-success">{enrollment.grade}</span>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        {enrollment.status === 'Pending' && (
                          <>
                            <button 
                              className="btn btn-outline-success"
                              onClick={() => handleStatusUpdate(enrollment.id, 'Approved')}
                            >
                              Approve
                            </button>
                            <button 
                              className="btn btn-outline-danger"
                              onClick={() => handleStatusUpdate(enrollment.id, 'Rejected')}
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {enrollment.status === 'Waitlisted' && (
                          <button 
                            className="btn btn-outline-primary"
                            onClick={() => handleOverrideRequest(enrollment)}
                          >
                            Force Enroll
                          </button>
                        )}
                        <button className="btn btn-outline-info">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Override Modal */}
      {showOverrideModal && selectedEnrollment && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Force Enrollment Override</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowOverrideModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Force enroll <strong>{selectedEnrollment.studentName}</strong> into{' '}
                  <strong>{selectedEnrollment.courseCode}</strong>?
                </p>
                <div className="mb-3">
                  <label className="form-label">Override Reason</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={overrideReason}
                    onChange={(e) => setOverrideReason(e.target.value)}
                    placeholder="Enter justification for this override..."
                  />
                </div>
                {selectedEnrollment.overrideReason && (
                  <div className="alert alert-info">
                    <strong>Student's Reason:</strong> {selectedEnrollment.overrideReason}
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowOverrideModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={submitOverride}
                  disabled={!overrideReason.trim()}
                >
                  Confirm Override
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EnrollmentManager;