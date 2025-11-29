import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { apiService } from '../services/ApiService';

const TimetableManager: React.FC = () => {
  const { data: timetable, loading, error, refetch } = useApi(() => apiService.getTimetable());
  const [selectedDay, setSelectedDay] = useState('all');
  const [selectedRoom, setSelectedRoom] = useState('all');
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [conflicts, setConflicts] = useState<string[]>([]);

  const days = ['all', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const rooms = ['all', ...Array.from(new Set(timetable?.map(t => t.room) || []))];

  const filteredTimetable = timetable?.filter(slot => {
    const matchesDay = selectedDay === 'all' || slot.day === selectedDay;
    const matchesRoom = selectedRoom === 'all' || slot.room === selectedRoom;
    return matchesDay && matchesRoom;
  });

  const checkConflicts = () => {
    // Simulate conflict detection
    const detectedConflicts = [
      'Room A101 double-booked on Monday 10:00-11:30',
      'Instructor Dr. John Doe has overlapping classes on Wednesday',
      'Student capacity exceeded in CS401 lab session'
    ];
    setConflicts(detectedConflicts);
    setShowConflictModal(true);
  };

  const getOccupancyColor = (enrolled: number, capacity: number) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 90) return 'danger';
    if (percentage >= 70) return 'warning';
    return 'success';
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      'Lecture': 'primary',
      'Lab': 'success',
      'Tutorial': 'info'
    };
    return `badge bg-${typeConfig[type as keyof typeof typeConfig]}`;
  };

  if (loading) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading timetable...</span>
          </div>
          <p className="mt-2 text-muted">Loading timetable data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center py-5">
          <div className="alert alert-danger">
            <h5>❌ Error Loading Timetable</h5>
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
            <h5 className="mb-0">📅 Timetable Manager</h5>
            <small className="text-muted">Manage class schedules and room allocations</small>
          </div>
          <div>
            <button 
              className="btn btn-warning me-2"
              onClick={checkConflicts}
            >
              ⚠️ Check Conflicts
            </button>
            <button className="btn btn-primary">
              🗓️ Generate Timetable
            </button>
          </div>
        </div>

        <div className="card-body border-bottom">
          <div className="row g-3">
            <div className="col-md-4">
              <select
                className="form-select"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                {days.map(day => (
                  <option key={day} value={day}>
                    {day === 'all' ? 'All Days' : day}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
              >
                {rooms.map(room => (
                  <option key={room} value={room}>
                    {room === 'all' ? 'All Rooms' : room}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSelectedDay('all');
                  setSelectedRoom('all');
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
                  <th>Course</th>
                  <th>Type</th>
                  <th>Day</th>
                  <th>Time</th>
                  <th>Room</th>
                  <th>Instructor</th>
                  <th>Enrollment</th>
                  <th>Capacity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTimetable?.map(slot => (
                  <tr key={slot.id}>
                    <td>
                      <strong>{slot.courseCode}</strong>
                      <br />
                      <small>{slot.courseName}</small>
                    </td>
                    <td>
                      <span className={getTypeBadge(slot.type)}>
                        {slot.type}
                      </span>
                    </td>
                    <td>{slot.day}</td>
                    <td>
                      {slot.startTime} - {slot.endTime}
                    </td>
                    <td>
                      <strong>{slot.room}</strong>
                    </td>
                    <td>{slot.instructor}</td>
                    <td>
                      <span className={`text-${getOccupancyColor(slot.enrolled, slot.capacity)}`}>
                        {slot.enrolled}
                      </span>
                    </td>
                    <td>{slot.capacity}</td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-primary">
                          Edit
                        </button>
                        <button className="btn btn-outline-warning">
                          Reschedule
                        </button>
                        <button className="btn btn-outline-info">
                          Students
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

      {showConflictModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">⚠️ Timetable Conflicts Detected</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowConflictModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="alert alert-warning">
                  <strong>Found {conflicts.length} potential conflicts:</strong>
                </div>
                <ul className="list-group">
                  {conflicts.map((conflict, index) => (
                    <li key={index} className="list-group-item">
                      {conflict}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowConflictModal(false)}
                >
                  Close
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => {
                    alert('Auto-rescheduling in progress...');
                    setShowConflictModal(false);
                  }}
                >
                  Auto-Resolve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TimetableManager;