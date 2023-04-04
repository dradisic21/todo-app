import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [formState, setFormState] = useState({
    text: "",
  });
  const [sort, setSort] = useState("createAtDesc");

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const itemComponents = items
    .sort((a, b) => {
      if (sort === "createAtAsc") {
        return a.createAt - b.createAt;
      }
      return b.createAt - a.createAt;
    })
    .map((item) => {
      const handleChange = () => {
        setItems(
          items.map((newItem) => {
            if (newItem.id === item.id) {
              return { ...newItem, done: !item.done };
            }
            return newItem;
          })
        );
      };

      const handleClick = () => {
        setItems(
          items.filter((newItem) => {
            return newItem.id !== item.id;
          })
        );
      };

      return (
        <div key={item.id}>
          <input type="checkbox" checked={item.done} onChange={handleChange} />
          {item.text} ({new Date(item.createAt).toUTCString()})<button onClick={handleClick}>X</button>
        </div>
      );
    });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setItems([
      ...items, // uzimamo postojece iz state-a
      {
        id: Date.now(), /// dodajemo novi item u state
        text: formState.text,
        done: false,
        createAt: Date.now(),
      },
    ]);
    setFormState({ ...formState, text: "" });
  };
  

  return (
    <div>
      <h1>TODO APP</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="text"
          value={formState.text}
          placeholder="Enter Task"
        />
        <button type="submit">Add</button>
      </form>
      <select onChange={handleSortChange} defaultValue={sort}>
        <option value="createAtAsc">Create at (Ascending)</option>
        <option value="createAtDesc">Create at (Descending)</option>
      </select>
      {itemComponents}
    </div>
  );
}

export default App;
