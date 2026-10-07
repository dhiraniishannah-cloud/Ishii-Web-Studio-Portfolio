import { useState, type FormEvent } from 'react';
import { ArrowRight, ArrowUpRight, Check, Menu, X } from 'lucide-react';
import { projects, studioContact, studioName } from './projects';

const phoneForLink = `https://wa.me/92${studioContact.whatsapp.replace(/^0/, '')}`;

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ['Home', '#top'],
    ['Work', '#work'],
    ['Services', '#services'],
    ['About', '#about'],
    ['Contact', '#contact'],
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-[#34473d]/10 bg-[#f5f1e8]/90 backdrop-blur-xl">
      <div className="page-wrap flex h-[76px] items-center justify-between">
        <a href="#top" aria-label={`${studioName} home`} className="group flex items-center gap-3" data-testid="link-home">
          <span className="serif flex h-9 w-9 items-center justify-center border border-[#345046]/60 text-[19px] leading-none text-[#345046]">i.</span>
          <span className="text-[10px] font-semibold tracking-[.16em] text-[#243d36]">{studioName.toUpperCase()}</span>
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-9 md:flex">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="text-[12px] text-[#536057] transition-colors hover:text-[#b77e5e]" data-testid={`link-nav-${label.toLowerCase()}`}>{label}</a>
          ))}
          <a href="#contact" className="group inline-flex items-center gap-2 border border-[#345046] px-4 py-2.5 text-[11px] font-medium tracking-[.04em] text-[#345046] transition-all hover:bg-[#345046] hover:text-[#f5f1e8]" data-testid="link-start-project">
            Let’s Work Together <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </nav>
        <button type="button" className="inline-flex h-10 w-10 items-center justify-center text-[#345046] md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} data-testid="button-menu">
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {open && <nav aria-label="Mobile navigation" className="menu-panel border-t border-[#34473d]/10 bg-[#f5f1e8] px-5 pb-5 pt-2 md:hidden">
        {links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)} className="block border-b border-[#34473d]/10 py-3.5 text-sm text-[#34473d]">{label}</a>)}
        <a href="#contact" onClick={() => setOpen(false)} className="mt-4 flex items-center justify-between bg-[#345046] px-4 py-3 text-sm text-[#f5f1e8]">Let’s Work Together <ArrowUpRight size={15} /></a>
      </nav>}
    </header>
  );
}

