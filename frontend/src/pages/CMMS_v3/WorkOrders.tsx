import React from 'react';
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { WorkOrderTable } from './components/WorkOrderTable';
import { WorkOrderDialog } from './components/WorkOrderDialog';
import { DeleteConfirmationDialog } from './components/DeleteConfirmationDialog';
import { WorkOrder, WorkOrderFormData } from './types/workOrder';
import { workOrderService } from './services/workOrderService';

export const WorkOrders: React.FC = () => {
  const [workOrders, setWorkOrders] = React.useState<WorkOrder[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [sortField, setSortField] = React.useState<keyof WorkOrder>('wo_number');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc');
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = React.useState<WorkOrder | null>(null);

  const fetchWorkOrders = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await workOrderService.getAll();
      setWorkOrders(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch work orders');
      console.error('Error fetching work orders:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchWorkOrders();
  }, [fetchWorkOrders]);

  const handleSort = (field: keyof WorkOrder) => {
    setSortOrder(currentOrder => 
      sortField === field 
        ? (currentOrder === 'asc' ? 'desc' : 'asc')
        : 'asc'
    );
    setSortField(field);
  };

  const handleCreateClick = () => {
    setSelectedWorkOrder(null);
    setOpenDialog(true);
  };

  const handleEditClick = (workOrder: WorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setOpenDialog(true);
  };

  const handleDeleteClick = (workOrder: WorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setOpenDeleteDialog(true);
  };

  const handleSave = async (formData: WorkOrderFormData) => {
    try {
      setLoading(true);
      if (selectedWorkOrder) {
        await workOrderService.update(selectedWorkOrder.id, formData);
        setSuccess('Work order updated successfully');
      } else {
        await workOrderService.create(formData);
        setSuccess('Work order created successfully');
      }
      setOpenDialog(false);
      await fetchWorkOrders();
    } catch (err) {
      setError('Failed to save work order');
      console.error('Error saving work order:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedWorkOrder) return;

    try {
      setLoading(true);
      await workOrderService.delete(selectedWorkOrder.id);
      setSuccess('Work order deleted successfully');
      setOpenDeleteDialog(false);
      await fetchWorkOrders();
    } catch (err) {
      setError('Failed to delete work order');
      console.error('Error deleting work order:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 2,
          backgroundColor: 'primary.main',
          color: 'primary.contrastText'
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Work Orders
          </Typography>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<AddIcon />}
            onClick={handleCreateClick}
            sx={{ 
              color: 'primary.main',
              bgcolor: 'white',
              '&:hover': {
                bgcolor: 'grey.100'
              }
            }}
          >
            Add Work Order
          </Button>
        </Box>
      </Paper>

      {error && (
        <Alert 
          severity="error" 
          onClose={() => setError(null)}
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {success && (
        <Alert 
          severity="success"
          onClose={() => setSuccess(null)}
          sx={{ mb: 3 }}
        >
          {success}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 400
        }}>
          <CircularProgress />
        </Box>
      ) : (
        <WorkOrderTable
          workOrders={workOrders}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      )}

      <WorkOrderDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleSave}
        workOrder={selectedWorkOrder}
        title={selectedWorkOrder ? 'Edit Work Order' : 'Add Work Order'}
      />

      <DeleteConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Work Order"
        content="Are you sure you want to delete this work order? This action cannot be undone."
      />
    </Box>
  );
};
