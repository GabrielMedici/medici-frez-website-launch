import { useState } from "react";
import { 
  LayoutDashboard, Scale, CalendarDays, Wallet, FileText, 
  Search, Check, Clock, Download, Circle, LogOut, File, ChevronDown, CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import imgAstrea from "@/assets/astrea.png";
import imgAstreaIco from "@/assets/astreaico.png";

type TabId = "resumo" | "processos" | "agenda" | "financeiro" | "documentos";

// --- MOCK DATA ---

const PROCESSOS = [
  {
    id: "1",
    numero: "0001234-56.2026.8.16.0017",
    cliente: "João da Silva",
    setor: "Cível",
    status: "Ativo",
    history: [
      { date: "15/05/2026", event: "Intimação lida: Aguardando manifestação do réu" },
      { date: "10/05/2026", event: "Petição inicial protocolada" }
    ]
  },
  {
    id: "2",
    numero: "5009876-12.2026.4.04.7000",
    cliente: "Maria Souza",
    setor: "Previdenciário",
    status: "Pendente",
    history: [
      { date: "20/05/2026", event: "Aguardando perícia médica" },
      { date: "01/05/2026", event: "Requerimento administrativo agendado no INSS" }
    ]
  },
  {
    id: "3",
    numero: "0003456-99.2026.8.16.0017",
    cliente: "Empresa XYZ",
    setor: "Cível",
    status: "Ativo",
    history: [
      { date: "18/05/2026", event: "Audiência de conciliação designada" },
      { date: "12/05/2026", event: "Contestação apresentada" }
    ]
  }
];

const AGENDA = [
  { id: 1, date: "05/06/2026 14:00", title: "Audiência de Conciliação - João da Silva", type: "audiencia" },
  { id: 2, date: "08/06/2026 23:59", title: "Prazo Fatal: Recurso Inominado (Maria Souza)", type: "prazo" },
  { id: 3, date: "10/06/2026 10:00", title: "Reunião de Alinhamento - Empresa XYZ", type: "reuniao" },
];

const FINANCEIRO = [
  { id: 1, cliente: "João da Silva", vencimento: "05/06/2026", valor: "R$ 3.500,00", status: "Pendente" },
  { id: 2, cliente: "Maria Souza", vencimento: "15/05/2026", valor: "R$ 1.200,00", status: "Pago" },
  { id: 3, cliente: "Empresa XYZ", vencimento: "20/05/2026", valor: "R$ 5.000,00", status: "Atrasado" },
];

const DOCUMENTOS = [
  { id: 1, nome: "Procuração_Assinada_Joao.pdf", size: "1.2 MB", type: "PDF" },
  { id: 2, nome: "Laudo_Medico_Maria.pdf", size: "3.4 MB", type: "PDF" },
  { id: 3, nome: "Contrato_Honorarios_XYZ.pdf", size: "800 KB", type: "PDF" },
  { id: 4, nome: "Petição_Inicial_Final.pdf", size: "2.1 MB", type: "PDF" },
];

export function AcompanhamentoProcessos() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("resumo");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (cpf.trim().length === 0) return; // Aceita qualquer coisa desde que preenchido
    setIsLogged(true);
  };

  const TABS = [
    { id: "resumo", label: "Resumo Gerencial", icon: LayoutDashboard },
    { id: "processos", label: "Processos", icon: Scale },
    { id: "agenda", label: "Agenda Jurídica", icon: CalendarDays },
    { id: "financeiro", label: "Gestão Financeira", icon: Wallet },
    { id: "documentos", label: "Documentos", icon: FileText },
  ];

  return (
    <section id="cliente" className="bg-transparent border-t border-white/10 py-20 md:py-28 relative z-10">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        
        {/* Cabeçalho Público */}
        <div className="text-center mb-10">
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold">
            Área Restrita
          </span>
          <h2 className="mt-6 font-serif text-4xl font-normal text-white md:text-5xl">
            Painel do <span className="italic">Cliente</span>
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gold/70" />
          <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-white/65">
            Acesse o ambiente seguro integrado à nossa plataforma de gestão <strong>Astrea</strong>. Acompanhe processos, agenda, honorários e acesse seus documentos.
          </p>
        </div>

        {!isLogged ? (
          // --- LOGIN SIMULADO ---
          <div className="mx-auto max-w-md bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border/60 overflow-hidden">
             <div className="bg-white w-full pt-10 pb-6 px-6 flex justify-center items-center">
                <img 
                  src={imgAstrea} 
                  alt="Logo Astrea" 
                  className="w-[85%] max-w-[260px] h-auto object-contain"
                />
             </div>
             
             <div className="p-8 md:p-10 pt-4">
               <h3 className="text-center font-serif text-2xl text-navy mb-2">Acesso ao Sistema</h3>
               <p className="text-center text-sm text-navy/60 mb-8">Informe suas credenciais para entrar no portal integrado ao Astrea.</p>
             
             <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="Digite seu CPF"
                  className="w-full min-h-[48px] rounded-lg border border-border bg-background px-4 py-3 text-sm text-navy outline-none transition-colors placeholder:text-navy/40 focus:border-gold focus:ring-1 focus:ring-gold"
                />
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full min-h-[48px] rounded-lg border border-border bg-background px-4 py-3 text-sm text-navy outline-none transition-colors placeholder:text-navy/40 focus:border-gold focus:ring-1 focus:ring-gold"
                />
                <button
                  type="submit"
                  className="w-full inline-flex min-h-[48px] items-center justify-center rounded-lg px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer bg-[#0F172A] mt-2"
                >
                  Entrar Seguramente
                </button>
             </form>
            </div>
          </div>
        ) : (
          // --- ASTREA DASHBOARD ---
          <div className="flex flex-col md:flex-row bg-[#F4F6F9] rounded-2xl overflow-hidden border border-border shadow-xl min-h-[600px]">
            
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#0F172A] flex flex-col">
              <div className="p-4 border-b-2 border-gold flex items-center justify-center bg-white h-[80px]">
                 <img 
                   src={imgAstreaIco} 
                   alt="Ícone Astrea" 
                   className="h-12 w-auto object-contain drop-shadow-sm"
                 />
              </div>
              <nav className="flex-1 p-4 space-y-1 overflow-x-auto md:overflow-x-visible flex flex-row md:flex-col scrollbar-hide">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TabId)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                        isActive 
                          ? "bg-[#C5A059] text-navy shadow-md" 
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
              <div className="p-4 mt-auto border-t border-white/10 hidden md:block">
                 <button onClick={() => setIsLogged(false)} className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors cursor-pointer w-full p-2">
                   <LogOut className="w-4 h-4" /> Sair do Sistema
                 </button>
              </div>
            </aside>

            {/* Content Area */}
            <main className="flex-1 bg-[#F4F6F9] p-4 md:p-8 overflow-y-auto max-h-[700px]">
               
               {activeTab === "resumo" && <ResumoGerencial />}
               {activeTab === "processos" && <ProcessosModulo />}
               {activeTab === "agenda" && <AgendaModulo />}
               {activeTab === "financeiro" && <FinanceiroModulo />}
               {activeTab === "documentos" && <DocumentosModulo />}

            </main>
          </div>
        )}
      </div>
    </section>
  );
}

