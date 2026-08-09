"use client";

import type { Dictionary } from "@/lib/dictionary";

import { useActionState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserIcon, BuildingOfficeIcon, EnvelopeIcon, ChatBubbleBottomCenterTextIcon, PaperAirplaneIcon, CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { submitContactForm, type ContactFormState } from "@/app/actions/contactActions";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

export default function ContactUs({ dict }: { dict: Dictionary }) {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state.success]);

  const infoRows = [
    { label: dict.contact.website_label, value: dict.contact.website_value },
    { label: dict.contact.demo_label, value: dict.contact.demo_value, note: dict.contact.demo_note, highlight: true },
    { label: dict.contact.email_label, value: dict.contact.email_value },
  ];

  return (
    <section id="kontak" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
        <div>
          <div className="text-xs tracking-widest uppercase text-primary font-semibold">{dict.contact.eyebrow}</div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground text-balance">
            {dict.contact.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground max-w-md">{dict.contact.subtitle}</p>

          <div className="mt-8 flex flex-col gap-4">
            {infoRows.map((row, i) => (
              <div key={i} className="flex gap-4 items-baseline">
                <div className="text-xs tracking-widest uppercase text-muted-foreground min-w-[96px]">{row.label}</div>
                <div>
                  <div className={`text-base font-semibold ${row.highlight ? "text-primary" : "text-foreground"}`}>
                    {row.value}
                  </div>
                  {row.note && <div className="mt-1 text-sm text-muted-foreground">{row.note}</div>}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 grid sm:grid-cols-2 gap-4">
            {dict.contact.contacts.map((person, i: number) => (
              <div key={i} className="rounded-lg border border-border p-4">
                <div className="text-base font-semibold text-foreground">{person.name}</div>
                <div className="mt-0.5 text-sm text-muted-foreground">{person.role}</div>
                <div className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {person.email}
                  <br />
                  {person.phone}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-muted p-7 lg:p-8">
          <div className="text-xl font-semibold text-foreground">{dict.contact.form.title}</div>

          <AnimatePresence mode="wait">
            {state.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`mt-5 p-4 rounded-lg flex items-start gap-3 ${
                  state.success
                    ? "bg-teal-100 text-teal-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                {state.success ? (
                  <CheckCircleIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                ) : (
                  <ExclamationTriangleIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                )}
                <span className="text-sm font-medium">
                  {state.success ? dict.contact.form.success_message : state.message}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <form ref={formRef} className="mt-6 space-y-4" action={formAction}>
            <div>
              <label htmlFor="contact-name" className="text-xs font-semibold text-foreground/70">{dict.contact.form.name_label}</label>
              <div className="relative mt-1.5">
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  className="block w-full pl-11 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  placeholder={dict.contact.form.name_placeholder}
                  required
                  disabled={isPending}
                />
              </div>
              {state.errors?.name && <p className="mt-1 text-xs text-destructive">{state.errors.name[0]}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-institution" className="text-xs font-semibold text-foreground/70">{dict.contact.form.institution_label}</label>
                <div className="relative mt-1.5">
                  <BuildingOfficeIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    id="contact-institution"
                    name="institution"
                    className="block w-full pl-11 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    placeholder={dict.contact.form.institution_placeholder}
                    required
                    disabled={isPending}
                  />
                </div>
                {state.errors?.institution && <p className="mt-1 text-xs text-destructive">{state.errors.institution[0]}</p>}
              </div>

              <div>
                <label htmlFor="contact-email" className="text-xs font-semibold text-foreground/70">{dict.contact.form.email_label}</label>
                <div className="relative mt-1.5">
                  <EnvelopeIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    className="block w-full pl-11 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    placeholder={dict.contact.form.email_placeholder}
                    required
                    disabled={isPending}
                  />
                </div>
                {state.errors?.email && <p className="mt-1 text-xs text-destructive">{state.errors.email[0]}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="text-xs font-semibold text-foreground/70">{dict.contact.form.message_label}</label>
              <div className="relative mt-1.5">
                <ChatBubbleBottomCenterTextIcon className="absolute left-3.5 top-4 h-5 w-5 text-muted-foreground" />
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  className="block w-full pl-11 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                  placeholder={dict.contact.form.message_placeholder}
                  required
                  disabled={isPending}
                />
              </div>
              {state.errors?.message && <p className="mt-1 text-xs text-destructive">{state.errors.message[0]}</p>}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className={`w-full bg-primary hover:bg-accent-secondary active:scale-[0.98] px-6 py-3.5 rounded-lg flex items-center justify-center gap-2 text-primary-foreground font-semibold transition-all duration-200 shadow-accent hover:shadow-accent-lg ${
                isPending ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isPending ? (
                <span>...</span>
              ) : (
                <>
                  <span>{dict.contact.form.submit}</span>
                  <PaperAirplaneIcon className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-xs leading-relaxed text-muted-foreground">{dict.contact.form.disclaimer}</div>
          </form>
        </div>
      </div>
    </section>
  );
}
