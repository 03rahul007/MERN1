import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState("");
  const { id } = useParams();
  const navigate = useNavigate(); // useNavigate hook for navigation

  const showSingleData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ username, email, desc }),
      });

      const result = await response.json();
      setData(result);
      setName(result.username);
      setEmail(result.email);
      setDesc(result.desc);
      console.log(result);

      if (!response.ok) {
        setError(result.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred");
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();

      const response = await fetch(`http://localhost:3000/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, desc }),
      })

      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "An error occurred");
      } else {
        navigate("/posts");
    }
  };
  
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(""); // Clear the error after 3 seconds
      }, 3000);
  
      // Clear timeout if the component unmounts
      return () => clearTimeout(timer);
    }
    showSingleData();
  }, []);

  return (
    <>
      {error && (
        <span className="p-4 my-4 rounded-lg bg-red-400 text-md self-center flex">
          {error}
        </span>
      )}
      <div className="bg-zinc-900 h-screen w-full text-white font-serif flex  flex-col justify-center items-center">
        <form
          onSubmit={handleEdit}
          className="flex justify-center border border-gray-800 w-[50rem] rounded-lg p-7"
        >
          <div className="flex flex-col gap-3 items-center justify-center">
            <h1 className="text-4xl">Update a Post</h1>
            <input
              type="text"
              username="username"
              value={username}
              onChange={(e) => setName(e.target.value)}
              className="p-4 outline-none bg-transparent border rounded-md w-[40rem] border-gray-800"
              placeholder={data.username}
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-4 outline-none bg-transparent border rounded-md w-[40rem] border-gray-800"
              // placeholder={data.email}

              required
            />
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="p-4 outline-none bg-transparent border rounded-md w-[40rem] border-gray-800"
              // placeholder={data.desc}
              required
            />
            <button
              type="submit"
              className="p-4 bg-purple-800 rounded-md w-[10rem] text-white transition-transform transform hover:scale-105 hover:bg-indigo-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Update;
