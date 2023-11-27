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
import { CSVLink } from "react-csv";
import Modals from "./Modals";
import ModalsDelete from "./ModalsDelete";
import { Link } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";

const DataTable = ({
  data,
  columns,
  onDelete,
  title,
  onSave,
  column,
  dialogTitle,
  tableType,
  tableName,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => {
        for (const column of columns) {
          const value = item[column.field];
          if (
            typeof value === "string" &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
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
  const handleDeleteConfirmed = () => {
    onDelete(deleteUserId);
    setIsDeleteModalOpen(false);
  };
  const handleSave = (data) => {
    onSave(data);
    closeModal();
  };

  return (
    <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ padding: "7px", textAlign: "left" }}
      >
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

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        {tableType !== "customer" && tableType !== "order" && (
          <Button
            variant="contained"
            endIcon={<AddCircleIcon />}
            onClick={openModal}
            sx={{
              backgroundColor: "#282c34",
              color: "white",
              "&:hover": {
                backgroundColor: "#282c34",
              },
            }}
          >
            Add
          </Button>
        )}
        <Button
          variant="contained"
          endIcon={<DownloadIcon />}
          sx={{
            backgroundColor: "#282c34",
            color: "white",
            "&:hover": {
              backgroundColor: "#282c34",
            },
          }}
        >
          <CSVLink
            data={data}
            style={{ textDecoration: "none", color: "white" }}
          >
            export
          </CSVLink>
        </Button>
      </Stack>
      <Box height={20} />
      <TableContainer>
        <Table sx={{ minWidth: 500, maxHeight: 100 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  align="left"
                  key={column.field}
                  sx={{
                    background: "var(--body_background1)",
                    color: "var(--body_color)",
                    fontWeight: "bold",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                align="left"
                sx={{
                  background: "var(--body_background1)",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={item._id}>
                  {columns.map((column) => (
                    <TableCell key={column.field}>
                      {column.type === "Booleen" ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "55px",
                          }}
                        >
                          <svg width="10" height="10">
                            <circle
                              cx="5"
                              cy="5"
                              r="4"
                              fill={item[column.field] ? "green" : "red"}
                            />
                          </svg>
                        </div>
                      ) : column.type === "Image" ? (
                        <img
                          src={item[column.field]} // Assuming the URL is in the column.field
                          alt="Product"
                          style={{ width: "50px", height: "50px" }}
                        />
                      ) : (
                        item[column.field]
                      )}
                    </TableCell>
                  ))}

                  <TableCell align="left">
                    <Stack spacing={2} direction="row">
                      <Link to={`/v1/${tableName}/${item._id}`}>
                        <Button
                          variant="outlined"
                          startIcon={<EditIcon />}
                          sx={{ color: "blue" }}
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        sx={{ color: "darkred" }}
                        onClick={() => {
                          setDeleteUserId(item._id);
                          setIsDeleteModalOpen(true);
                        }}
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
      <Modals
        modal={isModalOpen}
        toggle={closeModal}
        save={handleSave}
        fields={column}
        dialogTitle={dialogTitle}
      />
      <ModalsDelete
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDeleteConfirmed={handleDeleteConfirmed}
      />
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
