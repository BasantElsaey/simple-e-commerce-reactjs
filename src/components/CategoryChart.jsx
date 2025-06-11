import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function CategoryChart({ products }) {
  const safeProducts = Array.isArray(products) ? products : [];

  const categoryColors = {
    Electronics: '#3B82F6', // blue-500
    Accessories: '#8B5CF6', // purple-500
    Clothing: '#22C55E',    // green-500
    Footwear: '#F97316',    // orange-500
  };

  // Get unique categories and their counts
  const categories = [...new Set(safeProducts.map((item) => item.category))];
  const dataByCategory = categories.map((category) => {
    if (!categoryColors[category]) {
      console.warn(`Category "${category}" not found in categoryColors. Using fallback color.`);
    }
    return {
      category,
      count: safeProducts.filter((item) => item.category === category).length,
    };
  });

  // Chart data
  const data = {
    labels: dataByCategory.map((item) => item.category),
    datasets: [
      {
        label: 'Products by Category',
        data: dataByCategory.map((item) => item.count),
        backgroundColor: dataByCategory.map((item) => categoryColors[item.category] || '#6B7280'), // Fallback: gray-500
        borderColor: dataByCategory.map((item) => categoryColors[item.category] || '#6B7280'),
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#1F2937', // gray-800
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: 'Product Distribution by Category',
        color: '#1F2937',
        font: { size: 18 },
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#1F2937',
          font: { size: 12 },
        },
        grid: {
          color: '#E5E7EB',
        },
      },
      x: {
        ticks: {
          color: '#1F2937',
          font: { size: 12 },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
        Product Categories
      </h2>
      <div className="card bg-base-100 shadow-2xl rounded-2xl p-6 mb-8 animate-fade-in max-w-3xl mx-auto">
        {safeProducts.length === 0 ? (
          <p className="text-center text-gray-600">No products available to display.</p>
        ) : (
          <Bar data={data} options={options} />
        )}
      </div>
    </div>
  );
}

export default CategoryChart;