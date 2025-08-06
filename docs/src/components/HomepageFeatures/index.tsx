import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: React.ReactElement;
  link?: string;
  linkText?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: '🚀 Next.js 14 Ready',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Built with the latest Next.js 14 features including App Router, Server Components, 
        and optimized performance. Get the best React development experience.
      </>
    ),
    link: '/docs/fundamentals/project-structure',
    linkText: 'Learn More',
  },
  {
    title: '🔐 ABP Framework Integration',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Seamlessly integrate with ABP Framework backend services. Built-in authentication, 
        authorization, multi-tenancy, and feature management support.
      </>
    ),
    link: '/docs/fundamentals/authentication',
    linkText: 'View Integration',
  },
  {
    title: '🎨 Modern UI Components',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Beautiful, accessible UI components built with Tailwind CSS and Radix UI. 
        Includes admin dashboard, forms, tables, and more.
      </>
    ),
    link: '/docs/components/ui-components',
    linkText: 'Browse Components',
  },
  {
    title: '⚡ TypeScript First',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Full TypeScript support with generated types from your ABP backend. 
        Type-safe API calls and component props for better development experience.
      </>
    ),
    link: '/docs/fundamentals/api-integration',
    linkText: 'See Types',
  },
  {
    title: '🔧 Developer Experience',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Hot reload, ESLint, Prettier, and Storybook included. Comprehensive documentation 
        and examples to get you started quickly.
      </>
    ),
    link: '/docs/tutorials/create-a-page',
    linkText: 'Get Started',
  },
  {
    title: '📱 Responsive Design',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Mobile-first responsive design that works perfectly on all devices. 
        Optimized for desktop, tablet, and mobile experiences.
      </>
    ),
    link: '/docs/tutorials/creating-crud-pages',
    linkText: 'View Examples',
  },
];

function Feature({title, Svg, description, link, linkText}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="text--center padding-horiz--md">
          <h3 className={styles.featureTitle}>{title}</h3>
          <p className={styles.featureDescription}>{description}</p>
          {link && (
            <Link className={styles.featureLink} to={link}>
              {linkText} →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): React.ReactElement {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <h2 className={styles.featuresTitle}>Why Choose ABP React?</h2>
          <p className={styles.featuresSubtitle}>
            Everything you need to build modern web applications with ABP Framework
          </p>
        </div>
        <div className="row margin-top--lg">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
