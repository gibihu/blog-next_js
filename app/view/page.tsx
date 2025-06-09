import PostContent from '../components/posts/onec'; // Adjust the path as necessary

interface Props {
  searchParams: Promise<{ id?: string }>; // Update to match the expected type
}

export default async function UserPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams; // Await the Promise
  const id = resolvedSearchParams.id;

  return (
    <>
      <div className="flex flex-col items-center gap-2 p-4 lg:p-6">
        <div className="p-4 dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700/50 shadow-lg rounded-lg max-w-[860px]">
          <PostContent id={Array.isArray(id) ? id[0] : id || ''} />
        </div>
      </div>
    </>
  );
}
