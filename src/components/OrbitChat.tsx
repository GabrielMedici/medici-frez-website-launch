import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Message = {
  id: number;
  from: "bot" | "user";
  text: string;
};

type Option = {
  label: string;
  reply: string;
};

const OPTIONS: Option[] = [
  {
    label: "Direito de Família/Patrimônio",
    reply:
      "Entendido. Vou direcionar você para nossa equipe do Setor Cível, especialista em mediação familiar e proteção patrimonial.",
  },
  {
    label: "Aposentadoria/INSS",
    reply:
      "Perfeito. Nossa equipe do Setor Previdenciário analisará seu histórico contributivo em breve.",
  },
];

const INITIAL_MESSAGE: Message = {
  id: 1,
  from: "bot",
  text: "Olá! Bem-vindo à Médici & Frez. Como podemos ajudar hoje?",
};

export function OrbitChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [showOptions, setShowOptions] = useState(true);
  const [done, setDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, showOptions]);

  const handleSelect = (opt: Option) => {
    setShowOptions(false);
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, from: "user", text: opt.label },
    ]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, from: "bot", text: opt.reply },
      ]);
      setDone(true);
    }, 700);
  };

  const reset = () => {
    setMessages([INITIAL_MESSAGE]);
    setShowOptions(true);
    setDone(false);
  };

  return (
    <>
      {/* Floating launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fechar chat" : "Abrir chat OrbitChat"}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-gold-foreground transition-all hover:-translate-y-0.5 hover:scale-105"
        style={{
          background: "var(--gradient-gold)",
          boxShadow: "var(--shadow-gold)",
        }}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[0_30px_60px_-20px_oklch(0.22_0.06_260_/_0.45)]">
          {/* Header */}
          <div className="relative bg-navy px-5 py-4 text-primary-foreground">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px"
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
                <div className="font-serif text-base leading-tight">
                  OrbitChat
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-gold">
                  Triagem Inteligente
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex max-h-80 min-h-64 flex-col gap-3 overflow-y-auto bg-secondary/40 px-4 py-5"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
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

            {showOptions && (
              <div className="mt-2 flex flex-col gap-2">
                {OPTIONS.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleSelect(opt)}
                    className="group rounded-md border border-gold/50 bg-card px-3.5 py-2.5 text-left text-sm font-medium text-navy transition-all hover:border-gold hover:bg-gold hover:text-gold-foreground"
                  >
                    <span className="mr-2 text-gold group-hover:text-gold-foreground">
                      →
                    </span>
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {done && (
              <button
                onClick={reset}
                className="self-start text-xs uppercase tracking-widest text-muted-foreground underline-offset-4 hover:text-gold hover:underline"
              >
                Iniciar nova conversa
              </button>
            )}
          </div>

          {/* Footer / input (disabled, simulação) */}
          <div className="flex items-center gap-2 border-t border-border bg-card px-3 py-3">
            <input
              type="text"
              disabled
              placeholder="Selecione uma opção acima…"
              className="flex-1 rounded-md border border-border bg-secondary/40 px-3 py-2 text-sm text-muted-foreground placeholder:text-muted-foreground/70 disabled:cursor-not-allowed"
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