// --- SUBMODULOS ---

function ResumoGerencial() {
  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-serif text-navy mb-6">Resumo Gerencial</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
         <StatCard title="Processos Ativos" value="42" icon={Scale} />
         <StatCard title="Prazos na Semana" value="5" icon={CalendarDays} alert />
         <StatCard title="Inadimplência" value="2%" icon={Wallet} />
         <StatCard title="Produtividade" value="Alto" icon={FileText} />
      </div>

      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
         <h4 className="text-lg font-semibold text-navy mb-4">Produtividade Mensal</h4>
         <div className="space-y-5">
            <ProgressBar label="Andamentos Cíveis Analisados" percent={80} />
            <ProgressBar label="Requerimentos Previdenciários" percent={65} />
            <ProgressBar label="Petições Protocoladas" percent={90} />
         </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, alert }: any) {
  return (
    <div className="bg-white p-5 rounded-xl border border-border shadow-sm flex items-start justify-between">
       <div>
         <p className="text-xs text-navy/50 font-medium uppercase tracking-wider mb-1">{title}</p>
         <p className="text-3xl font-serif text-navy">{value}</p>
       </div>
       <div className={`p-2 rounded-lg ${alert ? 'bg-red-50 text-red-500' : 'bg-[#F4F6F9] text-[#C5A059]'}`}>
         <Icon className="w-5 h-5" />
       </div>
    </div>
  );
}

