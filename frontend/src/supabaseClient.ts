import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock data for development
export const mockData = {
  workOrders: [
    {
      id: 1,
      title: 'Maintenance Check',
      description: 'Regular maintenance check for equipment',
      priority: 'medium',
      status: 'pending',
      assignedTo: 'John Doe',
      dueDate: '2024-01-15',
    },
    {
      id: 2,
      title: 'Repair Machine #3',
      description: 'Fix mechanical issue in production line',
      priority: 'high',
      status: 'in_progress',
      assignedTo: 'Jane Smith',
      dueDate: '2024-01-10',
    },
  ],
}
