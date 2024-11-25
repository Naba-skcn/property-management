import React, { useState } from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl, Button, Card, CardContent, Typography } from '@mui/material';

const PropertyForm = ({ addProperty }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [rent, setRent] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const [dateError, setDateError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !type || !status || !rent || !date || !image) {
      alert('Please fill in all fields.');
      return;
    }

    // Validate the date to make sure it's not in the future
    const currentDate = new Date();
    const selectedDate = new Date(date);

    if (selectedDate > currentDate) {
      setDateError('Date cannot be in the future.');
      return;
    } else {
      setDateError('');
    }

    const newProperty = {
      id: Date.now(),
      title,
      type,
      status,
      rent,
      date,
      image,
    };

    addProperty(newProperty);
    setTitle('');
    setType('');
    setStatus('');
    setRent('');
    setDate('');
    setImage('');
  };

  return (
    <Card className="shadow-xl rounded-lg p-6">
      <CardContent>
        <Typography variant="h5" className="font-semibold text-gray-800 mb-6">Add a New Property</Typography>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title Field */}
          <TextField
            label="Property Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            className="mb-4"
            required
            InputLabelProps={{
              className: 'text-gray-600',
            }}
          />

          {/* Image Field */}
          <TextField
            label="Image URL"
            variant="outlined"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            fullWidth
            className="mb-4"
            required
            InputLabelProps={{
              className: 'text-gray-600',
            }}
          />

          {/* Type Selection */}
          <FormControl fullWidth required className="mb-4">
            <InputLabel>Property Type</InputLabel>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              label="Property Type"
            >
              <MenuItem value="Apartment">Apartment</MenuItem>
              <MenuItem value="House">House</MenuItem>
              <MenuItem value="Commercial">Commercial</MenuItem>
            </Select>
          </FormControl>

          {/* Status Selection */}
          <FormControl fullWidth required className="mb-4">
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Rented">Rented</MenuItem>
            </Select>
          </FormControl>

          {/* Rent Field */}
          <TextField
            label="Rent"
            type="number"
            variant="outlined"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            fullWidth
            required
            InputLabelProps={{
              className: 'text-gray-600',
            }}
          />

          {/* Date Added Field */}
          <TextField
            label="Date Added"
            type="date"
            variant="outlined"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            required
            error={dateError !== ''}
            helperText={dateError}
            InputLabelProps={{
              shrink: true,
              className: 'text-gray-600',
            }}
          />

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary" fullWidth className="mt-6 hover:bg-indigo-700 transition-all">
            Add Property
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyForm;
