import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  Alert,
  Snackbar
} from '@mui/material';
import { AdminConfigurator } from '../components/AdminConfigurator.jsx';
import "../styles/AdminPanel.css";
import { FilterProvider } from "../FilterContext.jsx";
import AdminPCComponent from "./AdminPCComponent.jsx";

const categories = [
  'Пользователи', 'Процессоры', 'Материнки', 'Видеокарты', 'Кулеры', 'Корпуса', 'ОЗУ', 'БП', 'Накопители', 'Готовые сборки', 'Заказы'
];

const categoryToApiMap = {
  'Пользователи': 'users',
  'Процессоры': 'processors',
  'Материнки': 'motherboards',
  'Видеокарты': 'graphics-cards',
  'Кулеры': 'coolers',
  'Корпуса': 'cases',
  'ОЗУ': 'rams',
  'БП': 'power-supplies',
  'Накопители': 'storage-devices',
  'Готовые сборки': 'pcs',
  'Заказы': 'orders'
};

const AdminPanel = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [open, setOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newRow, setNewRow] = useState({ compatibleSockets: [] });
  const [editRow, setEditRow] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (selectedCategory) {
      fetchCategoryData(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategoryData = async (category) => {
    const apiEndpoint = `http://localhost:8080/api/${categoryToApiMap[category]}`;
    const userToken = JSON.parse(localStorage.getItem('user')).token;
    try {
      const response = await axios.get(apiEndpoint, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });
      const data = response.data;
      if (data.length > 0) {
        const columnDefs = generateColumns(data[0]);
        setColumns(columnDefs);
        setRows(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const generateColumns = (dataObject) => {
    const keys = Object.keys(dataObject).filter(key => key !== 'password');
    return keys.map((key) => ({
      field: key,
      headerName: key.replace(/_/g, ' ').toUpperCase(),
      width: 150,
      editable: ((!(selectedCategory === 'Готовые сборки' || selectedCategory === 'Заказы')) || (key==="rating")) && !(key==='username'),
      renderCell: (params) => {
        if (key === 'pcType') {
          return (
              <Select
                  value={params.value || ''}
                  onChange={(e) => handleTypeChange(params.id, e.target.value)}
                  fullWidth
              >
                <MenuItem value="FOR_SALE">FOR_SALE</MenuItem>
                <MenuItem value="USER">USER</MenuItem>
                <MenuItem value="TEMP">TEMP</MenuItem>
                <MenuItem value="IND_COMP">IND_COMP</MenuItem>
              </Select>
          );
        } else if (key === 'status') {
          return (
              <Select
                  value={params.value || ''}
                  onChange={(e) => handleStatusChange(params.id, e.target.value)}
                  fullWidth
              >
                <MenuItem value="CREATED">CREATED</MenuItem>
                <MenuItem value="COLLECTING">COLLECTING</MenuItem>
                <MenuItem value="COLLECTED">COLLECTED</MenuItem>
                <MenuItem value="READY">READY</MenuItem>
                <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                <MenuItem value="CANCELLED">CANCELLED</MenuItem>
              </Select>
          );
        }
        else if (key === 'role') {
          return (
              <Select
                  value={params.value || ''}
                  onChange={(e) => handleRoleChange(params.id, e.target.value)}
                  fullWidth
              >
                <MenuItem value="ROLE_USER">ROLE_USER</MenuItem>
                <MenuItem value="ROLE_ADMIN">ROLE_ADMIN</MenuItem>
              </Select>
          );
        }
        else if ((selectedCategory === 'Заказы' || selectedCategory === 'Готовые сборки') && params.value && typeof params.value === 'object') {
          return renderObjectCell(params.value);
        }
        return params.value ?? '';
      }
    })).concat({
      field: 'actions',
      headerName: 'Actions',
      width: 350,
      renderCell: (params) => (
          <div>
            <Button onClick={() => handleEdit(params.row)}>Save</Button>
            <Button onClick={() => handleDelete(params.row.id)}>Delete</Button>
            {(selectedCategory !== 'Пользователи' && selectedCategory !== 'Заказы') && <Button onClick={() => handleOpenImageDialog(params.row.id)}>Upload Image</Button>}
            {selectedCategory === 'Готовые сборки' && (
                <Button onClick={() => handleOpenEditDialog(params.row)}>Edit</Button>
            )}
            {selectedCategory === 'Заказы' && (
                <Button onClick={() => {handleOpenEditDialog(params.row); console.log(params.row)}}>Edit</Button>
            )}
          </div>
      )
    });
  };

  const renderObjectCell = (object) => {
    const manufacturer = object.manufacturer || '';
    const model = object.model || '';
    const id = object.manufacturer ? "" : object.map((pc) => pc.id).join(', ');
    return `${manufacturer} ${model} ${id}`.trim();
  };

  const handleTypeChange = (id, value) => {
    setRows((prevRows) =>
        prevRows.map((row) => (row.id === id ? { ...row, pcType: value } : row))
    );
  };

  const handleStatusChange = (id, value) => {
    setRows((prevRows) =>
        prevRows.map((row) => (row.id === id ? { ...row, status: value } : row))
    );
  };

  const handleRoleChange = (id, value) => {
    setRows((prevRows) =>
        prevRows.map((row) => (row.id === id ? { ...row, role: value } : row))
    );
  };

  const handleEdit = async (data) => {
    if (typeof data.compatibleSockets === 'string') {
      data.compatibleSockets = data.compatibleSockets.split(',').map(socket => socket.trim());
    }

    console.log(data);
    try {
      await axios.put(`http://localhost:8080/api/${categoryToApiMap[selectedCategory]}/${data.id}`, data);
      fetchCategoryData(selectedCategory);
    } catch (error) {
      console.error("Edit row with error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/${categoryToApiMap[selectedCategory]}/${id}`)
      fetchCategoryData(selectedCategory);
    } catch (error) {
      setOpenSnackbar(true);
      console.error("Error deleting data:", error);
    }
  };

  const handleOpen = () => {
    setNewRow({ compatibleSockets: [] });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => fetchCategoryData(selectedCategory), 400)
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/${categoryToApiMap[selectedCategory]}`, newRow);

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        await axios.post(`http://localhost:8080/api/${categoryToApiMap[selectedCategory]}/${response.data.id}/upload-image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      fetchCategoryData(selectedCategory);
      handleClose();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRow({ ...newRow, [name]: value });
  };

  const handleSocketChange = (e) => {
    const sockets = e.target.value.split(',').map(socket => socket.trim());
    setNewRow({ ...newRow, compatibleSockets: sockets });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleOpenImageDialog = (id) => {
    setSelectedRowId(id);
    setImageDialogOpen(true);
  };

  const handleCloseImageDialog = () => {
    setImageDialogOpen(false);
    setImageFile(null);
  };

  const handleUploadImage = async () => {
    if (!imageFile || !selectedRowId) return;

    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      await axios.post(`http://localhost:8080/api/${categoryToApiMap[selectedCategory]}/${selectedRowId}/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      fetchCategoryData(selectedCategory);
      handleCloseImageDialog();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };


  const handleOpenEditDialog = (row) => {
    setEditRow(row);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditRow(null);
    setTimeout(() => fetchCategoryData(selectedCategory), 400)
  };

  return (
      <div className="admin-panel">
        <div className="sidebar">
          {categories.map((category) => (
              <Button
                  key={category}
                  variant="contained"
                  onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
          ))}
          {selectedCategory && selectedCategory !== "Пользователи" && (
              <>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                  Добавить
                </Button>
              </>
          )}
        </div>
        <div className="content">
          {selectedCategory && (
              <Box sx={{ height: '95%', maxWidth: '85vw' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row.id}
                    disableRowSelectionOnClick
                />
              </Box>
          )}
        </div>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="100%">
          <DialogTitle>Добавить новый элемент</DialogTitle>
          <DialogContent>
            {selectedCategory === 'Готовые сборки' ? (
                <AdminConfigurator onClose={handleClose}/>
            ) : selectedCategory === 'Заказы' ? (
                <AdminPCComponent onClose={handleClose} />
            ) : (
                <>
                  {columns.map((column) =>
                          column.field !== 'actions' && column.field !== 'id' && column.field !== 'image' && (
                              <TextField
                                  key={column.field}
                                  margin="dense"
                                  name={column.field}
                                  label={column.headerName}
                                  type="text"
                                  fullWidth
                                  onChange={column.field === 'compatibleSockets' ? handleSocketChange : handleChange}
                              />
                          )
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Отмена
            </Button>
            {selectedCategory !== 'Готовые сборки' && selectedCategory !== 'Заказы' ? (
                <Button onClick={handleAdd} color="primary">
                  Добавить
                </Button>
            ) : <></>}
          </DialogActions>
        </Dialog>

        {selectedCategory === "Готовые сборки" &&
        <Dialog open={editDialogOpen} onClose={handleCloseEditDialog} fullWidth maxWidth="100%">
          <DialogTitle>Редактировать сборку</DialogTitle>
          <DialogContent>
            <FilterProvider><AdminConfigurator initialData={editRow} isEdit onClose={handleCloseEditDialog} /></FilterProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} color="primary">
              Отмена
            </Button>
          </DialogActions>
        </Dialog>}
        {selectedCategory === 'Заказы' &&
            <Dialog open={editDialogOpen} onClose={handleCloseEditDialog} fullWidth maxWidth="100%">
              <DialogTitle>Редактировать заказ</DialogTitle>
              <DialogContent>
                <AdminPCComponent initialData={editRow} onClose={handleCloseEditDialog} isEdit/>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEditDialog} color="primary">
                  Отмена
                </Button>
              </DialogActions>
            </Dialog>
        }

        <Dialog open={imageDialogOpen} onClose={handleCloseImageDialog}>
          <DialogTitle>Загрузить изображение</DialogTitle>
          <DialogContent>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseImageDialog} color="primary">
              Отмена
            </Button>
            <Button onClick={handleUploadImage} color="primary">
              Загрузить
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
            Ошибка, невозможно удалить (возможно, есть зависимость от других данных).
          </Alert>
        </Snackbar>
      </div>
  );
};

export default AdminPanel;
