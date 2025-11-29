import React, { useState } from 'react';
import { apiService } from '../services/ApiService';

const ReportsAnalytics: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<any>(null);

  const reportTypes = [
    { id: 'enrollment', name: 'Enrollment Statistics', icon: '👥' },
    { id: 'grades', name: 'Grade Distribution', icon: '📊' },
    { id: 'attendance', name: 'Attendance Report', icon: '✅' },
    { id: 'financial', name: 'Financial Summary', icon: '💰' },
    { id: 'graduation', name: 'Graduation Audit', icon: '🎓' },
    { id: 'faculty', name: 'Faculty Workload', icon: '👨‍🏫' }
  ];

  const handleGenerateReport = async () => {
    if (!selectedReport) {
      alert('Please select a report type');
      return;
    }

    setIsGenerating(true);
    try {
      const result = await apiService.generateReport(selectedReport);
      setGeneratedReport(result);
    } catch (error) {
      alert('Error generating report');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportReport = (format: string) => {
    if (generatedReport) {
      alert(`Exporting report as ${format}...`);
    }
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card shadow-sm">
          <div className="card-header bg-light">
            <h5 className="mb-0">📈 Report Generator</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Report Type</label>
              <select
                className="form-select"
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
              >
                <option value="">Select a report...</option>
                {reportTypes.map(report => (
                  <option key={report.id} value={report.id}>
                    {report.icon} {report.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Date Range</label>
              <div className="row g-2">
                <div className="col-6">
                  <input
                    type="date"
                    className="form-control"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="date"
                    className="form-control"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary w-100"
              onClick={handleGenerateReport}
              disabled={isGenerating || !selectedReport}
            >
              {isGenerating ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Generating...
                </>
              ) : (
                '🚀 Generate Report'
              )}
            </button>
          </div>
        </div>

        <div className="card shadow-sm mt-4">
          <div className="card-header bg-light">
            <h6 className="mb-0">📊 Quick Stats</h6>
          </div>
          <div className="card-body">
            <div className="row text-center">
              <div className="col-6 mb-3">
                <div className="text-primary fw-bold fs-4">87%</div>
                <small className="text-muted">Avg. Attendance</small>
              </div>
              <div className="col-6 mb-3">
                <div className="text-success fw-bold fs-4">3.2</div>
                <small className="text-muted">Avg. GPA</small>
              </div>
              <div className="col-6">
                <div className="text-info fw-bold fs-4">94%</div>
                <small className="text-muted">Retention Rate</small>
              </div>
              <div className="col-6">
                <div className="text-warning fw-bold fs-4">78%</div>
                <small className="text-muted">Graduation Rate</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-8">
        <div className="card shadow-sm h-100">
          <div className="card-header bg-light d-flex justify-content-between align-items-center">
            <h5 className="mb-0">📄 Report Output</h5>
            {generatedReport && (
              <div className="btn-group">
                <button 
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleExportReport('PDF')}
                >
                  📥 PDF
                </button>
                <button 
                  className="btn btn-outline-success btn-sm"
                  onClick={() => handleExportReport('Excel')}
                >
                  📥 Excel
                </button>
                <button 
                  className="btn btn-outline-info btn-sm"
                  onClick={() => handleExportReport('CSV')}
                >
                  📥 CSV
                </button>
              </div>
            )}
          </div>
          <div className="card-body">
            {!generatedReport ? (
              <div className="text-center py-5 text-muted">
                <div className="fs-1">📋</div>
                <h5>No Report Generated</h5>
                <p>Select a report type and click "Generate Report" to view analytics</p>
              </div>
            ) : (
              <div>
                <div className="alert alert-success">
                  <strong>Report Generated Successfully!</strong>
                  <br />
                  Generated at: {new Date(generatedReport.generatedAt).toLocaleString()}
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="card mb-3">
                      <div className="card-header">
                        <h6 className="mb-0">Enrollment by Program</h6>
                      </div>
                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-2">
                          <span>Computer Science</span>
                          <span className="fw-bold">42%</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Software Engineering</span>
                          <span className="fw-bold">28%</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Information Systems</span>
                          <span className="fw-bold">30%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card mb-3">
                      <div className="card-header">
                        <h6 className="mb-0">Grade Distribution</h6>
                      </div>
                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-2">
                          <span>A Grades</span>
                          <span className="fw-bold text-success">35%</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>B Grades</span>
                          <span className="fw-bold text-info">45%</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>C & Below</span>
                          <span className="fw-bold text-warning">20%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Key Metrics</h6>
                  </div>
                  <div className="card-body">
                    <div className="row text-center">
                      <div className="col-3">
                        <div className="text-primary fw-bold fs-3">2,847</div>
                        <small>Total Students</small>
                      </div>
                      <div className="col-3">
                        <div className="text-success fw-bold fs-3">156</div>
                        <small>Active Courses</small>
                      </div>
                      <div className="col-3">
                        <div className="text-info fw-bold fs-3">87%</div>
                        <small>Success Rate</small>
                      </div>
                      <div className="col-3">
                        <div className="text-warning fw-bold fs-3">94%</div>
                        <small>Satisfaction</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;