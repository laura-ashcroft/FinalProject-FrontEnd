// Material UI
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

//styling
import style from "./jobUpdates.module.css";

export default function LoadingSkeleton({ repeatValue = 1 }) {
  const skeletonArray = new Array(repeatValue).fill(repeatValue);

  return skeletonArray.map((item, index) => {
    return (
      <div
        key={`${item}${index}`}
        className={style.newJobSec}
        style={{ marginTop: 10 }}
      >
        <Skeleton
          variant="circle"
          width={60}
          height={60}
          style={{ marginRight: 10 }}
        />
        <div>
          <Skeleton animation="wave" width={250} />
          <Skeleton animation={false} width={200} />
          <Skeleton animation="wave" width={100} style={{ marginBottom: 10 }} />
        </div>
      </div>
    );
  });
}
