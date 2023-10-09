import "./Variant.css";
export const Variant = ({color, onClick}) => {
  return (
    <div className="variant" onClick={onClick} style={{backgroundColor:color}}></div>
  )
}
