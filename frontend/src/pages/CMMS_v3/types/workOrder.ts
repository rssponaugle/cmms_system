export type WorkOrderStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type WorkOrderPriority = 'Low' | 'Medium' | 'High';
export type ServiceType = 'preventive' | 'corrective' | 'predictive' | 'emergency';

export interface WorkOrder {
  id: number;
  wo_number: string;
  serviceRequired: string;
  serviceDetails: string;
  status: WorkOrderStatus;
  priority: WorkOrderPriority;
  serviceType: ServiceType;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkOrderFormData {
  serviceRequired: string;
  serviceDetails: string;
  status: WorkOrderStatus;
  priority: WorkOrderPriority;
  serviceType: ServiceType;
  dueDate: string;
}

export const STATUS_OPTIONS: { value: WorkOrderStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' }
];

export const PRIORITY_OPTIONS: { value: WorkOrderPriority; label: string }[] = [
  { value: 'High', label: 'High' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Low', label: 'Low' }
];

export const SERVICE_TYPE_OPTIONS: { value: ServiceType; label: string }[] = [
  { value: 'preventive', label: 'Preventive' },
  { value: 'corrective', label: 'Corrective' },
  { value: 'predictive', label: 'Predictive' },
  { value: 'emergency', label: 'Emergency' }
];

export const INITIAL_FORM_DATA: WorkOrderFormData = {
  serviceRequired: '',
  serviceDetails: '',
  status: 'pending',
  priority: 'Medium',
  serviceType: 'corrective',
  dueDate: ''
};
