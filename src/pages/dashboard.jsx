import { useState, useRef } from "react"

export default function App() {
  const [noClickCount, setNoClickCount] = useState(0)
  const [yesSize, setYesSize] = useState(1)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [isSuccess, setIsSuccess] = useState(false)
  const [wiggleNo, setWiggleNo] = useState(false)
  const noButtonRef = useRef(null)

  const noButtonTexts = [
    "No",
    "Are you sure? 🥺",
    "Really? 😢",
    "Please? 💔",
    "Don't do this... 😭",
    "Think again! 🙏",
    "Last chance! 💕",
    "I'm begging you! 😿",
    "Pleeease? 🥹",
    "You're breaking my heart! 💔",
    "I'll give you chocolate! 🍫",
    "Pretty please? ✨",
    "Don't leave me hanging! 😰",
    "Reconsider! 🌹",
    "You know you want to! 😏"
  ]

  const getNoButtonText = () => {
    return noButtonTexts[Math.min(noClickCount, noButtonTexts.length - 1)]
  }

  const handleNoClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    setNoClickCount((prev) => prev + 1)
    setYesSize((prev) => prev + 0.3)

    setWiggleNo(true)
    setTimeout(() => setWiggleNo(false), 500)

    const buttonWidth = 140
    const buttonHeight = 60
    const padding = 20
    const maxX = window.innerWidth - buttonWidth - padding
    const maxY = window.innerHeight - buttonHeight - padding

    setNoButtonPosition({
      x: Math.max(padding, Math.random() * maxX),
      y: Math.max(padding, Math.random() * maxY)
    })
  }

  const handleYesClick = () => {
    setIsSuccess(true)
    createHeartExplosion()
  }

  const createHeartExplosion = () => {
    const hearts = ["❤️", "💕", "💖", "💗", "💓", "💝", "💘", "💞"]
    const heartCount = window.innerWidth < 768 ? 30 : 50 // Reduce hearts on mobile

    for (let i = 0; i < heartCount; i++) {
      setTimeout(() => {
        const heart = document.createElement("div")
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)]
        heart.style.cssText = `
          position: fixed;
          left: ${Math.random() * window.innerWidth}px;
          top: ${window.innerHeight}px;
          font-size: ${Math.random() * 1.5 + 1}rem;
          pointer-events: none;
          z-index: 9999;
          will-change: transform, opacity;
          animation: float-up 3s ease-out forwards;
        `
        document.body.appendChild(heart)
        setTimeout(() => heart.remove(), 3000)
      }, i * 60) // Reduced delay for smoother effect
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
        <div className="absolute inset-0 bg-hearts-pattern opacity-10" />
        
        <div className="text-center z-10 px-4 max-w-4xl animate-fade-in">
          <div className="text-7xl sm:text-8xl md:text-9xl mb-8 animate-scale-in">💝</div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent mb-6 tracking-tight">
            Yay!!!
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
            See you on the 14th! 🌹
          </p>
          <div className="mt-12 text-5xl sm:text-6xl md:text-7xl animate-bounce-slow">😊💕✨</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-4">
      {/* Optimized background with CSS instead of multiple radial gradients */}
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      <div className="absolute inset-0 bg-hearts-pattern opacity-5" />
      
      {/* Subtle animated glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-300 rounded-full blur-3xl opacity-20 animate-pulse-slow animation-delay-1000" />

      <div className="text-center z-10 px-4 max-w-2xl w-full animate-fade-in">
        {/* Photo Display with premium border */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full blur-lg opacity-50" />
            <img
              src={`${import.meta.env.BASE_URL}sweetemoji.jpg`}
              alt="Sweet Emoji"
            />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent mb-12 leading-tight tracking-tight">
          Will you be my Valentine?
        </h1>

        <div className="relative min-h-[150px] sm:min-h-[200px] flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={handleYesClick}
            className="relative bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-full transition-all duration-300 shadow-2xl hover:shadow-pink-500/50 z-20 transform hover:scale-105"
            style={{
              padding: `${Math.min(yesSize, 2)}rem ${Math.min(yesSize * 2, 4)}rem`,
              fontSize: `${Math.min(yesSize * 1.5, 2.5)}rem`
            }}
          >
            <span className="relative z-10">Yes! 💖</span>
            <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 rounded-full transition-opacity duration-300" />
          </button>

          <button
            ref={noButtonRef}
            onClick={handleNoClick}
            onTouchStart={handleNoClick}
            className={`bg-white/80 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-gray-700 font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all touch-none select-none border border-gray-200 ${
              wiggleNo ? "animate-wiggle" : ""
            }`}
            style={{
              position: noClickCount > 0 ? "fixed" : "relative",
              left: noClickCount > 0 ? `${noButtonPosition.x}px` : "auto",
              top: noClickCount > 0 ? `${noButtonPosition.y}px` : "auto",
              zIndex: noClickCount > 0 ? 30 : "auto",
              willChange: noClickCount > 0 ? "transform" : "auto"
            }}
          >
            {getNoButtonText()}
          </button>
        </div>

        {noClickCount > 3 && (
          <p className="mt-8 text-xl sm:text-2xl md:text-3xl font-medium bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent animate-bounce-gentle">
            Notice how the Yes button is getting bigger? 🤔
          </p>
        )}
      </div>

      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-10deg) scale(1.05); }
          50% { transform: rotate(0deg) scale(1.1); }
          75% { transform: rotate(10deg) scale(1.05); }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
          }
        }

        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 1.5s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle at 30% 50%, rgba(255, 182, 193, 0.4) 0%, transparent 60%),
                      radial-gradient(circle at 70% 70%, rgba(255, 105, 180, 0.3) 0%, transparent 60%);
        }

        .bg-hearts-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 20c-5-5-15-5-15 5s15 15 15 15 15-10 15-15-10-10-15-5z' fill='%23ff69b4' fill-opacity='0.1'/%3E%3C/svg%3E");
        }

        /* Performance optimizations */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Use hardware acceleration for better performance */
        .animate-wiggle,
        .animate-bounce-slow,
        .animate-pulse-slow {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  )
}