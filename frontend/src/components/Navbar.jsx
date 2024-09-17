import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-zinc-900 text-white text-sm flex items-center justify-between px-6">
      <ul className="flex gap-6 p-2">
        
        <li className="hover:bg-indigo-600 cursor-pointer delay-75 mt-2 p-3 px-6 rounded-md">
          <Link to="/">Create Post</Link>
        </li>

        <li className="hover:bg-indigo-600 cursor-pointer delay-75 mt-2 p-3 px-6 rounded-md">
          <Link to="/posts">All Post's</Link>
        </li>
      </ul>

      <div className="text-4xl cursor-pointer ">
        <Link to="/" className="flex gap-3 font-bold">
        <small className="text-green-600">M</small>
        <small className="text-slate-600">E</small>
        <small className="text-sky-400">R</small>
        <small className="text-green-600">N</small>
        </Link>
      </div>
      <div className="">
        <button className="p-4 rounded-md bg-sky-600 font-serif text-sm hover:bg-red-600 transition hover:delay-300 duration-300 ease-in-out">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
