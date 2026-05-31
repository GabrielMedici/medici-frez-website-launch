import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/Logotipo - Copia.png";
import { OrbitChat } from "@/components/OrbitChat";
import { AcompanhamentoProcessos } from "@/components/AcompanhamentoProcessos";
import { CustomCursor } from "@/components/CustomCursor";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

import imgGabrielMedici from "@/assets/gabrielmedici.png";
import imgGeraldo from "@/assets/geraldo.png";
import imgJemerson from "@/assets/jemerson.png";
import imgJoaoPedro from "@/assets/joaopedro.png";
import imgLarissaFrez from "@/assets/larissafrez.png";
import imgLauraAndrade from "@/assets/lauraandrade.png";
import imgLauraMel from "@/assets/lauramel.png";
import imgMariaAparecida from "@/assets/mariaaprecida.png";

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
  { label: "Área do Cliente", href: "#cliente" },
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
  return (
    <div className="min-h-screen text-navy">
      <CustomCursor />
      <MouseGlow />
      <Header />
      <main>
        <Hero />
        <QuemSomos />
        <AreasAtuacao />
        <Sinergia />
        <AcompanhamentoProcessos />
        <TeamSection />
      </main>
      <Footer />
      <OrbitChat />
    </div>
  );
}

function Eyebrow({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-navy/60 ${
        center ? "" : ""
      }`}
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
    <header className="sticky top-0 z-40 bg-white/60 overflow-visible shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-white/20 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8 py-2">
        <a href="#home" className="flex items-center gap-3">
          {/* Logo estática — blend + sombra dourada, sem movimento */}
          <img
            src={logo}
            alt="Médici &amp; Frez Sociedade de Advogados"
            className="w-auto object-contain cursor-pointer shrink-0 select-none"
            style={{
              height: "clamp(56px, 8vw, 88px)",
              filter: "drop-shadow(0 2px 8px rgba(15,23,42,0.15))",
            }}
          />
        </a>
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-navy/80 transition-colors hover:text-gold cursor-pointer min-h-[44px] inline-flex items-center"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contato"
          className="hidden md:inline-flex items-center justify-center border-b border-gold/70 pb-1 text-xs font-semibold uppercase tracking-[0.22em] text-navy transition-colors hover:text-gold cursor-pointer min-h-[44px]"
        >
          Contato
        </a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="md:hidden inline-flex h-11 w-11 min-h-[44px] items-center justify-center rounded-md text-navy transition-colors hover:bg-navy/5 cursor-pointer"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-navy/10 bg-white/95 backdrop-blur-xl shadow-lg">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="min-h-[44px] flex items-center text-sm font-medium text-navy/80 transition-colors hover:text-gold cursor-pointer border-b border-navy/5 last:border-b-0"
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
    <section id="home" className="relative">
      <div className="mx-auto grid max-w-7xl items-center gap-8 md:gap-12 px-4 md:px-8 py-12 md:py-20 lg:grid-cols-2">
        <div className="space-y-10">
          <Eyebrow>Sociedade de Advogados</Eyebrow>
          <h1 className="font-serif text-5xl font-normal leading-[1.08] text-navy md:text-6xl lg:text-[4.5rem]">
            Organização jurídica <span className="italic">especializada</span>{" "}
            <Highlight delay={400}>e humanizada</Highlight>
          </h1>
          <p className="max-w-xl text-lg font-light leading-relaxed text-navy/70">
            Unimos rigor técnico e escuta atenta para conduzir cada caso com
            estratégia, clareza e profundo respeito por quem confia a nós suas
            questões mais importantes.
          </p>
          <div className="flex flex-wrap items-center gap-8 pt-4">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("orbit:open"))}
              className="group inline-flex items-center justify-center rounded-sm px-8 py-4 text-xs font-medium uppercase tracking-[0.22em] text-gold-foreground transition-all hover:-translate-y-0.5 cursor-pointer"
              style={{
                background: "var(--gradient-gold)",
                boxShadow: "var(--shadow-gold)",
              }}
            >
              Fale com um Especialista
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
            <a
              href="#quem-somos"
              className="text-xs font-medium uppercase tracking-[0.22em] text-navy/70 underline-offset-[6px] decoration-gold/60 hover:text-gold hover:underline"
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
            className="relative z-11 w-[70%] max-w-[420px] logo-float"
            style={{ filter: "drop-shadow(0 12px 24px rgba(15,23,42,0.06)) drop-shadow(0 4px 8px rgba(15,23,42,0.04))" }}
          />

          {/* Grid de Cards Movido para Baixo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {/* Card 1: Família */}
            <div
              onClick={() => window.dispatchEvent(new CustomEvent("orbit:open"))}
              className="group flex w-full flex-col rounded-xl border border-white/40 bg-white/80 p-6 shadow-xl shadow-navy/5 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/95 hover:border-gold/30"
            >
              <div className="flex items-center gap-3">
                <span className="text-gold text-lg">✦</span>
                <h3 className="font-serif text-xl text-navy">Família</h3>
              </div>
              <p className="mt-2 text-xs font-light leading-relaxed text-navy/70">Divórcio, Guarda e Pensão</p>
            </div>
            
            {/* Card 2: Patrimônio */}
            <div
              onClick={() => window.dispatchEvent(new CustomEvent("orbit:open"))}
              className="group flex w-full flex-col rounded-xl border border-white/40 bg-white/80 p-6 shadow-xl shadow-navy/5 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/95 hover:border-gold/30"
            >
              <div className="flex items-center gap-3">
                <span className="text-gold text-lg">✦</span>
                <h3 className="font-serif text-xl text-navy">Patrimônio</h3>
              </div>
              <p className="mt-2 text-xs font-light leading-relaxed text-navy/70">Inventários e Bens</p>
            </div>

            {/* Card 3: INSS */}
            <div
              onClick={() => window.dispatchEvent(new CustomEvent("orbit:open"))}
              className="group flex w-full flex-col rounded-xl border border-white/40 bg-white/80 p-6 shadow-xl shadow-navy/5 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/95 hover:border-gold/30"
            >
              <div className="flex items-center gap-3">
                <span className="text-gold text-lg">✦</span>
                <h3 className="font-serif text-xl text-navy">INSS</h3>
              </div>
              <p className="mt-2 text-xs font-light leading-relaxed text-navy/70">Aposentadorias e Revisões</p>
            </div>

            {/* Card 4: Invalidez */}
            <div
              onClick={() => window.dispatchEvent(new CustomEvent("orbit:open"))}
              className="group flex w-full flex-col rounded-xl border border-white/40 bg-white/80 p-6 shadow-xl shadow-navy/5 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/95 hover:border-gold/30"
            >
              <div className="flex items-center gap-3">
                <span className="text-gold text-lg">✦</span>
                <h3 className="font-serif text-xl text-navy">Invalidez</h3>
              </div>
              <p className="mt-2 text-xs font-light leading-relaxed text-navy/70">Auxílio-Doença e Afastamento</p>
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
        <h2 className="mt-6 font-serif text-4xl font-normal leading-[1.15] text-navy md:text-5xl">
          Uma advocacia <span className="italic">híbrida e estruturada</span>,{" "}
          <Highlight delay={200}>construída para servir.</Highlight>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-[1.85] text-navy/70">
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
          <h2 className="mt-6 font-serif text-4xl font-normal text-navy md:text-5xl">
            Nossas Áreas de <span className="italic">Atuação</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-navy/65">
            Dois núcleos complementares que se conectam para oferecer soluções
            jurídicas completas ao longo da vida do cliente e de sua família.
          </p>
        </div>

        <div className="mt-10 md:mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {areas.map((area) => (
            <article
              key={area.title}
              className="group relative flex flex-col rounded-sm bg-white p-8 md:p-12 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
                {area.eyebrow}
              </span>
              <h3 className="mt-6 font-serif text-3xl font-normal text-navy">
                {area.title}
              </h3>
              <p className="mt-5 text-sm font-light leading-relaxed text-navy/65">
                {area.description}
              </p>
              <div className="my-9 h-px w-12 bg-gold/60" />
              <ul className="space-y-5">
                {area.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 text-[15px] font-light text-navy/85"
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

function Sinergia() {
  return (
    <section className="px-4 md:px-8 py-10 md:py-16">
      <div className="mx-auto grid max-w-6xl items-start gap-16 lg:grid-cols-[1fr_2fr]">
        <div>
          <Eyebrow>Sinergia</Eyebrow>
          <h3 className="mt-8 font-serif text-3xl font-normal leading-tight text-navy md:text-4xl">
            Atuação <span className="italic">Interdisciplinar</span>
          </h3>
        </div>
        <p className="text-lg font-light leading-[1.85] text-navy/70">
          Nosso diferencial está na{" "}
          <Highlight><span className="text-gold">atuação conjunta</span></Highlight> entre as áreas.
          Demandas familiares que geram desdobramentos previdenciários — como
          inventários que envolvem pensão por morte, ou divórcios com reflexos
          em benefícios — são conduzidas de forma{" "}
          <Highlight delay={250}><span className="text-gold">centralizada</span></Highlight>, com uma única
          estratégia, um único interlocutor e total integração entre os
          núcleos.
        </p>
      </div>
    </section>
  );
}

/* ─── Team data ──────────────────────────────────────────── */
const TEAM = [
  { name: "Gabriel Médici",   role: "Sócio Fundador",   specialty: "Gestão Previdenciária",                   initials: "GM", image: imgGabrielMedici },
  { name: "Larissa Frez",     role: "Sócia Fundadora",  specialty: "Planejamento e Aposentadorias",            initials: "LF", image: imgLarissaFrez },
  { name: "Maria Aparecida",  role: "Advogada",          specialty: "Direito Civil e Projetos Sociais",         initials: "MA", image: imgMariaAparecida },
  { name: "Gabriel Fagundes", role: "Advogado",          specialty: "Relações Externas e Prazos",              initials: "GF" },
  { name: "Laura Mel",        role: "Advogada",          specialty: "Administração Financeira Cível",           initials: "LM", image: imgLauraMel },
  { name: "Laura Andrade",    role: "Advogada",          specialty: "Demandas Patrimoniais e Inventários",      initials: "LA", image: imgLauraAndrade },
  { name: "Maria Cristina",   role: "Advogada",          specialty: "Conciliação e Mediação",                  initials: "MC" },
  { name: "João Augusto",     role: "Advogado",          specialty: "Contratos e Relações de Consumo",         initials: "JA" },
  { name: "Jemerson",         role: "Advogado",          specialty: "Direito de Família e Guarda",             initials: "JE", image: imgJemerson },
  { name: "Geraldo Silva",    role: "Advogado",          specialty: "Benefícios por Incapacidade e Idosos",    initials: "GS", image: imgGeraldo },
  { name: "João Pedro",       role: "Advogado",          specialty: "Acompanhamento Previdenciário",            initials: "JP", image: imgJoaoPedro },
];

type TeamMember = typeof TEAM[number] & { image?: string };

function MemberCard({ name, role, specialty, initials, image }: TeamMember) {
  return (
    <article className="team-card flex-shrink-0 w-64 md:w-72 bg-white rounded-xl flex flex-col items-center text-center select-none overflow-hidden"
      style={{ boxShadow: "var(--shadow-soft)", borderBottom: "2px solid oklch(0.72 0.13 80 / 0.55)" }}
    >
      {/* Avatar / Photo Area */}
      <div
        className="w-full h-44 flex items-center justify-center bg-gray-100"
        style={{ background: "oklch(0.95 0.012 250)" }}
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
        <div className="font-serif text-[17px] font-semibold text-navy leading-tight">{name}</div>
        {/* Role badge */}
        <div className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.28em] text-gold">{role}</div>
        {/* Divider */}
        <div className="my-4 h-px w-8 bg-gold/40" />
        {/* Specialty */}
        <p className="text-xs font-light leading-relaxed text-navy/60">{specialty}</p>
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
        <h2 className="mt-6 font-serif text-4xl font-normal text-navy md:text-5xl">
          Os profissionais por{" "}
          <span className="italic">trás do escritório</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-navy/60">
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

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs font-light text-white/40 md:flex-row">
          <span>
            © {new Date().getFullYear()} Médici &amp; Frez Sociedade de
            Advogados. Todos os direitos reservados.
          </span>
          <span className="uppercase tracking-[0.28em] text-white/40">OAB/PR</span>
        </div>
      </div>
    </footer>
  );
}
