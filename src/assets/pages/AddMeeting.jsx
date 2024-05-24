import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom";
export default function AddMeeting(){

    let navigate = useNavigate()
    let titleInput= useRef();
    let dateInput= useRef();
    let descInput= useRef();
    let typeInput= useRef();
    let [loadingMeeting , setLoadingMeeting] =useState(false)

    function addMeetingHandler(){
        setLoadingMeeting(true)
        let newMeetingDate ={
            title : titleInput.current.value,
            date : dateInput.current.value,
            type : typeInput.current.value,
            desc : descInput.current.value,
        }
        console.log(newMeetingDate)
        fetch('https://sureyy-projects-default-rtdb.firebaseio.com/meetings.json',{
            method : 'post',
            body : JSON.stringify(newMeetingDate)
        }).then(()=>{
            setLoadingMeeting(false);
            navigate('/')
        })  
    }




    return(
        <>
            <section>
                <div className="w-[400px] mx-auto mt-8">
                    <h1 className="text-3xl font-black">Add New Meetings</h1>
                    <div className="desc text-sm mt-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore psperiores, libero rerum possimus!</div>
                    <div class="w-full mx-auto my-6">
                        <input type="text" ref={titleInput} placeholder="Title" class="flex w-full h-10 px-3 py-6 text-sm bg-white border rounded-lg border-neutral-300 ring-offset-background placeholder:text-neutral-500 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50" />
                    </div>
                    <div class="w-full mx-auto my-6">
                        <input type="datetime-local" ref={dateInput} placeholder="Date" class="flex w-full h-10 px-3 py-6 text-sm bg-white border rounded-lg border-neutral-300 ring-offset-background placeholder:text-neutral-500 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50" />
                    </div>
                    <div class="w-full mx-auto my-6">
                        <input type="text" ref={typeInput} placeholder="Topic (i.e Dev, Operations, Marketing... )" class="flex w-full h-10 px-3 py-6 text-sm bg-white border rounded-lg border-neutral-300 ring-offset-background placeholder:text-neutral-500 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50" />
                    </div>
                    <div class="w-full mx-auto my-6">
                        <input type="text" ref={descInput} placeholder="Desc" class="flex w-full h-10 px-3 py-6 text-sm bg-white border rounded-lg border-neutral-300 ring-offset-background placeholder:text-neutral-500 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50" />
                    </div>
                    <button onClick={addMeetingHandler} className="btn bg-black font-bold text-white py-3 px-4 flex items-center gap-4 rounded-md"><span>Create Meeting</span> <span className={loadingMeeting ? "loader" : "" }></span></button>
                </div>
            </section>
        </>
        
    )
}