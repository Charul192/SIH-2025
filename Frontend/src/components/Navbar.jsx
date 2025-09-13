// src/components/Navbar.jsx

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-6">
        <div className="fixed flex flex-wrap justify-center top-8 inset-x-0 px-2">
          <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-slate-800 rounded-2xl px-3 py-2 '>
            <button onClick={() => setColor("White")} className='outline-none px-4 py-1 rounded-2xl text-white shadow-lg' style={{ backgroundColor: "black" }}>Home</button>
            <button onClick={() => setColor("beige")} className='outline-none px-4 py-1 rounded-2xl text-white shadow-lg' style={{ backgroundColor: "black" }}>Track</button>
            <button onClick={() => setColor("olive")} className='outline-none px-4 py-1 rounded-2xl text-white shadow-lg' style={{ backgroundColor: "black" }}>Plan</button>
            <button onClick={() => setColor("olive")} className='outline-none px-4 py-1 rounded-2xl text-white shadow-lg' style={{ backgroundColor: "black" }}>Schedule</button>
            <button onClick={() => setColor("grey")} className='outline-none px-4 py-1 rounded-2xl text-white shadow-lg' style={{ backgroundColor: "black" }}>About</button>
          </div>
        </div>
    </nav>
  );
};

export default Navbar;