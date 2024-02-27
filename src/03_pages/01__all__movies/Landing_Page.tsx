import "./Landing_Page.scss";
import { IoSearchSharp } from "react-icons/io5";

interface LandingProps {
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  value?: string | number | readonly string[] | undefined;
}
function LandingPage({ value, ...rest }: LandingProps) {
  return (
    <>
      <div className="main_landing_page">
        <div className="input_div">
          <IoSearchSharp />
          <input
            type="text"
            placeholder="Search Movies..."
            {...rest}
            value={value!}
          />
        </div>
      </div>
    </>
  );
}

export default LandingPage;
