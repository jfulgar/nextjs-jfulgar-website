"use client";
import React, { useEffect, useRef, useState } from "react";

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
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
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
  return <div ref={ref} className="hero-mark" aria-hidden="true">ACE</div>;
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

export function MagneticCard({ children, style, span }: { children: React.ReactNode, style?: React.CSSProperties, span?: string }) {
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
  return <div ref={ref} data-hover style={{...style, gridColumn: `span ${span}`}}>{children}</div>;
}

export function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Ecosystems", href: "#ecosystems" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <>
      <button onClick={() => setOpen(!open)} className="hamburger" aria-label="Menu">
        <span className={`hb-line ${open ? "hb-open-1" : ""}`} />
        <span className={`hb-line ${open ? "hb-open-2" : ""}`} />
        <span className={`hb-line ${open ? "hb-open-3" : ""}`} />
      </button>
      <div className={`mobile-menu ${open ? "mobile-menu-open" : ""}`} style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"#ffffff",zIndex:199,display:"flex",flexDirection:"column" as const,justifyContent:"center",alignItems:"stretch",opacity:open?1:0,pointerEvents:open?"auto":"none",transition:"opacity 0.3s"}}>
        {links.map(({ label, href }) => (
          <a key={label} href={href} className="mobile-menu-link" onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </div>
      <style>{`
        .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; padding: 4px; z-index: 201; position: relative; cursor: pointer; }
        .hb-line { width: 22px; height: 1px; background: #0a0a0a; display: block; transition: transform 0.3s, opacity 0.3s; }
        .hb-open-1 { transform: translateY(6px) rotate(45deg); }
        .hb-open-2 { opacity: 0; }
        .hb-open-3 { transform: translateY(-6px) rotate(-45deg); }
        .mobile-menu {
          position: fixed; inset: 0;
          background: #ffffff;
          z-index: 200;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .mobile-menu-open { opacity: 1; pointer-events: auto; }
        .mobile-menu-link {
          font-family: "Inter Tight", sans-serif;
          font-weight: 500;
          font-size: clamp(28px, 8vw, 44px);
          letter-spacing: -0.02em;
          color: #0a0a0a;
          text-decoration: none;
          width: 100%;
          text-align: center;
          padding: 20px 40px;
          border-bottom: 1px solid #e8e8e8;
          transition: background 0.2s;
        }
        .mobile-menu-link:first-child { border-top: 1px solid #e8e8e8; }
        .mobile-menu-link:active { background: #f4f4f2; }
        @media (max-width: 720px) { .hamburger { display: flex !important; } }
      `}</style>
    </>
  );
}
