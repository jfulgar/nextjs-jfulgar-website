"use client";
import React, { useState, useEffect } from "react";
import { MagneticCard } from "./Animations";

function Modal({ card, onClose }: { card: any, onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = card ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [card, onClose]);

  if (!card) return null;

  return (
    <>
      <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(10,10,10,0.72)",backdropFilter:"blur(6px)",zIndex:200}} />
      <div style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"min(1100px,92vw)",maxHeight:"86vh",background:"#fff",zIndex:201,overflowY:"auto",animation:"modalIn 0.4s cubic-bezier(0.6,0.05,0.2,1)"}}>
        <div style={{padding:"32px 40px",display:"flex",justifyContent:"space-between",alignItems:"baseline",borderBottom:"1px solid #e8e8e8",position:"sticky",top:0,background:"#fff",zIndex:2}}>
          <h2 style={{fontFamily:"Inter Tight,sans-serif",fontWeight:500,fontSize:34,letterSpacing:"-0.02em"}}>{card.title}</h2>
          <button onClick={onClose} style={{fontFamily:"JetBrains Mono,monospace",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase" as const,color:"#6b6b6b",background:"none",border:"none",cursor:"pointer"}}>Close ✕</button>
        </div>
        <div style={{padding:40,display:"grid",gridTemplateColumns:"1fr 2fr",gap:48}}>
          <div style={{display:"flex",flexDirection:"column" as const,gap:24}}>
            {[{k:"Role",v:card.role},{k:"Timeline",v:card.timeline},{k:"Scope",v:card.scope},{k:"Partners",v:card.partners}].filter(({v})=>v).map(({k,v})=>(
              <div key={k} style={{display:"flex",flexDirection:"column" as const,gap:4}}>
                <div style={{fontFamily:"JetBrains Mono,monospace",fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase" as const,color:"#6b6b6b"}}>{k}</div>
                <div style={{fontSize:15}}>{v}</div>
              </div>
            ))}
          </div>
          <div>
            {card.paragraphs?.map((p: string, i: number) => (
              <p key={i} style={{fontSize:17,lineHeight:1.6,color:"#1a1a1a",marginBottom:18}}>{p}</p>
            ))}
            {card.highlights?.length > 0 && (
              <>
                <div style={{marginTop:32,marginBottom:12,fontFamily:"JetBrains Mono,monospace",fontSize:11,letterSpacing:"0.14em",textTransform:"uppercase" as const,color:"#6b6b6b"}}>Highlights</div>
                <ul style={{listStyle:"none",display:"flex",flexDirection:"column" as const,gap:8}}>
                  {card.highlights.map((h: string, i: number) => (
                    <li key={i} style={{paddingLeft:18,position:"relative",fontSize:15,lineHeight:1.5}}>
                      <span style={{position:"absolute",left:0,color:"#6b6b6b",fontFamily:"JetBrains Mono,monospace"}}>→</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
        <style>{"@keyframes modalIn{from{opacity:0;transform:translate(-50%,-48%) scale(0.98)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}"}</style>
      </div>
    </>
  );
}

export function WorkSection({ work }: { work: any[] }) {
  const [active, setActive] = useState<any>(null);
  return (
    <>
      <section id="work" className="reveal" style={{paddingTop:120,paddingBottom:120,paddingLeft:40,paddingRight:40,maxWidth:1440,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,fontFamily:"JetBrains Mono,monospace",fontSize:11,letterSpacing:"0.14em",textTransform:"uppercase" as const,color:"#6b6b6b",marginBottom:18}}>
          <span style={{width:28,height:1,background:"#6b6b6b",display:"inline-block"}}/>Work
        </div>
        <div className="section-head" style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:40,paddingBottom:72,alignItems:"end"}}>
          <h2 style={{fontWeight:500,fontSize:"clamp(32px,5vw,64px)",lineHeight:1,letterSpacing:"-0.03em"}}>Case studies, in brief.</h2>
          <p style={{fontSize:17,lineHeight:1.55,color:"#1a1a1a",maxWidth:560}}>A slice of the last decade — brand ecosystems, product launches, and the occasional 23-market rollout. Tap a card to open the deep-dive.</p>
        </div>
        <div className="work-grid" style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:24}}>
          {work.map((item: any, i: number) => {
            const span = item.gridSpan ?? "6";
            return (
              <MagneticCard key={i} span={span} style={{background:"#f4f4f2",overflow:"hidden",cursor:"pointer"}} onClick={() => setActive(item)}>
                <div className="cover-inner" style={{aspectRatio:"16/10",position:"relative",background:"linear-gradient(135deg,#f4f4f2 0%,#e6e6e3 100%)",overflow:"hidden",transition:"transform 0.5s cubic-bezier(0.2,0.7,0.2,1)"}}>
                  <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(135deg,transparent 0 20px,rgba(0,0,0,0.03) 20px 21px)"}}/>
                  {item.coverLabel&&<span style={{position:"absolute",top:20,left:20,fontFamily:"JetBrains Mono,monospace",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase" as const,color:"#6b6b6b"}}>{item.coverLabel}</span>}
                  <div style={{position:"absolute",left:24,right:24,bottom:20,fontWeight:500,fontSize:"clamp(28px,6vw,84px)",letterSpacing:"-0.03em",lineHeight:0.95,color:"#0a0a0a"}}>
                    {(item.coverText??item.title).split(" ").map((word: string, wi: number) => {
                      const iw=["home.","momentum.","built","next","wave."];
                      const isI=iw.some((w: string)=>word.toLowerCase().includes(w));
                      return <span key={wi} style={{fontStyle:isI?"italic":"normal",opacity:isI?0.4:1}}>{word}{" "}</span>;
                    })}
                  </div>
                </div>
                <div style={{padding:"20px 4px 24px",display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:20}}>
                  <div style={{display:"flex",alignItems:"baseline",gap:12}}>
                    <h3 style={{fontWeight:500,fontSize:22,letterSpacing:"-0.015em"}}>{item.title}</h3>
                    <span style={{fontFamily:"JetBrains Mono,monospace",fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase" as const,color:"#6b6b6b"}}>{item.category}</span>
                  </div>
                  <span style={{fontFamily:"JetBrains Mono,monospace",fontSize:12,color:"#6b6b6b"}}>{item.year} ↗</span>
                </div>
              </MagneticCard>
            );
          })}
        </div>
      </section>
      <Modal card={active} onClose={() => setActive(null)} />
    </>
  );
}
