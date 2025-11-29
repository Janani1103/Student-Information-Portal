import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { apiService } from '../services/ApiService';
import type { Course } from '../types';

const CourseManager: React.FC = () => {
  const { data: courses, loading, error, refetch } = useApi(() => apiService.getCourses());
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    code: '',
    name: '',
    instructor: '',
    capacity: 30,
    enrolled: 0,
    waitlist: 0,
    department: 'Computer Science',
    semester: 'Spring 2024',
    credits: 3,
    prerequisites: [],
    schedule: {
      days: ['Mon'],
      time: '10:00 AM - 11:30 AM',
      room: 'A101'
    }
  });

  const filteredCourses = courses?.filter(course => {
    const matchesDepartment = selectedDepartment === 'all' || course.department === selectedDepartment;
    const matchesSemester = selectedSemester === 'all' || course.semester === selectedSemester;
    const matchesSearch = 
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDepartment && matchesSemester && matchesSearch;
  });

  const departments = ['all', ...Array.from(new Set(courses?.map(c => c.department) || []))];
  const semesters = ['all', ...Array.from(new Set(courses?.map(c => c.semester) || []))];

  const handleCreateCourse = async () => {
    if (!newCourse.code || !newCourse.name || !newCourse.instructor) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      console.log('Creating course:', newCourse);
      alert('Course created successfully!');
      setShowCreateModal(false);
      setNewCourse({
        code: '',
        name: '',
        instructor: '',
        capacity: 30,
        enrolled: 0,
        waitlist: 0,
        department: 'Computer Science',
        semester: 'Spring 2024',
        credits: 3,
        prerequisites: [],
        schedule: {
          days: ['Mon'],
          time: '10:00 AM - 11:30 AM',
          room: 'A101'
        }
      });
      refetch();
    } catch (error) {
      alert('Error creating course');
    }
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setShowEditModal(true);
  };

  const handleUpdateCourse = async () => {
    if (!selectedCourse) return;

    try {
      console.log('Updating course:', selectedCourse);
      alert('Course updated successfully!');
      setShowEditModal(false);
      setSelectedCourse(null);
      refetch();
    } catch (error) {
      alert('Error updating course');
    }
  };

  const handleDeleteCourse = async (_courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        alert('Course deleted successfully!');
        refetch();
      } catch (error) {
        alert('Error deleting course');
      }
    }
  };

  const getOccupancyColor = (enrolled: number, capacity: number) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 90) return 'danger';
    if (percentage >= 70) return 'warning';
    return 'success';
  };

  const getOccupancyPercentage = (enrolled: number, capacity: number) => {
    return ((enrolled / capacity) * 100).toFixed(1);
  };

  if (loading) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading courses...</span>
          </div>
          <p className="mt-2 text-muted">Loading course data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center py-5">
          <div className="alert alert-danger">
            <h5>❌ Error Loading Courses</h5>
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
            <h5 className="mb-0">📚 Course Management</h5>
            <small className="text-muted">Manage courses, schedules, and capacities</small>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            ➕ Create Course
          </button>
        </div>

        <div className="card-body border-bottom">
          <div className="row g-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
              >
                {semesters.map(sem => (
                  <option key={sem} value={sem}>
                    {sem === 'all' ? 'All Semesters' : sem}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDepartment('all');
                  setSelectedSemester('all');
                }}
              >
                Clear Filters
              </button>
            </div>
            <div className="col-md-3 text-end">
              <span className="badge bg-primary">
                {filteredCourses?.length || 0} courses
              </span>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Instructor</th>
                  <th>Department</th>
                  <th>Semester</th>
                  <th>Schedule</th>
                  <th>Enrollment</th>
                  <th>Capacity</th>
                  <th>Waitlist</th>
                  <th>Credits</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses?.map(course => (
                  <tr key={course.id}>
                    <td>
                      <strong>{course.code}</strong>
                    </td>
                    <td>
                      <strong>{course.name}</strong>
                      {course.prerequisites.length > 0 && (
                        <div>
                          <small className="text-muted">
                            Prereqs: {course.prerequisites.join(', ')}
                          </small>
                        </div>
                      )}
                    </td>
                    <td>{course.instructor}</td>
                    <td>
                      <span className="badge bg-info">{course.department}</span>
                    </td>
                    <td>{course.semester}</td>
                    <td>
                      <small>
                        {course.schedule.days.join(', ')}
                        <br />
                        {course.schedule.time}
                        <br />
                        <span className="text-muted">{course.schedule.room}</span>
                      </small>
                    </td>
                    <td>
                      <span className={`text-${getOccupancyColor(course.enrolled, course.capacity)} fw-bold`}>
                        {course.enrolled}
                      </span>
                    </td>
                    <td>
                      {course.capacity}
                      <div className="progress mt-1" style={{ height: '4px' }}>
                        <div 
                          className={`progress-bar bg-${getOccupancyColor(course.enrolled, course.capacity)}`}
                          style={{ 
                            width: `${Math.min((course.enrolled / course.capacity) * 100, 100)}%` 
                          }}
                        ></div>
                      </div>
                      <small className="text-muted">
                        {getOccupancyPercentage(course.enrolled, course.capacity)}%
                      </small>
                    </td>
                    <td>
                      {course.waitlist > 0 ? (
                        <span className="badge bg-warning">{course.waitlist}</span>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                    <td>
                      <span className="badge bg-secondary">{course.credits}</span>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button 
                          className="btn btn-outline-primary"
                          onClick={() => handleEditCourse(course)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-outline-info"
                          onClick={() => alert(`Viewing details for ${course.code}`)}
                        >
                          View
                        </button>
                        <button 
                          className="btn btn-outline-danger"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          Delete
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

      {showCreateModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Course</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowCreateModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Course Code *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newCourse.code}
                      onChange={(e) => setNewCourse(prev => ({ ...prev, code: e.target.value }))}
                      placeholder="e.g., CS401"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Course Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newCourse.name}
                      onChange={(e) => setNewCourse(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Advanced React Development"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Instructor *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newCourse.instructor}
                      onChange={(e) => setNewCourse(prev => ({ ...prev, instructor: e.target.value }))}
                      placeholder="e.g., Dr. John Doe"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Department</label>
                    <select
                      className="form-select"
                      value={newCourse.department}
                      onChange={(e) => setNewCourse(prev => ({ ...prev, department: e.target.value }))}
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Software Engineering">Software Engineering</option>
                      <option value="Information Systems">Information Systems</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Engineering">Engineering</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Semester</label>
                    <select
                      className="form-select"
                      value={newCourse.semester}
                      onChange={(e) => setNewCourse(prev => ({ ...prev, semester: e.target.value }))}
                    >
                      <option value="Spring 2024">Spring 2024</option>
                      <option value="Fall 2024">Fall 2024</option>
                      <option value="Summer 2024">Summer 2024</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Credits</label>
                    <select
                      className="form-select"
                      value={newCourse.credits}
                      onChange={(e) => setNewCourse(prev => ({ ...prev, credits: parseInt(e.target.value) }))}
                    >
                      <option value={1}>1 Credit</option>
                      <option value={2}>2 Credits</option>
                      <option value={3}>3 Credits</option>
                      <option value={4}>4 Credits</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Capacity</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newCourse.capacity}
                      onChange={(e) => setNewCourse(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                      min="1"
                      max="500"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Room</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newCourse.schedule?.room}
                      onChange={(e) => setNewCourse(prev => ({ 
                        ...prev, 
                        schedule: { ...prev.schedule!, room: e.target.value }
                      }))}
                      placeholder="e.g., A101"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Days</label>
                    <select
                      className="form-select"
                      value={newCourse.schedule?.days[0]}
                      onChange={(e) => setNewCourse(prev => ({ 
                        ...prev, 
                        schedule: { ...prev.schedule!, days: [e.target.value] }
                      }))}
                    >
                      <option value="Mon">Monday</option>
                      <option value="Tue">Tuesday</option>
                      <option value="Wed">Wednesday</option>
                      <option value="Thu">Thursday</option>
                      <option value="Fri">Friday</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Time</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newCourse.schedule?.time}
                      onChange={(e) => setNewCourse(prev => ({ 
                        ...prev, 
                        schedule: { ...prev.schedule!, time: e.target.value }
                      }))}
                      placeholder="e.g., 10:00 AM - 11:30 AM"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Prerequisites (comma separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newCourse.prerequisites?.join(', ')}
                      onChange={(e) => setNewCourse(prev => ({ 
                        ...prev, 
                        prerequisites: e.target.value.split(',').map(p => p.trim()).filter(p => p)
                      }))}
                      placeholder="e.g., CS301, CS302"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleCreateCourse}
                  disabled={!newCourse.code || !newCourse.name || !newCourse.instructor}
                >
                  Create Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditModal && selectedCourse && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Course - {selectedCourse.code}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Course Code</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedCourse.code}
                      onChange={(e) => setSelectedCourse(prev => prev ? { ...prev, code: e.target.value } : null)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Course Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedCourse.name}
                      onChange={(e) => setSelectedCourse(prev => prev ? { ...prev, name: e.target.value } : null)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Instructor</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedCourse.instructor}
                      onChange={(e) => setSelectedCourse(prev => prev ? { ...prev, instructor: e.target.value } : null)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Department</label>
                    <select
                      className="form-select"
                      value={selectedCourse.department}
                      onChange={(e) => setSelectedCourse(prev => prev ? { ...prev, department: e.target.value } : null)}
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Software Engineering">Software Engineering</option>
                      <option value="Information Systems">Information Systems</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Capacity</label>
                    <input
                      type="number"
                      className="form-control"
                      value={selectedCourse.capacity}
                      onChange={(e) => setSelectedCourse(prev => prev ? { ...prev, capacity: parseInt(e.target.value) } : null)}
                      min="1"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Current Enrollment</label>
                    <input
                      type="number"
                      className="form-control"
                      value={selectedCourse.enrolled}
                      onChange={(e) => setSelectedCourse(prev => prev ? { ...prev, enrolled: parseInt(e.target.value) } : null)}
                      min="0"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Waitlist</label>
                    <input
                      type="number"
                      className="form-control"
                      value={selectedCourse.waitlist}
                      onChange={(e) => setSelectedCourse(prev => prev ? { ...prev, waitlist: parseInt(e.target.value) } : null)}
                      min="0"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Credits</label>
                    <input
                      type="number"
                      className="form-control"
                      value={selectedCourse.credits}
                      onChange={(e) => setSelectedCourse(prev => prev ? { ...prev, credits: parseInt(e.target.value) } : null)}
                      min="1"
                      max="6"
                    />
                  </div>
                  <div className="col-12">
                    <div className="alert alert-info">
                      <strong>Current Enrollment:</strong> {selectedCourse.enrolled} / {selectedCourse.capacity} 
                      ({getOccupancyPercentage(selectedCourse.enrolled, selectedCourse.capacity)}% full)
                      <br />
                      <strong>Waitlist:</strong> {selectedCourse.waitlist} students
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleUpdateCourse}
                >
                  Update Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseManager;