import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/Logotipo - Copia.png";
import { OrbitChat } from "@/components/OrbitChat";
import { AcompanhamentoProcessos } from "@/components/AcompanhamentoProcessos";
import { CustomCursor } from "@/components/CustomCursor";
import { NetworkBackground } from "@/components/NetworkBackground";
import { useState, useEffect, useRef } from "react";
import { Menu, X, HeartHandshake, Bird, GraduationCap, Building2, MessageCircle, Mail, Building, MessageSquare, Lightbulb, User as UserIcon, LayoutDashboard } from "lucide-react";

import imgGabrielMedici from "@/assets/gabrielmedici.png";
import imgGabrielFagundes from "@/assets/gabrielfagundes.png";
import imgGeraldo from "@/assets/geraldo.png";
import imgJemerson from "@/assets/jemerson.png";
import imgJoaoAugusto from "@/assets/joaoaugusto.png";
import imgJoaoPedro from "@/assets/joaopedro.png";
import imgLarissaFrez from "@/assets/larissafrez.png";
import imgLauraAndrade from "@/assets/lauraandrade.png";
import imgLauraMel from "@/assets/lauramel2.jpeg";
import imgMariaAparecida from "@/assets/mariaaprecida.png";
import imgMariaCristina from "@/assets/mariacristina.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Médici & Frez Sociedade de Advogados" },
      {
        name: "description",
        content:
          "Médici & Frez — Advocacia e consultoria jurídica especializada em Direito Civil, Família e Sucessões. Atendimento humanizado em Maringá - PR.",
      },
      { property: "og:title", content: "Médici & Frez Sociedade de Advogados" },
      {
        property: "og:description",
        content: "Organização jurídica especializada e humanizada.",
      },
    ],
  }),
  component: Home,
});

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Áreas de Atuação", href: "#areas" },
  { label: "Equipe", href: "#equipe" },
];

/**
 * Highlight — wraps text with a gold marker sweep animation.
 * Triggered once when the element scrolls into view.
 */
function Highlight({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setOn(true); obs.disconnect(); }
      },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className="highlight-sweep"
      data-on={on}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </span>
  );
}

function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          if (glowRef.current) {
            glowRef.current.style.setProperty("--gx", `${posRef.current.x}px`);
            glowRef.current.style.setProperty("--gy", `${posRef.current.y}px`);
          }
          rafRef.current = null;
        });
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="mouse-glow"
    />
  );
}

