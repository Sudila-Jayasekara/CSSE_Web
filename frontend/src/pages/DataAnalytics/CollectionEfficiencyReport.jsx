import { useState, useEffect } from 'react';
import { getAllRecycleItems } from '../../services/analyticsService';
import { Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import regression from 'regression';
import 'chart.js/auto';

const CollectionEfficiencyReport = () => {
    const [reports, setReports] = useState([]); // Fixed here
    const [error, setError] = useState('');
    const [chartData, setChartData] = useState(null);
    const [predictionData, setPredictionData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchReportsData = async () => {
        try {
            const data = await getAllRecycleItems(); // Adjust this method to get collection efficiency data
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
        const routes = {};
        data.forEach((report) => {
            const { pickupLocation, dateTime, totalQuantity } = report; // Adjust property names according to your data
            const date = new Date(dateTime).toLocaleDateString(); // Format date for display
            const key = `${pickupLocation}-${date}`; // Unique key for each route and date
            
            if (routes[key]) {
                routes[key] += parseFloat(totalQuantity);
            } else {
                routes[key] = parseFloat(totalQuantity);
            }
        });

        const labels = Object.keys(routes);
        const weights = labels.map((key) => routes[key]);

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
                    label: 'Total Quantity Collected (kg)',
                    data: weights,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1,
                },
            ],
        });

        predictCollectionTrends(routes);
    };

    const predictCollectionTrends = (routes) => {
        const futurePredictions = {};
        const currentTrendAnalysis = {};

        Object.keys(routes).forEach((route) => {
            const weightsOverTime = routes[route]
                .map((entry, index) => [index, entry])
                .sort((a, b) => a[0] - b[0]);

            const result = regression.linear(weightsOverTime);
            const slope = result.equation[0];
            const intercept = result.equation[1];
            const nextMonthWeight = slope * weightsOverTime.length + intercept;

            futurePredictions[route] = nextMonthWeight;

            if (slope > 0) {
                currentTrendAnalysis[route] = 'increasing';
            } else if (slope < 0) {
                currentTrendAnalysis[route] = 'decreasing';
            } else {
                currentTrendAnalysis[route] = 'stable';
            }
        });

        setPredictionData({ futurePredictions, currentTrendAnalysis });
    };

    useEffect(() => {
        fetchReportsData();
    }, []);

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
    
        // Draw a horizontal line to separate content
        pdf.setDrawColor(0); // Set line color
        pdf.setLineWidth(0.5); // Set line width
        const lineY = 40; // Y-coordinate for the line
        pdf.line(10, lineY, pdf.internal.pageSize.width - 10, lineY); // Draw line from left to right
    
        // Add title
        pdf.setFontSize(16);
        pdf.text('Collection Efficiency Report', 10, 50);
    
        // Adding chart to PDF
        const input = document.getElementById('report-content');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 10, 60, 190, 0);
            pdf.save('CollectionEfficiencyReport.pdf');
        });
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Collection Efficiency Report</h2>
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
                                                    text: 'Total Quantity Collected (kg)',
                                                },
                                            },
                                            x: {
                                                title: {
                                                    display: true,
                                                    text: 'Route and Date',
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
                                {Object.entries(predictionData.futurePredictions).map(([route, predictedWeight], index) => (
                                    <li key={index}>
                                        <strong>Route:</strong> {route} - 
                                        <strong> Predicted Quantity:</strong> {predictedWeight.toFixed(2)} kg 
                                        ({predictionData.currentTrendAnalysis[route]})
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No predictions available.</p>
                        )}

                        <h3>Analysis & Reasons for Trends:</h3>
                        <p>
                            The current analysis shows trends for routes indicating 
                            {Object.entries(predictionData?.currentTrendAnalysis || {}).map(([route, trend], index) => (
                                <span key={index}> {route} is {trend}, </span>
                            ))} 
                            which may result from factors such as route optimization, collection frequency, and community engagement in recycling efforts.
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

export default CollectionEfficiencyReport;
