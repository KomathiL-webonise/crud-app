import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import SaveSharpIcon from '@mui/icons-material/SaveSharp';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
  const navigate = useNavigate();
  const [editIndex, setEditIndex] = useState(-1);
  const [editedData, setEditedData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    debugger
    const storedData = JSON.parse(localStorage.getItem('registeredData')) || [];
    setTableData(storedData);
    setDataFetched(true);
  }, []);

  useEffect(() => {
    if (dataFetched) {
      localStorage.setItem('registeredData', JSON.stringify(tableData));
    }
  }, [tableData, dataFetched]);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedData({ ...tableData[index] });
  };

  const handleSave = (index) => {
    const updatedData = [...tableData];
    updatedData[index] = editedData;
    setEditIndex(-1);
    setEditedData({});
    setTableData(updatedData);
  };

  const handleCancel = () => {
    setEditIndex(-1);
    setEditedData({});
  };


  const handleDelete = (index) => {
    const updatedData = [...tableData];
    updatedData.splice(index, 1);
    setTableData(updatedData);
  };
  const handleBack = () => {
    navigate('/');

  }

  return (
    <div className="container mt-5">
      <Button variant="outlined" onClick={() => handleBack()} sx={{ marginRight: 200, color: "black", ":hover": {
      bgcolor: "#ab47bc",
      color: "white"
    } }} startIcon={<KeyboardArrowLeftIcon />}>
        Back
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "black" }}>
            <TableRow >
              <TableCell sx={{ color: "#fff" }} align="center">No</TableCell>
              <TableCell sx={{ color: "#fff" }} align="center">Name</TableCell>
              <TableCell sx={{ color: "#fff" }} align="center">Email</TableCell>
              <TableCell sx={{ color: "#fff" }} align="center">Password</TableCell>
              <TableCell sx={{ color: "#fff" }} align="center">Phone</TableCell>
              <TableCell sx={{ display: 'flex', justifyContent: 'center', color: "#fff" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editedData.username || ''}
                      onChange={(e) => setEditedData({ ...editedData, username: e.target.value })}
                    />
                  ) : (
                    item.username
                  )}
                </TableCell>
                <TableCell align="center">
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editedData.email || ''}
                      onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                    />
                  ) : (
                    item.email
                  )}
                </TableCell>
                <TableCell align="center">
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editedData.password || ''}
                      onChange={(e) => setEditedData({ ...editedData, password: e.target.value })}
                    />
                  ) : (
                    item.password
                  )}
                </TableCell>
                <TableCell align="center">
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editedData.phone || ''}
                      onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                    />
                  ) : (
                    item.phone
                  )}
                </TableCell>
                <TableCell sx={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                  {editIndex === index ? (
                    <>

                      <SaveSharpIcon variant="contained" color="success" onClick={() => handleSave(index)} />

                      <ClearSharpIcon variant="contained" color="success" onClick={() => handleCancel(index)} />
                    </>
                  ) : (
                    <>
                      <EditIcon variant="contained" color="success" onClick={() => handleEdit(index)} />
                      <DeleteIcon variant="contained" color="error" onClick={() => handleDelete(item.id)} />
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Dashboard;

