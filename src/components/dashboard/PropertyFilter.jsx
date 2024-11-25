import React from 'react';

const PropertyFilters = ({ setFilters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 shadow-lg rounded-lg text-white mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Filter by Type */}
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium mb-2"
          >
            Filter by Type
          </label>
          <select
            id="type"
            name="type"
            onChange={handleFilterChange}
            className="w-full bg-white text-gray-700 p-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>

        {/* Filter by Status */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium mb-2"
          >
            Filter by Status
          </label>
          <select
            id="status"
            name="status"
            onChange={handleFilterChange}
            className="w-full bg-white text-gray-700 p-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;
