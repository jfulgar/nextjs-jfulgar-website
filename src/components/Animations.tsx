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
  return <div ref={ref} className="hero-mark" aria-hidden="true">ΛCΞ</div>;
}

export function AvailableStatus() {
  const [hovered, setHovered] = React.useState(false);
  const dotStyle: React.CSSProperties = {
    width: 6, height: 6, borderRadius: "50%", display: "inline-block",
    transition: "background 0.3s",
    background: hovered ? "#e74c3c" : "#2ecc71",
    animation: hovered ? "pulseRed 1.5s infinite" : "pulse 2s infinite",
  };
  const wrapStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 8,
    fontFamily: "JetBrains Mono, monospace", fontSize: 11,
    letterSpacing: "0.12em", textTransform: "uppercase",
    color: "#6b6b6b", textDecoration: "none", cursor: "pointer",
  };
  return (
    <a href="#contact" style={wrapStyle} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <span style={dotStyle} />
      <span>{hovered ? "Busy" : "Available"}</span>
      <style>{"@keyframes pulseRed{0%{box-shadow:0 0 0 0 rgba(231,76,60,0.6)}70%{box-shadow:0 0 0 8px rgba(231,76,60,0)}100%{box-shadow:0 0 0 0 rgba(231,76,60,0)}}"}</style>
    </a>
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
  return <div ref={ref} data-hover className={`work-card work-span-${span}`} style={style}>{children}</div>;
}

export function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Disciplines", href: "#ecosystems" },
    { label: "Contact", href: "#contact" },
  ];
  const menuStyle: React.CSSProperties = {
    position: "fixed", top: 0, left: 0,
    width: "100vw", height: "100vh",
    background: "#ffffff", zIndex: 250,
    display: "flex", flexDirection: "column",
    justifyContent: "center", alignItems: "stretch",
  };
  const linkStyle: React.CSSProperties = {
    fontFamily: "Inter Tight, sans-serif",
    fontWeight: 500,
    fontSize: "clamp(28px, 8vw, 44px)",
    letterSpacing: "-0.02em",
    color: "#0a0a0a",
    textDecoration: "none",
    padding: "20px 40px",
    borderBottom: "1px solid #e8e8e8",
    textAlign: "center",
    display: "block",
  };
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="hamburger"
        aria-label="Menu"
        style={{ display: "flex", flexDirection: "column", gap: 5, background: "none", border: "none", padding: 4, zIndex: 300, position: "relative", cursor: "pointer" }}
      >
        <span style={{ width: 22, height: 1, background: "#0a0a0a", display: "block", transition: "transform 0.3s, opacity 0.3s", transform: open ? "translateY(6px) rotate(45deg)" : "none" }} />
        <span style={{ width: 22, height: 1, background: "#0a0a0a", display: "block", transition: "opacity 0.3s", opacity: open ? 0 : 1 }} />
        <span style={{ width: 22, height: 1, background: "#0a0a0a", display: "block", transition: "transform 0.3s, opacity 0.3s", transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }} />
      </button>
      <div style={{...menuStyle, animation: open ? "menuIn 0.35s cubic-bezier(0.6,0.05,0.2,1) forwards" : "menuOut 0.3s cubic-bezier(0.6,0.05,0.2,1) forwards", pointerEvents: open ? "auto" : "none"}}>
        {links.map((link, i) => (
          <a key={link.label} href={link.href} style={{...linkStyle, animation: open ? `linkIn 0.4s cubic-bezier(0.6,0.05,0.2,1) ${i * 60 + 80}ms both` : "none"}} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </div>
      <style>{`
        @media(max-width:720px){.hamburger{display:flex!important;}}
        .hamburger{display:none;}
        @keyframes menuIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes menuOut { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-8px); } }
        @keyframes linkIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
}
