import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  interpolate,
} from "remotion";

const COLORS = {
  background: "#081426",
  orange: "#FF922E",
  white: "#FFFFFF",
  muted: "#A8B7CC",
};

/**
 * Elimizdeki örnek videoyu (public/ornek-video.mp4) dikey Shorts
 * çerçevesi içinde gösterir. Video yatay (1920x1080) olduğu için
 * "contain" ile ortalanır, üst/alt boşluklar koyu arka planla doldurulur.
 */
export const OrnekVideo: React.FC = () => {
  const frame = useCurrentFrame();

  const captionOpacity = interpolate(frame, [0, 15, 240, 270], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #172D49 0%, #081426 70%)",
        }}
      />

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <OffthreadVideo
          src={staticFile("ornek-video.mp4")}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          textAlign: "center",
          color: COLORS.orange,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 6,
          zIndex: 3,
        }}
      >
        ÖRNEK VİDEO
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 90,
          left: 60,
          right: 60,
          textAlign: "center",
          color: COLORS.muted,
          fontSize: 26,
          lineHeight: 1.4,
          opacity: captionOpacity,
          zIndex: 3,
        }}
      >
        Kanal için hazırlanan örnek çıktı
        <div style={{ color: COLORS.white, marginTop: 10, fontWeight: 700 }}>
          youtube.com/@emrahcobanturk61-cpu
        </div>
      </div>
    </AbsoluteFill>
  );
};
