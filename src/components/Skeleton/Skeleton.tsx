import "./Skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Entry() {
  return (
    <div className="entry-box">
      <SkeletonTheme
        baseColor="hsl(233, 14%, 35%)"
        highlightColor="hsl(234, 11%, 52%)"
      >
        <div className="general-container">
          <Skeleton
            circle={true}
            width={30}
            height={30}
            duration={2.25}
            enableAnimation={true}
          />
        </div>
        <div className="todo-content completed">
          <Skeleton count={2} height={10} duration={2.25} />
        </div>
        <div className="button-edit-container">
          <Skeleton
            width={40}
            height={20}
            duration={2.25}
            enableAnimation={true}
          />
        </div>
        <div className="button-delete-container">
          <Skeleton
            width={30}
            height={30}
            duration={2.25}
            enableAnimation={true}
          />
        </div>
      </SkeletonTheme>
    </div>
  );
}
