import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import MiniDrawer from '../../../components/Sidnevbar';
import Box from '@mui/material/Box';
import Navbar from '../../../components/Navbar';
import EditDetails from '../../../components/EditDetails';
import AuthContext from "../../../context/AuthContext";
import axios from 'axios';

export default function EditCategoriePage() {
  const authContext = useContext(AuthContext);
  const { authTokens } = authContext;
  const { id } = useParams();
  const [categorieData, setCategorieData] = useState({});
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, /* setSuccessMessage */] = useState(null);

  const fetchCategorieData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${authTokens?.access_token}`,
        },
      });
      setCategorieData(response.data);
    } catch (error) {
      setError("Error fetching customer data: " + error.message);
    }
  }, [authTokens,id]);

  useEffect(() => {
    fetchCategorieData();
  }, [fetchCategorieData]);

  const handleUpdate = async (changedFields) => {
    try {
      await axios.put(`http://localhost:3000/v1/categories/${id}`, changedFields,{
        headers: {
          Authorization: `Bearer ${authTokens?.access_token}`,
        },
      });
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
    } catch (error) {
      setError('Error updating categorie data: ' + error.message);
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
    }}

  const handleCloseModal = () => {
    console.log('Modal closed');
    setIsModalOpen(false);
  };

  const fields = [
    { field: 'category_name', label: 'category_name', type: 'text' },
    { field: 'active', label: 'Active', type: 'Booleen', option1: 'Yes', option2: 'No' },
  ];

  return (
    <div className="bgcolor">
      <Navbar />
      <Box height={60} />
      <Box sx={{ display: 'flex' }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <EditDetails
            data={categorieData}
            onUpdate={handleUpdate}
            onClose={handleCloseModal}
            open={isModalOpen}
            error={error || successMessage}
            fields={fields}
            title="Update Categorie"
            subtitle={`Update Categorie ID: ${id}`}
          />
        </Box>
      </Box>
    </div>
  );
}
