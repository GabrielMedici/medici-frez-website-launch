import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, RotateCcw, Send } from "lucide-react";

type Message = { id: number; from: "bot" | "user"; text: string };
type Option = { label: string; next: string };
type Node = { question: string; options: Option[] };

const TREE: Record<string, Node> = {
  root: {
    question:
      "Olá! Sou o assistente de triagem da Médici & Frez. Qual é o tema principal da sua busca?",
    options: [
      { label: "Família", next: "familia" },
      { label: "Patrimônio", next: "patrimonio" },
      { label: "INSS", next: "inss" },
      { label: "Auxílio-Doença/Invalidez", next: "auxilio" },
    ],
  },
  familia: {
    question:
      "A demanda envolve urgência ou crianças/adolescentes menores envolvidos?",
    options: [
      { label: "Sim", next: "end:familia" },
      { label: "Não", next: "end:familia" },
    ],
  },
  patrimonio: {
    question:
      "A questão patrimonial está em fase amigável ou já existe divergência entre as partes?",
    options: [
      { label: "Amigável", next: "end:patrimonio" },
      { label: "Divergência", next: "end:patrimonio" },
    ],
  },
  inss: {
    question: "Qual o status atual do seu pedido junto ao INSS?",
    options: [
      { label: "Pedido Negado", next: "end:inss" },
      { label: "Quero Planejar", next: "end:inss" },
    ],
  },
  auxilio: {
    question: "Você já possui laudos médicos atualizados?",
    options: [
      { label: "Tenho laudos", next: "end:auxilio" },
      { label: "Vou solicitar", next: "end:auxilio" },
    ],
  },
};

const FINAL: Record<string, string> = {
  familia:
    "O Setor Cível (Dra. Maria Cristina / Dr. Jemerson) assumirá a mediação. Entraremos em contato.",
  patrimonio:
    "Sua demanda será direcionada à Dra. Laura Andrade, especialista em análise documental.",
  inss: "A advogada Larissa Frez analisará seu histórico contributivo.",
  auxilio: "O Dr. Geraldo Silva analisará seu caso com prioridade.",
};

const initialMessage = (): Message => ({
  id: 1,
  from: "bot",
  text: TREE.root.question,
});

export function OrbitChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage()]);
  const [nodeKey, setNodeKey] = useState<string>("root");
  const [finished, setFinished] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, nodeKey, finished]);

  const pushBot = (text: string) =>
    setMessages((prev) => [...prev, { id: prev.length + 1, from: "bot", text }]);
  const pushUser = (text: string) =>
    setMessages((prev) => [...prev, { id: prev.length + 1, from: "user", text }]);

  const handleSelect = (opt: Option) => {
    pushUser(opt.label);
    if (opt.next.startsWith("end:")) {
      const key = opt.next.slice(4);
      setTimeout(() => {
        pushBot(FINAL[key]);
        setFinished(true);
      }, 500);
    } else {
      const nextNode = TREE[opt.next];
      setNodeKey(opt.next);
      setTimeout(() => pushBot(nextNode.question), 500);
    }
  };

  const reset = () => {
    setMessages([initialMessage()]);
    setNodeKey("root");
    setFinished(false);
  };

  const currentNode = !finished ? TREE[nodeKey] : null;

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fechar chat" : "Abrir OrbitChat"}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-gold-foreground transition-all hover:-translate-y-0.5 hover:scale-105 hover:opacity-90 cursor-pointer"
        style={{
          background: "var(--gradient-gold)",
          boxShadow: "var(--shadow-gold)",
        }}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-3 left-3 sm:left-auto sm:right-6 z-50 flex w-auto sm:w-[min(380px,90vw)] flex-col overflow-hidden rounded-xl border border-border bg-white animate-scale-in shadow-[0_30px_60px_-20px_oklch(0.22_0.06_260_/_0.45)]">
          <div className="relative bg-background px-5 py-4 text-navy border-b border-border">
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-px"
              style={{ background: "var(--gradient-gold)" }}
            />
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ background: "var(--gradient-gold)" }}
              >
                <span className="font-serif text-sm font-semibold text-navy">
                  MF
                </span>
              </div>
              <div>
                <div className="font-serif text-base leading-tight text-navy">
                  OrbitChat
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-navy/55">
                  Triagem Inteligente
                </div>
              </div>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex max-h-96 min-h-72 flex-col gap-3 overflow-y-auto bg-background px-4 py-5"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex animate-fade-in ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.from === "user"
                      ? "rounded-br-sm bg-navy text-primary-foreground"
                      : "rounded-bl-sm border border-border bg-card text-navy"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {currentNode && (
              <div className="mt-2 flex flex-col gap-2">
                {currentNode.options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleSelect(opt)}
                    className="group min-h-[44px] rounded-md border border-gold/60 bg-white px-3 py-2.5 text-left text-sm font-medium text-navy transition-all hover:border-gold hover:bg-gold hover:text-gold-foreground hover:opacity-90 cursor-pointer"
                  >
                    <span className="mr-2 text-gold group-hover:text-gold-foreground">
                      →
                    </span>
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {finished && (
              <button
                onClick={reset}
                className="mt-3 inline-flex min-h-[44px] items-center justify-center gap-2 self-start rounded-md border border-navy/15 bg-white px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy transition-colors hover:border-gold hover:text-gold cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reiniciar Atendimento
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 border-t border-border bg-card px-3 py-3">
            <input
              type="text"
              disabled
              placeholder="Selecione uma opção acima…"
              className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground placeholder:text-muted-foreground/70 disabled:cursor-not-allowed"
            />
            <button
              disabled
              aria-label="Enviar"
              className="flex h-9 w-9 items-center justify-center rounded-md text-gold-foreground disabled:opacity-60"
              style={{ background: "var(--gradient-gold)" }}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}