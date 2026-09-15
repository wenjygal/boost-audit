import { useEffect, useRef, useState } from "react";

const BRAND = {
  magenta: "#E0128B",
  orange: "#F68920",
  cream: "#FFF8F0",
  charcoal: "#2B2118",
};

const LOGO_WHITE_IMG = "https://res.cloudinary.com/jrag9ksp/image/upload/v1785356847/white_logo_cpm31h.png";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const ICONS = {
  bot: (
    <svg viewBox="0 0 48 48" width="34" height="34" fill="none" aria-hidden="true" focusable="false">
      <rect x="10" y="16" width="28" height="20" rx="6" stroke={BRAND.magenta} strokeWidth="2.5" />
      <line x1="24" y1="16" x2="24" y2="9" stroke={BRAND.magenta} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="7" r="2" fill={BRAND.magenta} />
      <circle cx="18" cy="26" r="2.2" fill={BRAND.magenta} />
      <circle cx="30" cy="26" r="2.2" fill={BRAND.magenta} />
    </svg>
  ),
  landing: (
    <svg viewBox="0 0 48 48" width="34" height="34" fill="none" aria-hidden="true" focusable="false">
      <rect x="7" y="9" width="34" height="30" rx="4" stroke={BRAND.orange} strokeWidth="2.5" />
      <line x1="7" y1="17" x2="41" y2="17" stroke={BRAND.orange} strokeWidth="2.5" />
      <rect x="15" y="25" width="18" height="8" rx="4" stroke={BRAND.orange} strokeWidth="2.5" />
    </svg>
  ),
  message: (
    <svg viewBox="0 0 48 48" width="34" height="34" fill="none" aria-hidden="true" focusable="false">
      <path d="M8 12h32a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H21l-8 7v-7h-5a3 3 0 0 1-3-3V15a3 3 0 0 1 3-3Z" stroke={BRAND.magenta} strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="14" y1="20" x2="34" y2="20" stroke={BRAND.magenta} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="14" y1="27" x2="27" y2="27" stroke={BRAND.magenta} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 48 48" width="34" height="34" fill="none" aria-hidden="true" focusable="false">
      <path d="M6 24c4-8 12-13 18-13s14 5 18 13c-4 8-12 13-18 13S10 32 6 24Z" stroke={BRAND.charcoal} strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="6" stroke={BRAND.charcoal} strokeWidth="2.5" />
    </svg>
  ),
  whisk: (
    <svg viewBox="0 0 32 32" width="19" height="19" fill="#fff" aria-hidden="true" focusable="false">
      <path d="M16.001 3C9.096 3 3.5 8.596 3.5 15.5c0 2.42.687 4.68 1.878 6.6L3 29l7.086-2.34a12.44 12.44 0 0 0 5.915 1.5h.006c6.905 0 12.5-5.596 12.5-12.5S22.906 3 16.001 3zm0 22.7h-.005a10.2 10.2 0 0 1-5.2-1.424l-.373-.222-3.86 1.276 1.293-3.76-.243-.386a10.18 10.18 0 0 1-1.563-5.484c0-5.634 4.585-10.22 10.221-10.22 2.73 0 5.294 1.064 7.225 2.997a10.15 10.15 0 0 1 2.994 7.228c0 5.635-4.585 10.221-10.221 10.221l.001-.001zm5.598-7.653c-.307-.153-1.815-.896-2.096-.998-.281-.102-.486-.153-.69.153-.204.307-.792.998-.972 1.203-.179.204-.358.23-.665.077-.307-.154-1.296-.478-2.469-1.523-.913-.814-1.529-1.82-1.708-2.127-.179-.307-.019-.473.135-.626.138-.138.307-.358.46-.537.154-.18.205-.307.307-.512.102-.204.051-.383-.026-.537-.077-.153-.69-1.664-.945-2.28-.249-.6-.502-.518-.69-.527l-.588-.01c-.204 0-.537.077-.818.383s-1.075 1.05-1.075 2.562 1.1 2.973 1.253 3.178c.153.204 2.166 3.306 5.248 4.635.733.316 1.305.505 1.751.647.735.234 1.404.2 1.933.121.59-.088 1.815-.742 2.071-1.459.256-.716.256-1.331.179-1.459-.076-.128-.281-.204-.588-.358z"/>
    </svg>
  ),
};

const SERVICES = [
  {
    icon: ICONS.bot,
    name: "אודיט לבוט",
    tagline: "הבוט עונה יפה. השאלה אם נכון.",
    body:
      "עוברים על שיחות אמיתיות מול הבוט שבנית, מוצאים איפה הוא טועה, נתקע, או עונה משהו שלא היית רוצה שהוא יגיד — כולל אם הוא שופך החוצה מידע שלא אמור לצאת — ומחזירים דוח עם תיקונים קונקרטיים, לא רק \"נראה טוב\".",
    time: "משך: מותאם לגודל הבוט, נסגר בהצעת המחיר",
    accent: BRAND.magenta,
  },
  {
    icon: ICONS.landing,
    name: "אודיט לעמוד נחיתה",
    tagline: "העמוד עולה. השאלה אם הוא מוכן.",
    body:
      "נגישות, מדידה, ומהירות טעינה — עוברים על העמוד שבנית סעיף-סעיף, לפני שמישהו משלם על תנועה לעמוד שלא ממיר או לא עומד בתקן.",
    time: "משך: מותאם להיקף העמוד, נסגר בהצעת המחיר",
    accent: BRAND.orange,
  },
  {
    icon: ICONS.message,
    name: "אודיט תוכן ומסרים",
    tagline: "הבוט עונה נכון. השאלה אם הוא גם מוכר.",
    body:
      "עוברים על הטקסטים בפועל — מה הבוט אומר, מה כתוב בעמוד, מה כתוב במודעה — ובודקים אם זה משכנע, עקבי, ומדבר לקהל הנכון. לא רק אם זה עובד טכנית, אם זה גם מוכר.",
    time: "משך: מותאם להיקף התוכן, נסגר בהצעת המחיר",
    accent: BRAND.magenta,
  },
];

