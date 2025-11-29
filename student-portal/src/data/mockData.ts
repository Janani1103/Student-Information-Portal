import type { Student, Course, Enrollment, Grade, Timetable, Alert } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    studentId: 'STU001',
    firstName: 'PS21240',
    lastName: 'MDJNGunathilaka',
    email: 'ps21240@example.com',
    program: 'Computer Science',
    year: 3,
    cgpa: 3.8,
    status: 'Active',
    enrollmentDate: '2022-09-01',
    phone: '+94 77 123 4567',
    address: '123 University Ave, Colombo'
  },
  {
    id: '2',
    studentId: 'STU002',
    firstName: 'Upeksha',
    lastName: 'Teshani',
    email: 'upeksha@example.com',
    program: 'Software Engineering',
    year: 2,
    cgpa: 3.6,
    status: 'Active',
    enrollmentDate: '2023-01-15'
  },
  {
    id: '3',
    studentId: 'STU003',
    firstName: 'Sahasya',
    lastName: 'Irumi',
    email: 'sahasya@example.com',
    program: 'Information Systems',
    year: 4,
    cgpa: 2.8,
    status: 'Probation',
    enrollmentDate: '2021-09-01'
  },
  {
    id: '4',
    studentId: 'STU004',
    firstName: 'Kaveesha',
    lastName: 'Nethmi',
    email: 'kaveesha@example.com',
    program: 'Computer Science',
    year: 3,
    cgpa: 3.9,
    status: 'Active',
    enrollmentDate: '2022-09-01'
  },
  {
    id: '5',
    studentId: 'STU005',
    firstName: 'Dahami',
    lastName: 'Shehara',
    email: 'dahami@example.com',
    program: 'Software Engineering',
    year: 1,
    cgpa: 3.2,
    status: 'Active',
    enrollmentDate: '2024-01-10'
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    code: 'CS401',
    name: 'Advanced React Development',
    instructor: 'Dr. Dammi Chathurika',
    capacity: 30,
    enrolled: 28,
    waitlist: 5,
    department: 'Computer Science',
    semester: 'Spring 2024',
    credits: 3,
    prerequisites: ['CS301', 'CS302'],
    schedule: {
      days: ['Mon', 'Wed'],
      time: '10:00 AM - 11:30 AM',
      room: 'A101'
    }
  },
  {
    id: '2',
    code: 'SE301',
    name: 'Software Architecture',
    instructor: 'Prof. Thakshila Dilrukshi',
    capacity: 25,
    enrolled: 25,
    waitlist: 8,
    department: 'Software Engineering',
    semester: 'Spring 2024',
    credits: 4,
    prerequisites: ['SE201'],
    schedule: {
      days: ['Tue', 'Thu'],
      time: '2:00 PM - 3:30 PM',
      room: 'B205'
    }
  },
  {
    id: '3',
    code: 'IS201',
    name: 'Database Systems',
    instructor: 'Dr. Prathibha Parami',
    capacity: 35,
    enrolled: 32,
    waitlist: 3,
    department: 'Information Systems',
    semester: 'Spring 2024',
    credits: 3,
    prerequisites: ['CS101'],
    schedule: {
      days: ['Mon', 'Wed', 'Fri'],
      time: '9:00 AM - 10:00 AM',
      room: 'C301'
    }
  }
];

export const mockEnrollments: Enrollment[] = [
  {
    id: '1',
    studentId: 'STU001',
    studentName: 'PS21240MDJNGunathilaka',
    courseCode: 'CS401',
    courseName: 'Advanced React Development',
    status: 'Enrolled',
    enrollmentDate: '2024-01-10',
    grade: 'A'
  },
  {
    id: '2',
    studentId: 'STU002',
    studentName: 'Upeksha Teshani',
    courseCode: 'SE301',
    courseName: 'Software Architecture',
    status: 'Waitlisted',
    enrollmentDate: '2024-01-12'
  },
  {
    id: '3',
    studentId: 'STU002',
    studentName: 'Sahasya Irumi',
    courseCode: 'CS401',
    courseName: 'Advanced React Development',
    status: 'Enrolled',
    enrollmentDate: '2024-01-09'
  },
  {
    id: '4',
    studentId: 'STU003',
    studentName: 'Kaveesha Nethmi',
    courseCode: 'IS201',
    courseName: 'Database Systems',
    status: 'Pending',
    enrollmentDate: '2024-01-11',
    overrideReason: 'Prerequisite waiver requested'
  }
];

