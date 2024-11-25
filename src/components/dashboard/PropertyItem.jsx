import React from 'react';

const PropertyItem = ({ property, deleteProperty }) => {
  return (
    <tr className="border-b">
      <td className="px-4 py-2">
        <img
          src={property.image || 'https://via.placeholder.com/150'}
          alt={property.title}
          className="w-24 h-24 object-cover rounded"
        />
      </td>
      <td className="px-4 py-2 text-gray-800">{property.title}</td>
      <td className="px-4 py-2 text-gray-500">{property.type}</td>
      <td className="px-4 py-2 text-gray-500">{property.status}</td>
      <td className="px-4 py-2 text-md font-medium text-gray-900">${property.rent}</td>
      <td className="px-4 py-2 text-sm text-gray-400">
        {new Date(property.date).toLocaleDateString()}
      </td>
      <td className="px-4 py-2">
        <button
          onClick={() => deleteProperty(property.id)}
          className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors duration-200"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default PropertyItem;
