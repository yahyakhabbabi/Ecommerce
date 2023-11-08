import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modals from "./Modals";

const DataTable = ({ data, columns, onDelete, title,onSave,column }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => {
        for (const column of columns) {
          const value = item[column.field];
          if (typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase())) {
            return true;
          }
        }
        return false;
      });
      setFilteredData(filtered);
    }
  }, [searchQuery, data, columns]);

  const handleSearchInputChange = (event) => {
    const newValue = event.target.value;
    setSearchQuery(newValue);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSave = (data) => {
    onSave(data);
    closeModal();
  };
  return (
    <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
      <Typography variant="h5" component="div" sx={{ padding: "20px", textAlign: "left" }}>
        {title}
      </Typography>
      <Divider />
      <Box height={10} />
      <Stack direction="row" spacing={2} className="my-2 mb-2">
        <TextField
          value={searchQuery}
          onChange={handleSearchInputChange}
          sx={{ width: 300 }}
          size="small"
          label={`Search ${title}`}
        />

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
        <Button variant="contained" endIcon={<AddCircleIcon />} onClick={openModal}>
          Add
        </Button>
      </Stack>
      <Box height={10} />
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell align="left" key={column.field}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={item._id}>
                  {columns.map((column) => (
                    <TableCell align="left" key={column.field}>
                      {item[column.field]}
                    </TableCell>
                  ))}
                  <TableCell align="left">
                    <Stack spacing={2} direction="row">
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        sx={{ color: "blue" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        sx={{ color: "darkred" }}
                        onClick={() => onDelete(item._id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => setRowsPerPage(+event.target.value)}
      />
           <Modals modal={isModalOpen} toggle={closeModal} save={handleSave} fields={column} />
    </Paper>
  );
};

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default DataTable;

