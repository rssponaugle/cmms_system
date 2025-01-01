-- Enable RLS on the work_orders table
ALTER TABLE work_orders ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all authenticated users to view work orders
CREATE POLICY "Allow authenticated users to view work orders"
ON work_orders
FOR SELECT
TO authenticated
USING (true);

-- Create policy to allow authenticated users to insert work orders
CREATE POLICY "Allow authenticated users to insert work orders"
ON work_orders
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create policy to allow authenticated users to update their work orders
CREATE POLICY "Allow authenticated users to update work orders"
ON work_orders
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Create policy to allow authenticated users to delete their work orders
CREATE POLICY "Allow authenticated users to delete work orders"
ON work_orders
FOR DELETE
TO authenticated
USING (true);