function Hero() {
  return <section id="top" className="relative overflow-hidden">
    <div className="page-wrap grid min-h-[660px] items-center gap-10 pb-16 pt-16 md:min-h-[700px] md:grid-cols-[1.04fr_.96fr] md:pb-24 md:pt-20">
      <div className="relative z-10">
        <p className="eyebrow reveal mb-7 flex items-center gap-3 text-[#9c765c]"><span className="h-px w-8 bg-[#bd8c6d]" /> Independent web design studio</p>
        <h1 className="serif reveal reveal-delay max-w-[690px] text-[clamp(3.05rem,6.4vw,5.8rem)] leading-[1.02] tracking-[-.05em] text-[#294239]">
          Modern Websites That Help Small Businesses Stand Out
        </h1>
        <p className="reveal reveal-delay-2 mt-8 max-w-[470px] text-[15px] leading-7 text-[#62685e] md:text-[16px]">
          I design professional websites for growing businesses that want a stronger online presence and more customers.
        </p>
        <div className="reveal reveal-delay-2 mt-9 flex flex-wrap items-center gap-5">
          <a href="#work" className="group inline-flex items-center gap-4 bg-[#345046] px-6 py-4 text-[12px] font-medium tracking-[.04em] text-[#f6f1e8] transition-colors hover:bg-[#263b33]" data-testid="link-hero-work">
            View My Work <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 text-[12px] text-[#586157] hover:text-[#b77e5e]" data-testid="link-hero-contact">Let’s Work Together <ArrowUpRight size={13} /></a>
        </div>
        <div className="mt-14 flex items-center gap-3 text-[11px] text-[#77786c]">
          <span className="h-px w-8 bg-[#bd8c6d]" /> A small independent studio for small businesses
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-[550px] md:ml-auto md:mr-0">
        <div className="absolute -right-7 -top-8 h-36 w-36 rounded-full border border-[#bd8c6d]/35 md:-right-12 md:-top-10 md:h-48 md:w-48" />
        <div className="absolute -bottom-7 -left-7 h-32 w-32 rounded-full border border-[#345046]/20 md:-bottom-10 md:-left-10 md:h-40 md:w-40" />
        <div className="relative aspect-[.97] overflow-hidden bg-[#d9d5c9]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_34%,rgba(230,220,197,.75),transparent_38%),linear-gradient(145deg,#c5c8bb_0%,#e7dfce_48%,#b4b5a4_100%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-[39%] bg-[#a9a895]/65" />
          <div className="absolute bottom-[37%] left-[12%] h-[38%] w-[28%] bg-[#687769] shadow-[18px_15px_0_#9c9a84]">
            <div className="absolute -left-[12%] bottom-0 h-[112%] w-[36%] bg-[#526957]" />
            <div className="absolute right-[-42%] top-[22%] h-[38%] w-[42%] bg-[#e8e0d0]" />
          </div>
          <div className="absolute bottom-[39%] right-[13%] h-[26%] w-[27%] rounded-t-[45%] bg-[#eee8db] shadow-[0_15px_35px_rgba(47,57,48,.12)]">
            <div className="absolute left-[47%] top-[15%] h-[65%] w-px bg-[#d2c6b2]" />
          </div>
          <div className="absolute right-[17%] top-[13%] h-[18%] w-[16%] rounded-[50%] bg-[#f0e6d4]/70 blur-[1px]" />
          <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(90deg,rgba(33,52,44,.09),transparent_40%,rgba(248,240,220,.1))]" />
          <div className="absolute bottom-5 left-5 flex items-center gap-3 bg-[#f5f1e8]/90 px-4 py-3 backdrop-blur-sm md:bottom-7 md:left-7">
            <span className="serif text-[21px] italic text-[#345046]">Made for the feeling.</span>
            <span className="h-7 w-px bg-[#345046]/25" />
            <span className="eyebrow text-[8px] text-[#73786d]">Ishii / 01</span>
          </div>
        </div>
        <div className="absolute -right-2 top-[21%] hidden -rotate-90 text-[9px] tracking-[.24em] text-[#697268] md:block">DESIGN WITH INTENTION · EST. INDEPENDENTLY</div>
      </div>
    </div>
    <div className="page-wrap section-rule flex items-center justify-between py-5 text-[10px] tracking-[.13em] text-[#7a796d]">
      <span>DESIGN · STRATEGY · DEVELOPMENT</span><span className="hidden sm:block">BUILT AROUND YOUR BUSINESS</span><span>01 — 05</span>
    </div>
  </section>;
}

function TrustStrip() {
  const points = ['Modern Design', 'Business-Focused', 'Clear Communication', 'Fast & Professional'];
  return <section aria-label="Studio qualities" className="bg-[#334b41] text-[#f4efe5]">
    <div className="page-wrap grid grid-cols-2 gap-x-6 gap-y-4 py-6 sm:grid-cols-4 sm:gap-4 md:py-7">
      {points.map((point, index) => <div key={point} className="flex items-center gap-3">
        <span className="serif text-[17px] text-[#d5a78a]">0{index + 1}</span>
        <span className="text-[10px] font-medium tracking-[.08em] sm:text-[11px]">{point}</span>
      </div>)}
    </div>
  </section>;
}

