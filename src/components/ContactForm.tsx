import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  FileText,
  Mail,
  MessageCircle,
} from "lucide-react";

type FormFields = {
  name: string;
  email: string;
  company: string;
  project: string;
  details: string;
};

type Briefing = {
  fields: FormFields;
  text: string;
  contactUrl: string | null;
};

const initialFields: FormFields = {
  name: "",
  email: "",
  company: "",
  project: "",
  details: "",
};

const projects = [
  "Site institucional",
  "Landing page",
  "Sistema web",
  "Automação",
  "Outro",
];

const configuredEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim() ?? "";
const configuredWhatsApp = (
  import.meta.env.VITE_CONTACT_WHATSAPP ?? ""
).replace(/\D/g, "");
const contactEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(configuredEmail)
  ? configuredEmail
  : "";
const contactWhatsApp = /^\d{10,15}$/.test(configuredWhatsApp)
  ? configuredWhatsApp
  : "";
const contactChannel = contactWhatsApp
  ? "WhatsApp"
  : contactEmail
    ? "e-mail"
    : null;

function createBriefing(fields: FormFields): string {
  return [
    "BRIEFING DE PROJETO — DD DYNAMO",
    "",
    `Nome: ${fields.name}`,
    `E-mail: ${fields.email}`,
    `Empresa: ${fields.company || "Não informada"}`,
    `Tipo de projeto: ${fields.project}`,
    "",
    "Sobre o projeto:",
    fields.details,
  ].join("\n");
}

function createContactUrl(text: string): string | null {
  if (contactWhatsApp) {
    return `https://wa.me/${contactWhatsApp}?text=${encodeURIComponent(text)}`;
  }

  if (contactEmail) {
    return `mailto:${contactEmail}?subject=${encodeURIComponent("Novo projeto | DD Dynamo")}&body=${encodeURIComponent(text)}`;
  }

  return null;
}

