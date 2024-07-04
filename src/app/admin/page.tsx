/*
In a production-level application, this admin panel would of course be restricted with secure authentication measures, as the information is sensitive and should only visible to employees/team members/etc.

(We could use https://next-auth.js.org/getting-started/example, for example.)
*/

import { unstable_noStore as noStore } from 'next/cache';

import { columns } from '@/components/admin-panel-table/columns';
import { DataTable } from '@/components/admin-panel-table/data-table';

import { Ticket } from '@/lib/types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getData = async (): Promise<Ticket[]> => {
  const res = await fetch(`${apiUrl}/tickets`);
  const data = await res.json();
  console.log('data', data);

  return data;
};

export default async function AdminPanel() {
  noStore();
  const data = await getData();

  return (
    <div className='w-[90%] mx-auto py-10'>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
