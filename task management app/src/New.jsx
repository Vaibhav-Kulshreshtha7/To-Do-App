import React, { useEffect, useState, useRef } from "react";

const New = () => {
  const [num, setNum] = useState(0);
  const [newNum, setNewNum] = useState(100);
  useEffect(() => {
    console.log("Hello UseEffect Fun Render..");
  }, [num]);

  const refElememnt = useRef();
  const InputValue = useRef();

  function handleColor() {
    refElememnt.current.style.color = "green";
  }

  function handleFocous() {
    InputValue.current.focus();
  }

  return (
    <div>
      <h1>
        Learn UseEffect {num} {newNum}
      </h1>
      <button
        onClick={() => {
          setNum(num + 1);
        }}
      >
        Change Value +{" "}
      </button>
      <button
        onClick={() => {
          setNewNum(newNum - 1);
        }}
      >
        Update -
      </button>

      <h2 ref={refElememnt}>UseRef Hook 😍</h2>
      <button onClick={handleColor}>Color</button>

      <input type="text" name="" id="" ref={InputValue} />
      <input type="submit" value="Submit" onClick={handleFocous} />
    </div>
  );
};

export default New;
