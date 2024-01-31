import React, { useState, useEffect } from 'react';
import StickyNote from './components/StickyNote';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/members")
      .then(res => res.json())
      .then(data => {
        setData(data)
        console.log(data.members)
      });
  }, [])

  return (
    <div>
     {(typeof data.members == 'undefined') ? (
        <p>Loading...</p>
      ) : (
        data.members.map((member, i) => (
          <p key={i}>{member}</p>
        ))
      )}
    </div>
  );
}

export default App;
