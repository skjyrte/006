import "./Background.css";
import { FC, useContext } from "react";
import { ThemeContext } from "components/App";
import classNames from "classnames";

const Background: FC<{}> = () => {
  const currentTheme = useContext(ThemeContext);
  return (
    <div className={classNames("background-wrapper", currentTheme)}>
      <div className={classNames("image-box", currentTheme)}>
        {currentTheme === "light" ? (
          <LightTheme currentTheme={currentTheme} />
        ) : (
          <DarkTheme currentTheme={currentTheme} />
        )}
      </div>
    </div>
  );
};
export default Background;

const DarkTheme: FC<{ currentTheme: Nullable<string> }> = ({
  currentTheme,
}) => (
  <picture>
    <source
      media="(max-width: 374px) and (pointer:coarse)"
      srcSet="./bg-mobile-dark.jpg"
    />
    <source media="(min-width: 375px)" srcSet="./bg-desktop-dark.jpg" />
    <img
      className={classNames("cover-image", currentTheme)}
      src="./bg-desktop-dark.jpg"
      alt=""
    ></img>
  </picture>
);

const LightTheme: FC<{ currentTheme: Nullable<string> }> = ({
  currentTheme,
}) => (
  <picture>
    <source
      media="(max-width: 374px) and (pointer:coarse)"
      srcSet="./bg-mobile-light.jpg"
    />
    <source media="(min-width: 375px)" srcSet="./bg-desktop-light.jpg" />
    <img
      className={classNames("cover-image", currentTheme)}
      src="./bg-desktop-light.jpg"
      alt=""
    ></img>
  </picture>
);
