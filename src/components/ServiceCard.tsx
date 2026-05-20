/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Code, Layers, Server, Zap, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  key?: string;
  service: ServiceItem;
  onExplore: (service: ServiceItem) => void;
}

export default function ServiceCard({ service, onExplore }: ServiceCardProps) {
  // Map icons
  const renderIcon = () => {
    switch (service.iconName) {
      case 'code':
        return <Code className="w-8 h-8 text-primary transition-colors duration-500" />;
      case 'layers':
        return <Layers className="w-8 h-8 text-secondary transition-colors duration-500" />;
      case 'server':
        return <Server className="w-8 h-8 text-primary transition-colors duration-500" />;
      case 'zap':
        return <Zap className="w-8 h-8 text-secondary transition-colors duration-500" />;
      default:
        return <Code className="w-8 h-8 text-primary transition-colors duration-500" />;
    }
  };

  const getBorderColorClass = () => {
    if (service.iconName === 'code' || service.iconName === 'server') {
      return 'border-primary/10 group-hover:border-primary/50 group-hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(172,221,255,0.15)]';
    } else {
      return 'border-secondary/10 group-hover:border-secondary/50 group-hover:bg-secondary/20 hover:shadow-[0_0_20px_rgba(208,188,255,0.15)]';
    }
  };

  const getBadgeColorClass = () => {
    if (service.iconName === 'code' || service.iconName === 'server') {
      return 'text-primary bg-primary/5';
    } else {
      return 'text-secondary bg-secondary/5';
    }
  };

  return (
    <div 
      className="glass-card p-10 md:p-12 flex flex-col justify-between rounded-2xl cursor-pointer relative overflow-hidden group transition-all duration-500 ease-in-out hover:-translate-y-2"
      onClick={() => onExplore(service)}
    >
      <div>
        {/* Animated Background Overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-white/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Icon Container with Custom Halo border transition */}
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-8 border transition-all duration-500 ease-in-out ${getBorderColorClass()}`}>
          {renderIcon()}
        </div>

        {/* Category Tag */}
        <span className={`font-sans text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block ${getBadgeColorClass()}`}>
          {service.category}
        </span>

        {/* Title */}
        <h3 className="font-display font-bold text-2xl md:text-3xl text-on-surface mb-6 group-hover:text-white transition-colors duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-sm md:text-base text-on-surface-variant mb-10 leading-relaxed group-hover:text-on-surface transition-colors duration-300">
          {service.description}
        </p>
      </div>

      {/* Footer Details */}
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
        <span className="font-display text-4xl text-white/5 font-extrabold group-hover:text-white/10 transition-colors duration-500 select-none">
          {service.number}
        </span>
        <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-white/2 border border-white/5 group-hover:border-white/20 group-hover:scale-110 transition-all duration-500 ease-in-out ${service.iconName === 'code' || service.iconName === 'server' ? 'text-primary' : 'text-secondary'}`}>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
}
