function ToDo() {
    return (
      <main>
        <p>/ TODAY'S LIST</p>
        <h1>To-Do</h1>
        <span></span>

          {/* Add Task */}
        <form>
            <input type='text' placeholder='What needs to be done?' />
            <button type='submit'>+ ADD</button>
        </form>

        {/* filter task status */}
        <div>
            <button type='button'>ALL</button>
            <button type='button'>ACTIVE</button>
            <button type='button'>DONE</button>
        </div>

        <div>
            <ul className="list-none">
                <li><input type="checkbox" /> Read the project brief</li>
                <li><input type="checkbox" /> Set up the development environment</li>
                <li><input type="checkbox" /> Build the first component</li>
            </ul>
        </div>

        <div>
            <p>2 items left</p>
            <button>clear completed</button>
        </div>

      </main>
    );
}

export default ToDo;