function ProgressBar({ label, percent }: any) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-navy/80">{label}</span>
        <span className="text-navy/50">{percent}%</span>
      </div>
      <div className="h-2 w-full bg-[#F4F6F9] rounded-full overflow-hidden">
        <div className="h-full bg-[#C5A059] rounded-full transition-all duration-1000" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function ProcessosModulo() {
  const [filter, setFilter] = useState("Todos");
  
  const filtered = PROCESSOS.filter(p => filter === "Todos" || p.setor === filter);

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-2xl font-serif text-navy">Monitoramento de Processos</h3>
        <div className="flex gap-2 bg-white p-1 rounded-lg border border-border shadow-sm">
           {["Todos", "Cível", "Previdenciário"].map(f => (
             <button
               key={f}
               onClick={() => setFilter(f)}
               className={`px-4 py-1.5 rounded-md text-sm transition-colors cursor-pointer ${filter === f ? 'bg-[#0F172A] text-white' : 'text-navy/60 hover:bg-[#F4F6F9]'}`}
             >
               {f}
             </button>
           ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <Accordion type="single" collapsible className="w-full">
          {filtered.map(p => (
            <AccordionItem key={p.id} value={p.id} className="border-b border-border/50 last:border-0">
              <AccordionTrigger className="hover:no-underline px-6 py-4 cursor-pointer hover:bg-[#F4F6F9]/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-left w-full">
                   <div className="min-w-[220px]">
                     <p className="text-xs text-navy/50 font-medium">NÚMERO</p>
                     <p className="font-semibold text-navy text-sm">{p.numero}</p>
                   </div>
                   <div className="flex-1">
                     <p className="text-xs text-navy/50 font-medium">CLIENTE</p>
                     <p className="text-navy text-sm">{p.cliente}</p>
                   </div>
                   <div className="w-[120px]">
                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F4F6F9] text-navy border border-border/50">
                       {p.setor}
                     </span>
                   </div>
                   <div className="w-[100px] flex justify-end">
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${p.status === 'Ativo' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                       {p.status}
                     </span>
                   </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-6 pb-6 pt-2">
                  <div className="bg-[#F4F6F9] rounded-lg p-5">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-navy/40 mb-4">Histórico de Movimentações (Astrea)</h5>
                    <div className="space-y-4">
                       {p.history.map((h, i) => (
                         <div key={i} className="flex gap-4">
                            <div className="flex flex-col items-center">
                               <div className="w-2.5 h-2.5 rounded-full bg-[#C5A059] mt-1.5" />
                               {i !== p.history.length - 1 && <div className="w-px h-full bg-[#C5A059]/30 my-1" />}
                            </div>
                            <div className="pb-2">
                               <div className="text-xs text-[#C5A059] font-bold mb-0.5">{h.date}</div>
                               <div className="text-sm text-navy/80">{h.event}</div>
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

function AgendaModulo() {
  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-serif text-navy mb-6">Agenda Jurídica Integrada</h3>
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="divide-y divide-border/50">
           {AGENDA.map(evento => (
             <div key={evento.id} className="p-5 flex items-center gap-4 hover:bg-[#F4F6F9]/50 transition-colors">
                <div className={`p-3 rounded-full ${
                  evento.type === 'prazo' ? 'bg-red-50 text-red-500' :
                  evento.type === 'audiencia' ? 'bg-amber-50 text-amber-500' :
                  'bg-blue-50 text-blue-500'
                }`}>
                   <CalendarDays className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">{evento.title}</p>
                  <p className="text-xs text-navy/60">{evento.date}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

function FinanceiroModulo() {
  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-serif text-navy mb-6">Controle de Honorários e Despesas</h3>
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-[#F4F6F9] border-b border-border/60 text-xs font-semibold text-navy/50 uppercase tracking-wider">
              <th className="p-4">Cliente / Contrato</th>
              <th className="p-4">Vencimento</th>
              <th className="p-4">Valor</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50 text-sm">
            {FINANCEIRO.map(item => (
              <tr key={item.id} className="hover:bg-[#F4F6F9]/30 transition-colors">
                <td className="p-4 font-medium text-navy">{item.cliente}</td>
                <td className="p-4 text-navy/70">{item.vencimento}</td>
                <td className="p-4 font-semibold text-navy">{item.valor}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
                    item.status === 'Pago' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    item.status === 'Pendente' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    <Circle className={`w-2 h-2 fill-current ${
                      item.status === 'Pago' ? 'text-emerald-500' :
                      item.status === 'Pendente' ? 'text-amber-500' :
                      'text-red-500'
                    }`} />
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DocumentosModulo() {
  const [downloading, setDownloading] = useState<number | null>(null);
  const [downloaded, setDownloaded] = useState<number[]>([]);

  const handleDownload = (id: number) => {
    if (downloading === id || downloaded.includes(id)) return;
    setDownloading(id);
    setTimeout(() => {
      setDownloading(null);
      setDownloaded([...downloaded, id]);
      toast.success("Download seguro concluído", {
        description: "Arquivo disponibilizado pelo sistema Astrea."
      });
    }, 1500);
  };

  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-serif text-navy mb-6">Cofre de Documentos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
         {DOCUMENTOS.map(doc => {
           const isDownloading = downloading === doc.id;
           const isDone = downloaded.includes(doc.id);
           return (
             <div key={doc.id} className="bg-white p-5 rounded-xl border border-border shadow-sm hover:shadow-md transition-all flex flex-col">
               <div className="flex items-start gap-3 mb-4">
                 <div className="p-3 bg-[#F4F6F9] text-navy/50 rounded-lg">
                   <File className="w-6 h-6" />
                 </div>
                 <div className="flex-1 min-w-0">
                   <p className="text-sm font-semibold text-navy truncate" title={doc.nome}>{doc.nome}</p>
                   <p className="text-xs text-navy/50 mt-0.5">{doc.size} • {doc.type}</p>
                 </div>
               </div>
               <button
                 onClick={() => handleDownload(doc.id)}
                 className={`mt-auto w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                   isDone 
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200" 
                    : isDownloading
                    ? "bg-[#F4F6F9] text-navy/50 cursor-wait"
                    : "bg-[#0F172A] text-white hover:bg-[#C5A059] hover:text-navy"
                 }`}
               >
                 {isDone ? <CheckCircle2 className="w-4 h-4" /> : isDownloading ? <Clock className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                 {isDone ? "Baixado" : isDownloading ? "Baixando..." : "Baixar"}
               </button>
             </div>
           );
         })}
      </div>
    </div>
  );
}