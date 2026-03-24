const LinksMenu = ({ onInternalNavigate }) => (
    <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-[#ff0080] rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#00e676] rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
        <div className="relative z-10 w-full max-w-sm flex flex-col items-center animate-fade-in">
            <img src="https://i.imgur.com/i3aRzWc.png" alt="SK Logo" className="h-16 mb-6 object-contain" />
            <h1 className="text-white font-display font-black text-2xl text-center mb-2">Bem-vindo(a) à SK</h1>
            <p className="text-gray-400 text-center text-sm mb-8">Escolha a melhor opção para sua empresa hoje:</p>
            <div className="w-full space-y-4">
                <a href="https://wa.me/5511945438152?text=Ol%C3%A1!%20Vim%20pelo%20QR%20Code%20e%20quero%20conversar." target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] text-white p-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-all hover:scale-105 shadow-[4px_4px_0px_#000000] border-2 border-[#000000]"><MessageCircle size={20} />1. Fale direto no WhatsApp</a>
                <button onClick={() => onInternalNavigate('quiz')} className="w-full bg-white text-[#1a1a1a] p-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#FFD600] transition-all hover:scale-105 shadow-[4px_4px_0px_#ff0080] border-2 border-[#1a1a1a]"><Sparkles size={20} className="text-[#ff0080]" />2. Diagnóstico da Empresa</button>
                <button onClick={() => onInternalNavigate('chatbot')} className="w-full bg-[#1a1a1a] text-white p-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#00e676] hover:text-[#1a1a1a] transition-all hover:scale-105 shadow-[4px_4px_0px_#00e676] border-2 border-[#00e676]"><BotIcon size={20} />3. Teste o nosso Chatbot &lt;3</button>
                <button onClick={() => { window.location.hash = ''; window.location.reload(); }} className="w-full bg-transparent text-white p-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all border-2 border-white/20 mt-4"><Layout size={20} />4. Acesse o Site Completo</button>
            </div>
        </div>
    </div>
);

const ChatbotView = ({ onBack }) => {
    const [messages, setMessages] = useState([{ id: 1, sender: 'bot', text: 'Oi! 👋 Eu sou a IA de atendimento da SK Marketing.' }, { id: 2, sender: 'bot', text: 'Para começarmos, qual é o seu nome ou o nome da sua empresa?' }]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [step, setStep] = useState(0); 
    const [userData, setUserData] = useState({ name: '', need: '', otherNeeds: '' });
    const messagesEndRef = useRef(null);

    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

    const extractName = (text) => {
        const match = text.match(/(?:sou a|sou o|sou|me chamo|nome é|nome e|aqui é a|aqui é o|aqui é)\s+([A-ZÀ-Ÿa-zà-ÿ]+)/i);
        if (match && match[1] && !['um', 'uma', 'a', 'o', 'de', 'da', 'do'].includes(match[1].toLowerCase())) return match[1].charAt(0).toUpperCase() + match[1].toLowerCase().slice(1);
        const words = text.trim().split(/\s+/);
        return words.length <= 3 ? words[0].charAt(0).toUpperCase() + words[0].toLowerCase().slice(1) : ""; 
    };

    const categorizeServices = (text1, text2) => {
        const combined = (text1 + " " + text2).toLowerCase();
        const found = new Set();
        if (combined.match(/bot|chatbot|atendimento|robô|zap|whatsapp|demora|responder|braço|automático|agilizar/)) found.add("Chatbots Personalizados");
        if (combined.match(/site|página|landing|app|aplicativo|sistema/)) found.add("Desenvolvimento de Sites ou App");
        if (combined.match(/instagram|post|rede social|social media|conteúdo|tiktok|engajamento|seguidor/)) found.add("Gestão de Social Media");
        if (combined.match(/venda|vender|marketing|estratégia|crescer|cliente|direção|agora em diante/)) found.add("Consultoria de Marketing");
        if (combined.match(/processo|organizar|planilha|gestão|empresa|equipe|intern/)) found.add("Consultoria de Automação & Processos");
        if (combined.match(/evento|publicidade|tráfego|anúncio|campanha|anunciar/)) found.add("Publicidade e Eventos");
        if (combined.match(/banner|cartão|material|gráfico|arte|logo|visual/)) found.add("Demandas Gráficas");
        return found.size === 0 ? ["Consultoria Geral"] : Array.from(found);
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isTyping) return;
        const userText = inputValue;
        setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userText }]);
        setInputValue(''); setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            if (step === 0) {
                const extractedName = extractName(userText);
                setUserData(prev => ({ ...prev, name: extractedName }));
                setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: extractedName ? `Muito prazer, ${extractedName}! 🚀` : `Muito prazer! 🚀` }]);
                setIsTyping(true);
                setTimeout(() => { setIsTyping(false); setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: 'Me conta de forma resumida: qual o maior desafio do seu negócio hoje?' }]); setStep(1); }, 1200);
            } else if (step === 1) {
                setUserData(prev => ({ ...prev, need: userText }));
                setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: 'A SK trabalha exatamente com isso! 🎯 Faremos o projeto ideal para sua empresa.' }]);
                setIsTyping(true);
                setTimeout(() => { setIsTyping(false); setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: `Você gostaria de falar sobre mais alguma coisa que sente falta na sua empresa hoje?` }]); setStep(2); }, 2500);
            } else if (step === 2) {
                setUserData(prev => ({ ...prev, otherNeeds: userText }));
                setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: 'Perfeito! Já processei essas informações. 📝' }]);
                setIsTyping(true);
                setTimeout(() => { setIsTyping(false); setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: 'Gerei um diagnóstico do nosso papo. Clique no botão verde abaixo para me mandar um "Oi" no WhatsApp.' }]); setStep(3); }, 1500);
            }
        }, 1000); 
    };

    const generateWhatsAppLink = () => {
        const detectedServices = categorizeServices(userData.need, userData.otherNeeds);
        let text = `Olá time SK! ${userData.name ? `Sou o/a ${userData.name}. ` : ''}\n\nFiz o teste no chatbot de vocês pelo site e cheguei à conclusão de que os serviços que mais preciso são:\n\n${detectedServices.map(s => `♦ *${s}*`).join('\n')}\n\nGostaria de entender melhor como vocês podem me ajudar!`;
        return `https://wa.me/5511945438152?text=${encodeURIComponent(text)}`;
    };

    return (
        <section className="bg-[#f8fafc] min-h-screen flex flex-col relative font-sans w-full">
            <div className="bg-[#4A148C] text-white p-4 shadow-md flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><ChevronLeft size={20} /></button>
                    <div className="relative"><div className="w-10 h-10 bg-[#FFD600] rounded-full flex items-center justify-center border-2 border-[#1a1a1a]"><BotIcon size={20} className="text-[#4A148C]" /></div><div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00e676] rounded-full border-2 border-[#4A148C]"></div></div>
                    <div><h2 className="font-display font-bold leading-tight">SK Assistente</h2><span className="text-xs text-[#00e676]">Online</span></div>
                </div>
            </div>
            <div className="flex-grow p-4 overflow-y-auto space-y-4 relative bg-tech-grid w-full max-w-4xl mx-auto">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                        <div className={`max-w-[85%] md:max-w-[70%] flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className="flex-shrink-0 mt-auto">{msg.sender === 'bot' ? <div className="w-8 h-8 bg-[#4A148C] rounded-full flex items-center justify-center border border-[#FFD600] shadow-sm"><BotIcon size={14} className="text-white"/></div> : <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center shadow-sm"><UserIcon size={14} className="text-gray-600"/></div>}</div>
                            <div className={`p-3 rounded-2xl shadow-sm border-2 ${msg.sender === 'user' ? 'bg-[#FFD600] text-[#1a1a1a] border-[#1a1a1a] rounded-br-none' : 'bg-white text-gray-800 border-gray-200 rounded-bl-none'}`}><p className="text-sm font-medium whitespace-pre-wrap">{msg.text}</p></div>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start animate-fade-in"><div className="max-w-[85%] flex gap-2 flex-row"><div className="flex-shrink-0 mt-auto"><div className="w-8 h-8 bg-[#4A148C] rounded-full flex items-center justify-center border border-[#FFD600] shadow-sm"><BotIcon size={14} className="text-white"/></div></div><div className="p-3 py-4 rounded-2xl shadow-sm border-2 bg-white border-gray-200 rounded-bl-none flex items-center gap-1"><div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div><div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div><div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div></div></div></div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="bg-white border-t-2 border-gray-200 p-4">
                {step < 3 ? (
                    <form onSubmit={handleSend} className="flex gap-2 max-w-4xl mx-auto"><input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} disabled={isTyping} placeholder={isTyping ? "Robô digitando..." : "Digite sua mensagem..."} className="flex-grow bg-gray-100 border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-[#ff0080] transition-colors disabled:opacity-50" /><button type="submit" disabled={isTyping} className="bg-[#4A148C] text-[#FFD600] p-3 rounded-xl hover:bg-[#340b69] transition-colors flex items-center justify-center w-14 border-2 border-[#1a1a1a] disabled:opacity-50"><Send size={20} className="ml-1" /></button></form>
                ) : (
                    <div className="max-w-4xl mx-auto animate-slide-up"><a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] text-white font-black uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 border-2 border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] hover:translate-y-1 hover:shadow-none transition-all">Finalizar no WhatsApp <MessageCircle size={20} /></a><button onClick={onBack} className="w-full mt-4 text-gray-500 font-bold text-sm hover:text-[#ff0080] underline decoration-2">Voltar para o Menu</button></div>
                )}
            </div>
        </section>
    );
};

const QuizView = ({ onBack }) => {
    const [step, setStep] = useState(0);
    const [scores, setScores] = useState({ "Consultoria de Marketing": 0, "Consultoria de Automação & Processos": 0, "Chatbots Personalizados": 0, "Desenvolvimento de Sites / Aplicativos": 0, "Gestão de Social Media e Criação de Conteúdo": 0, "Publicidade e Eventos": 0, "Demandas Gráficas": 0 });

    const questions = [
        { title: "1. Pensando na estrutura de vendas da sua empresa, qual o maior desafio?", options: [{ text: "Não damos conta do atendimento, o WhatsApp é uma bagunça.", services: ["Chatbots Personalizados", "Consultoria de Automação & Processos"] }, { text: "Falta estratégia clara para atrair e fechar clientes.", services: ["Consultoria de Marketing"] }, { text: "Precisamos de um site, landing page ou sistema próprio.", services: ["Desenvolvimento de Sites / Aplicativos"] }] },
        { title: "2. Como está a sua presença no Instagram e nas redes sociais?", options: [{ text: "Não tenho tempo para criar posts e as vendas estão estacionadas.", services: ["Gestão de Social Media e Criação de Conteúdo", "Consultoria de Marketing"] }, { text: "Eu até posto, mas sinto que não gera engajamento ou retorno.", services: ["Gestão de Social Media e Criação de Conteúdo", "Publicidade e Eventos"] }, { text: "Faço o básico, mas quero impulsionar com anúncios fortes.", services: ["Publicidade e Eventos"] }] },
        { title: "3. Como você organiza os processos e a equipe internamente?", options: [{ text: "É tudo na cabeça, no papel ou em planilhas soltas e confusas.", services: ["Consultoria de Automação & Processos"] }, { text: "Usamos ferramentas, mas elas não conversam entre si.", services: ["Consultoria de Automação & Processos", "Desenvolvimento de Sites / Aplicativos"] }, { text: "A equipe perde muito tempo com tarefas repetitivas.", services: ["Chatbots Personalizados", "Consultoria de Automação & Processos"] }] },
        { title: "4. O que faria você faturar mais nos próximos 30 dias?", options: [{ text: "Ter um robô atendendo, vendendo e qualificando leads 24h.", services: ["Chatbots Personalizados"] }, { text: "Ter uma estratégia de tráfego pago rodando com força (Anúncios).", services: ["Publicidade e Eventos"] }, { text: "Terceirizar a criação de conteúdo para eu focar só na operação.", services: ["Gestão de Social Media e Criação de Conteúdo"] }] },
        { title: "5. Se você tivesse que escolher apenas UMA prioridade para a SK resolver hoje:", options: [{ text: "Arrumar a 'casa' (Atendimento automatizado e processos).", services: ["Consultoria de Automação & Processos", "Chatbots Personalizados"] }, { text: "Aumentar o volume de interessados chegando (Tráfego, Social Media).", services: ["Publicidade e Eventos", "Gestão de Social Media e Criação de Conteúdo"] }, { text: "Reestruturar o modelo de negócio e as vendas (Estratégia completa).", services: ["Consultoria de Marketing"] }, { text: "Criar materiais (Site, Aplicativo ou Material Gráfico para Eventos).", services: ["Desenvolvimento de Sites / Aplicativos", "Demandas Gráficas"] }] }
    ];

    const handleAnswer = (servicesImpacted) => {
        const newScores = { ...scores };
        servicesImpacted.forEach(service => { if(newScores[service] !== undefined) newScores[service] += 1; });
        setScores(newScores); setStep(step + 1);
    };

    const getTopServices = () => Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 2).map(i => i[0]);

    const generateWhatsAppLink = () => {
        const topServices = getTopServices();
        return `https://wa.me/5511945438152?text=${encodeURIComponent(`Olá time SK! Fiz o diagnóstico no site e descobri que os serviços mais urgentes para minha empresa são: \n\n♦ *${topServices[0]}*\n♦ *${topServices[1]}*\n\nGostaria de conversar com um especialista sobre isso!`)}`;
    };

    return (
        <section className="pt-20 pb-20 bg-tech-grid min-h-screen relative flex items-center justify-center w-full">
            <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-[#ff0080] rounded-full mix-blend-multiply filter blur-[80px] opacity-20"></div>
            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
                <button onClick={onBack} className="mb-6 flex items-center gap-2 text-gray-600 font-bold hover:text-[#ff0080] transition-colors self-start max-w-2xl w-full"><ChevronLeft size={20} /> Voltar para Menu</button>
                <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-[#1a1a1a] overflow-hidden">
                    <div className="bg-[#4A148C] p-6 text-center relative overflow-hidden">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg border-2 border-[#FFD600] relative z-10"><Target size={32} className="text-[#4A148C]" /></div>
                        <h2 className="font-display font-black text-2xl text-white relative z-10">Diagnóstico SK</h2>
                        {step > 0 && step <= questions.length && (<div className="mt-4 flex gap-1 justify-center relative z-10">{questions.map((_, i) => (<div key={i} className={`h-2 rounded-full transition-all duration-500 ${i < step ? 'w-6 bg-[#00e676]' : 'w-3 bg-white/20'}`}></div>))}</div>)}
                    </div>
                    <div className="p-8 md:p-10">
                        {step === 0 && (<div className="text-center animate-fade-in"><h3 className="font-display font-bold text-2xl text-[#1a1a1a] mb-4">Descubra o que sua empresa precisa AGORA.</h3><p className="text-gray-600 mb-8 leading-relaxed">Responda a {questions.length} perguntas rápidas e nosso sistema inteligente vai cruzar seus gargalos com as soluções exatas da SK.</p><button onClick={() => setStep(1)} className="w-full bg-[#00e676] text-[#1a1a1a] font-black uppercase tracking-widest py-4 rounded-xl hover:bg-[#00c965] transition-all flex items-center justify-center gap-2 border-2 border-[#1a1a1a] shadow-[0_4px_0px_#1a1a1a]">Iniciar Diagnóstico <Zap size={20} /></button></div>)}
                        {step > 0 && step <= questions.length && (<div className="animate-slide-up"><span className="text-sm font-bold text-[#ff0080] mb-2 block">Pergunta {step} de {questions.length}</span><h3 className="font-display font-bold text-xl text-[#1a1a1a] mb-6">{questions[step - 1].title}</h3><div className="space-y-3">{questions[step - 1].options.map((opt, idx) => (<button key={idx} onClick={() => handleAnswer(opt.services)} className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-[#ff0080] hover:bg-[#f8fafc] transition-all group"><span className="font-medium text-gray-700 group-hover:text-[#1a1a1a]">{opt.text}</span></button>))}</div></div>)}
                        {step > questions.length && (<div className="text-center animate-fade-in"><h3 className="font-display font-black text-2xl text-[#1a1a1a] mb-2">Diagnóstico Concluído!</h3><p className="text-gray-600 mb-6">Com base nas suas respostas, a nossa equipe deve focar em:</p><div className="bg-[#f8fafc] p-4 rounded-xl border-2 border-dashed border-[#4a148c]/30 mb-8 space-y-3">{getTopServices().map((srv, i) => (<div key={i} className="bg-white p-3 rounded-lg border border-gray-200 font-bold text-[#4a148c] shadow-sm flex items-center justify-center gap-2 text-center"><Check size={18} className="text-[#00e676]" /> {srv}</div>))}</div><a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="w-full bg-[#ff0080] text-white font-black uppercase tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-2 border-2 border-[#1a1a1a] shadow-[0_4px_0px_#1a1a1a] mb-4 hover:-translate-y-1">Finalizar no WhatsApp <MessageCircle size={20} /></a><button onClick={onBack} className="text-gray-500 font-bold text-sm hover:text-[#1a1a1a] underline decoration-2 underline-offset-4">Voltar para o Menu</button></div>)}
                    </div>
                </div>
            </div>
        </section>
    );
};

const LinksPage = ({ onNavigate }) => {
    const [currentScreen, setCurrentScreen] = useState('menu');

    if (currentScreen === 'chatbot') return <ChatbotView onBack={() => setCurrentScreen('menu')} />;
    if (currentScreen === 'quiz') return <QuizView onBack={() => setCurrentScreen('menu')} />;
    
    return <LinksMenu onInternalNavigate={(screen) => setCurrentScreen(screen)} />;
};

export default App;
