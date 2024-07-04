import Link from 'next/link';

const Navbar = () => {
  return (
    <header className='sticky top-0 flex py-5 bg-slate-600 text-white'>
      <span className='w-1/2 ml-2 font-bold text-3xl'>Zealthy Help Desk</span>

      <nav className='w-1/2 pt-2'>
        <ul className='flex flex-row justify-end'>
          <li className='mr-4 hover:text-slate-400'>
            <Link href='/'>Submit a Ticket</Link>
          </li>
          <li className='mr-4 hover:text-slate-400'>
            <Link href='/admin'>Admin Panel</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
