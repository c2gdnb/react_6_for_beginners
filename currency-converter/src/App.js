import { useState, useEffect, useRef, useCallback } from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("UAH");
  const [fromPrice, setFromPrice] = useState(1);
  const [toPrice, setToPrice] = useState(0);
  const ratesRef = useRef({});

  const onChangeFromPrice = useCallback(
    (value) => {
      const price = value / ratesRef.current[fromCurrency];
      const result = price * ratesRef.current[toCurrency];

      setToPrice(parseFloat(result.toFixed(2)));
      setFromPrice(value);
    },
    [fromCurrency, toCurrency]
  );

  const onChangeToPrice = useCallback(
    (value) => {
      const result =
        (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;

      setFromPrice(parseFloat(result.toFixed(2)));
      setToPrice(value);
    },
    [fromCurrency, toCurrency]
  );

  useEffect(() => {
    fetch("https://cdn.cur.su/api/latest.json")
      .then((res) => res.json())
      .then((json) => {
        ratesRef.current = json.rates;
        onChangeFromPrice(1);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }, [onChangeFromPrice, onChangeToPrice]);

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency, fromPrice, onChangeFromPrice]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency, toPrice, onChangeToPrice]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
