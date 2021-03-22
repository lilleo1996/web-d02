import React, { useState, useEffect } from 'react'

const Counter = (props) =>  {
  const [count, setCount] = useState(0)
  const [userName, setUserName] = useState('')

  // === (componentDidMOunt and componentDidUpdate)
  // === componentDidMOunt
  useEffect(() => {
    console.log('render counter')
    // Cập nhập document title sử dụng browser API
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <h2>Bạn đã bấm {count} lần</h2>
      <button onClick={() => setCount(count + 1)}>
        Bấm vào tôi
      </button>
    </div>
  );
}

export default Counter