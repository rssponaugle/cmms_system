export type WorkOrderStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type WorkOrderPriority = 'low' | 'medium' | 'high';
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
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
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
  priority: 'medium',
  serviceType: 'corrective',
  dueDate: ''
};
