import { useEffect, useRef } from 'react';

const Mandala = ({ 
  patternType, 
  layers, 
  repeatsPerLayer, 
  size, 
  colorScheme,
  rotationSpeed 
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const rotationRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = size / 2;
    const centerY = size / 2;

    const drawMandala = () => {
      // Clear canvas
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);

      // Save context state
      ctx.save();
      
      // Translate to center and apply rotation
      ctx.translate(centerX, centerY);
      ctx.rotate(rotationRef.current);
      ctx.translate(-centerX, -centerY);

      // Draw each layer as a continuous path
      for (let layer = 1; layer <= layers; layer++) {
        const radius = (size / 2) * (layer / layers) * 0.9;
        const angleStep = (2 * Math.PI) / repeatsPerLayer;

        // Black stroke only
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = 'transparent';
        ctx.lineWidth = 2;

        // Start a continuous path for this layer
        ctx.beginPath();

        // Draw pattern based on type
        switch (patternType) {
          case 'circles':
            drawContinuousCircles(ctx, centerX, centerY, radius, repeatsPerLayer, angleStep);
            break;
          case 'petals':
            drawContinuousPetals(ctx, centerX, centerY, radius, repeatsPerLayer, angleStep);
            break;
          case 'stars':
            drawContinuousStars(ctx, centerX, centerY, radius, repeatsPerLayer, angleStep);
            break;
          case 'diamonds':
            drawContinuousDiamonds(ctx, centerX, centerY, radius, repeatsPerLayer, angleStep);
            break;
          case 'waves':
            drawContinuousWaves(ctx, centerX, centerY, radius, repeatsPerLayer, angleStep);
            break;
          default:
            drawContinuousCircles(ctx, centerX, centerY, radius, repeatsPerLayer, angleStep);
        }

        ctx.closePath();
        ctx.stroke();
        ctx.fill();
      }

      ctx.restore();

      // Update rotation
      rotationRef.current += rotationSpeed * 0.001;

      // Continue animation
      animationRef.current = requestAnimationFrame(drawMandala);
    };

    drawMandala();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [patternType, layers, repeatsPerLayer, size, colorScheme, rotationSpeed]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ 
        border: '2px solid #bdf7bbff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
      }}
    />
  );
};

// Helper function to get colors
const getColor = (layer, totalLayers, scheme, alpha = 1) => {
  const ratio = layer / totalLayers;
  
  const schemes = {
    rainbow: [
      `rgba(255, 0, 0, ${alpha})`,
      `rgba(255, 165, 0, ${alpha})`,
      `rgba(255, 255, 0, ${alpha})`,
      `rgba(0, 255, 0, ${alpha})`,
      `rgba(0, 127, 255, ${alpha})`,
      `rgba(139, 0, 255, ${alpha})`
    ],
    ocean: [
      `rgba(0, 105, 148, ${alpha})`,
      `rgba(0, 150, 199, ${alpha})`,
      `rgba(0, 180, 216, ${alpha})`,
      `rgba(72, 202, 228, ${alpha})`,
      `rgba(144, 224, 239, ${alpha})`
    ],
    fire: [
      `rgba(255, 0, 0, ${alpha})`,
      `rgba(255, 69, 0, ${alpha})`,
      `rgba(255, 140, 0, ${alpha})`,
      `rgba(255, 215, 0, ${alpha})`,
      `rgba(255, 255, 0, ${alpha})`
    ],
    purple: [
      `rgba(75, 0, 130, ${alpha})`,
      `rgba(123, 31, 162, ${alpha})`,
      `rgba(171, 71, 188, ${alpha})`,
      `rgba(206, 147, 216, ${alpha})`,
      `rgba(225, 190, 231, ${alpha})`
    ],
    monochrome: [
      `rgba(255, 255, 255, ${alpha})`,
      `rgba(200, 200, 200, ${alpha})`,
      `rgba(150, 150, 150, ${alpha})`,
      `rgba(100, 100, 100, ${alpha})`,
      `rgba(50, 50, 50, ${alpha})`
    ]
  };

  const colors = schemes[scheme] || schemes.rainbow;
  const index = Math.floor(ratio * (colors.length - 1));
  return colors[index];
};

// Continuous pattern drawing functions - each creates a connected path
const drawContinuousCircles = (ctx, centerX, centerY, radius, repeats, angleStep) => {
  for (let i = 0; i <= repeats; i++) {
    const angle = i * angleStep;
    const x = centerX + Math.cos(angle - Math.PI / 2) * radius;
    const y = centerY + Math.sin(angle - Math.PI / 2) * radius;
    
    if (i === 0) {
      ctx.moveTo(x + radius * 0.15, y);
    }
    ctx.arc(x, y, radius * 0.15, i * angleStep, (i + 1) * angleStep);
  }
};

const drawContinuousPetals = (ctx, centerX, centerY, radius, repeats, angleStep) => {
  for (let i = 0; i < repeats; i++) {
    const angle = i * angleStep;
    const x = centerX + Math.cos(angle - Math.PI / 2) * radius;
    const y = centerY + Math.sin(angle - Math.PI / 2) * radius;
    
    // Calculate control points for petal shape
    const petalWidth = radius * 0.15;
    const petalLength = radius * 0.3;
    
    const perpX = Math.cos(angle);
    const perpY = Math.sin(angle);
    
    if (i === 0) {
      ctx.moveTo(x - perpX * petalLength, y - perpY * petalLength);
    }
    
    // Draw petal using quadratic curves
    ctx.quadraticCurveTo(
      x + perpX * petalWidth,
      y + perpY * petalWidth,
      x + perpX * petalLength,
      y + perpY * petalLength
    );
    ctx.quadraticCurveTo(
      x - perpX * petalWidth,
      y - perpY * petalWidth,
      x - perpX * petalLength,
      y - perpY * petalLength
    );
  }
};

