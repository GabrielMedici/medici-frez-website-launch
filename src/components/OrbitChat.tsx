import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, RotateCcw, Send } from "lucide-react";
import { createServerFn } from "@tanstack/react-start";

import imgMariaCristina from "@/assets/mariacristina.png";
import imgJemerson from "@/assets/jemerson.png";
import imgLaura from "@/assets/lauraandrade.png";
import imgLarissa from "@/assets/larissafrez.png";
import imgGeraldo from "@/assets/geraldo.png";

type Lawyer = { name: string; role: string; image: string };
type Message = { id: number; from: "bot" | "user"; text: string; lawyers?: Lawyer[] };
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
      { label: "Auxílio-Doença/INSS - Assistência", next: "auxilio" },
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

type FinalConfig = {
  text: string;
  lawyers: Lawyer[];
};

const FINAL: Record<string, FinalConfig> = {
  familia: {
    text: "O Setor Cível assumirá a mediação. Estes profissionais entrarão em contato em breve:",
    lawyers: [
      { name: "Dra. Maria Cristina", role: "Especialista Cível", image: imgMariaCristina },
      { name: "Dr. Jemerson", role: "Especialista Cível", image: imgJemerson }
    ]
  },
  patrimonio: {
    text: "Sua demanda será direcionada à nossa especialista em análise documental:",
    lawyers: [
      { name: "Dra. Laura Andrade", role: "Direito Patrimonial", image: imgLaura }
    ]
  },
  inss: {
    text: "Seu histórico contributivo será analisado com dedicação pela nossa equipe:",
    lawyers: [
      { name: "Dra. Larissa Frez", role: "Especialista Previdenciária", image: imgLarissa }
    ]
  },
  auxilio: {
    text: "Seu caso será analisado com total prioridade pelo nosso especialista:",
    lawyers: [
      { name: "Dr. Geraldo Silva", role: "Especialista Previdenciário", image: imgGeraldo }
    ]
  },
};

const initialMessage = (): Message => ({
  id: 1,
  from: "bot",
  text: TREE.root.question,
});

