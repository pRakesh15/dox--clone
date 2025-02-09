import Link from "next/link";


export default function Home() {
  return (
   <div className="flex  min-h-screen justify-center items-center">
    <Link href="/documents/123">
   Click <span className="text-blue-700 underline">here </span>here to go to edit document page
   </Link>
   </div>
  );
}
