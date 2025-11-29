import React from 'react';

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="#">
          🎓 Student Information Portal
        </a>
        <div className="navbar-nav ms-auto">
          <div className="d-flex align-items-center">
            <div className="input-group me-3" style={{ width: '300px' }}>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search students/courses..."
              />
              <button className="btn btn-light">
                🔍
              </button>
            </div>
            <button className="btn btn-light me-2 position-relative">
              🔔
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </button>
            <div className="dropdown">
              <button className="btn btn-outline-light dropdown-toggle" data-bs-toggle="dropdown">
                👤 Admin User
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;