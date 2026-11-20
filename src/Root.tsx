import React from "react";
import { Composition } from "remotion";
import { EgitimVideo, TOTAL_DURATION } from "./Composition";
import { OrnekVideo } from "./OrnekVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="EgitimVideoShorts"
        component={EgitimVideo}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 9 saniyelik örnek video, 30 FPS = 270 kare */}
      <Composition
        id="OrnekVideo"
        component={OrnekVideo}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
