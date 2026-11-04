'use client';

import React from 'react';
import { Ruler, Sparkles, Check, Info, MessageCircle } from 'lucide-react';
import { CustomSizeCalculation } from '@/lib/utils/customSize';

interface CustomSizeInputProps {
  width: number;
  height: number;
  onChangeWidth: (w: number) => void;
  onChangeHeight: (h: number) => void;
  calc: CustomSizeCalculation;
  compact?: boolean;
}

const PRESET_CUSTOM_SIZES = [
  { w: 12, h: 18, label: '12" × 18"' },
  { w: 18, h: 24, label: '18" × 24"' },
  { w: 24, h: 36, label: '24" × 36"' },
  { w: 30, h: 48, label: '30" × 48"' },
  { w: 36, h: 60, label: '36" × 60"' },
];

export default function CustomSizeInput({
  width,
  height,
  onChangeWidth,
  onChangeHeight,
  calc,
  compact = false,
}: CustomSizeInputProps) {
  return (
    <div className="bg-[#141414] border-2 border-[#EAB308] rounded-2xl p-3.5 sm:p-4.5 space-y-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.6)] animate-fade-in">
      <div className="flex items-center justify-between border-b border-[#2D2D2D] pb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#EAB308]/15 border border-[#EAB308]/40 flex items-center justify-center text-[#EAB308]">
            <Ruler className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider flex items-center gap-1.5">
              <span>Enter Custom Dimensions</span>
              <span className="text-[10px] text-[#EAB308] font-normal normal-case">(Inches)</span>
            </h4>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold text-[#EAB308] bg-[#1E1E1E] px-2 py-0.5 rounded border border-[#EAB308]/40">
          Laser Cut to Size
        </span>
      </div>

      {/* Input Rows: Width and Height */}
      <div className="grid grid-cols-2 gap-3">
        {/* Width Input */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-[#FFFFFF] uppercase tracking-wider block">
            Width (Inches)
          </label>
          <div className="flex items-center border border-[#2D2D2D] focus-within:border-[#EAB308] rounded-xl bg-[#1A1A1A] overflow-hidden">
            <button
              type="button"
              onClick={() => onChangeWidth(Math.max(6, width - 1))}
              className="px-2.5 py-1.5 text-[#D1D5DB] hover:text-[#FFFFFF] hover:bg-[#222222] font-bold text-sm transition-colors cursor-pointer"
              aria-label="Decrease width"
            >
              -
            </button>
            <input
              type="number"
              min={6}
              max={120}
              value={width}
              onChange={(e) => onChangeWidth(Math.max(6, Math.min(120, Number(e.target.value) || 6)))}
              className="w-full bg-transparent text-center font-bold text-sm text-[#FFFFFF] outline-none py-1.5"
            />
            <button
              type="button"
              onClick={() => onChangeWidth(Math.min(120, width + 1))}
              className="px-2.5 py-1.5 text-[#D1D5DB] hover:text-[#FFFFFF] hover:bg-[#222222] font-bold text-sm transition-colors cursor-pointer"
              aria-label="Increase width"
            >
              +
            </button>
          </div>
        </div>

        {/* Height Input */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-[#FFFFFF] uppercase tracking-wider block">
            Height (Inches)
          </label>
          <div className="flex items-center border border-[#2D2D2D] focus-within:border-[#EAB308] rounded-xl bg-[#1A1A1A] overflow-hidden">
            <button
              type="button"
              onClick={() => onChangeHeight(Math.max(6, height - 1))}
              className="px-2.5 py-1.5 text-[#D1D5DB] hover:text-[#FFFFFF] hover:bg-[#222222] font-bold text-sm transition-colors cursor-pointer"
              aria-label="Decrease height"
            >
              -
            </button>
            <input
              type="number"
              min={6}
              max={120}
              value={height}
              onChange={(e) => onChangeHeight(Math.max(6, Math.min(120, Number(e.target.value) || 6)))}
              className="w-full bg-transparent text-center font-bold text-sm text-[#FFFFFF] outline-none py-1.5"
            />
            <button
              type="button"
              onClick={() => onChangeHeight(Math.min(120, height + 1))}
              className="px-2.5 py-1.5 text-[#D1D5DB] hover:text-[#FFFFFF] hover:bg-[#222222] font-bold text-sm transition-colors cursor-pointer"
              aria-label="Increase height"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Quick Dimension Presets */}
      <div className="space-y-1">
        <span className="text-[10px] font-semibold text-[#D1D5DB] block">Quick Presets:</span>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
          {PRESET_CUSTOM_SIZES.map((preset) => {
            const isMatch = width === preset.w && height === preset.h;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  onChangeWidth(preset.w);
                  onChangeHeight(preset.h);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all shrink-0 cursor-pointer ${
                  isMatch
                    ? 'bg-[#EAB308] text-black font-bold shadow-xs'
                    : 'bg-[#1C1C1C] hover:bg-[#262626] text-[#FFFFFF] border border-[#2D2D2D]'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Measurement & Conversion Bar */}
      <div className="bg-[#181818] border border-[#2D2D2D] rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[#EAB308] font-bold font-serif">
            {calc.widthInches}&quot; × {calc.heightInches}&quot; in
          </span>
          <span className="text-stone-500">•</span>
          <span className="text-[#D1D5DB] font-mono">
            {calc.cmWidth} × {calc.cmHeight} cm
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-[#D1D5DB]">
          <span>Area:</span>
          <strong className="text-[#FFFFFF]">{calc.sqFeet} sq ft</strong>
          <span className="text-stone-500">({calc.sqInches} sq in)</span>
        </div>
      </div>

      {/* WhatsApp Custom Size Price Notice */}
      <div className="bg-[#25D366]/10 border border-[#25D366]/40 rounded-xl p-2.5 flex items-center gap-2.5 text-xs text-[#FFFFFF]">
        <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0 fill-current" />
        <div>
          <span className="font-bold text-[#25D366] block">Price will be known in WhatsApp chat order</span>
          <span className="text-[10px] sm:text-[11px] text-[#D1D5DB]">
            Custom sizes are laser-cut to your exact dimensions. Direct quotation and digital proof will be shared in WhatsApp chat.
          </span>
        </div>
      </div>

      {!compact && (
        <p className="text-[11px] text-[#D1D5DB] leading-relaxed flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#EAB308] shrink-0" />
          <span>Every custom frame is cut to your exact millimeter dimensions at our Hyderabad atelier.</span>
        </p>
      )}
    </div>
  );
}