function About() {
  return <section id="about" className="page-wrap py-24 md:py-32">
    <div className="grid gap-12 md:grid-cols-[.75fr_1.25fr] md:gap-20">
      <div>
        <p className="eyebrow mb-5 text-[#ad7d5e]">About Ishii Web Studio</p>
        <h2 className="serif max-w-[360px] text-4xl leading-[1.12] tracking-[-.035em] text-[#294239] md:text-[3.4rem]">A personal approach to a stronger online presence.</h2>
      </div>
      <div className="max-w-[620px] pt-1">
        <p className="text-[15px] leading-7 text-[#596258]">I'm a freelance website designer focused on helping small businesses build a professional online presence. I create modern websites that make it easier for customers to discover a business, explore its services and get in touch.</p>
        <p className="mt-5 text-[15px] leading-7 text-[#596258]">Each project begins by understanding your business and the people you want to reach. The design and content structure are then shaped to make your offer clear and your next step easy to find.</p>
        <div className="mt-9 grid gap-5 border-t border-[#34473d]/15 pt-6 sm:grid-cols-3">
          {[
            ['01', 'Start with the why', 'Understand your audience and what your site needs to do.'],
            ['02', 'Shape the story', 'Give your content and identity a clear, considered structure.'],
            ['03', 'Make it real', 'Bring the design to life with the next steps made clear.'],
          ].map(([n, title, copy]) => <div key={n}><span className="eyebrow text-[#b38161]">{n} /</span><h3 className="mt-3 text-[13px] font-semibold text-[#34473d]">{title}</h3><p className="mt-2 text-[12px] leading-5 text-[#77786c]">{copy}</p></div>)}
        </div>
      </div>
    </div>
  </section>;
}

function WhyWorkWithMe() {
  const reasons = [
    ['Designed Around Your Business', 'Your services, priorities and audience guide the structure and visual direction.'],
    ['Clean & Modern Design', 'A considered visual system makes your business feel clear, current and recognisable.'],
    ['Clear Communication', 'You’ll know what we’re working on and what I need from you at each stage.'],
    ['Practical Project Scope', 'We agree on a realistic scope that fits your goals and available content.'],
  ];
  return <section className="bg-[#eae7dc] py-24 md:py-28">
    <div className="page-wrap">
      <div className="grid gap-10 md:grid-cols-[.7fr_1.3fr] md:gap-20">
        <div><p className="eyebrow mb-5 text-[#ad7d5e]">Why work with me</p><h2 className="serif max-w-[340px] text-4xl leading-[1.12] tracking-[-.035em] text-[#294239] md:text-[3.1rem]">A thoughtful fit for your business.</h2></div>
        <div>
          <div className="grid gap-x-8 sm:grid-cols-2">
            {reasons.map(([title, copy], index) => <article key={title} className="border-t border-[#34473d]/20 py-6">
              <div className="flex items-start gap-4"><span className="eyebrow pt-1 text-[#ad7d5e]">0{index + 1}</span><div><h3 className="serif text-[21px] text-[#34473d]">{title}</h3><p className="mt-2 text-[12px] leading-6 text-[#727368]">{copy}</p></div></div>
            </article>)}
          </div>
          <p className="mt-4 max-w-[670px] border-l-2 border-[#bc8b6b] pl-4 text-[12px] leading-6 text-[#727368]">Your website is customised around your business—not copied from a one-size-fits-all layout. We’ll shape its pages, visual style and contact paths around the information and priorities you share.</p>
        </div>
      </div>
    </div>
  </section>;
}

