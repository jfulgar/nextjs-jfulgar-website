"use client";
import React, { useState } from "react";
import { MagneticCard, Modal } from "./Animations";

export function WorkSection({ work }: { work: any[] }) {
  const [active, setActive] = useState<any>(null);

  return (
    <>
      <section id="work" className="reveal" style={{paddingTop:120,paddingBottom:120,paddingLeft:40,paddingRight:40,maxWidth:1440,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,fontFamily:"JetBrains Mono,monospace",fontSize:11,letterSpacing:"0.14em",textTransform:"uppercase",color:"#6b6b6b",marginBottom:18}}>
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
                  {item.coverLabel && <span style={{position:"absolute",top:20,left:20,fontFamily:"JetBrains Mono,monospace",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"#6b6b6b"}}>{item.coverLabel}</span>}
                  <div style={{position:"absolute",left:24,right:24,bottom:20,fontWeight:500,fontSize:"clamp(28px,6vw,84px)",letterSpacing:"-0.03em",lineHeight:0.95,color:"#0a0a0a"}}>
                    {(item.coverText ?? item.title).split(" ").map((word: string, wi: number) => {
                      const iw = ["home.","momentum.","built","next","wave."];
                      const isI = iw.some((w: string) => word.toLowerCase().includes(w));
                      return <span key={wi} style={{fontStyle:isI?"italic":"normal",opacity:isI?0.4:1}}>{word}{" "}</span>;
                    })}
                  </div>
                </div>
                <div style={{padding:"20px 4px 0",display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:20,paddingBottom:24}}>
                  <div style={{display:"flex",alignItems:"baseline",gap:12}}>
                    <h3 style={{fontWeight:500,fontSize:22,letterSpacing:"-0.015em"}}>{item.title}</h3>
                    <span style={{fontFamily:"JetBrains Mono,monospace",fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",color:"#6b6b6b"}}>{item.category}</span>
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
