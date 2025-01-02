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
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
          '& .MuiDialogTitle-root': {
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '16px 24px',
            fontSize: '1.25rem',
            fontWeight: 500
          },
          '& .MuiDialogContent-root': {
            backgroundColor: '#f5f5f5',
            padding: '24px',
          },
          '& .MuiDialogActions-root': {
            backgroundColor: '#f5f5f5',
            padding: '16px 24px',
            borderTop: '1px solid #e0e0e0'
          },
          '& .MuiTextField-root': {
            backgroundColor: '#ffffff',
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#1976d2',
              },
            },
          },
          '& .MuiInputLabel-root': {
            color: '#666666',
            '&.Mui-focused': {
              color: '#1976d2',
            },
          },
          '& .MuiSelect-select': {
            backgroundColor: '#ffffff',
          },
          '& .MuiInputBase-root': {
            backgroundColor: '#ffffff',
            borderRadius: 1,
          }
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={1.5} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <TextField
                label="Service Required"
                value={formData.serviceRequired}
                onChange={handleChange('serviceRequired')}
                fullWidth
                required
                sx={{ 
                  '& .MuiInputBase-root': {
                    fontSize: '1rem',
                  }
                }}
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
                sx={{ 
                  '& .MuiInputBase-root': {
                    fontSize: '0.95rem',
                  }
                }}
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
                sx={{ 
                  '& .MuiMenuItem-root': {
                    fontSize: '0.95rem',
                  }
                }}
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
                sx={{ 
                  '& .MuiMenuItem-root': {
                    fontSize: '0.95rem',
                  }
                }}
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
                sx={{ 
                  '& .MuiMenuItem-root': {
                    fontSize: '0.95rem',
                  }
                }}
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
                      required: true,
                      sx: {
                        '& .MuiInputBase-root': {
                          fontSize: '0.95rem',
                        }
                      }
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={onClose}
            sx={{
              color: '#666666',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            sx={{
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#1565c0',
              }
            }}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
