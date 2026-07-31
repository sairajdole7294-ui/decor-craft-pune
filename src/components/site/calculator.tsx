import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, ClipboardList, RefreshCw, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Reveal } from "./motion";
import { BrandButton } from "./bits";
import { company } from "@/lib/site-data";

const WA_NUMBER = "918007180059";

const projectTypes = [
  { id: "office", label: "Office Fit-out" },
  { id: "commercial", label: "Commercial / Retail" },
  { id: "hospitality", label: "Hospitality" },
  { id: "institutional", label: "Campus / Institutional" },
  { id: "kitchen", label: "Modular Kitchen" },
  { id: "wardrobe", label: "Wardrobes & Storage" },
];

const grades = [
  { id: "essential", label: "Essential", note: "Laminate finishes, MR-grade carcass, standard hardware." },
  { id: "premium", label: "Premium", note: "Mixed veneer & laminate, soft-close hardware, acoustic zones." },
  { id: "signature", label: "Signature", note: "Veneer, solid surface, back-lit detailing, imported fittings." },
];

const budgets = ["Under ₹10 L", "₹10 – 25 L", "₹25 – 50 L", "₹50 L – 1 Cr", "Above ₹1 Cr", "Prefer to discuss"];
const timelines = [
  { id: "fast", label: "Under 8 weeks" },
  { id: "standard", label: "8 – 16 weeks" },
  { id: "flexible", label: "Flexible / phased" },
];

