import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  Cpu,
  Globe2,
  Layers3,
  Menu,
  MousePointer2,
  Plus,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import ContactForm from "./components/ContactForm";
import DynamoFallback from "./components/DynamoFallback";
import VisualBoundary from "./components/VisualBoundary";

const DynamoVisual = lazy(() =>
  import("./components/DynamoVisual").catch(() => ({ default: DynamoFallback })),
);

const services = [
  {
    number: "01",
    icon: Globe2,
    title: "Sites que fazem a diferença.",
    description:
      "Seu negócio merece uma presença digital à altura. Design marcante, navegação simples e uma experiência que funciona em qualquer tela.",
    tags: ["Sites institucionais", "Landing pages"],
    className: "service-web",
  },
  {
    number: "02",
    icon: Layers3,
    title: "Sistemas que resolvem.",
    description:
      "Transformamos os desafios da sua operação em ferramentas intuitivas. Soluções sob medida, pensadas para acompanhar o seu crescimento.",
    tags: ["Sistemas web", "Soluções sob medida"],
    className: "service-systems",
  },
  {
    number: "03",
    icon: Workflow,
    title: "Menos tarefas. Mais possibilidades.",
    description:
      "Conectamos ferramentas e automatizamos processos para que a sua equipe tenha tempo para o que realmente importa.",
    tags: ["Automações", "Integrações"],
    className: "service-automation",
  },
];

const concepts = [
  {
    kind: "web",
    category: "WEBSITE INSTITUCIONAL",
    title: "Uma marca. Uma experiência.",
    description:
      "Uma exploração visual para uma marca de arquitetura: espaço, personalidade e uma navegação que deixa o trabalho falar.",
    tags: ["Design responsivo", "Identidade digital", "Performance"],
  },
  {
    kind: "dashboard",
    category: "SISTEMA WEB",
    title: "Tudo no lugar. Tudo conectado.",
    description:
      "Um conceito de painel de gestão que transforma dados em decisões, com indicadores claros e uma operação mais simples.",
    tags: ["Dashboard", "Experiência de uso", "Gestão"],
  },
  {
    kind: "flow",
    category: "AUTOMAÇÃO",
    title: "Seu negócio, em fluxo.",
    description:
      "Uma proposta de integração entre atendimento, organização de contatos e tarefas para reduzir trabalho repetitivo.",
    tags: ["Integrações", "Fluxos inteligentes", "Produtividade"],
  },
];

const steps = [
  {
    title: "A gente escuta.",
    text: "Entendemos sua ideia, seu negócio e onde você quer chegar.",
    label: "DESCOBERTA",
  },
  {
    title: "Damos forma.",
    text: "Planejamos a solução e desenhamos uma experiência com propósito.",
    label: "ESTRATÉGIA & DESIGN",
  },
  {
    title: "Fazemos acontecer.",
    text: "Construímos, testamos e refinamos cada detalhe com você.",
    label: "DESENVOLVIMENTO",
  },
  {
    title: "Seguimos juntos.",
    text: "Colocamos no ar e combinamos os próximos passos da evolução.",
    label: "ENTREGA & EVOLUÇÃO",
  },
];

const faqs = [
  [
    "Vocês atendem empresas de qualquer tamanho?",
    "Sim. Podemos partir de uma primeira presença digital ou de um processo que precisa evoluir. A solução é definida a partir do momento, das necessidades e do orçamento do seu negócio.",
  ],
  [
    "Quanto custa e quanto tempo leva um projeto?",
    "Cada projeto tem um escopo. Depois de entender a sua ideia, definimos as entregas, o investimento e um cronograma. Você conhece esses pontos antes de começar.",
  ],
  [
    "Meu site vai funcionar bem no celular?",
    "Sim. O design responsivo faz parte do projeto desde o início. A experiência é pensada e testada para celulares, tablets e computadores.",
  ],
  [
    "E depois que o projeto for entregue?",
    "Na proposta, combinamos publicação, documentação e orientações de uso. Suporte, manutenção e novas funcionalidades podem ser planejados conforme a necessidade do projeto.",
  ],
];

