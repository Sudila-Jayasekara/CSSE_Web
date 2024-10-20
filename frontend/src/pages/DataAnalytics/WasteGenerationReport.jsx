import { useState, useEffect } from 'react';
import { getAllReports } from '../../services/analyticsService';
import { Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import regression from 'regression';
import 'chart.js/auto';

const WasteGenerationReport = () => {
    const [reports, setReports] = useState([]);
    const [error, setError] = useState('');
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [analysis, setAnalysis] = useState({ totalWaste: 0, averageWaste: 0, maxWaste: 0, maxWasteDate: '' });
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
            const { collectionDate, wasteWeight } = report;
            const date = new Date(collectionDate);
            const year = date.getFullYear();
            const weekNumber = getWeekNumber(date);
            const weekKey = `${year}-W${weekNumber}`;
            const weight = parseFloat(wasteWeight);

            totalWeight += weight;

            if (wasteData[weekKey]) {
                wasteData[weekKey].weight += weight;
            } else {
                wasteData[weekKey] = { weight };
            }
        });

        const sortedWeeks = Object.keys(wasteData).sort((a, b) => {
            const [yearA, weekA] = a.split('-W').map(Number);
            const [yearB, weekB] = b.split('-W').map(Number);
            return yearA === yearB ? weekA - weekB : yearA - yearB;
        });

        const labels = sortedWeeks;
        const weights = labels.map((week) => wasteData[week].weight);

        const averageWeight = totalWeight / weights.length || 0;
        const maxWaste = Math.max(...weights);
        const maxWasteDate = labels[weights.indexOf(maxWaste)];

        setAnalysis({
            totalWaste: totalWeight,
            averageWaste: averageWeight,
            maxWaste,
            maxWasteDate,
        });

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

        predictWasteTrends(sortedWeeks, weights);
    };

    const predictWasteTrends = (sortedWeeks, weights) => {
        const futurePredictions = {};
        const weightsOverTime = sortedWeeks.map((week, index) => [index, weights[index]]);
        
        const result = regression.linear(weightsOverTime);
        const slope = result.equation[0];
        const intercept = result.equation[1];

        for (let i = 1; i <= 4; i++) {
            const nextWeekIndex = weightsOverTime.length + i - 1;
            const predictedWeight = slope * nextWeekIndex + intercept;
            const nextWeek = getNextWeekLabel(sortedWeeks, i);
            futurePredictions[nextWeek] = predictedWeight;
        }

        setPredictionData(futurePredictions);
    };

    const getNextWeekLabel = (currentWeeks, weeksAhead) => {
        const lastWeek = currentWeeks[currentWeeks.length - 1];
        const [year, week] = lastWeek.split('-W').map(Number);
        const nextWeekNumber = week + weeksAhead;

        if (nextWeekNumber > 52) {
            return `${year + 1}-W${nextWeekNumber - 52}`;
        }
        return `${year}-W${nextWeekNumber}`;
    };

    const getWeekNumber = (date) => {
        const startDate = new Date(date.getFullYear(), 0, 1);
        const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
        return Math.ceil((days + startDate.getDay() + 1) / 7);
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
        pdf.text('Waste Generation Report', 10, 50);

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
                                                    text: 'Collection Week',
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
                                <div style={{ ...styles.analysis, marginBottom: '20px' }}>
                                    <h3>Analysis</h3>
                                    <p>Total Waste Generated: {analysis.totalWaste.toFixed(2)} kg</p>
                                    <p>Average Waste per Collection: {analysis.averageWaste.toFixed(2)} kg</p>
                                    <p>Highest Waste Generation: {analysis.maxWaste} kg on {analysis.maxWasteDate}</p>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <h3>Prediction for Next 4 Weeks:</h3>
                                    {predictionData ? (
                                        <ul>
                                            {Object.entries(predictionData).map(([period, predictedWeight], index) => (
                                                <li key={index}>
                                                    <strong>Period:</strong> {period} - 
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

export default WasteGenerationReport;
