'use client';

/*
In a production-level application, this admin panel would of course be restricted with secure authentication measures, as the information is sensitive and should only visible to employees/team members/etc.

(We could use https://next-auth.js.org/getting-started/example, for example.)
*/

import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/admin-panel-table/data-table';
import { columns } from '@/components/admin-panel-table/columns';

import { Ticket } from '@/lib/types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AdminPanel() {
  const [data, setData] = useState(null);

  const getData = async (): Promise<void> => {
    try {
      const res = await fetch(`${apiUrl}/tickets`);
      const data = await res.json();

      setData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='w-[90%] mx-auto py-10 flex flex-col'>
      <Button className='w-[10%] mx-auto mb-4' onClick={getData}>
        refresh table
      </Button>
      {/* ^^ I really dislike this workaround for re-fetching data and re-rendering the table, but I unfortunately couldn't quite get server-side cache revalidation and page re-rendering with Next.js working properly given the assessment time constraints and the existing infrastructure of the codebase.

      The actions of saving a draft and resolving a ticket occur from buttons within nested shadcn `Dialog` and `Dropdown Menu` components, which presented some complexity in terms of figuring out how to prop drill / manage state / etc. in order to have those actions ultimately trigger a re-fetch and re-rendering of the table in this component.
      
      This is certainly one of the downsides of relying on an external component library so heavily. */}

      {data ? <DataTable columns={columns} data={data as Ticket[]} /> : null}
    </div>
  );
}
