import { supabase } from '../../../supabaseClient';
import { WorkOrder, WorkOrderFormData } from '../types/workOrder';

interface WorkOrderDB {
  id: number;
  wo_number: string;
  service_abridged: string;
  service_details: string;
  status: string;
  priority: string;
  service_type: string;
  due_date: string;
  created_at: string;
}

const mapDBToWorkOrder = (dbRecord: WorkOrderDB): WorkOrder => ({
  id: dbRecord.id,
  wo_number: dbRecord.wo_number,
  serviceRequired: dbRecord.service_abridged,
  serviceDetails: dbRecord.service_details,
  status: dbRecord.status as WorkOrder['status'],
  priority: dbRecord.priority as WorkOrder['priority'],
  serviceType: dbRecord.service_type as WorkOrder['serviceType'],
  dueDate: dbRecord.due_date,
  createdAt: dbRecord.created_at
});

const mapFormDataToDB = (formData: WorkOrderFormData) => ({
  service_abridged: formData.serviceRequired,
  service_details: formData.serviceDetails,
  status: formData.status,
  priority: formData.priority,
  service_type: formData.serviceType,
  due_date: formData.dueDate
});

export const workOrderService = {
  async getAll(): Promise<WorkOrder[]> {
    const { data, error } = await supabase
      .from('work_orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch work orders: ${error.message}`);
    return (data as WorkOrderDB[]).map(mapDBToWorkOrder);
  },

  async create(workOrder: WorkOrderFormData): Promise<void> {
    const { error } = await supabase
      .from('work_orders')
      .insert([mapFormDataToDB(workOrder)]);

    if (error) throw new Error(`Failed to create work order: ${error.message}`);
  },

  async update(id: number, workOrder: WorkOrderFormData): Promise<void> {
    const { error } = await supabase
      .from('work_orders')
      .update(mapFormDataToDB(workOrder))
      .eq('id', id);

    if (error) throw new Error(`Failed to update work order: ${error.message}`);
  },

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('work_orders')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete work order: ${error.message}`);
  }
};
