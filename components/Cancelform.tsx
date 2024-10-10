import React from 'react'

function Cancelform({data ,setOpen}:any) {
    const sumbitCancelForm = async()=>{
        // await ca
    }
  return (
    <div className=' fixed bg-[#00000027] backdrop-blur-[5px] w-full flex items-center justify-center  left-0 top-0 h-screen  z-20'>

            <form onSubmit={sumbitCancelForm} className="flex-col footer2 flex inshadow px-10  justify-center gap-4 backdrop-blur-[20px] rounded-lg bg-[#140e1a1d] w-[40%] bg-red- h-5/6 ">
    <h1 onClick={()=>setOpen(false)} className=" cursor-pointer text-4xl absolute top-6 right-6 ">X</h1>
              
                {/* {data?.doctor.name}
                <br />
                {data?.user?.username} */}

                <h1 className=' text-4xl font-semibold logo2'>Cancel Appointment</h1>

                <p className=' logo'> Are you sure you want to cancel your appointment.</p>


                <div className=' flex flex-col w-full  '>
                <p className=' text-sm text-gray-400 mb-2'> Reason for cancellation</p> 
                 
                 <textarea className=' bg-transparent border-2 rounded-lg placeholder:text-gray-500 border-[#ffffff3b] h-32 p-2' placeholder='ex: Urgent meeting came up' name="reason">


                 </textarea>
                </div>
    
                <button className=" bg-[#f24e43] rounded-lg p-2 px-4">Cancel</button>
            </form>
        </div>
  )
}

export default Cancelform