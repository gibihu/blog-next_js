

import Head from 'next/head';
import PostContent from '../../components/posts/onec'; // Adjust the path as necessary

export async function generateStaticParams() {
  try {
    const response = await fetch('https://qoochub.com/api/sub/blog/post/all.php', {
      method: 'POST', // ใช้ POST method
      headers: {
        'Content-Type': 'application/json', // ระบุว่าเป็นข้อมูล JSON
      },
      body: JSON.stringify({
        token: 'MNBVCXZASDFGHJKL' ,
        orderby: 'DESC'
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    // console.log(result);
    return(result.message);  // เก็บผลลัพธ์ที่ได้จาก API
  } catch (error) {
    return error;  // เก็บข้อความ error ถ้ามี
  }
}

export default async function UserPage({ params }: {params: Promise<{id: string}>}) {
  const { id } = await params; // ✅ ใช้ use() เพื่อดึงค่า

  return (
    <>
      <div className="flex flex-col items-center gap-2 p-4 lg:p-6">
        <div className="p-4 dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700/50 shadow-lg rounded-lg  max-w-[860px]">
          <PostContent id={id} />
        </div>
      </div>
    </>
  );
}
