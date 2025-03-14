"use client"; // ให้ไฟล์นี้เป็น Client Component

import { ButtonHTMLAttributes } from "react";

export default function Button(
    { children, classCn = '', varName = 'primary', size = 'base', fontsize = 'base', fontWeight = 'nomal', ...props }: 
    { children: React.ReactNode, classCn?: string; varName?: string, size?: string, fontsize?: string, fontWeight?: string}
    & React.ButtonHTMLAttributes<HTMLButtonElement>
) {

    let classVar = '';


    // Class
    switch (varName){
        case 'primary':
            classVar = "bg-blue-600 hover:bg-blue-700  border-2 border-blue-500/50 hover:border-blue-600/50  text-white";
            break;
        case 'primary-outline':
            classVar = "hover:bg-blue-600  border-2 border-blue-600 hover:border-blue-500/50  text-blue-500 hover:text-white";
            break;
        default:
            classVar = "bg-zinc-600 hover:bg-zinc-700  border-2 border-zinc-500/30 hover:border-zinc-600/30  text-white";
            break; 
    }

    // size
    switch(size){
        case 'sm':
            size = 'px-4 py-1';
            break;
        case 'md':
            size = 'px-8 py-3';
            break;
        case 'lg':
            size = 'px-12 py-3';
            break;
        default:
            size = 'px-6 py-2';
            break;
    }
    // fontsize
    switch(fontsize){
        case 'sm':
            fontsize = 'text-sm';
            break;
        case 'md':
            fontsize = 'text-md';
            break;
        case 'lg':
            fontsize = 'text-lg';
            break;
        default:
            fontsize = 'text-base';
            break;
    }
    // fontWeight
    switch(fontWeight){
        case 'light':
            fontWeight = 'font-light';
            break;
        case 'medium':
            fontWeight = 'font-medium';
            break;
        case 'semibold':
            fontWeight = 'font-semibold';
            break;
        case 'bold':
            fontWeight = 'font-bold';
            break;
        default:
            fontWeight = 'font-light';
            break;
    }
    
    return <button className={`${classVar} ${classCn}  ${fontsize}  ${size} ${fontWeight}  cursor-pointer  rounded transition  disabled:opacity-70  disabled:cursor-not-allowed `} {...props}>{children}</button>;
  }
  