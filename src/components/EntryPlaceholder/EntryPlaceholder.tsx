import "./EntryPlaceholder.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FC, useContext } from "react";
import classNames from "classnames";
import { ThemeContext } from "components/App";

const EntryPlaceholder: FC<{}> = () => {
  const currentTheme = useContext(ThemeContext);
  const baseColor = ((): string => {
    if (currentTheme === "dark") return "hsl(233, 14%, 35%)";
    else if (currentTheme === "light") return "hsl(236, 33%, 92%)";
    else return "hsl(0, 0%, 0%)";
  })();
  const highlightColor = ((): string => {
    if (currentTheme === "dark") return "hsl(234, 11%, 52%)";
    else if (currentTheme === "light") return "hsl(233, 11%, 84%)";
    else return "hsl(0, 0%, 0%)";
  })();

  return (
    <div className={classNames("entry-placeholder", currentTheme)}>
      <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
        <div
          className={classNames("entry-placeholder__checkbox", currentTheme)}
        >
          <Skeleton
            circle={true}
            width={25}
            height={25}
            duration={2.25}
            enableAnimation={false}
          />
        </div>
        <div
          className={classNames(
            "entry-placeholder__todo-content",
            currentTheme
          )}
        >
          <Skeleton count={2} height={10} duration={2.25} />
        </div>
        <div
          className={classNames("entry-placeholder__edit-button", currentTheme)}
        >
          <Skeleton
            width={30}
            height={20}
            duration={2.25}
            enableAnimation={false}
          />
        </div>
        <div
          className={classNames(
            "entry-placeholder__delete-button",
            currentTheme
          )}
        >
          <Skeleton
            width={20}
            height={20}
            duration={2.25}
            enableAnimation={false}
          />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default EntryPlaceholder;
