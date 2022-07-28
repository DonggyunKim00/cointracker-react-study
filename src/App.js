import { useEffect, useState } from "react";

function CoinConverter({ coinInfo }) {
  const [usd, setUsd] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const onChange = (event) => {
    setUsd(event.target.value);
  };
  const onClick = () => {
    setUsd(0);
    setDisabled((current) => !current);
  };
  console.log(coinInfo.symbol); // Why is undefined in the first coin.symbol?


  return (
    <div>
      <label htmlFor='USD'>USD</label>
      <input
        value={usd}
        id='USD'
        type='number'
        onChange={onChange}
        disabled={disabled}
      />
      <br />
      <label htmlFor='coin'>{coinInfo.symbol}</label>
      <input
        value={usd}
        id='coin'
        type='number'
        onChange={onChange}
        disabled={!disabled}
      />
      <br />
      <button onClick={onClick}>Convert</button>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [index, setIndex] = useState("select"); // 어떤코인을 식별했는지 index부여
  const [selected, setSelected] = useState([]); // 선택한 코인의 정보를 가진 배열

  const onSelect = (event) => {
    setIndex(event.target.value);
    if (index === "select") {
      setSelected([]);
    } else {
      setSelected(coins[event.target.value]);
    }
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <select value={index} onChange={onSelect}>
            <option value='select' key='select'>
              Select Coin!!
            </option>
            {coins.map((coin, idx) => (
              <option value={idx} key={idx}>
                {coin.name} {coin.symbol}: {coin.quotes.USD.price}USD
              </option>
            ))}
          </select>
          <hr />
          {index === "select" ? (
            "Please Select Coin"
          ) : (
            <CoinConverter coinInfo={selected} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
