import { useState, useEffect } from "react";

const STAGES = [
  { id: "identified", label: "Identified", color: "#94a3b8", bg: "#f8fafc" },
  { id: "contact_made", label: "Contact Made", color: "#126b80", bg: "#f0fafb" },
  { id: "demo_booked", label: "Demo Booked", color: "#0e8a6d", bg: "#f0fdf9" },
  { id: "in_sales", label: "In Sales Process", color: "#2ee5b1", bg: "#f0fdf4" },
  { id: "proposal_sent", label: "Proposal Sent", color: "#0d9488", bg: "#f0fdfa" },
  { id: "closing", label: "Closing", color: "#059669", bg: "#ecfdf5" },
];

const INITIAL_LEADS = [
  { id: 1, name: "Ernest Smith", title: "President & CEO", company: "ES Fitness", phone: "202.746.2750", email: "ernest@es-fitness.com", location: "Washington, DC 20020", website: "www.es-fitness.com", stage: "contact_made", dealValue: 0, notes: "", nextAction: "", source: "HFA 2026", type: "Gym / Fitness Center" },
  { id: 2, name: "Gema Barrios", title: "Owner", company: "Movement Company", phone: "(626) 824-9241", email: "Gema@movementcompany.com", location: "", website: "", stage: "contact_made", dealValue: 0, notes: "", nextAction: "", source: "HFA 2026", type: "Fitness Studio" },
  { id: 3, name: "Shawn Sage", title: "Director of Operations", company: "Beverly Hills Club", phone: "(248) 642-8404 ext 210", email: "Shawn@beverlyhillsclub.com", location: "Beverly Hills, MI 48025", website: "www.BeverlyHillsclub.net", stage: "contact_made", dealValue: 0, notes: "", nextAction: "", source: "HFA 2026", type: "Private Club" },
  { id: 4, name: "James Thompson", title: "Fitness Manager", company: "The Country Club of Virginia", phone: "(804) 287-1313 ext 556", email: "james.thompson@theccv.org", location: "Richmond, VA 23226", website: "", stage: "contact_made", dealValue: 0, notes: "", nextAction: "", source: "HFA 2026", type: "Country Club" },
  { id: 5, name: "Birame Faye", title: "Founder & CEO", company: "Uplift Fitness Group", phone: "+52 624 154 7506", email: "birame@upliftfitnessgroup.com", location: "San José del Cabo, BCS, México", website: "www.upliftfitnessgroup.com", stage: "contact_made", dealValue: 0, notes: "", nextAction: "", source: "HFA 2026", type: "Fitness Group" },
  { id: 6, name: "Scott Eyler", title: "President", company: "Powertec", phone: "(636) 751-8572", email: "scott@powertec.com", location: "Paramount, CA 90723", website: "Powertec.com", stage: "contact_made", dealValue: 0, notes: "", nextAction: "", source: "HFA 2026", type: "Equipment Manufacturer" },
  { id: 7, name: "Mateus Conrado", title: "Director of Expansion, Mexico & Central America", company: "Smart Fit", phone: "", email: "", location: "Mexico / Central America", website: "", stage: "contact_made", dealValue: 0, notes: "", nextAction: "", source: "HFA 2026", type: "Gym Chain" },
  { id: 8, name: "Dr. Ted Vickey", title: "Founder and CEO", company: "FitWell", phone: "703-216-2789", email: "ted@fitwellinc.com", location: "", website: "linkedin.com/in/tedvickey", stage: "contact_made", dealValue: 0, notes: "", nextAction: "", source: "HFA 2026", type: "Fitness Tech" },
  { id: 9, name: "Mike Meluch", title: "", company: "Actively Inspired Solutions", phone: "312.545.2357", email: "mike@ais.fitness", location: "", website: "www.ais.fitness", stage: "contact_made", dealValue: 0, notes: "", nextAction: "", source: "HFA 2026", type: "Fitness Consulting" },
  { id: 10, name: "Tom Siegel", title: "Co-founder", company: "Fit-X", phone: "+1 203 241 2061", email: "tsiegel@fit-x.tech", location: "", website: "www.fit-x.tech", stage: "contact_made", dealValue: 0, notes: "", nextAction: "", source: "HFA 2026", type: "Fitness Tech" },
  { id: 11, name: "Alix Cowan", title: "Chief of Staff", company: "Athletech News", phone: "+1 (732) 320-1402", email: "alix@athletechnews.com", location: "", website: "athletechnews.com", stage: "contact_made", dealValue: 0, notes: "", nextAction: "", source: "HFA 2026", type: "Media / Press" },
  { id: 12, name: "Richard Robinson", title: "Chief Executive Officer", company: "MedVanta", phone: "(301) 291-5095", email: "Richard.Robinson@MedVanta.com", location: "Bethesda, MD 20817", website: "MedVanta.com", stage: "contact_made", dealValue: 0, notes: "", nextAction: "", source: "HFA 2026", type: "Healthcare / Medtech" },
  { id: 13, name: "Anderson Davis", title: "", company: "Anderson Davis Fitness", phone: "704-579-1002", email: "WDAVIS2001@GMAIL.COM", location: "Charlotte, NC", website: "", stage: "contact_made", dealValue: 0, notes: "", nextAction: "", source: "HFA 2026", type: "Personal Trainer" },
  { id: 14, name: "Kaylee Gunderman", title: "Fitness | Wellness | Operations", company: "", phone: "908-894-9523", email: "kgunderman01@gmail.com", location: "", website: "", stage: "contact_made", dealValue: 0, notes: "", nextAction: "", source: "HFA 2026", type: "Fitness Professional" },
];

