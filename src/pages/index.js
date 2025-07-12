import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="cta-button"
            to="/docs/intro">
            Start Recycling Today
          </Link>
          <Link
            className="button button--outline button--lg"
            style={{marginLeft: '1rem'}}
            to="/docs/getting-started/installation">
            Learn How It Works
          </Link>
        </div>
      </div>
    </header>
  );
}

function Features() {
  return (
    <section style={{padding: '4rem 0'}}>
      <div className="container">
        <h2 className="text--center" style={{marginBottom: '3rem'}}>
          How ScrapeUncle Works
        </h2>
        <div className="row">
          <div className="col col--3">
            <div className="card" style={{padding: '2rem', textAlign: 'center'}}>
              <h3>1. Collect</h3>
              <p>Gather your recyclable materials (paper, plastic, metal, electronics)</p>
            </div>
          </div>
          <div className="col col--3">
            <div className="card" style={{padding: '2rem', textAlign: 'center'}}>
              <h3>2. Scan</h3>
              <p>Use our app to scan or input your recyclables and get instant classification</p>
            </div>
          </div>
          <div className="col col--3">
            <div className="card" style={{padding: '2rem', textAlign: 'center'}}>
              <h3>3. Schedule</h3>
              <p>Arrange pickup or visit our recycling centers for convenient disposal</p>
            </div>
          </div>
          <div className="col col--3">
            <div className="card" style={{padding: '2rem', textAlign: 'center'}}>
              <h3>4. Earn</h3>
              <p>Receive points and rewards for every item recycled responsibly</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="ScrapeUncle - A digital platform that enables users to dispose of their recyclables in a responsible & rewarding manner">
      <HomepageHeader />
      <main>
        <Features />
      </main>
    </Layout>
  );
}
