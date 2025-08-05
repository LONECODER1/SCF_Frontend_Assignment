import { useState, useEffect } from 'react';
import SignUpCard from '../components/SignUpCard';
function SignUp() {

  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const colors = ['#E74C3C', '#FF6B9D', '#9B59B6', '#EEEEEE'];

  useEffect(() => {
    const particleArray = [];
    for (let i = 0; i < 100; i++) {
      particleArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 3,
        delay: Math.random() * 8,
        duration: Math.random() * 3 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setParticles(particleArray);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#222831]">
      {/* particles animation */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-float opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
              transition: 'transform 0.3s ease-out',
              boxShadow: `0 0 5px ${particle.color}30`,
            }}
          />
        ))}
      </div>
      <div>
        <SignUpCard />
      </div>
    </div>
  );
}

export default SignUp;
