import { useState, useEffect } from 'react';
import { getAllRecycleItems } from '../../services/analyticsService';
import { Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import regression from 'regression';
import 'chart.js/auto';

const CollectionEfficiencyReport = () => {
    const [reports, setReports] = useState([]);
    const [error, setError] = useState('');
    const [chartData, setChartData] = useState(null);
    const [predictionData, setPredictionData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch reports data when component mounts
    useEffect(() => {
        const fetchReportsData = async () => {
            try {
                const data = await getAllRecycleItems(); // Fetch data from the service
                if (Array.isArray(data)) {
                    setReports(data);
                    processChartData(data); // Process the fetched data for the chart
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

        fetchReportsData();
    }, []); // Empty dependency array means this effect runs once on mount

    const processChartData = (data) => {
        const routes = {};
        data.forEach((report) => {
            const { pickupLocation, dateTime, totalQuantity } = report; // Adjust property names according to your data
            const date = new Date(dateTime).toLocaleDateString(); // Format date for display
            const key = `${pickupLocation}-${date}`; // Unique key for each route and date
            
            // Initialize an array for the key if it doesn't exist
            if (!routes[key]) {
                routes[key] = [];
            }
            
            // Push the quantity to the array for the corresponding key
            routes[key].push(parseFloat(totalQuantity));
        });

        const labels = Object.keys(routes);
        const weights = labels.map((key) => {
            // Sum the total quantities for the current key
            return routes[key].reduce((total, weight) => total + weight, 0);
        });

        // Generate random colors for chart
        const generateColors = (length) => {
            return Array.from({ length }, () => {
                const r = Math.floor(Math.random() * 255);
                const g = Math.floor(Math.random() * 255);
                const b = Math.floor(Math.random() * 255);
                return {
                    backgroundColor: `rgba(${r}, ${g}, ${b}, 0.6)`,
                    borderColor: `rgba(${r}, ${g}, ${b}, 1)`
                };
            });
        };

        const colors = generateColors(labels.length);
        
        setChartData({
            labels,
            datasets: [
                {
                    label: 'Total Quantity Collected (kg)',
                    data: weights,
                    backgroundColor: colors.map(color => color.backgroundColor),
                    borderColor: colors.map(color => color.borderColor),
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
                .map((entry, index) => [index, entry]); // Create pairs of index and weight

            const result = regression.linear(weightsOverTime);
            const slope = result.equation[0];
            const intercept = result.equation[1];
            const nextMonthWeight = slope * weightsOverTime.length + intercept;

            futurePredictions[route] = nextMonthWeight;

            currentTrendAnalysis[route] = slope > 0 ? 'increasing' : slope < 0 ? 'decreasing' : 'stable';
        });

        setPredictionData({ futurePredictions, currentTrendAnalysis });
    };

    const generatePDF = () => {
        const pdf = new jsPDF();
        pdf.addImage('/src/components/CSSELogo.png', 'PNG', 10, 10, 50, 30); // Logo in the top left corner

        const companyName = 'WasteWise';
        pdf.setFontSize(16);
        const companyNameWidth = pdf.getTextWidth(companyName);
        pdf.text(companyName, (pdf.internal.pageSize.width - companyNameWidth) / 2, 20); // Center company name

        const tagline = 'Smart Solutions for a Cleaner Tomorrow';
        pdf.setFontSize(12);
        const taglineWidth = pdf.getTextWidth(tagline);
        pdf.text(tagline, (pdf.internal.pageSize.width - taglineWidth) / 2, 30); // Center tagline

        const currentDate = new Date().toLocaleString();
        pdf.setFontSize(10);
        pdf.text(`Date: ${currentDate}`, 150, 10);

        pdf.setDrawColor(0);
        pdf.setLineWidth(0.5);
        const lineY = 40;
        pdf.line(10, lineY, pdf.internal.pageSize.width - 10, lineY); // Draw line from left to right

        pdf.setFontSize(16);
        pdf.text('Collection Efficiency Report', 10, 50);

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
