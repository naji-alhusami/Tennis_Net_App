// "use client"
// import { ReactNode } from "react"

// export default function PatternBackground({
//   children,
//   size = 260,
//   opacity = 0.1,
// }: {
//   children: ReactNode
//   size?: number
//   opacity?: number
// }) {
//   return (
//     <div className="relative min-h-screen bg-[#fdfefe] overflow-hidden">
//       {/* Background pattern */}
//       <div
//         className="absolute inset-0 z-0 pointer-events-none"
//         style={{
//           backgroundImage: "url('/test1.png')",
//           backgroundRepeat: "repeat",
//           backgroundSize: `${size}px ${size}px`,
//           opacity,
//         }}
//       />

//       {/* Page content */}
//       <div className="relative z-10">
//         {children}
//       </div>
//     </div>
//   )
// }
