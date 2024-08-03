import Search from '@/components/search';
import Sidebar from '@/components/sidebar';

interface Props {
  children: React.ReactNode;
}

export default function layout({ children }: Props) {
  return (
    <main className='main-content grid grid-cols-6'>
      <Sidebar />
      <div className='col-span-4'>{children}</div>
      <Search />
    </main>
  );
}
