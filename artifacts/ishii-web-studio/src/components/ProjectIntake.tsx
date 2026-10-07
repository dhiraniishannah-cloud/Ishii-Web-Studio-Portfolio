import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import { studioContact, studioName } from '../projects';

const PROJECT_INTAKE_ENDPOINT = 'https://formspree.io/f/moejelpy';
const whatsappUrl = `https://wa.me/92${studioContact.whatsapp.replace(/^0/, '')}?text=${encodeURIComponent(`Hello ${studioName}, I have submitted the project intake form and would like to send my project materials.`)}`;
const materialsEmailUrl = `mailto:${studioContact.email}?subject=${encodeURIComponent('Website project materials')}&body=${encodeURIComponent(`Hello ${studioName},\n\nI have submitted the project intake form and would like to send my project materials.`)}`;

const steps = [
  'Tell Me About Your Business',
  'Share Your Content',
  'Tell Me What You Need',
  'I’ll Review Your Project',
  'We’ll Discuss the Website',
];

const pageOptions = ['Home', 'About', 'Services', 'Products', 'Menu', 'Gallery', 'Contact', 'FAQ', 'Blog', 'Booking', 'Other'];
const featureOptions = ['WhatsApp button', 'Contact form', 'Booking/appointment form', 'Google Maps', 'Instagram integration', 'Product catalogue', 'Shopping cart', 'Online payments', 'Customer orders', 'Admin panel', 'Blog', 'Newsletter', 'Other'];
const industries = ['Clothing', 'Jewellery', 'Restaurant', 'Beauty Salon', 'Perfume', 'Real Estate', 'Other'];

type IntakeForm = {
  name: string;
  business: string;
  email: string;
  phone: string;
  country: string;
  preferredContact: string;
  industry: string;
  description: string;
  offer: string;
  operatingTime: string;
  websiteType: string;
  pages: string[];
  otherPages: string;
  hasWebsite: string;
  currentWebsite: string;
  goal: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  googleBusiness: string;
  otherLinks: string;
  hasLogo: string;
  brandColors: string;
  style: string;
  features: string[];
  otherFeatures: string;
  launchDate: string;
  hasDomain: string;
  hasHosting: string;
  budget: string;
  notes: string;
  confirmation: boolean;
};

const initialForm: IntakeForm = {
  name: '', business: '', email: '', phone: '', country: '', preferredContact: '', industry: '',
  description: '', offer: '', operatingTime: '', websiteType: '', pages: [], otherPages: '',
  hasWebsite: '', currentWebsite: '', goal: '', instagram: '', facebook: '', tiktok: '',
  googleBusiness: '', otherLinks: '', hasLogo: '', brandColors: '', style: '',
  features: [], otherFeatures: '', launchDate: '', hasDomain: '', hasHosting: '',
  budget: '', notes: '', confirmation: false,
};

type FieldErrors = Partial<Record<keyof IntakeForm, string>>;

function FieldLabel({ children, required = false }: { children: ReactNode; required?: boolean }) {
  return <span className="mb-2 block text-[12px] font-medium text-[#405348]">{children}{required && <span className="ml-1 text-[#ad7657]" aria-hidden="true">*</span>}</span>;
}

const inputClass = 'w-full border border-[#536b5c]/20 bg-[#f8f5ee]/70 px-4 py-3 text-[13px] text-[#34473d] outline-none transition-colors placeholder:text-[#98978b] focus:border-[#345046] focus:ring-2 focus:ring-[#345046]/10';
const labelClass = 'block';
const selectClass = `${inputClass} appearance-auto`;

