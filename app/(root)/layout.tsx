import { checkUserInDb } from '@/actions/checkUserDb';
import Search from '@/components/search';
import Sidebar from '@/components/sidebar';

interface Props {
  children: React.ReactNode;
}

export default async function layout({ children }: Props) {
  const dbUserCheck = await checkUserInDb();

  if (dbUserCheck?.error) {
    console.log(dbUserCheck.error);
  } else if (dbUserCheck?.success) {
    console.log(dbUserCheck.success);
  }

  return (
    <main className='main-content grid grid-cols-12 grid-rows-12'>
      <Sidebar />
      <div className='col-span-12 row-span-11 sm:row-span-12 sm:col-span-11 lg:col-span-8 xl:col-span-7 overflow-y-auto overflow-x-hidden border-r'>
        {children}
      </div>
      <Search />
    </main>
  );
}
