import React from 'react';
import PropertyItem from './PropertyItem';

const PropertyList = ({ filters, properties, deleteProperty }) => {
  // Filter properties
  const filteredProperties = properties.filter((property) => {
    const matchesType = !filters.type || property.type === filters.type;
    const matchesStatus = !filters.status || property.status === filters.status;
    return matchesType && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Rent</th>
              <th className="px-4 py-2 text-left">Added On</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyItem
                  key={property.id}
                  property={property}
                  deleteProperty={deleteProperty}
                />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-lg text-gray-600 text-center py-4">
                  No properties found. Try adjusting your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyList;
