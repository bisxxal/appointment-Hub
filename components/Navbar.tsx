import Link from "next/link";
import React from "react";
import { 
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

function Navbar() {
  return (
    <div className=" h-[60px] rounded-xl mt-7 mx-auto w-[96%] flex justify-between px-10 items-center bg-[#f588ffd8] ">
      <Link href={'/'} className=" text-gray-300 text-4xl font-bold ">Appointment</Link>

      <div className=" items-center gap-4 flex">
        <Link href={"/admin"}>admin</Link>
        <Link href={"/my-profile"}>My Profile</Link>
          <SignedOut>
              {/* <SignInButton /> */}
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
