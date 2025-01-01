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
        backgroundColor: '#f8f9fa',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}
    >
      <TextField
        size="small"
        placeholder="Search work orders..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ 
          minWidth: 250,
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#ffffff',
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: '#ffffff',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2',
              },
            },
            '&.Mui-focused': {
              backgroundColor: '#ffffff',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2',
                borderWidth: '2px',
              },
            },
          },
          '& .MuiInputLabel-root': {
            color: '#666666',
            '&.Mui-focused': {
              color: '#1976d2',
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#666666' }} />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => onSearchChange('')}
                edge="end"
                sx={{
                  color: '#666666',
                  '&:hover': {
                    color: '#1976d2',
                  },
                }}
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
          minWidth: 140,
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#ffffff',
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: '#ffffff',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2',
              },
            },
            '&.Mui-focused': {
              backgroundColor: '#ffffff',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2',
                borderWidth: '2px',
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
            paddingY: '8px',
          },
        }}
      >
        {statusOptions.map((option) => (
          <MenuItem 
            key={option} 
            value={option} 
            sx={{ 
              fontSize: '0.875rem',
              minHeight: '32px',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
              },
              '&.Mui-selected': {
                backgroundColor: 'rgba(25, 118, 210, 0.12)',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.16)',
                },
              },
            }}
          >
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
          minWidth: 140,
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#ffffff',
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: '#ffffff',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2',
              },
            },
            '&.Mui-focused': {
              backgroundColor: '#ffffff',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2',
                borderWidth: '2px',
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
            paddingY: '8px',
          },
        }}
      >
        {priorityOptions.map((option) => (
          <MenuItem 
            key={option} 
            value={option} 
            sx={{ 
              fontSize: '0.875rem',
              minHeight: '32px',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
              },
              '&.Mui-selected': {
                backgroundColor: 'rgba(25, 118, 210, 0.12)',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.16)',
                },
              },
            }}
          >
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
              color: '#666666',
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              '&:hover': {
                backgroundColor: 'rgba(211, 47, 47, 0.08)',
                color: '#d32f2f',
              },
              transition: 'all 0.2s',
            }}
          >
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};
