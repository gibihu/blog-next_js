'use client'; // เพิ่มบรรทัดนี้
import { useEffect, useState } from 'react';
import Card from './components/Card';
import Link from 'next/link';

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const sendData = async () => {
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
        setData(result.message);  // เก็บผลลัพธ์ที่ได้จาก API
        localStorage.setItem('post', JSON.stringify(result.message));
        console.log(result.message);
      } catch (error) {
        setError(error);  // เก็บข้อความ error ถ้ามี
      }
    };

    sendData();
  }, []);  // [] ทำให้ useEffect ทำงานครั้งเดียวเมื่อ component mount

  return (
    <>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data ? (
        <div className="grid grid-colos-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4  p-4  overflow-hidden  bg-zinc-100 dark:bg-zinc-900">
          {data.map((content, index) => (
            <Link href={`post/${content.id}`} key={index} >
              <Card image={content.urlImgResized} title={content.topic} key={index} animate={true} className='h-full'>
                <div className="h-full flex flex-col justify-end  p-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-zinc-500">{content.view}</span>
                    <span className="text-sm text-zinc-500">{content.name}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
