import { useState } from "react";
import VideoRoom from "../components/VideoRoom";

const Home = () => {
    const [join, setJoin] = useState(false)
    return (
        <div className="flex flex-col justify-center items-center gap-10 h-screen">
            <button className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
                onClick={() => setJoin(true)}
            >
                Join    </button>

            {join && (
                <VideoRoom />
            )}
        </div>
    );
};

export default Home;