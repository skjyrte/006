import "./Background.css";
import { FC } from "react";

const Background: FC<{}> = () => (
  <div className="image-box">
    <picture>
      <source media="(max-width: 374px)" srcSet="./bg-mobile-dark.jpg" />
      <source media="(min-width: 375px)" srcSet="./bg-desktop-dark.jpg" />
      <img className="cover-image" src="./bg-desktop-dark.jpg" alt=""></img>
    </picture>
  </div>
);

export default Background;
