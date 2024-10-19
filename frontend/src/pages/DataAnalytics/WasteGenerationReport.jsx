import { useState, useEffect } from 'react';
import { getAllReports } from '../../services/analyticsService';
import { getFutureWastePrediction } from '../../services/analyticsService';
import { Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'chart.js/auto';

const WasteGenerationReport = () => {
    const [reports, setReports] = useState([]);
    const [error, setError] = useState('');
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
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

    const fetchPredictionData = async () => {
        try {
            const predictions = await getFutureWastePrediction(reports);  // Pass the report data
            setPredictionData(predictions);
        } catch (error) {
            console.error('Error fetching predictions', error);
            setError('Failed to fetch predictions.');
        }
    };

    const processChartData = (data) => {
        const wasteData = {};

        data.forEach((report) => {
            const { collectionDate, wasteWeight, wasteType } = report;
            const dateStr = collectionDate.toString();

            if (wasteData[dateStr]) {
                wasteData[dateStr].weight += parseFloat(wasteWeight);
            } else {
                wasteData[dateStr] = {
                    weight: parseFloat(wasteWeight),
                    wasteType,
                };
            }
        });

        const labels = Object.keys(wasteData);
        const weights = labels.map((date) => wasteData[date].weight);

        setChartData({
            labels,
            datasets: [
                {
                    label: 'Waste Weight (kg)',
                    data: weights,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        });
    };

    useEffect(() => {
        fetchReportsData();
    }, []);

    useEffect(() => {
        if (reports.length > 0) {
            fetchPredictionData();  // Fetch predictions once reports are loaded
        }
    }, [reports]);


    const generatePDF = () => {
        const pdf = new jsPDF();

        // Load logo and add it to the PDF
        pdf.addImage('/src/components/CSSELogo.png', 'PNG', 10, 10, 50, 30); // Logo in the top left corner

        // Set company name
        const companyName = 'WasteWise';
        pdf.setFontSize(16);
        const companyNameWidth = pdf.getTextWidth(companyName);
        pdf.text(companyName, (pdf.internal.pageSize.width - companyNameWidth) / 2, 20); // Center company name

        // Add tagline below the company name
        const tagline = 'Smart Solutions for a Cleaner Tomorrow';
        pdf.setFontSize(12);
        const taglineWidth = pdf.getTextWidth(tagline);
        pdf.text(tagline, (pdf.internal.pageSize.width - taglineWidth) / 2, 30); // Center tagline

        // Add the current date and time
        const currentDate = new Date().toLocaleString();
        pdf.setFontSize(10);
        pdf.text(`Date: ${currentDate}`, 150, 10);

        // Draw a horizontal line to separate content with more space
        pdf.setDrawColor(0);
        pdf.setLineWidth(0.5);
        const lineY = 40;
        pdf.line(10, lineY, pdf.internal.pageSize.width - 10, lineY);

        // Add title
        pdf.setFontSize(16);
        pdf.text('Waste Generation Report', 10, 50);

        // Adding chart to PDF
        const input = document.getElementById('report-content');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 10, 60, 190, 0);
            pdf.save('WasteGenerationReport.pdf');
        });
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Waste Generation Report</h2>
            <div id="report-content" style={styles.reportContent}>
                {error && <p style={styles.error}>{error}</p>}

                {loading ? (
                    <p style={styles.loading}>Loading report data...</p>
                ) : (
                    <>
                        {chartData ? (
                            <div>
                                <Bar
                                    data={chartData}
                                    options={{
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                title: {
                                                    display: true,
                                                    text: 'Waste Weight (kg)',
                                                },
                                            },
                                            x: {
                                                title: {
                                                    display: true,
                                                    text: 'Collection Date',
                                                },
                                            },
                                        },
                                        plugins: {
                                            legend: {
                                                position: 'top',
                                            },
                                        },
                                    }}
                                />
                            </div>
                        ) : (
                            <p>No chart data available.</p>
                        )}
                      {predictionData ? (
                            <div>
                                <h3>Predicted Future Waste Generation</h3>
                                <pre>{JSON.stringify(predictionData, null, 2)}</pre> {/* Display predictions */}
                            </div>
                        ) : (
                            <p>Loading predictions...</p>
                        )}
                    </>
                )}
            </div>

            <button 
                onClick={generatePDF} 
                style={styles.button}
            >
                Download Report as PDF
            </button>
        </div>
    );
};

const styles = {
    container: {
        padding: '30px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        maxWidth: '900px',
        margin: '0 auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
        textAlign: 'center',
        color: '#333',
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    reportContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    error: {
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loading: {
        textAlign: 'center',
        color: '#555',
    },
    button: {
        marginTop: '20px',
        padding: '12px 24px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#45a049',
    },
};

export default WasteGenerationReport;
