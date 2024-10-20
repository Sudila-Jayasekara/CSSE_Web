import { useState, useEffect } from 'react';
import { getAllReports } from '../../services/analyticsService';
import { Pie } from 'react-chartjs-2'; // Import the Pie component
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import regression from 'regression';
import 'chart.js/auto';

const ProcessingFacilityPerformanceReport = () => {
    const [reports, setReports] = useState([]);
    const [error, setError] = useState('');
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [analysis, setAnalysis] = useState({ totalWaste: 0, averageWaste: 0, maxWaste: 0, maxWasteType: '' });
    const [predictionData, setPredictionData] = useState(null);

    const fetchReportsData = async () => {
        try {
            const data = await getAllReports();
            if (Array.isArray(data)) {
                setReports(data);
                processChartData(data);
            } else {
                console.error('Fetched data is not an array:', data);
                setReports([]);
            }
        } catch (error) {
            console.error('Error fetching reports', error);
            setError('Failed to fetch reports.');
            setReports([]);
        } finally {
            setLoading(false);
        }
    };

    const processChartData = (data) => {
        const wasteData = {};
        let totalWeight = 0;

        data.forEach((report) => {
            const { wasteWeight, wasteType } = report;
            const weight = parseFloat(wasteWeight);

            totalWeight += weight;

            if (wasteData[wasteType]) {
                wasteData[wasteType].weight += weight;
            } else {
                wasteData[wasteType] = { weight };
            }
        });

        const labels = Object.keys(wasteData);
        const weights = labels.map((type) => wasteData[type].weight);

        const averageWeight = totalWeight / weights.length || 0;
        const maxWaste = Math.max(...weights);
        const maxWasteType = labels[weights.indexOf(maxWaste)];

        setAnalysis({
            totalWaste: totalWeight,
            averageWaste: averageWeight,
            maxWaste,
            maxWasteType,
        });

        setChartData({
            labels,
            datasets: [
                {
                    label: 'Waste Weight (kg)',
                    data: weights,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                    ],
                    borderColor: 'rgba(0, 0, 0, 1)',
                    borderWidth: 1,
                },
            ],
        });

        predictWasteTrends(); // Call the updated prediction function
    };

    const predictWasteTrends = () => {
        // Define the prediction types
        const wasteTypes = ['Plastic', 'Organic', 'Recyclable', 'Hazardous'];
        const predictedWeights = [];

        // Generate dummy predictions for each waste type (customize as needed)
        wasteTypes.forEach((type, index) => {
            predictedWeights.push(Math.random() * 100); // Random weight for demonstration
        });

        const futurePredictions = {};
        wasteTypes.forEach((type, index) => {
            futurePredictions[type] = predictedWeights[index];
        });

        setPredictionData(futurePredictions);
    };

    useEffect(() => {
        fetchReportsData();
    }, []);

    const generatePDF = () => {
        const pdf = new jsPDF();

        pdf.addImage('/src/components/CSSELogo.png', 'PNG', 10, 10, 50, 30);
        const companyName = 'WasteWise';
        pdf.setFontSize(16);
        const companyNameWidth = pdf.getTextWidth(companyName);
        pdf.text(companyName, (pdf.internal.pageSize.width - companyNameWidth) / 2, 20);

        const tagline = 'Smart Solutions for a Cleaner Tomorrow';
        pdf.setFontSize(12);
        const taglineWidth = pdf.getTextWidth(tagline);
        pdf.text(tagline, (pdf.internal.pageSize.width - taglineWidth) / 2, 30);

        const currentDate = new Date().toLocaleString();
        pdf.setFontSize(10);
        pdf.text(`Date: ${currentDate}`, 150, 10);

        pdf.setDrawColor(0);
        pdf.setLineWidth(0.5);
        const lineY = 40;
        pdf.line(10, lineY, pdf.internal.pageSize.width - 10, lineY);

        pdf.setFontSize(16);
        pdf.text('Processing Facility Performance Report', 10, 50);

        const input = document.getElementById('report-content');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 10, 60, 190, 0);
            pdf.save('ProcessingFacilityPerformanceReport.pdf');
        });
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Processing Facility Performance Report</h2>
            <div id="report-content" style={styles.reportContent}>
                {error && <p style={styles.error}>{error}</p>}

                {loading ? (
                    <p style={styles.loading}>Loading report data...</p>
                ) : (
                    <>
                        {chartData ? (
                            <div>
                                <div style={{ width: '300px', height: '300px' }}> {/* Make pie chart smaller */}
                                    <Pie
                                        data={chartData}
                                        options={{
                                            plugins: {
                                                legend: {
                                                    position: 'top',
                                                },
                                            },
                                        }}
                                    />
                                </div>
                                <div style={{ ...styles.analysis, marginBottom: '20px' }}>
                                    <h3>Analysis</h3>
                                    <p>Total Waste Processed: {analysis.totalWaste.toFixed(2)} kg</p>
                                    <p>Average Waste per Facility: {analysis.averageWaste.toFixed(2)} kg</p>
                                    <p>Highest Waste Processed: {analysis.maxWaste} kg from type {analysis.maxWasteType}</p>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <h3>Prediction for Waste Types:</h3>
                                    {predictionData ? (
                                        <ul>
                                            {Object.entries(predictionData).map(([type, predictedWeight], index) => (
                                                <li key={index}>
                                                    <strong>Type:</strong> {type} - 
                                                    <strong> Predicted Waste Weight:</strong> {predictedWeight.toFixed(2)} kg
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No predictions available.</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <p>No chart data available.</p>
                        )}
                    </>
                )}
            </div>

            <button 
                onClick={generatePDF} 
                style={styles.button}
            >
                Generate PDF Report
            </button>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#fff',
        maxWidth: '800px',
        margin: '20px auto',
    },
    header: {
        textAlign: 'center',
        color: '#333',
    },
    reportContent: {
        marginBottom: '20px',
    },
    error: {
        color: 'red',
    },
    loading: {
        color: 'blue',
    },
    analysis: {
        marginTop: '20px',
    },
    button: {
        display: 'block',
        margin: '0 auto',
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default ProcessingFacilityPerformanceReport;
