-- Create Assets table
CREATE TABLE IF NOT EXISTS assets (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    model_number VARCHAR(100),
    serial_number VARCHAR(100),
    location VARCHAR(255),
    status VARCHAR(50),
    purchase_date DATE,
    purchase_cost DECIMAL(10,2),
    warranty_expiry DATE,
    last_maintenance_date TIMESTAMP WITH TIME ZONE,
    next_maintenance_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Maintenance Schedules table
CREATE TABLE IF NOT EXISTS maintenance_schedules (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    asset_id BIGINT REFERENCES assets(id),
    frequency VARCHAR(50), -- daily, weekly, monthly, quarterly, yearly
    last_completed TIMESTAMP WITH TIME ZONE,
    next_due TIMESTAMP WITH TIME ZONE,
    description TEXT,
    instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Parts/Inventory table
CREATE TABLE IF NOT EXISTS inventory (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    part_number VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INTEGER DEFAULT 0,
    minimum_quantity INTEGER DEFAULT 0,
    unit_cost DECIMAL(10,2),
    location VARCHAR(255),
    supplier_id BIGINT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Vendors/Suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Maintenance Teams table
CREATE TABLE IF NOT EXISTS maintenance_teams (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    supervisor_id UUID REFERENCES auth.users(id),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Team Members table
CREATE TABLE IF NOT EXISTS team_members (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    team_id BIGINT REFERENCES maintenance_teams(id),
    user_id UUID REFERENCES auth.users(id),
    role VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Purchase Orders table
CREATE TABLE IF NOT EXISTS purchase_orders (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    supplier_id BIGINT REFERENCES suppliers(id),
    order_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50), -- draft, submitted, approved, received, cancelled
    total_amount DECIMAL(10,2),
    notes TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Purchase Order Items table
CREATE TABLE IF NOT EXISTS purchase_order_items (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    purchase_order_id BIGINT REFERENCES purchase_orders(id),
    inventory_id BIGINT REFERENCES inventory(id),
    quantity INTEGER,
    unit_price DECIMAL(10,2),
    total_price DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add foreign key to inventory table for supplier
ALTER TABLE inventory 
ADD FOREIGN KEY (supplier_id) 
REFERENCES suppliers(id);

-- Create Work Orders table
CREATE TABLE IF NOT EXISTS work_orders (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(50), -- low, medium, high
    status VARCHAR(50), -- pending, in_progress, completed, cancelled
    assignedTo VARCHAR(255),
    dueDate TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for each table
CREATE TRIGGER update_assets_updated_at
    BEFORE UPDATE ON assets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_maintenance_schedules_updated_at
    BEFORE UPDATE ON maintenance_schedules
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inventory_updated_at
    BEFORE UPDATE ON inventory
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_suppliers_updated_at
    BEFORE UPDATE ON suppliers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_maintenance_teams_updated_at
    BEFORE UPDATE ON maintenance_teams
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at
    BEFORE UPDATE ON team_members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_purchase_orders_updated_at
    BEFORE UPDATE ON purchase_orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_purchase_order_items_updated_at
    BEFORE UPDATE ON purchase_order_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_work_orders_updated_at
    BEFORE UPDATE ON work_orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
