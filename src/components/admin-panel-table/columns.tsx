'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import ActionsDropDownWithResponseModal from '@/components/actions-dropdown-w-response-modal';

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
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'supportTeamResponse',
    header: 'Support Team Response',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const ticket = row.original as unknown as {
        _id: string;
        name: string;
        email: string;
      };
      return <ActionsDropDownWithResponseModal ticket={ticket} />;
    },
  },
];
