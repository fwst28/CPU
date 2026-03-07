import React, { useState, useEffect, useRef } from "react";
import { 
  Search, 
  History, 
  ExternalLink, 
  AlertCircle, 
  ShieldCheck, 
  Globe, 
  ChevronRight,
  Copy,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TRIBUNALS, Tribunal, System, Section } from "./data/tribunals";
import { Modal } from "./components/Modal";
import { OtterIcon } from "./components/OtterIcon";

type Mode = "PUBLIC" | "SYSTEM";

interface SearchHistoryItem {
  cnj: string;
  tribunal: string;
  timestamp: number;
}

export default function App() {
  const [cnj, setCnj] = useState("");
  const [mode, setMode] = useState<Mode>("PUBLIC");
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Modal States
  const [activeModal, setActiveModal] = useState<"TRF_AMBIGUITY" | "SYSTEM_CHOICE" | "SECTION_CHOICE" | "INSTANCE_CHOICE" | null>(null);
  const [selectedTribunal, setSelectedTribunal] = useState<{ key: string; info: Tribunal } | null>(null);
  const [selectedSystem, setSelectedSystem] = useState<System | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("search_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const saveToHistory = (cnj: string, tribunal: string) => {
    const newItem = { cnj, tribunal, timestamp: Date.now() };
    const updated = [newItem, ...history.filter(h => h.cnj !== cnj)].slice(0, 5);
    setHistory(updated);
    localStorage.setItem("search_history", JSON.stringify(updated));
  };

  const formatCnj = (value: string) => {
    const digits = value.replace(/\D/g, "");
    let res = "";
    if (digits.length > 0) res += digits.substring(0, 7);
    if (digits.length > 7) res += "-" + digits.substring(7, 9);
    if (digits.length > 9) res += "." + digits.substring(9, 13);
    if (digits.length > 13) res += "." + digits.substring(13, 14);
    if (digits.length > 14) res += "." + digits.substring(14, 16);
    if (digits.length > 16) res += "." + digits.substring(16, 20);
    return res;
  };

  const handleCnjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const originalSelectionStart = input.selectionStart ?? 0;
    const originalValue = input.value;
    
    // Count digits before cursor to restore position correctly
    const digitsBeforeCursor = originalValue.substring(0, originalSelectionStart).replace(/\D/g, "").length;
    
    const formatted = formatCnj(originalValue);
    
    if (formatted.length <= 25) {
      setCnj(formatted);
      setError(null);
      
      // Restore cursor position in next tick
      setTimeout(() => {
        if (inputRef.current) {
          let newPos = 0;
          let digitCount = 0;
          const val = inputRef.current.value;
          
          for (let i = 0; i < val.length; i++) {
            if (digitCount === digitsBeforeCursor) {
              newPos = i;
              break;
            }
            if (/\d/.test(val[i])) {
              digitCount++;
            }
            newPos = i + 1;
          }
          inputRef.current.setSelectionRange(newPos, newPos);
        }
      }, 0);
    }
  };

  const identifyTribunal = () => {
    const cleanCnj = cnj.replace(/\D/g, "");
    if (cleanCnj.length !== 20) {
      setError("O número CNJ deve conter exatamente 20 dígitos.");
      return;
    }

    const ramoJustica = cleanCnj.substring(13, 14);
    const codigoTribunal = cleanCnj.substring(14, 16);

    let tribunalKey: string;

    if (ramoJustica === "4") {
      tribunalKey = ramoJustica + codigoTribunal;
      if (tribunalKey === "401") {
        setActiveModal("TRF_AMBIGUITY");
        return;
      }
    } else if (["0", "9"].includes(ramoJustica)) {
      tribunalKey = codigoTribunal;
      const info = TRIBUNALS[tribunalKey];
      if (info?.url) {
        window.open(info.url + cleanCnj, "_blank");
        saveToHistory(cnj, info.name);
        return;
      }
    } else {
      tribunalKey = ramoJustica + codigoTribunal;
    }

    const info = TRIBUNALS[tribunalKey];
    if (!info) {
      setError(`Tribunal (Código ${tribunalKey}) não encontrado na base de dados.`);
      return;
    }

    setSelectedTribunal({ key: tribunalKey, info });
    startActionFlow(info);
  };

  const startActionFlow = (info: Tribunal) => {
    if (mode === "PUBLIC") {
      setActiveModal("INSTANCE_CHOICE");
    } else {
      handleLoginFlow(info);
    }
  };

  const handleLoginFlow = (info: Tribunal) => {
    const loginInfo = info.loginInfo;
    if (!loginInfo) {
      setError("Acesso ao sistema não disponível para este tribunal.");
      return;
    }

    if (loginInfo.multiSystem) {
      setActiveModal("SYSTEM_CHOICE");
    } else if (loginInfo.sections) {
      setActiveModal("SECTION_CHOICE");
    } else {
      setActiveModal("INSTANCE_CHOICE");
    }
  };

  const executeRedirect = (instance: 1 | 2) => {
    if (!selectedTribunal) return;
    const { info, key } = selectedTribunal;
    let finalUrl: string | undefined;

    if (mode === "PUBLIC") {
      finalUrl = instance === 1 ? info.url1aInstancia : info.url2aInstancia;
      if (key === "406" && finalUrl) {
        const separator = finalUrl.includes("?") ? "&" : "?";
        finalUrl += `${separator}txtNumProcesso=${cnj.replace(/\D/g, "")}`;
      }
    } else {
      if (selectedSystem) {
        finalUrl = instance === 1 ? selectedSystem.url1 : selectedSystem.url2;
      } else if (info.loginInfo) {
        finalUrl = instance === 1 ? info.loginInfo.url1 : info.loginInfo.url2;
      }
    }

    if (finalUrl) {
      window.open(finalUrl, "_blank");
      saveToHistory(cnj, info.name);
      closeModals();
    }
  };

  const closeModals = () => {
    setActiveModal(null);
    setSelectedSystem(null);
    // Keep selectedTribunal for the exit animation if needed, or clear it
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cnj.replace(/\D/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative">
      {/* Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-brand-accent-green/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-brand-accent-purple/30 rounded-full blur-3xl" />
      </div>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white rounded-3xl shadow-xl shadow-brand-dark/5 border border-brand-light overflow-hidden"
      >
        {/* Header */}
        <div className="p-8 pb-6 border-b border-brand-light bg-brand-surface/50">
          <div className="flex items-center gap-4">
            <OtterIcon className="w-12 h-12 shrink-0" />
            <h1 className="text-2xl font-bold text-brand-dark tracking-tight leading-tight">
              Consulta Processual Unificada
            </h1>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Mode Selector */}
          <div className="relative flex p-1.5 bg-brand-light/30 rounded-2xl border border-brand-muted/20 overflow-hidden">
            <motion.div
              className="absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-sm ring-1 ring-brand-muted/20 z-0"
              initial={false}
              animate={{ x: mode === "PUBLIC" ? "0%" : "100%" }}
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
            />
            <button
              onClick={() => setMode("PUBLIC")}
              className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-300 z-10 ${
                mode === "PUBLIC" ? "text-brand-primary" : "text-brand-muted hover:text-brand-dark"
              }`}
            >
              <Globe size={16} className="hidden sm:block" />
              Consulta Pública
            </button>
            <button
              onClick={() => setMode("SYSTEM")}
              className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-300 z-10 ${
                mode === "SYSTEM" ? "text-brand-primary" : "text-brand-muted hover:text-brand-dark"
              }`}
            >
              <ShieldCheck size={16} className="hidden sm:block" />
              Acesso ao Sistema
            </button>
          </div>

          {/* Input Area */}
          <div className="space-y-4">
            <div className="relative group">
              <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2 ml-1">
                Número do Processo (CNJ)
              </label>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={cnj}
                  onChange={handleCnjChange}
                  placeholder="0000000-00.0000.0.00.0000"
                  className="w-full bg-brand-surface border-2 border-brand-light rounded-2xl py-4 px-5 text-lg text-brand-dark placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-primary focus:bg-white transition-all duration-200"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {cnj && (
                    <button 
                      onClick={copyToClipboard}
                      className="p-2 hover:bg-brand-light/50 rounded-lg text-brand-muted hover:text-brand-primary transition-colors"
                      title="Copiar apenas números"
                    >
                      {copied ? <Check size={18} className="text-brand-secondary" /> : <Copy size={18} />}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm"
                >
                  <AlertCircle size={18} className="shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={identifyTribunal}
              className="w-full bg-brand-primary hover:opacity-90 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-3 transition-all duration-200 active:scale-[0.98]"
            >
              <Search size={20} />
              Identificar Tribunal
            </button>
          </div>

          {/* History */}
          {history.length > 0 && (
            <div className="pt-4 border-t border-brand-light">
              <div className="flex items-center justify-between mb-4 text-brand-muted">
                <div className="flex items-center gap-2">
                  <History size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Buscas Recentes</span>
                </div>
                <button 
                  onClick={() => {
                    setHistory([]);
                    localStorage.removeItem("search_history");
                  }}
                  className="text-[10px] font-bold uppercase tracking-wider hover:text-red-500 transition-colors"
                >
                  Limpar
                </button>
              </div>
              <div className="space-y-2">
                {history.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCnj(item.cnj)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-brand-surface text-left transition-colors group"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm text-brand-dark/80 group-hover:text-brand-primary transition-colors">
                        {item.cnj}
                      </span>
                      <span className="text-[10px] font-bold text-brand-muted uppercase">
                        {item.tribunal}
                      </span>
                    </div>
                    <ChevronRight size={14} className="text-brand-muted/50 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.main>

      {/* Modals */}
      <Modal 
        isOpen={activeModal === "TRF_AMBIGUITY"} 
        onClose={closeModals} 
        title="Ambiguidade Detectada"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-500 mb-4">
            O código 01 pode pertencer ao TRF1 ou ao novo TRF6. Por favor, selecione:
          </p>
          <button
            onClick={() => {
              const info = TRIBUNALS["401"];
              setSelectedTribunal({ key: "401", info });
              startActionFlow(info);
            }}
            className="w-full p-4 rounded-2xl bg-brand-accent-purple/10 border border-brand-accent-purple/20 text-brand-primary font-bold hover:bg-brand-accent-purple/20 transition-colors flex items-center justify-between"
          >
            TRF1 (1ª Região)
            <ChevronRight size={18} />
          </button>
          <button
            onClick={() => {
              const info = TRIBUNALS["406"];
              setSelectedTribunal({ key: "406", info });
              startActionFlow(info);
            }}
            className="w-full p-4 rounded-2xl bg-brand-accent-green/10 border border-brand-accent-green/20 text-brand-secondary font-bold hover:bg-brand-accent-green/20 transition-colors flex items-center justify-between"
          >
            TRF6 (6ª Região)
            <ChevronRight size={18} />
          </button>
        </div>
      </Modal>

      <Modal 
        isOpen={activeModal === "SYSTEM_CHOICE"} 
        onClose={closeModals} 
        title="Selecione o Sistema"
      >
        <div className="space-y-3">
          {selectedTribunal?.info.loginInfo?.systems?.map((sys, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedSystem(sys);
                setActiveModal("INSTANCE_CHOICE");
              }}
              className="w-full p-4 rounded-2xl bg-brand-surface border border-brand-light text-brand-dark font-bold hover:bg-brand-light hover:border-brand-primary transition-all flex items-center justify-between group"
            >
              Acessar via {sys.name}
              <ChevronRight size={18} className="text-brand-muted/50 group-hover:text-brand-primary" />
            </button>
          ))}
        </div>
      </Modal>

      <Modal 
        isOpen={activeModal === "SECTION_CHOICE"} 
        onClose={closeModals} 
        title="Seção Judiciária"
      >
        <div className="space-y-2">
          {selectedTribunal?.info.loginInfo?.sections?.map((sec, idx) => (
            <button
              key={idx}
              onClick={() => {
                window.open(sec.url, "_blank");
                saveToHistory(cnj, selectedTribunal.info.name);
                closeModals();
              }}
              className="w-full p-4 rounded-xl bg-white border border-brand-light text-brand-dark font-medium hover:bg-brand-surface hover:border-brand-primary transition-all flex items-center justify-between group"
            >
              {sec.name}
              <ExternalLink size={16} className="text-brand-muted/50 group-hover:text-brand-primary" />
            </button>
          ))}
        </div>
      </Modal>

      <Modal 
        isOpen={activeModal === "INSTANCE_CHOICE"} 
        onClose={closeModals} 
        title="Selecione a Instância"
      >
        <div className="text-center mb-6">
          <h4 className="text-xl font-bold text-brand-dark">
            {selectedTribunal?.info.name}
          </h4>
          {selectedSystem && (
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">
              Sistema {selectedSystem.name}
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => executeRedirect(1)}
            className="flex items-center justify-between p-5 rounded-2xl bg-brand-secondary text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-brand-secondary/20 group"
          >
            <div className="flex flex-col items-start">
              <span className="text-lg">1ª Instância</span>
              <span className="text-xs opacity-80 font-normal">Justiça de 1º Grau</span>
            </div>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => executeRedirect(2)}
            className="flex items-center justify-between p-5 rounded-2xl bg-brand-primary text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-brand-primary/20 group"
          >
            <div className="flex flex-col items-start">
              <span className="text-lg">2ª Instância</span>
              <span className="text-xs opacity-80 font-normal">Tribunal / Colegiado</span>
            </div>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </Modal>
    </div>
  );
}
