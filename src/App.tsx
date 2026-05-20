/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Check, 
  Copy, 
  Linkedin, 
  Instagram, 
  ArrowUpRight, 
  Code, 
  Layers, 
  ChevronRight, 
  Sparkles, 
  Clock, 
  Cpu, 
  Gauge, 
  ShieldCheck 
} from 'lucide-react';

// Type Imports
import { ServiceItem } from './types';

// Component Imports
import AtmosphericBg from './components/AtmosphericBg';
import ServiceCard from './components/ServiceCard';
import TalkModal from './components/TalkModal';

export default function App() {
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  
  // Ref for scroll observation to trigger active links
  const [activeSection, setActiveSection] = useState('home');

  // Contact form state (section-based inline alternative)
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [inlineSubmitSuccess, setInlineSubmitSuccess] = useState(false);
  const [inlineSubmitting, setInlineSubmitting] = useState(false);

  const services: ServiceItem[] = [
    {
      id: 'src-1',
      number: '01',
      category: 'Core Engineering',
      title: 'Desarrollo Web',
      description: 'Arquitecturas robustas en Next.js, React y Tailwind CSS optimizadas para Core Web Vitals, conversiones y escalabilidad ilimitada.',
      iconName: 'code'
    },
    {
      id: 'src-2',
      number: '02',
      category: 'User Experience',
      title: 'Diseño UX/UI',
      description: 'Interfaces minimalistas de alta gama que priorizan la usabilidad, la estética editorial de vanguardia y la identidad de marcas de lujo.',
      iconName: 'layers'
    },
    {
      id: 'src-3',
      number: '03',
      category: 'Performance',
      title: 'Optimización',
      description: 'Auditoría profunda, optimización de sistemas y refinamiento de código para garantizar renders a 60 FPS estables y cargas de página en milisegundos.',
      iconName: 'zap'
    }
  ];

  // Scroll handler for navbar styling & active sections
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'nosotros', 'servicios', 'contacto'];
      const scrollPosition = window.scrollY + 120; // offset heading space

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle active class for transition reveals on scroll
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Clipboard copy action with state feedback
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.warn('No se pudo copiar el texto automáticamente.', err);
    }
  };

  const handleInlineSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;

    setInlineSubmitting(true);
    setTimeout(() => {
      setInlineSubmitting(false);
      setInlineSubmitSuccess(true);
      
      // Store locally
      const proposal = { name: contactName, email: contactEmail, message: contactMsg, type: 'inline_quick', timestamp: new Date().toISOString() };
      const previous = JSON.parse(localStorage.getItem('studio24_proposals') || '[]');
      localStorage.setItem('studio24_proposals', JSON.stringify([...previous, proposal]));

      // Clear fields
      setContactName('');
      setContactEmail('');
      setContactMsg('');

      setTimeout(() => setInlineSubmitSuccess(false), 5000);
    }, 1000);
  };

  return (
    <div className="min-h-screen text-on-surface select-text selection:bg-primary/30 selection:text-white relative">
      
      {/* High performance abstract color gradients */}
      <AtmosphericBg />

      {/* FIXED NAV BAR WRAPPER */}
      <nav 
        id="navbar-root"
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${
          scrolled 
            ? 'bg-surface/85 backdrop-blur-2xl border-b border-white/5 py-4 shadow-xl' 
            : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo element focusing Studio 24 */}
          <a 
            href="#home" 
            className="font-display text-2xl md:text-3xl font-black tracking-tighter text-white hover:text-neutral-200 transition-colors duration-300 active:scale-95 flex items-center gap-1"
          >
            STUDIO 24.
          </a>

          {/* Desktop Links mapping native IDs strictly */}
          <div className="hidden md:flex items-center gap-10">
            {[
              { id: 'home', label: 'INICIO' },
              { id: 'nosotros', label: 'SOBRE NOSOTROS' },
              { id: 'servicios', label: 'SERVICIOS' },
              { id: 'contacto', label: 'CONTACTO' }
            ].map((link) => (
              <a 
                key={link.id}
                href={`#${link.id}`} 
                className={`font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300 relative py-1.5 ${
                  activeSection === link.id 
                    ? 'text-primary' 
                    : 'text-on-surface-variant hover:text-white'
                }`}
              >
                {link.label}
                {/* Micro-interactive slider anchor */}
                <span className={`absolute bottom-0 left-0 h-[1.5px] bg-primary transition-all duration-300 ${
                  activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </a>
            ))}
          </div>

          {/* Call to action trigger with elite boutique details */}
          <div className="hidden md:flex items-center">
            <button 
              onClick={() => setIsTalkModalOpen(true)}
              className="font-sans text-xs uppercase tracking-widest font-bold bg-white text-black px-6 py-3 rounded-none hover:bg-neutral-100 active:scale-95 duration-200 transition-all cursor-pointer"
            >
              INICIAR PROYECTO
            </button>
          </div>

          {/* Mobile hamburger toggle element */}
          <button 
            type="button"
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-white transition-all cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* MOBILE PREMIUM DRAWER */}
      <div className={`fixed inset-0 z-[90] bg-surface-dim/95 backdrop-blur-2xl transition-all duration-500 ease-in-out md:hidden flex flex-col justify-between p-8 pt-32 ${
        mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none translate-x-4'
      }`}>
        <div className="flex flex-col gap-8">
          {[
            { id: 'home', label: 'INICIO' },
            { id: 'nosotros', label: 'SOBRE NOSOTROS' },
            { id: 'servicios', label: 'SERVICIOS' },
            { id: 'contacto', label: 'CONTACTO' }
          ].map((link) => (
            <a 
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="font-display font-extrabold text-3xl text-on-surface hover:text-primary transition-colors text-left flex items-center justify-between"
            >
              <span>{link.label}</span>
              <ChevronRight className="w-6 h-6 text-primary" />
            </a>
          ))}
        </div>

        <div className="space-y-6 pt-12 border-t border-white/5">
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
            Ingeniería de alta disponibilidad y diseño editorial de vanguardia para marcas líderes.
          </p>
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              setIsTalkModalOpen(true);
            }}
            className="w-full text-center font-sans text-xs uppercase tracking-widest font-bold bg-white text-black py-4 rounded-none active:scale-95 duration-200 transition-all cursor-pointer"
          >
            INICIAR PROYECTO
          </button>
        </div>
      </div>

      <main className="relative z-10">

        {/* HERO SECTION (#home) */}
        <section 
          id="home" 
          className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-36 pb-20 md:pb-32"
        >
          {/* Majestic Hero Display matching the screenshot with Tigranz-inspired extreme tracking and line height */}
          <h1 className="font-sans text-5xl sm:text-7xl md:text-[110px] leading-[0.85] font-black tracking-tighter uppercase mb-8 md:mb-10 max-w-5xl select-none">
            CREAMOS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-[#4f46e5] font-black">PLATAFORMAS</span> QUE <br />
            DEFINEN <br />
            INDUSTRIAS.
          </h1>

          {/* Dual layout matching the screenshot: Copy on the left, EXPLORAR SOLUCIONES trigger on the right */}
          <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="font-sans text-base md:text-lg text-on-surface-variant max-w-xl leading-relaxed">
              Fusionamos dirección de arte de vanguardia con arquitectura de código robusta. Desarrollamos ventajas competitivas digitales medibles.
            </p>
            
            <a 
              href="#servicios" 
              className="group font-sans text-xs uppercase tracking-widest font-bold border-b border-white hover:text-primary hover:border-primary pb-1.5 transition-all duration-300 inline-flex items-center gap-1.5 shrink-0"
            >
              <span>EXPLORAR SOLUCIONES</span>
              <span className="text-sm font-bold group-hover:translate-y-1 transition-transform duration-300">↓</span>
            </a>
          </div>
        </section>


        {/* IDENTITY SECTION (#nosotros) */}
        <section 
          id="nosotros" 
          className="px-6 md:px-12 py-24 md:py-40 max-w-7xl mx-auto border-t border-white/5 reveal-on-scroll"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            
            {/* Left title panel */}
            <div className="md:col-span-4">
              <div className="sticky top-28 flex items-center gap-2">
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-outline text-left">
                  01 / Identidad
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              </div>
            </div>

            {/* Right details content */}
            <div className="md:col-span-8 space-y-10">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight">
                La mediocridad técnica es el asesino silencioso de las grandes ideas.
              </h2>
              
              <p className="font-sans text-base md:text-lg lg:text-xl text-on-surface-variant leading-relaxed">
                En Studio 24 entendemos que un sitio web es la infraestructura central de tu negocio en el entorno digital. Nos especializamos en eliminar la fricción técnica, acelerar la velocidad de carga al extremo y diseñar interfaces de usuario memorables que se traducen en conversión y autoridad de mercado.
              </p>

              {/* Advanced interactive network metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-white/10 pt-10">
                <div className="p-6 rounded-2xl bg-white/2 border border-white/5 hover:border-primary/20 hover:bg-white/4 group transition-all duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-primary font-display text-4xl md:text-5xl font-extrabold">99.9%</span>
                    <ShieldCheck className="w-6 h-6 text-primary/40 group-hover:text-primary transition-colors duration-500" />
                  </div>
                  <div className="font-sans text-xs uppercase tracking-widest text-[#869397] font-medium">Disponibilidad de Red</div>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">Infraestructura multi-región autoescalable de grado bancario.</p>
                </div>

                <div className="p-6 rounded-2xl bg-white/2 border border-white/5 hover:border-secondary/20 hover:bg-white/4 group transition-all duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-secondary font-display text-4xl md:text-5xl font-extrabold">&lt;200ms</span>
                    <Clock className="w-6 h-6 text-secondary/40 group-hover:text-secondary transition-colors duration-500" />
                  </div>
                  <div className="font-sans text-xs uppercase tracking-widest text-[#869397] font-medium">Latencia Media</div>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">Respuesta inmediata con optimización extrema y cache global.</p>
                </div>
              </div>
            </div>
            
          </div>
        </section>


        {/* SOLUTIONS SERVICES SECTION (#servicios) */}
        <section 
          id="servicios" 
          className="px-6 md:px-12 py-24 md:py-40 max-w-7xl mx-auto border-t border-white/5"
        >
          {/* Header titles */}
          <div className="mb-16 md:mb-24 reveal-on-scroll flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-outline block mb-4">
                02 / Soluciones
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
                NUESTRO EXPERTISE.
              </h2>
            </div>
            
            <p className="max-w-md text-sm md:text-base text-on-surface-variant leading-relaxed">
              Diseño de sistemas digitales robustos. Transformamos ambiciones de negocio en arquitecturas de software definitivas.
            </p>
          </div>

          {/* Responsive grid mapping standard service elements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((item) => (
              <ServiceCard 
                key={item.id} 
                service={item} 
                onExplore={(srv) => {
                  setSelectedService(srv);
                  setIsTalkModalOpen(true);
                }}
              />
            ))}
          </div>

          {/* Dynamic Technical Credentials Bar */}
          <div className="mt-16 p-6 md:p-8 rounded-2xl bg-surface-container/50 border border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center select-none reveal-on-scroll">
            <div className="space-y-1">
              <Gauge className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-xs font-sans font-bold text-white uppercase tracking-wider">Performance</div>
              <p className="text-[11px] text-on-surface-variant">Optimizaciones a 60 FPS y Serverless</p>
            </div>
            <div className="space-y-1 border-l border-white/5">
              <Cpu className="w-5 h-5 text-secondary mx-auto mb-2" />
              <div className="text-xs font-sans font-bold text-white uppercase tracking-wider">Modern Stack</div>
              <p className="text-[11px] text-on-surface-variant">Core en React, Next.js y TS</p>
            </div>
            <div className="space-y-1 border-l border-white/5">
              <ShieldCheck className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-xs font-sans font-bold text-white uppercase tracking-wider">Seguridad</div>
              <p className="text-[11px] text-[#869397]">Criptografía y sanitización total</p>
            </div>
            <div className="space-y-1 border-l border-white/5">
              <Sparkles className="w-5 h-5 text-secondary mx-auto mb-2" />
              <div className="text-xs font-sans font-bold text-white uppercase tracking-wider">Dirección de Arte</div>
              <p className="text-[11px] text-[#869397]">Diseño editorial interactivo</p>
            </div>
          </div>
        </section>


        {/* CONTACT CONVERSATION SECTION (#contacto) */}
        <section 
          id="contacto" 
          className="px-6 md:px-12 py-24 md:py-40 max-w-7xl mx-auto border-t border-white/5 reveal-on-scroll"
        >
          <div className="text-center relative">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-outline block mb-8">
              03 / Conversación
            </span>
            
            {/* Giant glowing background text strictly clean */}
            <h2 className="font-display text-[90px] sm:text-[150px] md:text-[200px] font-extrabold leading-none tracking-tighter text-white opacity-5 hover:opacity-90 select-none cursor-default transition-all duration-700 ease-in-out mb-10 md:mb-12">
              HABLEMOS.
            </h2>
            
            <p className="font-sans text-base md:text-lg lg:text-xl text-on-surface-variant max-w-xl mx-auto mb-12 md:mb-16 leading-relaxed">
              ¿Tienes un producto digital en mente o buscas un rediseño de alto impacto? Iniciemos hoy la estrategia.
            </p>

            {/* Email copying widget with checkmark notification */}
            <div className="inline-flex flex-col items-center gap-4 mb-20">
              <div className="relative group">
                <button
                  onClick={() => copyToClipboard('growth@studio24.com')}
                  className="font-display font-bold text-2xl sm:text-4xl md:text-[54px] text-primary hover:text-white transition-colors duration-500 border-b-4 border-primary/20 hover:border-primary pb-2 flex items-center gap-3 cursor-pointer group"
                  title="Haz clic para copiar"
                >
                  <span>growth@studio24.com</span>
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary transition-all duration-350">
                    {copied ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : <Copy className="w-4 h-4 md:w-4 md:h-4" />}
                  </div>
                </button>
                
                {/* Floating helpful tooltip */}
                <span className={`absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-lg bg-surface-container-high border border-white/10 text-xs text-white font-sans transition-opacity duration-300 ${
                  copied ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                  {copied ? '¡Copiado con éxito!' : 'Copiar al portapapeles'}
                </span>
              </div>
            </div>

            {/* Dual inline rapid contact form for increased fidelity alternative */}
            <div className="max-w-lg mx-auto bg-white/2 border border-white/5 rounded-2xl p-6 md:p-8 text-left">
              <h4 className="font-display font-extrabold text-lg text-white mb-2">Presupuesto Rápido</h4>
              <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">Envíalo directo sin salir de la página.</p>
              
              {inlineSubmitSuccess ? (
                <div className="py-6 text-center text-primary space-y-2">
                  <Check className="w-8 h-8 mx-auto bg-primary/10 rounded-full p-1.5" />
                  <div className="font-sans text-xs uppercase tracking-widest font-bold">¡Mensaje Enviado con éxito!</div>
                  <p className="text-xs text-on-surface-variant">Nos pondremos en contacto contigo en breve.</p>
                </div>
              ) : (
                <form onSubmit={handleInlineSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      required
                      placeholder="Tu nombre" 
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-white/5 focus:border-primary/40 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 outline-none transition-colors duration-300"
                    />
                    <input 
                      type="email" 
                      required
                      placeholder="Tu correo" 
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-white/5 focus:border-primary/40 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 outline-none transition-colors duration-300"
                    />
                  </div>
                  <textarea 
                    required
                    rows={3}
                    placeholder="Describe tu visión en breves palabras..." 
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-white/5 focus:border-primary/40 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 outline-none transition-colors duration-300 resize-none"
                  />
                  <button 
                    type="submit"
                    disabled={inlineSubmitting}
                    className="w-full font-sans text-xs uppercase tracking-widest font-bold bg-primary text-on-primary py-3 px-4 rounded-xl hover:bg-opacity-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {inlineSubmitting ? 'Enviando...' : 'Iniciar Proyecto'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="relative w-full overflow-hidden border-t border-white/5 bg-gradient-to-b from-transparent to-surface-container-low px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          
          {/* Brand block */}
          <div>
            <div className="font-display text-4xl font-extrabold tracking-tighter text-on-surface mb-4">
              STUDIO 24.
            </div>
            <p className="font-sans text-sm text-on-surface-variant max-w-sm leading-relaxed">
              Estrategia & Código de Alta Disponibilidad. Engineering Excellence since 2024.
            </p>
          </div>

          {/* Social connections & Copyright */}
          <div className="flex flex-col gap-6 text-left md:text-right items-start md:items-end">
            <div className="flex gap-8">
              <a 
                href="#" 
                className="font-sans text-xs uppercase tracking-wider text-on-surface-variant hover:text-white transition-all flex items-center gap-1.5 group"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-on-surface-variant group-hover:text-primary transition-colors" />
              </a>
              <a 
                href="#" 
                className="font-sans text-xs uppercase tracking-wider text-on-surface-variant hover:text-white transition-all flex items-center gap-1.5 group"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-on-surface-variant group-hover:text-primary transition-colors" />
              </a>
            </div>

            <div className="font-mono text-xs text-outline select-none tracking-wider">
              © 2026 STUDIO 24. ENGINEERING EXCELLENCE.
            </div>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT SYSTEM MATCHING SCREENSHOT EXACTLY */}
      <div className="fixed bottom-8 right-8 z-[120]">
        <a 
          className="w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.3)] active:scale-95 hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer" 
          href="#"
          aria-label="WhatsApp"
        >
          <svg 
            className="w-7 h-7 md:w-8 md:h-8 text-white fill-current" 
            viewBox="0 0 24 24"
            referrerPolicy="no-referrer"
          >
            <path d="M12.004 2C6.51 2 2.014 6.5 2 11.99c-.01 1.76.45 3.47 1.33 4.98L2 22l5.17-1.36c1.47.8 3.12 1.22 4.8 1.22l.004-.01c5.49-.01 9.99-4.5 10-9.99.01-2.66-1.03-5.16-2.92-7.05C17.16 2.92 14.66 2 12.004 2zm5.72 13.91c-.24.68-1.4 1.3-1.92 1.39-.48.08-.99.11-3.13-.77-2.73-1.12-4.5-3.9-4.64-4.08-.13-.19-1.11-1.48-1.11-2.82 0-1.34.7-2 1-2.28.24-.22.65-.33.99-.33.1 0 .21 0 .3.01.28.01.42.03.6.46.22.54.76 1.85.83 1.99.07.15.12.32.02.51-.1.2-.21.32-.38.52-.16.19-.34.33-.48.51-.16.19-.32.39-.14.71.18.3.8 1.31 1.71 2.12.91.81 1.68 1.06 1.99 1.19.31.13.49.11.67-.09.18-.21.78-.91.99-1.22.2-.31.41-.26.69-.16s1.65.78 1.93.92c.28.14.47.21.54.33.08.13.08.74-.16 1.42z" fill="currentColor"/>
          </svg>
        </a>
      </div>

      {/* LET'S TALK TRIGGERED MODAL DIALOG */}
      <TalkModal 
        isOpen={isTalkModalOpen} 
        onClose={() => setIsTalkModalOpen(false)} 
      />

    </div>
  );
}