function ChoiceGroup({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-[12px] font-medium text-[#405348]">
        {label}{required && <span className="ml-1 text-[#ad7657]" aria-hidden="true">*</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className={`cursor-pointer border px-3 py-2 text-[11px] transition-colors ${value === option ? 'border-[#345046] bg-[#345046]/[.07] text-[#34473d]' : 'border-[#536b5c]/20 bg-[#f8f5ee]/60 text-[#687166] hover:border-[#345046]/50'}`}>
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              required={required}
              className="sr-only"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function ProjectIntake() {
  const [form, setForm] = useState<IntakeForm>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submissionInFlight = useRef(false);

  useEffect(() => {
    if (window.location.hash !== '#project-intake') return;
    const frame = requestAnimationFrame(() => {
      document.getElementById('project-intake')?.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const update = <K extends keyof IntakeForm>(key: K, value: IntakeForm[K]) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  };

  const toggleChoice = (key: 'pages' | 'features', value: string) => {
    setForm((previous) => ({
      ...previous,
      [key]: previous[key].includes(value) ? previous[key].filter((choice) => choice !== value) : [...previous[key], value],
    }));
  };

  const validate = () => {
    const nextErrors: FieldErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!form.business.trim()) nextErrors.business = 'Please enter your business or brand name.';
    if (!form.email.trim()) nextErrors.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (!form.phone.trim()) nextErrors.phone = 'Please enter a WhatsApp or phone number.';
    if (!form.industry) nextErrors.industry = 'Please choose an industry.';
    if (!form.description.trim()) nextErrors.description = 'Please tell me about your business.';
    if (!form.confirmation) nextErrors.confirmation = 'Please confirm the information before submitting.';
    const urlFields: (keyof IntakeForm)[] = ['currentWebsite', 'instagram', 'facebook', 'tiktok', 'googleBusiness'];
    for (const field of urlFields) {
      const value = form[field];
      if (typeof value !== 'string' || !value.trim()) continue;
      try {
        const parsed = new URL(value.trim());
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') throw new Error('Invalid protocol');
      } catch {
        nextErrors[field] = 'Enter a full URL beginning with https://, or leave this field blank.';
      }
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('');
    if (!validate()) {
      event.currentTarget.reportValidity();
      const formElement = event.currentTarget;
      requestAnimationFrame(() => {
        const firstInvalid = formElement.querySelector('[aria-invalid="true"]') as HTMLElement | null;
        firstInvalid?.focus();
      });
      return;
    }
    if (submissionInFlight.current) return;
    submissionInFlight.current = true;
    setIsSubmitting(true);
    const body = new URLSearchParams();
    for (const [key, value] of Object.entries(form)) {
      if (Array.isArray(value)) {
        value.forEach((choice: string) => body.append(key, choice));
      } else {
        body.append(key, typeof value === 'boolean' ? (value ? 'yes' : 'no') : value);
      }
    }
    body.append('_subject', `New website project inquiry — ${form.business.trim()}`);
    const request = new XMLHttpRequest();
    const finishRequest = () => {
      submissionInFlight.current = false;
      setIsSubmitting(false);
    };
    try {
      request.open('POST', PROJECT_INTAKE_ENDPOINT);
      request.setRequestHeader('Accept', 'application/json');
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
      request.addEventListener('load', () => {
        finishRequest();
        if (request.status >= 200 && request.status < 300) {
          setStatus('Thank you! Your project details have been received. I’ll review your information and contact you shortly to discuss your website.');
          setForm(initialForm);
          setErrors({});
          return;
        }
        let details = '';
        try {
          const response = JSON.parse(request.responseText) as { error?: string; errors?: Array<{ message?: string }> };
          details = response.errors?.map((item) => item.message).filter(Boolean).join(' ') || response.error || '';
        } catch {
          // Keep the HTTP status as the actionable fallback for non-JSON responses.
        }
        setStatus(`Your project details could not be submitted${details ? `: ${details}` : ` (service returned ${request.status}${request.statusText ? ` ${request.statusText}` : ''})`}. Your information is still here; please try again.`);
      });
      request.addEventListener('error', () => {
        finishRequest();
        setStatus('A network error prevented your brief from being sent. Your information is still here; check your connection and try again.');
      });
      request.addEventListener('timeout', () => {
        finishRequest();
        setStatus('The submission timed out. Your information is still here; please try again.');
      });
      request.timeout = 29000;
      request.send(body.toString());
    } catch {
      finishRequest();
      setStatus('The submission service address is not valid. Your information is still here; please contact the studio while the endpoint is checked.');
    }
  };

  const checkbox = (group: 'pages' | 'features', value: string) => (
    <label key={value} className="flex cursor-pointer items-start gap-3 border border-[#536b5c]/15 bg-[#f8f5ee]/45 px-3.5 py-3 text-[12px] leading-5 text-[#566258] transition-colors hover:border-[#345046]/45 has-[:checked]:border-[#345046]/50 has-[:checked]:bg-[#345046]/[.06]">
      <input type="checkbox" name={group} value={value} checked={form[group].includes(value)} onChange={() => toggleChoice(group, value)} className="mt-1 h-4 w-4 accent-[#345046]" />
      <span>{value}</span>
    </label>
  );

  return (
    <section id="project-intake" className="bg-[#f5f1e8] py-20 text-[#34473d] md:py-28">
      <div className="mx-auto w-[min(100%-40px,1040px)] md:w-[min(100%-64px,1040px)]">
        <div className="mx-auto mb-12 max-w-[760px] text-center md:mb-16">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[.2em] text-[#ad7d5e]">A considered start</p>
          <h2 className="serif text-[clamp(2.35rem,5vw,4rem)] leading-[1.08] tracking-[-.04em] text-[#294239]">Ready to Build Your Website?</h2>
          <p className="mx-auto mt-6 max-w-[710px] text-[14px] leading-7 text-[#697066]">
            Liked one of my website concepts? Tell me about your business, website goals and requirements. After submitting this form, you can send your logo and other website materials through WhatsApp or email.
          </p>
        </div>

        <div className="mb-10 border-y border-[#34473d]/15 py-6 md:mb-12">
          <ol aria-label="Project process" className="grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
            {steps.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span className="serif text-[18px] leading-none text-[#b17d5e]">0{index + 1}</span>
                <span className="text-[11px] leading-[1.5] text-[#5f695f]">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <form method="POST" action={PROJECT_INTAKE_ENDPOINT} onSubmit={submit} noValidate className="space-y-6" data-testid="form-project-intake">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#34473d]/15 pb-3">
            <p className="text-[11px] text-[#7a796d]">Fields marked <span className="text-[#ad7d5e]">*</span> are required</p>
            <span className="eyebrow text-[8px] text-[#a2795d]">Project intake / Ishii Web Studio</span>
          </div>

          <fieldset className="border border-[#34473d]/15 bg-[#eae7dc]/55 p-5 md:p-8">
            <legend className="px-2"><span className="serif text-[23px] text-[#34473d]">01 / Your information</span></legend>
            <p className="mb-6 mt-1 text-[12px] leading-5 text-[#77786c]">A few ways to reach you, and the business this project is for.</p>
            <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
              <label className={labelClass}><FieldLabel required>Full name</FieldLabel><input name="name" required autoComplete="name" value={form.name} onChange={(event) => update('name', event.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'intake-name-error' : undefined} className={inputClass} placeholder="Your full name" />{errors.name && <span id="intake-name-error" className="mt-1 block text-[11px] text-[#9b4f3f]" role="alert">{errors.name}</span>}</label>
              <label className={labelClass}><FieldLabel required>Business / brand name</FieldLabel><input name="business" required autoComplete="organization" value={form.business} onChange={(event) => update('business', event.target.value)} aria-invalid={!!errors.business} aria-describedby={errors.business ? 'intake-business-error' : undefined} className={inputClass} placeholder="Your business name" />{errors.business && <span id="intake-business-error" className="mt-1 block text-[11px] text-[#9b4f3f]" role="alert">{errors.business}</span>}</label>
              <label className={labelClass}><FieldLabel required>Email address</FieldLabel><input name="email" required type="email" autoComplete="email" value={form.email} onChange={(event) => update('email', event.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'intake-email-error' : undefined} className={inputClass} placeholder="you@example.com" />{errors.email && <span id="intake-email-error" className="mt-1 block text-[11px] text-[#9b4f3f]" role="alert">{errors.email}</span>}</label>
              <label className={labelClass}><FieldLabel required>WhatsApp / phone number</FieldLabel><input name="phone" required type="tel" autoComplete="tel" value={form.phone} onChange={(event) => update('phone', event.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'intake-phone-error' : undefined} className={inputClass} placeholder="+ country code and number" />{errors.phone && <span id="intake-phone-error" className="mt-1 block text-[11px] text-[#9b4f3f]" role="alert">{errors.phone}</span>}</label>
              <label className={labelClass}><FieldLabel>Country</FieldLabel><input name="country" autoComplete="country-name" value={form.country} onChange={(event) => update('country', event.target.value)} className={inputClass} placeholder="Your country" /></label>
              <div className="sm:col-span-2"><ChoiceGroup label="Preferred contact method" name="preferredContact" value={form.preferredContact} onChange={(value) => update('preferredContact', value)} options={['WhatsApp', 'Email', 'Phone Call']} /></div>
            </div>
          </fieldset>

          <fieldset className="border border-[#34473d]/15 bg-[#eae7dc]/55 p-5 md:p-8">
            <legend className="px-2"><span className="serif text-[23px] text-[#34473d]">02 / About your business</span></legend>
            <p className="mb-6 mt-1 text-[12px] leading-5 text-[#77786c]">Tell me what your business does and what customers should know.</p>
            <div className="space-y-5">
              <label className={labelClass}><FieldLabel required>Business type / industry</FieldLabel><select name="industry" required value={form.industry} onChange={(event) => update('industry', event.target.value)} aria-invalid={!!errors.industry} aria-describedby={errors.industry ? 'intake-industry-error' : undefined} className={selectClass}><option value="">Choose an industry</option>{industries.map((industry) => <option key={industry} value={industry}>{industry}</option>)}</select>{errors.industry && <span id="intake-industry-error" className="mt-1 block text-[11px] text-[#9b4f3f]" role="alert">{errors.industry}</span>}</label>
              <label className={labelClass}><FieldLabel required>Tell me about your business</FieldLabel><textarea name="description" required rows={5} value={form.description} onChange={(event) => update('description', event.target.value)} aria-invalid={!!errors.description} aria-describedby={errors.description ? 'intake-description-error' : 'intake-description-hint'} className={`${inputClass} resize-y`} placeholder="Who do you serve, and what should people understand about your business?" />{errors.description && <span id="intake-description-error" className="mt-1 block text-[11px] text-[#9b4f3f]" role="alert">{errors.description}</span>}<span id="intake-description-hint" className="mt-2 block text-[11px] leading-5 text-[#89897c]">Include the services, products, location or details customers most often ask about.</span></label>
              <label className={labelClass}><FieldLabel>What does your business offer?</FieldLabel><textarea name="offer" rows={4} value={form.offer} onChange={(event) => update('offer', event.target.value)} className={`${inputClass} resize-y`} placeholder="Describe your products, services, menu, packages or other offers." /></label>
              <label className={labelClass}><FieldLabel>How long has your business been operating?</FieldLabel><input name="operatingTime" value={form.operatingTime} onChange={(event) => update('operatingTime', event.target.value)} className={inputClass} placeholder="For example: 3 years, or just getting started" /></label>
            </div>
          </fieldset>

          <fieldset className="border border-[#34473d]/15 bg-[#eae7dc]/55 p-5 md:p-8">
            <legend className="px-2"><span className="serif text-[23px] text-[#34473d]">03 / Your website</span></legend>
            <p className="mb-6 mt-1 text-[12px] leading-5 text-[#77786c]">Choose a starting point. You can select more than one page.</p>
            <div className="space-y-5">
              <label className={labelClass}><FieldLabel>What type of website do you need?</FieldLabel><select name="websiteType" value={form.websiteType} onChange={(event) => update('websiteType', event.target.value)} className={selectClass}><option value="">Choose a website type</option>{['Business Website', 'Product Catalogue', 'Restaurant Website', 'Beauty Salon Website', 'Portfolio Website', 'E-commerce Website', 'Landing Page', 'Other'].map((item) => <option key={item}>{item}</option>)}</select></label>
              <div>
                <FieldLabel>What pages do you need?</FieldLabel>
                <p className="mb-3 text-[11px] text-[#89897c]">Choose all that apply.</p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{pageOptions.map((option) => checkbox('pages', option))}</div>
                {form.pages.includes('Other') && <label className="mt-3 block"><FieldLabel>Other page</FieldLabel><input name="otherPages" value={form.otherPages} onChange={(event) => update('otherPages', event.target.value)} className={inputClass} placeholder="Name any other page" /></label>}
              </div>
              <ChoiceGroup label="Do you already have a website?" name="hasWebsite" value={form.hasWebsite} onChange={(value) => update('hasWebsite', value)} options={['Yes', 'No']} />
              <label className={labelClass}><FieldLabel>Existing website URL</FieldLabel><input name="currentWebsite" type="url" value={form.currentWebsite} onChange={(event) => update('currentWebsite', event.target.value)} aria-invalid={!!errors.currentWebsite} aria-describedby={errors.currentWebsite ? 'intake-currentWebsite-error' : undefined} className={inputClass} placeholder="https://example.com" />{errors.currentWebsite && <span id="intake-currentWebsite-error" role="alert" className="mt-1 block text-[11px] text-[#9b4f3f]">{errors.currentWebsite}</span>}</label>
              <label className={labelClass}><FieldLabel>What is the main goal of your website?</FieldLabel><select name="goal" value={form.goal} onChange={(event) => update('goal', event.target.value)} className={selectClass}><option value="">Choose a main goal</option>{['Get more customers', 'Showcase products/services', 'Receive WhatsApp enquiries', 'Receive bookings', 'Sell products online', 'Build brand credibility', 'Other'].map((item) => <option key={item}>{item}</option>)}</select></label>
            </div>
          </fieldset>

          <fieldset className="border border-[#34473d]/15 bg-[#eae7dc]/55 p-5 md:p-8">
            <legend className="px-2"><span className="serif text-[23px] text-[#34473d]">04 / Social media & online presence</span></legend>
            <p className="mb-6 mt-1 text-[12px] leading-5 text-[#77786c]">Share any public links that could help me understand your business. All are optional.</p>
            <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {([
                ['Instagram URL', 'instagram', 'https://instagram.com/yourbusiness'],
                ['Facebook URL', 'facebook', 'https://facebook.com/yourbusiness'],
                ['TikTok URL', 'tiktok', 'https://tiktok.com/@yourbusiness'],
                ['Google Business Profile URL', 'googleBusiness', 'https://maps.google.com/...'],
                ['Other relevant links', 'otherLinks', 'Website, marketplace or other links'],
              ] as const).map(([label, key, placeholder]) => (
                <label key={key} className={`${labelClass} ${key === 'otherLinks' ? 'sm:col-span-2' : ''}`}>
                  <FieldLabel>{label}</FieldLabel>
                  {key === 'otherLinks'
                    ? <textarea name={key} rows={2} value={form[key]} onChange={(event) => update(key, event.target.value)} className={`${inputClass} resize-y`} placeholder="Share one link per line" />
                    : <input name={key} type="url" value={form[key]} onChange={(event) => update(key, event.target.value)} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `intake-${key}-error` : undefined} className={inputClass} placeholder={placeholder} />}
                  {errors[key] && <span id={`intake-${key}-error`} role="alert" className="mt-1 block text-[11px] text-[#9b4f3f]">{errors[key]}</span>}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="border border-[#34473d]/15 bg-[#eae7dc]/55 p-5 md:p-8">
            <legend className="px-2"><span className="serif text-[23px] text-[#34473d]">05 / Brand information</span></legend>
            <p className="mb-6 mt-1 text-[12px] leading-5 text-[#77786c]">A logo, brand palette or style references can help guide the design.</p>
            <div className="space-y-5">
              <ChoiceGroup label="Do you already have a logo?" name="hasLogo" value={form.hasLogo} onChange={(value) => update('hasLogo', value)} options={['Yes', 'No']} />
              <label className={labelClass}><FieldLabel>Brand colors</FieldLabel><input name="brandColors" value={form.brandColors} onChange={(event) => update('brandColors', event.target.value)} className={inputClass} placeholder="For example: black and gold, pink and white" /></label>
              <label className={labelClass}><FieldLabel>Preferred website style</FieldLabel><select name="style" value={form.style} onChange={(event) => update('style', event.target.value)} className={selectClass}><option value="">Choose a style</option>{['Luxury', 'Modern', 'Minimal', 'Elegant', 'Bold', 'Traditional', 'Professional', 'I’m not sure — recommend for me'].map((item) => <option key={item}>{item}</option>)}</select></label>
            </div>
          </fieldset>

          <fieldset className="border border-[#34473d]/15 bg-[#eae7dc]/55 p-5 md:p-8">
            <legend className="px-2"><span className="serif text-[23px] text-[#34473d]">06 / Project Materials</span></legend>
            <p className="mb-6 mt-1 max-w-[700px] text-[12px] leading-6 text-[#77786c]">
              After submitting this form, please send your logo, business photos, product/service images, menu/catalogue, documents, or other website materials through WhatsApp or email.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="group inline-flex min-h-12 items-center justify-between gap-4 bg-[#345046] px-5 py-4 text-[12px] font-medium text-[#f5f1e8] transition-colors hover:bg-[#263b33]" data-testid="link-project-materials-whatsapp">
                <span className="inline-flex items-center gap-2"><MessageCircle size={16} aria-hidden="true" />Send Files on WhatsApp</span>
                <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <a href={materialsEmailUrl} className="group inline-flex min-h-12 items-center justify-between gap-4 border border-[#345046] px-5 py-4 text-[12px] font-medium text-[#345046] transition-colors hover:bg-[#345046]/[.06]" data-testid="link-project-materials-email">
                <span className="inline-flex items-center gap-2"><Mail size={16} aria-hidden="true" />Send Files by Email</span>
                <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </div>
          </fieldset>

          <fieldset className="border border-[#34473d]/15 bg-[#eae7dc]/55 p-5 md:p-8">
            <legend className="px-2"><span className="serif text-[23px] text-[#34473d]">07 / Website features</span></legend>
            <p className="mb-5 mt-1 text-[12px] leading-5 text-[#77786c]">Select any features you think your website may need.</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{featureOptions.map((option) => checkbox('features', option))}</div>
            {form.features.includes('Other') && <label className="mt-3 block"><FieldLabel>Other feature</FieldLabel><input name="otherFeatures" value={form.otherFeatures} onChange={(event) => update('otherFeatures', event.target.value)} className={inputClass} placeholder="Describe the feature" /></label>}
            <p className="mt-4 border-l-2 border-[#bd8c6d] pl-4 text-[11px] leading-5 text-[#77786c]">Some advanced features may require additional setup, third-party services, or a backend system. I’ll discuss this with you before development.</p>
          </fieldset>

          <fieldset className="border border-[#34473d]/15 bg-[#eae7dc]/55 p-5 md:p-8">
            <legend className="px-2"><span className="serif text-[23px] text-[#34473d]">08 / Project details</span></legend>
            <p className="mb-6 mt-1 text-[12px] leading-5 text-[#77786c]">Optional details about timing, setup and project scope.</p>
            <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
              <label className={labelClass}><FieldLabel>Preferred launch date</FieldLabel><input name="launchDate" type="date" value={form.launchDate} onChange={(event) => update('launchDate', event.target.value)} className={inputClass} /></label>
              <ChoiceGroup label="Do you already own a domain?" name="hasDomain" value={form.hasDomain} onChange={(value) => update('hasDomain', value)} options={['Yes', 'No', 'I’m not sure']} />
              <ChoiceGroup label="Do you already have website hosting?" name="hasHosting" value={form.hasHosting} onChange={(value) => update('hasHosting', value)} options={['Yes', 'No', 'I’m not sure']} />
              <label className={labelClass}><FieldLabel>Estimated budget (optional)</FieldLabel><select name="budget" value={form.budget} onChange={(event) => update('budget', event.target.value)} className={selectClass}><option value="">Choose a range (optional)</option><option>Under $100</option><option>$100–$250</option><option>$250–$500</option><option>$500+</option><option>Not sure yet</option></select></label>
              <label className="sm:col-span-2"><FieldLabel>Additional requirements / notes</FieldLabel><textarea name="notes" rows={5} value={form.notes} onChange={(event) => update('notes', event.target.value)} className={`${inputClass} resize-y`} placeholder="Share anything else that would help me understand your project." /></label>
            </div>
          </fieldset>

          <div className="border border-[#34473d]/15 bg-[#eae7dc]/55 p-5 md:p-8">
            <label className="flex cursor-pointer items-start gap-3">
              <input name="confirmation" value="yes" required type="checkbox" checked={form.confirmation} onChange={(event) => update('confirmation', event.target.checked)} aria-invalid={!!errors.confirmation} aria-describedby={errors.confirmation ? 'intake-confirmation-error' : 'intake-privacy-note'} className="mt-1 h-4 w-4 accent-[#345046]" />
              <span className="text-[12px] leading-6 text-[#566258]">I confirm that the information I provide is related to my business/project and may be used to prepare my website proposal and project. <span className="text-[#ad7d5e]">*</span></span>
            </label>
            {errors.confirmation && <p id="intake-confirmation-error" role="alert" className="ml-7 mt-2 text-[11px] text-[#9b4f3f]">{errors.confirmation}</p>}
            <p id="intake-privacy-note" className="ml-7 mt-3 text-[10px] leading-5 text-[#858579]">Your form information is sent through Formspree to the studio for this project inquiry. Please do not enter passwords, payment card information, or other highly sensitive personal information.</p>
          </div>

          {status && <div role="status" aria-live="polite" className={`border-l-2 px-5 py-4 text-[12px] leading-6 ${status.startsWith('Thank you') ? 'border-[#345046] bg-[#e5e9df] text-[#34473d]' : 'border-[#b17d5e] bg-[#eee5db] text-[#674d3e]'}`}>{status}</div>}
          <div className="flex flex-col gap-3 border-t border-[#34473d]/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[460px] text-[10px] leading-5 text-[#858579]">Take your time. You can leave optional details blank and we can work through the rest together.</p>
            <button type="submit" disabled={isSubmitting} className="group inline-flex min-h-12 items-center justify-between gap-8 bg-[#345046] px-6 py-4 text-left text-[12px] font-medium text-[#f5f1e8] transition-colors hover:bg-[#263b33] disabled:cursor-wait disabled:opacity-65">
              <span>{isSubmitting ? 'Submitting your project details…' : 'Submit My Project Details'}</span>
              {isSubmitting ? <span className="h-4 w-4 animate-pulse rounded-full border border-[#f5f1e8]/70" aria-hidden="true" /> : <><span className="sr-only">Your project brief will be sent to the studio</span><ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></>}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
