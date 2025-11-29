export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  program: string;
  year: number;
  cgpa: number;
  status: 'Active' | 'Probation' | 'Graduated' | 'Inactive';
  enrollmentDate: string;
  phone?: string;
  address?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  capacity: number;
  enrolled: number;
  waitlist: number;
  department: string;
  semester: string;
  credits: number;
  prerequisites: string[];
  schedule: {
    days: string[];
    time: string;
    room: string;
  };
}

export interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  courseCode: string;
  courseName: string;
  status: 'Enrolled' | 'Waitlisted' | 'Pending' | 'Dropped' | 'Approved' | 'Rejected';
  enrollmentDate: string;
  grade?: string;
  overrideReason?: string;
}

export interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  courseCode: string;
  courseName: string;
  grade: string;
  semester: string;
  credits: number;
  points: number;
  submissionDate: string;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Published';
}

export interface Timetable {
  id: string;
  courseCode: string;
  courseName: string;
  day: string;
  startTime: string;
  endTime: string;
  room: string;
  instructor: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
  capacity: number;
  enrolled: number;
}

export interface Alert {
  id: string;
  type: 'warning' | 'danger' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
  isRead: boolean;
}

export interface Report {
  id: string;
  title: string;
  type: 'enrollment' | 'grades' | 'attendance' | 'financial';
  generatedDate: string;
  data: any;
}