import { useEffect, useMemo, useState, type ReactNode } from "react"
import { MotionConfig } from "motion/react"
import { ArrowUpRight, Menu, Moon, Plus, Sun, X } from "lucide-react"
import dict from "@/data/i18n.json"
import { cn } from "@/lib/utils"
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"
import { BlurFade } from "@/components/ui/blur-fade"
import { BorderBeam } from "@/components/ui/border-beam"
import { DotPattern } from "@/components/ui/dot-pattern"
import { MagicCard } from "@/components/ui/magic-card"
import { Marquee } from "@/components/ui/marquee"
import { NumberTicker } from "@/components/ui/number-ticker"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { TextAnimate } from "@/components/ui/text-animate"
import { WordRotate } from "@/components/ui/word-rotate"

type Lang = "en" | "ar"
const D = dict as unknown as Record<Lang, Record<string, string | string[]>>
const store = {
  get: (k: string) => { try { return localStorage.getItem(k) } catch { return null } },
  set: (k: string, v: string) => { try { localStorage.setItem(k, v) } catch { /* storage unavailable */ } },
}
const EMAIL = "nedlsalah@gmail.com"
const WHATSAPP = "https://wa.me/971588546363"
const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
const BEHANCE = "https://www.behance.net/nedlsalah"
const PHOTOS = "https://photos.app.goo.gl/fsxX5cDCLViCtxLZ7"
const VIDEO = "https://photos.app.goo.gl/USEzX2LLwj4FP4Q19"

const NAV = [["services", "nav_services"], ["work", "nav_work"], ["about", "nav_about"], ["process", "nav_process"], ["experience", "nav_experience"], ["skills", "nav_skills"], ["contact", "nav_contact"]] as const
const WORK = [
  { id: "sanhansoiree", name: "Sanhan Soiree", url: "https://sanhansoiree.com/", cat: "web", img: "sanhansoiree.webp" },
  { id: "avenirenergy", name: "Avenir Energy", url: "https://avenirenergy.me/", cat: "web", img: "avenirenergy.webp" },
  { id: "riskonex", name: "Riskonex", url: "https://riskonex.com/", cat: "web", img: "riskonex.webp" },
  { id: "nobilis", name: "Nobilis Premier", url: "https://nobilis-premier.com/", cat: "web", img: "nobilis-premier.webp" },
  { id: "hakima", name: "Hakima Coaching", url: "https://hakimacoaching.com/", cat: "web", img: "hakimacoaching.webp" },
  { id: "fincastra", name: "Fincastra", url: "https://fincastra.com/", cat: "web", img: "fincastra.webp" },
  { id: "napa", name: "Napa", url: "https://napa.ae/", cat: "web", img: "napa.webp" },
  { id: "design", url: BEHANCE, cat: "design", img: "ill-design.svg", ti: "wk_design_title" },
  { id: "photo", url: PHOTOS, cat: "photo", img: "photography.webp", ti: "wk_photo_title" },
  { id: "video", url: VIDEO, cat: "video", img: "video.webp", ti: "wk_video_title" },
] as const
const FILTERS = [["all", "filter_all"], ["web", "filter_web"], ["design", "filter_design"], ["photo", "filter_photo"], ["video", "filter_video"]] as const
const CHIPS = ["SEO", "Meta Ads", "WordPress", "Google Ads", "Video", "Branding"]
const SKILLS: [string, string[]][] = [
  ["sk_marketing", ["Meta Ads", "Google Ads", "SEO", "Google Analytics"]],
  ["sk_web", ["WordPress", "WooCommerce", "HTML", "CSS", "Responsive Design"]],
  ["sk_design", ["Adobe Photoshop", "Adobe Illustrator", "Adobe Lightroom", "Canva"]],
  ["sk_content", ["Photography", "Video Editing", "Short-Form Video Production"]],
  ["sk_workflow", ["ChatGPT", "AI Tools", "Trello", "Notion"]],
]
const CERTS = [["2021", "Google"], ["2020", "Udacity"], ["2020", "OpenClassrooms"], ["2019", "Coursera"], ["2019", "Microsoft"]]
const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1)

