import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../api/userApi';

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
// ----------------------------------------------------------------------------------------------
// import React, { useState } from "react";
// import DataTable from "../../../components/DataTable";
// import Alert from "@mui/material/Alert";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import Fade from "@mui/material/Fade";
// import { useGetUsersQuery, useDeleteUserMutation, useCreateUserMutation } from "../../../api/userApi";

// export default function UsersTable() {
//   const { data: users = [], isLoading, isError, error } = useGetUsersQuery();
//   // console.log(error);
//   console.log(users)
//   const [deleteUser] = useDeleteUserMutation();
//   const [createUser] = useCreateUserMutation();
  
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [errorMessage, setErrorMessage] = useState(null);

//   const handleDelete = async (id) => {
//     try {
//       await deleteUser(id);
//       setSuccessMessage("User deleted successfully");
//       setTimeout(() => {
//         setSuccessMessage(null);
//       }, 3000);
//     } catch (error) {
//       setErrorMessage("Failed to delete user");
//       setTimeout(() => {
//         setErrorMessage(null);
//       }, 3000);
//     }
//   };

//   const handleSave = async (data) => {
//     try {
//       await createUser(data);
//       setSuccessMessage("User created successfully");
//       setTimeout(() => {
//         setSuccessMessage(null);
//       }, 3000);
//     } catch (error) {
//       setErrorMessage("Failed to create user");
//       setTimeout(() => {
//         setErrorMessage(null);
//       }, 3000);
//     }
//   };

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center">
//       <Modal open={!!successMessage} onClose={() => setSuccessMessage(null)} closeAfterTransition>
//         <Fade in={!!successMessage}>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               height: "100vh",
//             }}
//           >
//             <Alert severity="success" sx={{ width: "80%" }}>
//               {successMessage}
//             </Alert>
//           </Box>
//         </Fade>
//       </Modal>
//       <Modal open={!!errorMessage} onClose={() => setErrorMessage(null)} closeAfterTransition>
//         <Fade in={!!errorMessage}>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               height: "100vh",
//             }}
//           >
//             <Alert severity="error" sx={{ width: "80%" }}>
//               {errorMessage}
//             </Alert>
//           </Box>
//         </Fade>
//       </Modal>
//       {isLoading && <p>Loading...</p>}
//       {isError && (
//         <Alert severity="error" sx={{ width: "80%" }}>
//           Error: {error.message}
//         </Alert>
//       )}
//       {!isLoading &&  (
//         <DataTable
//           data={users}
//           columns={[
//             { field: "firstName", label: "First Name" },
//             { field: "lastName", label: "Last Name" },
//             { field: "email", label: "Email" },
//             { field: "role", label: "Role" },
//           ]}
//           column={[
//             { field: "firstName", label: "First Name" },
//             { field: "lastName", label: "Last Name" },
//             { field: "email", label: "Email" },
//             { field: "role", label: "Role" },
//           ]}
//           onDelete={handleDelete}
//           title="Users List"
//           onSave={handleSave}
//           dialogTitle="Create User"
//         />
//       )}
//     </Box>
//   );
// }
