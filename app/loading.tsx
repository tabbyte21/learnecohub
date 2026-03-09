export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      {/* Animated glow ring behind logo */}
      <div className="relative flex items-center justify-center">
        {/* Outer pulse ring */}
        <div
          className="absolute w-44 h-44 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #F5C518 0%, #1B3A7B 60%, transparent 70%)",
            animation: "loadPulse 2s ease-in-out infinite",
          }}
        />
        {/* Inner glow */}
        <div
          className="absolute w-32 h-32 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #F5C518 0%, transparent 70%)",
            animation: "loadPulse 2s ease-in-out infinite 0.3s",
          }}
        />
        {/* Logo */}
        <img
          src="/logo.png"
          alt="LearnecoHub"
          className="relative w-28 h-auto drop-shadow-sm"
          style={{
            animation: "loadBreathe 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Dot loader */}
      <div className="flex gap-1.5 mt-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              background: i === 1 ? "#F5C518" : "#1B3A7B",
              animation: `loadDot 1.4s ease-in-out ${i * 0.16}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes loadBreathe {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.06); opacity: 0.85; }
        }
        @keyframes loadPulse {
          0%, 100% { transform: scale(0.8); opacity: 0.15; }
          50% { transform: scale(1.2); opacity: 0.3; }
        }
        @keyframes loadDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
