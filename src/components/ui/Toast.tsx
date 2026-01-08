import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

// --- PENTING: Export semua tipe ini agar bisa dibaca useToast.ts ---
export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: number) => void;
}

export const ToastContainer = ({ toasts, removeToast }: ToastContainerProps) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div 
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl transform transition-all duration-300 animate-fade-in-up min-w-[300px]
            ${toast.type === 'success' ? 'bg-teal-600 text-white' : 
              toast.type === 'error' ? 'bg-red-500 text-white' : 
              'bg-gray-800 text-white'}
          `}
        >
          {toast.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : 
           toast.type === 'error' ? <AlertCircle className="w-5 h-5 flex-shrink-0" /> : 
           <Info className="w-5 h-5 flex-shrink-0" />}
           
          <p className="text-sm font-bold flex-1">{toast.message}</p>
          
          <button 
            onClick={() => removeToast(toast.id)} 
            className="opacity-70 hover:opacity-100 ml-2 p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};