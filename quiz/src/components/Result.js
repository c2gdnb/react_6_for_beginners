export default function Result({ correct, questions, resetGame }) {
  return (
    <div className="result">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png"
        alt=""
      />
      <h2>
        Вы отгадали {correct} ответа из {questions.length}
      </h2>
      <button onClick={resetGame}>Попробовать снова</button>
    </div>
  );
}