function ProjectArt({ kind, initials, accent }: { kind: string; initials: string; accent: string }) {
  if (kind === 'perfume') return <div className="project-visual luxury-shimmer absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_53%,rgba(216,188,143,.35),transparent_41%)]" />
    <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#201c1b]/85 to-transparent" />
    <div className="absolute left-[13%] top-[14%] h-[74%] w-[74%] border border-[#d5bd97]/25" />
    <div className="absolute left-1/2 top-[19%] h-[56%] w-[29%] -translate-x-1/2 rounded-t-[10px] border border-[#e4d4b7]/65 bg-[linear-gradient(105deg,rgba(212,194,164,.3),rgba(54,43,37,.1)_45%,rgba(226,210,183,.33))] shadow-[0_15px_50px_rgba(0,0,0,.35)]">
      <div className="absolute -top-[18%] left-[35%] h-[20%] w-[30%] border border-[#c9ad81]/70 bg-[#a78b65]" />
      <div className="absolute bottom-0 left-0 right-0 h-[39%] bg-[#b99469]/38" />
      <div className="absolute left-1/2 top-[46%] -translate-x-1/2 whitespace-nowrap text-center text-[#ebdcc2]">
        <span className="serif block text-[clamp(12px,2vw,21px)] tracking-[.22em]">PARFUM</span>
        <span className="mt-2 block text-[6px] tracking-[.32em]">EAU DE PARFUM · 50 ML</span>
      </div>
    </div>
    <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 text-center text-[#e9d8bc]">
      <span className="serif block text-[clamp(17px,2.2vw,27px)] tracking-[.16em]">SCENT, REMEMBERED</span>
      <span className="mt-2 block text-[7px] tracking-[.3em] text-[#d1bd9e]">AN OLFACTORY STUDY</span>
    </div>
  </div>;

  const composition: Record<string, string> = {
    flourish: 'bg-[linear-gradient(135deg,#e8d9d1,#cdaea2_54%,#947b72)]',
    sanam: 'bg-[linear-gradient(135deg,#e2d6c5,#bfaa8f_54%,#827263)]',
    israr: 'bg-[linear-gradient(135deg,#e6dcc8,#c7b58f_54%,#74644c)]',
    kabab: 'bg-[linear-gradient(150deg,#dbc2a7,#b87455_58%,#573c32)]',
  };
  return <div className={`project-visual absolute inset-0 overflow-hidden ${composition[kind] || composition.flourish}`}>
    <div className="absolute inset-0 opacity-70" style={{ background: `radial-gradient(ellipse at 70% 20%, ${accent} 0%, transparent 42%)` }} />
    {kind === 'flourish' && <><div className="absolute inset-[11%] border border-white/55" /><div className="absolute bottom-[11%] left-[15%] h-[56%] w-[36%] bg-[#f2e9df]/75 shadow-[18px_16px_0_rgba(105,81,75,.28)]" /><div className="absolute bottom-[14%] right-[12%] h-[38%] w-[27%] rounded-t-full bg-[#7e6c66]" /><div className="absolute bottom-[32%] right-[20%] h-[14%] w-[12%] rounded-full bg-[#e6d8cf]" /><span className="serif absolute left-[15%] top-[13%] text-2xl text-[#624f49]">a little time for you</span></>}
    {kind === 'sanam' && <><div className="absolute bottom-[12%] left-[16%] h-[57%] w-[31%] bg-[#eee4d5]/85" /><div className="absolute bottom-[12%] right-[14%] h-[67%] w-[34%] bg-[#745f52]" /><div className="absolute bottom-[29%] right-[21%] h-[36%] w-[20%] border border-[#ddc9ad]/60 bg-[#bcaa94]/70" /><div className="absolute left-[13%] top-[15%] h-[1px] w-[74%] bg-white/70" /><span className="serif absolute left-[15%] top-[19%] text-3xl text-[#f8f0e4]">Wear your story.</span></>}
    {kind === 'israr' && <><div className="absolute inset-[12%] border border-[#f5ecd9]/65" /><div className="absolute left-[34%] top-[16%] h-[66%] w-[32%] rounded-[50%] border-[3px] border-[#e5d2a6] shadow-[0_0_0_12px_rgba(242,225,183,.12)]" /><div className="absolute left-[44%] top-[34%] h-[25%] w-[13%] rotate-45 border border-[#f4ead2] bg-[#d4b979]" /><span className="serif absolute bottom-[14%] left-0 right-0 text-center text-2xl tracking-[.18em] text-[#fff5df]">AURUM · JEWELLERY</span></>}
    {kind === 'kabab' && <><div className="absolute bottom-[9%] left-[12%] h-[19%] w-[76%] rounded-[50%] bg-[#dbc8a7] shadow-[0_18px_28px_rgba(45,35,27,.23)]" /><div className="absolute bottom-[19%] left-[37%] h-[42%] w-[27%] rounded-[50%] bg-[#e4d7c3] shadow-[inset_0_0_0_8px_rgba(123,88,59,.13)]" /><div className="absolute bottom-[23%] right-[24%] h-[36%] w-[9%] rounded-t-[45%] bg-[#b95f41]" /><span className="serif absolute left-[12%] top-[13%] text-3xl text-[#fff1dd]">Gather around.</span></>}
    <div className="absolute bottom-5 left-5 border border-white/50 bg-[#f6f1e8]/85 px-3 py-2 text-[9px] tracking-[.2em] text-[#34473d]">{initials}</div>
  </div>;
}

function Portfolio({ onPreview }: { onPreview: (name: string, url: string) => void }) {
  return <section id="work" className="bg-[#eae7dc] py-24 md:py-32">
    <div className="page-wrap">
      <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
        <div><p className="eyebrow mb-5 text-[#ad7d5e]">Selected explorations / 01—05</p><h2 className="serif text-4xl tracking-[-.035em] text-[#294239] md:text-[3.5rem]">A few ideas, made visible.</h2></div>
        <p className="max-w-[320px] text-[13px] leading-6 text-[#727368]">Five independent website concepts, each exploring a different kind of business and the feeling its online home might hold.</p>
      </div>
      <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => <article key={project.name} className={`project-card group ${project.visual === 'perfume' ? 'sm:col-span-2 lg:col-span-1' : ''}`} data-testid={`card-project-${index + 1}`}>
          <button type="button" onClick={() => onPreview(project.name, project.url)} className={`relative block w-full overflow-hidden text-left ${project.visual === 'perfume' ? 'aspect-[1.24]' : 'aspect-[1.29]'}`} aria-label={`View ${project.name} website concept`} data-testid={`button-preview-${index + 1}`}>
            {project.image
              ? <img src={project.image} alt={`${project.name} website concept preview`} className="absolute inset-0 h-full w-full object-cover" />
              : <ProjectArt kind={project.visual} initials={project.initials} accent={project.accent} />}
            <span className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/55 bg-[#f5f1e8]/80 text-[#34473d] transition-transform group-hover:rotate-45 ${project.visual === 'perfume' ? 'text-[#684e39]' : ''}`}><ArrowUpRight size={15} /></span>
          </button>
          <div className="flex items-start justify-between gap-3 pt-5">
            <div><p className="eyebrow text-[9px] text-[#a2795d]">{project.category}</p><h3 className={`serif mt-2 text-[23px] leading-tight text-[#294239] ${project.visual === 'perfume' ? 'tracking-[-.02em]' : ''}`}>{project.name}</h3></div>
            <span className="mt-1 text-[10px] text-[#939184]">0{index + 1}</span>
          </div>
          <p className="mt-3 max-w-[370px] text-[12px] leading-[1.75] text-[#6f7166]">{project.description}</p>
          <button type="button" onClick={() => onPreview(project.name, project.url)} className={`mt-4 inline-flex items-center gap-2 border-b border-[#345046]/40 pb-1 text-[11px] font-medium text-[#345046] transition-colors hover:border-[#b77e5e] hover:text-[#a26e50]`} data-testid={`button-view-${index + 1}`}>
            View Website <ArrowUpRight size={12} />
          </button>
        </article>)}
      </div>
      <div className="mt-14 border-t border-[#34473d]/15 pt-5">
        <p className="max-w-[810px] text-[10px] leading-5 text-[#818175]">These are independent design concepts, not commissioned client projects. They are based on limited publicly available information from Instagram or web search; some details may be missing. They do not imply affiliation, commission or endorsement by any business or owner.</p>
      </div>
    </div>
  </section>;
}

