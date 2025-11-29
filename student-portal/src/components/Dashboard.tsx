import React, { useState } from 'react';
import KPICards from './KPICards';
import QuickActions from './QuickActions';
import AlertPanel from './AlertPanel';
import StudentList from './StudentList';
import EnrollmentManager from './EnrollmentManager';
import GradeManager from './GradeManager';
import TimetableManager from './TimetableManager';
import ReportsAnalytics from './ReportsAnalytics';
import CourseManager from './CourseManager';

type ActiveView = 'dashboard' | 'students' | 'enrollment' | 'grades' | 'timetable' | 'reports' | 'courses';

const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');

  const handleQuickAction = (action: string) => {
    alert(`Action triggered: ${action}`);
    
    // Navigate to relevant section based on action
    switch (action) {
      case 'Create Course':
        setActiveView('enrollment');
        break;
      case 'Open Enrollment':
        setActiveView('enrollment');
        break;
      case 'Run Graduation Audit':
        setActiveView('reports');
        break;
      case 'Publish Announcement':
        alert('Opening announcement composer...');
        break;
      case 'Sync Calendar':
        setActiveView('timetable');
        break;
      case 'Generate Reports':
        setActiveView('reports');
        break;
    }
  };

  const handleKpiClick = (kpiTitle: string) => {
    alert(`Viewing details for: ${kpiTitle}`);
    
    switch (kpiTitle) {
      case 'Total Students':
        setActiveView('students');
        break;
      case 'Pending Overrides':
        setActiveView('enrollment');
        break;
      case 'Upcoming Exams':
        setActiveView('timetable');
        break;
    }
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'students':
        return <StudentList />;
      case 'enrollment':
        return <EnrollmentManager />;
      case 'grades':
        return <GradeManager />;
      case 'timetable':
        return <TimetableManager />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'courses':
        return <CourseManager />;
      default:
        return (
          <>

            <div className="row mb-4">
              <div className="col-12">
                <div className="card bg-gradient-primary text-white shadow">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col">
                        <h2 className="card-title">Welcome to Student Portal Admin Dashboard</h2>
                        <p className="card-text">Manage students, courses, enrollments, and academic operations in one place.</p>
                        <div className="mt-3">
                          <span className="badge bg-light text-primary me-2">Students: 2,847</span>
                          <span className="badge bg-light text-success me-2">Courses: 156</span>
                          <span className="badge bg-light text-info">Active Semesters: 3</span>
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className="display-1">🎓</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <KPICards onKpiClick={handleKpiClick} />

            <div className="row">
              <div className="col-lg-8">
                <QuickActions onActionClick={handleQuickAction} />

                <div className="mb-4">
                  <StudentList />
                </div>

                <div className="row g-4">
                  <div className="col-md-6">
                    <div 
                      className="card shadow-sm h-100 clickable"
                      onClick={() => setActiveView('enrollment')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">📊 Enrollment Management</h6>
                        <span className="badge bg-light text-primary">47 pending</span>
                      </div>
                      <div className="card-body">
                        <p>Manage course enrollments, waitlists, and overrides</p>
                        <button className="btn btn-primary btn-sm">Manage Enrollments</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div 
                      className="card shadow-sm h-100 clickable"
                      onClick={() => setActiveView('timetable')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-header bg-info text-white">
                        <h6 className="mb-0">📅 Timetable Manager</h6>
                      </div>
                      <div className="card-body">
                        <p>Schedule courses and detect conflicts</p>
                        <button className="btn btn-info btn-sm">View Timetable</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div 
                      className="card shadow-sm h-100 clickable"
                      onClick={() => setActiveView('grades')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-header bg-success text-white">
                        <h6 className="mb-0">📝 Grade Manager</h6>
                      </div>
                      <div className="card-body">
                        <p>Submit, approve, and publish grades</p>
                        <button className="btn btn-success btn-sm">Manage Grades</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div 
                      className="card shadow-sm h-100 clickable"
                      onClick={() => setActiveView('reports')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-header bg-warning text-white">
                        <h6 className="mb-0">📈 Reports & Analytics</h6>
                      </div>
                      <div className="card-body">
                        <p>Generate academic reports and insights</p>
                        <button className="btn btn-warning btn-sm">View Reports</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-4">
                <AlertPanel />

                <div className="card shadow-sm">
                  <div className="card-header bg-light d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">📅 Upcoming Events</h6>
                    <button className="btn btn-sm btn-outline-primary">View All</button>
                  </div>
                  <div className="card-body">
                    <div className="list-group list-group-flush">
                      <div className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <strong>Midterm Exams</strong>
                          <br />
                          <small className="text-muted">Jan 20-25, 2024</small>
                        </div>
                        <span className="badge bg-danger">Urgent</span>
                      </div>
                      <div className="list-group-item">
                        <strong>Enrollment Period</strong>
                        <br />
                        <small className="text-muted">Feb 1-15, 2024</small>
                      </div>
                      <div className="list-group-item">
                        <strong>Faculty Meeting</strong>
                        <br />
                        <small className="text-muted">Jan 18, 2024 - 2:00 PM</small>
                      </div>
                      <div className="list-group-item">
                        <strong>Graduation Ceremony</strong>
                        <br />
                        <small className="text-muted">May 15, 2024 - 10:00 AM</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body py-2">
              <div className="nav nav-pills">
                <button 
                  className={`nav-link me-2 ${activeView === 'dashboard' ? 'active' : ''}`}
                  onClick={() => setActiveView('dashboard')}
                >
                  🏠 Dashboard
                </button>
                <button 
                  className={`nav-link me-2 ${activeView === 'students' ? 'active' : ''}`}
                  onClick={() => setActiveView('students')}
                >
                  👥 Students
                </button>
                <button 
                  className={`nav-link me-2 ${activeView === 'enrollment' ? 'active' : ''}`}
                  onClick={() => setActiveView('enrollment')}
                >
                  📊 Enrollment
                </button>
                <button 
                  className={`nav-link me-2 ${activeView === 'grades' ? 'active' : ''}`}
                  onClick={() => setActiveView('grades')}
                >
                  📝 Grades
                </button>
                <button 
                  className={`nav-link me-2 ${activeView === 'timetable' ? 'active' : ''}`}
                  onClick={() => setActiveView('timetable')}
                >
                  📅 Timetable
                </button>
                <button 
                  className={`nav-link ${activeView === 'reports' ? 'active' : ''}`}
                  onClick={() => setActiveView('reports')}
                >
                  📈 Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderActiveView()}
    </div>
  );
};

export default Dashboard;