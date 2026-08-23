export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Alfi Cuki home">
          <span className="brand-mark">ac<span>/</span></span>
          <span>ALFI CUKI</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="status-pill" href="#contact"><span /> Available for work</a>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> Software engineer / builder</p>
            <h1>I make ideas<br /><em>work.</em></h1>
            <p className="hero-intro">Hi, I&apos;m Alfi. I design and build reliable digital products, from the first line of code to the last pixel.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">See my work <span>-&gt;</span></a>
              <a className="text-link" href="#contact">Let&apos;s talk <span>-&gt;</span></a>
            </div>
          </div>
          <div className="terminal-card" aria-label="Alfi's developer profile">
            <div className="terminal-bar"><span className="traffic red" /><span className="traffic yellow" /><span className="traffic green" /><span className="terminal-title">alfi@studio: ~</span></div>
            <div className="terminal-body">
              <p><span className="terminal-prompt">$</span> whoami</p>
              <p className="terminal-output">alfi_cuki</p>
              <p><span className="terminal-prompt">$</span> cat stack.json</p>
              <p className="terminal-code">&#123;<br />&nbsp;&nbsp;&quot;frontend&quot;: [&quot;React&quot;, &quot;Next.js&quot;],<br />&nbsp;&nbsp;&quot;backend&quot;: [&quot;Node&quot;, &quot;Python&quot;],<br />&nbsp;&nbsp;&quot;status&quot;: &quot;shipping&quot;<br />&#125;</p>
              <p><span className="terminal-prompt">$</span> <span className="cursor" /></p>
            </div>
          </div>
        </section>

        <section className="ticker" aria-label="Skills">
          <div className="ticker-inner"><span>FULL-STACK DEVELOPMENT</span><b>+</b><span>PRODUCT THINKING</span><b>+</b><span>OPEN SOURCE</span><b>+</b><span>FULL-STACK DEVELOPMENT</span><b>+</b><span>PRODUCT THINKING</span></div>
        </section>

        <section className="work section-wrap" id="work">
          <div className="section-heading"><p className="eyebrow">Selected work</p><span className="section-index">01 / 03</span></div>
          <div className="project-grid">
            <article className="project project-featured"><div className="project-visual visual-orbit"><span className="orbit orbit-one" /><span className="orbit orbit-two" /><span className="orbit-core">N</span><span className="visual-label">NOVA / 2024</span></div><div className="project-meta"><div><h2>Nova Finance</h2><p>Making personal finance feel less personal.</p></div><span className="project-type">01 / Product</span></div></article>
            <article className="project project-small"><div className="project-visual visual-grid"><span className="grid-word">FORM<br /><i>FOLIO</i></span><span className="visual-label">FORM / 2023</span></div><div className="project-meta"><div><h2>Formfolio</h2><p>A portfolio toolkit for the next generation.</p></div><span className="project-type">02 / Tool</span></div></article>
            <article className="project project-small"><div className="project-visual visual-signal"><span className="signal-ring">&#47;&#47;</span><span className="visual-label">SIGNAL / 2023</span></div><div className="project-meta"><div><h2>Signal API</h2><p>Simple infrastructure for complex teams.</p></div><span className="project-type">03 / Platform</span></div></article>
          </div>
        </section>

        <section className="about section-wrap" id="about">
          <div className="about-label"><p className="eyebrow">A little context</p><span className="section-index">02 / 03</span></div>
          <div className="about-copy"><h2>Curious by default.<br /><span>Useful on purpose.</span></h2><p>I&apos;m a software engineer based in Indonesia, obsessed with the space where thoughtful design meets well-made technology. I like hard problems, small teams, and shipping things that matter.</p><div className="facts"><span><b>03+</b> years building</span><span><b>12</b> projects shipped</span><span><b>∞</b> things still learning</span></div></div>
        </section>

        <section className="contact section-wrap" id="contact"><div><p className="eyebrow"><span className="eyebrow-line" /> Have a good one?</p><h2>Let&apos;s make<br /><em>something.</em></h2></div><div className="contact-side"><p>Have a project in mind, a problem to solve, or just want to say hello?</p><a className="contact-email" href="mailto:hello@alficuki.dev">hello@alficuki.dev <span>-&gt;</span></a></div></section>
      </main>
      <footer className="site-footer"><span>(c) 2024 Alfi Cuki</span><span>Built with intention / Jakarta, ID</span><a href="#top">Back to top ^</a></footer>
    </div>
  );
}
