import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { apiService } from '../services/ApiService';
import type { Grade } from '../types';

const GradeManager: React.FC = () => {
  const { data: grades, loading, error, refetch } = useApi(() => apiService.getGrades());
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
  const [newGrade, setNewGrade] = useState('');

  const courses = ['all', ...Array.from(new Set(grades?.map(g => g.courseCode) || []))];
  
  const filteredGrades = grades?.filter(grade => {
    const matchesCourse = selectedCourse === 'all' || grade.courseCode === selectedCourse;
    const matchesStatus = selectedStatus === 'all' || grade.status === selectedStatus;
    return matchesCourse && matchesStatus;
  });

  const handleEditGrade = (grade: Grade) => {
    setEditingGrade(grade);
    setNewGrade(grade.grade);
    setShowGradeModal(true);
  };

  const submitGradeUpdate = async () => {
    if (editingGrade) {
      try {
        await apiService.submitGrades([{ ...editingGrade, grade: newGrade }]);
        alert('Grade updated successfully');
        setShowGradeModal(false);
        refetch();
      } catch (error) {
        alert('Error updating grade');
      }
    }
  };

  const handleBulkAction = async (action: string) => {
    if (filteredGrades) {
      try {
        await apiService.submitGrades(filteredGrades);
        alert(`${action} completed successfully`);
        refetch();
      } catch (error) {
        alert(`Error during ${action}`);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Draft': 'secondary',
      'Submitted': 'warning',
      'Approved': 'info',
      'Published': 'success'
    };
    return `badge bg-${statusConfig[status as keyof typeof statusConfig]}`;
  };

  const getGradeColor = (grade: string) => {
    const gradeConfig: { [key: string]: string } = {
      'A': 'success',
      'A-': 'success',
      'B+': 'info',
      'B': 'info',
      'B-': 'info',
      'C+': 'warning',
      'C': 'warning',
      'C-': 'warning',
      'D+': 'danger',
      'D': 'danger',
      'F': 'danger'
    };
    return `text-${gradeConfig[grade] || 'secondary'}`;
  };

  if (loading) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading grades...</span>
          </div>
          <p className="mt-2 text-muted">Loading grade data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center py-5">
          <div className="alert alert-danger">
            <h5>❌ Error Loading Grades</h5>
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
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-0">📝 Grade Management</h5>
            <small className="text-muted">Manage and publish student grades</small>
          </div>
          <div>
            <button 
              className="btn btn-success me-2"
              onClick={() => handleBulkAction('approval')}
            >
              ✅ Approve All
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => handleBulkAction('publication')}
            >
              📤 Publish Grades
            </button>
          </div>
        </div>

        <div className="card-body border-bottom">
          <div className="row g-3">
            <div className="col-md-4">
              <select
                className="form-select"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                {courses.map(course => (
                  <option key={course} value={course}>
                    {course === 'all' ? 'All Courses' : course}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="Draft">Draft</option>
                <option value="Submitted">Submitted</option>
                <option value="Approved">Approved</option>
                <option value="Published">Published</option>
              </select>
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSelectedCourse('all');
                  setSelectedStatus('all');
                }}
              >
                Clear Filters
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
                  <th>Grade</th>
                  <th>Points</th>
                  <th>Credits</th>
                  <th>Semester</th>
                  <th>Status</th>
                  <th>Submission Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGrades?.map(grade => (
                  <tr key={grade.id}>
                    <td>
                      <strong>{grade.studentName}</strong>
                      <br />
                      <small className="text-muted">{grade.studentId}</small>
                    </td>
                    <td>
                      <strong>{grade.courseCode}</strong>
                      <br />
                      <small>{grade.courseName}</small>
                    </td>
                    <td>
                      <span className={`fw-bold ${getGradeColor(grade.grade)}`}>
                        {grade.grade}
                      </span>
                    </td>
                    <td>{grade.points.toFixed(1)}</td>
                    <td>{grade.credits}</td>
                    <td>{grade.semester}</td>
                    <td>
                      <span className={getStatusBadge(grade.status)}>
                        {grade.status}
                      </span>
                    </td>
                    <td>
                      {new Date(grade.submissionDate).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button 
                          className="btn btn-outline-primary"
                          onClick={() => handleEditGrade(grade)}
                        >
                          Edit
                        </button>
                        <button className="btn btn-outline-info">
                          History
                        </button>
                        {grade.status !== 'Published' && (
                          <button className="btn btn-outline-success">
                            Publish
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showGradeModal && editingGrade && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Grade</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowGradeModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Editing grade for <strong>{editingGrade.studentName}</strong> in{' '}
                  <strong>{editingGrade.courseCode}</strong>
                </p>
                <div className="mb-3">
                  <label className="form-label">Grade</label>
                  <select
                    className="form-select"
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                  >
                    <option value="A">A (4.0)</option>
                    <option value="A-">A- (3.7)</option>
                    <option value="B+">B+ (3.3)</option>
                    <option value="B">B (3.0)</option>
                    <option value="B-">B- (2.7)</option>
                    <option value="C+">C+ (2.3)</option>
                    <option value="C">C (2.0)</option>
                    <option value="C-">C- (1.7)</option>
                    <option value="D+">D+ (1.3)</option>
                    <option value="D">D (1.0)</option>
                    <option value="F">F (0.0)</option>
                  </select>
                </div>
                <div className="alert alert-info">
                  <strong>Current Status:</strong> {editingGrade.status}
                  <br />
                  <strong>Current Grade:</strong> {editingGrade.grade}
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowGradeModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={submitGradeUpdate}
                >
                  Update Grade
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GradeManager;