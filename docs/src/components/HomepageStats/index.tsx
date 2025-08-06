import React from 'react';
import styles from './styles.module.css';

type StatItem = {
  number: string;
  label: string;
  description: string;
};

const StatList: StatItem[] = [
  {
    number: '25+',
    label: 'UI Components',
    description: 'Ready-to-use components for building admin interfaces',
  },
  {
    number: '10+',
    label: 'Examples',
    description: 'Comprehensive examples and tutorials to get you started',
  },
  {
    number: '100%',
    label: 'TypeScript',
    description: 'Full type safety with generated types from ABP backend',
  },
  {
    number: '0',
    label: 'Setup Time',
    description: 'Get started instantly with our streamlined setup process',
  },
];

function Stat({number, label, description}: StatItem) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statNumber}>{number}</div>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statDescription}>{description}</div>
    </div>
  );
}

export default function HomepageStats(): React.ReactElement {
  return (
    <section className={styles.stats}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <h2 className={styles.statsTitle}>Built for Developers</h2>
          <p className={styles.statsSubtitle}>
            Start building modern web applications with ABP React today
          </p>
        </div>
        <div className="row">
          {StatList.map((props, idx) => (
            <div key={idx} className="col col--3">
              <Stat {...props} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 