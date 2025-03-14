"use client"; // ให้ไฟล์นี้เป็น Client Component
import Link from "next/link";
import Button from "./Button"

export default function NavBar() {
    return (
        <>
        <div className="flex gap-2 justify-between items-center  p-4  bg-zinc-950   border-b-4 border-blue-600  shadow-lg  sticky top-0 z-50">
            {/* items */}
            <p className="text-2xl font-bold">Blog</p>

            {/* items */}
            <div className="flex gap-2 pe-2">
                <Button varName="primary" fontWeight="medium">Sign in</Button>
                <Link href="https://qoochub.com/sign_up.php" target="_blank">
                    <Button varName="primary-outline" fontWeight="medium" role="link">
                        Sign up
                    </Button>
                </Link>
            </div>
        </div>
        </>
    );
}