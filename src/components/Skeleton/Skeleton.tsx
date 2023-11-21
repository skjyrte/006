import "./Skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function EntryLoader() {
  return (
    <div className="entry-loader entry-loader-box">
      <SkeletonTheme
        baseColor="hsl(233, 14%, 35%)"
        highlightColor="hsl(234, 11%, 52%)"
      >
        <div className="entry-loader entry-loader-checkbox">
          <Skeleton
            circle={true}
            width={25}
            height={25}
            duration={2.25}
            enableAnimation={false}
          />
        </div>
        <div className="entry-loader entry-loader-content">
          <Skeleton count={2} height={10} duration={2.25} />
        </div>
        <div className="entry-loader entry-loader-edit-button">
          <Skeleton
            width={30}
            height={20}
            duration={2.25}
            enableAnimation={false}
          />
        </div>
        <div className="entry-loader entry-loader-delete-button">
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
}
