import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { apiService } from '../services/ApiService';
import type { Student } from '../types';

const StudentList: React.FC = () => {
  const { data: students, loading, error, refetch } = useApi(() => apiService.getStudents());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgram, setFilterProgram] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = students?.filter(student => {
    const matchesSearch = 
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProgram = filterProgram === 'all' || student.program === filterProgram;
    const matchesYear = filterYear === 'all' || student.year.toString() === filterYear;
    
    return matchesSearch && matchesProgram && matchesYear;
  });

  const programs = ['all', ...Array.from(new Set(students?.map(s => s.program) || []))];
  const years = ['all', ...Array.from(new Set(students?.map(s => s.year.toString()) || []))];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Active': 'success',
      'Probation': 'warning',
      'Graduated': 'info',
      'Inactive': 'secondary'
    };
    return `badge bg-${statusConfig[status as keyof typeof statusConfig]}`;
  };

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
  };

  const handleCloseDetails = () => {
    setSelectedStudent(null);
  };

  if (loading) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading students...</span>
          </div>
          <p className="mt-2 text-muted">Loading student data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center py-5">
          <div className="alert alert-danger">
            <h5>❌ Error Loading Students</h5>
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
          <h5 className="mb-0">👥 Student Management</h5>
          <div className="d-flex align-items-center">
            <span className="badge bg-primary me-2">
              {filteredStudents?.length || 0} students
            </span>
            <button className="btn btn-success btn-sm" onClick={refetch}>
              🔄 Refresh
            </button>
          </div>
        </div>

        <div className="card-body border-bottom">
          <div className="row g-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={filterProgram}
                onChange={(e) => setFilterProgram(e.target.value)}
              >
                {programs.map(program => (
                  <option key={program} value={program}>
                    {program === 'all' ? 'All Programs' : program}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : `Year ${year}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearchTerm('');
                  setFilterProgram('all');
                  setFilterYear('all');
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Program</th>
                  <th>Year</th>
                  <th>CGPA</th>
                  <th>Status</th>
                  <th>Enrollment Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents?.map(student => (
                  <tr key={student.id}>
                    <td>
                      <strong>{student.studentId}</strong>
                      {student.id === '1' && <span className="badge bg-primary ms-1">You</span>}
                    </td>
                    <td>
                      {student.firstName} {student.lastName}
                      <br />
                      <small className="text-muted">{student.email}</small>
                    </td>
                    <td>{student.program}</td>
                    <td>
                      <span className="badge bg-info">Year {student.year}</span>
                    </td>
                    <td>
                      <span className={`fw-bold ${
                        student.cgpa >= 3.5 ? 'text-success' : 
                        student.cgpa >= 2.5 ? 'text-warning' : 'text-danger'
                      }`}>
                        {student.cgpa.toFixed(2)}
                      </span>
                    </td>
                    <td>
                      <span className={getStatusBadge(student.status)}>
                        {student.status}
                      </span>
                    </td>
                    <td>
                      <small className="text-muted">
                        {new Date(student.enrollmentDate).toLocaleDateString()}
                      </small>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button 
                          className="btn btn-outline-primary"
                          onClick={() => handleViewDetails(student)}
                        >
                          View
                        </button>
                        <button className="btn btn-outline-warning">
                          Edit
                        </button>
                        <button className="btn btn-outline-info">
                          Grades
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

      {selectedStudent && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Student Details - {selectedStudent.firstName} {selectedStudent.lastName}
                </h5>
                <button type="button" className="btn-close" onClick={handleCloseDetails}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Student ID:</strong> {selectedStudent.studentId}</p>
                    <p><strong>Email:</strong> {selectedStudent.email}</p>
                    <p><strong>Program:</strong> {selectedStudent.program}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Year:</strong> Year {selectedStudent.year}</p>
                    <p><strong>CGPA:</strong> 
                      <span className={`ms-2 ${
                        selectedStudent.cgpa >= 3.5 ? 'text-success fw-bold' : 
                        selectedStudent.cgpa >= 2.5 ? 'text-warning' : 'text-danger'
                      }`}>
                        {selectedStudent.cgpa.toFixed(2)}
                      </span>
                    </p>
                    <p><strong>Status:</strong> 
                      <span className={`ms-2 ${getStatusBadge(selectedStudent.status)}`}>
                        {selectedStudent.status}
                      </span>
                    </p>
                  </div>
                </div>
                {selectedStudent.phone && (
                  <p><strong>Phone:</strong> {selectedStudent.phone}</p>
                )}
                {selectedStudent.address && (
                  <p><strong>Address:</strong> {selectedStudent.address}</p>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseDetails}>
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Edit Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentList;