import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

const COLORS = {
  background: "#081426",
  surface: "#11233B",
  orange: "#FF922E",
  white: "#FFFFFF",
  muted: "#A8B7CC",
};

// YouTube Shorts (9:16 aspect ratio) - 1080x1920
// Shorts için tipik süre: 15-60 saniye. 30 FPS olarak 450-1800 kare.
const scenes = [
  {
    number: "01",
    title: "Fikrini Yaz",
    description: "Hayalindeki projeyi anlat.",
    accent: "FİKİR",
  },
  {
    number: "02",
    title: "Kodunu Oluştur",
    description: "Fikrini çalışan bir projeye dönüştür.",
    accent: "KOD",
  },
  {
    number: "03",
    title: "Videonu Üret",
    description: "Projenin sonucunu videoya dönüştür.",
    accent: "VİDEO",
  },
  // Shorts için ekstra bir çağrı-to-action sahnesi
  {
    number: "04",
    title: "Abone Ol",
    description: "Daha fazla ipucu için abone ol.",
    accent: "KANAL",
  },
];

const Scene: React.FC<{
  number: string;
  title: string;
  description: string;
  accent: string;
}> = ({ number, title, description, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 18,
      stiffness: 110,
      mass: 0.8,
    },
  });

  const opacity = interpolate(
    frame,
    [0, 12, 78, 90],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const titleY = interpolate(
    entrance,
    [0, 1],
    [80, 0] // Dikey format için başlangıç pozisyonu ayarlanıyor
  );

  const accentScale = spring({
    frame: frame - 8,
    fps,
    config: {
      damping: 15,
      stiffness: 120,
    },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
        opacity,
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      {/* Decorative background */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #172D49 0%, #081426 70%)",
        }}
      />

      {/* Orange decorative circle - dikey format için boyut ayarlanıyor */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          border: "1px solid rgba(255,146,46,0.15)",
          transform: `scale(${0.85 + entrance * 0.15})`,
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      />

      {/* Main content - dikey format için düzen */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
          textAlign: "center",
          padding: "20px",
        }}
      >
        {/* Step indicator */}
        <div
          style={{
            color: COLORS.orange,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 6,
            marginBottom: 24,
            opacity: accentScale,
            transform: `scale(${accentScale})`,
          }}
        >
          {number} / 04 — {accent}
        </div>

        {/* Main title - dikey format için daha büyük yazı */}
        <div
          style={{
            color: COLORS.white,
            fontSize: 80,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1.2,
            transform: `translateY(${titleY}px)`,
            opacity: entrance,
            maxWidth: "80%",
          }}
        >
          {title}
          <span style={{ color: COLORS.orange }}>.</span>
        </div>

        {/* Description */}
        <div
          style={{
            color: COLORS.muted,
            fontSize: 24,
            fontWeight: 400,
            marginTop: 20,
            opacity: interpolate(
              frame,
              [12, 30],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            ),
          }}
        >
          {description}
        </div>

        {/* Orange underline - dikey format */}
        <div
          style={{
            width: 80,
            height: 4,
            backgroundColor: COLORS.orange,
            borderRadius: 8,
            marginTop: 35,
            transform: `scaleX(${accentScale})`,
          }}
        />

        {/* Bottom progress indicator - dikey format için konum */}
        <div
          style={{
            position: "absolute",
            bottom: 50,
            display: "flex",
            gap: 8,
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {scenes.map((scene, index) => (
            <div
              key={scene.number}
              style={{
                width: index === Number(number) - 1 ? 50 : 20,
                height: 4,
                borderRadius: 8,
                backgroundColor:
                  index <= Number(number) - 1
                    ? COLORS.orange
                    : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>

        {/* Brand label - dikey format için sola kaydırıldı */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 60,
            color: COLORS.muted,
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: 2,
          }}
        >
          CREATE YOUR FUTURE
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const EgitimVideo: React.FC = () => {
  // Shorts için: 15 saniye (450 kare) ile 60 saniye (1800 kare) arasında seçebilirsiniz
  // Varsayılan: 90 saniye (2700 kare) yerine shorter süre
  const durationInFrames = 450; // 15 seconds at 30 FPS

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
      }}
    >
      {scenes.map((scene, index) => (
        <Sequence
          key={scene.number}
          from={index * 112} // Shorts için daha sık scene değişikliği
          durationInFrames={112}
        >
          <Scene {...scene} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export default EgitimVideo;