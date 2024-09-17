import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Posts from "./components/Posts";
import Update from "./components/Update";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="bg-zinc-900 h-screen w-full text-white font-serif flex  flex-col">
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/:id" element={<Update />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
