import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/medici-frez-logo.jpeg";
import { OrbitChat } from "@/components/OrbitChat";
import { AcompanhamentoProcessos } from "@/components/AcompanhamentoProcessos";

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

function Home() {
  return (
    <div className="min-h-screen bg-background text-navy">
      <Header />
      <main>
        <Hero />
        <QuemSomos />
        <AreasAtuacao />
        <Sinergia />
        <AcompanhamentoProcessos />
        <PlaceholderSection
          id="equipe"
          eyebrow="Nossa Equipe"
          title="Em breve"
          description="Conheça em breve os advogados que compõem a Médici & Frez."
        />
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
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        <a href="#home" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Médici & Frez Sociedade de Advogados"
            className="h-11 w-11 rounded-full object-cover object-center"
            style={{ objectPosition: "center 30%" }}
          />
          <div className="hidden sm:block leading-tight">
            <div className="font-serif text-lg text-navy tracking-tight">
              Médici &amp; Frez
            </div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-navy/50">
              Advocacia &amp; Consultoria
            </div>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-light text-navy/75 transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contato"
          className="hidden md:inline-flex items-center justify-center border-b border-gold/70 pb-1 text-xs font-medium uppercase tracking-[0.22em] text-navy transition-colors hover:text-gold"
        >
          Contato
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-8 py-32 md:py-48 lg:grid-cols-2">
        <div className="space-y-10">
          <Eyebrow>Sociedade de Advogados</Eyebrow>
          <h1 className="font-serif text-5xl font-normal leading-[1.08] text-navy md:text-6xl lg:text-[4.5rem]">
            Organização jurídica <span className="italic">especializada</span>{" "}
            e humanizada
          </h1>
          <p className="max-w-xl text-lg font-light leading-relaxed text-navy/70">
            Unimos rigor técnico e escuta atenta para conduzir cada caso com
            estratégia, clareza e profundo respeito por quem confia a nós suas
            questões mais importantes.
          </p>
          <div className="flex flex-wrap items-center gap-8 pt-4">
            <a
              href="#contato"
              className="group inline-flex items-center justify-center rounded-sm px-8 py-4 text-xs font-medium uppercase tracking-[0.22em] text-gold-foreground transition-all hover:-translate-y-0.5"
              style={{
                background: "var(--gradient-gold)",
                boxShadow: "var(--shadow-gold)",
              }}
            >
              Fale com um Especialista
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#quem-somos"
              className="text-xs font-medium uppercase tracking-[0.22em] text-navy/70 underline-offset-[6px] decoration-gold/60 hover:text-gold hover:underline"
            >
              Conheça o escritório
            </a>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <img
            src={logo}
            alt="Emblema Médici & Frez"
            className="relative z-10 w-[68%] max-w-sm mix-blend-multiply"
          />
        </div>
      </div>
    </section>
  );
}

function QuemSomos() {
  return (
    <section id="quem-somos" className="relative bg-background">
      <div className="mx-auto max-w-3xl px-8 py-40 text-center">
        <Eyebrow center>Quem somos</Eyebrow>
        <h2 className="mt-10 font-serif text-4xl font-normal leading-[1.15] text-navy md:text-5xl">
          Uma advocacia <span className="italic">híbrida e estruturada</span>,
          construída para servir.
        </h2>
        <p className="mx-auto mt-12 max-w-2xl text-lg font-light leading-[1.85] text-navy/70">
          A Médici &amp; Frez nasce da união entre experiência consultiva e
          atuação contenciosa qualificada. Operamos em um modelo híbrido —
          presencial e digital — que combina a proximidade do atendimento
          personalizado com a eficiência de processos modernos. Cada cliente é
          conduzido por uma estrutura sólida, com método, transparência e o
          cuidado de quem entende que, por trás de cada caso, existe uma
          história a ser preservada.
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
    <section id="areas" className="bg-background">
      <div className="mx-auto max-w-7xl px-8 py-40">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow center>Expertise</Eyebrow>
          <h2 className="mt-10 font-serif text-4xl font-normal text-navy md:text-5xl">
            Nossas Áreas de <span className="italic">Atuação</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base font-light leading-relaxed text-navy/65">
            Dois núcleos complementares que se conectam para oferecer soluções
            jurídicas completas ao longo da vida do cliente e de sua família.
          </p>
        </div>

        <div className="mt-24 grid gap-10 md:grid-cols-2">
          {areas.map((area) => (
            <article
              key={area.title}
              className="group relative flex flex-col rounded-sm bg-card p-12 transition-all duration-500 hover:-translate-y-1"
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
    <section className="bg-background px-8 py-32">
      <div className="mx-auto grid max-w-6xl items-start gap-16 lg:grid-cols-[1fr_2fr]">
        <div>
          <Eyebrow>Sinergia</Eyebrow>
          <h3 className="mt-8 font-serif text-3xl font-normal leading-tight text-navy md:text-4xl">
            Atuação <span className="italic">Interdisciplinar</span>
          </h3>
        </div>
        <p className="text-lg font-light leading-[1.85] text-navy/70">
          Nosso diferencial está na{" "}
          <span className="text-gold">atuação conjunta</span> entre as áreas.
          Demandas familiares que geram desdobramentos previdenciários — como
          inventários que envolvem pensão por morte, ou divórcios com reflexos
          em benefícios — são conduzidas de forma{" "}
          <span className="text-gold">centralizada</span>, com uma única
          estratégia, um único interlocutor e total integração entre os
          núcleos.
        </p>
      </div>
    </section>
  );
}

function PlaceholderSection({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section id={id} className="bg-background">
      <div className="mx-auto max-w-7xl px-8 py-40 text-center">
        <Eyebrow center>{eyebrow}</Eyebrow>
        <h2 className="mt-10 font-serif text-4xl font-normal text-navy md:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-base font-light leading-relaxed text-navy/65">
          {description}
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      id="contato"
      className="border-t border-border/50 bg-background text-navy"
    >
      <div className="mx-auto max-w-7xl px-8 py-24">
        <div className="grid gap-16 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt=""
                className="h-11 w-11 rounded-full object-cover"
                style={{ objectPosition: "center 30%" }}
              />
              <div>
                <div className="font-serif text-xl">Médici &amp; Frez</div>
                <div className="text-[10px] uppercase tracking-[0.24em] text-navy/50">
                  Sociedade de Advogados
                </div>
              </div>
            </div>
            <p className="mt-8 max-w-xs text-sm font-light leading-relaxed text-navy/65">
              Advocacia e consultoria jurídica — Direito Civil, Família e
              Sucessões.
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.28em] text-navy/60">
              Endereço
            </h3>
            <div className="mt-4 h-px w-8 bg-gold" />
            <p className="mt-6 text-sm font-light leading-relaxed text-navy/75">
              Centro Empresarial Phenom
              <br />
              Avenida Carneiro Leão, nº 500
              <br />
              Zona 01, Maringá — PR
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.28em] text-navy/60">
              Contato
            </h3>
            <div className="mt-4 h-px w-8 bg-gold" />
            <ul className="mt-6 space-y-2 text-sm font-light text-navy/75">
              <li>contato@medicifrez.adv.br</li>
              <li>+55 (44) 0000-0000</li>
              <li>Seg. à Sex. — 09h às 18h</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-xs font-light text-navy/50 md:flex-row">
          <span>
            © {new Date().getFullYear()} Médici &amp; Frez Sociedade de
            Advogados. Todos os direitos reservados.
          </span>
          <span className="uppercase tracking-[0.28em] text-navy/50">OAB/PR</span>
        </div>
      </div>
    </footer>
  );
}