const fmt = (v) => "$" + Number(v || 0).toLocaleString("en-US");
const fmtShort = (v) => {
  if (!v) return "$0";
  if (v >= 1000000) return "$" + (v / 1000000).toFixed(1) + "M";
  if (v >= 1000) return "$" + (v / 1000).toFixed(0) + "K";
  return "$" + v.toLocaleString();
};
const initials = (name) => name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
const stageColor = (sid) => STAGES.find(s => s.id === sid)?.color || "#94a3b8";

const MiltonLogo = ({ size = 120 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} viewBox="0 0 450 150" preserveAspectRatio="xMidYMid meet">
    <path fill="#126b80" d="M 237.32 56.78 C 235.85 55.53 234.02 54.87 232.11 54.95 C 230.06 54.95 228.08 55.68 226.61 57.07 C 225.66 58.02 225.07 59.27 224.93 60.66 L 224.93 103.48 C 225 105.03 225.66 106.49 226.83 107.45 L 226.91 107.52 C 228.37 108.69 230.13 109.35 232.04 109.35 C 234.09 109.43 236.07 108.62 237.54 107.23 C 238.49 106.27 239.08 105.03 239.23 103.63 L 239.23 60.74 C 239.23 59.2 238.49 57.8 237.32 56.78 Z"/>
    <path fill="#9af198" d="M 232.04 35.37 C 227.86 35.37 224.49 38.74 224.49 42.92 C 224.49 47.1 227.86 50.47 232.04 50.47 C 236.22 50.47 239.59 47.1 239.59 42.92 C 239.52 38.74 236.14 35.37 232.04 35.37 Z"/>
    <path fill="#126b80" d="M 368.86 74.6 C 368.71 70.34 367.39 66.24 365.2 62.64 C 364.32 61.18 363.21 59.86 361.97 58.76 C 360.94 57.8 359.84 56.93 358.67 56.12 C 354.79 53.99 350.46 52.75 346.06 52.45 C 343.86 52.3 341.59 52.38 339.39 52.67 L 339.31 52.67 C 331.46 53.92 325.68 57.51 322.01 63.3 C 319.88 66.82 318.63 70.79 318.34 74.89 C 318.34 75.11 318.34 75.33 318.34 75.55 L 318.34 86.04 C 318.34 86.33 318.34 86.62 318.41 86.91 C 318.56 91.17 319.88 95.27 322.08 98.87 C 322.96 100.33 324.06 101.65 325.31 102.82 C 326.33 103.78 327.43 104.66 328.61 105.46 C 332.49 107.59 336.82 108.84 341.22 109.13 C 342.1 109.2 342.83 109.2 343.57 109.2 C 345.03 109.2 346.43 109.13 347.89 108.91 L 347.96 108.91 C 355.81 107.66 361.6 104.07 365.27 98.28 C 367.39 94.76 368.64 90.8 368.93 86.7 C 368.93 86.47 368.93 86.25 368.93 86.04 L 368.93 75.48 C 368.93 75.18 368.86 74.89 368.86 74.6 Z M 345.98 95.2 C 344.08 95.49 342.1 95.49 340.12 95.2 C 332.49 93.37 332.57 85.59 332.57 85.23 L 332.57 78.34 C 332.71 67.56 340.85 66.31 341.14 66.24 C 342.1 66.09 343.13 66.02 344.08 66.02 C 345.03 66.02 346.06 66.09 347.01 66.24 C 354.56 68.07 354.56 75.84 354.56 76.21 L 354.56 83.1 C 354.42 93.95 346.28 95.13 345.98 95.2 Z"/>
    <path fill="#126b80" d="M 263.79 37.05 C 262.32 35.81 260.49 35.15 258.58 35.22 C 256.53 35.22 254.55 35.95 253.08 37.35 C 252.13 38.3 251.54 39.55 251.4 40.94 L 251.4 103.48 C 251.47 105.03 252.13 106.49 253.3 107.45 L 253.38 107.52 C 254.84 108.69 256.6 109.35 258.51 109.35 C 260.56 109.35 262.54 108.62 264.01 107.23 C 264.96 106.27 265.55 105.03 265.7 103.63 L 265.7 41.02 C 265.7 39.47 264.96 38.08 263.79 37.05 Z"/>
    <path fill="#126b80" d="M 425.54 57.51 C 421.95 54.87 417.77 53.11 413.3 52.53 C 412.71 52.45 399.88 50.55 391.3 55.9 C 390.86 56.19 380.74 62.5 380.74 74.38 L 380.74 103.48 C 380.96 105.54 382.65 109.5 387.93 109.5 L 388 109.5 C 388.59 109.5 391.66 109.43 393.64 107.45 C 394.75 106.34 395.33 104.88 395.26 103.34 L 395.26 75.84 C 395.26 75.55 395.26 68.22 402.88 66.02 C 405.38 65.36 408.02 65.29 410.58 65.72 C 410.95 65.8 419.97 66.82 419.97 78.26 L 419.97 103.41 C 419.89 105.03 420.55 106.57 421.66 107.66 C 423.64 109.5 426.71 109.43 427.08 109.43 C 427.45 109.43 430.53 109.5 432.58 107.59 C 433.68 106.49 434.27 105.03 434.2 103.48 L 434.2 75.62 C 434.12 72.03 433.24 68.58 431.7 65.36 C 430.31 62.28 428.18 59.57 425.54 57.51 Z"/>
    <path fill="#126b80" d="M 191.93 52.53 C 191.42 52.45 180.05 50.98 172.72 55.9 C 171.55 56.63 170.45 57.51 169.42 58.54 C 168.39 57.59 167.37 56.7 166.2 55.97 C 158.79 50.98 147.42 52.45 146.91 52.53 C 142.51 53.11 138.26 54.87 134.66 57.51 C 132.02 59.57 129.9 62.2 128.5 65.21 C 126.96 68.44 126.09 71.88 126.01 75.48 L 126.01 103.19 C 125.94 104.8 126.53 106.34 127.7 107.45 C 129.68 109.35 132.68 109.43 133.27 109.43 L 133.34 109.43 C 135.77 109.43 140.31 108.11 140.31 103.19 L 140.31 78.26 C 140.31 73.71 141.7 70.27 144.49 68.07 C 145.74 67.04 147.28 66.31 148.89 66.02 C 150.8 65.72 152.78 65.72 154.68 66.02 C 162.23 67.85 162.23 75.48 162.23 75.84 L 162.23 103.48 C 162.23 104.95 162.82 106.34 163.85 107.45 C 165.09 108.77 167 109.35 169.42 109.35 C 171.04 109.35 172.65 108.91 174.04 108.11 C 175.73 107.15 176.82 105.39 176.75 103.41 C 176.75 103.12 176.75 102.75 176.75 102.46 L 176.75 75.84 C 176.75 75.77 176.68 67.92 184.23 66.09 C 186.21 65.8 188.19 65.8 190.17 66.09 C 190.54 66.16 198.68 67.34 198.68 78.26 L 198.68 103.63 C 198.68 108.11 203.37 109.35 205.86 109.35 C 206.6 109.35 207.33 109.28 207.99 109.13 C 209.23 108.91 210.41 108.32 211.36 107.45 C 212.39 106.42 212.9 105.1 212.9 103.71 L 212.9 75.55 C 212.83 72.03 212.02 68.51 210.48 65.36 C 208.14 60.45 203 54.29 191.93 52.53 Z"/>
    <path fill="#126b80" d="M 303.53 67.12 C 305.44 67.19 307.27 66.53 308.66 65.21 C 309.91 63.82 310.64 61.98 310.64 60.08 C 310.71 58.25 310.05 56.56 308.73 55.24 C 306.54 53.11 303.24 53.18 303.09 53.18 L 297 53.18 L 297 41.23 C 297 38.45 295.17 35.22 290.04 35.22 L 289.09 35.22 C 284.46 35.22 282.78 38.38 282.78 41.38 L 282.78 53.18 L 282.56 53.18 C 280.65 53.11 278.82 53.77 277.43 55.09 C 276.18 56.48 275.45 58.32 275.45 60.22 C 275.38 62.06 276.04 63.75 277.35 65.06 C 278.89 66.38 280.8 67.12 282.85 67.12 L 282.85 91.09 C 282.85 91.17 282.63 100.04 287.62 105.46 C 290.04 108.11 293.41 109.57 296.93 109.57 C 297.22 109.64 299.35 109.64 302.87 109.64 C 305.36 109.64 307.34 108.91 308.66 107.59 C 309.84 106.34 310.57 104.66 310.57 102.9 C 310.57 100.48 309.84 98.64 308.44 97.47 C 306.02 95.35 302.36 95.86 302.29 95.86 L 300.45 95.86 C 298.25 95.64 297.08 93.44 297.08 89.7 L 297.08 67.12 Z"/>
  </svg>
);

