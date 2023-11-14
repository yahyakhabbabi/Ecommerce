import React, { useState, useEffect } from 'react';
import {
  Box,
  Modal,
  Fade,
  Grid,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography
} from '@mui/material';

export default function EditDetails({ data, onUpdate, onClose, open, error, fields,title,subtitle }) {
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleFieldChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const renderField = (field) => {
    if (field.type === 'email' || field.type === 'password') {
      return (
        <TextField
          label={field.label}
          variant="outlined"
          value={formData[field.field] || ''}
          onChange={(e) => handleFieldChange(field.field, e.target.value)}
          name={field.field}
          fullWidth
          style={{
            marginBottom: '16px',
          }}
          type={field.type}
        />
      );
    } else if (field.type === 'Booleen') {
      return (
        <FormControl fullWidth>
          <InputLabel>{field.label}</InputLabel>
          <Select
            value={formData[field.field] || ''}
            onChange={(e) => handleFieldChange(field.field, e.target.value)}
            name={field.field}
            variant="outlined"
            sx={{ border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <MenuItem value={true}>{field.option1}</MenuItem>
            <MenuItem value={false}>{field.option2}</MenuItem>
          </Select>
        </FormControl>
      );
    } else {
      return (
        <TextField
          label={field.label}
          variant="outlined"
          value={formData[field.field] || ''}
          onChange={(e) => handleFieldChange(field.field, e.target.value)}
          name={field.field}
          fullWidth
          style={{
            marginBottom: '16px',
          }}
          multiline={field.type === 'textarea'}
          rows={field.type === 'textarea' ? 5 : 1}
          type="text"
        />
      );
    }
  };

  const handleUpdate = async () => {
    try {
      const changedFields = {};
      fields.forEach((field) => {
        if (formData[field.field] !== '' && formData[field.field] !== data[field.field]) {
          changedFields[field.field] = formData[field.field];
        }
      });

      await onUpdate(changedFields);
      setSuccessMessage('User data updated successfully');
    } catch (error) {
      // Handle error
    }
  };
  const handleClose = (action) => {
    onClose(action);
    if (action === 'success') {
      setSuccessMessage(null);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
   
      {/* Modal */}
      <Modal open={open} onClose={() => handleClose('cancel')} closeAfterTransition>
        <Fade in={open}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
            }}
          >
            {/* Display error or success message */}
            <Alert
              severity={error ? 'error' : 'success'}
              onClose={() => handleClose(error ? 'error' : 'success')}
              sx={{ width: '80%' }}
            >
              {error ? error : successMessage}
            </Alert>
          </Box>
        </Fade>
      </Modal>

      {/* Form */}
      <Typography variant="h4" sx={{ marginBottom: '12px', color: 'black' }}>
  {title}
</Typography>

{/* Subtitle */}
{subtitle && (
  <Typography variant="subtitle1" sx={{ marginBottom: '20px', color: 'black' }}>
    {subtitle}
  </Typography>
)}

      <form>
        <Grid container spacing={3}>
          {/* Render form fields */}
          {fields.map((field) => (
            <Grid item xs={fields.length <= 8 ? 6 : 4} key={field.field}>
              {renderField(field)}
            </Grid>
          ))}
        </Grid>
      </form>

      {/* Save button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
        sx={{ marginTop: '20px' }}
      >
        Save
      </Button>
    </Box>
  );
};