const dispararEmailNotificacao = createServerFn({ method: "POST" })
  .handler(async ({ data }: { data: { historicoChat: { pergunta: string; resposta: string }[], nomesAdvogados: string } }) => {
  const endpoint = "https://api.resend.com/emails";
  
  // Construção dinâmica das linhas da tabela com perguntas e respostas
  let linhasTabelaHtml = "";
  data.historicoChat.forEach(item => {
    if (item.pergunta && item.resposta) {
      linhasTabelaHtml += `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1a202c; width: 40%; font-size: 14px;">${item.pergunta}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #4a5568; width: 60%; font-size: 14px;">${item.resposta}</td>
        </tr>
      `;
    }
  });

  // Estrutura HTML elegante e responsiva para o e-mail corporativo
  const corpoHtml = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); background-color: #ffffff;">
      <div style="background-color: #0b132b; padding: 25px; text-align: center; border-bottom: 3px solid #d4af37;">
        <h2 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 1px; font-family: Georgia, serif;">NOVO LEAD QUALIFICADO</h2>
        <p style="color: #cbd5e1; margin: 5px 0 0 0; font-size: 13px;">Dados coletados via assistente Orbit Chat</p>
      </div>
      <div style="padding: 30px;">
        <p style="color: #2d3748; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
          Um potencial cliente concluiu a triagem inicial no site. Abaixo estão listadas todas as informações e respostas fornecidas pelo usuário:
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; background-color: #f7fafc;">
          <thead>
            <tr style="background-color: #edf2f7;">
              <th style="padding: 12px; text-align: left; color: #4a5568; font-size: 12px; text-transform: uppercase; border-bottom: 2px solid #cbd5e1;">Campo/Pergunta</th>
              <th style="padding: 12px; text-align: left; color: #4a5568; font-size: 12px; text-transform: uppercase; border-bottom: 2px solid #cbd5e1;">Resposta do Cliente</th>
            </tr>
          </thead>
          <tbody>
            ${linhasTabelaHtml}
          </tbody>
        </table>
      </div>
      <div style="background-color: #f7fafc; padding: 15px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; font-size: 11px; color: #a0aec0;">
          Este é um disparo automatizado gerado por Cloudflare Workers e processado via API Resend.
        </p>
      </div>
    </div>
  `;

  try {
    const respostaRequisicao = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": "Bearer re_D2cjp1Zg_AxiFjUcnHeWuR2rSSdFNw667",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: "contato.medicistore@gmail.com",
        subject: `atendimento aos cuidados de: ${data.nomesAdvogados}`,
        html: corpoHtml
      })
    });

    return respostaRequisicao.ok;
  } catch (erro) {
    console.error("Falha ao processar o envio do e-mail:", erro);
    return false;
  }
});

export function OrbitChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage()]);
  const [nodeKey, setNodeKey] = useState<string>("root");
  const [finished, setFinished] = useState(false);
  const [awaitingObservationKey, setAwaitingObservationKey] = useState<string | null>(null);
  const [awaitingPhoneKey, setAwaitingPhoneKey] = useState<string | null>(null);
  const [phoneInput, setPhoneInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, nodeKey, finished]);

  // Listen for external open trigger (e.g. Hero CTA button)
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("orbit:open", handler);
    return () => window.removeEventListener("orbit:open", handler);
  }, []);

  const pushBot = (text: string, lawyers?: Lawyer[]) =>
    setMessages((prev) => [...prev, { id: prev.length + 1, from: "bot", text, lawyers }]);
  const pushUser = (text: string) =>
    setMessages((prev) => [...prev, { id: prev.length + 1, from: "user", text }]);

  const handleSelect = (opt: Option) => {
    pushUser(opt.label);
    if (opt.next.startsWith("end:")) {
      const key = opt.next.slice(4);
      setAwaitingObservationKey(key);
      setTimeout(() => {
        pushBot("Existe algo que você gostaria de observar que considera importante para seu caso? Digite aqui pra mim que vou transmitir a informação:");
      }, 500);
    } else {
      const nextNode = TREE[opt.next];
      setNodeKey(opt.next);
      setTimeout(() => pushBot(nextNode.question), 500);
    }
  };

  const handleSendInput = () => {
    if (!phoneInput.trim()) return;
    
    if (awaitingObservationKey) {
      pushUser(phoneInput);
      const key = awaitingObservationKey;
      setPhoneInput("");
      setAwaitingObservationKey(null);
      setAwaitingPhoneKey(key);
      setTimeout(() => {
        pushBot("Perfeito, anotei sua observação. Para que o advogado especialista possa entrar em contato, por favor, informe seu número de WhatsApp com DDD:");
      }, 500);
      return;
    }

    if (awaitingPhoneKey) {
      pushUser(phoneInput);
      const key = awaitingPhoneKey;
      setPhoneInput("");
      setAwaitingPhoneKey(null);
      
      setTimeout(() => {
        const finalMsg = FINAL[key];
        pushBot(finalMsg.text, finalMsg.lawyers);
        setFinished(true);

        // Map messages up to this point + the current phone input to construct the email history
        const historicoMsgs = [...messages, { id: messages.length + 1, from: "user", text: phoneInput }];
        const historicoChat = [];
        for (let i = 0; i < historicoMsgs.length; i++) {
          if (historicoMsgs[i].from === "bot") {
            const pergunta = historicoMsgs[i].text;
            let resposta = "";
            if (i + 1 < historicoMsgs.length && historicoMsgs[i + 1].from === "user") {
              resposta = historicoMsgs[i + 1].text;
              historicoChat.push({ pergunta, resposta });
            }
          }
        }
        
        const nomesAdvogados = finalMsg.lawyers.map(l => l.name).join(" e ");
        dispararEmailNotificacao({ data: { historicoChat, nomesAdvogados } });

      }, 500);
      return;
    }
  };

  const reset = () => {
    setMessages([initialMessage()]);
    setNodeKey("root");
    setFinished(false);
    setAwaitingObservationKey(null);
    setAwaitingPhoneKey(null);
    setPhoneInput("");
  };

  const currentNode = !finished ? TREE[nodeKey] : null;

  return (
    <>
      {/* Floating CTA trigger */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Breathing ring — only visible when chat is closed */}
        {!open && (
          <span
            aria-hidden
            className="orbit-ring"
          />
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar chat" : "Iniciar atendimento rápido"}
          className={
            open
              ? "relative flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 text-gold transition-all duration-300 hover:scale-105 hover:border-gold hover:opacity-90 cursor-pointer"
              : "orbit-pill relative flex items-center gap-3 rounded-full border border-gold/30 px-5 py-0 h-14 text-gold transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:shadow-2xl cursor-pointer"
          }
          style={{
            backgroundColor: "var(--navy)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          {open ? (
            <X className="h-6 w-6 shrink-0" />
          ) : (
            <>
              <MessageCircle className="h-5 w-5 shrink-0" />
              <span className="whitespace-nowrap text-[13px] font-semibold tracking-wide leading-none pr-1">
                Iniciar atendimento rápido
              </span>
            </>
          )}
        </button>
      </div>

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
                className={`flex animate-fade-in flex-col ${m.from === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed mb-1 ${
                    m.from === "user"
                      ? "rounded-br-sm bg-navy text-primary-foreground"
                      : "rounded-bl-sm border border-border bg-card text-navy"
                  }`}
                >
                  {m.text}
                </div>
                {m.lawyers && m.lawyers.length > 0 && (
                  <div className={`flex flex-col gap-2 mt-1 mb-2 w-[95%] ${m.from === "user" ? "self-end" : "self-start"}`}>
                     {m.lawyers.map((lw, i) => (
                        <div key={i} className="flex items-center gap-3 bg-[#F4F6F9] border border-gold/30 p-2.5 rounded-xl shadow-sm animate-fade-in" style={{animationDelay: `${i * 150}ms`}}>
                           <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-gold/40 shrink-0 shadow-inner">
                              <img src={lw.image} alt={lw.name} className="w-full h-full object-cover object-top" />
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[11px] md:text-xs font-bold text-navy leading-tight">{lw.name}</span>
                              <span className="text-[9px] text-gold uppercase tracking-wider font-semibold">{lw.role}</span>
                           </div>
                        </div>
                     ))}
                  </div>
                )}
              </div>
            ))}

            {(!awaitingPhoneKey && !awaitingObservationKey) && currentNode && (
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
              disabled={(!awaitingPhoneKey && !awaitingObservationKey) || finished}
              placeholder={awaitingPhoneKey ? "Digite seu número com DDD..." : awaitingObservationKey ? "Digite sua observação..." : "Selecione uma opção acima…"}
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSendInput(); }}
              className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-navy placeholder:text-muted-foreground/70 disabled:cursor-not-allowed"
            />
            <button
              disabled={(!awaitingPhoneKey && !awaitingObservationKey) || finished || !phoneInput.trim()}
              onClick={handleSendInput}
              aria-label="Enviar"
              className="flex h-9 w-9 items-center justify-center rounded-md text-gold-foreground disabled:opacity-60 cursor-pointer"
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