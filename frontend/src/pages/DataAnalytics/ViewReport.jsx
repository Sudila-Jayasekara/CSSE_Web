import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { getAllReports, deleteReport, updateReport } from '../../services/analyticsService'; 

const ViewReport = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null); // State to hold the selected report for editing
  const [error, setError] = useState(""); 
  const navigate = useNavigate(); 

  const fetchReportsData = async () => {
    try {
      const data = await getAllReports(); 
      if (Array.isArray(data)) {
        setReports(data);
      } else {
        console.error("Fetched data is not an array:", data);
        setReports([]); 
      }
    } catch (error) {
      console.error("Error fetching reports", error);
      setError("Failed to fetch reports."); 
      setReports([]); 
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        await deleteReport(id); 
        alert("Report deleted successfully!");
        fetchReportsData(); 
      } catch (error) {
        setError("Failed to delete report.");
      }
    }
  };

  const handleEdit = (report) => {
    setSelectedReport(report); // Set the selected report for editing
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateReport(selectedReport.id, selectedReport); // Update the report
      alert("Report updated successfully!");
      setSelectedReport(null); // Clear the selected report after updating
      fetchReportsData(); // Refresh the reports
    } catch (error) {
      console.error("Error updating report", error);
      setError("Failed to update report.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedReport((prev) => ({ ...prev, [name]: value })); // Update the selected report state
  };

  useEffect(() => {
    fetchReportsData(); 
  }, []);

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
    },
    heading: {
      textAlign: "center",
      color: "#333",
    },
    list: {
      listStyleType: "none",
      padding: "0",
    },
    listItem: {
      background: "#e9ecef",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "4px",
    },
    button: {
      marginLeft: "10px",
    },
    error: {
      color: "red",
    },
    form: {
      marginTop: "20px",
      border: "1px solid #ccc",
      padding: "15px",
      borderRadius: "8px",
      backgroundColor: "#f0f0f0",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Submitted Reports</h2>
      {error && <p style={styles.error}>{error}</p>}
      <ul style={styles.list}>
        {reports.length > 0 ? (
          reports.map((report) => (
            <li key={report.id} style={styles.listItem}>
              <strong>Date:</strong> {report.collectionDate} <br />
              <strong>Location:</strong> {report.pickupLocation} <br />
              <strong>Type:</strong> {report.wasteType} <br />
              <strong>Weight:</strong> {report.wasteWeight} kg <br />
              <strong>Route ID:</strong> {report.routeID} <br />
              <strong>Processing:</strong> {report.processingType} <br />
              <button onClick={() => handleEdit(report)} style={styles.button}>Edit</button>
              <button onClick={() => handleDelete(report.id)} style={{ ...styles.button, backgroundColor: 'red', color: 'white' }}>Delete</button>
            </li>
          ))
        ) : (
          <li>No reports submitted yet.</li>
        )}
      </ul>
      <button onClick={() => navigate("/report/new")} style={styles.button}>Add New Report</button>

      {/* Render the form for editing below the list if a report is selected */}
      {selectedReport && (
        <form onSubmit={handleUpdate} style={styles.form}>
          <h3>Edit Report</h3>
          <label>
            Date of Collection:
            <input
              type="date"
              name="collectionDate"
              value={selectedReport.collectionDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Pickup Location:
            <input
              type="text"
              name="pickupLocation"
              value={selectedReport.pickupLocation}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Waste Type:
            <select
              name="wasteType"
              value={selectedReport.wasteType}
              onChange={handleChange}
              required
            >
              <option value="">Select Waste Type</option>
              <option value="Organic">Organic</option>
              <option value="Plastic">Plastic</option>
              <option value="Hazardous">Hazardous</option>
              <option value="Recyclable">Recyclable</option>
            </select>
          </label>
          <label>
            Waste Weight (kg):
            <input
              type="number"
              name="wasteWeight"
              value={selectedReport.wasteWeight}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Route ID:
            <input
              type="text"
              name="routeID"
              value={selectedReport.routeID}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Processing Type:
            <select
              name="processingType"
              value={selectedReport.processingType}
              onChange={handleChange}
              required
            >
              <option value="">Select Processing Type</option>
              <option value="Landfill">Landfill</option>
              <option value="Recycling">Recycling</option>
              <option value="Composting">Composting</option>
            </select>
          </label>
          <button type="submit" style={styles.button}>Update Report</button>
          <button type="button" onClick={() => setSelectedReport(null)} style={{ ...styles.button, backgroundColor: 'gray', color: 'white' }}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default ViewReport;
