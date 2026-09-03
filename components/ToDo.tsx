function ToDo() {
    return (

      <main className="min-h-full bg-[#F4F3ED] flex flex-col items-center px-4 py-12">

        <div className="w-full max-w-xl mb-10">
        <p className="text-[#AAAAAA] text-xs tracking-widest mb-1">/ TODAY'S LIST</p>
        <h1 className="text-4xl font-bold text-[#0D0D0D] leading-none">To-Do</h1>
        <span className="w-full h-[3px] bg-[#0D0D0D] mt-4"></span>
        </div>

          {/* Add Task */}
        <form className="w-full max-w-xl mb-8 flex border-2 border-[#0D0D0D]">
            <input type='text' placeholder='What needs to be done?'
                   className="flex-1 px-4 py-3 bg-white text-[#0D0D0D] placeholder:text-[#BBB] text-base outline-none"/>
            <button type='submit'
                    className="px-5 bg-[#FFE200] text-[#0D0D0D] font-semibold text-sm tracking-wide border-l-2 border-[#0D0D0D] hover:bg-[#0D0D0D] hover:text-[#FFE200] transition-colors duration-150 cursor-pointer"
            >+ ADD</button>
        </form>

        {/* filter task status */}
        <div className="w-full max-w-xl flex mb-6 border-2 border-[#0D0D0D]">
            <button type='button' className="flex-1 py-2 text-xs tracking-widest uppercase transition-colors duration-100 cursor-pointer">ALL</button>
            <button type='button' className="flex-1 py-2 text-xs tracking-widest uppercase transition-colors duration-100 cursor-pointer">ACTIVE</button>
            <button type='button' className="flex-1 py-2 text-xs tracking-widest uppercase transition-colors duration-100 cursor-pointer">DONE</button>
        </div>

        <div className="w-full max-w-xl border-2 border-black py-12 text-center text-black text-md">
            <ul className="space-y-0 list-none">
                <li className="flex items-center gap-4 px-4 py-4 border-2 border-[#0D0D0D] bg-white group transition-colors"><input type="checkbox" className="w-5 h-5 shrink-0 border-2 border-[#0D0D0D] flex items-center justify-center transition-colors cursor-pointer"/> Read the project brief</li>
                <li className="flex items-center gap-4 px-4 py-4 border-2 border-[#0D0D0D] bg-white group transition-colors"><input type="checkbox" className="w-5 h-5 shrink-0 border-2 border-[#0D0D0D] flex items-center justify-center transition-colors cursor-pointer" /> Set up the development environment</li>
                <li className="flex items-center gap-4 px-4 py-4 border-2 border-[#0D0D0D] bg-white group transition-colors"><input type="checkbox" className="w-5 h-5 shrink-0 border-2 border-[#0D0D0D] flex items-center justify-center transition-colors cursor-pointer" /> Build the first component</li>
            </ul>
        </div>

        <div className="w-full max-w-xl mt-4 flex justify-between items-center">
            <p className="text-xs text-[#999]">2 items left</p>
            <button className="text-xs text-[#999] hover:text-[#0D0D0D] underline underline-offset-2 transition-colors cursor-pointer">clear completed</button>
        </div>

      </main>
    );
}

export default ToDo;