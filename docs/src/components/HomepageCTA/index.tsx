import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function HomepageCTA(): React.ReactElement {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.ctaContent}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
            <p className={styles.ctaDescription}>
              Start building modern web applications with ABP React today. 
              Get up and running quickly with our comprehensive documentation and examples.
            </p>
            <div className={styles.ctaButtons}>
              <Link
                className="button button--primary button--lg"
                to="/docs/intro">
                📚 Read Documentation
              </Link>
                             <Link
                 className="button button--outline button--lg"
                 to="https://github.com/antosubash/abp-react">
                 ⭐ Star on GitHub
               </Link>
            </div>
            <div className={styles.ctaFeatures}>
              <div className={styles.ctaFeature}>
                <span className={styles.ctaFeatureIcon}>🚀</span>
                <span>Quick Setup</span>
              </div>
              <div className={styles.ctaFeature}>
                <span className={styles.ctaFeatureIcon}>📖</span>
                <span>Comprehensive Docs</span>
              </div>
              <div className={styles.ctaFeature}>
                <span className={styles.ctaFeatureIcon}>💬</span>
                <span>Community Support</span>
              </div>
            </div>
          </div>
          <div className={styles.ctaImage}>
            <div className={styles.codeBlock}>
              <div className={styles.codeHeader}>
                <span className={styles.codeDot}></span>
                <span className={styles.codeDot}></span>
                <span className={styles.codeDot}></span>
                <span className={styles.codeTitle}>terminal</span>
              </div>
                             <div className={styles.codeContent}>
                 <span className={styles.codeLine}>
                   <span className={styles.codePrompt}>$</span> git clone https://github.com/antosubash/abp-react.git
                 </span>
                 <span className={styles.codeLine}>
                   <span className={styles.codePrompt}>$</span> cd abp-react
                 </span>
                 <span className={styles.codeLine}>
                   <span className={styles.codePrompt}>$</span> pnpm install
                 </span>
                 <span className={styles.codeLine}>
                   <span className={styles.codePrompt}>$</span> pnpm dev
                 </span>
                 <span className={styles.codeComment}># 🎉 Your app is running!</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 