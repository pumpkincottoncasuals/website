'use client';

import React from 'react';
import { useStore } from '@/context/store-context';
import { CheckCircle2 } from 'lucide-react';

export function Toast() {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-sm bg-[#212121] px-4 py-3 text-white shadow-lg transition-all animate-in fade-in slide-in-from-bottom-2 duration-300">
      <CheckCircle2 className="h-4 w-4 text-[#6FC341] shrink-0" />
      <span className="text-[13px] font-medium leading-tight">{toastMessage}</span>
    </div>
  );
}

