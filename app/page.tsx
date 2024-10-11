import Image from "next/image";
import Link from "next/link";

export default function Home() { 
  return (
    <main className=" w-full h-[85vh] max-lg:h-[89vh] flex max-lg:flex-col max-lg:gap-8  max-lg:px-0  px-8 mt-6">
       
       <div className=" max-md:px-4 max-lg:px-6 ">
        <h1 className=" text-4xl font-semibold logo2">create appointment in just simple steps. </h1>

        <Link className=" border-2 border-[#ffffff30] inshadow footer2 max-lg:mt-6 mt-10 block rounded-xl w-fit px-7 py-2 " href={'/sign-in'}>Login</Link>

       </div>

      <Image className=" max-lg:object-cover w-full h-full max-lg:rounded-none rounded-lg" src='/bg.jpg' width={1200} height={1200} alt=""/> 
    </main>
  );
}
