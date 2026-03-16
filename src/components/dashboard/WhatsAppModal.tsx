import React from "react";
import { X, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Props {
  text: string;
  phone: string;
  onClose: () => void;
}

const WhatsAppModal = ({ text, phone, onClose }: Props) => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[1000] p-5">
    <div className="bg-[#1a2d40] rounded-2xl p-6 max-w-[440px] w-full border border-emerald-500/30">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">💬</span>
        <span className="font-bold text-emerald-400">WhatsApp Message Ready</span>
      </div>
      <pre className="bg-black/30 rounded-xl p-3.5 text-xs text-green-200 whitespace-pre-wrap break-words max-h-64 overflow-y-auto border border-emerald-500/15 leading-relaxed">
        {text}
      </pre>
      <div className="flex gap-2.5 mt-4">
        <button
          onClick={() => { navigator.clipboard?.writeText(text); toast.success("Copied!"); }}
          className="flex-1 py-2.5 bg-gradient-to-br from-teal-700 to-teal-600 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2"
        >
          <Copy className="w-4 h-4" /> Copy
        </button>
        <a
          href={`https://wa.me/${phone}?text=${encodeURIComponent(text)}`}
          target="_blank" rel="noreferrer"
          className="flex-1 py-2.5 bg-[#25D366] rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 no-underline"
        >
          <ExternalLink className="w-4 h-4" /> WhatsApp
        </a>
        <button onClick={onClose} className="px-3.5 py-2.5 bg-white/[0.08] rounded-xl text-gray-400 text-sm">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

export default WhatsAppModal;
