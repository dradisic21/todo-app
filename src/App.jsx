import { useState } from "react";

const defaultItems = [
  {
    id: 1,
    text: "Lorem ipsum",
    done: false,
  },
  {
    id: 2,
    text: "Lorem ipsum dolor",
    done: true,
  },
];

function App() {
  const [items, setItems] = useState(defaultItems);
  const [formState, setFormState] = useState({
    text: "",
  });

  const itemComponents = items.map((item) => {
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
        {item.text}
        <button onClick={handleClick}>X</button>
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
      ...items,
      {
        id: Date.now(),
        text: formState.text,
        done: false,
      }
    ])
    setFormState({...formState, text: ''});
  }

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
      {itemComponents}
    </div>
  );
}

export default App;
