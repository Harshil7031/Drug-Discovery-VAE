"use client";

import { site } from "@/config/site";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { User, GraduationCap, Award } from "lucide-react";

export function Team() {
  return (
    <section id="team" className="py-20 px-6 max-w-[1200px] mx-auto border-t border-border">
      <Reveal>
        <SectionHeading
          eyebrow="Academic Project"
          title="Engineered for Semester VII GenAI"
          subtitle={`Developed for ${site.course} at ${site.university}. Mentored by ${site.faculty}.`}
          centered
        />
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
        {site.team.map((member, idx) => (
          <Reveal key={idx} delay={idx * 0.1}>
            <div className="glass p-6 sm:p-7 rounded-2xl flex flex-col items-center text-center group hover:border-accent/40 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-surface border border-border-strong flex items-center justify-center text-accent mb-4 group-hover:scale-105 transition-transform">
                <User size={28} />
              </div>
              <h3 className="text-lg font-heading font-bold text-text mb-1">
                {member.name}
              </h3>
              <p className="text-xs font-mono text-accent mb-2">{member.role}</p>
              <div className="flex items-center gap-1.5 text-xs text-text-dim font-mono bg-bg/50 px-3 py-1 rounded-full border border-border">
                <GraduationCap size={13} />
                <span>{member.enrollment}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
