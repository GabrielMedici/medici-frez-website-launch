import { useState } from "react";
import { Check, Clock, Circle, Search, LogOut, Download, FileText, User, CalendarDays } from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type StepStatus = "done" | "current" | "pending";

type StepDetail = {
  date: string;
  responsible: string;
  parecer: string;
  hasPdf?: boolean;
};

type Step = {
  id: string;
  title: string;
  description: string;
  status: StepStatus;
  detail: StepDetail;
};

const STEPS: Step[] = [
  {
    id: "analise",
    title: "Análise Inicial de Documentos",
    description: "Documentação recebida e validada pela equipe.",
    status: "done",
    detail: {
      date: "08/05/2026",
      responsible: "Setor Cível",
      parecer: "Documentação conferida, sem pendências formais.",
    },
  },
  {
    id: "protocolo",
    title: "Protocolo do Requerimento",
    description: "Petição protocolada junto ao órgão competente.",
    status: "done",
    detail: {
      date: "15/05/2026",
      responsible: "Setor Cível",
      parecer: "Documentação autuada e encaminhada.",
      hasPdf: true,
    },
  },
  {
    id: "analise-orgao",
    title: "Análise do Órgão Competente",
    description: "Processo em avaliação. Aguardando manifestação.",
    status: "current",
    detail: {
      date: "Em andamento",
      responsible: "Vara Cível — 1ª Instância",
      parecer: "Aguardando manifestação do juízo.",
    },
  },
  {
    id: "decisao",
    title: "Decisão / Sentença",
    description: "Aguardando decisão final.",
    status: "pending",
    detail: {
      date: "A definir",
      responsible: "Juízo competente",
      parecer: "Etapa pendente.",
    },
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

  const handleDownload = () => {
    toast.success("Download seguro iniciado.", {
      description: "Arquivo salvo no dispositivo.",
    });
  };

  return (
    <section id="cliente" className="bg-background border-t border-border/40">
      <div className="mx-auto max-w-5xl px-6 py-28">
        <div className="text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold">
            Área do Cliente
          </span>
          <h2 className="mt-6 font-serif text-4xl font-normal text-navy md:text-5xl">
            Acompanhamento de <span className="italic">Processos</span>
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gold/70" />
          <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-navy/65">
            Transparência em cada etapa. Consulte o andamento do seu processo
            de forma simples, rápida e segura.
          </p>
        </div>

        <div
          className="mt-14 overflow-hidden rounded-sm bg-card border-b-[1px] border-b-gold/70 transition-shadow shadow-sm hover:shadow-md"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
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
                <p className="mt-2 text-sm text-navy/60">
                  Informe seu CPF para visualizar o andamento.
                </p>
              </div>
              <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="Digite seu CPF (simulação)"
                  className="flex-1 rounded-sm border border-border bg-background px-4 py-3 text-sm text-navy outline-none transition-colors placeholder:text-navy/40 focus:border-gold"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-sm px-6 py-3 text-xs font-semibold uppercase tracking-widest text-gold-foreground transition-all hover:-translate-y-0.5"
                  style={{
                    background: "var(--gradient-gold)",
                    boxShadow: "var(--shadow-gold)",
                  }}
                >
                  Consultar
                </button>
              </div>
              <p className="text-[11px] uppercase tracking-widest text-navy/45">
                Ambiente de demonstração
              </p>
            </form>
          ) : (
            <div className="px-6 py-12 md:px-12">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
                    Processo nº 0001234-56.2026.8.16.0017
                  </div>
                  <h3 className="mt-2 font-serif text-2xl text-navy">
                    Andamento do Processo
                  </h3>
                </div>
                <button
                  onClick={handleExit}
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2 text-xs font-semibold uppercase tracking-widest text-navy transition-colors hover:border-gold hover:text-gold"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sair
                </button>
              </div>

              <Accordion
                type="single"
                collapsible
                defaultValue="protocolo"
                className="mt-10"
              >
                {STEPS.map((step, i) => (
                  <StepAccordion
                    key={step.id}
                    step={step}
                    index={i}
                    isLast={i === STEPS.length - 1}
                    onDownload={handleDownload}
                  />
                ))}
              </Accordion>
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

function StepAccordion({
  step,
  index,
  isLast,
  onDownload,
}: {
  step: Step;
  index: number;
  isLast: boolean;
  onDownload: () => void;
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
      ring: "border-border bg-secondary text-navy/50",
      label: "text-navy/45",
      labelText: "Pendente",
      line: "bg-border",
      icon: <Circle className="h-3.5 w-3.5" />,
    },
  }[step.status];

  return (
    <div className="relative">
      {!isLast && (
        <span
          aria-hidden
          className={`absolute left-[19px] top-12 bottom-0 w-0.5 ${styles.line}`}
        />
      )}
      <AccordionItem value={step.id} className="border-b border-border/60">
        <AccordionTrigger className="hover:no-underline py-5 [&>svg]:text-navy/50">
          <div className="flex flex-1 items-center gap-5 text-left">
            <div
              className={`relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 ${styles.ring}`}
            >
              {styles.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h4 className="font-serif text-lg text-navy">
                  <span className="mr-2 text-sm text-navy/45">
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
              <p className="mt-1.5 text-sm font-light text-navy/60">
                {step.description}
              </p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="ml-[60px] mr-2 mt-2 mb-4 rounded-sm border border-border/70 border-b-[1px] border-b-gold/60 bg-background p-5">
            <div className="grid gap-4 sm:grid-cols-3">
              <DetailItem
                icon={<CalendarDays className="h-4 w-4" />}
                label="Data"
                value={step.detail.date}
              />
              <DetailItem
                icon={<User className="h-4 w-4" />}
                label="Responsável"
                value={step.detail.responsible}
              />
              <DetailItem
                icon={<FileText className="h-4 w-4" />}
                label="Parecer Técnico"
                value={step.detail.parecer}
              />
            </div>
            {step.detail.hasPdf && (
              <div className="mt-6 flex justify-end border-t border-border/60 pt-4">
                <button
                  onClick={onDownload}
                  className="inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-foreground transition-all hover:-translate-y-0.5"
                  style={{
                    background: "var(--gradient-gold)",
                    boxShadow: "var(--shadow-gold)",
                  }}
                >
                  <Download className="h-3.5 w-3.5" />
                  Baixar Cópia do Protocolo (PDF)
                </button>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-gold">
        {icon}
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">
          {label}
        </span>
      </div>
      <p className="mt-2 text-sm font-light leading-relaxed text-navy">
        {value}
      </p>
    </div>
  );
}