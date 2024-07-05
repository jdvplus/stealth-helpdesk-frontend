import Link from 'next/link';

export default function Navbar() {
  return (
    <header className='sticky top-0 flex py-5 bg-slate-600 text-white'>
      <Link
        href='/'
        className='w-1/2 ml-2 font-bold text-3xl hover:text-slate-400 transition ease-in-out'
      >
        <span className=''>Zealthy Help Desk</span>
      </Link>

      <nav className='w-1/2 pt-2'>
        <ul className='flex flex-row justify-end'>
          <li className='mr-4 hover:text-slate-400'>
            <Link href='/submit-a-request'>Submit a Help Desk Request</Link>
          </li>
          <li className='mr-4 hover:text-slate-400'>
            <Link href='/admin-panel'>Admin Panel</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
