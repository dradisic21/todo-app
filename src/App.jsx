import { useState } from 'react'

const defaultItems = [
  {
    id: 1,
    text: 'Lorem ipsum',
    done: false,
  },
  {
    id: 1,
    text: 'Lorem ipsum dolor',
    done: true,
  }
];

function App() {
  const [items, setItems] = useState(defaultItems);

  const itemComponents = items.map(item => {
    return (
      <div key={item.id}>
        <input type="checkbox" checked={item.done}/>
        {item.text}
        </div>
    )
  })

  return (
    <div >
      <h1>TODO APP</h1>
      {itemComponents}
    </div>
  )
}

export default App
