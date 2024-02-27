import {} from "react";
import "./Button.scss";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
function Button({ children, ...rest }: ButtonProps) {
  return (
    <>
      <button {...rest} className={`globe__btn  ${rest.className ?? ""}`}>
        {children}
      </button>
    </>
  );
}

export default Button;