function Services() {
  const offerings = [
    ['01', 'Business Websites', 'A clear, professional website that introduces your business, explains your services and helps customers take the next step.'],
    ['02', 'Website Design', 'A custom visual direction and page layouts shaped around your business, audience and content.'],
    ['03', 'WhatsApp & Contact Integration', 'Clear enquiry paths using your supplied WhatsApp number, email address and contact information.'],
    ['04', 'Website Updates & Maintenance', 'Practical updates to existing pages and content, scoped to what your website needs.'],
  ];
  return <section id="services" className="page-wrap py-24 md:py-32">
    <div>
      <div className="mb-10 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end">
        <div><p className="eyebrow mb-5 text-[#ad7d5e]">Ways we can work together</p><h2 className="serif max-w-[600px] text-4xl leading-[1.12] tracking-[-.035em] text-[#294239] md:text-[3.2rem]">The right shape for your next step.</h2></div>
        <p className="max-w-[340px] text-[13px] leading-6 text-[#727368]">Every project is different. We’ll talk through the brief and find a scope that makes sense for your business.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {offerings.map(([number, title, copy]) => <article key={number} className="border border-[#34473d]/15 bg-[#eae7dc]/65 p-6 md:p-8">
          <div className="flex items-center justify-between"><span className="eyebrow text-[#af8061]">{number} / SERVICE</span><span className="h-8 w-8 rounded-full border border-[#345046]/25" aria-hidden="true" /></div>
          <h3 className="serif mt-8 text-[25px] leading-tight text-[#34473d]">{title}</h3>
          <p className="mt-3 max-w-[440px] text-[12px] leading-6 text-[#727368]">{copy}</p>
        </article>)}
      </div>
    </div>
  </section>;
}

