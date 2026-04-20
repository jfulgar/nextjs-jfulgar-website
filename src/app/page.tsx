import { client } from "@/sanity/client";
import { Cursor, ParallaxMark, ScrollReveal, MagneticCard } from "@/components/Animations";

const SITE_QUERY = `{
  "settings": *[_type == "settings"][0],
  "hero": *[_type == "hero"][0],
  "marquee": *[_type == "marquee"][0],
  "about": *[_type == "about"][0],
  "experience": *[_type == "experience"] | order(order asc),
  "work": *[_type == "work"] | order(order asc),
  "sports": *[_type == "sportsPane"][0],
  "fintech": *[_type == "fintechPane"][0],
}`;

export default async function Home() {
  const data = await client.fetch(SITE_QUERY, {}, { next: { revalidate: 30 } });
  const { settings, hero, marquee, about, experience, work, sports, fintech } = data;
  const heroText = hero?.headlines?.find((h: any) => h.isDefault)?.text ?? "Designing products. Growing brands. Building ecosystems.";
  const italicWords = ["products.", "brands.", "ecosystems.", "products,", "platforms", "Creative", "Operator."];
  const renderHL = (text: string) => text.split(" ").map((w: string, i: number) => {
    const clean = w.replace(/[.,]/g,"").toLowerCase();
    const isItalic = italicWords.some(iw => iw.replace(/[.,]/g,"").toLowerCase() === clean);
    return <span key={i} style={{fontStyle: isItalic?"italic":"normal", fontWeight: isItalic?400:500}}>{w}{" "}</span>;
  });

  return (
    <><Cursor /><ScrollReveal /><main style={{fontFamily:"'Inter Tight','Helvetica Neue',sans-serif",background:"#fff",color:"#0a0a0a",minHeight:"100vh",overflowX:"hidden"}}>

      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"20px 40px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(255,255,255,0.85)",backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",borderBottom:"1px solid #e8e8e8"}}>
        <span style={{fontWeight:600,fontSize:15,letterSpacing:"0.22em"}}>♠ ACE</span>
        <div style={{display:"flex",gap:32}}>
          {["Work","Brand","Sports Ecosystems","Fintech UX","Connect"].map(l=>(
            <span key={l} style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase" as const,color:"#6b6b6b",cursor:"pointer"}}>{l}</span>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase" as const,color:"#6b6b6b"}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:"#2ecc71",display:"inline-block"}}/>
          Available for select projects
        </div>
      </nav>

      <section className="hero-section" style={{minHeight:"100vh",paddingTop:140,paddingBottom:80,paddingLeft:40,paddingRight:40,maxWidth:1440,margin:"0 auto",display:"flex",flexDirection:"column" as const,justifyContent:"space-between",position:"relative"}}>
        <div className="hero-meta" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:24,paddingBottom:40}}>
          {[{label:"Index",val:hero?.indexLabel??"01 — Portfolio"},{label:"Skill",val:hero?.basedLabel??"Twenty, 24 — Est"},{label:"The Job",val:hero?.practiceLabel??"Brand + Product — D.I."},{label:"Year",val:hero?.yearLabel??"While"}].map((cell,i)=>(
            <div key={i} style={{display:"flex",flexDirection:"column" as const,gap:6}}>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:"0.08em",textTransform:"uppercase" as const,color:"#6b6b6b"}}>{cell.label}</span>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12}}>{cell.val}</span>
            </div>
          ))}
        </div>
        <h1 style={{fontWeight:500,fontSize:"clamp(36px,7.4vw,118px)",lineHeight:0.96,letterSpacing:"-0.035em",margin:"40px 0 0",maxWidth:1280}}>{renderHL(heroText)}</h1>
        <div className="hero-bottom" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,paddingTop:60,alignItems:"end"}}>
          <p style={{maxWidth:520,fontSize:18,lineHeight:1.5,color:"#1a1a1a"}}>{hero?.lede??"Creative Director. Product Designer. Brand Operator. Seventeen years designing at the intersection of brand, product, and live experience — with an operator's bias for shipping."}</p>
          <div className="hero-scroll" style={{justifySelf:"end" as const,display:"flex",alignItems:"center",gap:10,fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase" as const,color:"#6b6b6b"}}>
            <span>Scroll</span><span style={{width:40,height:1,background:"#0a0a0a",display:"inline-block"}}/>
          </div>
        </div>
        <ParallaxMark />
      </section>

      {marquee?.items?.length>0&&(
        <div style={{borderTop:"1px solid #e8e8e8",borderBottom:"1px solid #e8e8e8",overflow:"hidden",padding:"22px 0",whiteSpace:"nowrap" as const}}>
          <div style={{display:"inline-flex",gap:64,animation:"scroll 40s linear infinite",paddingRight:64}}>
            {[...marquee.items,...marquee.items].map((item:string,i:number)=>(
              <span key={i} style={{fontWeight:500,fontSize:22,letterSpacing:"-0.01em",display:"inline-flex",alignItems:"center",gap:64}}>{item}<span style={{fontSize:14,color:"#6b6b6b"}}>✦</span></span>
            ))}
          </div>
        </div>
      )}

      {about&&(
        <section style={{paddingTop:120,paddingBottom:120,paddingLeft:40,paddingRight:40,maxWidth:1440,margin:"0 auto"}} className="reveal section-inner">
          <div style={{display:"flex",alignItems:"center",gap:12,fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:"0.14em",textTransform:"uppercase" as const,color:"#6b6b6b",marginBottom:18}}>
            <span style={{width:28,height:1,background:"#6b6b6b",display:"inline-block"}}/>About
          </div>
          <div className="section-head" style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:40,paddingBottom:72,alignItems:"end"}}>
            <h2 style={{fontWeight:500,fontSize:"clamp(32px,5vw,64px)",lineHeight:1,letterSpacing:"-0.03em"}}>{about.headline??"A builder, working at range."}</h2>
            <p style={{fontSize:17,lineHeight:1.55,color:"#1a1a1a",maxWidth:560}}>{about.description??"Creative direction for brands. Product design for software. Operations for live experiences. Most people pick one. I build the connective tissue between them."}</p>
          </div>
          <div className="about-body" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"start"}}>
            <div>
              {about.body1&&<p style={{fontSize:22,lineHeight:1.4,letterSpacing:"-0.005em",marginBottom:28}}>{about.body1}</p>}
              {about.body2&&<p style={{fontSize:22,lineHeight:1.4,letterSpacing:"-0.005em"}}>{about.body2}</p>}
            </div>
            {about.stats?.length>0&&(
              <div className="stats-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"#e8e8e8",border:"1px solid #e8e8e8"}}>
                {about.stats.map((stat:any,i:number)=>(
                  <div key={i} style={{background:"#fff",padding:28,display:"flex",flexDirection:"column" as const,gap:12,minHeight:160,justifyContent:"space-between"}}>
                    <div style={{fontWeight:500,fontSize:52,letterSpacing:"-0.03em",lineHeight:1}}>{stat.number}</div>
                    <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase" as const,color:"#6b6b6b"}}>{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <div style={{height:1,background:"#e8e8e8",maxWidth:1440,margin:"0 auto"}}/>

      {experience?.length>0&&(
        <section style={{paddingTop:120,paddingBottom:120,paddingLeft:40,paddingRight:40,maxWidth:1440,margin:"0 auto"}} className="reveal section-inner">
          <div style={{display:"flex",alignItems:"center",gap:12,fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:"0.14em",textTransform:"uppercase" as const,color:"#6b6b6b",marginBottom:18}}>
            <span style={{width:28,height:1,background:"#6b6b6b",display:"inline-block"}}/>Experience
          </div>
          <div className="section-head" style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:40,paddingBottom:72,alignItems:"end"}}>
            <h2 style={{fontWeight:500,fontSize:"clamp(32px,5vw,64px)",lineHeight:1,letterSpacing:"-0.03em"}}>Roles, rooms, receipts.</h2>
            <p style={{fontSize:17,lineHeight:1.55,color:"#1a1a1a",maxWidth:560}}>Director and founding team roles across basketball, fintech, and culture. Every role is a place I&apos;ve built a team, shaped a thing, or answered a phone at 2am.</p>
          </div>
          <div style={{borderTop:"1px solid #e8e8e8"}}>
            {experience.map((role:any,i:number)=>(
              <div key={i} className="xp-row" style={{display:"grid",gridTemplateColumns:"80px 1.6fr 1fr 100px",gap:24,padding:"28px 0",borderBottom:"1px solid #e8e8e8",alignItems:"center"}}>
                <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:"#6b6b6b"}}>{role.years}</span>
                <span style={{fontWeight:500,fontSize:28,letterSpacing:"-0.02em"}}>{role.company}</span>
                <span style={{fontSize:14,color:"#6b6b6b"}}>{role.title}</span>
                {role.tag&&<span className="xp-arr" style={{justifySelf:"end" as const,fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase" as const,color:"#6b6b6b"}}>{role.tag} →</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      <div style={{height:1,background:"#e8e8e8",maxWidth:1440,margin:"0 auto"}}/>

      {work?.length>0&&(
        <section style={{paddingTop:120,paddingBottom:120,paddingLeft:40,paddingRight:40,maxWidth:1440,margin:"0 auto"}} className="reveal section-inner">
          <div style={{display:"flex",alignItems:"center",gap:12,fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:"0.14em",textTransform:"uppercase" as const,color:"#6b6b6b",marginBottom:18}}>
            <span style={{width:28,height:1,background:"#6b6b6b",display:"inline-block"}}/>Work
          </div>
          <div className="section-head" style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:40,paddingBottom:72,alignItems:"end"}}>
            <h2 style={{fontWeight:500,fontSize:"clamp(32px,5vw,64px)",lineHeight:1,letterSpacing:"-0.03em"}}>Case studies, in brief.</h2>
            <p style={{fontSize:17,lineHeight:1.55,color:"#1a1a1a",maxWidth:560}}>A slice of the last decade — brand ecosystems, product launches, and the occasional 23-market rollout. Tap a card to open the deep-dive.</p>
          </div>
          <div className="work-grid" style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:24}}>
            {work.map((item:any,i:number)=>{
              const span=item.gridSpan??"6";
              return(
                <MagneticCard key={i} style={{gridColumn:"span "+span,background:"#f4f4f2",overflow:"hidden",cursor:"pointer"}}>
                  <div style={{aspectRatio:"16/10",position:"relative",background:"linear-gradient(135deg,#f4f4f2 0%,#e6e6e3 100%)",overflow:"hidden"}}>
                    <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(135deg,transparent 0 20px,rgba(0,0,0,0.03) 20px 21px)"}}/>
                    {item.coverLabel&&<span style={{position:"absolute",top:20,left:20,fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase" as const,color:"#6b6b6b"}}>{item.coverLabel}</span>}
                    <div style={{position:"absolute",left:24,right:24,bottom:20,fontWeight:500,fontSize:"clamp(28px,6vw,84px)",letterSpacing:"-0.03em",lineHeight:0.95,color:"#0a0a0a"}}>
                      {(item.coverText??item.title).split(" ").map((word:string,wi:number)=>{
                        const iw=["home.","momentum.","built","next","wave."];
                        const isI=iw.some((w:string)=>word.toLowerCase().includes(w));
                        return <span key={wi} style={{fontStyle:isI?"italic":"normal",opacity:isI?0.4:1}}>{word}{" "}</span>;
                      })}
                    </div>
                  </div>
                  <div style={{padding:"20px 4px 0",display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:20}}>
                    <div style={{display:"flex",alignItems:"baseline",gap:12}}>
                      <h3 style={{fontWeight:500,fontSize:22,letterSpacing:"-0.015em"}}>{item.title}</h3>
                      <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase" as const,color:"#6b6b6b"}}>{item.category}</span>
                    </div>
                    <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:"#6b6b6b"}}>{item.year}</span>
                  </div>
                </MagneticCard>
              );
            })}
          </div>
        </section>
      )}

      <div style={{height:1,background:"#e8e8e8",maxWidth:1440,margin:"0 auto"}}/>

      {(sports||fintech)&&(
        <section style={{paddingTop:120,paddingBottom:120,paddingLeft:40,paddingRight:40,maxWidth:1440,margin:"0 auto"}} className="reveal section-inner">
          <div style={{display:"flex",alignItems:"center",gap:12,fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:"0.14em",textTransform:"uppercase" as const,color:"#6b6b6b",marginBottom:18}}>
            <span style={{width:28,height:1,background:"#6b6b6b",display:"inline-block"}}/>Ecosystems
          </div>
          <div className="section-head" style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:40,paddingBottom:72,alignItems:"end"}}>
            <h2 style={{fontWeight:500,fontSize:"clamp(32px,5vw,64px)",lineHeight:1,letterSpacing:"-0.03em"}}>Two ecosystems. One operator.</h2>
            <p style={{fontSize:17,lineHeight:1.55,color:"#1a1a1a",maxWidth:560}}>The career splits into two deep practices: Sports, where brand meets the floor. Fintech, where design meets the ledger. Both require the same thing: clarity under pressure.</p>
          </div>
          <div className="stats-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"#e8e8e8",border:"1px solid #e8e8e8"}}>
            {[sports,fintech].filter(Boolean).map((pane:any,i:number)=>(
              <div key={i} className="split-pane" style={{background:"#fff",padding:56,display:"flex",flexDirection:"column" as const,gap:32,minHeight:560,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",right:24,top:30,fontWeight:500,fontSize:160,lineHeight:0.8,letterSpacing:"-0.05em",color:"#0a0a0a",opacity:0.06,pointerEvents:"none",userSelect:"none" as const}}>{pane.badgeNumber??`0${i+1}`}</div>
                <h3 style={{fontWeight:500,fontSize:44,letterSpacing:"-0.025em",lineHeight:1}}>{pane.title}</h3>
                <p style={{fontSize:16,lineHeight:1.55,color:"#1a1a1a",maxWidth:"44ch"}}>{pane.copy}</p>
                <ul style={{listStyle:"none",display:"flex",flexDirection:"column" as const,gap:10,marginTop:"auto"}}>
                  {pane.stats?.map((stat:any,j:number)=>(
                    <li key={j} style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderTop:"1px solid #e8e8e8",fontFamily:"'JetBrains Mono',monospace",fontSize:12,letterSpacing:"0.04em"}}>
                      <span>{stat.label}</span><span style={{color:"#6b6b6b"}}>{stat.number}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer className="footer-inner" style={{paddingTop:120,paddingBottom:40,paddingLeft:40,paddingRight:40,borderTop:"1px solid #e8e8e8",maxWidth:1440,margin:"0 auto"}}>
        <div className="footer-huge" style={{fontWeight:500,fontSize:"clamp(56px,12vw,200px)",lineHeight:0.92,letterSpacing:"-0.045em",marginBottom:72}}>
          Let&apos;s build. <span style={{fontSize:"0.5em",fontWeight:400}}>↗</span>
        </div>
        <div className="footer-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:24,paddingTop:40,borderTop:"1px solid #e8e8e8"}}>
          {[{label:"Email",val:settings?.email??"ace@jfulgar.com"},{label:"Phone",val:settings?.phone??"+1 (416) 605-6851"},{label:"Location",val:settings?.location??"Toronto, Ontario"},{label:"Social",val:settings?.social??"@jfulgar"}].map((col,i)=>(
            <div key={i} style={{display:"flex",flexDirection:"column" as const,gap:8}}>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase" as const,color:"#6b6b6b",marginBottom:8}}>{col.label}</span>
              <span style={{fontSize:15}}>{col.val}</span>
            </div>
          ))}
        </div>
        <div className="footer-base" style={{paddingTop:40,display:"flex",justifyContent:"space-between",fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase" as const,color:"#6b6b6b"}}>
          <span style={{color:"#0a0a0a"}}>♠</span>
          <span>jfulgar.com — {new Date().getFullYear()}</span>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#fff;-webkit-font-smoothing:antialiased;}
        @keyframes scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes pulse{0%{box-shadow:0 0 0 0 rgba(46,204,113,0.6)}70%{box-shadow:0 0 0 8px rgba(46,204,113,0)}100%{box-shadow:0 0 0 0 rgba(46,204,113,0)}}
        .reveal{opacity:0;transform:translateY(24px);transition:opacity 0.9s cubic-bezier(0.6,0.05,0.2,1),transform 0.9s cubic-bezier(0.6,0.05,0.2,1);}
        .reveal.in{opacity:1;transform:none;}
        .avail-dot{animation:pulse 2s infinite;}
        @media(max-width:720px){
          nav{padding:14px 24px!important;}
          .nav-links{display:none!important;}
          .hero-section{padding-left:24px!important;padding-right:24px!important;padding-top:100px!important;}
          .hero-meta{grid-template-columns:1fr 1fr!important;}
          .hero-bottom{grid-template-columns:1fr!important;}
          .hero-scroll{display:none!important;}
          .section-inner{padding-left:24px!important;padding-right:24px!important;padding-top:80px!important;padding-bottom:80px!important;}
          .section-head{grid-template-columns:1fr!important;padding-bottom:40px!important;}
          .about-body{grid-template-columns:1fr!important;gap:40px!important;}
          .stats-grid{grid-template-columns:1fr 1fr!important;}
          .xp-row{grid-template-columns:1fr!important;gap:8px!important;}
          .xp-arr{display:none!important;}
          .work-grid{grid-template-columns:1fr!important;}
          .work-card{grid-column:span 1!important;}
          .split-grid{grid-template-columns:1fr!important;}
          .split-pane{padding:32px 24px!important;min-height:0!important;}
          .footer-inner{padding-left:24px!important;padding-right:24px!important;}
          .footer-huge{font-size:clamp(48px,13vw,80px)!important;margin-bottom:48px!important;}
          .footer-grid{grid-template-columns:1fr 1fr!important;}
          .footer-base{flex-direction:column!important;gap:12px!important;align-items:flex-start!important;}
        }
        @keyframes pulse{0%{box-shadow:0 0 0 0 rgba(46,204,113,0.6)}70%{box-shadow:0 0 0 8px rgba(46,204,113,0)}100%{box-shadow:0 0 0 0 rgba(46,204,113,0)}}
      `}</style>
    </main></>
  );
}
