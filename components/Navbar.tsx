'use client'
import Link from "next/link"; 
import { SignedIn,SignedOut,UserButton,useUser} from '@clerk/nextjs' 
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Navbar() {
  const { user } = useUser();
  const role = user?.publicMetadata?.role;
  const router = useRouter();
  useEffect(() => {
    const role = user?.publicMetadata.role; 
    if (role==='admin') {
      router.push(`/admin`);
    }
  }, [user, router]);

  return (
    <div className=" h-[60px] rounded-xl mt-4 mx-auto w-[96%] flex justify-between max-lg:px-3 px-10 items-center bg-[#f588ffc9] ">
      <Link href={'/'} className=" text-gray-300 text-4xl max-sm:text-xl max-lg:text-2xl font-bold ">Appointment-Hub</Link>
      <div className=" items-center gap-4 flex">
        {
         user && role === 'admin'  ? (  <Link className=" border-2  border-[#ffffff57] inshadow max-sm:px-2 max-sm:py-1 px-4 py-2 rounded-lg "  href={"/admin"}>admin</Link> ): 
         ( user && <>
         <Link className="   hover:bg-blue-500 transition-all footer2  inshadow max-sm:px-2 max-sm:py-1 px-4 py-2 rounded-lg "  href={"/appointment"}>Appointment</Link>
         <Link className=" border-2  border-[#ffffff57] inshadow max-sm:px-2 max-sm:py-1 px-4 py-2 rounded-lg "  href={"/my-profile"}>My Profile</Link>
         </>
          )
        }
          <SignedOut> 
              <Link className=" border-2  border-[#ffffff57] inshadow max-sm:px-2 max-sm:py-1 px-4 py-2 rounded-lg " href={'/sign-in'}>Sign-in</Link>
            </SignedOut>
            <SignedIn>
              <UserButton  />
            </SignedIn> 
      </div>
    </div>
  );
}

export default Navbar;
