import "./EntryPlaceholder.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FC } from "react";

const EntryPlaceholder: FC<{}> = () => {
  return (
    <div className="entry-placeholder">
      <SkeletonTheme
        baseColor="hsl(233, 14%, 35%)"
        highlightColor="hsl(234, 11%, 52%)"
      >
        <div className="entry-placeholder__checkbox">
          <Skeleton
            circle={true}
            width={25}
            height={25}
            duration={2.25}
            enableAnimation={false}
          />
        </div>
        <div className="entry-placeholder__todo-content">
          <Skeleton count={2} height={10} duration={2.25} />
        </div>
        <div className="entry-placeholder__edit-button">
          <Skeleton
            width={30}
            height={20}
            duration={2.25}
            enableAnimation={false}
          />
        </div>
        <div className="entry-placeholder__delete-button">
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
