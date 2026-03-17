import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const FeatureList = [
  {
    title: 'Estratégia de Negócio',
    description: (
      <>
        Documentação sobre o modelo de negócio, análise de mercado e estratégias de crescimento.
        Inclui BM Canvas, PM Canvas e análise de mercado.
      </>
    ),
    link: '/estrategia/bmc-canvas',
    icon: '📊',
  },
  {
    title: 'Técnica & Implementação',
    description: (
      <>
        Detalhes técnicos da arquitetura, stack tecnológico e decisões de implementação.
        Guias para desenvolvedores e equipes técnicas.
      </>
    ),
    link: '/tecnica/intro',
    icon: '⚙️',
  },
  {
    title: 'Guias & Tutoriais',
    description: (
      <>
        Tutoriais passo a passo para configuração, uso e contribuição.
        Aprenda a implementar e estender o sistema.
      </>
    ),
    link: '/tecnica/arquitetura',
    icon: '📚',
  },
];

function Feature({title, description, link, icon}: {title: string; description: ReactNode; link: string; icon: string}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="padding-horiz--md padding-vert--lg">
        <div className="text--center">
          <span style={{fontSize: '3rem'}}>{icon}</span>
        </div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <Link to={link} className="button button--primary button--sm">
          Acessar →
        </Link>
      </div>
    </div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/estrategia/bmc-canvas">
            Começar pela Estratégia 📈
          </Link>
          <Link
            className="button button--secondary button--lg margin-left--md"
            to="/tecnica/intro">
            Ver Documentação Técnica ⚙️
          </Link>
        </div>

        <div className="margin-top--xl">
          <p style={{fontSize: '0.9rem', opacity: 0.8}}>
            Desenvolvido como Trabalho de Conclusão de Curso - SENAI
          </p>
        </div>
      </div>
    </header>
  );
}

function QuickLinks() {
  return (
    <section className={styles.quickLinks}>
      <div className="container">
        <div className="text-center margin-bottom--lg">
          <Heading as="h2">Acesso Rápido</Heading>
        </div>
        <div className="row">
          <div className="col col--4">
            <div className="card padding--lg">
              <h3>🎯 BM Canvas</h3>
              <p>Modelo de Negócio</p>
              <Link to="/estrategia/bmc-canvas">Ver →</Link>
            </div>
          </div>
          <div className="col col--4">
            <div className="card padding--lg">
              <h3>📋 PM Canvas</h3>
              <p>Product Manager Canvas</p>
              <Link to="/estrategia/pm-canvas">Ver →</Link>
            </div>
          </div>
          <div className="col col--4">
            <div className="card padding--lg">
              <h3>🏗️ Arquitetura</h3>
              <p>Arquitetura do Sistema</p>
              <Link to="/tecnica/arquitetura">Ver →</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MermaidInfo() {
  return (
    <section className={styles.mermaidInfo}>
      <div className="container">
        <div className="text-center">
          <Heading as="h2">Diagramas Mermaid</Heading>
          <p className="margin-bottom--lg">
            Esta documentação utiliza diagramas Mermaid para visualização de arquiteturas e fluxos.
            Todos os diagramas são interativos e renderizados diretamente no navegador.
          </p>
          <div className="button-group">
            <Link
              className="button button--info"
              to="https://mermaid.js.org/">
              Aprender Mermaid
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <QuickLinks />
        
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {FeatureList.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>

        <MermaidInfo />
      </main>
    </Layout>
  );
}
