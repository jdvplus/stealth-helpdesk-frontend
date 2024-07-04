import { ColumnDef } from '@tanstack/react-table';

export type UserSubmissionForm = {
  name: string;
  email: string;
  description: string;
};

type TicketStatus = 'new' | 'in progress' | 'resolved';

export type Ticket = {
  id: string;
  name: string;
  email: string;
  description: string;
  status: TicketStatus;
  supportTeamResponse: string;
};

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
