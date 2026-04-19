import { client } from "@/sanity/client";

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

  const defaultHeadline = "I build brands, products, and platforms that move culture forward.";
  const headline = hero?.headlines?.find((h: any) => h.isDefault)?.text ?? defaultHeadline;

  return (
    <main style={{ fontFamily: "Inter, sans-serif", background: "#000", color: "#fff", minHeight: "100vh" }}>

      <nav style={{ padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #111" }}>
        <span style={{ fontWeight: 700, letterSpacing: "0.05em" }}>♠ ACE</span>
        <div style={{ display: "flex", gap: 32, fontSize: 13, opacity: 0.5 }}>
          <span>Work</span>
          <span>About</span>
          <span>Contact</span>
        </div>
      </nav>

      <section style={{ padding: "120px 48px 80px", maxWidth: 1400, margin: "0 auto" }}>
        {hero?.lede && (
          <p style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.4, marginBottom: 40 }}>
            {hero.lede}
          </p>
        )}
        <h1 style={{ fontSize: "clamp(40px, 5.5vw, 88px)", fontWeight: 700, lineHeight: 1.05, maxWidth: 960, marginBottom: 64 }}>
          {headline}
        </h1>
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap" as const }}>
          {[hero?.indexLabel, hero?.basedLabel, hero?.practiceLabel, hero?.yearLabel].filter(Boolean).map((label: any, i: number) => (
            <span key={i} style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, opacity: 0.35 }}>{label}</span>
          ))}
        </div>
      </section>

      {marquee?.items?.length > 0 && (
        <div style={{ borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", padding: "14px 0", overflow: "hidden", whiteSpace: "nowrap" as const }}>
          <span style={{ display: "inline-block", animation: "ticker 24s linear infinite" }}>
            {[...marquee.items, ...marquee.items].map((item: string, i: number) => (
              <span key={i} style={{ marginRight: 56, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, opacity: 0.4 }}>{item}</span>
            ))}
          </span>
        </div>
      )}

      {about && (
        <section style={{ padding: "100px 48px", maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, opacity: 0.35, marginBottom: 32 }}>About</p>
            <h2 style={{ fontSize: "clamp(24px, 2.5vw, 40px)", fontWeight: 700, lineHeight: 1.15, marginBottom: 32 }}>
              {about.headline ?? "Creative Director. Product Designer. Operator."}
            </h2>
            {about.body1 && <p style={{ opacity: 0.55, lineHeight: 1.75, fontSize: 15, marginBottom: 20 }}>{about.body1}</p>}
            {about.body2 && <p style={{ opacity: 0.55, lineHeight: 1.75, fontSize: 15 }}>{about.body2}</p>}
          </div>
          {about.stats?.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignContent: "start" as const, paddingTop: 48 }}>
              {about.stats.map((stat: any, i: number) => (
                <div key={i} style={{ borderTop: "1px solid #1a1a1a", paddingTop: 20 }}>
                  <div style={{ fontSize: "clamp(28px, 3vw, 48px)", fontWeight: 700, marginBottom: 6 }}>{stat.number}</div>
                  <div style={{ fontSize: 11, opacity: 0.4, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {experience?.length > 0 && (
        <section style={{ padding: "80px 48px", maxWidth: 1400, margin: "0 auto", borderTop: "1px solid #1a1a1a" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, opacity: 0.35, marginBottom: 48 }}>Experience</p>
          {experience.map((role: any, i: number) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "180px 1fr 140px", gap: 32, padding: "28px 0", borderBottom: "1px solid #111", alignItems: "start" }}>
              <div style={{ opacity: 0.35, fontSize: 12, paddingTop: 3 }}>{role.years}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{role.company}</div>
                <div style={{ opacity: 0.45, fontSize: 13, marginBottom: role.description ? 10 : 0 }}>{role.title}</div>
                {role.description && <div style={{ opacity: 0.35, fontSize: 13, lineHeight: 1.65 }}>{role.description}</div>}
              </div>
              {role.tag && (
                <div style={{ fontSize: 10, border: "1px solid #2a2a2a", padding: "5px 14px", borderRadius: 100, opacity: 0.55, textTransform: "uppercase" as const, letterSpacing: "0.08em", textAlign: "right" as const }}>
                  {role.tag}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {work?.length > 0 && (
        <section style={{ padding: "80px 48px", maxWidth: 1400, margin: "0 auto", borderTop: "1px solid #1a1a1a" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, opacity: 0.35, marginBottom: 48 }}>Selected Work</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 12 }}>
            {work.map((item: any, i: number) => {
              const span = item.gridSpan ?? "6";
              return (
                <div key={i} style={{ gridColumn: "span " + span, background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 6, padding: 40, minHeight: 300, display: "flex", flexDirection: "column" as const, justifyContent: "space-between", cursor: "pointer" }}>
                  <div style={{ fontSize: 10, opacity: 0.35, textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>
                    {item.category}{item.year ? " · " + item.year : ""}
                  </div>
                  <div>
                    {item.coverLabel && <div style={{ fontSize: 10, opacity: 0.35, marginBottom: 10, textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>{item.coverLabel}</div>}
                    <h3 style={{ fontSize: "clamp(18px, 2vw, 28px)", fontWeight: 700, lineHeight: 1.15 }}>{item.coverText ?? item.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {(sports || fintech) && (
        <section style={{ padding: "80px 48px", maxWidth: 1400, margin: "0 auto", borderTop: "1px solid #1a1a1a", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[sports, fintech].filter(Boolean).map((pane: any, i: number) => (
            <div key={i} style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 6, padding: 48 }}>
              <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1, marginBottom: 16, opacity: 0.15 }}>{pane.badgeNumber}</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>{pane.title}</h3>
              {pane.copy && <p style={{ opacity: 0.45, lineHeight: 1.7, fontSize: 14, marginBottom: 32 }}>{pane.copy}</p>}
              {pane.stats?.map((stat: any, j: number) => (
                <div key={j} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid #1a1a1a" }}>
                  <span style={{ opacity: 0.4, fontSize: 13 }}>{stat.label}</span>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{stat.number}</span>
                </div>
              ))}
            </div>
          ))}
        </section>
      )}

      <footer style={{ padding: "60px 48px", borderTop: "1px solid #1a1a1a", maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 700 }}>♠ ACE Fulgar</span>
        <span style={{ opacity: 0.35, fontSize: 13 }}>{settings?.email ?? "ace@jfulgar.com"}</span>
        <span style={{ opacity: 0.35, fontSize: 13 }}>{settings?.location ?? "Toronto, ON"}</span>
      </footer>

      <style>{"@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } } * { margin: 0; padding: 0; box-sizing: border-box; } body { background: #000; }"}</style>
    </main>
  );
}
