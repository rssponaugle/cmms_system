import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  workOrderNumber: string;
}

export const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  workOrderNumber
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      PaperProps={{
        sx: {
          width: '300px',
          borderRadius: '8px',
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: '#0086b3',
        p: 1.5,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <WarningIcon sx={{ color: '#ffffff' }} />
        <Typography variant="h6" sx={{ 
          fontSize: '1rem',
          fontWeight: 600,
          color: '#ffffff'
        }}>
          Delete Work Order
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ p: 2, pt: 2 }}>
        <Typography variant="body1" sx={{ 
          mb: 1,
          fontSize: '0.875rem',
          color: 'text.primary'
        }}>
          Are you sure you want to delete work order <strong>#{workOrderNumber}</strong>?
        </Typography>
        <Typography variant="body2" sx={{ 
          color: 'text.secondary',
          fontSize: '0.8125rem'
        }}>
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ 
        p: 1.5,
        pt: 0,
        gap: 1
      }}>
        <Button
          onClick={onClose}
          variant="outlined"
          size="small"
          sx={{
            minWidth: '80px',
            textTransform: 'none',
            borderColor: 'grey.300',
            color: 'text.primary',
            '&:hover': {
              borderColor: 'grey.400',
              bgcolor: 'grey.50'
            }
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          size="small"
          sx={{
            minWidth: '80px',
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
              bgcolor: '#c62828'
            }
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