export default function ContactForm() {
  const id = useId();
  const [fields, setFields] = useState<FormFields>(initialFields);
  const [briefing, setBriefing] = useState<Briefing | null>(null);
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState<
    "idle" | "copied" | "unavailable"
  >("idle");
  const briefingHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!briefing) return;
    const heading = briefingHeadingRef.current;
    heading?.focus({ preventScroll: true });
    heading?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "nearest",
    });
  }, [briefing]);

  function updateField(field: keyof FormFields, value: string) {
    setFields((previous) => ({ ...previous, [field]: value }));
    setError("");
    setCopyStatus("idle");
    setBriefing(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanFields = Object.fromEntries(
      Object.entries(fields).map(([key, value]) => [key, value.trim()]),
    ) as FormFields;

    const blankField = (["name", "email", "project", "details"] as const).find(
      (field) => !cleanFields[field],
    );

    if (blankField) {
      setError("Preencha os campos obrigatórios para gerar seu briefing.");
      const input = event.currentTarget.elements.namedItem(blankField);
      if (input instanceof HTMLElement) input.focus();
      return;
    }

    const text = createBriefing(cleanFields);
    const contactUrl = createContactUrl(text);
    setBriefing({ fields: cleanFields, text, contactUrl });
    setError("");
    setCopyStatus("idle");

    if (contactUrl) {
      window.open(contactUrl, "_blank", "noopener,noreferrer");
    }
  }

  async function copyBriefing() {
    if (!briefing) return;

    try {
      await navigator.clipboard.writeText(briefing.text);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("unavailable");
    }
  }

  function downloadBriefing() {
    if (!briefing) return;

    const file = new Blob([briefing.text], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "briefing-dd-dynamo.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="contact-form">
      <form onSubmit={handleSubmit} aria-label="Briefing do seu projeto">
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor={`${id}-name`}>
              Seu nome <span aria-hidden="true">*</span>
            </label>
            <input
              id={`${id}-name`}
              className="form-control"
              name="name"
              autoComplete="name"
              placeholder="Como podemos te chamar?"
              required
              maxLength={100}
              value={fields.name}
              onChange={(event) => updateField("name", event.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor={`${id}-email`}>
              Seu e-mail <span aria-hidden="true">*</span>
            </label>
            <input
              id={`${id}-email`}
              className="form-control"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="voce@empresa.com"
              required
              maxLength={254}
              value={fields.email}
              onChange={(event) => updateField("email", event.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor={`${id}-company`}>
              Empresa <span className="field-optional">(opcional)</span>
            </label>
            <input
              id={`${id}-company`}
              className="form-control"
              name="company"
              autoComplete="organization"
              placeholder="O nome da sua empresa"
              maxLength={100}
              value={fields.company}
              onChange={(event) => updateField("company", event.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor={`${id}-project`}>
              O que você precisa? <span aria-hidden="true">*</span>
            </label>
            <select
              id={`${id}-project`}
              className="form-control"
              name="project"
              required
              value={fields.project}
              onChange={(event) => updateField("project", event.target.value)}
            >
              <option value="" disabled>
                Selecione o tipo de projeto
              </option>
              {projects.map((project) => (
                <option key={project} value={project}>
                  {project}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field form-field-full">
            <label htmlFor={`${id}-details`}>
              Conte um pouco da sua ideia <span aria-hidden="true">*</span>
            </label>
            <textarea
              id={`${id}-details`}
              className="form-control"
              name="details"
              rows={4}
              placeholder="O que você quer construir? Qual desafio podemos ajudar a resolver?"
              required
              maxLength={2400}
              value={fields.details}
              onChange={(event) => updateField("details", event.target.value)}
            />
          </div>
        </div>

        {error && (
          <p className="form-note" role="alert">
            {error}
          </p>
        )}

        <button className="button button-primary form-submit" type="submit">
          {contactChannel ? "Enviar meu briefing" : "Gerar meu briefing"}
          <ArrowUpRight size={18} aria-hidden="true" />
        </button>
        <p className="form-note">
          {contactChannel
            ? `Você poderá revisar e enviar pelo ${contactChannel}.`
            : "Sua ideia merece um bom começo. Organize seu projeto em um briefing."}
        </p>
      </form>

      {briefing && (
        <section
          className="form-success"
          aria-labelledby={`${id}-briefing-title`}
        >
          <div className="brief-heading">
            <FileText size={22} aria-hidden="true" />
            <h3
              id={`${id}-briefing-title`}
              ref={briefingHeadingRef}
              tabIndex={-1}
            >
              Seu briefing está pronto.
            </h3>
          </div>
          <p className="form-note" role="status">
            {contactChannel
              ? `Continue no ${contactChannel} para revisar e enviar à equipe. O envio acontece pelo próprio canal.`
              : "Copie ou baixe o resumo para compartilhar com a equipe. Seu briefing ainda não foi enviado."}
          </p>
          <dl className="brief-summary">
            <div>
              <dt>Projeto</dt>
              <dd>{briefing.fields.project}</dd>
            </div>
            <div>
              <dt>Contato</dt>
              <dd>
                {briefing.fields.name} · {briefing.fields.email}
              </dd>
            </div>
            {briefing.fields.company && (
              <div>
                <dt>Empresa</dt>
                <dd>{briefing.fields.company}</dd>
              </div>
            )}
          </dl>
          <p className="brief-details">{briefing.fields.details}</p>
          <div className="brief-actions">
            {briefing.contactUrl && (
              <a
                className="button button-secondary"
                href={briefing.contactUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contactWhatsApp ? (
                  <MessageCircle size={16} aria-hidden="true" />
                ) : (
                  <Mail size={16} aria-hidden="true" />
                )}
                {contactWhatsApp ? "Abrir WhatsApp" : "Abrir e-mail"}
              </a>
            )}
            <button
              className="button button-secondary"
              type="button"
              onClick={copyBriefing}
            >
              {copyStatus === "copied" ? (
                <Check size={16} aria-hidden="true" />
              ) : (
                <Copy size={16} aria-hidden="true" />
              )}
              {copyStatus === "copied" ? "Briefing copiado" : "Copiar briefing"}
            </button>
            <button
              className="button button-secondary"
              type="button"
              onClick={downloadBriefing}
            >
              <Download size={16} aria-hidden="true" />
              Baixar briefing
            </button>
          </div>
          <p className="form-note" role="status" aria-live="polite">
            {copyStatus === "copied" &&
              "Briefing copiado. Agora você pode compartilhar o texto."}
            {copyStatus === "unavailable" &&
              "Não foi possível copiar neste navegador. Baixe o arquivo para compartilhar o briefing."}
          </p>
        </section>
      )}
    </div>
  );
}
