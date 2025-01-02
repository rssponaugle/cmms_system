import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

interface WorkOrderTableProps {
  workOrders: WorkOrder[];
  onEditClick: (workOrder: WorkOrder) => void;
  onDeleteClick: (workOrder: WorkOrder) => void;
  sortField: keyof WorkOrder;
  sortOrder: 'asc' | 'desc';
  onSort: (field: keyof WorkOrder) => void;
}

type ColumnAlignment = 'left' | 'center' | 'right' | 'inherit' | 'justify';

interface Column {
  id: string;
  label: string;
  align: ColumnAlignment;
  paddingRight?: string;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'corrective':
      return '#2196f3'; // blue
    case 'project':
      return '#ff9800'; // orange
    case 'preventive':
      return '#4caf50'; // green
    default:
      return '#757575'; // grey
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'completed':
      return '#4caf50'; // green
    case 'in_progress':
      return '#ff9800'; // orange
    case 'pending':
      return '#2196f3'; // blue
    case 'cancelled':
      return '#f44336'; // red
    default:
      return '#757575'; // grey
  }
};

const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), 'MM/dd/yyyy');
  } catch {
    return 'Invalid Date';
  }
};

const columns: Column[] = [
  { id: 'wo_number', label: 'WO Number', align: 'center' },
  { id: 'serviceRequired', label: 'Service Required', align: 'center' },
  { id: 'serviceType', label: 'Service Type', align: 'center' },
  { id: 'status', label: 'Status', align: 'center' },
  { id: 'priority', label: 'Priority', align: 'center' },
  { id: 'dueDate', label: 'Due Date', align: 'center' },
  { id: 'actions', label: 'Actions', align: 'center' },
];

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
    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 1.5, boxShadow: 2 }}>
      <TableContainer>
        <Table sx={{ 
          minWidth: 750, 
          '& .MuiTableCell-root': { 
            fontWeight: 550,
            padding: '0px 2px',
            height: '28px',
            display: 'table-cell',
            verticalAlign: 'middle',
            borderBottom: '1px solid rgba(224, 224, 224, 0.4)'
          },
          '& .MuiTableCell-body': { 
            '&:first-of-type': {
              paddingLeft: '4px',
            },
            '&:last-of-type': {
              paddingRight: '4px',
            }
          }
        }} size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  onClick={column.id !== 'actions' ? createSortHandler(column.id as keyof WorkOrder) : undefined}
                  sx={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    padding: '0px 2px',
                    height: '32px',
                    whiteSpace: 'nowrap',
                    cursor: column.id !== 'actions' ? 'pointer' : 'default',
                    '&:first-of-type': {
                      paddingLeft: '4px',
                    },
                    '&:last-of-type': {
                      paddingRight: '4px',
                    },
                    '&:hover': {
                      backgroundColor: column.id !== 'actions' ? '#1565c0' : '#1976d2',
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {column.label}
                    {column.id !== 'actions' && sortField === column.id && (
                      <Box component="span" sx={{ display: 'inline-flex', marginLeft: '4px' }}>
                        {sortOrder === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
                      </Box>
                    )}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {workOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No work orders found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              workOrders.map((workOrder) => (
                <TableRow
                  hover
                  key={workOrder.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:nth-of-type(even)': {
                      backgroundColor: '#e6f2ff',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                    },
                    height: '28px',
                    td: {
                      padding: '0px 2px',
                      '&:first-of-type': {
                        paddingLeft: '4px',
                      },
                      '&:last-of-type': {
                        paddingRight: '4px',
                      }
                    },
                  }}
                >
                  <TableCell align="center" sx={{ display: 'table-cell', verticalAlign: 'middle' }}>{workOrder.wo_number}</TableCell>
                  <TableCell sx={{ 
                    textAlign: 'left',
                    whiteSpace: 'nowrap',
                    maxWidth: '200px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'table-cell',
                    verticalAlign: 'middle'
                  }}>
                    {workOrder.serviceRequired.length > 30 ? (
                      <Tooltip title={workOrder.serviceRequired} arrow placement="top">
                        <Box sx={{ 
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: 'flex',
                          alignItems: 'center',
                          height: '100%'
                        }}>
                          {workOrder.serviceRequired}
                        </Box>
                      </Tooltip>
                    ) : (
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%'
                      }}>
                        {workOrder.serviceRequired}
                      </Box>
                    )}
                  </TableCell>
                  <TableCell align="center" sx={{ 
                    display: 'table-cell',
                    verticalAlign: 'middle',
                    paddingRight: '4px'
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '100%',
                      paddingRight: '2px'
                    }}>
                      <Chip
                        label={workOrder.serviceType}
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(workOrder.serviceType),
                          color: '#ffffff',
                          fontWeight: 500,
                          fontSize: '0.75rem',
                          height: '20px',
                          '& .MuiChip-label': {
                            padding: '0 6px',
                          }
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center" sx={{ 
                    display: 'table-cell',
                    verticalAlign: 'middle',
                    paddingRight: '4px'
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '100%',
                      paddingRight: '2px'
                    }}>
                      <Chip
                        label={workOrder.status}
                        size="small"
                        sx={{
                          backgroundColor: getPriorityColor(workOrder.status),
                          color: '#ffffff',
                          fontWeight: 500,
                          fontSize: '0.75rem',
                          height: '20px',
                          '& .MuiChip-label': {
                            padding: '0 6px',
                          }
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center" sx={{ 
                    display: 'table-cell',
                    verticalAlign: 'middle',
                    paddingRight: '4px'
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '100%',
                      paddingRight: '2px'
                    }}>
                      <Chip
                        label={workOrder.priority}
                        size="small"
                        sx={{
                          backgroundColor: getPriorityColor(workOrder.priority),
                          color: '#ffffff',
                          fontWeight: 500,
                          fontSize: '0.75rem',
                          height: '20px',
                          '& .MuiChip-label': {
                            padding: '0 6px',
                          }
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center" sx={{ display: 'table-cell', verticalAlign: 'middle' }}>{formatDate(workOrder.dueDate)}</TableCell>
                  <TableCell align="center" sx={{ display: 'table-cell', verticalAlign: 'middle' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <Tooltip title="Edit work order">
                        <IconButton
                          onClick={() => onEditClick(workOrder)}
                          size="small"
                          sx={{
                            '& svg': {
                              transition: 'transform 0.2s ease-in-out'
                            },
                            '&:hover svg': {
                              transform: 'scale(1.25)'
                            },
                            color: '#5c5c8a',
                            '&:hover': {
                              backgroundColor: 'rgba(92, 92, 138, 0.04)',
                            }
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete work order">
                        <IconButton
                          onClick={() => onDeleteClick(workOrder)}
                          size="small"
                          sx={{
                            '& svg': {
                              transition: 'transform 0.2s ease-in-out'
                            },
                            '&:hover svg': {
                              transform: 'scale(1.25)'
                            },
                            color: 'error.main',
                            '&:hover': {
                              backgroundColor: 'rgba(211, 47, 47, 0.04)',
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
