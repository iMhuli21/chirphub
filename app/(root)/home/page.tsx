import CreatePost from '@/components/create-post';

export default function Feed() {
  return (
    <>
      <section className='pt-4'>
        <div className='pb-3 border-b pl-4 w-full flex items-center justify-center'>
          <h1 className='text-xl font-extrabold tracking-tight'>Home</h1>
        </div>
        <CreatePost />
      </section>
    </>
  );
}
