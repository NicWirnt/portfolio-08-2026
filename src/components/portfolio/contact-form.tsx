"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { createContactMessage, type ContactResult } from "@/server/contact-actions";

const fields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "message", label: "Message" }
] as const;

const emptyDraft = { name: "", email: "", message: "" };
const fieldClass = "w-full rounded-md border border-[var(--input-rule)] bg-white px-3 py-3 text-base text-[var(--ink)]";

export function ContactForm() {
  const [draft, setDraft] = useState(emptyDraft);
  const form = useRef<HTMLFormElement>(null);
  const [result, submit, pending] = useActionState<ContactResult | null, FormData>(
    async (_previousResult, formData) => {
      const result = await createContactMessage(formData).catch(() => ({ status: "unavailable" } as const));
      if (result.status === "success") setDraft(emptyDraft);
      return result;
    },
    null
  );

  useEffect(() => {
    if (result?.status === "invalid") {
      form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    }
  }, [result]);

  return (
    <form ref={form} action={submit} className="grid gap-4 rounded-xl border border-[var(--rule)] bg-white/70 p-5 sm:p-8">
      {fields.map(({ name, label, ...inputProps }) => {
        const error = result?.status === "invalid" ? result.errors[name] : undefined;
        const id = `contact-${name}`;
        const props = {
          id,
          name,
          value: draft[name],
          onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setDraft((current) => ({ ...current, [name]: event.target.value })),
          required: true,
          readOnly: pending,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? `${id}-error` : undefined,
          className: fieldClass
        };

        return (
          <div key={name} className="grid gap-2">
            <label htmlFor={id} className="text-sm font-semibold">{label}</label>
            {name === "message" ? <textarea {...props} rows={5} className={`${fieldClass} resize-y`} /> : <input {...props} {...inputProps} />}
            {error && <p id={`${id}-error`} className="text-sm text-red-800">{error}</p>}
          </div>
        );
      })}
      <button type="submit" disabled={pending} className="portfolio-button portfolio-button-primary mt-1 w-fit disabled:cursor-wait disabled:opacity-70">
        {pending ? "Sending…" : "Send message"} <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
      </button>
      <div role="status" className="text-sm leading-relaxed text-[var(--muted-ink)]">
        {!pending && result?.status === "success" && <p>Message sent. Thanks for getting in touch.</p>}
        {!pending && result?.status === "unavailable" && <p>Couldn’t send your message. Try again or use the email link.</p>}
      </div>
    </form>
  );
}
