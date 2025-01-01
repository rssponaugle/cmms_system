import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

interface WorkOrderFiltersProps {
  searchQuery: string;
  statusFilter: string;
  priorityFilter: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onPriorityFilterChange: (value: string) => void;
  onClearFilters: () => void;
}

const statusOptions = ['all', 'Pending', 'In Progress', 'Completed', 'Cancelled'];
const priorityOptions = ['all', 'High', 'Medium', 'Low'];

export const WorkOrderFilters: React.FC<WorkOrderFiltersProps> = ({
  searchQuery,
  statusFilter,
  priorityFilter,
  onSearchChange,
  onStatusFilterChange,
  onPriorityFilterChange,
  onClearFilters,
}) => {
  const hasActiveFilters = searchQuery || statusFilter !== 'all' || priorityFilter !== 'all';

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 3,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <TextField
        size="small"
        placeholder="Search work orders..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ 
          minWidth: 250,
          backgroundColor: '#ffffff',
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#ffffff'
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => onSearchChange('')}
                edge="end"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        select
        size="small"
        label="Status"
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value)}
        sx={{ 
          minWidth: 120,
          backgroundColor: '#ffffff',
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#ffffff'
          }
        }}
      >
        {statusOptions.map((option) => (
          <MenuItem key={option} value={option} sx={{ textTransform: 'capitalize' }}>
            {option === 'all' ? 'All Statuses' : option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        size="small"
        label="Priority"
        value={priorityFilter}
        onChange={(e) => onPriorityFilterChange(e.target.value)}
        sx={{ 
          minWidth: 120,
          backgroundColor: '#ffffff',
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#ffffff'
          }
        }}
      >
        {priorityOptions.map((option) => (
          <MenuItem key={option} value={option} sx={{ textTransform: 'capitalize' }}>
            {option === 'all' ? 'All Priorities' : option}
          </MenuItem>
        ))}
      </TextField>

      {hasActiveFilters && (
        <Tooltip title="Clear all filters">
          <IconButton
            size="small"
            onClick={onClearFilters}
            sx={{ 
              ml: 'auto',
              color: 'text.secondary',
              '&:hover': {
                color: 'error.main',
              },
            }}
          >
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};
