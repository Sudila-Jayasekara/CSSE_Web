
import { useNavigate } from 'react-router-dom';

const AnalyticsDashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const buttonStyle = {
    backgroundColor: '#0D47A1', // Dark blue color
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease', // Smooth hover effect
  };

  const buttonHoverStyle = {
    backgroundColor: '#1565C0', // Lighter blue on hover
  };

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <button
          style={buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
          onClick={() => handleNavigate('/data-analytics')}
        >
          Data Analytics Overview
        </button>

        <button
          style={buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
          onClick={() => handleNavigate('/highwaste')}
        >
          High Waste Areas Report
        </button>

        <button
          style={buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
          onClick={() => handleNavigate('/report-form')}
        >
          Add New Report
        </button>

        <button
          style={buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
         
        >
          View Reports
        </button>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
