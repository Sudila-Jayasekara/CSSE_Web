import { useState, useEffect } from "react";
import { getAllReports } from '../../services/analyticsService'; // Only import getAllReports
import axios
 from "axios";
const ReportForm = () => {
  const [formData, setFormData] = useState({
    collectionDate: "",
    pickupLocation: "",
    wasteType: "",
    wasteWeight: "",
    routeID: "",
    processingType: ""
  });

  const [reports, setReports] = useState([]); // State to hold fetched reports
  const [error, setError] = useState(""); // State for error handling

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/reports", formData);
      alert("Report submitted successfully!");
      setFormData({
        collectionDate: "",
        pickupLocation: "",
        wasteType: "",
        wasteWeight: "",
        routeID: "",
        processingType: ""
      });

      // Optionally fetch reports again after submission
      fetchReportsData();
    } catch (error) {
      console.error("Error submitting report", error);
      alert("Error submitting report");
    }
  };

  const fetchReportsData = async () => {
    try {
      const data = await getAllReports(); // Use getAllReports
      if (Array.isArray(data)) {
        setReports(data);
      } else {
        console.error("Fetched data is not an array:", data);
        setReports([]); // Fallback to empty array if data is not an array
      }
    } catch (error) {
      console.error("Error fetching reports", error);
      setError("Failed to fetch reports."); // Set error message
      setReports([]); // Clear reports on error
    }
  };

  useEffect(() => {
    fetchReportsData(); // Fetch reports when the component mounts
  }, []);

  // Inline CSS styles
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
    form: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      marginBottom: "10px",
      fontWeight: "bold",
    },
    input: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      marginTop: "5px",
      width: "100%",
    },
    button: {
      padding: "10px",
      backgroundColor: "#4CAF50", // Green
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
      marginTop: "10px",
    },
    reportHeading: {
      marginTop: "20px",
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
    error: {
      color: "red",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Waste Collection Report</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Date of Collection:
          <input
            type="date"
            name="collectionDate"
            value={formData.collectionDate}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Pickup Location:
          <input
            type="text"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Waste Type:
          <select
            name="wasteType"
            value={formData.wasteType}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select Waste Type</option>
            <option value="Organic">Organic</option>
            <option value="Plastic">Plastic</option>
            <option value="Hazardous">Hazardous</option>
            <option value="Recyclable">Recyclable</option>
          </select>
        </label>
        <label style={styles.label}>
          Waste Weight (kg):
          <input
            type="number"
            name="wasteWeight"
            value={formData.wasteWeight}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Route ID:
          <input
            type="text"
            name="routeID"
            value={formData.routeID}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Processing Type:
          <select
            name="processingType"
            value={formData.processingType}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select Processing Type</option>
            <option value="Landfill">Landfill</option>
            <option value="Recycling">Recycling</option>
            <option value="Composting">Composting</option>
          </select>
        </label>
        <button type="submit" style={styles.button}>
          Submit Report
        </button>
      </form>

      {/* Display fetched reports */}
      <h3 style={styles.reportHeading}>Submitted Reports:</h3>
      {error && <p style={styles.error}>{error}</p>} {/* Display error message if any */}
      <ul style={styles.list}>
        {reports.length > 0 ? (
          reports.map((report, index) => (
            <li key={index} style={styles.listItem}>
              <strong>Date:</strong> {report.collectionDate} <br />
              <strong>Location:</strong> {report.pickupLocation} <br />
              <strong>Type:</strong> {report.wasteType} <br />
              <strong>Weight:</strong> {report.wasteWeight} kg <br />
              <strong>Route ID:</strong> {report.routeID} <br />
              <strong>Processing:</strong> {report.processingType}
            </li>
          ))
        ) : (
          <li>No reports submitted yet.</li>
        )}
      </ul>
    </div>
  );
};

export default ReportForm;
