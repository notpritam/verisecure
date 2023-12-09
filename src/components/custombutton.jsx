import { ShieldEllipsis } from "lucide-react";
import { Button } from "./ui/button";

function CustomButton({ type, onClickVersion, data }) {
  return (
    <>
      Test
      {type === "request" ? (
        <Button
          onClick={() => onClickVersion(data)}
          variant="outline"
          className="flex gap-2 items-center "
        >
          {/* <Eye /> */}
          <Lock />
          Request Access
        </Button>
      ) : (
        ""
      )}
      {type === "pending" ? (
        <Button
          onClick={() => onClick(data)}
          variant="outline"
          className="flex gap-2 items-center "
        >
          {/* <Eye /> */}
          <ShieldEllipsis />
          Pending Access
        </Button>
      ) : (
        ""
      )}
      {type == "viewed" ? (
        <Button
          onClick={() => onClick(data)}
          variant="outline"
          className="flex gap-2 items-center "
        >
          {/* <Eye /> */}
          {/* <ShieldEllipsis /> */}
          <View color="#262e9c" />
          Already Viewed
        </Button>
      ) : (
        ""
      )}
    </>
  );
}

export default CustomButton;
