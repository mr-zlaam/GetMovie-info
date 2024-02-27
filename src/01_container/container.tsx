import "./container.scss";
import { type containerChildrenProps } from "@export";
function Container({ children }: containerChildrenProps) {
  return <main className="contianer">{children}</main>;
}
export default Container;
