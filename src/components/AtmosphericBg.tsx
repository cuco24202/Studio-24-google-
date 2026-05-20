/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';

export default function AtmosphericBg() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frameId: number;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX - window.innerWidth / 2) * 0.05;
      targetY = (e.clientY - window.innerHeight / 2) * 0.05;
    };

    // Animation loop to interpolate coordinates for buttery 60 FPS movement
    const updatePosition = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      setCoords({ x: currentX, y: currentY });
      frameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove);
    frameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="atmospheric-bg pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
      <div 
        className="halo halo-cyan absolute rounded-full bg-halo-cyan opacity-15 filter blur-[140px] pointer-events-none transition-transform duration-100 ease-out" 
        style={{
          width: '600px',
          height: '600px',
          top: '-200px',
          right: '-100px',
          transform: `translate(${coords.x}px, ${coords.y}px)`,
        }}
      />
      <div 
        className="halo halo-purple absolute rounded-full bg-halo-purple opacity-15 filter blur-[140px] pointer-events-none transition-transform duration-100 ease-out" 
        style={{
          width: '500px',
          height: '500px',
          bottom: '-100px',
          left: '-100px',
          transform: `translate(${-coords.x}px, ${-coords.y}px)`,
        }}
      />
    </div>
  );
}
