class ApiService {
  private simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  async getStudents() {
    await this.simulateDelay(500);
    const { mockStudents } = await import('../data/mockData');
    return mockStudents;
  }

  async getCourses() {
    await this.simulateDelay(500);
    const { mockCourses } = await import('../data/mockData');
    return mockCourses;
  }

  async getEnrollments() {
    await this.simulateDelay(500);
    const { mockEnrollments } = await import('../data/mockData');
    return mockEnrollments;
  }

  async getGrades() {
    await this.simulateDelay(500);
    const { mockGrades } = await import('../data/mockData');
    return mockGrades;
  }

  async getTimetable() {
    await this.simulateDelay(500);
    const { mockTimetable } = await import('../data/mockData');
    return mockTimetable;
  }

  async getAlerts() {
    await this.simulateDelay(500);
    const { mockAlerts } = await import('../data/mockData');
    return mockAlerts;
  }

  async updateEnrollmentStatus(enrollmentId: string, status: string, reason?: string) {
    await this.simulateDelay(300);
    console.log(`Enrollment ${enrollmentId} status updated to ${status}`, reason);
    return { success: true, message: 'Enrollment status updated successfully' };
  }

  async submitGrades(grades: any[]) {
    await this.simulateDelay(500);
    console.log('Grades submitted:', grades);
    return { success: true, message: 'Grades submitted successfully' };
  }

  async generateReport(reportType: string) {
    await this.simulateDelay(1000);
    console.log(`Report generated: ${reportType}`);
    return { 
      success: true, 
      data: `Report data for ${reportType}`,
      generatedAt: new Date().toISOString()
    };
  }
}

export const apiService = new ApiService();