import icon from "../assets/vector.png"
import "../styles/MainSpecProductCard.css"
import { Button } from "@mui/material"

const specs = [
    { text: "i3 Processor" },
    { text: "8GB RAM" },
    { text: "1TB HDD" },
    { text: "RTX 3050" },
  ];

function SpecItem({ text }) {
    return (
      <div className="spec-item">
        <img src={icon} alt="" className="spec-icon" />
        <div className="spec-text">{text}</div>
      </div>
    );
  }

export const MainSpecProductCard = ({name, price}) => {
    return (
        <>
        <div className="product-card">
        <h2 className="product-name">{name}</h2>
        <div className="product-price">${price}</div>
        <div className="product-specs">
          {specs.map((spec, index) => (
            <SpecItem key={index} text={spec.text} />
          ))}
        </div>
        <Button variant="contained" className="buy-button">Купить</Button>
      </div>
        </>
    )
}