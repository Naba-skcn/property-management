import React, { useEffect, useState } from 'react';
import PropertyForm from './PropertyForm';
import PropertyList from './PropertyList';
import PropertyFilters from './PropertyFilter';
import { Card, CardContent, Typography, Divider } from '@mui/material';
import { Line, Pie } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import 'chart.js/auto';
import 'react-toastify/dist/ReactToastify.css';

const initialData = [
  {
    id: 1,
    title: 'Modern Apartment',
    type: 'Apartment',
    status: 'Available',
    rent: 1200,
    date: '2024-11-20',
    image: 'https://plus.unsplash.com/premium_photo-1674676471417-07f613528a94?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8TW9kZXJuJTIwQXBhcnRtZW50fGVufDB8fDB8fHww',
  },
  {
    id: 2,
    title: 'Luxury Villa',
    type: 'House',
    status: 'Rented',
    rent: 2500,
    date: '2024-11-18',
    image: 'https://images.unsplash.com/photo-1717167398882-15d1cefd22f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEx1eHVyeSUyMFZpbGxhfGVufDB8fDB8fHww',
  },
  {
    id: 3,
    title: 'Cozy Condo',
    type: 'Apartment',
    status: 'Available',
    rent: 800,
    date: '2024-11-15',
    image: 'https://images.unsplash.com/photo-1598242930255-c25f98ff11e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fENvenklMjBDb25kb3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: 4,
    title: 'Commercial Office Space',
    type: 'Commercial',
    status: 'Available',
    rent: 3000,
    date: '2024-11-10',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q29tbWVyY2lhbCUyME9mZmljZSUyMFNwYWNlfGVufDB8fDB8fHww',
  },
  {
    id: 5,
    title: 'Suburban House',
    type: 'House',
    status: 'Rented',
    rent: 1500,
    date: '2024-11-05',
    image: 'https://images.unsplash.com/photo-1721149122657-7b5440f39160?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U3VidXJiYW4lMjBIb3VzZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: 6,
    title: 'Downtown Loft',
    type: 'Apartment',
    status: 'Available',
    rent: 1800,
    date: '2024-11-12',
    image: 'https://media.istockphoto.com/id/2157202531/photo/industrial-loft-in-downtown-los-angeles.webp?a=1&b=1&s=612x612&w=0&k=20&c=mRNe6-uNliRbJR7IgQO2I1C7zTa-lRLTLq6Ho-_CyqQ=',
  },
];

const Dashboard = () => {
  const [filters, setFilters] = useState({ type: '', status: '' });
  const [properties, setProperties] = useState(
    JSON.parse(localStorage.getItem('properties')) || initialData
  );

  // Update localStorage whenever properties change
  useEffect(() => {
    localStorage.setItem('properties', JSON.stringify(properties));
  }, [properties]);


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

   // Delete property
   const deleteProperty = (id) => {
    const updatedProperties = properties.filter((property) => property.id !== id);
    setProperties(updatedProperties); }

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
