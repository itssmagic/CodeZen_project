import React from "react";
import { useUser } from "../context/UserContext";
import SubmissionsPage from "./Submissions";

const UserProfile = () => {
    const {user}=useUser()
  return (
    <div className="px-8 max-w-7xl mx-auto">
        
      <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 px-10 mt-4">My Profile</h1>
        <div className="px-9 pt-4 flex-auto min-h-[70px] pb-0 bg-transparent">
          <div className="flex flex-wrap mb-6 px-12 xl:flex-nowrap">
            <div className="mb-5 mr-5">
              <div className="relative inline-block shrink-0 rounded-2xl">
                <div className=" shrink-0 rounded-full flex  w-[80px] h-[80px] lg:w-[160px] lg:h-[160px] bg-slate-400 uppercase items-center justify-center text-7xl">{user?.username[0]}</div>
                <div className="group/tooltip relative">
                  <span className="w-6 h-6 absolute bg-primary-600 rounded-full bottom-5 right-5 end-0 -mb-1 -mr-2  border border-white"></span>
                  <span className="text-xs absolute z-10 transition-opacity duration-300 ease-in-out px-3 py-2 whitespace-nowrap text-center transform bg-white rounded-2xl shadow-sm bottom-0 -mb-2 start-full ml-4 font-medium text-secondary-inverse group-hover/tooltip:opacity-100 opacity-0 block">
                    {" "}
                    Status: Active{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="grow">
              <div className="flex flex-col flex-wrap items-start justify-between mb-2">
                <div className="flex flex-col justify-center mt-10">
                  <div className="flex items-center mb-2">
                    <a
                      className="text-secondary-inverse hover:text-primary transition-colors duration-200 ease-in-out font-semibold text-[1.5rem] mr-1"
                      href="javascript:void(0)"
                    >
                      {user?.username}
                    </a>
                  </div>
                  <div className="flex flex-wrap pr-2 mb-4 font-medium">
                 
                    <a
                      className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary"
                      href="javascript:void(0)"
                    >
                      <span className="mr-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                        </svg>
                      </span>{" "}
                      {user?.email}
                    </a>
                  </div>
                </div>
               
              </div>
             
            </div>
            
          </div>
         
                <SubmissionsPage/>
              
          <hr className="w-full h-px border-neutral-200" />
          
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
