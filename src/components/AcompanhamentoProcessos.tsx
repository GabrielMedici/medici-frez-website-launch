import { useState } from "react";
import { Check, Clock, Circle, Search, LogOut } from "lucide-react";

type StepStatus = "done" | "current" | "pending";

type Step = {
  title: string;
  description: string;
  status: StepStatus;
};

const STEPS: Step[] = [
  {
    title: "Análise Inicial de Documentos",
    description: "Documentação recebida e validada pela equipe.",
    status: "done",
  },
  {
    title: "Protocolo do Requerimento/Ação",
    description: "Petição protocolada junto ao órgão competente.",
    status: "done",
  },
  {
    title: "Análise do Órgão Competente",
    description: "Processo em avaliação. Aguardando manifestação.",
    status: "current",
  },
  {
    title: "Decisão/Sentença",
    description: "Aguardando decisão final.",
    status: "pending",
  },
];

export function AcompanhamentoProcessos() {
  const [cpf, setCpf] = useState("");
  const [consulted, setConsulted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cpf.trim().length === 0) return;
    setConsulted(true);
  };

  const handleExit = () => {
    setConsulted(false);
    setCpf("");
  };

  return (
    <section id="cliente" className="border-b border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-5xl px-6 py-28">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-gold">
            Área do Cliente
          </span>
          <h2 className="mt-6 font-serif text-4xl text-navy md:text-5xl">
            Acompanhamento de{" "}
            <span className="text-gradient-gold italic">Processos</span>
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gold/70" />
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground">
            Transparência em cada etapa. Consulte o andamento do seu processo
            de forma simples, rápida e segura.
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-xl border border-border bg-card shadow-[0_20px_50px_-30px_oklch(0.22_0.06_260_/_0.35)]">
          <div
            aria-hidden
            className="h-1 w-full"
            style={{ background: "var(--gradient-gold)" }}
          />

          {!consulted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-6 px-6 py-14 md:px-12"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                <Search className="h-6 w-6 text-navy" />
              </div>
              <div className="text-center">
                <h3 className="font-serif text-2xl text-navy">
                  Consulta de Processo
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Informe seu CPF para visualizar o andamento.
                </p>
              </div>
              <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="Digite seu CPF (simulação)"
                  className="flex-1 rounded-md border border-border bg-background px-4 py-3 text-sm text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-gold"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md px-6 py-3 text-xs font-semibold uppercase tracking-widest text-gold-foreground transition-all hover:-translate-y-0.5"
                  style={{
                    background: "var(--gradient-gold)",
                    boxShadow: "var(--shadow-gold)",
                  }}
                >
                  Consultar
                </button>
              </div>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                Ambiente de demonstração
              </p>
            </form>
          ) : (
            <div className="px-6 py-12 md:px-12">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                    Processo nº 0001234-56.2026.8.16.0017
                  </div>
                  <h3 className="mt-2 font-serif text-2xl text-navy">
                    Andamento do Processo
                  </h3>
                </div>
                <button
                  onClick={handleExit}
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-xs font-semibold uppercase tracking-widest text-navy transition-colors hover:border-gold hover:text-gold"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sair
                </button>
              </div>

              <ol className="mt-10 space-y-2">
                {STEPS.map((step, i) => (
                  <StepRow
                    key={step.title}
                    step={step}
                    index={i}
                    isLast={i === STEPS.length - 1}
                  />
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes mf-pulse-gold {
          0%, 100% { box-shadow: 0 0 0 0 oklch(0.72 0.13 80 / 0.55); }
          50% { box-shadow: 0 0 0 10px oklch(0.72 0.13 80 / 0); }
        }
        .mf-pulse-gold { animation: mf-pulse-gold 1.8s ease-out infinite; }
      `}</style>
    </section>
  );
}

function StepRow({
  step,
  index,
  isLast,
}: {
  step: Step;
  index: number;
  isLast: boolean;
}) {
  const styles = {
    done: {
      ring: "border-emerald-500 bg-emerald-500 text-white",
      label: "text-emerald-600",
      labelText: "Concluído",
      line: "bg-emerald-500",
      icon: <Check className="h-4 w-4" />,
    },
    current: {
      ring: "border-gold bg-gold text-gold-foreground mf-pulse-gold",
      label: "text-gold",
      labelText: "Em andamento",
      line: "bg-border",
      icon: <Clock className="h-4 w-4" />,
    },
    pending: {
      ring: "border-border bg-secondary text-muted-foreground",
      label: "text-muted-foreground",
      labelText: "Pendente",
      line: "bg-border",
      icon: <Circle className="h-3.5 w-3.5" />,
    },
  }[step.status];

  return (
    <li className="relative flex gap-5 pb-8 last:pb-0">
      {!isLast && (
        <span
          aria-hidden
          className={`absolute left-[19px] top-10 h-[calc(100%-1.5rem)] w-0.5 ${styles.line}`}
        />
      )}
      <div
        className={`relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 ${styles.ring}`}
      >
        {styles.icon}
      </div>
      <div className="flex-1 pt-1.5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h4 className="font-serif text-lg text-navy">
            <span className="mr-2 text-sm text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            {step.title}
          </h4>
          <span
            className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${styles.label}`}
          >
            • {styles.labelText}
          </span>
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {step.description}
        </p>
      </div>
    </li>
  );
}