export default function BoostAudit() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div dir="rtl" style={{ fontFamily: "'Rubik', sans-serif", background: BRAND.cream, color: BRAND.charcoal }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;800&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
        .card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(43,33,24,0.12); }
        .whatsapp-btn:hover { transform: scale(1.04); }
      `}</style>

      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "65vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "60px 24px",
          background: `linear-gradient(135deg, ${BRAND.magenta}, ${BRAND.orange})`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <img
            src={LOGO_WHITE_IMG}
            alt="Boost Me"
            style={{ width: 180, height: "auto", margin: "0 auto 24px", display: "block" }}
          />
          <div style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: 14, letterSpacing: "0.08em", marginBottom: 10 }}>
            BOOST AUDIT
          </div>
          <h1
            style={{
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
              color: "#fff",
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            בנית עם AI.<br />מישהו בדק?
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.92)",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              maxWidth: 520,
              margin: "24px auto 0",
              fontWeight: 500,
              lineHeight: 1.6,
            }}
          >
            בוטים, דפי נחיתה ותהליכים שנבנו מהר — לא תמיד נבדקו לעומק. לפרילנסרים ואנשי אוטומציה: הבדיקה שאין לכם זמן לעשות, לפני שהלקוח מוצא את זה בעצמו.
          </p>
          <a
            href="#"
            id="whatsapp-hero"
            className="whatsapp-btn"
            aria-label="דברו איתנו בוואטסאפ — נפתח בחלון חדש"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              background: "#25D366",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              padding: "13px 26px",
              borderRadius: 999,
              textDecoration: "none",
              margin: "30px auto 0",
              boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
              transition: "transform 0.25s ease",
            }}
          >
            {ICONS.whisk}
            דברו איתנו בוואטסאפ
          </a>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ position: "relative", padding: "90px 24px 120px", maxWidth: 1080, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ color: BRAND.magenta, fontWeight: 600, fontSize: 14, letterSpacing: "0.08em", marginBottom: 10 }}>
              האודיטים
            </div>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", margin: 0 }}>
              שלושה סוגי בדיקה. בוחרים את זה שרלוונטי.
            </h2>
            <p style={{ color: "#6b5f52", fontSize: 17, maxWidth: 480, margin: "14px auto 0" }}>
              כל אודיט בודק דבר אחד ספציפי, ומחזיר ממצאים שאפשר לפעול לפיהם באותו יום.
            </p>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {SERVICES.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.12}>
              <div
                className="card"
                style={{
                  position: "relative",
                  background: "#fff",
                  borderRadius: 20,
                  padding: "32px 26px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid rgba(43,33,24,0.06)",
                  borderTop: `4px solid ${s.accent}`,
                  transition: "transform 0.35s ease, box-shadow 0.35s ease",
                }}
              >
                <div
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: 14,
                    background: "#FBEFE4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  {s.icon}
                </div>
                <h3 style={{ fontWeight: 800, fontSize: 21, margin: "0 0 4px" }}>{s.name}</h3>
                <div style={{ color: s.accent, fontWeight: 600, fontSize: 14.5, marginBottom: 14 }}>
                  {s.tagline}
                </div>
                <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "#4a4038", margin: "0 0 18px" }}>{s.body}</p>
                <div
                  style={{
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: "#6b5f52",
                    borderTop: "1px dashed #e5dccf",
                    paddingTop: 14,
                    marginTop: "auto",
                  }}
                >
                  {s.time}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.36}>
          <div
            style={{
              textAlign: "center",
              marginTop: 28,
              border: "1px solid #e5dccf",
              borderRadius: 14,
              padding: "16px 22px",
            }}
          >
            <p style={{ color: "#6b5f52", fontSize: 14.5, margin: 0 }}>
              ולא כל דבר צריך אודיט מלא: אפשר גם <strong style={{ color: BRAND.charcoal }}>ייעוץ</strong> — שעה ממוקדת שבה עוברים ביחד על מה שבנית ומחליטים מה השלב הבא, לפני שממשיכים לבנות על בסיס לא בטוח.
            </p>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section
        style={{
          position: "relative",
          background: `linear-gradient(135deg, ${BRAND.orange}, ${BRAND.magenta})`,
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <Reveal>
          <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", margin: "0 0 16px" }}>
            מוכנים לבדוק את מה שבניתם?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.92)", fontSize: 17, maxWidth: 440, margin: "0 auto 18px" }}>
            ספרו לנו מה בניתם, ונגיד לכם אם זה מוכן לצאת לאוויר.
          </p>
          <a
            href="#"
            id="whatsapp-cta"
            className="whatsapp-btn"
            aria-label="בואו נדבר בוואטסאפ — נפתח בחלון חדש"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#25D366",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              padding: "16px 30px",
              borderRadius: 999,
              textDecoration: "none",
              transition: "transform 0.25s ease",
              boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
            }}
          >
            <span style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {ICONS.whisk}
            </span>
            בואו נדבר בוואטסאפ
          </a>
        </Reveal>
      </section>

      <footer style={{ textAlign: "center", padding: "26px", color: "#6b5f52", fontSize: 13 }}>
        Boost Audit · Boost Me · GEMS Digital Projects
      </footer>
    </div>
  );
}
