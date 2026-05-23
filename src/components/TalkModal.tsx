/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, FormEvent } from 'react';
import { X, Send, CheckCircle2, MessageSquare, Briefcase } from 'lucide-react';

interface TalkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TalkModal({ isOpen, onClose }: TalkModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('fullstack');
  const [budget, setBudget] = useState('$50k - $150k');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Lock background scrolling
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    try {
      // Conexión directa con tu cuenta de Formspree
      const response = await fetch('https://formspree.io/f/xlgvlpwb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Nombre: name,
          Correo: email,
          TipoDeProyecto: projectType === 'fullstack' ? 'Ingeniería Full-Stack' : 'Dirección de Arte / UX',
          Presupuesto: budget,
          Mensaje: message
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        // Cerramos y reseteamos automáticamente tras 3 segundos de éxito
        setTimeout(() => {
          resetForm();
        }, 3000);
      } else {
        alert("Hubo un error al enviar el mensaje. Por favor intenta por WhatsApp.");
      }
    } catch (error) {
      console.error("Error en el envío:", error);
      alert("Error de conexión. Por favor intenta por WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setProjectType('fullstack');
    setBudget('$50k - $150k');
    setMessage('');
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6 select-none bg-surface-dim/80 backdrop-blur-xl transition-all duration-300">
      {/* Background overlay closer click */}
      <div className="absolute inset-0 cursor-default" onClick={onClose}></div>
      
      {/* Modal Card Layout */}
      <div className="relative w-full max-w-2xl bg-surface-container-high border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden z-10 transition-transform duration-500 transform scale-100 flex flex-col max-h-[90vh]">
        
        {/* Decorative Top Glow lines */}
        <div className="h-[2px] w-full bg-gradient-to-r from-primary via-secondary to-primary animate-pulse" />
        
        {/* Header */}
        <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/5 bg-surface-container-highest/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-lg md:text-xl text-white tracking-tight">Iniciar Proyecto</h3>
              <p className="text-xs text-on-surface-variant">Hablemos sobre tu visión estratégica</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/5 hover:border-white/20 hover:bg-white/5 flex items-center justify-center text-on-surface-variant hover:text-white transition-all duration-300 active:scale-90"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="py-12 flex flex-col items-center text-center max-w-md mx-auto animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-6 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-display font-extrabold text-2xl text-white mb-3">¡Mensaje Recibido!</h4>
              <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
                Gracias, <span className="text-white font-medium">{name}</span>. Nuestro equipo de ingeniería y diseño analizará tu solicitud y te contactará a la brevedad.
              </p>
              <button
                onClick={resetForm}
                className="w-full sm:w-auto font-sans text-xs uppercase tracking-widest font-bold bg-primary text-on-primary px-8 py-3.5 rounded-full hover:bg-opacity-90 active:scale-95 transition-all duration-300"
              >
                Volver al Portafolio
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-on-surface-variant mb-2 font-medium">Nombre Completo</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Carlos Mendoza"
                    className="w-full bg-surface-container-lowest border border-white/5 focus:border-primary/40 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-on-surface-variant mb-2 font-medium">Correo Electrónico</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="carlos@empresa.com"
                    className="w-full bg-surface-container-lowest border border-white/5 focus:border-primary/40 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Service TypeSelector */}
              <div>
                <label className="block font-sans text-xs uppercase tracking-widest text-on-surface-variant mb-3 font-medium">Tipo de Solución</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setProjectType('fullstack')}
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all duration-300 ${projectType === 'fullstack' ? 'bg-primary/5 border-primary text-white shadow-[0_0_12px_rgba(172,221,255,0.08)]' : 'bg-surface-container-lowest border-white/5 hover:border-white/15 text-on-surface-variant hover:text-white'}`}
                  >
                    <Briefcase className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-display font-bold text-sm">Ingeniería Full-Stack</div>
                      <div className="text-xs opacity-60 mt-0.5">Vanguardia reactiva y velocidad</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setProjectType('uiux')}
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all duration-300 ${projectType === 'uiux' ? 'bg-secondary/5 border-secondary text-white shadow-[0_0_12px_rgba(208,188,255,0.08)]' : 'bg-surface-container-lowest border-white/5 hover:border-white/15 text-on-surface-variant hover:text-white'}`}
                  >
                    <Briefcase className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-display font-bold text-sm">Dirección de Arte / UX</div>
                      <div className="text-xs opacity-60 mt-0.5">Estética editorial moderna</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Budget Range selector */}
              <div>
                <label className="block font-sans text-xs uppercase tracking-widest text-on-surface-variant mb-3 font-medium">Presupuesto Estimado</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['< $10k', '$10k - $25k', '$25k - $50k', '$50k+'].map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setBudget(range)}
                      className={`py-3 px-2 rounded-xl border text-xs font-sans font-bold text-center transition-all duration-300 ${budget === range ? 'bg-primary text-on-primary border-primary font-bold shadow-[0_0_10px_rgba(172,221,255,0.15)]' : 'bg-surface-container-lowest border-white/5 hover:border-white/10 text-on-surface-variant'}`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block font-sans text-xs uppercase tracking-widest text-on-surface-variant mb-2 font-medium">Descripción del Proyecto</label>
                <textarea 
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detalla tu propuesta o el problema tecnológico que buscas resolver con arquitectura de código..."
                  className="w-full bg-surface-container-lowest border border-white/5 focus:border-primary/40 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors duration-300 resize-none"
                />
              </div>

              {/* Submit code */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="text-xs text-on-surface-variant font-sans flex items-center gap-1.5 leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Intercambio 100% confidencial
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex items-center justify-center gap-3 font-sans text-xs uppercase tracking-widest font-bold bg-primary text-on-primary hover:bg-opacity-90 px-8 py-3.5 rounded-full transition-all duration-300 disabled:opacity-50 select-none cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      Enviar Solicitud
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