function Home() {
  const [showPartnerLogin, setShowPartnerLogin] = useState(false);

  useEffect(() => {
    const handler = () => setShowPartnerLogin(true);
    window.addEventListener("partner:open", handler);
    return () => window.removeEventListener("partner:open", handler);
  }, []);

  return (
    <div className="min-h-screen text-white relative bg-[#0F172A]">
      <CustomCursor />
      <MouseGlow />
      <NetworkBackground />
      <Header />
      <main>
        <Hero />
        <QuemSomos />
        <AreasAtuacao />
        <FuncaoSocial />
        <ModeloHibrido />
        <TeamSection />
      </main>
      <Footer />
      <OrbitChat />

      {showPartnerLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-6xl bg-[#0F172A] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="absolute top-4 right-4 z-50">
              <button 
                onClick={() => setShowPartnerLogin(false)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[85vh] overflow-y-auto w-full">
              <AcompanhamentoProcessos />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Eyebrow({ children, center = false, className = "text-white/60" }: { children: React.ReactNode; center?: boolean; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] ${className}`}
    >
      <span aria-hidden className="h-px w-8 bg-gold" />
      {children}
      {center && <span aria-hidden className="h-px w-8 bg-gold" />}
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-[#0F172A]/80 overflow-visible shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b border-white/10 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8 py-2">
        <a href="#home" className="flex items-center gap-3">
          {/* Logo */}
          <img
            src={logo}
            alt="Médici &amp; Frez Sociedade de Advogados"
            className="w-auto object-contain cursor-pointer shrink-0 select-none brightness-0 invert opacity-90"
            style={{
              height: "clamp(56px, 8vw, 88px)",
              filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))",
            }}
          />
        </a>
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-gold cursor-pointer min-h-[44px] inline-flex items-center"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contato"
          className="hidden md:inline-flex items-center justify-center border-b border-gold/70 pb-1 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:text-gold cursor-pointer min-h-[44px]"
        >
          Contato
        </a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="md:hidden inline-flex h-11 w-11 min-h-[44px] items-center justify-center rounded-md text-white transition-colors hover:bg-white/5 cursor-pointer"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0F172A]/95 backdrop-blur-xl shadow-lg">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="min-h-[44px] flex items-center text-sm font-medium text-white/80 transition-colors hover:text-gold cursor-pointer border-b border-white/5 last:border-b-0"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setOpen(false)}
              className="mt-2 min-h-[44px] flex items-center text-xs font-semibold uppercase tracking-[0.22em] text-gold cursor-pointer"
            >
              Contato →
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative bg-[#0F172A] overflow-hidden">
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 md:gap-12 px-4 md:px-8 py-12 md:py-20 lg:grid-cols-2">
        <div className="space-y-10">
          <Eyebrow className="text-white/60">Sociedade de Advogados</Eyebrow>
          <h1 className="font-serif text-5xl font-normal leading-[1.08] text-white md:text-6xl lg:text-[4.5rem]">
            Organização jurídica <span className="italic">especializada</span>{" "}
            <Highlight delay={400}>e humanizada</Highlight>
          </h1>
          <p className="max-w-xl text-lg font-light leading-relaxed text-white/70">
            Unimos rigor técnico e escuta atenta para conduzir cada caso com
            estratégia, clareza e profundo respeito por quem confia a nós suas
            questões mais importantes.
          </p>
          <div className="flex flex-wrap items-center gap-8 pt-4">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("orbit:open"))}
              className="group inline-flex items-center justify-center rounded-sm px-8 py-4 text-xs font-medium uppercase tracking-[0.22em] text-navy transition-all hover:-translate-y-0.5 cursor-pointer bg-gold shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(197,160,89,0.5)]"
            >
              Fale com um Especialista
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
            <a
              href="#quem-somos"
              className="text-xs font-medium uppercase tracking-[0.22em] text-white/70 underline-offset-[6px] decoration-gold/60 hover:text-gold hover:underline"
            >
              Conheça o escritório
            </a>
          </div>
        </div>
        <div className="relative flex w-full flex-col items-center justify-center gap-8 mt-12 lg:mt-0">
          {/* Logo Restaurada Acima dos Cards */}
          <img
            src={logo}
            alt="Emblema Médici & Frez"
            className="relative z-11 w-[70%] max-w-[420px] logo-float brightness-0 invert opacity-90"
            style={{ filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.2))" }}
          />

          {/* Grid de Cards Movido para Baixo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {/* Card 1: Família */}
            <div
              onClick={() => window.dispatchEvent(new CustomEvent("orbit:open"))}
              className="group flex w-full flex-col rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-gold/30"
            >
              <div className="flex items-center gap-3">
                <span className="text-gold text-lg">✦</span>
                <h3 className="font-serif text-xl text-white">Família</h3>
              </div>
              <p className="mt-2 text-xs font-light leading-relaxed text-white/60">Divórcio, Guarda e Pensão</p>
            </div>
            
            {/* Card 2: Patrimônio */}
            <div
              onClick={() => window.dispatchEvent(new CustomEvent("orbit:open"))}
              className="group flex w-full flex-col rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-gold/30"
            >
              <div className="flex items-center gap-3">
                <span className="text-gold text-lg">✦</span>
                <h3 className="font-serif text-xl text-white">Patrimônio</h3>
              </div>
              <p className="mt-2 text-xs font-light leading-relaxed text-white/60">Inventários e Bens</p>
            </div>

            {/* Card 3: INSS */}
            <div
              onClick={() => window.dispatchEvent(new CustomEvent("orbit:open"))}
              className="group flex w-full flex-col rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-gold/30"
            >
              <div className="flex items-center gap-3">
                <span className="text-gold text-lg">✦</span>
                <h3 className="font-serif text-xl text-white">INSS</h3>
              </div>
              <p className="mt-2 text-xs font-light leading-relaxed text-white/60">Previdência</p>
            </div>

            {/* Card 4: INSS - Assistência */}
            <div
              onClick={() => window.dispatchEvent(new CustomEvent("orbit:open"))}
              className="group flex w-full flex-col rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-gold/30"
            >
              <div className="flex items-center gap-3">
                <span className="text-gold text-lg">✦</span>
                <h3 className="font-serif text-xl text-white">INSS - Assistência</h3>
              </div>
              <p className="mt-2 text-xs font-light leading-relaxed text-white/60">Auxílios e Afastamentos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuemSomos() {
  return (
    <section id="quem-somos" className="relative">
      <div className="mx-auto max-w-3xl px-4 md:px-8 py-12 md:py-20 text-center">
        <Eyebrow center>Quem somos</Eyebrow>
        <h2 className="mt-6 font-serif text-4xl font-normal leading-[1.15] text-white md:text-5xl">
          Uma advocacia <span className="italic">híbrida e estruturada</span>,{" "}
          <Highlight delay={200}>construída para servir.</Highlight>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-[1.85] text-white/70">
          A Médici &amp; Frez nasce da união entre experiência consultiva e
          atuação contenciosa qualificada. Operamos em um modelo híbrido —
          presencial e digital — que combina a proximidade do atendimento
          personalizado com a eficiência de processos modernos. Cada cliente é
          conduzido por uma estrutura sólida, com método, transparência e o
          cuidado de quem entende que, por trás de cada caso, existe uma{" "}
          <Highlight delay={300}>história a ser preservada.</Highlight>
        </p>
      </div>
    </section>
  );
}

const areas = [
  {
    eyebrow: "01 — Núcleo Familiar",
    title: "Direito de Família e Sucessões",
    description:
      "Atuação cuidadosa em momentos sensíveis, com técnica e escuta para preservar relações e patrimônio.",
    items: [
      "Divórcio e Dissolução de União Estável",
      "Guarda, Convivência e Pensão Alimentícia",
      "Planejamento Sucessório e Inventários",
      "Mediação e Conciliação",
    ],
  },
  {
    eyebrow: "02 — Núcleo Previdenciário",
    title: "Direito Previdenciário",
    description:
      "Estratégia e segurança para a vida ativa e para a aposentadoria, com olhar atento à proteção do idoso.",
    items: [
      "Planejamento Previdenciário",
      "Concessão e Revisão de Benefícios",
      "Benefícios por Incapacidade e Assistenciais",
      "Gestão e Segurança Institucional para Idosos",
    ],
  },
];

function AreasAtuacao() {
  return (
    <section id="areas">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow center>Expertise</Eyebrow>
          <h2 className="mt-6 font-serif text-4xl font-normal text-white md:text-5xl">
            Nossas Áreas de <span className="italic">Atuação</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-white/65">
            Dois núcleos complementares que se conectam para oferecer soluções
            jurídicas completas ao longo da vida do cliente e de sua família.
          </p>
        </div>

        <div className="mt-10 md:mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {areas.map((area) => (
            <article
              key={area.title}
              className="group relative flex flex-col rounded-xl border border-white/10 bg-white/5 p-8 md:p-12 transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-gold/30 cursor-pointer backdrop-blur-sm"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
                {area.eyebrow}
              </span>
              <h3 className="mt-6 font-serif text-3xl font-normal text-white">
                {area.title}
              </h3>
              <p className="mt-5 text-sm font-light leading-relaxed text-white/65">
                {area.description}
              </p>
              <div className="my-9 h-px w-12 bg-gold/60" />
              <ul className="space-y-5">
                {area.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 text-[15px] font-light text-white/85"
                  >
                    <span
                      aria-hidden
                      className="mt-2.5 inline-block h-1 w-1 flex-shrink-0 rotate-45 bg-gold"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FuncaoSocial() {
  const [activeCol, setActiveCol] = useState<'left' | 'right' | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (e: React.MouseEvent) => {
    e.preventDefault();
    setToastMsg("O artigo completo será publicado em breve em nosso novo Portal de Conteúdo Jurídico.");
    setTimeout(() => setToastMsg(null), 4000);
  };

  return (
    <section className="px-4 md:px-8 py-20 md:py-32 border-t border-white/10 relative z-10 bg-[#0F172A] overflow-hidden">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#162032] border border-gold/40 shadow-[0_0_40px_rgba(197,160,89,0.2)] px-6 py-4 rounded-full flex items-center gap-3 animate-fade-in text-white w-max max-w-[90vw] text-center">
          <span className="text-gold text-lg">✦</span>
          <p className="text-xs md:text-sm font-light">{toastMsg}</p>
        </div>
      )}
      
      {/* Background interaction (abstract glow based on active column) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] rounded-full blur-[120px] md:blur-[150px] transition-all duration-1000 opacity-30 pointer-events-none"
        style={{
          background: activeCol === 'left' ? 'radial-gradient(circle, rgba(197,160,89,0.3) 0%, transparent 70%)' :
                      activeCol === 'right' ? 'radial-gradient(circle, rgba(0,104,157,0.3) 0%, transparent 70%)' :
                      'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
          transform: activeCol === 'left' ? 'translate(-80%, -50%)' : activeCol === 'right' ? 'translate(-20%, -50%)' : 'translate(-50%, -50%)'
        }}
      />

      <div className="mx-auto max-w-6xl flex flex-col items-center relative z-10">
        
        {/* Header Fixo */}
        <div className="flex flex-col items-center text-center mb-16 relative z-20">
          <div className="relative group cursor-default">
            {/* Pulsing aura */}
            <div className="absolute inset-0 rounded-full bg-gold/20 blur-xl animate-pulse scale-150" />
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-gold/40 flex items-center justify-center bg-[#0F172A] shadow-[0_0_40px_rgba(197,160,89,0.3)] z-10">
              <HeartHandshake className="w-10 h-10 md:w-12 md:h-12 text-gold drop-shadow-[0_0_8px_rgba(197,160,89,0.8)]" />
            </div>
            {/* Connecting lines growing downwards */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-gold/60 to-transparent opacity-50" />
          </div>
          <h3 className="mt-10 font-serif text-3xl font-normal uppercase tracking-widest text-white md:text-5xl leading-tight">
            Função Social<br />Da Advocacia
          </h3>
        </div>

        {/* Dynamic Panel */}
        <div className="w-full flex flex-col lg:flex-row gap-6 relative">
          
          {/* Coluna 1: Esquerda */}
          <div 
            className={`group relative flex flex-col bg-[#162032]/80 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${activeCol === 'left' ? 'lg:flex-[1.4] shadow-[0_0_50px_rgba(197,160,89,0.15)] border-gold/40' : activeCol === 'right' ? 'lg:flex-[0.6] opacity-60' : 'lg:flex-1'}`}
            onMouseEnter={() => setActiveCol('left')}
            onMouseLeave={() => setActiveCol(null)}
          >
            {/* ODS 16 Integration at top of card */}
            <div className="absolute top-6 right-6 flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity duration-500 z-0">
               <div className={`w-12 h-12 bg-[#00689D] flex items-center justify-center rounded-sm transition-all duration-500 ${activeCol === 'left' ? 'shadow-[0_0_20px_rgba(0,104,157,0.6)] scale-110' : ''}`}>
                 <span className="font-bold text-white text-xl">16</span>
               </div>
               {activeCol === 'left' && <span className="text-[8px] text-white/70 uppercase mt-2 text-right tracking-widest font-bold">Paz e Justiça</span>}
            </div>

            <div className="p-8 md:p-12 flex flex-col h-full z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-xl transition-all duration-500 ${activeCol === 'left' ? 'bg-gold/20 shadow-[0_0_20px_rgba(197,160,89,0.4)]' : 'bg-white/5'}`}>
                  <UserIcon className={`w-6 h-6 md:w-8 md:h-8 transition-colors duration-500 ${activeCol === 'left' ? 'text-gold' : 'text-white/50'}`} />
                </div>
                <h4 className="font-serif text-xl md:text-2xl text-white tracking-wide">Compromisso Institucional</h4>
              </div>

              {/* Text states */}
              <div className="relative flex-1">
                <div className={`transition-all duration-500 ${activeCol === 'left' ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'}`}>
                   <p className="text-base md:text-lg font-light text-white/80 leading-relaxed">
                     Pacificação e Respeito aos Direitos Fundamentais
                   </p>
                </div>
                
                <div className={`transition-all duration-700 delay-100 ${activeCol === 'left' ? 'opacity-100 translate-y-0 h-auto' : 'opacity-0 translate-y-4 h-0 overflow-hidden'}`}>
                  <p className="text-sm md:text-base font-light text-white/70 leading-relaxed mb-8">
                    Acreditamos na função social do Direito como instrumento de pacificação. Nossa conduta é pautada pelo respeito aos direitos fundamentais e pela promoção da dignidade da pessoa humana nas relações sociais.
                  </p>
                  
                  {/* Mini-infográfico dinâmico (abstrato e sóbrio) */}
                  <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-gold/30 flex items-center justify-center relative">
                        <div className="absolute inset-0 border-2 border-gold rounded-full border-t-transparent animate-spin" style={{animationDuration: '3s'}} />
                        <span className="text-gold font-bold text-base md:text-lg">∞</span>
                      </div>
                      <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/50 text-center">Continuidade<br/>Ética</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-blue-500/30 flex items-center justify-center relative">
                        <div className="absolute inset-2 bg-blue-500/20 rounded-full animate-pulse" />
                        <Bird className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                      </div>
                      <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/50 text-center">Promoção da<br/>Paz Social</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center">
                        <div className="flex gap-1 md:gap-1.5 items-end h-6">
                          <div className="w-1 bg-gold rounded-t-sm animate-pulse" style={{height: '40%', animationDelay: '0ms'}}/>
                          <div className="w-1 bg-gold rounded-t-sm animate-pulse" style={{height: '70%', animationDelay: '200ms'}}/>
                          <div className="w-1 bg-gold rounded-t-sm animate-pulse" style={{height: '100%', animationDelay: '400ms'}}/>
                        </div>
                      </div>
                      <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/50 text-center">Impacto<br/>Relevante</span>
                    </div>
                  </div>

                  <button onClick={showToast} className="inline-flex items-center gap-2 text-[10px] md:text-xs font-semibold uppercase tracking-widest text-gold hover:text-white transition-colors cursor-pointer">
                    Saber mais sobre o compromisso <span className="text-sm">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 2: Direita */}
          <div 
            className={`group relative flex flex-col bg-[#162032]/80 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${activeCol === 'right' ? 'lg:flex-[1.4] shadow-[0_0_50px_rgba(197,160,89,0.15)] border-gold/40' : activeCol === 'left' ? 'lg:flex-[0.6] opacity-60' : 'lg:flex-1'}`}
            onMouseEnter={() => setActiveCol('right')}
            onMouseLeave={() => setActiveCol(null)}
          >
            {/* Mão Amiga Integration at top of card */}
            <div className="absolute top-6 right-6 flex flex-col items-end opacity-30 group-hover:opacity-100 transition-opacity duration-500 z-0">
               <div className={`w-12 h-12 flex items-center justify-center rounded-sm transition-all duration-500 ${activeCol === 'right' ? 'shadow-[0_0_30px_rgba(197,160,89,0.2)] scale-110' : ''}`}>
                 <HeartHandshake className="w-8 h-8 md:w-10 md:h-10 text-gold drop-shadow-[0_0_8px_rgba(197,160,89,0.5)]" />
               </div>
               {activeCol === 'right' && <span className="text-[8px] text-white/70 uppercase mt-2 text-right tracking-widest font-bold">Apoio Mútuo</span>}
            </div>

            <div className="p-8 md:p-12 flex flex-col h-full z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-xl transition-all duration-500 ${activeCol === 'right' ? 'bg-gold/20 shadow-[0_0_20px_rgba(197,160,89,0.4)]' : 'bg-white/5'}`}>
                  <GraduationCap className={`w-6 h-6 md:w-8 md:h-8 transition-colors duration-500 ${activeCol === 'right' ? 'text-gold' : 'text-white/50'}`} />
                </div>
                <h4 className="font-serif text-xl md:text-2xl text-white tracking-wide">Difusão Jurídica</h4>
              </div>

              {/* Text states */}
              <div className="relative flex-1">
                <div className={`transition-all duration-500 ${activeCol === 'right' ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'}`}>
                   <p className="text-base md:text-lg font-light text-white/80 leading-relaxed">
                     Disseminação de Conteúdo Acadêmico para a Sociedade
                   </p>
                </div>
                
                <div className={`transition-all duration-700 delay-100 ${activeCol === 'right' ? 'opacity-100 translate-y-0 h-auto' : 'opacity-0 translate-y-4 h-0 overflow-hidden'}`}>
                  <p className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-gold mb-2">Nosso Propósito</p>
                  <p className="text-sm md:text-base font-light text-white/70 leading-relaxed mb-8">
                    Fomentamos a disseminação de informações por meio de estudos e conteúdo acadêmico, contribuindo estritamente para o aprimoramento da classe e para o conhecimento jurídico da sociedade.
                  </p>
                  
                  {/* Feed visual de tópicos */}
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                     {[
                       { title: "Direito Digital", subtitle: "Evolução e Prática" },
                       { title: "LGPD no Judiciário", subtitle: "Análise de Casos" },
                       { title: "Holding Familiar", subtitle: "Planejamento Sucessório" }
                     ].map((article, i) => (
                       <div key={i} className="min-w-[160px] md:min-w-[180px] bg-[#0F172A] border border-white/5 p-4 md:p-5 rounded-xl hover:border-gold/30 transition-colors cursor-pointer group/article snap-start flex flex-col">
                         <h5 className="font-bold text-white text-xs md:text-sm mb-1">{article.title}</h5>
                         <p className="text-[9px] md:text-[10px] text-white/50 uppercase tracking-wider mb-4 flex-1">{article.subtitle}</p>
                         <button onClick={showToast} className="text-[9px] md:text-[10px] font-semibold text-gold uppercase tracking-widest group-hover/article:text-white transition-colors flex items-center gap-1 mt-auto cursor-pointer">
                           Ler Artigo <span className="opacity-0 group-hover/article:opacity-100 group-hover/article:translate-x-1 transition-all">→</span>
                         </button>
                       </div>
                     ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function ModeloHibrido() {
  return (
    <section className="px-4 md:px-8 py-16 md:py-24 border-t border-white/10 relative z-10 bg-[#0F172A]">
      <div className="mx-auto max-w-4xl flex flex-col items-center text-center">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full border-2 border-gold/40 flex items-center justify-center mb-8 bg-white/5 shadow-[0_0_30px_rgba(197,160,89,0.15)]">
          <MessageCircle className="w-10 h-10 text-gold" />
        </div>
        <h3 className="font-serif text-3xl font-normal uppercase tracking-widest text-white md:text-5xl leading-tight">
          Atendimento 100% digital<br />ou presencial,<br />conforme sua necessidade
        </h3>
        <p className="mx-auto mt-8 max-w-2xl text-lg font-light leading-relaxed text-white/70">
          Nossa infraestrutura foi desenhada para romper barreiras geográficas sem perder a pessoalidade. Garantimos que a comunicação flua com agilidade, permitindo o direcionamento imediato para um advogado especialista capaz de compreender a sua demanda.
        </p>
        
        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
           {/* Card Digital */}
           <div className="flex flex-col items-center bg-white/5 p-10 rounded-2xl border border-white/10 backdrop-blur-sm transition-all hover:-translate-y-2 hover:border-gold/30 hover:bg-white/10">
             <div className="w-20 h-20 mb-6 bg-gold/10 rounded-full flex items-center justify-center shadow-inner">
               <MessageSquare className="w-8 h-8 text-gold" />
             </div>
             <h4 className="font-bold text-xl text-white mb-3 tracking-wide uppercase">Conexão Digital</h4>
             <p className="text-sm font-light text-white/60 leading-relaxed text-center mb-8">
               Triagem automatizada que identifica com precisão a área de atuação necessária, assegurando que o seu primeiro contato seja feito diretamente pelo especialista responsável.
             </p>
             <button onClick={() => window.dispatchEvent(new CustomEvent("orbit:open"))} className="mt-auto px-6 py-3 border border-gold/50 rounded-full text-xs font-semibold uppercase tracking-widest text-gold hover:bg-gold hover:text-navy transition-colors cursor-pointer w-full max-w-[240px]">
               Fale Conosco
             </button>
           </div>

           {/* Card Presencial */}
           <div className="flex flex-col items-center bg-white/5 p-10 rounded-2xl border border-white/10 backdrop-blur-sm transition-all hover:-translate-y-2 hover:border-gold/30 hover:bg-white/10">
             <div className="w-20 h-20 mb-6 bg-gold/10 rounded-full flex items-center justify-center shadow-inner">
               <Building2 className="w-8 h-8 text-gold" />
             </div>
             <h4 className="font-bold text-xl text-white mb-3 tracking-wide uppercase">Estrutura Física</h4>
             <p className="text-sm font-light text-white/60 leading-relaxed text-center mb-8">
               Sede moderna localizada no Centro Empresarial Phenom, projetada com discrição e sobriedade para garantir o absoluto sigilo e conforto em suas reuniões estratégicas.
             </p>
             <a href="https://www.google.com/maps/dir//Phenom+Parque+Empresarial,+Av.+Carneiro+Le%C3%A3o,+500+-+Zona+01,+Maring%C3%A1+-+PR,+87014-010/@-23.4030571,-51.9262769,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x94ecd7905bd78327:0xb6d1e8ca625a9909!2m2!1d-51.9477224!2d-23.4196462?hl=pt-BR&entry=ttu&g_ep=EgoyMDI2MDUzMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center justify-center px-6 py-3 border border-white/20 rounded-full text-xs font-semibold uppercase tracking-widest text-white/70 hover:border-white hover:text-white transition-colors cursor-pointer w-full max-w-[240px]">
               Ver Endereço
             </a>
           </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Team data ──────────────────────────────────────────── */
const TEAM = [
  { name: "Gabriel Médici",   role: "Sócio Fundador",   specialty: "Gestão Previdenciária",                   initials: "GM", image: imgGabrielMedici },
  { name: "Larissa Frez",     role: "Sócia Fundadora",  specialty: "Planejamento e Aposentadorias",            initials: "LF", image: imgLarissaFrez },
  { name: "Maria Aparecida",  role: "Advogada",          specialty: "Direito Civil e Projetos Sociais",         initials: "MA", image: imgMariaAparecida },
  { name: "Gabriel Fagundes", role: "Advogado",          specialty: "Relações Externas e Prazos",              initials: "GF", image: imgGabrielFagundes },
  { name: "Laura Mel",        role: "Advogada",          specialty: "Administração Financeira Cível",           initials: "LM", image: imgLauraMel },
  { name: "Laura Andrade",    role: "Advogada",          specialty: "Demandas Patrimoniais e Inventários",      initials: "LA", image: imgLauraAndrade },
  { name: "Maria Cristina",   role: "Advogada",          specialty: "Conciliação e Mediação",                  initials: "MC", image: imgMariaCristina },
  { name: "João Augusto",     role: "Advogado",          specialty: "Contratos e Relações de Consumo",         initials: "JA", image: imgJoaoAugusto },
  { name: "Jemerson",         role: "Advogado",          specialty: "Direito de Família e Guarda",             initials: "JE", image: imgJemerson },
  { name: "Geraldo Silva",    role: "Advogado",          specialty: "Benefícios por Incapacidade e Idosos",    initials: "GS", image: imgGeraldo },
  { name: "João Pedro",       role: "Advogado",          specialty: "Acompanhamento Previdenciário",            initials: "JP", image: imgJoaoPedro },
];

type TeamMember = typeof TEAM[number] & { image?: string };

function MemberCard({ name, role, specialty, initials, image }: TeamMember) {
  return (
    <article className="team-card flex-shrink-0 w-64 md:w-72 bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl flex flex-col items-center text-center select-none overflow-hidden"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.2)", borderBottom: "2px solid rgba(197,160,89,0.55)" }}
    >
      {/* Avatar / Photo Area */}
      <div
        className="w-full h-44 flex items-center justify-center bg-white/5"
      >
        {image ? (
          <img src={image} alt={`Foto de ${name}`} className="w-full h-full object-cover" />
        ) : (
          <span
            className="font-serif text-5xl font-semibold opacity-40"
            style={{ color: "var(--gold)" }}
          >
            {initials}
          </span>
        )}
      </div>
      
      {/* Content Area */}
      <div className="flex flex-col items-center px-6 py-6 w-full">
        {/* Name */}
        <div className="font-serif text-[17px] font-semibold text-white leading-tight">{name}</div>
        {/* Role badge */}
        <div className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.28em] text-gold">{role}</div>
        {/* Divider */}
        <div className="my-4 h-px w-8 bg-gold/40" />
        {/* Specialty */}
        <p className="text-xs font-light leading-relaxed text-white/60">{specialty}</p>
      </div>
    </article>
  );
}

function TeamSection() {
  const doubled = [...TEAM, ...TEAM]; // seamless loop
  return (
    <section id="equipe" className="py-12 md:py-20 overflow-hidden">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 mb-10 text-center">
        <Eyebrow center>Nossa Equipe</Eyebrow>
        <h2 className="mt-6 font-serif text-4xl font-normal text-white md:text-5xl">
          Os profissionais por{" "}
          <span className="italic">trás do escritório</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-white/60">
          Uma equipe multidisciplinar comprometida com a excelência técnica
          e o atendimento humanizado em cada etapa do processo.
        </p>
      </div>

      {/* Gradient fade edges */}
      <div className="relative">
        <div className="team-fade-left" aria-hidden />
        <div className="team-fade-right" aria-hidden />

        {/* Marquee wrapper — pause on hover */}
        <div className="team-marquee-wrapper">
          <div className="team-marquee-track flex gap-5 w-max">
            {doubled.map((m, i) => (
              <MemberCard key={i} {...m} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      id="contato"
      className="border-t border-white/10 bg-navy text-white"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-14">
        <div className="grid gap-12 md:gap-16 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-4">
              <img
                src={logo}
                alt=""
                className="h-20 w-auto object-contain"
                style={{
                  mixBlendMode: "screen",
                  filter:
                    "drop-shadow(0 3px 6px rgba(197,160,89,0.20)) " +
                    "drop-shadow(0 1px 3px rgba(15,23,42,0.25))",
                }}
              />
              <div>
                <div className="font-serif text-xl text-white">Médici &amp; Frez</div>
                <div className="text-[10px] uppercase tracking-[0.24em] text-white/50">
                  Sociedade de Advogados
                </div>
              </div>
            </div>
            <p className="mt-8 max-w-xs text-sm font-light leading-relaxed text-white/60">
              Advocacia e consultoria jurídica — Direito Civil, Família e
              Sucessões.
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/50">
              Endereço
            </h3>
            <div className="mt-4 h-px w-8 bg-gold" />
            <p className="mt-6 text-sm font-light leading-relaxed text-white/70">
              Centro Empresarial Phenom
              <br />
              Avenida Carneiro Leão, nº 500
              <br />
              Zona 01, Maringá — PR
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/50">
              Contato
            </h3>
            <div className="mt-4 h-px w-8 bg-gold" />
            <ul className="mt-6 space-y-2 text-sm font-light text-white/70">
              <li>contato@medicifrez.adv.br</li>
              <li>+55 (44) 0000-0000</li>
              <li>Seg. à Sex. — 09h às 18h</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-xs font-light text-white/40 md:flex-row">
          <span>
            © {new Date().getFullYear()} Médici &amp; Frez Sociedade de
            Advogados. Todos os direitos reservados.
          </span>
          <div className="flex items-center gap-6">
            <span className="uppercase tracking-[0.28em] text-white/40">OAB/PR</span>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent("partner:open"))}
              className="uppercase tracking-[0.2em] text-white/60 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full transition-all flex items-center gap-2 cursor-pointer font-medium shadow-sm hover:text-white"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Login dos Sócios
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
