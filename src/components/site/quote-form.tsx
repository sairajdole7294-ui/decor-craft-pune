import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { company } from "@/lib/site-data";

type Props = {
  productName: string;
  variants?: { name: string; note: string }[];
  materials?: string[];
};

const MAX = { text: 120, long: 1000 };

export function RequestQuoteForm({ productName, variants = [], materials = [] }: Props) {
  const [sending, setSending] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string, max = MAX.text) => String(fd.get(k) ?? "").trim().slice(0, max);

    const values = {
      product: productName,
      variant: get("variant"),
      quantity: get("quantity", 20),
      material: get("material"),
      companyName: get("companyName"),
      person: get("person"),
      mobile: get("mobile", 20),
      email: get("email", 160),
      city: get("city"),
      details: get("details", MAX.long),
    };

    if (!values.person || !values.mobile) {
      toast.error("Please add a contact person and mobile number.");
      return;
    }
    if (!/^[0-9+\-\s()]{7,20}$/.test(values.mobile)) {
      toast.error("Please enter a valid mobile number.");
      return;
    }
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const lines = [
      "*Product Enquiry — Payal Decor*",
      `Product: ${values.product}`,
      values.variant && `Variant: ${values.variant}`,
      values.quantity && `Quantity: ${values.quantity}`,
      values.material && `Material / Finish: ${values.material}`,
      "",
      values.companyName && `Company: ${values.companyName}`,
      `Contact Person: ${values.person}`,
      `Mobile: ${values.mobile}`,
      values.email && `Email: ${values.email}`,
      values.city && `City: ${values.city}`,
      values.details && `\nProject Details: ${values.details}`,
    ].filter(Boolean);

    setSending(true);
    window.open(`${company.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp with your enquiry…");
    setTimeout(() => setSending(false), 800);
  }

  const field =
    "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary";
  const label = "text-[0.68rem] font-bold tracking-[0.12em] text-muted-foreground uppercase";

  return (
    <form onSubmit={onSubmit} className="card-premium grid gap-3 p-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className={label} htmlFor="q-product">Product name</label>
        <input id="q-product" name="product" value={productName} readOnly className={`${field} mt-1 bg-secondary/50 font-semibold`} />
      </div>

      <div>
        <label className={label} htmlFor="q-variant">Product variant</label>
        {variants.length ? (
          <select id="q-variant" name="variant" className={`${field} mt-1`} defaultValue="">
            <option value="">Select a variant</option>
            {variants.map((v) => (
              <option key={v.name} value={v.name}>{v.name}</option>
            ))}
          </select>
        ) : (
          <input id="q-variant" name="variant" maxLength={MAX.text} className={`${field} mt-1`} placeholder="e.g. Linear" />
        )}
      </div>

      <div>
        <label className={label} htmlFor="q-qty">Quantity</label>
        <input id="q-qty" name="quantity" maxLength={20} className={`${field} mt-1`} placeholder="e.g. 40 seats" />
      </div>

      <div>
        <label className={label} htmlFor="q-material">Material / finish</label>
        {materials.length ? (
          <select id="q-material" name="material" className={`${field} mt-1`} defaultValue="">
            <option value="">Select a material</option>
            {materials.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
            <option value="Need recommendation">Need recommendation</option>
          </select>
        ) : (
          <input id="q-material" name="material" maxLength={MAX.text} className={`${field} mt-1`} />
        )}
      </div>

      <div>
        <label className={label} htmlFor="q-company">Company name</label>
        <input id="q-company" name="companyName" maxLength={MAX.text} className={`${field} mt-1`} />
      </div>

      <div>
        <label className={label} htmlFor="q-person">Contact person *</label>
        <input id="q-person" name="person" required maxLength={MAX.text} className={`${field} mt-1`} />
      </div>

      <div>
        <label className={label} htmlFor="q-mobile">Mobile number *</label>
        <input id="q-mobile" name="mobile" required inputMode="tel" maxLength={20} className={`${field} mt-1`} placeholder="+91" />
      </div>

      <div>
        <label className={label} htmlFor="q-email">Email</label>
        <input id="q-email" name="email" type="email" maxLength={160} className={`${field} mt-1`} />
      </div>

      <div>
        <label className={label} htmlFor="q-city">City</label>
        <input id="q-city" name="city" maxLength={MAX.text} className={`${field} mt-1`} />
      </div>

      <div className="sm:col-span-2">
        <label className={label} htmlFor="q-details">Project details</label>
        <textarea id="q-details" name="details" rows={3} maxLength={MAX.long} className={`${field} mt-1 resize-none`} />
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] disabled:opacity-70"
        >
          <MessageCircle className="size-4" />
          Send Enquiry on WhatsApp
        </button>
        <p className="mt-2 text-center text-[0.68rem] text-muted-foreground">
          No pricing is calculated online — our team reviews your requirement and returns a customised quotation.
        </p>
      </div>
    </form>
  );
}