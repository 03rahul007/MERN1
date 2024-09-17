import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Posts = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:3000/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        // setError(`Error fetching data: ${error.message}`);
        // setTimeout(()=>{
        setError("");
        // },3000)
      }
    };
    getData();
  }, []);

  const handleOnDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/${id}`, {
      // const response = await fetch(`${window.location.origin}`, {
        
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      setSuccess("Deleted successfully");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      setError(`Error deleting post: ${error.message}`);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="mx-6">
      {error && <div className="bg-red-300 p-4 rounded-lg my-4">{error}</div>}
      {success && (
        <div className="bg-green-300 p-4 rounded-lg my-4">{success}</div>
      )}
      <h1 className="text-4xl">Posts</h1>

      {data.length > 0 ? (
        <div className="flex gap-4 flex-wrap my-4 items-center justify-center">
          {data.map(({ username, email, desc, _id }) => (
            <div key={_id} className="flex flex-col gap-4 text-white">
              <div className="flex justify-end gap-6 px-4">
                <Link to={`/${_id}`}>
                  <button onClick={() => handleOnUpdate(_id)}>Edit</button>
                </Link>
                {/* <button onClick={navigate(_id)}>Edit</button> */}
                <button
                  className="text-red-500"
                  onClick={() => handleOnDelete(_id)}
                >
                  X
                </button>
              </div>
              <div className="border p-4 min-w-[30rem] min-h-[10rem] rounded-md">
                <h2>
                  Username: <span>{username}</span>
                </h2>
                <h2>
                  Email: <span>{email}</span>
                </h2>
                <h2>
                  Description: <span>{desc}</span>
                </h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-4xl flex justify-center items-center">
          <span className="flex">No Data Available</span>
        </div>
      )}
    </div>
  );
};

export default Posts;
