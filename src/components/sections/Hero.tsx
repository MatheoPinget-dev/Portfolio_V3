import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Linkedin, Github, Mail, Calendar, Award } from 'lucide-react';
import { PROFILE, SOCIALS, CALENDAR_URL } from '../../data/profile';
import PipelineAnimation from '../features/PipelineAnimation';
import { Particles } from '../ui/Particles';
import { BlurFade } from '../ui/blur-fade';
import { useLanguage } from '../../context/LanguageContext';

interface HeroProps {
  onNavigate?: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const content = t.hero;
  const [currentPassion, setCurrentPassion] = useState(0);
  const passions = content.rotating_text || ["Randonneur", "Motard", "Voyageur"]; // Fallback if not yet loaded


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPassion((prev) => (prev + 1) % passions.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [passions.length]);

  const handleCVClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('cv');
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-visible bg-transparent">

      {/* Abstract Background Mesh */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color="#64748b"
          refresh
        />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-primary-500/10 to-transparent opacity-40 blur-3xl rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/10 to-transparent opacity-30 blur-3xl rounded-tr-full" />
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">

        {/* Text Content */}
        <div className="space-y-8 animate-fade-in-up order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-sm font-medium border border-slate-200 dark:border-slate-700 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {content.available}
          </div>

          <div className="space-y-4">
            <BlurFade delay={0.25} inView>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {PROFILE.name}
              </h1>
            </BlurFade>

            <BlurFade delay={0.25 * 2} inView>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-lg md:text-xl font-medium text-slate-600 dark:text-slate-400">
                <span className="text-primary-600 dark:text-primary-400 font-bold">{content.subtitle}</span>
                <span className="hidden md:inline w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>

                <div className="relative h-8 overflow-hidden w-40">
                  {passions.map((passion, idx) => (
                    <span
                      key={passion}
                      className={`absolute left-0 transition-all duration-500 transform
                              ${idx === currentPassion ? 'top-0 opacity-100 translate-y-0' : 'top-8 opacity-0 translate-y-4'}
                              ${idx === (currentPassion - 1 + passions.length) % passions.length ? '-top-8 opacity-0 -translate-y-4' : ''}
                          `}
                    >
                      {passion}
                    </span>
                  ))}
                </div>
              </div>
            </BlurFade>
          </div>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed border-l-4 border-primary-500/30 pl-6">
            {content.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            {/* Primary CTA */}
            <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-semibold hover:opacity-90 transition-all hover:-translate-y-1 shadow-lg shadow-slate-200 dark:shadow-slate-900/20">
              {content.cta_calendar} <Calendar size={18} />
            </a>

            {/* Secondary CTA */}
            <a
              href="#contact"
              onClick={handleContactClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all hover:-translate-y-1"
            >
              {content.cta_contact} <ArrowRight size={18} />
            </a>

            {/* Tertiary CTA */}
            <button onClick={handleCVClick} className="inline-flex items-center gap-2 px-6 py-3 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors">
              {content.cta_cv} <Download size={18} />
            </button>

            {/* Quaternary CTA - Credly */}
            <a href={PROFILE.credlyUrl || "https://www.credly.com/users/matheo-pinget"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 font-semibold transition-colors">
              {content.cta_certs} <Award size={18} />
            </a>
          </div>

          <div className="flex items-center gap-6 text-slate-400 dark:text-slate-500 pt-8">
            <a href={SOCIALS[0].url} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors transform hover:scale-110"><Github size={24} /></a>
            <a href={SOCIALS[1].url} target="_blank" rel="noopener noreferrer" className="hover:text-[#0077b5] transition-colors transform hover:scale-110"><Linkedin size={24} /></a>
            <a href={PROFILE.credlyUrl || "https://www.credly.com/users/matheo-pinget"} target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors transform hover:scale-110"><Award size={24} /></a>
            <a href={`mailto:${PROFILE.email}`} className="hover:text-red-500 transition-colors transform hover:scale-110"><Mail size={24} /></a>
            <span className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></span>
            <span className="text-sm font-mono flex items-center gap-2">
              <span className="text-xl">📍</span>
              {content.location}
            </span>
          </div>
        </div>

        {/* Interactive Pipeline Visual */}
        <div className="hidden lg:block relative order-1 lg:order-2 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <PipelineAnimation />

          {/* Floating Tech Logos - Horizontal Row ABOVE pipeline */}
          <div className="absolute -top-24 left-0 w-full flex justify-between items-center px-2">

            {/* GitLab CI/CD */}
            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 animate-bounce hover:scale-110 transition-transform cursor-pointer" style={{ animationDuration: '3.5s', animationDelay: '0s' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" className="w-8 h-8 opacity-90" alt="GitLab CI/CD" />
            </div>

            {/* Docker */}
            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 animate-bounce hover:scale-110 transition-transform cursor-pointer" style={{ animationDuration: '3s', animationDelay: '0.2s' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" className="w-8 h-8 opacity-90" alt="Docker" />
            </div>

            {/* AWS */}
            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 animate-bounce hover:scale-110 transition-transform cursor-pointer" style={{ animationDuration: '4s', animationDelay: '0.4s' }}>
              <svg viewBox="0 0 16 16" className="w-9 h-9 opacity-90" xmlns="http://www.w3.org/2000/svg">
                <path className="fill-[#232F3E] dark:fill-white transition-colors" d="M4.51 7.687c0 .197.02.357.058.475.042.117.096.245.17.384a.233.233 0 01.037.123c0 .053-.032.107-.1.16l-.336.224a.255.255 0 01-.138.048c-.054 0-.107-.026-.16-.074a1.652 1.652 0 01-.192-.251 4.137 4.137 0 01-.164-.315c-.416.491-.937.737-1.565.737-.447 0-.804-.129-1.064-.385-.261-.256-.394-.598-.394-1.025 0-.454.16-.822.484-1.1.325-.278.756-.416 1.304-.416.18 0 .367.016.564.042.197.027.4.07.612.118v-.39c0-.406-.085-.689-.25-.854-.17-.166-.458-.246-.868-.246-.186 0-.377.022-.574.07a4.23 4.23 0 00-.575.181 1.525 1.525 0 01-.186.07.326.326 0 01-.085.016c-.075 0-.112-.054-.112-.166v-.262c0-.085.01-.15.037-.186a.399.399 0 01.15-.113c.185-.096.409-.176.67-.24.26-.07.537-.101.83-.101.633 0 1.096.144 1.394.432.293.288.442.726.442 1.314v1.73h.01zm-2.161.811c.175 0 .356-.032.548-.096.192-.064.362-.182.505-.342a.848.848 0 00.181-.341c.032-.129.054-.283.054-.465V7.03a4.43 4.43 0 00-.49-.09 3.996 3.996 0 00-.5-.033c-.357 0-.617.07-.793.214-.176.144-.26.347-.26.614 0 .25.063.437.196.566.128.133.314.197.559.197zm4.273.577c-.096 0-.16-.016-.202-.054-.043-.032-.08-.106-.112-.208l-1.25-4.127a.938.938 0 01-.048-.214c0-.085.042-.133.127-.133h.522c.1 0 .17.016.207.053.043.032.075.107.107.208l.894 3.535.83-3.535c.026-.106.058-.176.101-.208a.365.365 0 01.213-.053h.426c.1 0 .17.016.212.053.043.032.08.107.102.208l.84 3.578.92-3.578a.459.459 0 01.107-.208.347.347 0 01.208-.053h.495c.085 0 .133.043.133.133 0 .027-.006.054-.01.086a.768.768 0 01-.038.133l-1.283 4.127c-.031.107-.069.177-.111.209a.34.34 0 01-.203.053h-.457c-.101 0-.17-.016-.213-.053-.043-.038-.08-.107-.101-.214L8.213 5.37l-.82 3.439c-.026.107-.058.176-.1.213-.043.038-.118.054-.213.054h-.458zm6.838.144a3.51 3.51 0 01-.82-.096c-.266-.064-.473-.134-.612-.214-.085-.048-.143-.101-.165-.15a.38.38 0 01-.031-.149v-.272c0-.112.042-.166.122-.166a.3.3 0 01.096.016c.032.011.08.032.133.054.18.08.378.144.585.187.213.042.42.064.633.064.336 0 .596-.059.777-.176a.575.575 0 00.277-.508.52.52 0 00-.144-.373c-.095-.102-.276-.193-.537-.278l-.772-.24c-.388-.123-.676-.305-.851-.545a1.275 1.275 0 01-.266-.774c0-.224.048-.422.143-.593.096-.17.224-.32.384-.438.16-.122.34-.213.553-.277.213-.064.436-.091.67-.091.118 0 .24.005.357.021.122.016.234.038.346.06.106.026.208.052.303.085.096.032.17.064.224.096a.461.461 0 01.16.133.289.289 0 01.047.176v.251c0 .112-.042.171-.122.171a.552.552 0 01-.202-.064 2.428 2.428 0 00-1.022-.208c-.303 0-.543.048-.708.15-.165.1-.25.256-.25.475 0 .149.053.277.16.379.106.101.303.202.585.293l.756.24c.383.123.66.294.825.513.165.219.244.47.244.748 0 .23-.047.437-.138.619a1.435 1.435 0 01-.388.47c-.165.133-.362.23-.591.299-.24.075-.49.112-.761.112z" />
                <path fill="#FF9900" fillRule="evenodd" clipRule="evenodd" d="M14.465 11.813c-1.75 1.297-4.294 1.986-6.481 1.986-3.065 0-5.827-1.137-7.913-3.027-.165-.15-.016-.353.18-.235 2.257 1.313 5.04 2.109 7.92 2.109 1.941 0 4.075-.406 6.039-1.239.293-.133.543.192.255.406z" />
                <path fill="#FF9900" fillRule="evenodd" clipRule="evenodd" d="M15.194 10.98c-.223-.287-1.479-.138-2.048-.069-.17.022-.197-.128-.043-.24 1-.705 2.645-.502 2.836-.267.192.24-.053 1.89-.99 2.68-.143.123-.281.06-.217-.1.212-.53.686-1.72.462-2.003z" />
              </svg>
            </div>

            {/* Terraform */}
            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 animate-bounce hover:scale-110 transition-transform cursor-pointer" style={{ animationDuration: '5s', animationDelay: '0.6s' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" className="w-8 h-8 opacity-90" alt="Terraform" />
            </div>

            {/* Ansible */}
            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 animate-bounce hover:scale-110 transition-transform cursor-pointer" style={{ animationDuration: '4.5s', animationDelay: '0.8s' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg" className="w-8 h-8 opacity-90" alt="Ansible" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
