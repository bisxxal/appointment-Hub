'use client'
import Link from "next/link"; 
import { 
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser
} from '@clerk/nextjs' 

function Navbar() {

  const {   user } = useUser();

  console.log(user);
  
 

  const role = user?.publicMetadata?.role; 
  return (
    <div className=" h-[60px] rounded-xl mt-7 mx-auto w-[96%] flex justify-between px-10 items-center bg-[#f588ffd8] ">
      <Link href={'/'} className=" text-gray-300 text-4xl font-bold ">Appointment</Link>

      <div className=" items-center gap-4 flex">

        {
          role === 'admin'  ? (  <Link href={"/admin"}>admin</Link> ): (<Link href={"/my-profile"}>My Profile</Link> )
        }
      
       
          <SignedOut> 
              <Link href={'/sign-in'}>Sign-in</Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>

       
      </div>
    </div>
  );
}

export default Navbar;
