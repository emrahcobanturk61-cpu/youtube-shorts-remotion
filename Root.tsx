import React from "react";
import { Composition } from "remotion";
import { EgitimVideo } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="EgitimVideoShorts"
        component={EgitimVideo}
        durationInFrames={450} // 15 seconds at 30 FPS - Shorts optimal
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
