"use client"; // ให้ไฟล์นี้เป็น Client Component

export default function Card(
    {children, image = 'none', title = '', sub = '', animate = false, className = ''}:
    {children?: React.ReactNode, image?: string, title: string, sub?: string, animate?: boolean, className?: string}
) {

    let classAnimate = animate ? 'hover:scale-105  transition' : '';

    return (
        <>
        <div className={`flex flex-col gap-2  bg-zinc-100 dark:bg-zinc-900  border-2 border-zinc-300 dark:border-zinc-700/50  rounded-lg  shadow-lg  overflow-hidden ${classAnimate}  ${className}`}>
            {image ? ( <img src={image} alt={image} className="rounded-lg" /> ) : ('')}
            <div className="flex flex-col gap-2 p-4">
                <p className="text-md font-medium line-clamp-3">{title}</p>
                <span>{sub}</span>
            </div>
            {children}
        </div>
        </>
    );
}