export const mockGrades: Grade[] = [
  {
    id: '1',
    studentId: 'PS21240MDJNGunathilaka',
    studentName: 'MDJN Gunathilaka',
    courseCode: 'CS401',
    courseName: 'Advanced React Development',
    grade: 'A',
    semester: 'Fall 2023',
    credits: 3,
    points: 4.0,
    submissionDate: '2023-12-15',
    status: 'Published'
  },
  {
    id: '2',
    studentId: 'STU002',
    studentName: 'Upeksha Teshani',
    courseCode: 'SE301',
    courseName: 'Software Architecture',
    grade: 'A-',
    semester: 'Fall 2023',
    credits: 4,
    points: 3.7,
    submissionDate: '2023-12-18',
    status: 'Published'
  },
  {
    id: '3',
    studentId: 'STU002',
    studentName: 'Sahasya Irumi',
    courseCode: 'CS401',
    courseName: 'Advanced React Development',
    grade: 'B+',
    semester: 'Fall 2023',
    credits: 3,
    points: 3.3,
    submissionDate: '2023-12-16',
    status: 'Published'
  }
];

export const mockTimetable: Timetable[] = [
  {
    id: '1',
    courseCode: 'CS401',
    courseName: 'Advanced React Development',
    day: 'Monday',
    startTime: '10:00',
    endTime: '11:30',
    room: 'A101',
    instructor: 'Dr. Malsha Navodini',
    type: 'Lecture',
    capacity: 30,
    enrolled: 28
  },
  {
    id: '2',
    courseCode: 'CS401',
    courseName: 'Advanced React Development',
    day: 'Wednesday',
    startTime: '10:00',
    endTime: '11:30',
    room: 'A101',
    instructor: 'Dr. Majee Rupasinghe',
    type: 'Lecture',
    capacity: 30,
    enrolled: 28
  },
  {
    id: '3',
    courseCode: 'SE301',
    courseName: 'Software Architecture',
    day: 'Tuesday',
    startTime: '14:00',
    endTime: '15:30',
    room: 'B205',
    instructor: 'Prof. Shashikala Lakshini',
    type: 'Lecture',
    capacity: 25,
    enrolled: 25
  },
  {
    id: '4',
    courseCode: 'IS201',
    courseName: 'Database Systems',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    room: 'C301',
    instructor: 'Dr. Iresha Dilrukshi',
    type: 'Lecture',
    capacity: 35,
    enrolled: 32
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'danger',
    title: 'Capacity Breach',
    message: 'CS401 has exceeded 120% capacity',
    timestamp: '2024-01-15 10:30',
    priority: 'high',
    isRead: false
  },
  {
    id: '2',
    type: 'warning',
    title: 'Timetable Conflict',
    message: 'Room A101 double-booked for Monday 9 AM',
    timestamp: '2024-01-15 09:15',
    priority: 'high',
    isRead: false
  },
  {
    id: '3',
    type: 'warning',
    title: 'Academic Warning',
    message: '15 students at risk of academic probation',
    timestamp: '2024-01-14 16:45',
    priority: 'medium',
    isRead: true
  },
  {
    id: '4',
    type: 'info',
    title: 'System Maintenance',
    message: 'Portal maintenance scheduled for Saturday 2-4 AM',
    timestamp: '2024-01-14 14:20',
    priority: 'low',
    isRead: true
  }
];