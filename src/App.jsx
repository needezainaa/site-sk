import React, { useState, useEffect } from 'react';
import { 
    Rocket, 
    Printer, 
    Megaphone, 
    Target, 
    Cpu, 
    Smile, 
    MessageCircle, 
    Menu, 
    X, 
    ArrowRight, 
    MousePointer2,
    Palette,
    Zap,
    Layout,
    Code,
    Sparkles,
    TrendingUp,
    Filter,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    Check,
    Play,
    Pause,
    Instagram,
    Linkedin,
    Send,
    DollarSign,
    Calendar,
    Monitor
} from 'lucide-react';

const App = () => {
    const [currentView, setCurrentView] = useState('home');
    const [isBriefingOpen, setIsBriefingOpen] = useState(false);

    const handleNavigate = (view, sectionId = null) => {
        setCurrentView(view);
        window.scrollTo(0, 0);

        if (view === 'home' && sectionId) {
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    const toggleBriefing = () => setIsBriefingOpen(!isBriefingOpen);

    // Estilos Globais
    const globalStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;800&family=Space+Grotesk:wght@400;500;700&display=swap');
        
        :root {
            --sk-purple: #4a148c;
            --sk-yellow: #ffd600;
            --sk-pink: #da00f9;
            --sk-green: #8dff4f;
            --sk-dark: #1a1a1a;
            --sk-light: #F5f5f6;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--sk-light);
            color: var(--sk-dark);
            overflow-x: hidden;
        }
        
        h1, h2, h3, h4, h5, h6, .font-display {
            font-family: 'Space Grotesk', sans-serif;
        }

        .bg-tech-grid {
            background-size: 50px 50px;
            background-image: linear-gradient(to right, rgba(74, 20, 140, 0.03) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(74, 20, 140, 0.03) 1px, transparent 1px);
        }

        .shadow-pop-purple:hover {
            transform: translate(-3px, -3px);
            box-shadow: 8px 8px 0px var(--sk-purple);
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
        }
        
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 15s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .glass-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.5);
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes progress { from { width: 0%; } to { width: 100%; } }
        
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.4s ease-out forwards; }
        .animate-progress { animation: progress 2.5s linear infinite; }
    `;

    return (
        <div className="font-sans text-gray-900 antialiased selection:bg-[#ff0080] selection:text-white min-h-screen flex flex-col">
            <style>{globalStyles}</style>
            
            <Navbar onNavigate={handleNavigate} currentView={currentView} onOpenBriefing={toggleBriefing} />
            
            <main className="flex-grow">
                {currentView === 'home' ? (
                    <>
                        <Hero onNavigate={handleNavigate} onOpenBriefing={toggleBriefing} />
                        <Services />
                        <Vibe />
                        <Contact />
                    </>
                ) : (
                    <ProjectsPage onNavigate={handleNavigate} />
                )}
            </main>

            <Footer />

            {/* Modal de Briefing */}
            {isBriefingOpen && <BriefingModal onClose={toggleBriefing} />}
        </div>
    );
};

// --- COMPONENTE MODAL DE BRIEFING ---
const BriefingModal = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [serviceType, setServiceType] = useState('Social Media');
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        budget: 'Não tenho certeza',
        // Perguntas dinâmicas serão salvas aqui
        q1: '', q2: '', q3: '', q4: '', q5: ''
    });

    // Mapeamento de perguntas por área (5 Perguntas Estratégicas)
    const questionsByService = {
        'Social Media': [
            "Qual o principal objetivo? (Vendas, Seguidores, Branding)",
            "Qual a frequência de postagem atual da marca?",
            "Quais são os 3 principais concorrentes que você admira?",
            "Tem referências visuais de perfis que gosta? (Coloque links)",
            "Quem é o público-alvo que você quer atingir?"
        ],
        'Identidade Visual': [
            "Como você descreveria a personalidade da marca em 3 palavras?",
            "Existe alguma cor que você AMA e alguma que ODEIA?",
            "Onde a marca será mais aplicada? (Digital, Fachada, Embalagem)",
            "Quais marcas te inspiram visualmente hoje?",
            "Qual a mensagem principal que o logo deve transmitir?"
        ],
        'Gráfica e Impressos': [
            "Quais materiais você precisa produzir? (Cartões, Banners, Adesivos...)",
            "Qual a quantidade estimada para cada item?",
            "Já possui a arte pronta ou precisa que a gente crie?",
            "Qual o prazo ideal para receber esse material?",
            "Tem preferência por algum acabamento específico (Brilho, Fosco, Verniz)?"
        ],
        'Consultoria de Marketing': [
            "Qual o maior desafio de vendas/marketing da empresa hoje?",
            "Já investiram em marketing antes? O que funcionou e o que falhou?",
            "Qual seu ticket médio (valor médio de venda) atual?",
            "Quais canais de vendas vocês usam hoje?",
            "Onde você quer que a empresa esteja daqui a 6 meses?"
        ],
        'Consultoria de Processos': [
            "Qual o processo mais 'travado' ou lento da empresa hoje?",
            "Quais ferramentas a equipe usa? (WhatsApp, Excel, Trello...)",
            "Quantas pessoas estão envolvidas na operação diária?",
            "Onde acontecem os maiores erros operacionais atualmente?",
            "O que você gostaria de automatizar primeiro se pudesse?"
        ],
        'Web Design': [
            "Qual o objetivo do site? (Vender, Informar, Capturar Leads)",
            "Tem algum site de referência que você acha incrível?",
            "Você já possui domínio (www) e hospedagem?",
            "Quantas páginas você imagina que o site terá?",
            "Possui fotos e textos prontos ou vamos precisar criar?"
        ]
    };

    const currentQuestions = questionsByService[serviceType] || questionsByService['Social Media'];

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const getWhatsAppLink = () => {
        // Constrói a mensagem com as respostas do briefing
        let message = `*NOVO BRIEFING ENVIADO PELO SITE*\n\n`;
        message += `👤 *Nome:* ${formData.name}\n`;
        message += `🏢 *Empresa:* ${formData.company}\n`;
        message += `🚀 *Serviço:* ${serviceType}\n`;
        message += `💰 *Verba:* ${formData.budget}\n\n`;
        message += `*--- DETALHES ---*\n`;
        
        currentQuestions.forEach((q, index) => {
            const answerKey = `q${index + 1}`;
            message += `\n❓ *${q}*\n👉 ${formData[answerKey] || 'Sem resposta'}\n`;
        });

        return `https://wa.me/5511945438152?text=${encodeURIComponent(message)}`;
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-fade-in">
            <div className="absolute inset-0 bg-[#1a1a1a]/90 backdrop-blur-sm" onClick={onClose}></div>
            
            <div className="bg-white rounded-2xl w-full max-w-4xl relative z-10 animate-slide-up shadow-2xl border-4 border-[#1a1a1a] overflow-hidden max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                    <X size={20} />
                </button>

                {step === 1 ? (
                    <div className="flex flex-col md:flex-row min-h-[600px]">
                        {/* Sidebar Decorativa ROSA */}
                        <div className="hidden md:flex w-1/3 bg-[#da00f9] p-8 flex-col justify-between text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="w-10 h-10 bg-[#ffd600] rounded-lg flex items-center justify-center text-[#ff0080] font-bold mb-6 border-2 border-[#1a1a1a]">SK</div>
                                <h3 className="font-display font-bold text-3xl mb-4 leading-tight">Bora tirar esse projeto do papel?</h3>
                                <p className="text-pink-100 text-sm font-medium">Preencha o briefing ao lado para nossa equipe entender sua missão com clareza.</p>
                            </div>
                            
                            <div className="relative z-10 space-y-6 mt-8">
                                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-md border border-white/20">
                                    <div className="flex items-center gap-2 font-bold mb-1 text-[#ffd600]"><Zap size={16} /> Fast Track</div>
                                    <p className="text-xs text-white/90">Briefing detalhado agiliza nosso orçamento em até 50%.</p>
                                </div>
                                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-md border border-white/20">
                                    <div className="flex items-center gap-2 font-bold mb-1 text-[#00e676]"><Check size={16} /> Especialistas</div>
                                    <p className="text-xs text-white/90">Sua resposta vai direto para o especialista da área.</p>
                                </div>
                            </div>

                            {/* Bolhas decorativas */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-[#4a148c] rounded-full blur-3xl opacity-40 translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#ffd600] rounded-full blur-3xl opacity-30 -translate-x-1/2 translate-y-1/2"></div>
                        </div>

                        {/* Formulário */}
                        <div className="w-full md:w-2/3 p-8 md:p-10 bg-white">
                            <div className="mb-6 border-b border-gray-100 pb-4">
                                <h2 className="font-display font-black text-3xl text-[#1a1a1a]">Briefing Tático</h2>
                                <p className="text-gray-500 text-sm">Responda com calma, quanto mais detalhes melhor.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Dados Básicos */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Seu Nome</label>
                                        <input 
                                            required
                                            type="text" 
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#ff0080] focus:ring-0 outline-none transition-all font-medium"
                                            placeholder="Ex: Tony Stark"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Empresa / Marca</label>
                                        <input 
                                            type="text" 
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#ff0080] focus:ring-0 outline-none transition-all font-medium"
                                            placeholder="Ex: Stark Ind."
                                            value={formData.company}
                                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Área do Projeto</label>
                                        <div className="relative">
                                            <select 
                                                className="w-full p-3 bg-[#f8fafc] border-2 border-[#1a1a1a] rounded-lg focus:border-[#ff0080] focus:ring-0 outline-none transition-all appearance-none cursor-pointer font-bold text-[#1a1a1a]"
                                                value={serviceType}
                                                onChange={(e) => {
                                                    setServiceType(e.target.value);
                                                    // Limpa respostas ao trocar de área
                                                    setFormData(prev => ({...prev, q1:'', q2:'', q3:'', q4:'', q5:''}));
                                                }}
                                            >
                                                <option>Social Media</option>
                                                <option>Identidade Visual</option>
                                                <option>Consultoria de Marketing</option>
                                                <option>Consultoria de Processos</option>
                                                <option>Gráfica e Impressos</option>
                                                <option>Web Design</option>
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <ChevronLeft size={16} className="-rotate-90 text-[#1a1a1a]" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Verba Estimada</label>
                                        <select 
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#ff0080] focus:ring-0 outline-none transition-all appearance-none cursor-pointer"
                                            value={formData.budget}
                                            onChange={(e) => setFormData({...formData, budget: e.target.value})}
                                        >
                                            <option>Não tenho certeza</option>
                                            <option>Até R$ 1.000</option>
                                            <option>R$ 1.000 - R$ 3.000</option>
                                            <option>R$ 3.000 - R$ 5.000</option>
                                            <option>Acima de R$ 5.000</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Perguntas Dinâmicas */}
                                <div className="bg-[#f8fafc] p-6 rounded-xl border border-gray-100 space-y-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles size={18} className="text-[#ff0080]" />
                                        <h4 className="font-bold text-[#1a1a1a] text-sm uppercase tracking-wide">Detalhes: {serviceType}</h4>
                                    </div>
                                    
                                    {currentQuestions.map((q, idx) => {
                                        const key = `q${idx + 1}`;
                                        return (
                                            <div key={idx}>
                                                <label className="block text-xs font-bold text-gray-600 mb-1.5">{idx + 1}. {q}</label>
                                                <input 
                                                    type="text"
                                                    required
                                                    className="w-full p-2.5 bg-white border border-gray-200 rounded focus:border-[#ff0080] focus:ring-1 focus:ring-[#ff0080] outline-none transition-all text-sm"
                                                    placeholder="Sua resposta aqui..."
                                                    value={formData[key]}
                                                    onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full bg-[#8dff4f] text-[#1a1a1a] font-black uppercase tracking-widest py-4 rounded-xl hover:bg-[#00c965] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 shadow-[0_4px_0px_#1a1a1a] active:translate-y-0 active:shadow-none border-2 border-[#1a1a1a]"
                                >
                                    Enviar Briefing <Send size={20} />
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="p-12 text-center flex flex-col items-center justify-center min-h-[500px] bg-tech-grid">
                        <div className="w-24 h-24 bg-[#00e676] rounded-full flex items-center justify-center mb-6 animate-bounce shadow-[0_0_30px_rgba(0,230,118,0.4)] border-4 border-[#1a1a1a]">
                            <Check size={48} className="text-[#1a1a1a]" strokeWidth={4} />
                        </div>
                        <h2 className="font-display font-black text-4xl text-[#1a1a1a] mb-4">Briefing Recebido!</h2>
                        <p className="text-gray-600 mb-8 max-w-lg text-lg">
                            Analisamos suas respostas e já temos uma ideia de como atacar.
                            <br/><br/>
                            Clique abaixo para enviar esses dados para nosso WhatsApp e falar com um especialista agora mesmo.
                        </p>
                        
                        <a 
                            href={getWhatsAppLink()} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-[#25D366] text-white px-8 py-5 rounded-xl font-bold text-xl hover:bg-[#128C7E] transition-all flex items-center gap-3 shadow-[6px_6px_0px_#1a1a1a] border-2 border-[#1a1a1a] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#1a1a1a]"
                        >
                            <MessageCircle size={28} />
                            Finalizar no WhatsApp
                        </a>
                        
                        <button onClick={onClose} className="mt-8 text-gray-400 hover:text-[#ff0080] text-sm font-bold underline decoration-2 underline-offset-4">
                            Fechar e voltar ao site
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- NOVA PÁGINA DE PROJETOS ---
const ProjectsPage = ({ onNavigate }) => {
    // ... [Mesmo código da versão anterior]
    const [filter, setFilter] = useState('Todos');
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            id: 1,
            title: "Ruth Vieira",
            category: "Social Media",
            images: [
                "https://i.imgur.com/xOwfKFJ.png",
                "https://i.imgur.com/kT3qIxK.png",
                "https://i.imgur.com/OPyA2tR.png",
                "https://i.imgur.com/b7aeSQc.png",
                "https://i.imgur.com/Mai8oI6.png",
                "https://i.imgur.com/4kUNEod.png",
                "https://i.imgur.com/q2v8aaI.png",
                "https://i.imgur.com/2lomXpT.mp4"
            ],
            desc: "Gestão completa de Instagram, Facebook e WhatsApp. Veja algumas fotos desse projeto!",
            tags: ["Instagram", "Reels", "Copywriting"],
            details: {
                challenge: "A Ruth nos procurou porque não via resultado nas suas redes. Poucos comentários, poucos seguidores... Para uma pré-candidata ela precisava de mais visibilidade.",
                solution: "Criamos uma nova identidade visual, implementamos um calendário baseado nos horários de pico, e colocamos o engajamento - que antes tava em -13% - em mais de 30% durante o período de campanha e mais de 2000 seguidores em menos de 60 dias de maneira orgânica.",
                results: ["Crescimento de +40% no engajamento", "Aumento de Seguidores", "Viralização de 4 Reels locais"]
            }
        },
        {
            id: 2,
            title: "FD - 2024",
            category: "Social Media", "Consultoria de Marketing",
            images: [
                "https://i.imgur.com/jPjnIVx.png",
                "https://i.imgur.com/oe1pIQa.jpeg",
                "https://i.imgur.com/0uHR1h9.png",
                "https://i.imgur.com/xGom9sM.png",
                "https://i.imgur.com/GKvMzJe.png",
                "https://i.imgur.com/XZgTfGS.png",
                "https://i.imgur.com/caU9eDy.png",
                "https://i.imgur.com/CV9GW4n.png"
            ],
            desc: "Consultoria de Marketing e Posicionamento de Mercado, com gestão de Social Media (Meta) e desenvolvimento de ativos para Sales Enablement.",
            tags: ["Instagram", "Facebook", "Copywriting", "Marketing", "Sales Enablement"],
            details: {
                challenge: "A empresa precisava de uma presença mais destacada nas redes sociais, um melhor marketing interno e arquivos disponíveis para melhoria nas vendas de seus consultores.",
                solution: "Produzir um calendário de conteúdos alinhado com as necessidades da empresa para a divulgação nas redes sociais; produzir artigos visuais para os consultores da marca; auxiliar nas demandas internas para o grupo de vendas. Assim, garantimos um crescimento de interação tanto nas redes sociais como no resultado dos vendedores.",
                results: ["Crescimento de +30% no faturamento da empresa", "Aumento de interatividade e seguidores nas redes", "Melhor desempenho dos consultores com materiais de apresentação"]
                          }
        },
        {
            id: 3,
            title: "GBS Cursos",
            category: "Social Media", "Consultoria de Marketing",
            images: [
                "https://i.imgur.com/OqjOrgt.png",
                "https://i.imgur.com/WvBC3di.png",
                "https://i.imgur.com/YiaXEdi.png",
                "https://i.imgur.com/oXBUYFn.png",
                "https://i.imgur.com/4CIL3rq.png",
                "https://i.imgur.com/Bz3CNpe.png",
                "https://i.imgur.com/NkvdPs1.png",
                "https://i.imgur.com/eOjQefa.png",
                "https://i.imgur.com/zEhkWFf.png"
            ],
            desc: "Consultoria de Marketing com gestão de Social Media (Meta) para melhor comunicação e vendas.",
            tags: ["Instagram", "Facebook", "Copywriting", "Marketing"],
            details: {
                challenge: "A GBS é uma empresa que vende cursos preparatórios e estava insatisfeita com os resultados de interações online e a ausência de frequência das publicações.",
                solution: "Produzir um calendário de conteúdos alinhado com os cursos e produtos vendidos pela GBS e estabelecer ma presença digital em suas redes (interagindo com compartilhameentos, menções, comentários), além disso, produzir artes para comunicações innternas e vendas de produtos físicos (camisetas, bonés, garrafas).",
                results: ["Aumento de 80% na interatividade e seguidores nas redes", "Melhor conversão de dados e aderência aos cursos", "Melhora de 60% da visibilididade online da marca dentro da cidade"]
                          }
        },
        // Adicionar novos projetos
    ];

    const categories = ["Todos", "Social Media", "Identidade Visual", "Consultoria de Marketing", "Consultoria de Processos", "Gráfica"];

    const filteredProjects = filter === 'Todos' 
        ? projects 
        : projects.filter(p => p.category === filter);

    return (
        <section className="pt-32 pb-20 bg-tech-grid min-h-screen relative">
            <div className="container mx-auto px-6">
                {/* Header da Página */}
                <div className="mb-12">
                    <button 
                        onClick={() => onNavigate('home')} 
                        className="flex items-center gap-2 text-gray-500 hover:text-[#4a148c] font-bold mb-6 transition-colors group"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Voltar para Home
                    </button>
                    
                    <h2 className="font-display font-black text-4xl md:text-6xl text-[#1a1a1a] mb-4">
                        NOSSOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4a148c] to-[#ff0080]">PROJETOS</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl text-lg">
                        Confira como aplicamos nossa metodologia em projetos reais. Resultados que falam por si só.
                    </p>
                </div>

                {/* Filtros */}
                <div className="flex flex-wrap gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-5 py-2 rounded-full font-bold text-sm transition-all border-2 
                                ${filter === cat 
                                    ? 'bg-[#4a148c] text-white border-[#4a148c] shadow-[4px_4px_0px_#ffd600]' 
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#4a148c] hover:text-[#4a148c]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid de Projetos */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
                            {/* Imagem do Projeto (Capa) */}
                            <div className="h-48 overflow-hidden relative cursor-pointer" onClick={() => setSelectedProject(project)}>
                                <div className="absolute inset-0 bg-[#4a148c]/20 group-hover:bg-transparent transition-colors z-10"></div>
                                <img 
                                    src={project.images[0]} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-[#4a148c]">
                                    {project.category}
                                </div>
                            </div>
                            
                            {/* Conteúdo do Card */}
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="font-display font-bold text-2xl text-[#1a1a1a] mb-2 group-hover:text-[#ff0080] transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
                                    {project.desc}
                                </p>
                                
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wide bg-gray-50 text-gray-500 px-2 py-1 rounded border border-gray-100">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <button 
                                    onClick={() => setSelectedProject(project)}
                                    className="w-full py-3 rounded-lg border-2 border-[#1a1a1a] font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-[#1a1a1a] group-hover:text-[#ffd600] transition-all"
                                >
                                    Ver Case Completo <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL DE PROJETO COM GALERIA */}
            {selectedProject && (
                <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
        </section>
    );
};

// Componente Modal Detalhado (Mantido)
const ProjectModal = ({ project, onClose }) => {
    // ... [Mesmo código da versão anterior com Galeria Automática]
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                setActiveImageIndex((prev) => (prev + 1) % project.images.length);
            }, 2500);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, project.images.length]);

    const nextImage = () => {
        setActiveImageIndex((prev) => (prev + 1) % project.images.length);
        setIsAutoPlaying(false);
    };

    const prevImage = () => {
        setActiveImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
        setIsAutoPlaying(false);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
            <div 
                className="absolute inset-0 bg-[#1a1a1a]/80 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative z-10 animate-slide-up shadow-2xl border-4 border-[#1a1a1a] flex flex-col md:flex-row">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors border border-gray-200"
                >
                    <X size={24} className="text-[#1a1a1a]" />
                </button>

                <div className="md:w-1/2 bg-gray-100 relative flex flex-col">
                    <div className="relative flex-grow h-64 md:h-auto overflow-hidden group">
                        <img 
                            src={project.images[activeImageIndex]} 
                            alt={`Slide ${activeImageIndex}`} 
                            className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 to-transparent flex flex-col justify-end p-8 md:hidden">
                            <h2 className="text-white font-display font-bold text-3xl">{project.title}</h2>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur hover:bg-white flex items-center justify-center text-white hover:text-black opacity-0 group-hover:opacity-100 transition-all"><ChevronLeft size={20} /></button>
                        <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur hover:bg-white flex items-center justify-center text-white hover:text-black opacity-0 group-hover:opacity-100 transition-all"><ChevronRight size={20} /></button>
                        {isAutoPlaying && <div className="absolute bottom-0 left-0 h-1 bg-[#ffd600] animate-progress z-10"></div>}
                    </div>
                    <div className="p-4 bg-[#1a1a1a] flex gap-2 overflow-x-auto justify-center">
                        {project.images.map((img, idx) => (
                            <button key={idx} onClick={() => { setActiveImageIndex(idx); setIsAutoPlaying(false); }} className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-[#ffd600] scale-105 opacity-100' : 'border-transparent opacity-50 hover:opacity-80'}`}>
                                <img src={img} alt="thumb" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
                    <div className="hidden md:block mb-6">
                        <span className="bg-[#ffd600] text-[#1a1a1a] px-3 py-1 text-xs font-bold uppercase tracking-widest rounded mb-2 inline-block">
                            {project.category}
                        </span>
                        <h2 className="font-display font-black text-4xl text-[#1a1a1a] mb-2">{project.title}</h2>
                        <div className="flex gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-xs text-gray-500 font-bold">#{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div><h3 className="flex items-center gap-2 font-bold text-[#ff0080] mb-2 uppercase tracking-wide text-sm"><Target size={18} /> O Desafio</h3><p className="text-gray-700 leading-relaxed">{project.details?.challenge}</p></div>
                        <div><h3 className="flex items-center gap-2 font-bold text-[#4a148c] mb-2 uppercase tracking-wide text-sm"><Zap size={18} /> A Solução</h3><p className="text-gray-700 leading-relaxed">{project.details?.solution}</p></div>
                        <div className="bg-[#f8fafc] p-6 rounded-xl border border-gray-100"><h3 className="flex items-center gap-2 font-bold text-[#00e676] mb-4 uppercase tracking-wide text-sm"><TrendingUp size={18} /> Resultados</h3><ul className="space-y-3">{project.details?.results.map((result, idx) => (<li key={idx} className="flex items-start gap-3 text-gray-700 text-sm"><div className="min-w-[20px] pt-1"><div className="w-5 h-5 rounded-full bg-[#00e676]/20 flex items-center justify-center"><Check size={12} className="text-[#00e676] stroke-[3px]" /></div></div>{result}</li>))}</ul></div>
                    </div>
                    <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center">
                        <p className="text-sm text-gray-400 font-mono">Gostou desse case?</p>
                        <button className="bg-[#1a1a1a] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-[#ff0080] transition-colors flex items-center gap-2">
                            Quero algo assim <Rocket size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- NAVEGAÇÃO ATUALIZADA (Recebe onOpenBriefing) ---
const Navbar = ({ onNavigate, currentView, onOpenBriefing }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => { setScrolled(window.scrollY > 20); };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = (target) => {
        setIsOpen(false);
        if (target === 'projetos') onNavigate('projetos');
        else onNavigate('home', target);
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('home', 'home')}>
                    {/* LOGO NA NAVBAR */}
                    <img 
                        src="https://i.imgur.com/i3aRzWc.png" 
                        alt="SK Marketing" 
                        className="h-12 object-contain" 
                    />
                </div>

                <div className="hidden md:flex gap-8 items-center">
                    {[
                        { label: 'Serviços', target: 'servicos' },
                        { label: 'Projetos', target: 'projetos' },
                        { label: 'A Agência', target: 'vibe' },
                        { label: 'Contato', target: 'contato' }
                    ].map((item) => (
                        <button key={item.label} onClick={() => handleLinkClick(item.target)} className={`text-sm font-bold transition-colors relative group ${currentView === 'projetos' && item.target === 'projetos' ? 'text-[#4a148c]' : 'text-gray-600 hover:text-[#4a148c]'}`}>
                            {item.label}
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#ff0080] transition-all ${currentView === 'projetos' && item.target === 'projetos' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                        </button>
                    ))}
                    <button onClick={onOpenBriefing} className="bg-[#ffd600] text-[#1a1a1a] px-6 py-2.5 rounded-lg font-bold text-sm shadow-[4px_4px_0px_#1a1a1a] border-2 border-[#1a1a1a] hover:bg-[#ffea00] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a1a1a] transition-all">
                        Iniciar Projeto
                    </button>
                </div>

                <button className="md:hidden text-[#1a1a1a]" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>
            
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 shadow-xl animate-in slide-in-from-top-5">
                    <div className="flex flex-col gap-4">
                        {[
                            { label: 'Serviços', target: 'servicos' },
                            { label: 'Projetos', target: 'projetos' },
                            { label: 'A Agência', target: 'vibe' },
                            { label: 'Contato', target: 'contato' }
                        ].map((item) => (
                            <button key={item.label} onClick={() => handleLinkClick(item.target)} className="text-left text-lg font-medium text-gray-800 hover:text-[#4a148c] py-2 border-b border-gray-50">{item.label}</button>
                        ))}
                        <button onClick={() => { setIsOpen(false); onOpenBriefing(); }} className="bg-[#ffd600] text-[#1a1a1a] w-full py-3 rounded-lg font-bold shadow-[4px_4px_0px_#1a1a1a] border-2 border-[#1a1a1a] mt-4">Iniciar Projeto</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

// Hero atualizado (Recebe onOpenBriefing)
const Hero = ({ onNavigate, onOpenBriefing }) => {
    return (
        <section id="home" className="relative pt-32 pb-20 overflow-hidden bg-tech-grid min-h-[95vh] flex items-center">
            {/* ... Elementos de fundo ... */}
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#ffd600] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ff0080] rounded-full mix-blend-multiply filter blur-[100px] opacity-10"></div>
            <div className="absolute top-40 left-40 w-[200px] h-[200px] bg-[#00e676] rounded-full mix-blend-multiply filter blur-[80px] opacity-15"></div>

            <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8 relative">
                    <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-1.5 rounded-full shadow-sm">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e676] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00e676]"></span>
                        </span>
                        <span className="text-gray-600 text-xs font-bold tracking-wide uppercase">Soluções de Comunicação</span>
                    </div>
                    
                    <h1 className="font-display font-black text-5xl md:text-7xl text-[#1a1a1a] leading-[1.05]">
                        SUA MARCA <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4a148c] to-[#ff0080]">MERECE MAIS</span> <br />
                        <span className="relative inline-block z-10">
                            DO QUE O BÁSICO
                            <svg className="absolute w-[110%] h-4 -bottom-2 -left-2 text-[#ffd600] -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                            </svg>
                        </span>
                    </h1>
                    
                    <p className="text-lg text-gray-600 max-w-lg leading-relaxed border-l-4 border-[#ff0080] pl-6">
                        Comunique o que quiser! Transformamos sua empresa em uma referência visual e estratégica, desde o operacional à apresentação Social. Faça parte da mudança: Comunique!
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button onClick={onOpenBriefing} className="bg-[#4a148c] text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 group shadow-[6px_6px_0px_#ffd600] border-2 border-[#4a148c] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                            Quero Ser Visto 
                            <Rocket size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"/>
                        </button>
                        <button onClick={() => onNavigate('projetos')} className="bg-white text-[#1a1a1a] border-2 border-[#1a1a1a] px-8 py-4 rounded-lg font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                            Ver Projetos <Zap size={20} className="text-[#ffd600] fill-[#ffd600]" />
                        </button>
                    </div>
                </div>
                {/* ... Resto do Hero (Card Flutuante) ... */}
                <div className="relative hidden lg:block h-full min-h-[500px] w-full">
                    {/* Alterado para left-[45%] conforme pedido */}
                    <div className="absolute top-[45%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] xl:w-[450px] xl:h-[450px] border border-dashed border-[#4a148c]/20 rounded-full animate-spin-slow"></div>
                    
                    <div className="absolute top-[45%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-72 xl:w-80 bg-white rounded-2xl border-2 border-[#1a1a1a] shadow-[12px_12px_0px_#4a148c] p-6 z-20 animate-float">
                        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#ffd600] rounded-full border-2 border-[#1a1a1a] flex items-center justify-center"><Smile size={20} className="text-[#1a1a1a]" /></div>
                                <div><div className="font-bold text-sm">Status da Marca</div><div className="text-xs text-[#00e676] font-bold flex items-center gap-1"><div className="w-2 h-2 bg-[#00e676] rounded-full animate-pulse"></div> Online</div></div>
                            </div>
                            <Code size={20} className="text-gray-300" />
                        </div>
                        <div className="space-y-4">
                            <div className="bg-[#f8fafc] p-3 rounded-lg border border-gray-100 relative overflow-hidden group hover:border-[#ff0080] transition-colors">
                                <div className="flex justify-between items-center mb-2 relative z-10"><span className="text-xs font-bold text-gray-500">ENGAJAMENTO</span><TrendingUp size={16} className="text-[#ff0080]" /></div>
                                <div className="text-2xl font-display font-bold text-[#1a1a1a] relative z-10">+ 840%</div>
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200"><div className="h-full bg-[#ff0080] w-[85%]"></div></div>
                            </div>
                            <div className="bg-[#f8fafc] p-3 rounded-lg border border-gray-100 relative overflow-hidden group hover:border-[#00e676] transition-colors">
                                <div className="flex justify-between items-center mb-2 relative z-10"><span className="text-xs font-bold text-gray-500">QUALIDADE VISUAL</span><Sparkles size={16} className="text-[#00e676]" /></div>
                                <div className="text-2xl font-display font-bold text-[#1a1a1a] relative z-10">Ultra HD</div>
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200"><div className="h-full bg-[#00e676] w-[98%]"></div></div>
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-xs text-gray-400 font-mono">ID: SK-2026</span>
                            <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-[#ff0080]"></div><div className="w-2 h-2 rounded-full bg-[#ffd600]"></div><div className="w-2 h-2 rounded-full bg-[#4a148c]"></div></div>
                        </div>
                    </div>

                    <div className="absolute top-[20%] right-[15%] glass-card p-3 rounded-xl border border-[#ff0080]/30 shadow-lg animate-float-delay z-30">
                        <Megaphone size={24} className="text-[#ff0080]" />
                    </div>
                    <div className="absolute bottom-[30%] left-[20%] glass-card p-3 rounded-xl border border-[#00e676]/30 shadow-lg animate-float z-30" style={{animationDelay: '1.5s'}}>
                        <Printer size={24} className="text-[#00e676]" />
                    </div>
                </div>
            </div>
        </section>
    );
};

// ... Services, Vibe, Contact components permanecem iguais ...
const Services = () => {
    // ... Mesmo código
    const services = [
        { icon: <Target size={32} />, title: "Consultoria de Marketing", desc: "Estratégia afiada. Paramos de chutar e começamos a acertar o alvo.", color: "text-[#ff0080]", bgClass: "bg-[#ff0080]/5", borderClass: "border-[#ff0080]/20", hoverColor: "hover:border-[#ff0080]" },
        { icon: <Cpu size={32} />, title: "Gerenciamento de Automações & Processos", desc: "Organização tão estruturada quanto uma torre de desafios. Sua empresa 'rodando liso', sem problemas internos.", color: "text-[#00e676]", bgClass: "bg-[#00e676]/5", borderClass: "border-[#00e676]/20", hoverColor: "hover:border-[#00e676]" },
        { icon: <MessageCircle size={32} />, title: "Social Media", desc: "Conteúdo que engaja. Transformamos seguidores em fãs leais.", color: "text-[#4a148c]", bgClass: "bg-[#4a148c]/5", borderClass: "border-[#4a148c]/20", hoverColor: "hover:border-[#4a148c]" },
        { icon: <Monitor size={32} />, title: "Web Design", desc: "Sites rápidos e landing pages que convertem visitantes em clientes.", color: "text-[#dcb000]", bgClass: "bg-[#ffd600]/10", borderClass: "border-[#ffd600]/30", hoverColor: "hover:border-[#ffd600]" },
        { icon: <Printer size={32} />, title: "Gráfica & Print", desc: "Cartões e banners. A qualidade da sua marca no mundo físico.", color: "text-[#ff0080]", bgClass: "bg-[#ff0080]/5", borderClass: "border-[#ff0080]/20", hoverColor: "hover:border-[#ff0080]" },
        { icon: <Palette size={32} />, title: "Identidade Visual", desc: "Logotipos e manuais. Criamos a skin lendária do seu negócio.", color: "text-[#00e676]", bgClass: "bg-[#00e676]/5", borderClass: "border-[#00e676]/20", hoverColor: "hover:border-[#00e676]" }
    ];
    return (
        <section id="servicos" className="py-24 relative">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16"><span className="text-[#ff0080] font-bold text-sm tracking-wider uppercase mb-2 block">Nosso Arsenal</span><h2 className="font-display font-bold text-4xl text-[#1a1a1a] mb-6">Ferramentas para <span className="relative inline-block px-2"><span className="absolute inset-0 bg-[#ffd600] -skew-x-6 opacity-30"></span><span className="relative">evoluir</span></span> seu negócio</h2></div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{services.map((service, index) => (<div key={index} className={`p-8 ${service.bgClass} rounded-2xl border-2 ${service.borderClass} shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${service.hoverColor} group cursor-default relative overflow-hidden`}><div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 ${service.bgClass.replace('/5', '/30').replace('/10', '/40')}`}></div><div className={`w-14 h-14 bg-white border border-white/50 rounded-xl flex items-center justify-center mb-6 ${service.color} shadow-sm group-hover:scale-110 transition-transform`}>{service.icon}</div><h3 className="font-display font-bold text-xl text-[#1a1a1a] mb-3">{service.title}</h3><p className="text-gray-700 leading-relaxed text-sm font-medium">{service.desc}</p><div className="absolute bottom-6 right-6 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all"><ArrowRight size={20} className={service.color} /></div></div>))}</div>
            </div>
        </section>
    );
};

const Vibe = () => {
    // ... Mesmo código
    return (
        <section id="vibe" className="py-24 bg-[#1a1a1a] relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4a148c] rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ff0080] rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
                <div>
                    <div className="inline-flex items-center gap-2 mb-6"><span className="w-8 h-[2px] bg-[#00e676]"></span><span className="text-[#00e676] font-mono text-sm tracking-widest uppercase">System_Vibe.exe</span></div>
                    <h2 className="font-display font-black text-4xl md:text-6xl mb-8 leading-tight">NÃO SOMOS <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd600] to-[#ff0080]">NPCs.</span></h2>
                    <div className="space-y-6 text-lg text-gray-300 font-light leading-relaxed"><p>A SK nasceu para quebrar o gelo corporativo. Acreditamos que o profissionalismo não precisa ser cinza e monótono.</p><p>Misturamos a paixão pela <strong className="text-white">cultura pop e tecnologia</strong> com a seriedade que o seu negócio exige. Tratamos sua marca como um personagem principal que precisa evoluir de nível.</p></div>
                    <div className="mt-10 flex flex-wrap gap-3">{['#Modernidade', '#Geek', '#Estilo', '#Criatividade'].map((tag, i) => (<span key={tag} className={`px-4 py-2 border rounded-full text-sm font-bold transition-all cursor-default hover:bg-white hover:text-black hover:border-white ${i % 2 === 0 ? 'border-[#ff0080] text-[#ff0080]' : 'border-[#00e676] text-[#00e676]'}`}>{tag}</span>))}</div>
                </div>
                <div className="relative">
                    <div className="bg-[#262626] border border-gray-700 p-8 rounded-2xl relative transform rotate-2 hover:rotate-0 transition-transform duration-500 shadow-[0_0_30px_rgba(74,20,140,0.3)]">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff0080] via-[#ffd600] to-[#00e676]"></div>
                        <div className="flex justify-between items-start mb-6"><QuoteIcon /><div className="flex gap-1"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div></div></div>
                        <p className="text-white text-xl font-medium mb-6 leading-relaxed">"Em um mundo de templates prontos, nós escolhemos customizar. Sua marca não é apenas mais uma na fila de renderização. Ela é o <span className="text-[#ffd600]">Main Character</span>."</p>
                        
                        <div className="flex items-center gap-4 border-t border-gray-700 pt-4">
                            {/* LOGO NO QUADRADINHO */}
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-[#ffd600] overflow-hidden">
                                <img 
                                    src="https://i.imgur.com/WgyUGkb.png" 
                                    alt="SK Logo" 
                                    className="w-full h-full object-cover" 
                                />
                            </div>
                            <div>
                                <div className="font-bold text-white text-sm">Time SK</div>
                                <div className="text-xs text-gray-400">Desde 2022</div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-4 left-4 w-full h-full border-2 border-[#4a148c] rounded-2xl -z-10"></div>
                </div>
            </div>
        </section>
    );
};

const Contact = () => {
    // ... Mesmo código
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const handleSubmit = (e) => { e.preventDefault(); alert(`Mensagem enviada! (Simulação)\nNome: ${formState.name}\nObrigado por contatar a SK!`); setFormState({ name: '', email: '', message: '' }); };
    return (
        <section id="contato" className="py-24 bg-tech-grid">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border-2 border-[#1a1a1a]">
                    <div className="md:w-2/5 bg-[#4a148c] text-white p-10 flex flex-col justify-between relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-[#ffd600] rounded-xl flex items-center justify-center text-[#4a148c] mb-8 shadow-lg border-2 border-white"><Smile size={28} /></div>
                            <h3 className="font-display font-bold text-3xl mb-4">Vamos desbloquear o próximo nível?</h3>
                            <p className="text-purple-200 mb-8 leading-relaxed">Preencha o formulário e nossa equipe entrará em contato mais rápido que um processador de última geração.</p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-sm font-bold hover:text-[#ffd600] transition-colors cursor-pointer group"><div className="p-2 bg-white/10 rounded-lg group-hover:bg-[#ffd600] group-hover:text-[#4a148c] transition-colors"><MessageCircle size={18} /></div>skmarketingecomunicacao@gmail.com</div>
                                <div className="flex items-center gap-4 text-sm font-bold hover:text-[#ffd600] transition-colors cursor-pointer group"><div className="p-2 bg-white/10 rounded-lg group-hover:bg-[#ffd600] group-hover:text-[#4a148c] transition-colors"><Instagram size={18} /></div>skcomunique</div>
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#ff0080] rounded-full opacity-50 blur-3xl"></div>
                        <div className="absolute top-10 -left-10 w-32 h-32 bg-[#00e676] rounded-full opacity-30 blur-2xl"></div>
                    </div>
                    <div className="md:w-3/5 p-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Seu Nome</label><input type="text" required className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-lg focus:bg-white focus:border-[#4a148c] focus:ring-0 outline-none transition-all font-medium" placeholder="Ex: Tony Stark" value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} /></div>
                            <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">E-mail</label><input type="email" required className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-lg focus:bg-white focus:border-[#ff0080] focus:ring-0 outline-none transition-all font-medium" placeholder="seu@email.com" value={formState.email} onChange={(e) => setFormState({...formState, email: e.target.value})} /></div>
                            <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Missão</label><textarea required rows="3" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-lg focus:bg-white focus:border-[#00e676] focus:ring-0 outline-none transition-all resize-none font-medium" placeholder="Preciso de um upgrade na minha marca..." value={formState.message} onChange={(e) => setFormState({...formState, message: e.target.value})} ></textarea></div>
                            <button type="submit" className="w-full bg-[#1a1a1a] text-white font-bold py-4 rounded-lg hover:bg-[#ff0080] transition-colors shadow-lg flex justify-center items-center gap-2 group">Enviar Mensagem <Zap size={18} className="text-[#ffd600] group-hover:text-white" /></button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 py-10 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4a148c] via-[#ff0080] to-[#ffd600]"></div>
             
            <div className="container mx-auto px-6 text-center relative z-10">
                <div className="flex justify-center items-center gap-3 mb-4">
                     {/* LOGO NO RODAPÉ */}
                     <img 
                        src="https://i.imgur.com/i3aRzWc.png" 
                        alt="SK Marketing" 
                        className="h-14 object-contain" 
                    />
                </div>
                <p className="text-gray-500 text-sm mb-6">
                    © 2026 SK Comunique!. Feito para quem não aceita o básico.
                </p>
                <div className="flex justify-center gap-4 text-gray-400">
                    <a href="https://www.instagram.com/skcomunique/" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-colors cursor-pointer border border-transparent hover:border-[#1a1a1a] group" title="Siga no Instagram">
                        <Instagram size={18} />
                    </a>
                    
                    <a href="https://www.linkedin.com/company/sk-comunique/" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-colors cursor-pointer border border-transparent hover:border-[#1a1a1a]" title="Conecte-se no LinkedIn">
                        <Linkedin size={18} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

const QuoteIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-[#ffd600]">
        <path d="M10 11H6C5.46957 11 4.96086 10.7893 4.58579 10.4142C4.21071 10.0391 4 9.53043 4 9V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H8C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7V11ZM10 11V13C10 14.8565 9.2625 16.637 7.94975 17.9497C6.637 19.2625 4.85652 20 3 20M20 11H16C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9V7C14 6.46957 14.2107 5.96086 14.5858 5.58579C14.9609 5.21071 15.4696 5 16 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V11ZM20 11V13C20 14.8565 19.2625 16.637 17.9497 17.9497C16.637 19.2625 14.8565 20 13 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


export default App;









