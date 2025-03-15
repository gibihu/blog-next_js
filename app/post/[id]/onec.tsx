"use client"; // บังคับให้เป็น Client Component

import { use, useEffect, useState } from "react";

export default function postContent({id}: {id: string}){
    const [post, setPost] = useState<any | null>(null);
    useEffect(() => {
        const dataStore = localStorage.getItem("post");
        if (dataStore) {
        const data = JSON.parse(dataStore);
        const filteredPost = data.filter((item: { id: string }) => item.id === id);
        setPost(filteredPost[0]);
        // let g = filteredPost[0];
        }
    }, [id]);
    
    
    return(
        <>
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
        </>
    );
}