function Process() {
  const stages = [
    ['01 / Tell Me About Your Business', 'We start with your business, the people you want to reach and what the website needs to communicate.'],
    ['02 / Choose Your Website Style', 'We discuss a visual direction and agree on a practical scope for your website.'],
    ['03 / I Build & Refine Your Website', 'I develop the agreed design, then check the pages and details against the project scope.'],
    ['04 / Launch Your Website', 'Once the work is ready and your content is in place, I help prepare the site for launch.'],
  ];
  return <section className="bg-[#334b41] py-24 text-[#f4efe5] md:py-28">
    <div className="page-wrap">
      <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-20">
        <div><p className="eyebrow mb-5 text-[#d5a78a]">A clear way forward</p><h2 className="serif max-w-[370px] text-4xl leading-[1.12] tracking-[-.035em] md:text-[3.3rem]">Four steps from idea to launch.</h2><p className="mt-6 max-w-[330px] text-[13px] leading-6 text-[#d0d3c8]">A collaborative process with room for the details—and a shared understanding of what happens next.</p></div>
        <div className="border-t border-[#f4efe5]/20">
          {stages.map(([label, copy]) => <div key={label} className="grid gap-3 border-b border-[#f4efe5]/20 py-6 sm:grid-cols-[190px_1fr] sm:gap-8 md:py-8"><h3 className="eyebrow pt-1 text-[9px] text-[#d5a78a]">{label}</h3><p className="max-w-[470px] text-[13px] leading-6 text-[#e2e1d7]">{copy}</p></div>)}
        </div>
      </div>
    </div>
  </section>;
}

