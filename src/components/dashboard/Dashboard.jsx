import React, { useEffect, useState } from 'react';
import PropertyForm from './PropertyForm';
import PropertyList from './PropertyList';
import PropertyFilters from './PropertyFilter';
import { Card, CardContent, Typography, Divider } from '@mui/material';
import { Line, Pie } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import 'chart.js/auto';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [filters, setFilters] = useState({ type: '', status: '' });
  const [properties, setProperties] = useState(
    JSON.parse(localStorage.getItem('properties')) || []
  );
  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
    setProperties(storedProperties);
  }, []);

  const addProperty = (newProperty) => {
    const updatedProperties = [...properties, newProperty];
    setProperties(updatedProperties);
    localStorage.setItem('properties', JSON.stringify(updatedProperties));

    // Show toast notification
    toast.success('Property added successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const deleteProperty = (id) => {
    const updatedProperties = properties.filter((property) => property.id !== id);
    setProperties(updatedProperties);
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
  };

  const checkIns = properties.filter((property) => property.status === 'Available').length;
  const checkOuts = properties.filter((property) => property.status === 'Rented').length;

  // Data for Pie Chart
  const pieData = {
    labels: ['Available', 'Rented'],
    datasets: [
      {
        data: [checkIns, checkOuts],
        backgroundColor: ['#4CAF50', '#F44336'],
        hoverBackgroundColor: ['#66BB6A', '#EF5350'],
      },
    ],
  };

  // Data for Line Chart
  const lineData = {
    labels: properties.map((_, index) => `Property ${index + 1}`),
    datasets: [
      {
        label: 'Rent Status',
        data: properties.map((property) => (property.status === 'Available' ? 1 : 0)),
        borderColor: '#3F51B5',
        backgroundColor: 'rgba(63, 81, 181, 0.5)',
        fill: true,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto p-5 space-y-10 bg-gray-100 rounded-xl shadow-xl">
      {/* Dashboard Title */}
      <h1 className="text-4xl font-bold mt-20 text-gray-800 text-center">
        Welcome to RentTrack<br /><span className='text-sm text-gray-600'>------ Property Management Dashboard ------</span>
      </h1>
       {/* Dashboard Description */}
      <h2 className="text-center text-gray-600 font-semibold font-1xl">Manage your properties efficiently, track rent statuses, and optimize property listings with ease.</h2>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Available Properties Card */}
        <div className="bg-green-500 rounded-lg shadow-lg">
          <Card sx={{ background: 'transparent', boxShadow: 'none' }}>
            <CardContent>
              <Typography variant="h6" className="text-white font-medium">
                Available Properties
              </Typography>
              <Typography variant="h4" className="font-bold text-green-900">
                {checkIns}
              </Typography>
              <Typography variant="body2" className="text-gray-700 text-sm">
                Properties available for rent
              </Typography>
            </CardContent>
          </Card>
        </div>

        {/* Rented Properties Card */}
        <div className="bg-red-500 rounded-lg shadow-lg">
          <Card sx={{ background: 'transparent', boxShadow: 'none' }}>
            <CardContent>
              <Typography variant="h6" className="text-white font-medium">
                Rented Properties
              </Typography>
              <Typography variant="h4" className="font-bold text-red-900">
                {checkOuts}
              </Typography>
              <Typography variant="body2" className="text-gray-700 text-sm">
                Properties currently rented out
              </Typography>
            </CardContent>
          </Card>
        </div>

        {/* Total Properties Card */}
        <div className="bg-indigo-500 rounded-lg shadow-lg">
          <Card sx={{ background: 'transparent', boxShadow: 'none' }}>
            <CardContent>
              <Typography variant="h6" className="text-white font-medium">
                Total Properties
              </Typography>
              <Typography variant="h4" className="font-bold text-indigo-900">
                {properties.length}
              </Typography>
              <Typography variant="body2" className="text-gray-700 text-sm">
                Total number of properties managed
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Divider for better visual separation */}
      <Divider className="my-8 border-gray-300" />

      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-5 rounded-lg shadow-md">
          <Typography variant="h6" className="text-gray-700 mb-4 text-center">
            Property Status Distribution
          </Typography>
          <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
            <Pie data={pieData} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-md">
          <Typography variant="h6" className="text-gray-700 mb-4 text-center">
            Rent Status Over Properties
          </Typography>
          <Line data={lineData} />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Properties</h2>
      {/* Filters and Form Section */}
      <PropertyFilters setFilters={setFilters} />

      {/* Property List Section */}
      <PropertyList filters={filters} properties={properties} deleteProperty={deleteProperty} />

      <div className="mt-10 flex justify-center">
        <PropertyForm addProperty={addProperty} />
      </div>
    </div>
  );
};

export default Dashboard;
