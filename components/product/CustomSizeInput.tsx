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
    <div className="bg-white border-2 border-amber-300 rounded-2xl p-3.5 sm:p-4.5 space-y-3.5 shadow-sm animate-fade-in text-stone-900">
      <div className="flex items-center justify-between border-b border-stone-200 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-300 flex items-center justify-center text-amber-700">
            <Ruler className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>Enter Custom Dimensions</span>
              <span className="text-[10px] text-amber-700 font-normal normal-case">(Inches)</span>
            </h4>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          Laser Cut to Size
        </span>
      </div>

      {/* Input Rows: Width and Height */}
      <div className="grid grid-cols-2 gap-3">
        {/* Width Input */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-stone-800 uppercase tracking-wider block">
            Width (Inches)
          </label>
          <div className="flex items-center border border-stone-300 focus-within:border-amber-500 rounded-xl bg-stone-50 overflow-hidden">
            <button
              type="button"
              onClick={() => onChangeWidth(Math.max(6, width - 1))}
              className="px-2.5 py-1.5 text-stone-700 hover:text-stone-950 hover:bg-stone-200 font-bold text-sm transition-colors cursor-pointer"
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
              className="w-full bg-transparent text-center font-bold text-sm text-stone-900 outline-none py-1.5"
            />
            <button
              type="button"
              onClick={() => onChangeWidth(Math.min(120, width + 1))}
              className="px-2.5 py-1.5 text-stone-700 hover:text-stone-950 hover:bg-stone-200 font-bold text-sm transition-colors cursor-pointer"
              aria-label="Increase width"
            >
              +
            </button>
          </div>
        </div>

        {/* Height Input */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-stone-800 uppercase tracking-wider block">
            Height (Inches)
          </label>
          <div className="flex items-center border border-stone-300 focus-within:border-amber-500 rounded-xl bg-stone-50 overflow-hidden">
            <button
              type="button"
              onClick={() => onChangeHeight(Math.max(6, height - 1))}
              className="px-2.5 py-1.5 text-stone-700 hover:text-stone-950 hover:bg-stone-200 font-bold text-sm transition-colors cursor-pointer"
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
              className="w-full bg-transparent text-center font-bold text-sm text-stone-900 outline-none py-1.5"
            />
            <button
              type="button"
              onClick={() => onChangeHeight(Math.min(120, height + 1))}
              className="px-2.5 py-1.5 text-stone-700 hover:text-stone-950 hover:bg-stone-200 font-bold text-sm transition-colors cursor-pointer"
              aria-label="Increase height"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Quick Dimension Presets */}
      <div className="space-y-1">
        <span className="text-[10px] font-semibold text-stone-500 block">Quick Presets:</span>
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
                    ? 'bg-[#EAB308] text-stone-950 font-bold shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Measurement & Conversion Bar */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-amber-800 font-bold font-serif">
            {calc.widthInches}&quot; × {calc.heightInches}&quot; in
          </span>
          <span className="text-stone-400">•</span>
          <span className="text-stone-600 font-mono">
            {calc.cmWidth} × {calc.cmHeight} cm
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-stone-600">
          <span>Area:</span>
          <strong className="text-stone-900">{calc.sqFeet} sq ft</strong>
          <span className="text-stone-400">({calc.sqInches} sq in)</span>
        </div>
      </div>

      {/* Auto-Calculated Price Display */}
      <div className="bg-amber-50/80 border border-amber-300 rounded-xl p-3 flex items-center justify-between gap-3 text-xs text-stone-900 shadow-2xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0">
            <Sparkles className="w-4 h-4 text-amber-700" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-stone-900 block">
              Auto-Calculated Custom Size Price
            </span>
            <span className="text-[10px] text-stone-700 font-medium">
              Proportionally calculated from standard sizes &amp; finishes
            </span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="flex items-baseline gap-1.5 justify-end">
            <span className="font-serif font-bold text-base sm:text-lg text-stone-900">
              ₹{calc.price.toLocaleString('en-IN')}
            </span>
            {calc.mrp > calc.price && (
              <span className="text-[11px] text-stone-400 line-through">
                ₹{calc.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          {calc.discountPercent > 0 && (
            <span className="text-[9px] font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-200">
              Save {calc.discountPercent}%
            </span>
          )}
        </div>
      </div>

      {!compact && (
        <p className="text-[11px] text-stone-700 font-medium leading-relaxed flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Every custom frame is cut to your exact millimeter dimensions at our Hyderabad atelier.</span>
        </p>
      )}
    </div>
  );
}
