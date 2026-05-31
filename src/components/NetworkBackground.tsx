import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    // Movimentação muito sutil (orgânica)
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
  }

  update(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;

    // Rebate suavemente nas bordas
    if (this.x < 0 || this.x > width) this.vx = -this.vx;
    if (this.y < 0 || this.y > height) this.vy = -this.vy;
  }
}

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let width = 0;
    let height = 0;

    let mouse = {
      x: -1000,
      y: -1000,
      radius: 180, // Raio de interação
    };

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      
      // Ajusta para densidade de pixel (Retina) para máxima qualidade
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Quantidade de partículas otimizada para mobile vs desktop
      const particleCount = width < 768 ? 40 : 90;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height));
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Dourado Premium (#C5A059) -> RGB: 197, 160, 89
      const colorRGB = "197, 160, 89";

      // 1. Desenha as linhas de conexão normais entre partículas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Conecta pontos muito próximos
          if (dist < 120) {
            ctx.beginPath();
            const opacity = 0.1 - (dist / 120) * 0.1; // Máx opacidade 10%
            ctx.strokeStyle = `rgba(${colorRGB}, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // 2. Interação Reativa Sensível com Mouse/Touch
        const dxMouse = particles[i].x - mouse.x;
        const dyMouse = particles[i].y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouse.radius) {
          ctx.beginPath();
          // Fade suave com base na distância, opacidade máx 25%
          const opacity = 0.25 - (distMouse / mouse.radius) * 0.25;
          ctx.strokeStyle = `rgba(${colorRGB}, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          
          // Efeito de atração magnética levíssima para a ponta do cursor (Luxo Corporativo)
          particles[i].x -= dxMouse * 0.005;
          particles[i].y -= dyMouse * 0.005;
        }

        // Atualiza a posição
        particles[i].update(width, height);
        
        // 3. Desenha a própria partícula
        ctx.beginPath();
        ctx.arc(particles[i].x, particles[i].y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colorRGB}, 0.25)`; // Bolinhas levemente visíveis
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw();

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Pega posição do mouse relativa ao canvas
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    const handleLeave = () => {
      // Joga o mouse pra longe instantaneamente, desfazendo a rede suavemente 
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    // Bind na window para não bloquear interações de UI com pointer-events-none no canvas
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("mouseout", handleLeave);
    window.addEventListener("touchend", handleLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseout", handleLeave);
      window.removeEventListener("touchend", handleLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-30 h-full w-full pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}
