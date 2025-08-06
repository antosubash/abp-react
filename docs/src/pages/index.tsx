import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageStats from '@site/src/components/HomepageStats';
import HomepageCTA from '@site/src/components/HomepageCTA';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className="hero__title">
              <span className={styles.highlight}>Modern React</span> Frontend for{' '}
              <span className={styles.highlight}>ABP Framework</span>
            </h1>
            <p className="hero__subtitle">
              Build powerful, scalable web applications with Next.js, TypeScript, and Tailwind CSS. 
              Seamlessly integrate with ABP Framework backend services.
            </p>
            <div className={styles.heroButtons}>
              <Link
                className="button button--primary button--lg"
                to="/docs/intro">
                🚀 Get Started
              </Link>
              <Link
                className="button button--secondary button--lg"
                to="https://abpreact.antosubash.com">
                🎯 Live Demo
              </Link>
              <Link
                className="button button--outline button--lg"
                to="https://github.com/antosubash/abp-react">
                📦 View on GitHub
              </Link>
            </div>
            <div className={styles.heroBadges}>
              <span className={styles.badge}>⚡ Next.js 14</span>
              <span className={styles.badge}>🔷 TypeScript</span>
              <span className={styles.badge}>🎨 Tailwind CSS</span>
              <span className={styles.badge}>🔐 ABP Framework</span>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img 
              src={require('@site/static/img/macbook.png').default}
              alt="ABP React Dashboard Preview"
              className={styles.heroImg}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): React.ReactElement {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Modern React Frontend for ABP Framework`}
      description="Build powerful, scalable web applications with Next.js, TypeScript, and Tailwind CSS. Seamlessly integrate with ABP Framework backend services.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageStats />
        <HomepageCTA />
      </main>
    </Layout>
  );
}
