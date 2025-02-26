export interface StoreResponse {
  store_slug: string;
  owner_id: string;
  store_name: string;
  whatsapp_number: string;
  work_days: WorkDays;
  work_hours: WorkHours;
  status: string;
}

export interface WorkDays {
  start_day: string;
  last_day: string;
}

export interface WorkHours {
  start_hour: string;
  last_hour: string;
}
