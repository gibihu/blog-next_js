"use client"; // ให้ไฟล์นี้เป็น Client Component

export default function Card(
    {children, image = 'none', title = '', sub = '', animate = false}:
    {children?: React.ReactNode, image?: string, title: string, sub?: string, animate?: boolean}
) {

    let classAnimate = animate ? 'hover:scale-105  transition' : '';

    return (
        <>
        <div className={`flex flex-col gap-2  bg-zinc-900  border-2 border-zinc-800  rounded-lg  shadow-lg  overflow-hidden ${classAnimate}`}>
            {image ? ( <img src={image} alt={image} /> ) : ('')}
            <div className="flex flex-col gap-2 p-4">
                <p className="text-xl font-bold line-clamp-3">{title}</p>
                <span>{sub}</span>
            </div>
            {children}
        </div>
        </>
    );
}