function Eyebrow({ n, children }: { n: string; children: ReactNode }) {
  return <BlurFade inView><p className="mb-4 flex items-center gap-3 text-sm font-medium tracking-wide text-accent"><span className="tabular-nums opacity-70">{n}</span><span className="h-px w-8 bg-accent/50" />{children}</p></BlurFade>
}
function Heading({ text, className }: { text: string; className?: string }) {
  const [a, ...rest] = text.split(/<span>|<\/span>/).filter(Boolean)
  return <BlurFade inView><h2 className={cn("font-display text-4xl font-bold leading-[1.05] sm:text-6xl", className)}>{a}<span className="text-accent">{rest.join("")}</span></h2></BlurFade>
}
const Section = ({ id, alt, children }: { id: string; alt?: boolean; children: ReactNode }) => (
  <section id={id} className={cn("py-24 sm:py-32", alt && "bg-surface/60")}><div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">{children}</div></section>
)

export default function App() {
  const [lang, setLang] = useState<Lang>(() => (store.get("site-lang") === "ar" ? "ar" : "en"))
  const [theme, setTheme] = useState<"dark" | "light">(() => (document.documentElement.dataset.theme === "light" ? "light" : "dark"))
  const [fx, setFx] = useState(() => store.get("site-motion-v2") !== "off")
  const [menu, setMenu] = useState(false)
  const [filter, setFilter] = useState<string>("all")
  const [open, setOpen] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  const t = (k: string) => { const v = D[lang][k] ?? D.en[k]; return typeof v === "string" ? v : "" }
  const phrases = (D[lang].phrases ?? D.en.phrases) as string[]

  useEffect(() => {
    const d = document.documentElement
    d.lang = lang; d.dir = lang === "ar" ? "rtl" : "ltr"; d.dataset.theme = theme
    d.classList.toggle("no-fx", !fx)
    document.title = t("doc_title")
    store.set("site-lang", lang); store.set("site-theme", theme); store.set("site-motion-v2", fx ? "on" : "off")
  }, [lang, theme, fx])
  useEffect(() => {
    const f = () => setScrolled(scrollY > 600)
    addEventListener("scroll", f, { passive: true }); return () => removeEventListener("scroll", f)
  }, [])

  const shown = useMemo(() => WORK.filter((w) => filter === "all" || w.cat === filter), [filter])
  const ext = <span className="sr-only">{t("ext_new")}</span>
  const btn = "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition"

  return (
    <MotionConfig reducedMotion={fx ? "never" : "always"}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-white">{t("skip")}</a>
      <ScrollProgress className="top-0 z-[60] h-0.5 from-brand via-accent to-brand" />

      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3">
        <div className="flex h-14 w-full max-w-[1200px] items-center justify-between gap-4 rounded-full border border-border bg-background/60 px-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <a href="#hero" className="font-display text-lg font-extrabold" aria-label="NEDLSALAH">NEDL<span className="text-accent">SALAH</span></a>
          <nav aria-label={t("aria_main")} className="hidden lg:block"><ul className="flex gap-1">
            {NAV.map(([id, k]) => <li key={id}><a href={`#${id}`} className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-brand/20 hover:text-foreground">{t(k)}</a></li>)}
          </ul></nav>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => setLang(lang === "en" ? "ar" : "en")} aria-label={t("aria_lang")} className="rounded-full px-3 py-1.5 text-xs font-semibold tracking-wider hover:bg-brand/20">
              <span className={lang === "en" ? "text-accent" : "opacity-50"}>EN</span> / <span className={lang === "ar" ? "text-accent" : "opacity-50"}>AR</span>
            </button>
            <button type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={t(theme === "dark" ? "aria_light" : "aria_dark")} className="grid size-9 place-items-center rounded-full hover:bg-brand/20">
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <button type="button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="mobile-menu" aria-label={t(menu ? "aria_menu_close" : "aria_menu_open")} className="grid size-9 place-items-center rounded-full hover:bg-brand/20 lg:hidden">
              {menu ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>
      <div id="mobile-menu" inert={!menu} aria-hidden={!menu} className={cn("fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-background/95 px-8 backdrop-blur-xl transition lg:hidden", menu ? "opacity-100" : "pointer-events-none opacity-0")}>
        {NAV.map(([id, k], i) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)} className="font-display flex items-baseline gap-4 py-2 text-4xl font-bold"><span className="text-sm text-accent">0{i + 1}</span>{t(k)}</a>)}
        <a href={`mailto:${EMAIL}`} className="mt-6 text-muted-foreground">{EMAIL}</a>
      </div>

      <main id="main">
        {/* HERO */}
        <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-32">
          <DotPattern className="[mask-image:radial-gradient(700px_circle_at_center,white,transparent)] fill-foreground/20" />
          <div className="pointer-events-none absolute -top-40 start-1/2 size-[600px] -translate-x-1/2 rounded-full bg-brand/25 blur-[140px]" />
          <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              <BlurFade delay={0.05}>
                <div className="relative mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-1.5 text-sm">
                  <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" /><span className="relative inline-flex size-2 rounded-full bg-emerald-400" /></span>
                  <AnimatedShinyText className="mx-0 max-w-none">{t("hero_badge")}</AnimatedShinyText>
                </div>
              </BlurFade>
              <TextAnimate key={lang} as="h1" animation="blurInUp" by="word" className="font-display text-5xl font-extrabold leading-[1.02] sm:text-7xl">{t("hero_h1")}</TextAnimate>
              <BlurFade delay={0.35}><div className="mt-5 h-9 text-xl font-medium text-accent sm:text-2xl" aria-live="off"><WordRotate key={lang} words={phrases.slice(1)} duration={2600} className="text-xl font-medium sm:text-2xl" /></div></BlurFade>
              <BlurFade delay={0.45}><p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{t("hero_lead")}</p></BlurFade>
              <BlurFade delay={0.55}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a href="#services"><ShimmerButton shimmerColor="#7be3f5" background="linear-gradient(135deg,#25bddc,#0892b1 60%,#067490)" className="h-12 px-7 text-sm font-semibold shadow-xl shadow-brand/30">{t("hero_cta_services")}<ArrowUpRight className="ms-2 size-4 flip" /></ShimmerButton></a>
                  <a href="#contact" className={cn(btn, "border border-border hover:bg-brand/15")}>{t("hero_cta_contact")}</a>
                </div>
              </BlurFade>
              <BlurFade delay={0.65}>
                <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-border pt-6 text-sm">
                  <div><dt className="text-muted-foreground">{t("meta_years")}</dt><dd dir="ltr" className="font-display mt-1 text-3xl font-bold [unicode-bidi:isolate] text-start"><NumberTicker value={7} />+</dd></div>
                  <div><dt className="text-muted-foreground">{t("meta_location")}</dt><dd className="mt-2 font-semibold">{t("meta_location_val")}</dd></div>
                  <div><dt className="text-muted-foreground">{t("meta_langs")}</dt><dd className="mt-2 font-semibold">{t("skill_langs")}</dd></div>
                </dl>
              </BlurFade>
            </div>
            <div className="relative mx-auto flex aspect-square w-full max-w-[460px] items-center justify-center" aria-hidden="true">
              <div className="relative z-10 size-40 overflow-hidden rounded-full border-2 border-accent/60 shadow-2xl shadow-brand/40 sm:size-52"><img src={`${import.meta.env.BASE_URL}img/me-640.webp`} alt="" width={640} height={640} className="size-full object-cover" /></div>
              <OrbitingCircles iconSize={64} radius={150} duration={30} path>{CHIPS.slice(0, 3).map((c) => <span key={c} className="whitespace-nowrap rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold shadow-lg">{c}</span>)}</OrbitingCircles>
              <OrbitingCircles iconSize={64} radius={215} duration={40} reverse path>{CHIPS.slice(3).map((c) => <span key={c} className="whitespace-nowrap rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold shadow-lg">{c}</span>)}</OrbitingCircles>
            </div>
          </div>
        </section>
        <div className="border-y border-border bg-surface/50 py-5" aria-hidden="true">
          <Marquee pauseOnHover className="[--duration:30s] [--gap:2.5rem]">{["Meta Ads", "Google Ads", "SEO", "WordPress", "Photography", "Video", "Branding"].map((s) => <span key={s} className="font-display flex items-center gap-10 text-2xl font-bold text-foreground/70">{s}<span className="text-accent">✦</span></span>)}</Marquee>
        </div>

        {/* SERVICES */}
        <Section id="services">
          <Eyebrow n="01">{t("svc_eyebrow")}</Eyebrow>
          <Heading text={t("svc_title")} />
          <BlurFade inView><p className="mt-5 max-w-2xl text-lg text-muted-foreground">{t("svc_desc")}</p></BlurFade>
          <ol className="mt-12 divide-y divide-border border-y border-border">
            {range(6).map((n, i) => {
              const isOpen = open === i
              return <li key={n}><BlurFade inView delay={i * 0.04}>
                <h3><button type="button" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} aria-controls={`svc${n}`} className="flex w-full items-center gap-5 py-6 text-start">
                  <span className="text-sm tabular-nums text-accent">0{n}</span>
                  <span className="font-display flex-1 text-2xl font-semibold sm:text-4xl">{t(`svc${n}_title`)}</span>
                  <Plus className={cn("size-6 text-muted-foreground transition-transform", isOpen && "rotate-45 text-accent")} />
                </button></h3>
                <div id={`svc${n}`} role="region" inert={!isOpen} className={cn("grid transition-[grid-template-rows] duration-500", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div className="overflow-hidden"><div className="grid gap-6 pb-8 ps-10 sm:grid-cols-2 sm:ps-14">
                    <p className="text-muted-foreground">{t(`svc${n}_desc`)}</p>
                    <ul className="space-y-2 text-sm">{range(4).map((l) => <li key={l} className="flex gap-2"><span className="text-accent">→</span>{t(`svc${n}_li${l}`)}</li>)}</ul>
                  </div></div>
                </div>
              </BlurFade></li>
            })}
          </ol>
        </Section>

        {/* WORK */}
        <Section id="work" alt>
          <Eyebrow n="02">{t("work_eyebrow")}</Eyebrow>
          <Heading text={t("work_title")} />
          <BlurFade inView><p className="mt-5 max-w-2xl text-lg text-muted-foreground">{t("work_desc")}</p></BlurFade>
          <div role="group" aria-label={t("aria_filter")} className="mt-8 flex flex-wrap gap-2">
            {FILTERS.map(([f, k]) => <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)} className={cn("rounded-full border px-4 py-2 text-sm font-medium transition", filter === f ? "border-transparent bg-brand text-white" : "border-border hover:bg-brand/15")}>{t(k)}</button>)}
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((w, i) => {
              const title = "name" in w ? w.name : t(w.ti)
              return <BlurFade key={w.id} inView delay={Math.min(i, 5) * 0.05}>
                <a href={w.url} target="_blank" rel="noopener noreferrer" className="group block">
                  <MagicCard className="rounded-3xl" gradientColor={theme === "dark" ? "#0892b126" : "#0892b114"}>
                    <div className="overflow-hidden rounded-t-3xl"><img src={`${import.meta.env.BASE_URL}img/work/${w.img}`} alt="" loading="lazy" decoding="async" width={1280} height={800} className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105" /></div>
                    <div className="p-5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent">{t(FILTERS.find((f) => f[0] === w.cat)![1])}</span>
                      <p className="font-display mt-1 flex items-center justify-between text-xl font-semibold">{title}<ArrowUpRight className="size-5 flip transition group-hover:-translate-y-1 group-hover:text-accent" />{ext}</p>
                    </div>
                  </MagicCard>
                </a>
              </BlurFade>
            })}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">{t("work_note")}</p>
        </Section>

        {/* ABOUT */}
        <Section id="about">
          <div className="grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <BlurFade inView><div className="relative overflow-hidden rounded-3xl border border-border">
              <picture><source type="image/webp" srcSet={`${import.meta.env.BASE_URL}img/me-640.webp 640w, ${import.meta.env.BASE_URL}img/me-1100.webp 1100w`} sizes="(min-width:1024px) 34vw, 100vw" /><img src={`${import.meta.env.BASE_URL}img/me.jpg`} alt={t("about_alt")} loading="lazy" width={1100} className="w-full object-cover" /></picture>
              <BorderBeam size={220} duration={9} colorFrom="#3cc1da" colorTo="#0892b1" />
            </div></BlurFade>
            <div>
              <Eyebrow n="03">{t("about_eyebrow")}</Eyebrow>
              <Heading text={t("about_title")} />
              <BlurFade inView><p className="mt-6 text-xl leading-relaxed">{t("about_p1")}</p></BlurFade>
              <BlurFade inView><div className="mt-5 grid gap-5 text-muted-foreground sm:grid-cols-2"><p>{t("about_p2")}</p><p>{t("about_p3")}</p></div></BlurFade>
              <BlurFade inView><dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[[t("stat_years"), <><NumberTicker value={7} />+</>], [t("stat_based"), t("stat_uae")], [t("stat_services"), <NumberTicker value={6} />], [t("stat_langs"), <NumberTicker value={3} />]].map(([k, v], i) => (
                  <div key={i} className="rounded-2xl border border-border bg-surface/60 p-4"><dt className="text-xs text-muted-foreground">{k}</dt><dd dir="auto" className="font-display mt-2 text-2xl font-bold [unicode-bidi:isolate]">{v}</dd></div>
                ))}
              </dl></BlurFade>
            </div>
          </div>
        </Section>

        {/* PROCESS */}
        <Section id="process" alt>
          <Eyebrow n="04">{t("proc_eyebrow")}</Eyebrow>
          <Heading text={t("proc_title")} />
          <BlurFade inView><p className="mt-5 max-w-2xl text-lg text-muted-foreground">{t("proc_desc")}</p></BlurFade>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {range(4).map((n) => <li key={n}><BlurFade inView delay={n * 0.08}><div className="h-full rounded-3xl border border-border bg-background/60 p-6">
              <span className="font-display text-5xl font-bold text-accent/40">0{n}</span>
              <h3 className="font-display mt-4 text-2xl font-semibold">{t(`proc${n}_title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`proc${n}_desc`)}</p>
            </div></BlurFade></li>)}
          </ol>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow n="05">{t("exp_eyebrow")}</Eyebrow>
              <Heading text={t("exp_title")} />
              <BlurFade inView><p className="mt-5 text-lg text-muted-foreground">{t("exp_desc")}</p></BlurFade>
            </div>
            <ol className="divide-y divide-border border-y border-border">
              {range(9).map((n) => <li key={n}><BlurFade inView><div className="flex gap-5 py-5"><span className="text-sm tabular-nums text-accent">0{n}</span><p className="leading-relaxed">{t(`exp_s${n}`)}</p></div></BlurFade></li>)}
            </ol>
          </div>
        </Section>

        {/* SKILLS */}
        <Section id="skills" alt>
          <Eyebrow n="06">{t("skills_eyebrow")}</Eyebrow>
          <Heading text={t("skills_title")} />
          <BlurFade inView><p className="mt-5 max-w-2xl text-lg text-muted-foreground">{t("skills_desc")}</p></BlurFade>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {[...SKILLS, ["sk_languages", [t("skill_langs")]] as [string, string[]]].map(([k, items]) => (
              <BlurFade key={k} inView><div className="grid gap-3 py-5 sm:grid-cols-[14rem_1fr]">
                <h3 className="font-semibold">{t(k)}</h3>
                <ul className="flex flex-wrap gap-2">{items.map((s) => <li key={s} className="rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-sm">{s}</li>)}</ul>
              </div></BlurFade>
            ))}
          </div>
        </Section>

        {/* CERTIFICATIONS */}
        <Section id="certifications">
          <Eyebrow n="07">{t("certs_eyebrow")}</Eyebrow>
          <Heading text={t("certs_title")} />
          <BlurFade inView><p className="mt-5 max-w-2xl text-lg text-muted-foreground">{t("certs_desc")}</p></BlurFade>
          <ol className="mt-10 divide-y divide-border border-y border-border">
            {CERTS.map(([y, p], i) => <li key={i}><BlurFade inView><div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-5"><span className="w-14 text-sm tabular-nums text-accent">{y}</span><h3 className="font-display flex-1 text-xl font-semibold sm:text-2xl">{t(`cert${i + 1}_title`)}</h3><span className="text-sm text-muted-foreground">{p}</span></div></BlurFade></li>)}
          </ol>
        </Section>

        {/* TESTIMONIALS */}
        <Section id="testimonials" alt>
          <Eyebrow n="08">{t("tst_eyebrow")}</Eyebrow>
          <Heading text={t("tst_title")} />
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {range(4).map((n) => <li key={n}><BlurFade inView delay={n * 0.06}>
              <figure className="relative h-full overflow-hidden rounded-3xl border border-border bg-background/60 p-7">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">{t(`tst${n}_label`)}</span>
                <blockquote className="mt-3 text-lg leading-relaxed">“{t(`tst${n}_q`)}”</blockquote>
                <figcaption className="mt-4 text-sm text-muted-foreground">{t(`tst${n}_role`)}</figcaption>
                {n === 1 && <BorderBeam size={180} duration={10} colorFrom="#3cc1da" colorTo="#0892b1" />}
              </figure>
            </BlurFade></li>)}
          </ul>
        </Section>

        {/* CONTACT */}
        <Section id="contact">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface/70 px-4 py-16 text-center sm:px-12 sm:py-24">
            <div className="pointer-events-none absolute inset-x-0 -top-24 mx-auto size-[420px] rounded-full bg-brand/30 blur-[120px]" />
            <div className="relative">
              <Eyebrow n="09">{t("contact_eyebrow")}</Eyebrow>
              <Heading text={t("cta_title")} className="mx-auto max-w-3xl sm:text-7xl" />
              <BlurFade inView><p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{t("cta_desc")}</p></BlurFade>
              <BlurFade inView><a href={`mailto:${EMAIL}`} className="mt-8 inline-block"><ShimmerButton shimmerColor="#7be3f5" background="linear-gradient(135deg,#25bddc,#0892b1 60%,#067490)" className="h-14 px-10 text-base font-semibold shadow-xl shadow-brand/30">{t("cta_btn")}</ShimmerButton></a></BlurFade>
              <BlurFade inView><dl className="mx-auto mt-12 grid max-w-3xl gap-4 text-start sm:grid-cols-2">
                {[["c_loc", t("exp_loc1")], ["c_email", EMAIL], ["c_avail", t("hero_badge")], ["c_langs", t("skill_langs")]].map(([k, v]) => <div key={k} className="rounded-2xl border border-border bg-background/60 p-4"><dt className="text-xs text-muted-foreground">{t(k)}</dt><dd className="mt-1 font-medium [overflow-wrap:anywhere] sm:[overflow-wrap:normal]">{v}</dd></div>)}
              </dl></BlurFade>
            </div>
            <BorderBeam size={260} duration={12} colorFrom="#3cc1da" colorTo="#0892b1" />
          </div>
        </Section>
      </main>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 text-sm text-muted-foreground sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <a href="#hero" className="font-display text-lg font-extrabold text-foreground">NEDL<span className="text-accent">SALAH</span></a>
            <p>{t("footer_copy")}</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a className="hover:text-foreground" href={BEHANCE} target="_blank" rel="noopener noreferrer">Behance{ext}</a>
            <a className="hover:text-foreground" href={PHOTOS} target="_blank" rel="noopener noreferrer">Photography{ext}</a>
            <a className="hover:text-foreground" href={VIDEO} target="_blank" rel="noopener noreferrer">Video{ext}</a>
            <a className="hover:text-foreground" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <button type="button" aria-pressed={!fx} onClick={() => setFx(!fx)} className="hover:text-foreground">{t("motion_label")}: {t(fx ? "motion_on" : "motion_off")}</button>
          </div>
          <p>{t("foot_note")}</p>
        </div>
      </footer>
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label={lang === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp"} className="wa-glow fixed bottom-5 left-5 z-40 grid size-11 place-items-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-110 focus-visible:scale-110">
        <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden="true"><path d={WA_PATH} /></svg><span className="sr-only">{t("ext_new")}</span>
      </a>
      <a href="#hero" aria-label={t("aria_top")} className={cn("fixed bottom-5 right-5 z-40 grid size-11 place-items-center rounded-full border border-border bg-surface shadow-lg transition", scrolled ? "opacity-100" : "pointer-events-none opacity-0")}><ArrowUpRight className="size-5 -rotate-45" /></a>
    </MotionConfig>
  )
}