const drawContinuousStars = (ctx, centerX, centerY, radius, repeats, angleStep) => {
  const points = 5;
  const outerRadius = radius * 0.25;
  const innerRadius = radius * 0.12;
  
  for (let i = 0; i < repeats; i++) {
    const baseAngle = i * angleStep;
    const x = centerX + Math.cos(baseAngle - Math.PI / 2) * radius;
    const y = centerY + Math.sin(baseAngle - Math.PI / 2) * radius;
    
    for (let p = 0; p < points * 2; p++) {
      const pointAngle = baseAngle + (p * Math.PI) / points;
      const r = p % 2 === 0 ? outerRadius : innerRadius;
      const px = x + Math.cos(pointAngle - Math.PI / 2) * r;
      const py = y + Math.sin(pointAngle - Math.PI / 2) * r;
      
      if (i === 0 && p === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
  }
};

const drawContinuousDiamonds = (ctx, centerX, centerY, radius, repeats, angleStep) => {
  const size = radius * 0.25;
  
  for (let i = 0; i < repeats; i++) {
    const angle = i * angleStep;
    const x = centerX + Math.cos(angle - Math.PI / 2) * radius;
    const y = centerY + Math.sin(angle - Math.PI / 2) * radius;
    
    const perpX = Math.cos(angle);
    const perpY = Math.sin(angle);
    const tangentX = -Math.sin(angle);
    const tangentY = Math.cos(angle);
    
    if (i === 0) {
      ctx.moveTo(x - perpX * size, y - perpY * size);
    }
    
    ctx.lineTo(x + tangentX * size * 0.6, y + tangentY * size * 0.6);
    ctx.lineTo(x + perpX * size, y + perpY * size);
    ctx.lineTo(x - tangentX * size * 0.6, y - tangentY * size * 0.6);
    ctx.lineTo(x - perpX * size, y - perpY * size);
  }
};

const drawContinuousWaves = (ctx, centerX, centerY, radius, repeats, angleStep) => {
  for (let i = 0; i <= repeats; i++) {
    const angle = i * angleStep;
    const x = centerX + Math.cos(angle - Math.PI / 2) * radius;
    const y = centerY + Math.sin(angle - Math.PI / 2) * radius;
    
    const tangentX = -Math.sin(angle - Math.PI / 2);
    const tangentY = Math.cos(angle - Math.PI / 2);
    const perpX = Math.cos(angle - Math.PI / 2);
    const perpY = Math.sin(angle - Math.PI / 2);
    
    const waveWidth = radius * 0.2;
    const waveHeight = radius * 0.15;
    
    if (i === 0) {
      ctx.moveTo(x - tangentX * waveWidth + perpX * waveHeight, y - tangentY * waveWidth + perpY * waveHeight);
    }
    
    ctx.quadraticCurveTo(
      x - tangentX * waveWidth * 0.5 - perpX * waveHeight,
      y - tangentY * waveWidth * 0.5 - perpY * waveHeight,
      x + perpX * waveHeight,
      y + perpY * waveHeight
    );
    
    ctx.quadraticCurveTo(
      x + tangentX * waveWidth * 0.5 + perpX * waveHeight * 1.5,
      y + tangentY * waveWidth * 0.5 + perpY * waveHeight * 1.5,
      x + tangentX * waveWidth + perpX * waveHeight,
      y + tangentY * waveWidth + perpY * waveHeight
    );
  }
};

// Old pattern drawing functions (kept for reference, but not used)
const drawCirclePattern = (ctx, radius) => {
  ctx.beginPath();
  ctx.arc(0, radius, radius * 0.15, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
};

const drawPetalPattern = (ctx, radius) => {
  ctx.beginPath();
  ctx.ellipse(0, radius, radius * 0.15, radius * 0.3, 0, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
};

const drawStarPattern = (ctx, radius) => {
  const points = 5;
  const outerRadius = radius * 0.25;
  const innerRadius = radius * 0.12;

  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const x = Math.cos(angle) * r;
    const y = radius + Math.sin(angle) * r;
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

const drawDiamondPattern = (ctx, radius) => {
  const size = radius * 0.25;
  
  ctx.beginPath();
  ctx.moveTo(0, radius - size);
  ctx.lineTo(size * 0.6, radius);
  ctx.lineTo(0, radius + size);
  ctx.lineTo(-size * 0.6, radius);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

const drawWavePattern = (ctx, radius) => {
  ctx.beginPath();
  ctx.moveTo(-radius * 0.2, radius - radius * 0.15);
  
  ctx.quadraticCurveTo(
    -radius * 0.1, radius - radius * 0.25,
    0, radius - radius * 0.15
  );
  
  ctx.quadraticCurveTo(
    radius * 0.1, radius - radius * 0.05,
    radius * 0.2, radius - radius * 0.15
  );
  
  ctx.stroke();
};

export default Mandala;