export default function MiltonPipeline() {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [selected, setSelected] = useState(null);
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverStage, setDragOverStage] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLead, setNewLead] = useState({ name: "", title: "", company: "", phone: "", email: "", location: "", website: "", stage: "identified", dealValue: 0, notes: "", nextAction: "", source: "", type: "" });

  const totalPipeline = leads.reduce((s, l) => s + (Number(l.dealValue) || 0), 0);
  const weightedPipeline = leads.reduce((s, l) => {
    const w = { identified: 0.05, contact_made: 0.1, demo_booked: 0.25, in_sales: 0.5, proposal_sent: 0.75, closing: 0.9 };
    return s + (Number(l.dealValue) || 0) * (w[l.stage] || 0);
  }, 0);

  const updateLead = (id, updates) => {
    setLeads(p => p.map(l => l.id === id ? { ...l, ...updates } : l));
    if (selected?.id === id) setSelected(p => ({ ...p, ...updates }));
  };
  const moveLead = (id, ns) => updateLead(id, { stage: ns });
  const handleDragStart = (e, id) => { setDraggedId(id); e.dataTransfer.effectAllowed = "move"; };
  const handleDragOver = (e, sid) => { e.preventDefault(); setDragOverStage(sid); };
  const handleDrop = (e, sid) => { e.preventDefault(); if (draggedId) moveLead(draggedId, sid); setDraggedId(null); setDragOverStage(null); };
  const handleDragEnd = () => { setDraggedId(null); setDragOverStage(null); };
  const addNewLead = () => { const id = Math.max(...leads.map(l => l.id), 0) + 1; setLeads(p => [...p, { ...newLead, id, dealValue: Number(newLead.dealValue) || 0 }]); setNewLead({ name: "", title: "", company: "", phone: "", email: "", location: "", website: "", stage: "identified", dealValue: 0, notes: "", nextAction: "", source: "", type: "" }); setShowAddModal(false); };
  const deleteLead = (id) => { setLeads(p => p.filter(l => l.id !== id)); setSelected(null); };

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") { setSelected(null); setShowAddModal(false); } };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const stageLeads = (sid) => leads.filter(l => l.stage === sid);
  const stageValue = (sid) => stageLeads(sid).reduce((s, l) => s + (Number(l.dealValue) || 0), 0);

  const inp = { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, color: "#1e293b", fontSize: 13, padding: "8px 12px", width: "100%", outline: "none", fontFamily: "inherit", boxSizing: "border-box" };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", background: "#f8fafb", color: "#1e293b", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ padding: "14px 28px", borderBottom: "1px solid #e2e8f0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <MiltonLogo size={90} />
          <div style={{ width: 1, height: 28, background: "#e2e8f0" }} />
          <div style={{ fontSize: 15, fontWeight: 600, color: "#126b80", letterSpacing: "-0.3px" }}>Pipeline</div>
          <div style={{ fontSize: 11, color: "#64748b", background: "#f1f5f9", padding: "3px 10px", borderRadius: 20, fontWeight: 500 }}>{leads.length} leads</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px" }}>Total Pipeline</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#126b80", letterSpacing: "-0.5px" }}>{fmtShort(totalPipeline)}</div>
          </div>
          <div style={{ width: 1, height: 36, background: "#e2e8f0" }} />
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px" }}>Weighted</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#2ee5b1", letterSpacing: "-0.5px" }}>{fmtShort(weightedPipeline)}</div>
          </div>
          <button onClick={() => setShowAddModal(true)} style={{ background: "#126b80", color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit", boxShadow: "0 1px 3px rgba(18,107,128,0.2)" }}>
            <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> Add Lead
          </button>
        </div>
      </div>

      {/* Revenue Bar */}
      <div style={{ padding: "0 28px", paddingTop: 14, paddingBottom: 6, flexShrink: 0 }}>
        <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", height: 6, background: "#e2e8f0" }}>
          {STAGES.map(st => {
            const pct = totalPipeline > 0 ? (stageValue(st.id) / totalPipeline) * 100 : 0;
            return pct > 0 ? <div key={st.id} style={{ width: `${pct}%`, background: st.color, transition: "width 0.4s" }} /> : null;
          })}
        </div>
      </div>

      {/* Board */}
      <div style={{ flex: 1, overflow: "auto", padding: "10px 28px 28px" }}>
        <div style={{ display: "flex", gap: 10, minHeight: "calc(100vh - 150px)" }}>
          {STAGES.map(stage => {
            const sL = stageLeads(stage.id);
            const sV = stageValue(stage.id);
            const isDO = dragOverStage === stage.id;
            return (
              <div key={stage.id} onDragOver={(e) => handleDragOver(e, stage.id)} onDrop={(e) => handleDrop(e, stage.id)} onDragLeave={() => setDragOverStage(null)}
                style={{ flex: 1, minWidth: 210, background: isDO ? "#f0fafb" : "#fff", borderRadius: 12, display: "flex", flexDirection: "column", border: isDO ? `1.5px solid ${stage.color}50` : "1px solid #e8ecf0", transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ padding: "14px 14px 10px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: stage.color }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#475569" }}>{stage.label}</span>
                    </div>
                    <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, background: "#f8fafc", padding: "1px 7px", borderRadius: 10 }}>{sL.length}</span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: sV > 0 ? "#126b80" : "#cbd5e1" }}>
                    {fmt(sV)}<span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 400 }}>/mo</span>
                  </div>
                </div>
                <div style={{ flex: 1, padding: 6, overflowY: "auto", display: "flex", flexDirection: "column", gap: 5 }}>
                  {sL.map(lead => (
                    <div key={lead.id} draggable onDragStart={(e) => handleDragStart(e, lead.id)} onDragEnd={handleDragEnd} onClick={() => setSelected(lead)}
                      style={{ background: "#fff", borderRadius: 8, padding: "11px 12px", cursor: "pointer", border: "1px solid #f1f5f9", opacity: draggedId === lead.id ? 0.4 : 1, transition: "all 0.15s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${stage.color}40`; e.currentTarget.style.boxShadow = `0 2px 8px ${stage.color}10`; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#f1f5f9"; e.currentTarget.style.boxShadow = "none"; }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 30, height: 30, borderRadius: "50%", background: `${stage.color}12`, color: stage.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0, border: `1.5px solid ${stage.color}25` }}>
                          {initials(lead.name)}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{lead.name}</div>
                          <div style={{ fontSize: 11, color: "#94a3b8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{lead.company || lead.title || "—"}</div>
                        </div>
                      </div>
                      {lead.dealValue > 0 && <div style={{ marginTop: 8, fontSize: 14, fontWeight: 700, color: "#126b80" }}>{fmt(lead.dealValue)}<span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 400 }}>/mo</span></div>}
                      {lead.nextAction && <div style={{ marginTop: 6, fontSize: 10, color: "#126b80", background: "#f0fafb", padding: "3px 8px", borderRadius: 4, display: "inline-block", border: "1px solid #e0f2f4" }}>{lead.nextAction}</div>}
                    </div>
                  ))}
                  {sL.length === 0 && <div style={{ padding: 20, textAlign: "center", color: "#cbd5e1", fontSize: 12 }}>Drag leads here</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }} style={{ position: "fixed", inset: 0, background: "rgba(18,107,128,0.12)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, backdropFilter: "blur(4px)" }}>
          <div style={{ background: "#fff", borderRadius: 16, width: "90%", maxWidth: 560, maxHeight: "90vh", overflow: "auto", border: "1px solid #e2e8f0", boxShadow: "0 20px 60px rgba(18,107,128,0.1)" }}>
            <div style={{ padding: "24px 28px 16px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ width: 50, height: 50, borderRadius: "50%", background: `${stageColor(selected.stage)}10`, color: stageColor(selected.stage), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 700, border: `2px solid ${stageColor(selected.stage)}25` }}>{initials(selected.name)}</div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>{selected.name}</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>{selected.title || "—"}</div>
                  {selected.company && <div style={{ fontSize: 13, color: "#126b80", fontWeight: 500 }}>{selected.company}</div>}
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", color: "#94a3b8", fontSize: 16, cursor: "pointer", padding: "4px 10px", borderRadius: 6 }}>×</button>
            </div>
            <div style={{ padding: "20px 28px" }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 8 }}>Pipeline Stage</div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {STAGES.map(st => (
                    <button key={st.id} onClick={() => { moveLead(selected.id, st.id); setSelected(p => ({ ...p, stage: st.id })); }}
                      style={{ background: selected.stage === st.id ? st.color : "#f8fafc", color: selected.stage === st.id ? "#fff" : "#64748b", border: selected.stage === st.id ? "none" : "1px solid #e2e8f0", borderRadius: 6, padding: "6px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 8 }}>Deal Value (Monthly)</div>
                <div style={{ display: "flex", alignItems: "center", background: "#fff", borderRadius: 8, padding: "0 12px", border: "1px solid #e2e8f0" }}>
                  <span style={{ color: "#94a3b8", fontSize: 16, fontWeight: 600 }}>$</span>
                  <input type="number" value={selected.dealValue || ""} onChange={(e) => { const v = Number(e.target.value) || 0; updateLead(selected.id, { dealValue: v }); setSelected(p => ({ ...p, dealValue: v })); }} placeholder="0" style={{ background: "none", border: "none", color: "#126b80", fontSize: 22, fontWeight: 700, padding: "10px 8px", width: "100%", outline: "none", fontFamily: "inherit" }} />
                  <span style={{ color: "#94a3b8", fontSize: 12 }}>/mo</span>
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 8 }}>Contact Info</div>
                <div style={{ display: "grid", gap: 8 }}>
                  {[{ l: "Phone", f: "phone" }, { l: "Email", f: "email" }, { l: "Location", f: "location" }, { l: "Website", f: "website" }, { l: "Type", f: "type" }, { l: "Source", f: "source" }].map(({ l, f }) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 11, color: "#94a3b8", width: 60, flexShrink: 0, fontWeight: 500 }}>{l}</span>
                      <input value={selected[f] || ""} onChange={(e) => { updateLead(selected.id, { [f]: e.target.value }); setSelected(p => ({ ...p, [f]: e.target.value })); }} placeholder="—" style={inp} onFocus={(e) => e.currentTarget.style.borderColor = "#126b80"} onBlur={(e) => e.currentTarget.style.borderColor = "#e2e8f0"} />
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 8 }}>Notes</div>
                <textarea value={selected.notes || ""} onChange={(e) => { updateLead(selected.id, { notes: e.target.value }); setSelected(p => ({ ...p, notes: e.target.value })); }} placeholder="Add notes about this lead..." rows={3} style={{ ...inp, resize: "vertical" }} onFocus={(e) => e.currentTarget.style.borderColor = "#126b80"} onBlur={(e) => e.currentTarget.style.borderColor = "#e2e8f0"} />
              </div>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 8 }}>Next Action</div>
                <input value={selected.nextAction || ""} onChange={(e) => { updateLead(selected.id, { nextAction: e.target.value }); setSelected(p => ({ ...p, nextAction: e.target.value })); }} placeholder="e.g. Send follow-up email, Schedule demo..." style={inp} onFocus={(e) => e.currentTarget.style.borderColor = "#126b80"} onBlur={(e) => e.currentTarget.style.borderColor = "#e2e8f0"} />
              </div>
              <button onClick={() => deleteLead(selected.id)} style={{ background: "#fff", border: "1px solid #fecaca", borderRadius: 8, color: "#ef4444", fontSize: 12, fontWeight: 500, padding: "8px 16px", cursor: "pointer", fontFamily: "inherit" }} onMouseEnter={(e) => e.currentTarget.style.background = "#fef2f2"} onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}>Remove Lead</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div onClick={(e) => { if (e.target === e.currentTarget) setShowAddModal(false); }} style={{ position: "fixed", inset: 0, background: "rgba(18,107,128,0.12)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, backdropFilter: "blur(4px)" }}>
          <div style={{ background: "#fff", borderRadius: 16, width: "90%", maxWidth: 480, maxHeight: "90vh", overflow: "auto", border: "1px solid #e2e8f0", boxShadow: "0 20px 60px rgba(18,107,128,0.1)" }}>
            <div style={{ padding: "24px 28px 16px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#0f172a" }}>Add New Lead</div>
              <button onClick={() => setShowAddModal(false)} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", color: "#94a3b8", fontSize: 16, cursor: "pointer", padding: "4px 10px", borderRadius: 6 }}>×</button>
            </div>
            <div style={{ padding: "20px 28px" }}>
              {[{ l: "Name *", f: "name", p: "Contact name" }, { l: "Title", f: "title", p: "Job title" }, { l: "Company", f: "company", p: "Company name" }, { l: "Phone", f: "phone", p: "Phone number" }, { l: "Email", f: "email", p: "Email address" }, { l: "Location", f: "location", p: "City, State" }, { l: "Type", f: "type", p: "e.g. Gym, Studio, Club" }, { l: "Source", f: "source", p: "e.g. HFA 2026, Seamless AI" }].map(({ l, f, p }) => (
                <div key={f} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, marginBottom: 4 }}>{l}</div>
                  <input value={newLead[f]} onChange={(e) => setNewLead(prev => ({ ...prev, [f]: e.target.value }))} placeholder={p} style={inp} onFocus={(e) => e.currentTarget.style.borderColor = "#126b80"} onBlur={(e) => e.currentTarget.style.borderColor = "#e2e8f0"} />
                </div>
              ))}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, marginBottom: 4 }}>Starting Stage</div>
                <select value={newLead.stage} onChange={(e) => setNewLead(prev => ({ ...prev, stage: e.target.value }))} style={{ ...inp, appearance: "auto" }}>
                  {STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>
              <button onClick={addNewLead} disabled={!newLead.name.trim()} style={{ background: newLead.name.trim() ? "#126b80" : "#e2e8f0", color: newLead.name.trim() ? "#fff" : "#94a3b8", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 14, fontWeight: 600, cursor: newLead.name.trim() ? "pointer" : "default", fontFamily: "inherit", width: "100%", marginTop: 8, boxShadow: newLead.name.trim() ? "0 1px 3px rgba(18,107,128,0.2)" : "none" }}>Add to Pipeline</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