function FinalCTA() {
  return <section className="relative overflow-hidden bg-[#eae7dc] py-20 md:py-28">
    <div className="page-wrap relative border-y border-[#34473d]/20 py-12 md:py-16">
      <span className="absolute right-0 top-6 hidden h-28 w-28 rounded-full border border-[#bd8c6d]/35 md:block" aria-hidden="true" />
      <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="eyebrow mb-5 text-[#ad7d5e]">Your next chapter starts here</p>
          <h2 className="serif max-w-[760px] text-[clamp(2.3rem,5.5vw,4.7rem)] leading-[1.04] tracking-[-.04em] text-[#294239]">Ready to Give Your Business a Better Online Presence?</h2>
          <p className="mt-5 max-w-[570px] text-[14px] leading-7 text-[#727368]">A professional website can help people discover your business, understand what you offer and get in touch. Let’s talk about what would work for you.</p>
        </div>
        <div className="flex flex-wrap gap-3 md:flex-col">
          <a href="#contact" className="group inline-flex items-center justify-between gap-7 bg-[#345046] px-5 py-4 text-[11px] font-medium text-[#f5f1e8] transition-colors hover:bg-[#263b33]" data-testid="link-final-start">Start a Project <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
          <a href="#work" className="inline-flex items-center justify-between gap-7 border border-[#345046]/40 px-5 py-4 text-[11px] font-medium text-[#345046] transition-colors hover:border-[#345046] hover:bg-[#345046]/5" data-testid="link-final-work">View My Work <ArrowRight size={14} /></a>
        </div>
      </div>
    </div>
  </section>;
}

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [business, setBusiness] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = `Hello ${studioName},\n\nI'm ${name} (${email}).${business ? ` I run ${business}.` : ''}\n\n${message}\n\nI'd love to talk about a website project.`;
    window.location.href = `mailto:${studioContact.email}?subject=${encodeURIComponent(`Website enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return <section id="contact" className="page-wrap py-24 md:py-32">
    <div className="grid gap-12 md:grid-cols-[.85fr_1.15fr] md:gap-20">
      <div>
        <p className="eyebrow mb-5 text-[#ad7d5e]">A good place to begin</p>
        <h2 className="serif max-w-[410px] text-4xl leading-[1.1] tracking-[-.035em] text-[#294239] md:text-[3.55rem]">Tell me a little about what you have in mind.</h2>
        <p className="mt-6 max-w-[350px] text-[13px] leading-6 text-[#727368]">A few details are plenty to start a conversation. You can also reach me directly by WhatsApp or email.</p>
        <div className="mt-9 space-y-4">
          <a href={phoneForLink} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-t border-[#34473d]/20 py-4 text-[12px] text-[#34473d]" data-testid="link-whatsapp"><span>WhatsApp</span><span className="inline-flex items-center gap-2 text-[#77786c] transition-colors group-hover:text-[#ad7d5e]">{studioContact.whatsapp}<ArrowUpRight size={13} /></span></a>
          <a href={`mailto:${studioContact.email}`} className="group flex items-center justify-between border-t border-[#34473d]/20 py-4 text-[12px] text-[#34473d]" data-testid="link-email"><span>Email</span><span className="inline-flex items-center gap-2 text-[#77786c] transition-colors group-hover:text-[#ad7d5e]">{studioContact.email}<ArrowUpRight size={13} /></span></a>
        </div>
      </div>
      <form onSubmit={submit} className="bg-[#eae7dc] p-6 md:p-9" data-testid="form-contact">
        <div className="mb-7 flex items-center justify-between"><span className="eyebrow text-[9px] text-[#ad7d5e]">A note to the studio</span><span className="text-[10px] text-[#89897c]">Fields marked * are required</span></div>
        <label className="mb-5 block"><span className="mb-2 block text-[11px] text-[#4f5b51]">Name *</span><input required value={name} onChange={e => setName(e.target.value)} className="w-full border-b border-[#8a9283]/60 bg-transparent px-0 py-3 text-[13px] text-[#34473d] outline-none placeholder:text-[#aaa99d] focus:border-[#345046]" placeholder="Your name" data-testid="input-name" /></label>
        <label className="mb-5 block"><span className="mb-2 block text-[11px] text-[#4f5b51]">Email *</span><input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border-b border-[#8a9283]/60 bg-transparent px-0 py-3 text-[13px] text-[#34473d] outline-none placeholder:text-[#aaa99d] focus:border-[#345046]" placeholder="you@example.com" data-testid="input-email" /></label>
        <label className="mb-5 block"><span className="mb-2 block text-[11px] text-[#4f5b51]">Business Name</span><input value={business} onChange={e => setBusiness(e.target.value)} className="w-full border-b border-[#8a9283]/60 bg-transparent px-0 py-3 text-[13px] text-[#34473d] outline-none placeholder:text-[#aaa99d] focus:border-[#345046]" placeholder="Your business" data-testid="input-business" /></label>
        <label className="mb-7 block"><span className="mb-2 block text-[11px] text-[#4f5b51]">Message *</span><textarea required rows={4} value={message} onChange={e => setMessage(e.target.value)} className="w-full resize-y border-b border-[#8a9283]/60 bg-transparent px-0 py-3 text-[13px] leading-6 text-[#34473d] outline-none placeholder:text-[#aaa99d] focus:border-[#345046]" placeholder="A little about your project, and what you hope your website could do." data-testid="input-message" /></label>
        <button type="submit" className="group flex w-full items-center justify-between bg-[#345046] px-5 py-4 text-left text-[12px] font-medium text-[#f5f1e8] transition-colors hover:bg-[#263b33]" data-testid="button-send-message">
          <span>{sent ? 'Open your email to finish sending' : 'Prepare an email'}</span>{sent ? <Check size={16} /> : <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />}
        </button>
        <p className="mt-3 text-[10px] leading-5 text-[#858579]">This opens your email app with your message prepared. Nothing is stored or sent from this website.</p>
      </form>
    </div>
  </section>;
}

function Footer() {
  const links = [['Home', '#top'], ['Work', '#work'], ['Services', '#services'], ['About', '#about'], ['Contact', '#contact']];
  return <footer className="bg-[#263b33] py-8 text-[#f1ede4]">
    <div className="page-wrap flex flex-col gap-7">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <a href="#top" className="flex items-center gap-3" data-testid="link-footer-home"><span className="serif flex h-8 w-8 items-center justify-center border border-[#e6d9c3]/55 text-[17px]">i.</span><span className="text-[9px] tracking-[.18em]">{studioName.toUpperCase()}</span></a>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] text-[#d1d4c9]">
          {links.map(([label, href]) => <a key={label} href={href} className="transition-colors hover:text-[#dfc2a9]" data-testid={`link-footer-${label.toLowerCase()}`}>{label}</a>)}
        </nav>
      </div>
      <div className="flex flex-col gap-4 border-t border-white/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] text-[#dfc2a9]">
          <a href={phoneForLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white" data-testid="link-footer-whatsapp">WhatsApp · {studioContact.whatsapp}<ArrowUpRight size={11} /></a>
          <a href={`mailto:${studioContact.email}`} className="inline-flex items-center gap-2 hover:text-white" data-testid="link-footer-email">{studioContact.email}<ArrowUpRight size={11} /></a>
        </div>
        <p className="text-[10px] text-[#c4c9bc]">© {new Date().getFullYear()} {studioName}</p>
      </div>
    </div>
  </footer>;
}

function App() {
  const [preview, setPreview] = useState<{ name: string; url: string } | null>(null);
  const showPreview = (name: string, url: string) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
    else setPreview({ name, url });
  };
  return <div className="min-h-[100dvh] overflow-hidden">
    <div className="grain" aria-hidden="true" />
    <Header />
    <main><Hero /><TrustStrip /><About /><Portfolio onPreview={showPreview} /><WhyWorkWithMe /><Services /><Process /><FinalCTA /><Contact /></main>
    <Footer />
    {preview && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#20362e]/55 p-5 backdrop-blur-sm" role="presentation" onClick={() => setPreview(null)}>
      <section role="dialog" aria-modal="true" aria-labelledby="preview-title" className="relative w-full max-w-md border border-[#d9cbb6] bg-[#f5f1e8] p-7 shadow-2xl md:p-9" onClick={event => event.stopPropagation()}>
        <button type="button" onClick={() => setPreview(null)} aria-label="Close project note" className="absolute right-5 top-5 p-1 text-[#596258] hover:text-[#b77e5e]" data-testid="button-close-preview"><X size={18} /></button>
        <p className="eyebrow mb-4 text-[#ad7d5e]">Independent concept</p>
        <h2 id="preview-title" className="serif pr-8 text-3xl text-[#294239]">{preview.name}</h2>
        <p className="mt-4 text-[13px] leading-6 text-[#727368]">A live preview link has not been supplied for this concept. Project links can be added in the portfolio configuration when available.</p>
        <button type="button" onClick={() => setPreview(null)} className="mt-7 inline-flex items-center gap-2 bg-[#345046] px-5 py-3 text-[11px] text-[#f5f1e8] hover:bg-[#263b33]" data-testid="button-dismiss-preview">Close <X size={13} /></button>
      </section>
    </div>}
  </div>;
}

export default App;
