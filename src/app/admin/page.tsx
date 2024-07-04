import { columns } from '@/components/admin-panel-table/columns';
import { DataTable } from '@/components/admin-panel-table/data-table';

import { Ticket } from '@/lib/types';

const apiUrl =
  process.env.API_URL || 'https://zealthy-helpdesk-backend-jdv724.vercel.app';

const getData = async (): Promise<Ticket[]> => {
  const res = await fetch(`${apiUrl}/tickets`);
  const data = await res.json();
  console.log('data', data);

  return data;
};

export default async function AdminPanel() {
  const data = await getData();

  return (
    <div className='w-4/5 mx-auto py-10'>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
