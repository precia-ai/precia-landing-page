"use client";

import { motion } from "framer-motion";
import { ShieldCheckIcon, BoltIcon, ChatBubbleBottomCenterTextIcon, UserIcon, BuildingOfficeIcon, EnvelopeIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default function ContactUs({ dict }: { dict: any }) {
  return (
    <section id="contact" className="py-32 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #f5f8fc 0%, #eef3f9 100%)" }}>
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #0052ff 0%, transparent 70%)" }} />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, #15acd6 0%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23000000\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#0a1b4e] mb-6 leading-[1.1]">
              {dict.contact.title_part1}{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #0052ff, #15acd6)" }}>
                {dict.contact.title_highlight}
              </span>
            </h2>

            <p className="text-lg text-[#5f6e8c] font-light leading-relaxed mb-10 max-w-xl">
              {dict.contact.subtitle}
            </p>

            <div className="space-y-6">
              {[
                { icon: ShieldCheckIcon, text: dict.contact.features[0] },
                { icon: BoltIcon, text: dict.contact.features[1] },
                { icon: ChatBubbleBottomCenterTextIcon, text: dict.contact.features[2] },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-white border border-[#000000]/10 flex items-center justify-center shadow-sm">
                    <item.icon className="w-5 h-5 text-[#0052ff]" />
                  </div>
                  <span className="text-[#0a1b4e]/80 font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Form container with glassmorphism */}
            <div className="relative rounded-3xl border border-[#000000]/10 bg-white/80 backdrop-blur-2xl p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
              {/* Top gradient accent */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#0052ff]/30 to-transparent" />

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                {/* Name & Institution Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-[#0a1b4e]/70 pl-1">{dict.contact.form.name_label}</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-[#0052ff] transition-colors" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="block w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-[#0a1b4e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0052ff]/30 focus:border-[#0052ff]/50 transition-all font-medium"
                        placeholder={dict.contact.form.name_placeholder}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="institution" className="text-xs font-semibold text-[#0a1b4e]/70 pl-1">{dict.contact.form.institution_label}</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <BuildingOfficeIcon className="h-5 w-5 text-gray-400 group-focus-within:text-[#0052ff] transition-colors" />
                      </div>
                      <input
                        type="text"
                        id="institution"
                        name="institution"
                        className="block w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-[#0a1b4e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0052ff]/30 focus:border-[#0052ff]/50 transition-all font-medium"
                        placeholder={dict.contact.form.institution_placeholder}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-[#0a1b4e]/70 pl-1">{dict.contact.form.email_label}</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400 group-focus-within:text-[#0052ff] transition-colors" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="block w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-[#0a1b4e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0052ff]/30 focus:border-[#0052ff]/50 transition-all font-medium"
                      placeholder={dict.contact.form.email_placeholder}
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-[#0a1b4e]/70 pl-1">{dict.contact.form.message_label}</label>
                  <div className="relative group">
                    <div className="absolute top-4 left-4 pointer-events-none">
                      <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-gray-400 group-focus-within:text-[#0052ff] transition-colors" />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="block w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-[#0a1b4e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0052ff]/30 focus:border-[#0052ff]/50 transition-all font-medium resize-none"
                      placeholder={dict.contact.form.message_placeholder}
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 82, 255, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#0052ff] to-[#15acd6] px-8 py-4 rounded-xl flex items-center justify-center gap-2 mt-4 text-white font-semibold transition-all shadow-md group"
                >
                  <span>{dict.contact.form.submit}</span>
                  <PaperAirplaneIcon className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </motion.button>


              </form>
            </div>

            {/* Decorative floating dots around the form */}
            <motion.div
              animate={{ y: [-10, 10, -10], opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-gradient-to-tr from-[#0052ff] to-[#15acd6] blur-lg pointer-events-none"
            />
            <motion.div
              animate={{ y: [10, -10, 10], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-gradient-to-tr from-[#8b5cf6] to-[#0052ff] blur-xl pointer-events-none"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
