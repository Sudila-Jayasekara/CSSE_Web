import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import 'chart.js/auto'; // Required for react-chartjs-2

const ReportGenerator = ({ specialWastes, onClose }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add logo to the PDF
    const logoUrl = 'https://via.placeholder.com/150'; // Replace with your logo URL
    doc.addImage(logoUrl, 'PNG', 10, 10, 50, 20);

    // Add some content to the PDF
    doc.setFontSize(18);
    doc.text('Special Waste Report', 70, 30);

    doc.setFontSize(12);
    doc.text('This report contains an overview of the special wastes data and charts.', 10, 50);

    // Add chart here (example for placeholder)
    const chartCanvas = document.getElementById('chart-canvas');
    const chartImage = chartCanvas.toDataURL('image/png');
    doc.addImage(chartImage, 'PNG', 10, 70, 190, 80); // Add the chart

    doc.save('special_waste_report.pdf');
  };

  const chartData = {
    labels: specialWastes.map((item) => item.wasteType),
    datasets: [
      {
        label: 'Waste Type Counts',
        data: specialWastes.map(() => Math.floor(Math.random() * 100)), // Example data
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Report Preview</h2>

        {/* Bar Chart */}
        <div className="mb-4">
          <Bar data={chartData} options={chartOptions} id="chart-canvas" />
        </div>

        {/* Generate PDF Button */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={generatePDF}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Download Report
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;
