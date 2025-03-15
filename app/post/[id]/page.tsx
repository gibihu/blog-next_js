"use client"; // บังคับให้เป็น Client Component

import { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Head from 'next/head';


export async function generateStaticParams() {
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
        return result.message;
      } catch (error) {
        return error;  // เก็บข้อความ error ถ้ามี
      }
    };

    sendData();
  }, []);
}

export default function UserPage() {
  const { id } = useParams(); // ดึงค่าพารามิเตอร์จาก URL

  const [post, setPost] = useState<any | null>(null);

  const cssLinks = [
    'https://qoochub.com/assets/css/tinyMceDoc.css',
  ];

  const jsScripts = [
    'https://platform.twitter.com/widgets.js',
  ];

  useEffect(() => {
    const dataStore = localStorage.getItem("post");
    if (dataStore) {
      const data = JSON.parse(dataStore);
      const filteredPost = data.filter((item: { id: string }) => item.id === id);
      setPost(filteredPost[0]);
      // let g = filteredPost[0];
    }

    // ลูปและเพิ่มลิงก์ CSS
    cssLinks.forEach((link) => {
      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = link;
      document.head.appendChild(linkElement);
    });

    // ลูปและเพิ่มสคริปต์ JS
    jsScripts.forEach((src) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = src;
      scriptElement.async = true; // ให้โหลดแบบอะซิงโครนัส
      document.body.appendChild(scriptElement);
    });

    // ลบลิงก์และสคริปต์เมื่อคอมโพเนนต์นี้ถูก unmount
    return () => {
      cssLinks.forEach((link) => {
        const linkElement = document.querySelector(`link[href="${link}"]`);
        if (linkElement) {
          document.head.removeChild(linkElement);
        }
      });

      jsScripts.forEach((src) => {
        const scriptElement = document.querySelector(`script[src="${src}"]`);
        if (scriptElement) {
          document.body.removeChild(scriptElement);
        }
      });
    };
  }, [id]);

  if (!post) return <div>กำลังโหลด...</div>;

  return (
    <>
      <div className="flex flex-col items-center gap-2 p-4 lg:p-6">
        <div className="p-4 dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700/50 shadow-lg rounded-lg  max-w-[860px]">
          {post ? (
            <div className="p-4 flex flex-col gap-6">
              <div className="flex gap-2 justify-between border-b-2 border-zinc-500 pb-6">
                <p className="text-2xl">{post.topic}</p>
                <div className="flex gap-2">
                  {post.setting.ai == '0' ? (<span className="text-zinc-500/50">AI</span>) : ('')}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {post.urlImage ? (<img src={post.urlImage} alt={post.urlImage} className="rounded-lg height-[70vh]" />) : ('')}
                <div className="flex justify-between">
                  <p className="text-zinc-500">{post.timeDate}</p>
                  <p className="text-zinc-500">{post.username}</p>
                </div>
              </div>

              <div>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

            </div>

          ) : (
            <div className="text-xl text-gray-500">No Post Found</div>
          )}
        </div>
      </div>
    </>
  );
}
