import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { WorkOrder, WorkOrderFormData, STATUS_OPTIONS, PRIORITY_OPTIONS, SERVICE_TYPE_OPTIONS, INITIAL_FORM_DATA } from '../types/workOrder';

interface WorkOrderDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (formData: WorkOrderFormData) => void;
  workOrder: WorkOrder | null;
  title: string;
}

export const WorkOrderDialog: React.FC<WorkOrderDialogProps> = ({
  open,
  onClose,
  onSave,
  workOrder,
  title
}) => {
  const [formData, setFormData] = React.useState<WorkOrderFormData>(INITIAL_FORM_DATA);

  React.useEffect(() => {
    if (workOrder) {
      setFormData({
        serviceRequired: workOrder.serviceRequired,
        serviceDetails: workOrder.serviceDetails,
        status: workOrder.status,
        priority: workOrder.priority,
        serviceType: workOrder.serviceType,
        dueDate: workOrder.dueDate
      });
    } else {
      setFormData(INITIAL_FORM_DATA);
    }
  }, [workOrder]);

  const handleChange = (field: keyof WorkOrderFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      dueDate: date ? date.toISOString() : ''
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Service Required"
                value={formData.serviceRequired}
                onChange={handleChange('serviceRequired')}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Service Details"
                value={formData.serviceDetails}
                onChange={handleChange('serviceDetails')}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Status"
                value={formData.status}
                onChange={handleChange('status')}
                fullWidth
                required
              >
                {STATUS_OPTIONS.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Priority"
                value={formData.priority}
                onChange={handleChange('priority')}
                fullWidth
                required
              >
                {PRIORITY_OPTIONS.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Service Type"
                value={formData.serviceType}
                onChange={handleChange('serviceType')}
                fullWidth
                required
              >
                {SERVICE_TYPE_OPTIONS.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Due Date"
                  value={formData.dueDate ? new Date(formData.dueDate) : null}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
