export default function TestPage() {
  return (
    <div className="relative min-h-screen bg-[#fdfefe] overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/test1.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "260px 260px",
          opacity: 0.1,
        }}
      />

      <div className="relative z-10 p-10 text-xl font-bold">
        Test page
      </div>
    </div>
  )
}
