import { useState, useEffect } from 'react';
import { getAllReports } from '../../services/analyticsService';
import { Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import regression from 'regression';
import 'chart.js/auto';

const HighWasteAreaReport = () => {
    const [reports, setReports] = useState([]);
    const [error, setError] = useState('');
    const [chartData, setChartData] = useState(null);
    const [predictionData, setPredictionData] = useState(null);
    const [loading, setLoading] = useState(true);

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
        const locations = {};
        data.forEach((report) => {
            const { pickupLocation, wasteWeight } = report;
            if (pickupLocation in locations) {
                locations[pickupLocation].push({ weight: parseFloat(wasteWeight) });
            } else {
                locations[pickupLocation] = [{ weight: parseFloat(wasteWeight) }];
            }
        });

        const labels = Object.keys(locations);
        const weights = labels.map((loc) => locations[loc].reduce((sum, r) => sum + r.weight, 0));

        const backgroundColors = labels.map(() => {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            return `rgba(${r}, ${g}, ${b}, 0.6)`;
        });

        const borderColors = labels.map(() => {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            return `rgba(${r}, ${g}, ${b}, 1)`;
        });

        setChartData({
            labels,
            datasets: [
                {
                    label: 'Waste Weight (kg)',
                    data: weights,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1,
                },
            ],
        });

        predictWasteTrends(locations);
    };

    const predictWasteTrends = (locations) => {
        const futurePredictions = {};
        const currentTrendAnalysis = {};

        Object.keys(locations).forEach((location) => {
            const weightsOverTime = locations[location]
                .map((entry, index) => [index, entry.weight])
                .sort((a, b) => a[0] - b[0]);

            const result = regression.linear(weightsOverTime);
            const slope = result.equation[0];
            const intercept = result.equation[1];
            const nextMonthWeight = slope * weightsOverTime.length + intercept;

            futurePredictions[location] = nextMonthWeight;

            if (slope > 0) {
                currentTrendAnalysis[location] = 'increasing';
            } else if (slope < 0) {
                currentTrendAnalysis[location] = 'decreasing';
            } else {
                currentTrendAnalysis[location] = 'stable';
            }
        });

        setPredictionData({ futurePredictions, currentTrendAnalysis });
    };

    useEffect(() => {
        fetchReportsData();
    }, []);

    const generatePDF = () => {
        const pdf = new jsPDF();
    
        // Load logo and add it to the PDF (adjusted size)
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
        pdf.setDrawColor(0); // Set line color
        pdf.setLineWidth(0.5); // Set line width
        const lineY = 40; // Increased Y-coordinate for the line
        pdf.line(10, lineY, pdf.internal.pageSize.width - 10, lineY); // Draw line from left to right
    
        // Add title
        pdf.setFontSize(16);
        pdf.text('High Waste Area Report', 10, 50);
    
        // Adding chart to PDF
        const input = document.getElementById('report-content');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 10, 60, 190, 0);
            pdf.save('HighWasteAreaReport.pdf');
        });
    };
    
    
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>High Waste Area Report</h2>
            <div id="report-content">
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                {loading ? (
                    <p>Loading report data...</p>
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
                                                    text: 'Location',
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

                        <h3>Prediction for Next Month:</h3>
                        {predictionData ? (
                            <ul>
                                {Object.entries(predictionData.futurePredictions).map(([location, predictedWeight], index) => (
                                    <li key={index}>
                                        <strong>Location:</strong> {location} - 
                                        <strong> Predicted Waste Weight:</strong> {predictedWeight.toFixed(2)} kg 
                                        ({predictionData.currentTrendAnalysis[location]})
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No predictions available.</p>
                        )}

                        <h3>Analysis & Reasons for Trends:</h3>
                        <p>
                            The current analysis shows an 
                            {Object.entries(predictionData?.currentTrendAnalysis || {}).map(([location, trend], index) => (
                                <span key={index}> {location} is {trend}, </span>
                            ))} 
                            likely due to factors such as increased industrial activity, urbanization, and consumer behavior. 
                            For locations showing an upward trend, waste management may need to implement stricter measures to reduce 
                            waste, while areas with decreasing trends could benefit from ongoing recycling programs or other efforts to manage waste.
                        </p>
                    </>
                )}
            </div>

            <button 
                onClick={generatePDF} 
                style={{ 
                    marginTop: '20px', 
                    padding: '10px 20px', 
                    backgroundColor: '#4CAF50', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer',
                    fontSize: '16px'
                }}
            >
                Download Report as PDF
            </button>
        </div>
    );
};

export default HighWasteAreaReport;
