import { useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Calculator as CalcIcon, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Reveal } from "./motion";
import { BrandButton } from "./bits";
import { company } from "@/lib/site-data";

const projectTypes = [
  { id: "office", label: "Office Fit-out", rate: 1750 },
  { id: "commercial", label: "Commercial / Retail", rate: 1950 },
  { id: "hospitality", label: "Hospitality", rate: 2200 },
  { id: "institutional", label: "Campus / Institutional", rate: 1550 },
  { id: "kitchen", label: "Modular Kitchen", rate: 2100 },
  { id: "wardrobe", label: "Wardrobes & Storage", rate: 1650 },
];

const grades = [
  { id: "essential", label: "Essential", mult: 0.85, note: "Laminate finishes, MR-grade carcass, standard hardware." },
  { id: "premium", label: "Premium", mult: 1, note: "Mixed veneer & laminate, soft-close hardware, acoustic zones." },
  { id: "signature", label: "Signature", mult: 1.32, note: "Veneer, solid surface, back-lit detailing, imported fittings." },
];

const budgets = ["Under ₹10 L", "₹10 – 25 L", "₹25 – 50 L", "₹50 L – 1 Cr", "Above ₹1 Cr"];
const timelines = [
  { id: "fast", label: "Under 8 weeks", mult: 1.12 },
  { id: "standard", label: "8 – 16 weeks", mult: 1 },
  { id: "flexible", label: "Flexible / phased", mult: 0.96 },
];

const steps = ["Project Type", "Area", "Material Grade", "Budget", "Timeline", "Your Details", "Estimate"];

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

function Option({
  active,
  onClick,
  title,
  note,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  note?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative rounded-xl border p-3.5 text-left transition-all duration-300",
        active
          ? "border-primary bg-accent shadow-[var(--shadow-card)]"
          : "border-border bg-card hover:-translate-y-0.5 hover:border-primary/50",
      )}
    >
      <span className="flex items-start justify-between gap-2">
        <span className="text-sm font-semibold">{title}</span>
        <span
          className={cn(
            "mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors",
            active ? "border-transparent bg-brand-gradient text-primary-foreground" : "border-border",
          )}
        >
          {active ? <Check className="size-3" /> : null}
        </span>
      </span>
      {note ? <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{note}</span> : null}
    </button>
  );
}

