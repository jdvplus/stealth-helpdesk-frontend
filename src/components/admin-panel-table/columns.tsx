'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Ticket } from '@/lib/types';

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email Address',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'supportTeamResponse',
    header: 'Support Team Response',
  },
];
