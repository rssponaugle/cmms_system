# Modern CMMS System

A modern, cloud-based Computerized Maintenance Management System built with React and Supabase.

## Features

- **Asset Management**
  - Track equipment and machinery
  - Store detailed asset information (model numbers, serial numbers, locations)
  - Monitor asset status and maintenance history
  - Track purchase dates and warranty information

- **Work Order Management**
  - Create and track maintenance work orders
  - Assign priorities and status
  - Track completion status
  - Attach detailed descriptions and instructions

- **Preventive Maintenance**
  - Schedule recurring maintenance tasks
  - Automated next-due-date calculations
  - Multiple frequency options (daily, weekly, monthly, quarterly, yearly)
  - Link maintenance schedules to specific assets

- **Real-time Dashboard**
  - Overview of system status
  - Pending work orders
  - Upcoming maintenance tasks
  - Asset status summary

## Tech Stack

### Frontend
- React with TypeScript
- Material-UI for modern, responsive design
- React Router for navigation
- Supabase Client for real-time data

### Backend
- Supabase (Backend as a Service)
  - PostgreSQL database
  - Real-time subscriptions
  - Built-in authentication
  - Row-level security

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [your-repo-url]
   cd cmms-system
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the frontend directory with:
   ```
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Supabase Setup

1. Create a new project on [Supabase](https://supabase.com)

2. Run the following SQL in Supabase SQL editor to create required tables:
   - Assets
   - Work Orders
   - Maintenance Schedules
   - Teams
   - Inventory
   - Purchase Orders

3. Set up Row Level Security (RLS) policies for each table

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   └── CMMS/
│   │       ├── Dashboard.tsx    # Main dashboard view
│   │       ├── Assets.tsx       # Asset management
│   │       ├── WorkOrders.tsx   # Work order management
│   │       └── Maintenance.tsx  # Maintenance schedules
│   ├── components/             # Reusable components
│   ├── supabaseClient.ts      # Supabase configuration
│   └── App.jsx                # Main application component
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