export function CostCalculator() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState("");
  const [area, setArea] = useState(2500);
  const [grade, setGrade] = useState("premium");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("standard");
  const [form, setForm] = useState({ name: "", phone: "", email: "", company: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const estimate = useMemo(() => {
    const t = projectTypes.find((p) => p.id === type);
    const g = grades.find((x) => x.id === grade);
    const tl = timelines.find((x) => x.id === timeline);
    if (!t || !g || !tl) return null;
    const base = t.rate * area * g.mult * tl.mult;
    return { low: Math.round((base * 0.9) / 1000) * 1000, high: Math.round((base * 1.12) / 1000) * 1000, rate: Math.round(t.rate * g.mult * tl.mult) };
  }, [type, area, grade, timeline]);

  const canAdvance = () => {
    if (step === 0) return !!type;
    if (step === 1) return area >= 100;
    if (step === 3) return !!budget;
    return true;
  };

  const validateDetails = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[0-9+\-\s()]{8,16}$/.test(form.phone.trim())) e.phone = "Enter a valid phone number.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      e.email = "Enter a valid email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 5) {
      if (!validateDetails()) return;
      toast.success("Estimate ready", { description: "Our team will call you within one business day." });
    }
    setStep((s) => Math.min(steps.length - 1, s + 1));
  };

  const reset = () => {
    setStep(0);
    setType("");
    setArea(2500);
    setGrade("premium");
    setBudget("");
    setTimeline("standard");
    setForm({ name: "", phone: "", email: "", company: "" });
    setErrors({});
  };

  return (
    <Reveal className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-secondary/60 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-brand-gradient text-primary-foreground">
            <CalcIcon className="size-4" />
          </span>
          <div>
            <p className="text-sm font-semibold">Interior Cost Estimator</p>
            <p className="text-xs text-muted-foreground">
              Step {step + 1} of {steps.length} · {steps[step]}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
        >
          <RefreshCw className="size-3.5" /> Restart
        </button>
      </div>

      <div className="h-1 bg-secondary">
        <div
          className="h-full bg-brand-gradient transition-[width] duration-500"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>

      <div className="p-5 sm:p-6">
        <div key={step} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {step === 0 ? (
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {projectTypes.map((p) => (
                <Option key={p.id} active={type === p.id} onClick={() => setType(p.id)} title={p.label} />
              ))}
            </div>
          ) : null}

          {step === 1 ? (
            <div>
              <p className="text-sm font-semibold">Carpet area to be delivered</p>
              <p className="mt-1 text-xs text-muted-foreground">Slide or type the approximate area in square feet.</p>
              <div className="mt-5 flex items-end gap-4">
                <span className="font-[family-name:var(--font-display)] text-4xl font-bold text-gradient-brand">
                  {area.toLocaleString("en-IN")}
                </span>
                <span className="pb-1.5 text-sm text-muted-foreground">sq.ft.</span>
              </div>
              <input
                type="range"
                min={100}
                max={50000}
                step={100}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                aria-label="Area in square feet"
                className="mt-4 w-full accent-[var(--primary)]"
              />
              <div className="mt-2 flex justify-between text-[0.65rem] text-muted-foreground">
                <span>100 sq.ft.</span>
                <span>50,000 sq.ft.</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {[500, 1500, 5000, 12000, 25000].map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setArea(a)}
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
                  >
                    {a.toLocaleString("en-IN")} sq.ft.
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-2.5 sm:grid-cols-3">
              {grades.map((g) => (
                <Option key={g.id} active={grade === g.id} onClick={() => setGrade(g.id)} title={g.label} note={g.note} />
              ))}
            </div>
          ) : null}

          {step === 3 ? (
            <div className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
              {budgets.map((b) => (
                <Option key={b} active={budget === b} onClick={() => setBudget(b)} title={b} />
              ))}
            </div>
          ) : null}

          {step === 4 ? (
            <div className="grid gap-2.5 sm:grid-cols-3">
              {timelines.map((t) => (
                <Option key={t.id} active={timeline === t.id} onClick={() => setTimeline(t.id)} title={t.label} />
              ))}
            </div>
          ) : null}

          {step === 5 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {([
                ["name", "Full name*", "text", "Your name"],
                ["phone", "Phone*", "tel", "+91 ..."],
                ["email", "Email", "email", "you@company.com"],
                ["company", "Company", "text", "Organisation"],
              ] as const).map(([key, label, inputType, ph]) => (
                <label key={key} className="flex flex-col gap-1">
                  <span className="text-[0.68rem] font-bold tracking-[0.12em] text-muted-foreground uppercase">{label}</span>
                  <input
                    type={inputType}
                    value={form[key]}
                    maxLength={120}
                    placeholder={ph}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className={cn(
                      "rounded-lg border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary",
                      errors[key] ? "border-destructive" : "border-border",
                    )}
                  />
                  {errors[key] ? <span className="text-[0.68rem] text-destructive">{errors[key]}</span> : null}
                </label>
              ))}
              <p className="text-[0.68rem] text-muted-foreground sm:col-span-2">
                We use these details only to share your estimate and schedule a consultation.
              </p>
            </div>
          ) : null}

          {step === 6 && estimate ? (
            <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
              <div className="rounded-2xl surface-ink p-5">
                <p className="text-[0.62rem] font-bold tracking-[0.16em] text-primary uppercase">Indicative estimate</p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-ink-foreground sm:text-4xl">
                  {inr(estimate.low)} – {inr(estimate.high)}
                </p>
                <p className="mt-2 text-sm text-ink-foreground/65">
                  Approximately {inr(estimate.rate)} per sq.ft. across {area.toLocaleString("en-IN")} sq.ft.
                </p>
                <p className="mt-3 text-xs leading-relaxed text-ink-foreground/50">
                  This is a budgeting range, not a quotation. A firm price follows a site measurement and a signed-off
                  design — our team will walk you through both.
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <BrandButton to="/contact">Book Consultation</BrandButton>
                  <BrandButton href={company.whatsapp} variant="ghost-light">Send on WhatsApp</BrandButton>
                </div>
              </div>
              <dl className="grid grid-cols-2 gap-3 self-start">
                {[
                  ["Project type", projectTypes.find((p) => p.id === type)?.label ?? "—"],
                  ["Area", `${area.toLocaleString("en-IN")} sq.ft.`],
                  ["Material grade", grades.find((g) => g.id === grade)?.label ?? "—"],
                  ["Budget band", budget || "—"],
                  ["Timeline", timelines.find((t) => t.id === timeline)?.label ?? "—"],
                  ["Contact", form.name || "—"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-border p-3">
                    <dt className="text-[0.62rem] font-bold tracking-[0.12em] text-muted-foreground uppercase">{k}</dt>
                    <dd className="mt-1 text-sm font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </div>

        {step < 6 ? (
          <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-4">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-40 hover:enabled:border-primary hover:enabled:text-primary"
            >
              <ChevronLeft className="size-4" /> Back
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!canAdvance()}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all disabled:opacity-40 hover:enabled:-translate-y-0.5 hover:enabled:shadow-[var(--shadow-lift)]"
            >
              {step === 5 ? "Calculate estimate" : "Continue"} <ChevronRight className="size-4" />
            </button>
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}