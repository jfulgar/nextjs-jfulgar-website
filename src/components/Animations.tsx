"use client";
import { useEffect, useRef } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => { target.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);
    let raf: number;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.2;
      pos.current.y += (target.current.y - pos.current.y) * 0.2;
      if (dot.current) dot.current.style.transform = `translate(${target.current.x}px,${target.current.y}px) translate(-50%,-50%)`;
      if (ring.current) ring.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    const over = (e: MouseEvent) => {
      const t = (e.target as Element).closest("a,button,[data-hover]");
      if (ring.current) ring.current.classList.toggle("cur-hover", !!t);
    };
    const out = () => { if (ring.current) ring.current.classList.remove("cur-hover"); };
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <>
      <div ref={ring} style={{position:"fixed",top:0,left:0,width:36,height:36,border:"1px solid #fff",borderRadius:"50%",pointerEvents:"none",zIndex:9999,mixBlendMode:"difference",transition:"width 0.3s,height 0.3s"}} className="cursor-ring" />
      <div ref={dot} style={{position:"fixed",top:0,left:0,width:6,height:6,background:"#fff",borderRadius:"50%",pointerEvents:"none",zIndex:9999,mixBlendMode:"difference"}} />
      <style>{"body{cursor:none!important;} a,button{cursor:none!important;} .cur-hover{width:64px!important;height:64px!important;margin:-14px 0 0 -14px;}"}</style>
    </>
  );
}

export function ParallaxMark() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (ref.current) ref.current.style.transform = `translateY(${window.scrollY * -0.18}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div ref={ref} aria-hidden="true" style={{position:"absolute",right:"-4vw",bottom:"14vh",fontFamily:"inherit",fontWeight:600,fontSize:"clamp(140px,28vw,420px)",letterSpacing:"-0.06em",lineHeight:0.8,color:"transparent",WebkitTextStroke:"1px #e8e8e8",pointerEvents:"none",zIndex:-1,userSelect:"none"}}>
      ACE
    </div>
  );
}

export function ScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

export function MagneticCard({ children, style, onClick }: { children: React.ReactNode, style?: React.CSSProperties, onClick?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const inner = el.querySelector(".cover-inner") as HTMLElement;
      if (inner) inner.style.transform = `scale(1.04) translate(${x * 14}px,${y * 10}px)`;
    };
    const onLeave = () => {
      const inner = el.querySelector(".cover-inner") as HTMLElement;
      if (inner) { inner.style.transform = ""; inner.style.transition = "transform 0.5s cubic-bezier(0.2,0.7,0.2,1)"; }
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);
  return <div ref={ref} data-hover style={style} onClick={onClick}>{children}</div>;
}
