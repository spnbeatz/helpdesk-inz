import {ProgressCircle} from "@heroui/react";
export function Indeterminate() {
  return (
    <ProgressCircle color="default" isIndeterminate aria-label="Loading">
      <ProgressCircle.Track>
        <ProgressCircle.TrackCircle />
        <ProgressCircle.FillCircle />
      </ProgressCircle.Track>
    </ProgressCircle>
  );
}