const steps = ["Project Type", "Area", "Material Grade", "Budget Preference", "Timeline", "Your Details", "Send Enquiry"];

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
          : "border-border bg-card hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[var(--shadow-card)]",
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

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  textarea,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  textarea?: boolean;
  className?: string;
}) {
  const cls = cn(
    "rounded-lg border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary",
    error ? "border-destructive" : "border-border",
  );
  return (
    <label className={cn("flex flex-col gap-1", className)}>
      <span className="text-[0.68rem] font-bold tracking-[0.12em] text-muted-foreground uppercase">{label}</span>
      {textarea ? (
        <textarea rows={3} value={value} maxLength={600} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={cls} />
      ) : (
        <input type={type} value={value} maxLength={140} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
      {error ? <span className="text-[0.68rem] text-destructive">{error}</span> : null}
    </label>
  );
}

function openWhatsApp(lines: string[]) {
  const text = encodeURIComponent(lines.join("\n"));
  window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
}

export function CostCalculator() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState("");
  const [area, setArea] = useState(2500);
  const [grade, setGrade] = useState("premium");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("standard");
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "", details: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const canAdvance = () => {
    if (step === 0) return !!type;
    if (step === 1) return area >= 100;
    if (step === 3) return !!budget;
    return true;
  };

  const validateDetails = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[0-9+\-\s()]{8,16}$/.test(form.phone.trim())) e.phone = "Enter a valid mobile number.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      e.email = "Enter a valid email address.";
    if (form.city.trim().length < 2) e.city = "Please enter your city.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const summary: [string, string][] = [
    ["Name", form.name || "—"],
    ["Mobile", form.phone || "—"],
    ["Email", form.email || "—"],
    ["City", form.city || "—"],
    ["Project Type", projectTypes.find((p) => p.id === type)?.label ?? "—"],
    ["Area", `${area.toLocaleString("en-IN")} sq.ft.`],
    ["Material Grade", grades.find((g) => g.id === grade)?.label ?? "—"],
    ["Budget Preference", budget || "—"],
    ["Timeline", timelines.find((t) => t.id === timeline)?.label ?? "—"],
    ["Additional Requirements", form.details.trim() || "—"],
  ];

  const sendToWhatsApp = () => {
    openWhatsApp(["*New Interior Project Enquiry*", "", ...summary.map(([k, v]) => `${k}: ${v}`)]);
    toast.success("Opening WhatsApp", { description: "Your enquiry details are pre-filled — just hit send." });
  };

  const next = () => {
    if (step === 5 && !validateDetails()) return;
    setStep((s) => Math.min(steps.length - 1, s + 1));
  };

  const reset = () => {
    setStep(0);
    setType("");
    setArea(2500);
    setGrade("premium");
    setBudget("");
    setTimeline("standard");
    setForm({ name: "", phone: "", email: "", city: "", details: "" });
    setErrors({});
  };

  return (
    <Reveal className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-secondary/60 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-brand-gradient text-primary-foreground">
            <ClipboardList className="size-4" />
          </span>
          <div>
            <p className="text-sm font-semibold">Project Planner</p>
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
              <p className="mt-1 text-xs text-muted-foreground">Slide or pick the approximate area in square feet.</p>
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
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
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
            <div className="grid gap-2.5 sm:grid-cols-3">
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
              <Field label="Full name*" value={form.name} onChange={set("name")} placeholder="Your name" error={errors.name} />
              <Field label="Mobile number*" type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 ..." error={errors.phone} />
              <Field label="Email" type="email" value={form.email} onChange={set("email")} placeholder="you@company.com" error={errors.email} />
              <Field label="City*" value={form.city} onChange={set("city")} placeholder="Pune" error={errors.city} />
              <Field
                className="sm:col-span-2"
                label="Additional requirements"
                value={form.details}
                onChange={set("details")}
                placeholder="Site status, drawings available, preferred site visit date…"
                textarea
              />
              <p className="text-[0.68rem] text-muted-foreground sm:col-span-2">
                We use these details only to review your enquiry and share a customised quotation.
              </p>
            </div>
          ) : null}

          {step === 6 ? (
            <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
              <div className="rounded-2xl surface-ink p-5">
                <p className="text-[0.62rem] font-bold tracking-[0.16em] text-primary uppercase">Enquiry ready</p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-2xl leading-tight font-bold text-ink-foreground sm:text-3xl">
                  Send your project brief on WhatsApp
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-foreground/65">
                  Our team reviews every brief personally and comes back with a customised quotation after understanding
                  your site, scope and finishes. No automated pricing — only a real conversation.
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={sendToWhatsApp}
                    className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
                  >
                    <MessageCircle className="size-4 transition-transform duration-300 group-hover:scale-110" />
                    Send to WhatsApp
                  </button>
                  <BrandButton href={company.phoneHref} variant="ghost-light">Call {company.phone}</BrandButton>
                </div>
              </div>
              <dl className="grid grid-cols-2 gap-3 self-start">
                {summary.map(([k, v]) => (
                  <div
                    key={k}
                    className={cn(
                      "rounded-xl border border-border p-3 transition-colors hover:border-primary/50",
                      k === "Additional Requirements" && "col-span-2",
                    )}
                  >
                    <dt className="text-[0.62rem] font-bold tracking-[0.12em] text-muted-foreground uppercase">{k}</dt>
                    <dd className="mt-1 text-sm font-semibold break-words">{v}</dd>
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
              {step === 5 ? "Review enquiry" : "Continue"} <ChevronRight className="size-4" />
            </button>
          </div>
        ) : (
          <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-4">
            <button
              type="button"
              onClick={() => setStep(5)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="size-4" /> Edit details
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              <RefreshCw className="size-3.5" /> Start over
            </button>
          </div>
        )}
      </div>
    </Reveal>
  );
}

export function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "", type: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[0-9+\-\s()]{8,16}$/.test(form.phone.trim())) e.phone = "Enter a valid mobile number.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = "Enter a valid email address.";
    if (form.message.trim().length < 5) e.message = "Tell us a little about the project.";
    setErrors(e);
    if (Object.keys(e).length) return;
    openWhatsApp([
      "*New Interior Project Enquiry*",
      "",
      `Name: ${form.name}`,
      `Mobile: ${form.phone}`,
      `Email: ${form.email || "—"}`,
      `City: ${form.city || "—"}`,
      `Project Type: ${form.type || "—"}`,
      `Additional Requirements: ${form.message}`,
    ]);
    toast.success("Opening WhatsApp", { description: "Your enquiry is pre-filled — just hit send." });
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="border-b border-border bg-secondary/60 px-5 py-4">
        <p className="text-sm font-semibold">Send us an enquiry</p>
        <p className="text-xs text-muted-foreground">We reply within one business day with a customised quotation.</p>
      </div>
      <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
        <Field label="Full name*" value={form.name} onChange={set("name")} placeholder="Your name" error={errors.name} />
        <Field label="Mobile number*" type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 ..." error={errors.phone} />
        <Field label="Email" type="email" value={form.email} onChange={set("email")} placeholder="you@company.com" error={errors.email} />
        <Field label="City" value={form.city} onChange={set("city")} placeholder="Pune" />
        <Field className="sm:col-span-2" label="Project type" value={form.type} onChange={set("type")} placeholder="Office fit-out, modular kitchen…" />
        <Field
          className="sm:col-span-2"
          label="Project details*"
          value={form.message}
          onChange={set("message")}
          placeholder="Area, site status, timeline, finishes you have in mind…"
          error={errors.message}
          textarea
        />
        <div className="flex flex-wrap gap-2.5 sm:col-span-2">
          <button
            type="button"
            onClick={submit}
            className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
          >
            <MessageCircle className="size-4 transition-transform duration-300 group-hover:scale-110" />
            Send on WhatsApp
          </button>
          <BrandButton href={company.phoneHref} variant="outline">Call {company.phone}</BrandButton>
        </div>
      </div>
    </div>
  );
}
