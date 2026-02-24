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
            /* Roxo RGB: 74, 20, 140 -> #4A148C */
            --sk-purple: #4A148C;
            /* Amarelo RGB: 255, 214, 0 -> #FFD600 */
            --sk-yellow: #FFD600;
            /* Rosa RGB: 218, 0, 249 -> #DA00F9 */
            --sk-pink: #DA00F9;
            /* Verde RGB: 141, 255, 79 -> #8DFF4F */
            --sk-green: #8DFF4F;
            /* Preto RGB: 0, 0, 0 -> #000000 */
            --sk-dark: #000000;
            /* Branca RGB: 245, 245, 246 -> #F5F5F6 */
            --sk-light: #F5F5F6;
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
        
        /* Ocultar barra de rolagem em galerias */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    `;

    return (
        <div className="font-sans text-gray-900 antialiased selection:bg-[#DA00F9] selection:text-white min-h-screen flex flex-col">
            <style>{globalStyles}</style>
            
            <Navbar onNavigate={handleNavigate} currentView={currentView} onOpenBriefing={() => toggleBriefing('Social Media')} />
            
            <main className="flex-grow">
                {currentView === 'home' ? (
                    <>
                        <Hero onNavigate={handleNavigate} onOpenBriefing={() => toggleBriefing('Social Media')} />
                        {/* Passei a função toggleBriefing para o Services para abrir o modal correto */}
                        <Services onOpenBriefing={toggleBriefing} />
                        <Vibe />
                        <Contact />
                    </>
                ) : (
                    <ProjectsPage onNavigate={handleNavigate} />
                )}
            </main>

            <Footer />

            {/* Modal de Briefing */}
            {isBriefingOpen && <BriefingModal onClose={closeBriefing} initialService={selectedServiceForBriefing} />}
        </div>
    );
};

// --- COMPONENTE MODAL DE BRIEFING ---
const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 py-10 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4A148C] via-[#DA00F9] to-[#FFD600]"></div>
             
            <div className="container mx-auto px-6 text-center relative z-10">
                <div className="flex justify-center items-center gap-3 mb-4">
                     {/* LOGO NO RODAPÉ */}
                     <img 
                        src="https://placehold.co/150x50?text=LOGO+SK" 
                        alt="SK Marketing" 
                        className="h-14 object-contain" 
                    />
                </div>
                <p className="text-gray-500 text-sm mb-6">
                    © 2026 SK Soluções de Marketing. Feito para quem não aceita o básico.
                </p>
                <div className="flex justify-center gap-4 text-gray-400">
                    {/* LINKS DO RODAPÉ - SUBSTITUA OS LINKS AQUI */}
                    <a href="https://instagram.com/skmarketingecomunicacao" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-colors cursor-pointer border border-transparent hover:border-[#000000] group" title="Siga no Instagram">
                        <Instagram size={18} />
                    </a>
                    
                    <a href="https://linkedin.com/in/seu_perfil" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-colors cursor-pointer border border-transparent hover:border-[#000000]" title="Conecte-se no LinkedIn">
                        <Linkedin size={18} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const handleSubmit = (e) => { e.preventDefault(); alert(`Mensagem enviada! (Simulação)\nNome: ${formState.name}\nObrigado por contatar a SK!`); setFormState({ name: '', email: '', message: '' }); };
    return (
        <section id="contato" className="py-24 bg-tech-grid">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border-2 border-[#000000]">
                    <div className="md:w-2/5 bg-[#4A148C] text-white p-10 flex flex-col justify-between relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-[#FFD600] rounded-xl flex items-center justify-center text-[#4A148C] mb-8 shadow-lg border-2 border-white"><Smile size={28} /></div>
                            <h3 className="font-display font-bold text-3xl mb-4">Vamos desbloquear o próximo nível?</h3>
                            <p className="text-purple-200 mb-8 leading-relaxed">Preencha o formulário e nossa equipe entrará em contato mais rápido que um processador de última geração.</p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-sm font-bold hover:text-[#FFD600] transition-colors cursor-pointer group"><div className="p-2 bg-white/10 rounded-lg group-hover:bg-[#FFD600] group-hover:text-[#4A148C] transition-colors"><MessageCircle size={18} /></div>skmarketing@gmail.com</div>
                                <div className="flex items-center gap-4 text-sm font-bold hover:text-[#FFD600] transition-colors cursor-pointer group"><div className="p-2 bg-white/10 rounded-lg group-hover:bg-[#FFD600] group-hover:text-[#4A148C] transition-colors"><Layout size={18} /></div>skcomunique.com.br</div>
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#DA00F9] rounded-full opacity-50 blur-3xl"></div>
                        <div className="absolute top-10 -left-10 w-32 h-32 bg-[#8DFF4F] rounded-full opacity-30 blur-2xl"></div>
                    </div>
                    <div className="md:w-3/5 p-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Seu Nome</label><input type="text" required className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-lg focus:bg-white focus:border-[#4A148C] focus:ring-0 outline-none transition-all font-medium" placeholder="Ex: Tony Stark" value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} /></div>
                            <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">E-mail</label><input type="email" required className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-lg focus:bg-white focus:border-[#DA00F9] focus:ring-0 outline-none transition-all font-medium" placeholder="seu@email.com" value={formState.email} onChange={(e) => setFormState({...formState, email: e.target.value})} /></div>
                            <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Missão</label><textarea required rows="3" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-lg focus:bg-white focus:border-[#8DFF4F] focus:ring-0 outline-none transition-all resize-none font-medium" placeholder="Preciso de um upgrade na minha marca..." value={formState.message} onChange={(e) => setFormState({...formState, message: e.target.value})} ></textarea></div>
                            <button type="submit" className="w-full bg-[#000000] text-white font-bold py-4 rounded-lg hover:bg-[#DA00F9] transition-colors shadow-lg flex justify-center items-center gap-2 group">Enviar Mensagem <Zap size={18} className="text-[#FFD600] group-hover:text-white" /></button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

const BriefingModal = ({ onClose, initialService }) => {
    const [step, setStep] = useState(1);
    // Inicializa o serviço com o que foi clicado
    const [serviceType, setServiceType] = useState(initialService || 'Social Media');
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        budget: 'Não tenho certeza',
        q1: '', q2: '', q3: '', q4: '', q5: ''
    });

    // Atualiza o serviceType se a prop mudar (garantia extra)
    useEffect(() => {
        if (initialService) setServiceType(initialService);
    }, [initialService]);

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
                        {/* Sidebar Decorativa (ROSA DA MARCA) */}
                        <div className="hidden md:flex w-1/3 bg-[#DA00F9] p-8 flex-col justify-between text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="w-10 h-10 bg-[#FFD600] rounded-lg flex items-center justify-center text-[#DA00F9] font-bold mb-6 border-2 border-[#000000]">SK</div>
                                <h3 className="font-display font-bold text-3xl mb-4 leading-tight">Bora tirar esse projeto do papel?</h3>
                                <p className="text-white text-sm font-medium">Preencha o briefing ao lado para nossa equipe entender sua missão com clareza.</p>
                            </div>
                            
                            <div className="relative z-10 space-y-6 mt-8">
                                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-md border border-white/20">
                                    <div className="flex items-center gap-2 font-bold mb-1 text-[#FFD600]"><Zap size={16} /> Fast Track</div>
                                    <p className="text-xs text-white/90">Briefing detalhado agiliza nosso orçamento em até 50%.</p>
                                </div>
                                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-md border border-white/20">
                                    <div className="flex items-center gap-2 font-bold mb-1 text-[#8DFF4F]"><Check size={16} /> Especialistas</div>
                                    <p className="text-xs text-white/90">Sua resposta vai direto para o especialista da área.</p>
                                </div>
                            </div>

                            <div className="absolute top-0 right-0 w-40 h-40 bg-[#4A148C] rounded-full blur-3xl opacity-40 translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#FFD600] rounded-full blur-3xl opacity-30 -translate-x-1/2 translate-y-1/2"></div>
                        </div>

                        {/* Formulário */}
                        <div className="w-full md:w-2/3 p-8 md:p-10 bg-white">
                            <div className="mb-6 border-b border-gray-100 pb-4">
                                <h2 className="font-display font-black text-3xl text-[#000000]">Briefing Tático</h2>
                                <p className="text-gray-500 text-sm">Focando em: <span className="font-bold text-[#DA00F9]">{serviceType}</span></p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Seu Nome</label>
                                        <input required type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#DA00F9] focus:ring-0 outline-none transition-all font-medium" placeholder="Ex: Tony Stark" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Empresa / Marca</label>
                                        <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#DA00F9] focus:ring-0 outline-none transition-all font-medium" placeholder="Ex: Stark Ind." value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Área do Projeto</label>
                                        <div className="relative">
                                            <select 
                                                className="w-full p-3 bg-[#F5F5F6] border-2 border-[#000000] rounded-lg focus:border-[#DA00F9] focus:ring-0 outline-none transition-all appearance-none cursor-pointer font-bold text-[#000000]"
                                                value={serviceType}
                                                onChange={(e) => {
                                                    setServiceType(e.target.value);
                                                    setFormData(prev => ({...prev, q1:'', q2:'', q3:'', q4:'', q5:''}));
                                                }}
                                            >
                                                {Object.keys(questionsByService).map(s => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <ChevronLeft size={16} className="-rotate-90 text-[#000000]" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Verba Estimada</label>
                                        <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#DA00F9] focus:ring-0 outline-none transition-all appearance-none cursor-pointer" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})}>
                                            <option>Não tenho certeza</option>
                                            <option>Até R$ 1.000</option>
                                            <option>R$ 1.000 - R$ 3.000</option>
                                            <option>R$ 3.000 - R$ 5.000</option>
                                            <option>Acima de R$ 5.000</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="bg-[#F5F5F6] p-6 rounded-xl border border-gray-100 space-y-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles size={18} className="text-[#DA00F9]" />
                                        <h4 className="font-bold text-[#000000] text-sm uppercase tracking-wide">Detalhes: {serviceType}</h4>
                                    </div>
                                    
                                    {currentQuestions.map((q, idx) => {
                                        const key = `q${idx + 1}`;
                                        return (
                                            <div key={idx}>
                                                <label className="block text-xs font-bold text-gray-600 mb-1.5">{idx + 1}. {q}</label>
                                                <input type="text" required className="w-full p-2.5 bg-white border border-gray-200 rounded focus:border-[#DA00F9] focus:ring-1 focus:ring-[#DA00F9] outline-none transition-all text-sm" placeholder="Sua resposta aqui..." value={formData[key]} onChange={(e) => setFormData({...formData, [key]: e.target.value})} />
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Botão VERDE NEON conforme pedido */}
                                <button type="submit" className="w-full bg-[#8DFF4F] text-[#000000] font-black uppercase tracking-widest py-4 rounded-xl hover:bg-[#7ce644] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 shadow-[0_4px_0px_#000000] active:translate-y-0 active:shadow-none border-2 border-[#000000]">
                                    Enviar Briefing <Send size={20} />
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="p-12 text-center flex flex-col items-center justify-center min-h-[500px] bg-tech-grid">
                        <div className="w-24 h-24 bg-[#8DFF4F] rounded-full flex items-center justify-center mb-6 animate-bounce shadow-[0_0_30px_rgba(141,255,79,0.4)] border-4 border-[#000000]">
                            <Check size={48} className="text-[#000000]" strokeWidth={4} />
                        </div>
                        <h2 className="font-display font-black text-4xl text-[#000000] mb-4">Briefing Recebido!</h2>
                        <p className="text-gray-600 mb-8 max-w-lg text-lg">
                            Analisamos suas respostas e já temos uma ideia de como atacar.
                            <br/><br/>
                            Clique abaixo para enviar esses dados para nosso WhatsApp e falar com um especialista agora mesmo.
                        </p>
                        
                        <a 
                            href={getWhatsAppLink()} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-[#25D366] text-white px-8 py-5 rounded-xl font-bold text-xl hover:bg-[#128C7E] transition-all flex items-center gap-3 shadow-[6px_6px_0px_#000000] border-2 border-[#000000] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000000]"
                        >
                            <MessageCircle size={28} />
                            Finalizar no WhatsApp
                        </a>
                        
                        <button onClick={onClose} className="mt-8 text-gray-400 hover:text-[#DA00F9] text-sm font-bold underline decoration-2 underline-offset-4">
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
            category: ["Social Media"],
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
            category: ["Social Media", "Consultoria de Marketing"],
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
            category: ["Social Media", "Consultoria de Marketing"],
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
    
    // AQUI: Atualizamos a lógica para o filtro buscar dentro da lista de categorias
    const filteredProjects = filter === 'Todos' ? projects : projects.filter(p => p.category.includes(filter));

    return (
        <section className="pt-32 pb-20 bg-tech-grid min-h-screen relative">
            <div className="container mx-auto px-6">
                <div className="mb-12">
                    <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-gray-500 hover:text-[#4A148C] font-bold mb-6 transition-colors group"><ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />Voltar para Home</button>
                    <h2 className="font-display font-black text-4xl md:text-6xl text-[#000000] mb-4">NOSSOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A148C] to-[#DA00F9]">PROJETOS</span></h2>
                    <p className="text-gray-600 max-w-2xl text-lg">Confira como aplicamos nossa metodologia geek em marcas reais. Resultados que falam por si só.</p>
                </div>
                <div className="flex flex-wrap gap-3 mb-12">{categories.map((cat) => (<button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-2 rounded-full font-bold text-sm transition-all border-2 ${filter === cat ? 'bg-[#4A148C] text-white border-[#4A148C] shadow-[4px_4px_0px_#FFD600]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#4A148C] hover:text-[#4A148C]'}`}>{cat}</button>))}</div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{filteredProjects.map((project) => (<div key={project.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"><div className="h-48 overflow-hidden relative cursor-pointer" onClick={() => setSelectedProject(project)}><div className="absolute inset-0 bg-[#4A148C]/20 group-hover:bg-transparent transition-colors z-10"></div><img src={project.images[0]} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                    
                    {/* AQUI: Renderiza as múltiplas etiquetas de categoria no card */}
                    <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
                        {project.category.map(cat => (
                            <div key={cat} className="bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-[#4A148C]">
                                {cat}
                            </div>
                        ))}
                    </div>
                
                </div><div className="p-6 flex flex-col flex-grow"><h3 className="font-display font-bold text-2xl text-[#000000] mb-2 group-hover:text-[#DA00F9] transition-colors">{project.title}</h3><p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">{project.desc}</p><div className="flex flex-wrap gap-2 mb-6">{project.tags.map(tag => (<span key={tag} className="text-[10px] font-bold uppercase tracking-wide bg-gray-50 text-gray-500 px-2 py-1 rounded border border-gray-100">#{tag}</span>))}</div><button onClick={() => setSelectedProject(project)} className="w-full py-3 rounded-lg border-2 border-[#000000] font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-[#000000] group-hover:text-[#FFD600] transition-all">Ver Case Completo <ArrowRight size={16} /></button></div></div>))}</div>
            </div>
            {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </section>
    );
};

const ProjectModal = ({ project, onClose }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => { const handleEsc = (e) => { if (e.key === 'Escape') onClose(); }; window.addEventListener('keydown', handleEsc); return () => window.removeEventListener('keydown', handleEsc); }, [onClose]);

    useEffect(() => {
        let interval;
        if (isAutoPlaying) { interval = setInterval(() => { setActiveImageIndex((prev) => (prev + 1) % project.images.length); }, 2500); }
        return () => clearInterval(interval);
    }, [isAutoPlaying, project.images.length]);

    const nextImage = () => { setActiveImageIndex((prev) => (prev + 1) % project.images.length); setIsAutoPlaying(false); };
    const prevImage = () => { setActiveImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length); setIsAutoPlaying(false); };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
            <div className="absolute inset-0 bg-[#000000]/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative z-10 animate-slide-up shadow-2xl border-4 border-[#000000] flex flex-col md:flex-row">
                <button onClick={onClose} className="absolute top-4 right-4 z-20 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors border border-gray-200"><X size={24} className="text-[#000000]" /></button>
                <div className="md:w-1/2 bg-gray-100 relative flex flex-col">
                    <div className="relative flex-grow h-64 md:h-auto overflow-hidden group">
                        <img src={project.images[activeImageIndex]} alt={`Slide ${activeImageIndex}`} className="w-full h-full object-cover transition-all duration-500 ease-in-out" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 to-transparent flex flex-col justify-end p-8 md:hidden"><h2 className="text-white font-display font-bold text-3xl">{project.title}</h2></div>
                        <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur hover:bg-white flex items-center justify-center text-white hover:text-black opacity-0 group-hover:opacity-100 transition-all"><ChevronLeft size={20} /></button>
                        <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur hover:bg-white flex items-center justify-center text-white hover:text-black opacity-0 group-hover:opacity-100 transition-all"><ChevronRight size={20} /></button>
                        {isAutoPlaying && <div className="absolute bottom-0 left-0 h-1 bg-[#FFD600] animate-progress z-10"></div>}
                    </div>
                    <div className="p-4 bg-[#000000] flex gap-2 overflow-x-auto justify-start scrollbar-hide">
                        {project.images.map((img, idx) => (<button key={idx} onClick={() => { setActiveImageIndex(idx); setIsAutoPlaying(false); }} className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${activeImageIndex === idx ? 'border-[#FFD600] scale-105 opacity-100' : 'border-transparent opacity-50 hover:opacity-80'}`}><img src={img} alt="thumb" className="w-full h-full object-cover" /></button>))}
                    </div>
                </div>
                <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
                    
                    {/* AQUI: Renderiza as múltiplas etiquetas no modal também */}
                    <div className="hidden md:block mb-6">
                        <div className="flex flex-wrap gap-2 mb-2">
                            {project.category.map(cat => (
                                <span key={cat} className="bg-[#FFD600] text-[#000000] px-3 py-1 text-xs font-bold uppercase tracking-widest rounded inline-block">{cat}</span>
                            ))}
                        </div>
                        <h2 className="font-display font-black text-4xl text-[#000000] mb-2">{project.title}</h2>
                        <div className="flex gap-2">{project.tags.map(tag => (<span key={tag} className="text-xs text-gray-500 font-bold">#{tag}</span>))}</div>
                    </div>
                    {/* BARRA DE MINIATURAS AJUSTADA PARA JUSTIFY-START */}
                    <div className="p-4 bg-[#000000] flex gap-2 overflow-x-auto justify-start scrollbar-hide">
                        {project.images.map((img, idx) => (<button key={idx} onClick={() => { setActiveImageIndex(idx); setIsAutoPlaying(false); }} className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${activeImageIndex === idx ? 'border-[#FFD600] scale-105 opacity-100' : 'border-transparent opacity-50 hover:opacity-80'}`}><img src={img} alt="thumb" className="w-full h-full object-cover" /></button>))}
                    </div>
                </div>
                <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
                    <div className="hidden md:block mb-6"><span className="bg-[#FFD600] text-[#000000] px-3 py-1 text-xs font-bold uppercase tracking-widest rounded mb-2 inline-block">{project.category}</span><h2 className="font-display font-black text-4xl text-[#000000] mb-2">{project.title}</h2><div className="flex gap-2">{project.tags.map(tag => (<span key={tag} className="text-xs text-gray-500 font-bold">#{tag}</span>))}</div></div>
                    <div className="space-y-8">
                        <div><h3 className="flex items-center gap-2 font-bold text-[#DA00F9] mb-2 uppercase tracking-wide text-sm"><Target size={18} /> O Desafio</h3><p className="text-gray-700 leading-relaxed">{project.details?.challenge}</p></div>
                        <div><h3 className="flex items-center gap-2 font-bold text-[#4A148C] mb-2 uppercase tracking-wide text-sm"><Zap size={18} /> A Solução</h3><p className="text-gray-700 leading-relaxed">{project.details?.solution}</p></div>
                        <div className="bg-[#F5F5F6] p-6 rounded-xl border border-gray-100"><h3 className="flex items-center gap-2 font-bold text-[#8DFF4F] mb-4 uppercase tracking-wide text-sm"><TrendingUp size={18} /> Resultados</h3><ul className="space-y-3">{project.details?.results.map((result, idx) => (<li key={idx} className="flex items-start gap-3 text-gray-700 text-sm"><div className="min-w-[20px] pt-1"><div className="w-5 h-5 rounded-full bg-[#8DFF4F]/20 flex items-center justify-center"><Check size={12} className="text-[#8DFF4F] stroke-[3px]" /></div></div>{result}</li>))}</ul></div>
                    </div>
                    <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center">
                        <p className="text-sm text-gray-400 font-mono">Gostou desse case?</p>
                        <button className="bg-[#000000] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-[#DA00F9] transition-colors flex items-center gap-2">Quero algo assim <Rocket size={16} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Hero = ({ onNavigate, onOpenBriefing }) => {
    return (
        <section id="home" className="relative pt-32 pb-20 overflow-hidden bg-tech-grid min-h-[95vh] flex items-center">
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#FFD600] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#DA00F9] rounded-full mix-blend-multiply filter blur-[100px] opacity-10"></div>
            <div className="absolute top-40 left-40 w-[200px] h-[200px] bg-[#8DFF4F] rounded-full mix-blend-multiply filter blur-[80px] opacity-15"></div>

            <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8 relative">
                    <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-1.5 rounded-full shadow-sm">
                        <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8DFF4F] opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-[#8DFF4F]"></span></span>
                        <span className="text-gray-600 text-xs font-bold tracking-wide uppercase">Marketing Híbrido & Design</span>
                    </div>
                    <h1 className="font-display font-black text-5xl md:text-7xl text-[#000000] leading-[1.05]">SUA MARCA <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A148C] to-[#DA00F9]">MERECE MAIS</span> <br /><span className="relative inline-block z-10">DO QUE O BÁSICO<svg className="absolute w-[110%] h-4 -bottom-2 -left-2 text-[#FFD600] -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="none" /></svg></span></h1>
                    {/* Texto Atualizado */}
                    <p className="text-lg text-gray-600 max-w-lg leading-relaxed border-l-4 border-[#DA00F9] pl-6">Comunique o que quiser! Transformamos sua empresa em uma referência visual e estratégica, desde o operacional à apresentação Social. Faça parte da mudança: Comunique!</p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button onClick={() => onOpenBriefing('Social Media')} className="bg-[#4A148C] text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 group shadow-[6px_6px_0px_#FFD600] border-2 border-[#4A148C] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">Quero Ser Visto <Rocket size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"/></button>
                        <button onClick={() => onNavigate('projetos')} className="bg-white text-[#000000] border-2 border-[#000000] px-8 py-4 rounded-lg font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">Ver Projetos <Zap size={20} className="text-[#FFD600] fill-[#FFD600]" /></button>
                    </div>
                </div>
                <div className="relative hidden lg:block h-full min-h-[500px] w-full">
                    <div className="absolute top-[45%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] xl:w-[450px] xl:h-[450px] border border-dashed border-[#4A148C]/20 rounded-full animate-spin-slow"></div>
                    <div className="absolute top-[45%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-72 xl:w-80 bg-white rounded-2xl border-2 border-[#000000] shadow-[12px_12px_0px_#4A148C] p-6 z-20 animate-float">
                        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                            <div className="flex items-center gap-3"><div className="w-10 h-10 bg-[#FFD600] rounded-full border-2 border-[#000000] flex items-center justify-center"><Smile size={20} className="text-[#000000]" /></div><div><div className="font-bold text-sm">Status da Marca</div><div className="text-xs text-[#8DFF4F] font-bold flex items-center gap-1"><div className="w-2 h-2 bg-[#8DFF4F] rounded-full animate-pulse"></div> Online</div></div></div>
                            <Code size={20} className="text-gray-300" />
                        </div>
                        <div className="space-y-4">
                            <div className="bg-[#F5F5F6] p-3 rounded-lg border border-gray-100 relative overflow-hidden group hover:border-[#DA00F9] transition-colors"><div className="flex justify-between items-center mb-2 relative z-10"><span className="text-xs font-bold text-gray-500">ENGAJAMENTO</span><TrendingUp size={16} className="text-[#DA00F9]" /></div><div className="text-2xl font-display font-bold text-[#000000] relative z-10">+ 840%</div><div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200"><div className="h-full bg-[#DA00F9] w-[85%]"></div></div></div>
                            <div className="bg-[#F5F5F6] p-3 rounded-lg border border-gray-100 relative overflow-hidden group hover:border-[#8DFF4F] transition-colors"><div className="flex justify-between items-center mb-2 relative z-10"><span className="text-xs font-bold text-gray-500">QUALIDADE VISUAL</span><Sparkles size={16} className="text-[#8DFF4F]" /></div><div className="text-2xl font-display font-bold text-[#000000] relative z-10">Ultra HD</div><div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200"><div className="h-full bg-[#8DFF4F] w-[98%]"></div></div></div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-xs text-gray-400 font-mono">ID: SK-2026</span>
                            <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-[#DA00F9]"></div><div className="w-2 h-2 rounded-full bg-[#FFD600]"></div><div className="w-2 h-2 rounded-full bg-[#4A148C]"></div></div>
                        </div>
                    </div>
                    <div className="absolute top-[20%] right-[15%] glass-card p-3 rounded-xl border border-[#DA00F9]/30 shadow-lg animate-float-delay z-30"><Megaphone size={24} className="text-[#DA00F9]" /></div>
                    <div className="absolute bottom-[30%] left-[20%] glass-card p-3 rounded-xl border border-[#8DFF4F]/30 shadow-lg animate-float z-30" style={{animationDelay: '1.5s'}}><Printer size={24} className="text-[#8DFF4F]" /></div>
                </div>
            </div>
        </section>
    );
};

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
                        src="https://placehold.co/150x50?text=LOGO+SK" 
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
                        <button key={item.label} onClick={() => handleLinkClick(item.target)} className={`text-sm font-bold transition-colors relative group ${currentView === 'projetos' && item.target === 'projetos' ? 'text-[#4A148C]' : 'text-gray-600 hover:text-[#4A148C]'}`}>
                            {item.label}
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#FFD600] transition-all ${currentView === 'projetos' && item.target === 'projetos' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                        </button>
                    ))}
                    <button onClick={() => onOpenBriefing('Social Media')} className="bg-[#FFD600] text-[#000000] px-6 py-2.5 rounded-lg font-bold text-sm shadow-[4px_4px_0px_#000000] border-2 border-[#000000] hover:bg-[#ffea00] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] transition-all">
                        Iniciar Projeto
                    </button>
                </div>

                <button className="md:hidden text-[#000000]" onClick={() => setIsOpen(!isOpen)}>
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
                            <button key={item.label} onClick={() => handleLinkClick(item.target)} className="text-left text-lg font-medium text-gray-800 hover:text-[#4A148C] py-2 border-b border-gray-50">{item.label}</button>
                        ))}
                        <button onClick={() => { setIsOpen(false); onOpenBriefing('Social Media'); }} className="bg-[#FFD600] text-[#000000] w-full py-3 rounded-lg font-bold shadow-[4px_4px_0px_#000000] border-2 border-[#000000] mt-4">Iniciar Projeto</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default App;











