import React, { useState } from "react";
import "./index.scss";
import Modal from "./Modal";

function App() {
  const [open, setOpen] = useState(false);

  const onClickOpen = (bool) => {
    setOpen(bool);
  };

  return (
    <div className="App">
      <button onClick={() => onClickOpen(true)} className="open-modal-btn">
        ✨ Открыть окно
      </button>
      <Modal open={open} onClickOpen={onClickOpen} />
    </div>
  );
}

export default App;
