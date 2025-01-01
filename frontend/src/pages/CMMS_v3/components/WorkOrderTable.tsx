import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  IconButton,
  Tooltip,
  Box,
  Typography,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { WorkOrder } from '../types/workOrder';

interface WorkOrderTableProps {
  workOrders: WorkOrder[];
  onEditClick: (workOrder: WorkOrder) => void;
  onDeleteClick: (workOrder: WorkOrder) => void;
  sortField: keyof WorkOrder;
  sortOrder: 'asc' | 'desc';
  onSort: (field: keyof WorkOrder) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return { color: '#2e7d32', background: '#e8f5e9' };
    case 'in_progress':
      return { color: '#ed6c02', background: '#fff3e0' };
    case 'pending':
      return { color: '#0288d1', background: '#e3f2fd' };
    case 'cancelled':
      return { color: '#d32f2f', background: '#ffebee' };
    default:
      return { color: '#757575', background: '#f5f5f5' };
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return { color: '#d32f2f', background: '#ffebee' };
    case 'medium':
      return { color: '#ed6c02', background: '#fff3e0' };
    case 'low':
      return { color: '#2e7d32', background: '#e8f5e9' };
    default:
      return { color: '#757575', background: '#f5f5f5' };
  }
};

const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), 'MM/dd/yyyy');
  } catch {
    return 'Invalid Date';
  }
};

export const WorkOrderTable: React.FC<WorkOrderTableProps> = ({
  workOrders,
  onEditClick,
  onDeleteClick,
  sortField,
  sortOrder,
  onSort
}) => {
  const createSortHandler = (field: keyof WorkOrder) => () => {
    onSort(field);
  };

  return (
    <TableContainer 
      component={Paper} 
      elevation={2}
      sx={{ 
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <Table size="medium">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell>
              <TableSortLabel
                active={sortField === 'wo_number'}
                direction={sortField === 'wo_number' ? sortOrder : 'asc'}
                onClick={createSortHandler('wo_number')}
              >
                WO Number
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortField === 'serviceRequired'}
                direction={sortField === 'serviceRequired' ? sortOrder : 'asc'}
                onClick={createSortHandler('serviceRequired')}
              >
                Service Required
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortField === 'serviceType'}
                direction={sortField === 'serviceType' ? sortOrder : 'asc'}
                onClick={createSortHandler('serviceType')}
              >
                Service Type
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortField === 'status'}
                direction={sortField === 'status' ? sortOrder : 'asc'}
                onClick={createSortHandler('status')}
              >
                Status
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortField === 'priority'}
                direction={sortField === 'priority' ? sortOrder : 'asc'}
                onClick={createSortHandler('priority')}
              >
                Priority
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortField === 'dueDate'}
                direction={sortField === 'dueDate' ? sortOrder : 'asc'}
                onClick={createSortHandler('dueDate')}
              >
                Due Date
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workOrders.map((workOrder) => {
            const statusColors = getStatusColor(workOrder.status);
            const priorityColors = getPriorityColor(workOrder.priority);

            return (
              <TableRow
                key={workOrder.id}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {workOrder.wo_number}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Tooltip title={workOrder.serviceRequired} placement="top">
                    <Typography
                      variant="body2"
                      sx={{
                        maxWidth: 200,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {workOrder.serviceRequired}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {workOrder.serviceType}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={workOrder.status}
                    size="small"
                    sx={{
                      color: statusColors.color,
                      bgcolor: statusColors.background,
                      fontWeight: 500
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={workOrder.priority}
                    size="small"
                    sx={{
                      color: priorityColors.color,
                      bgcolor: priorityColors.background,
                      fontWeight: 500
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {formatDate(workOrder.dueDate)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => onEditClick(workOrder)}
                        sx={{ color: 'primary.main' }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => onDeleteClick(workOrder)}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
