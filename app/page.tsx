export default function Home() {
  return (
    <div className="site-shell flex flex-col flex-1 items-center justify-center">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Alfi Candra home">
          <span className="brand-mark">ac<span>/</span></span>
          <span>ALFI CANDRA</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="status-pill" href="#contact"><span /> Available for work</a>
      </header>

      <main id="top" className="spider-main">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> Software engineer / builder</p>
            <h1>I build dream<br /><em>digital worlds.</em></h1>
            <p className="hero-intro">Hi, I&apos;m Alfi.saya membuat portofolio untuk belajar lebih baik kedepan nya</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">See my work <span>-&gt;</span></a>
              <a className="text-link" href="#contact">Let&apos;s talk <span>-&gt;</span></a>
            </div>
          </div>
          <div className="terminal-card" aria-label="Alfi's developer profile">
            <div className="terminal-bar"><span className="traffic red" /><span className="traffic yellow" /><span className="traffic green" /><span className="terminal-title">alfi@studio: ~</span></div>
            <div className="terminal-body">
              <p><span className="terminal-prompt">$</span> whoami</p>
              <p className="terminal-output">alfi_candra</p>
              <p><span className="terminal-prompt">$</span> cat stack.json</p>
              <p className="terminal-code">&#123;<br />&nbsp;&nbsp;&quot;frontend&quot;: [&quot;React JS&quot;, &quot;React Native&quot;, &quot;Next.js&quot;],<br />&nbsp;&nbsp;&quot;backend&quot;: [&quot;Python&quot;, &quot;MongoDB&quot;],<br />&nbsp;&nbsp;&quot;status&quot;: &quot;shipping &amp; writing skripsi&quot;<br />&#125;</p>
              <p><span className="terminal-prompt">$</span> <span className="cursor" /></p>
            </div>
          </div>
        </section>

        <section className="ticker" aria-label="Skills">
          <div className="ticker-inner"><span>FULL-STACK DEVELOPMENT</span><b>+</b><span>DATA EXPLORATION</span><b>+</b><span>MOBILE APPS</span><b>+</b><span>FULL-STACK DEVELOPMENT</span><b>+</b><span>DATA EXPLORATION</span></div>
        </section>

        <section className="work section-wrap" id="work">
          <div className="section-heading"><p className="eyebrow">Selected work</p><span className="section-index">01 / 03</span></div>
          <div className="project-grid">
            <article className="project project-featured"><div className="project-visual visual-orbit"><span className="orbit orbit-one" /><span className="orbit orbit-two" /><span className="orbit-core">S</span><span className="visual-label">SYS / 2026</span></div><div className="project-meta"><div><h2>Sales & Inventory System</h2><p>Web-based tracking platform built with React JS and Barcode Scanner integration.</p></div><span className="project-type">01 / Web App</span></div></article>
            <article className="project project-small"><div className="project-visual visual-grid"><span className="grid-word">DOC<br /><i>MGT</i></span><span className="visual-label">PLN / 2025</span></div><div className="project-meta"><div><h2>PLN Doc Management</h2><p>Mobile documentation management system for PLN Simpang 3 using React Native.</p></div><span className="project-type">02 / Mobile App</span></div></article>
            <article className="project project-small"><div className="project-visual visual-signal"><span className="signal-ring">&#47;&#47;</span><span className="visual-label">DATA / 2026</span></div><div className="project-meta"><div><h2>Data Analytics</h2><p>Python and Streamlit dashboards for COVID-19 and sales data exploration.</p></div><span className="project-type">03 / Analytics</span></div></article>
          </div>
        </section>

        <section className="about section-wrap" id="about">
          <div className="about-label"><p className="eyebrow">A little context</p><span className="section-index">02 / 03</span></div>
          <div className="about-copy"><h2>Curious by default.<br /><span>Useful on purpose.</span></h2><p>I&apos;m a software engineer based in Medan, obsessed with the space where thoughtful design meets well-made technology. I enjoy working on web systems, mobile applications, and diving into data science with Python.</p><div className="facts"><span><b>03+</b> years coding</span><span><b>12+</b> projects shipped</span><span><b>∞</b> things still learning</span></div></div>
        </section>

        <section className="contact section-wrap" id="contact"><div><p className="eyebrow"><span className="eyebrow-line" /> Have a good one?</p><h2>Let&apos;s make<br /><em>something.</em></h2></div><div className="contact-side"><p>Have a project in mind, a problem to solve, or just want to say hello?</p><a className="contact-email" href="mailto:hello@alficandra.dev">hello@alficandra.dev <span>-&gt;</span></a></div></section>
      </main>
      <footer className="site-footer"><span>(c) 2026 Alfi Candra Dinata</span><span>Built with intention / Pekanbaru, ID</span><a href="#top">kembali ke atas ^</a></footer>
    </div>
  );
}