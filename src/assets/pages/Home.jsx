import { useState, useEffect } from "react";
import Card from "./Card";
import { Link, Route, Routes } from "react-router-dom";
export default function Home(){
   let [meetings, setMeetings] = useState([]) 
   let [filter, setFilter] = useState("") 
   let options = {weekday: 'long' , year: 'numeric' , month: 'long' , day: 'numeric'}

   useEffect(()=>{
    fetch('https://sureyy-projects-default-rtdb.firebaseio.com/meetings.json')
    .then((data)=>{
        return data.json();
    })
    .then((data)=>{
        let tempMeetings=[];
        for(let key in data ){
            let meeting = {
                id : key,
                ...data[key]
            }
            console.log(meeting)
            tempMeetings.push(meeting)
        }
        console.log(tempMeetings)
        setMeetings(tempMeetings)
    })
   },[])

    function filterDevHandler(){
    setFilter("dev")
    }
    function filterOperationsHandler(){
    setFilter("operations")
    }
    function filterMarketingHandler(){
    setFilter("marketing")
    }

    let filterMeetings = meetings;
    if(filter=='dev'){
        filterMeetings = meetings.filter(data => data.type=='dev')
    }
    else if(filter=='operations'){
        filterMeetings = meetings.filter(data => data.type=='operations')
    }
    else if(filter=='marketing'){
        filterMeetings = meetings.filter(data => data.type=='marketing')
    }
    
    return(
        <>
            <header className="pt-3">
                <nav className="w-[990px] flex justify-between mx-auto items-center mb-20">
                    <a href="" className="font-extrabold text-2xl">Zoho Meetings</a>
                    <div className="flex gap-4">
                        <Link to={'/add'}>Add Meetings</Link>
                        <Link to={'/my-meetingd'}>My Meetings</Link>
                    </div>
                </nav>
            </header>
            <section className="w-[990px] mx-auto">
                    <div className="flex gap-4">
                        <button onClick={filterDevHandler} className={filter == 'dev' ? "border border-orange-200 bg-orange-100 px-5 py-2 rounded-xl text-orange-400  font-semibold" : "border border-neutral-200 bg-neutral-100 px-5 py-2 rounded-xl  font-semibold" }>
                            Developers</button>
                            <button onClick={filterOperationsHandler} className={filter == 'operations' ? "border border-orange-200 bg-orange-100 px-5 py-2 rounded-xl text-orange-400  font-semibold" : "border border-neutral-200 bg-neutral-100 px-5 py-2 rounded-xl  font-semibold" }>
                            Operations</button>
                            <button onClick={filterMarketingHandler} className={filter == 'marketing' ? "border border-orange-200 bg-orange-100 px-5 py-2 rounded-xl text-orange-400  font-semibold" : "border border-neutral-200 bg-neutral-100 px-5 py-2 rounded-xl  font-semibold" }>
                            Marketing</button>
                    </div>
                    <div className="flex gap-5 mt-10 flex-wrap">
                    {
                        filterMeetings.length> 0 ?

                        filterMeetings.map((data)=>{
                            let date = new Date(data.date)
                            let fdate = date.toLocaleDateString('en' , options)
                            return(
                                <Card title={data.title} date={fdate} desc={data.desc}/>
                            ) 
                        })
                        :
                        <div>no meetings available</div>
                    }
                   </div>
            </section>
            
        </>
    )
}