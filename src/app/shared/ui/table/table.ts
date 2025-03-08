export interface ColDef {
  header: string;
  field: string;
  align?: 'left' | 'center' | 'right';
  currency?: boolean;
  suppress?: boolean;
  actionsConfig?: {
    icon?: string;
    label?: string;
    type: 'danger' | 'primary' | 'secondary';
    eventName: string;
  }[];
  suppressConfig?: {
    length: number;
    copy: boolean;
  };
  iconConfig?: {
    value: string;
    icon: string;
    label?: string;
    color?: string;
  }[]
}

export interface TableActionEvent {
  eventName: string;
  item: Record<string, any>;
}