function ProjectPreview({ kind }: { kind: string }) {
  if (kind === "web")
    return (
      <div className="mockup mockup-web" aria-hidden="true">
        <div className="mock-browser">
          <span />
          <span />
          <span />
          <div>aurora.studio</div>
        </div>
        <div className="architecture-nav">
          <b>
            aurora<span>®</span>
          </b>
          <span>
            Espaços com significado <ArrowUpRight size={10} />
          </span>
        </div>
        <div className="architecture-content">
          <span>ARQUITETURA & INTERIORES</span>
          <h4>
            Novas formas
            <br />
            de habitar.
          </h4>
          <div className="architecture-pill">
            Explore nossos espaços <ArrowUpRight size={10} />
          </div>
        </div>
        <div className="architecture-art">
          <div className="arch arch-one" />
          <div className="arch arch-two" />
          <div className="art-floor" />
          <div className="art-sun" />
        </div>
        <div className="architecture-bottom">
          MENOS EXCESSO. MAIS ESSÊNCIA.<span>01 — 03</span>
        </div>
      </div>
    );
  if (kind === "dashboard")
    return (
      <div className="mockup mockup-dashboard" aria-hidden="true">
        <div className="mock-browser">
          <span />
          <span />
          <span />
          <div>nexo / visão geral</div>
        </div>
        <div className="dashboard-sidebar">
          <b>
            <Layers3 size={16} /> nexo
          </b>
          <span className="active">◈</span>
          <span>▥</span>
          <span>◎</span>
          <span>⌘</span>
          <i>N</i>
        </div>
        <div className="dashboard-body">
          <div className="dashboard-heading">
            <div>
              <span>SEU NEGÓCIO, EM PERSPECTIVA</span>
              <b>Visão geral</b>
            </div>
            <div className="dashboard-avatar">D</div>
          </div>
          <div className="dashboard-metrics">
            <div>
              <span>Receita total</span>
              <b>
                R$ 24.580<span>↗ 12,8%</span>
              </b>
            </div>
            <div>
              <span>Novos clientes</span>
              <b>
                128<span>↗ 8,2%</span>
              </b>
            </div>
          </div>
          <div className="dashboard-chart">
            <span>
              Evolução do negócio <i>Este mês⌄</i>
            </span>
            <div className="chart-grid" />
            <svg viewBox="0 0 360 115" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#8b74ff" stopOpacity=".3" />
                  <stop offset="1" stopColor="#8b74ff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 95 C30 95 25 55 65 67 S110 100 142 56 S172 79 199 48 S238 57 266 23 S315 37 360 5 L360 115 L0 115Z"
                fill="url(#chart-fill)"
              />
              <path
                d="M0 95 C30 95 25 55 65 67 S110 100 142 56 S172 79 199 48 S238 57 266 23 S315 37 360 5"
                fill="none"
                stroke="#9d8bff"
                strokeWidth="3"
              />
            </svg>
          </div>
          <div className="dashboard-row">
            <span>
              <i /> Últimas atividades
            </span>
            <span>Ver todas ↗</span>
          </div>
        </div>
      </div>
    );
  return (
    <div className="mockup mockup-flow" aria-hidden="true">
      <div className="mock-browser">
        <span />
        <span />
        <span />
        <div>dynamo / automações</div>
      </div>
      <div className="flow-heading">
        <span>
          <Workflow size={14} /> Fluxo de atendimento
        </span>
        <span className="flow-status">
          <i /> Ativo
        </span>
      </div>
      <div className="flow-grid">
        <div className="flow-connector connector-one" />
        <div className="flow-connector connector-two" />
        <div className="flow-connector connector-three" />
        <div className="flow-node node-one">
          <div className="node-icon">
            <Globe2 size={18} />
          </div>
          <div>
            <b>Novo contato</b>
            <span>Formulário do site</span>
          </div>
          <Check size={11} />
        </div>
        <div className="flow-node node-two">
          <div className="node-icon">
            <Code2 size={18} />
          </div>
          <div>
            <b>Organizar dados</b>
            <span>Atualizar CRM</span>
          </div>
          <Check size={11} />
        </div>
        <div className="flow-node node-three">
          <div className="node-icon">
            <Sparkles size={18} />
          </div>
          <div>
            <b>Próximo passo</b>
            <span>Notificar a equipe</span>
          </div>
          <Check size={11} />
        </div>
        <div className="flow-spark">
          <Plus size={12} />
        </div>
      </div>
      <div className="flow-bottom">
        <span>
          <i /> Conexões que simplificam.
        </span>
        <span>100% em fluxo</span>
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (
      typeof window.IntersectionObserver !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    let observer: IntersectionObserver | undefined;
    const revealAll = () => {
      elements.forEach((element) => element.classList.remove("reveal-pending"));
    };

    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 },
      );
      elements.forEach((element) => {
        observer!.observe(element);
        element.classList.add("reveal-pending");
      });
    } catch {
      observer?.disconnect();
      revealAll();
    }

    return () => {
      observer?.disconnect();
      revealAll();
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedProject !== null && dialog && !dialog.open) dialog.showModal();
    if (selectedProject === null && dialog?.open) dialog.close();
  }, [selectedProject]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a href="#main" className="skip-link">
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <div className="header-inner container">
          <a
            href="#inicio"
            className="brand"
            aria-label="DD Dynamo — início"
            onClick={closeMenu}
          >
            <img src="/brand-mark.svg" alt="" />
            <span>
              DD DYNAMO<small>TECHNOLOGY</small>
            </span>
          </a>
          <nav
            className={menuOpen ? "navigation is-open" : "navigation"}
            id="main-navigation"
            aria-label="Navegação principal"
          >
            <a href="#servicos" onClick={closeMenu}>
              Soluções
            </a>
            <a href="#possibilidades" onClick={closeMenu}>
              Possibilidades
            </a>
            <a href="#sobre" onClick={closeMenu}>
              Sobre nós
            </a>
            <a href="#processo" onClick={closeMenu}>
              Como funciona
            </a>
            <a href="#contato" className="mobile-nav-cta" onClick={closeMenu}>
              Vamos conversar <ArrowUpRight size={16} />
            </a>
          </nav>
          <a href="#contato" className="header-cta">
            Vamos conversar <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-grid-overlay" aria-hidden="true" />
          <div className="hero-content container">
            <div className="hero-copy">
              <div className="eyebrow hero-eyebrow">
                <span className="live-dot" /> UMA NOVA ENERGIA PARA O SEU
                NEGÓCIO
              </div>
              <h1 id="hero-title">
                Ideias que
                <br />
                se transformam
                <br />
                em <span>impacto.</span>
              </h1>
              <p>
                Tecnologia que impulsiona ideias. Criamos sites, sistemas e
                automações para levar o seu negócio mais longe.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contato">
                  Tire sua ideia do papel <ArrowUpRight size={18} />
                </a>
                <a className="text-link" href="#servicos">
                  Explore as soluções <ArrowRight size={16} />
                </a>
              </div>
              <div className="hero-caption">
                <span className="caption-icon">
                  <Code2 size={15} />
                </span>
                <span>
                  Da primeira conversa à última linha de código.
                  <br />
                  <b>Construído com você. Pensado para o seu negócio.</b>
                </span>
              </div>
            </div>
            <div className="hero-art">
              <VisualBoundary fallback={<DynamoFallback />}>
                <Suspense fallback={<DynamoFallback />}>
                  <DynamoVisual />
                </Suspense>
              </VisualBoundary>
              <span className="hero-art-coordinate">
                DD / 01 — ENERGIA EM CÓDIGO
              </span>
            </div>
          </div>
          <div className="hero-footer container">
            <span>
              <i /> Criatividade. Engenharia. Proximidade.
            </span>
            <a href="#servicos">
              Role para descobrir <ArrowDown size={14} />
            </a>
          </div>
        </section>

        <div className="technology-strip">
          <div className="container technology-inner">
            <span>
              Boas ideias.
              <br />
              <b>A tecnologia certa.</b>
            </span>
            <div className="technology-list">
              <span>
                <Code2 size={22} /> React
              </span>
              <span>
                <span className="tech-square">TS</span> TypeScript
              </span>
              <span>
                <span className="node-symbol">⬡</span> Node.js
              </span>
              <span>
                <Layers3 size={22} /> Figma
              </span>
              <span>
                <Cpu size={22} /> Python
              </span>
            </div>
          </div>
        </div>

        <section
          className="section services-section container"
          id="servicos"
          aria-labelledby="services-title"
        >
          <div className="section-heading" data-reveal>
            <div>
              <div className="eyebrow">
                <span className="section-marker" /> O QUE FAZEMOS
              </div>
              <h2 id="services-title">
                Seu próximo passo.
                <br />
                <span>Nossa próxima missão.</span>
              </h2>
            </div>
            <p>
              De uma presença digital marcante a uma operação mais inteligente.
              Encontramos a solução que faz sentido para você.
            </p>
          </div>
          <div className="services-grid">
            {services.map(
              (
                { number, icon: Icon, title, description, tags, className },
                i,
              ) => (
                <a
                  href="#contato"
                  className={`service-card ${className}`}
                  key={number}
                  data-reveal
                  style={
                    { "--reveal-delay": `${i * 80}ms` } as React.CSSProperties
                  }
                >
                  <div className="service-top">
                    <span className="service-icon">
                      <Icon size={25} strokeWidth={1.4} />
                    </span>
                    <span className="service-number">/ {number}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <div className="service-tags">
                    {tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="service-bottom">
                    <span>
                      Vamos construir <ArrowRight size={14} />
                    </span>
                    <span className="service-arrow">
                      <ArrowUpRight size={19} />
                    </span>
                  </div>
                </a>
              ),
            )}
          </div>
          <div className="services-note" data-reveal>
            <Sparkles size={17} />
            <p>
              Hoje, soluções para o seu negócio. Amanhã,{" "}
              <strong>
                novas possibilidades com SaaS, apps e produtos digitais.
              </strong>
            </p>
            <span>
              SEMPRE EM MOVIMENTO <ArrowUpRight size={14} />
            </span>
          </div>
        </section>

        <section
          className="possibilities-section section"
          id="possibilidades"
          aria-labelledby="projects-title"
        >
          <div className="container">
            <div className="section-heading" data-reveal>
              <div>
                <div className="eyebrow">
                  <span className="section-marker" /> IDEIAS EM PERSPECTIVA
                </div>
                <h2 id="projects-title">
                  Imagine o que
                  <br />
                  <span>podemos criar juntos.</span>
                </h2>
              </div>
              <div className="projects-intro">
                <p>
                  Uma boa ideia pode tomar muitas formas.
                  <br />
                  Aqui, algumas possibilidades.
                </p>
                <span className="concept-disclaimer">
                  <MousePointer2 size={13} /> Conceitos visuais, não projetos de
                  clientes
                </span>
              </div>
            </div>
            <div className="projects-grid">
              {concepts.map((concept, index) => (
                <button
                  className={`project-card project-${concept.kind}`}
                  onClick={() => setSelectedProject(index)}
                  key={concept.kind}
                  data-reveal
                  style={
                    {
                      "--reveal-delay": `${index * 80}ms`,
                    } as React.CSSProperties
                  }
                >
                  <div className="project-preview">
                    <ProjectPreview kind={concept.kind} />
                    <span className="preview-badge">CONCEITO</span>
                    <span className="project-open">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                  <div className="project-info">
                    <span>{concept.category}</span>
                    <h3>{concept.title}</h3>
                    <span className="project-link">
                      Explore a ideia <ArrowUpRight size={15} />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section about-section container"
          id="sobre"
          aria-labelledby="about-title"
        >
          <div className="about-visual" data-reveal>
            <div className="about-visual-grid" />
            <span className="about-coordinate">DD DYNAMO / NOSSA ESSÊNCIA</span>
            <img src="/brand-mark.svg" alt="" />
            <div className="about-brand-text">
              Dois irmãos.
              <br />
              Uma mesma <span>energia.</span>
            </div>
            <div className="founders">
              <div className="founder-initials">
                <span>D</span>
                <span>D</span>
              </div>
              <div>
                <b>Diego & Douglas</b>
                <span>Fundadores da DD Dynamo</span>
              </div>
              <ArrowUpRight size={20} />
            </div>
          </div>
          <div className="about-copy" data-reveal>
            <div className="eyebrow">
              <span className="section-marker" /> CONHEÇA A DYNAMO
            </div>
            <h2 id="about-title">
              Tecnologia é feita
              <br />
              por pessoas.
              <br />
              <span>E para pessoas.</span>
            </h2>
            <p>
              Nascemos da conexão entre dois irmãos e uma vontade em comum:
              transformar boas ideias em soluções que fazem a diferença.
            </p>
            <p>
              O <strong>DD</strong> vem de Diego e Douglas.{" "}
              <strong>Dynamo</strong> é a energia que nos move. Juntos, unimos
              criatividade, engenharia e uma relação próxima com quem constrói
              com a gente.
            </p>
            <div className="about-values">
              <span>
                <Check size={15} /> Conversa direta
              </span>
              <span>
                <Check size={15} /> Cuidado em cada detalhe
              </span>
              <span>
                <Check size={15} /> Soluções com propósito
              </span>
            </div>
          </div>
        </section>

        <section
          className="section process-section"
          id="processo"
          aria-labelledby="process-title"
        >
          <div className="container">
            <div className="section-heading" data-reveal>
              <div>
                <div className="eyebrow">
                  <span className="section-marker" /> COMO ACONTECE
                </div>
                <h2 id="process-title">
                  Do “e se...”
                  <br />
                  <span>ao “ficou pronto”.</span>
                </h2>
              </div>
              <p>
                Um processo claro, sem complicar.
                <br />
                Você participa. A gente mantém tudo em movimento.
              </p>
            </div>
            <div className="process-grid">
              {steps.map((step, i) => (
                <div
                  className="process-step"
                  key={step.label}
                  data-reveal
                  style={
                    { "--reveal-delay": `${i * 90}ms` } as React.CSSProperties
                  }
                >
                  <div className="step-track">
                    <span>0{i + 1}</span>
                    <ArrowRight size={15} />
                  </div>
                  <span className="step-label">{step.label}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
            <div className="process-footer">
              <span className="live-dot" />
              <span>
                Você não precisa falar a língua da tecnologia.{" "}
                <b>A gente fala a sua.</b>
              </span>
            </div>
          </div>
        </section>

        <section
          className="section faq-section container"
          aria-labelledby="faq-title"
        >
          <div className="faq-intro" data-reveal>
            <div className="eyebrow">
              <span className="section-marker" /> SEM PONTAS SOLTAS
            </div>
            <h2 id="faq-title">
              Boa conversa.
              <br />
              <span>Respostas claras.</span>
            </h2>
            <p>
              Algumas dúvidas que costumam aparecer antes de tirar uma ideia do
              papel.
            </p>
            <a className="text-link" href="#contato">
              Vamos falar sobre a sua? <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="faq-list" data-reveal>
            {faqs.map(([question, answer], index) => (
              <details name="faq" key={question}>
                <summary>
                  <span className="faq-number">0{index + 1}</span>
                  <span>{question}</span>
                  <ChevronDown size={18} />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          className="contact-section section"
          id="contato"
          aria-labelledby="contact-title"
        >
          <div className="container contact-grid">
            <div className="contact-copy" data-reveal>
              <div className="eyebrow">
                <span className="live-dot" /> O PRÓXIMO PASSO COMEÇA AQUI
              </div>
              <h2 id="contact-title">
                Tem uma ideia?
                <br />
                Vamos dar
                <br />
                <span>movimento.</span>
              </h2>
              <p>
                Conte um pouco do que você tem em mente. Vamos organizar o
                primeiro passo para transformar sua ideia em uma solução.
              </p>
              <div className="contact-brand-line">
                <img src="/brand-mark.svg" alt="" />
                <span>
                  Uma boa ideia.
                  <br />
                  <b>Uma nova possibilidade.</b>
                </span>
              </div>
            </div>
            <div className="contact-form-card" data-reveal>
              <div className="contact-form-heading">
                <span>01 / SUA IDEIA</span>
                <ArrowUpRight size={20} />
              </div>
              <h3>
                Todo grande projeto começa
                <br />
                com uma conversa.
              </h3>
              <ContactForm />
            </div>
          </div>
          <div className="contact-atmosphere" aria-hidden="true" />
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <a className="brand" href="#inicio" aria-label="DD Dynamo — início">
              <img src="/brand-mark.svg" alt="" />
              <span>
                DD DYNAMO<small>TECHNOLOGY</small>
              </span>
            </a>
            <span>Tecnologia que impulsiona ideias.</span>
            <a href="#inicio" className="back-to-top">
              Voltar ao topo <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} DD Dynamo Technology.</span>
            <span>Feito com propósito. Construído em parceria.</span>
            <a href="#contato">
              Vamos criar algo juntos <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </footer>

      <dialog
        ref={dialogRef}
        className="project-dialog"
        onClose={() => setSelectedProject(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        aria-labelledby="dialog-title"
      >
        {selectedProject !== null && (
          <div className="dialog-content">
            <button
              className="dialog-close"
              aria-label="Fechar conceito"
              onClick={() => dialogRef.current?.close()}
            >
              <X size={21} />
            </button>
            <div className="dialog-preview">
              <ProjectPreview kind={concepts[selectedProject].kind} />
            </div>
            <div className="dialog-copy">
              <div className="eyebrow">EXPLORAÇÃO DE DESIGN / CONCEITO</div>
              <h2 id="dialog-title">{concepts[selectedProject].title}</h2>
              <p>{concepts[selectedProject].description}</p>
              <div className="dialog-tags">
                {concepts[selectedProject].tags.map((tag) => (
                  <span key={tag}>
                    <Check size={13} />
                    {tag}
                  </span>
                ))}
              </div>
              <a
                className="button button-primary"
                href="#contato"
                onClick={() => dialogRef.current?.close()}
              >
                Quero explorar uma ideia assim <ArrowUpRight size={17} />
              </a>
              <small>
                Proposta visual demonstrativa. Não representa um projeto
                entregue a um cliente.
              </small>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

export default App;
