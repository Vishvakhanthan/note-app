import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {

  const [isRateLimited, setisRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/notes");
        console.log(res.data);
        setNotes(res.data)
        setisRateLimited(false)        
      } catch (error) {
        console.error(error);
        if(error.response?.status === 429) {
            setisRateLimited(true)
        } else {
            toast.error("Failed to load notes!")
        }
      } finally {
        setIsLoading(false)
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {isLoading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length === 0 && !isRateLimited && !isLoading && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && !isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
