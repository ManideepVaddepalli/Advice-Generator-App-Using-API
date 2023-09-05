import React from "react";
import buttonLogo from "./images/icon-dice.svg";
import separatorImage from "./images/pattern-divider-mobile.svg";

export default function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [err, setErr] = React.useState("");
  let [data, setData] = React.useState({
    id: "000",
    advice: "Click the button for an advice",
  });
  const handleClick = async () => {
    let randomNum = Math.ceil(Math.random() * 224);
    setIsLoading(true);
    try {
      const adviceData = await (
        await fetch(`https://api.adviceslip.com/advice/${randomNum}`)
      ).json();
      let { slip } = adviceData;
      let { id, advice } = slip;
      setData({ id: id, advice: advice });
      console.log(slip);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="total-content">
      <div className="card-container">
        <div className="card-text-content">
          <h5>ADVICE # {data.id}</h5>
          {isLoading && <p>"Loading..."</p>}
          {!isLoading && !err && <p>"{data.advice}"</p>}
          {err && <p>{err}</p>}
          <div className="speration-img"></div>
        </div>
      </div>
      <div className="button-container">
        <button type="button" onClick={handleClick}>
          <img src={buttonLogo} />
        </button>
      </div>
    </div>
  );
}
