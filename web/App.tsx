<!doctype html>
<!--
  Eye-candy marketing prototype.
  Note: this file is plain HTML (not compiled React) and is meant as a readable source for the GitHub Pages site.
-->
<html lang="en" class="dark">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="streamerStalker aggregates Twitch, Twitter/X, and VTuber news into high-signal Discord alerts."
    />
    <meta name="theme-color" content="#0e0e0e" />
    <meta name="color-scheme" content="dark" />

    <title>streamerStalker — Never Miss a Stream Again</title>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700;800&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
      rel="stylesheet"
    />

    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "error-container": "#a70138",
              "on-primary-fixed-variant": "#3c0080",
              "tertiary-fixed-dim": "#00e5ee",
              "on-error-container": "#ffb2b9",
              outline: "#777575",
              "secondary-fixed-dim": "#babfff",
              "on-surface": "#ffffff",
              "surface-variant": "#262626",
              "surface-container": "#1a1919",
              "inverse-primary": "#7a27e8",
              primary: "#c19cff",
              surface: "#0e0e0e",
              "on-tertiary-container": "#00575b",
              "tertiary-container": "#00f4fe",
              "on-primary-container": "#300069",
              "surface-dim": "#0e0e0e",
              "surface-container-low": "#131313",
              error: "#ff6e84",
              "surface-tint": "#c19cff",
              "error-dim": "#d73357",
              "on-error": "#490013",
              "outline-variant": "#494847",
              "on-tertiary": "#006165",
              "inverse-surface": "#fcf8f8",
              "primary-fixed-dim": "#ab78ff",
              "inverse-on-surface": "#565554",
              "on-secondary-fixed-variant": "#2f3bcc",
              background: "#0e0e0e",
              "surface-container-high": "#201f1f",
              "surface-container-lowest": "#000000",
              "tertiary-fixed": "#00f4fe",
              "on-primary-fixed": "#000000",
              "surface-container-highest": "#262626",
              "on-surface-variant": "#adaaaa",
              "secondary-fixed": "#cbceff",
              "on-tertiary-fixed": "#004346",
              "secondary-dim": "#5764f1",
              "primary-container": "#b68aff",
              "on-secondary-container": "#cacdff",
              "on-tertiary-fixed-variant": "#006266",
              secondary: "#8b95ff",
              "on-primary": "#3f0085",
              "on-background": "#ffffff",
              "secondary-container": "#222fc2",
              "primary-fixed": "#b68aff",
              "on-secondary-fixed": "#000fb0",
              "on-secondary": "#000776",
              "tertiary-dim": "#00e5ee",
              "surface-bright": "#2c2c2c",
              "primary-dim": "#9146ff",
              tertiary: "#a1faff"
            },
            fontFamily: {
              headline: ["Space Grotesk"],
              body: ["Inter"],
              label: ["Inter"]
            },
            borderRadius: { DEFAULT: "0.125rem", lg: "0.25rem", xl: "0.5rem", full: "0.75rem" }
          }
        }
      };
    </script>

    <style>
      :focus-visible {
        outline: 2px solid rgba(193, 156, 255, 0.75);
        outline-offset: 3px;
      }

      .skip-link {
        position: absolute;
        left: 0;
        top: -1000px;
        background: #131313;
        border: 1px solid rgba(193, 156, 255, 0.35);
        color: #ffffff;
        padding: 10px 14px;
        border-radius: 10px;
        z-index: 1000;
      }
      .skip-link:focus {
        top: 12px;
        left: 12px;
      }

      .material-symbols-outlined {
        font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
      }

      .neon-border {
        border: 1px solid rgba(193, 156, 255, 0.15);
      }

      .glass-card {
        background: rgba(26, 25, 25, 0.6);
        backdrop-filter: blur(20px);
      }

      .gradient-text {
        background: linear-gradient(45deg, #c19cff, #8b95ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.001ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.001ms !important;
          scroll-behavior: auto !important;
        }
      }
    </style>
  </head>

  <body class="bg-background text-on-surface font-body selection:bg-primary/30 selection:text-primary">
    <a class="skip-link" href="#main">Skip to content</a>

    <nav
      class="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 max-w-7xl mx-auto left-1/2 -translate-x-1/2 bg-[#131313]/80 backdrop-blur-md"
      aria-label="Top navigation"
    >
      <a class="text-2xl font-bold tracking-tighter text-[#c19cff] font-['Space_Grotesk']" href="#top">streamerStalker</a>
      <div class="hidden md:flex items-center gap-8 font-['Inter'] text-sm font-medium">
        <a
          class="text-[#c19cff] border-b-2 border-[#c19cff] pb-1 hover:text-white transition-colors duration-200"
          href="#features"
        >
          Features
        </a>
        <a class="text-[#adaaaa] hover:text-white transition-colors duration-200" href="#pricing">Pricing</a>
      </div>

      <a
        class="bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed px-5 py-2.5 rounded-lg font-headline font-bold text-sm scale-95 active:scale-90 transition-transform shadow-[0_0_15px_rgba(193,156,255,0.2)]"
        href="https://github.com/Qrytics/streamerStalker#getting-started"
        target="_blank"
        rel="noopener"
        aria-label="Get started (opens GitHub)"
      >
        Add to Discord
      </a>
    </nav>

    <main id="main" class="pt-24">
      <section
        id="top"
        class="relative min-h-[780px] flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        aria-label="Hero"
      >
        <div
          aria-hidden="true"
          class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -z-10"
        ></div>
        <div
          aria-hidden="true"
          class="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full -z-10"
        ></div>

        <div class="max-w-4xl mx-auto space-y-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/20 text-xs font-label uppercase tracking-[0.2em] text-primary">
            <span class="w-2 h-2 rounded-full bg-error animate-pulse" aria-hidden="true"></span>
            Live Intelligence Feed
          </div>

          <h1 class="font-headline text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] text-white">
            The Ultimate <span class="gradient-text">Discord Bot</span> for Your Streamer Intel
          </h1>

          <p class="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto font-body leading-relaxed">
            Aggregate real-time data from Twitch, Twitter/X, and VTuber networks directly into your Discord server.
            Precision tracking for the elite creator community.
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <a
              class="w-full sm:w-auto px-8 py-4 glass-card neon-border rounded-xl font-headline font-bold text-lg text-primary flex items-center justify-center gap-3 hover:bg-primary/10 transition-all duration-300 scale-95 active:scale-90"
              href="https://github.com/Qrytics/streamerStalker#getting-started"
              target="_blank"
              rel="noopener"
            >
              <span class="material-symbols-outlined" data-icon="add_box" aria-hidden="true">add_box</span>
              Add to Discord
            </a>
            <a
              class="w-full sm:w-auto px-8 py-4 rounded-xl font-headline font-bold text-lg text-on-surface-variant hover:text-white transition-all"
              href="#preview"
            >
              View Demo
            </a>
          </div>
        </div>

        <div class="mt-20 w-full max-w-6xl mx-auto rounded-t-2xl border-x border-t border-outline-variant/15 bg-surface-container-low p-4 shadow-2xl">
          <figure>
            <img
              alt="Preview of the streamerStalker dashboard interface"
              class="w-full rounded-t-xl opacity-80 grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY7kqQrCaUoyOQIAcVro9xp_qMam6ZJyQFkO-5qZ2_xtxfBRo63_JxZWLy2L9ddlOjrj8RmdivH51dajeUKgGzsY99ul5jWXjSBVS0DLvtHjqjAT8zl0anOgBFvvw6SRMfzP7KkCEmdPfkRiWcGHGJAPvH5SKPYq60r9dgEgqkvGIuDpQ1Rn-fooiXICZW7u-vjb9t-KYSvY2-wAKcEoXQ_QjtoTGCGh_1XSoEGk2qTRjoxGwfCd5VhBCVFRxz0HH281yROLEt2y01"
              loading="lazy"
              decoding="async"
              width="1400"
              height="720"
            />
          </figure>
        </div>
      </section>

      <section id="features" class="py-32 px-6 max-w-7xl mx-auto" aria-label="Features">
        <div class="mb-16 space-y-4">
          <h2 class="font-headline text-3xl md:text-5xl font-bold text-white">
            Advanced <span class="text-primary">Capabilities</span>
          </h2>
          <p class="text-on-surface-variant max-w-xl">Modular trackers designed for the modern streaming ecosystem.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-full md:h-[600px]">
          <div class="md:col-span-2 md:row-span-2 bg-surface-container-low rounded-xl p-8 neon-border flex flex-col justify-between group hover:bg-surface-container-high transition-all">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined text-3xl" aria-hidden="true">radio</span>
              </div>
              <h3 class="font-headline text-2xl font-bold text-white">Twitch Alerts</h3>
              <p class="text-on-surface-variant">Real-time go-live notifications with custom embeds, viewer count tracking, and stream category detection.</p>
            </div>
            <div class="mt-8 overflow-hidden rounded-lg">
              <img
                alt="Neon-themed illustration representing Twitch trackers"
                class="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEONHAKwb66ehZADu1Yhxj5FTmckGw9c1a49j_DY7HCR9osEU7hkhiRW6EMRCMTXt3kRWpCXT5-ItLwTTZrufKNlzGj4BLPjIGqw_6rozoGK97j_UirAdsYlhmq0_w49lS4s3DhB0_CvvcOz_TDEpxEwgcnWic7f2Fb0yo7aXRp3P0hdpTcW-0fdQq2Fdj9d2Yjeisnp8NrfTtM4CfMRz4RfeDBrbAYJXKfS3MIszyOCeBIaD02k1S9Ck40jR5w7tTtric61A1bvJ2"
                width="1200"
                height="400"
              />
            </div>
          </div>

          <div class="md:col-span-2 bg-surface-container-low rounded-xl p-8 border border-outline-variant/10 flex flex-col justify-between hover:bg-surface-container-high transition-all">
            <div class="flex justify-between items-start">
              <div class="space-y-4">
                <h3 class="font-headline text-xl font-bold text-white">Twitter/X Intelligence</h3>
                <p class="text-sm text-on-surface-variant">Track tweets, replies, and media from targeted creator accounts without leaving Discord.</p>
              </div>
              <div class="text-secondary" aria-hidden="true">
                <span class="material-symbols-outlined text-3xl">campaign</span>
              </div>
            </div>
            <div class="mt-8 h-40 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10" aria-hidden="true"></div>
          </div>

          <div class="md:col-span-1 bg-surface-container-low rounded-xl p-6 border border-outline-variant/10 flex flex-col gap-4 hover:bg-surface-container-high transition-all">
            <div class="text-tertiary" aria-hidden="true">
              <span class="material-symbols-outlined text-3xl">newspaper</span>
            </div>
            <h3 class="font-headline font-bold text-white">VTuber News</h3>
            <p class="text-xs text-on-surface-variant">Curated feed from major agencies and independent talents across the globe.</p>
          </div>

          <div class="md:col-span-1 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl p-6 border border-primary/20 flex flex-col gap-4 hover:brightness-125 transition-all">
            <div class="text-white" aria-hidden="true">
              <span class="material-symbols-outlined text-3xl">smart_toy</span>
            </div>
            <h3 class="font-headline font-bold text-white">AI Summaries</h3>
            <p class="text-xs text-white/70">GPT-powered TL;DR for long streams and thread conversations.</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" class="py-32 bg-surface-container-low/50" aria-label="How it works">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-20">
            <h2 class="font-headline text-4xl font-bold text-white">Operational Protocol</h2>
            <p class="text-on-surface-variant mt-4">Three steps to total server situational awareness.</p>
          </div>

          <div class="relative grid grid-cols-1 md:grid-cols-3 gap-12">
            <div class="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent -z-10" aria-hidden="true"></div>

            <ol class="contents">
              <li class="flex flex-col items-center text-center space-y-6">
                <div class="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center font-headline font-bold text-2xl text-primary border-2 border-primary/30 shadow-[0_0_20px_rgba(193,156,255,0.1)]">1</div>
                <div class="space-y-2">
                  <h4 class="font-headline font-bold text-xl text-white">Add Bot</h4>
                  <p class="text-on-surface-variant text-sm px-4">Authorize streamerStalker to your Discord server via the official OAuth portal.</p>
                </div>
              </li>
              <li class="flex flex-col items-center text-center space-y-6">
                <div class="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center font-headline font-bold text-2xl text-primary border-2 border-primary/30 shadow-[0_0_20px_rgba(193,156,255,0.1)]">2</div>
                <div class="space-y-2">
                  <h4 class="font-headline font-bold text-xl text-white">Choose Channels</h4>
                  <p class="text-on-surface-variant text-sm px-4">Select target streamers and assign specific Discord channels for each data feed.</p>
                </div>
              </li>
              <li class="flex flex-col items-center text-center space-y-6">
                <div class="w-16 h-16 rounded-full bg-primary flex items-center justify-center font-headline font-bold text-2xl text-on-primary shadow-[0_0_30px_rgba(193,156,255,0.4)]">3</div>
                <div class="space-y-2">
                  <h4 class="font-headline font-bold text-xl text-white">Get Alerts</h4>
                  <p class="text-on-surface-variant text-sm px-4">Receive lightning-fast intelligence updates directly in your server&apos;s feed.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section id="preview" class="py-20 px-6 max-w-7xl mx-auto" aria-label="Demo preview">
        <div class="flex flex-col gap-3 mb-10">
          <h2 class="font-headline text-4xl font-bold text-white">Live UI Preview</h2>
          <p class="text-on-surface-variant max-w-2xl">
            Eye candy, but built to hint at where the project can go: trackers, notifications, and AI insights in one place.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-hidden">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <span class="material-symbols-outlined text-primary" aria-hidden="true">dashboard</span>
                <span class="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant">Server Overview</span>
              </div>
              <p class="text-on-surface-variant text-sm">Status, counts, and the systems that are currently running.</p>
            </div>
            <div class="h-40 bg-gradient-to-br from-primary/10 to-secondary/10" aria-hidden="true"></div>
          </div>
          <div class="bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-hidden neon-border">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <span class="material-symbols-outlined text-primary" aria-hidden="true">videocam</span>
                <span class="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant">Twitch Trackers</span>
              </div>
              <p class="text-on-surface-variant text-sm">Go-live alerts with thumbnails and category detection.</p>
            </div>
            <div class="h-40 bg-gradient-to-br from-secondary/10 to-primary/10" aria-hidden="true"></div>
          </div>
          <div class="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl border border-primary/20 overflow-hidden">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <span class="material-symbols-outlined text-white" aria-hidden="true">smart_toy</span>
                <span class="text-[10px] uppercase tracking-[0.2em] font-bold text-white/80">AI Summaries</span>
              </div>
              <p class="text-white/70 text-sm">Optional TL;DR for vtuber news so you can scan and decide fast.</p>
            </div>
            <div class="h-40 bg-black/30" aria-hidden="true"></div>
          </div>
        </div>
      </section>

      <section id="pricing" class="py-32 px-6 bg-surface-container-low/30" aria-label="Pricing">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16 space-y-4">
            <h2 class="font-headline text-4xl md:text-5xl font-bold text-white">Pricing that scales with your community</h2>
            <p class="text-on-surface-variant max-w-2xl mx-auto">
              Start free. Upgrade when you want more automation, more insights, and better alert coverage.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div class="bg-surface-container-low rounded-2xl border border-outline-variant/10 p-8">
              <div class="flex items-start justify-between gap-6 mb-6">
                <div>
                  <h3 class="font-headline text-2xl font-bold text-white">Free</h3>
                  <p class="text-on-surface-variant text-sm mt-2">For small servers getting started</p>
                </div>
                <div class="text-white text-4xl font-headline font-bold">$0</div>
              </div>
              <ul class="space-y-3 text-on-surface-variant text-sm">
                <li class="flex gap-3">
                  <span class="material-symbols-outlined text-primary" aria-hidden="true">check_circle</span>
                  Twitch live alerts (core)
                </li>
                <li class="flex gap-3">
                  <span class="material-symbols-outlined text-primary" aria-hidden="true">check_circle</span>
                  Twitter/X updates
                </li>
                <li class="flex gap-3">
                  <span class="material-symbols-outlined text-primary" aria-hidden="true">check_circle</span>
                  VTuber news digest
                </li>
              </ul>
              <div class="mt-8">
                <a
                  class="inline-flex items-center justify-center w-full px-6 py-4 rounded-xl font-headline font-bold text-lg text-on-surface-variant hover:text-white border border-outline-variant/10 hover:bg-surface-bright transition-all"
                  href="https://github.com/Qrytics/streamerStalker#getting-started"
                  target="_blank"
                  rel="noopener"
                >
                  Start Free
                </a>
              </div>
            </div>

            <div class="bg-[#131313] rounded-2xl border border-primary/30 p-8 shadow-[0_0_35px_rgba(193,156,255,0.08)]">
              <div class="flex items-start justify-between gap-6 mb-6">
                <div>
                  <h3 class="font-headline text-2xl font-bold text-white">Pro</h3>
                  <p class="text-on-surface-variant text-sm mt-2">For serious communities that want signal</p>
                </div>
                <div class="text-white text-4xl font-headline font-bold">$19</div>
              </div>
              <ul class="space-y-3 text-on-surface-variant text-sm">
                <li class="flex gap-3">
                  <span class="material-symbols-outlined text-primary" aria-hidden="true">check_circle</span>
                  AI summaries for vtuber news
                </li>
                <li class="flex gap-3">
                  <span class="material-symbols-outlined text-primary" aria-hidden="true">check_circle</span>
                  Enhanced tracker operations + de-duplication
                </li>
                <li class="flex gap-3">
                  <span class="material-symbols-outlined text-primary" aria-hidden="true">check_circle</span>
                  Priority integration roadmap
                </li>
              </ul>
              <div class="mt-8">
                <a
                  class="inline-flex items-center justify-center w-full px-6 py-4 rounded-xl font-headline font-bold text-lg text-on-primary-fixed bg-gradient-to-r from-primary to-primary-dim hover:brightness-110 transition-all shadow-[0_0_25px_rgba(193,156,255,0.12)]"
                  href="https://github.com/Qrytics/streamerStalker#getting-started"
                  target="_blank"
                  rel="noopener"
                >
                  Upgrade to Pro
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-32 px-6">
        <div class="max-w-5xl mx-auto rounded-3xl bg-[#131313] p-12 md:p-20 text-center relative overflow-hidden border border-outline-variant/10">
          <div aria-hidden="true" class="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] -z-10"></div>
          <div aria-hidden="true" class="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blur-[80px] -z-10"></div>
          <h2 class="font-headline text-4xl md:text-6xl font-black text-white mb-8">
            Ready to evolve your <span class="gradient-text">community?</span>
          </h2>
          <p class="text-on-surface-variant text-lg mb-12 max-w-2xl mx-auto">Join 2,500+ Discord servers already utilizing streamerStalker intelligence.</p>
          <a
            class="inline-flex items-center justify-center bg-primary text-on-primary px-10 py-5 rounded-xl font-headline font-bold text-xl hover:bg-primary-container transition-all shadow-xl shadow-primary/20"
            href="https://github.com/Qrytics/streamerStalker#getting-started"
            target="_blank"
            rel="noopener"
          >
            Deploy to Server Now
          </a>
        </div>
      </section>

      <section class="py-24 px-6 max-w-7xl mx-auto" aria-label="Frequently asked questions">
        <div class="text-center mb-14">
          <h2 class="font-headline text-4xl font-bold text-white">FAQ</h2>
          <p class="text-on-surface-variant max-w-2xl mx-auto mt-4">Quick answers before you invite the bot.</p>
        </div>
        <div class="max-w-3xl mx-auto space-y-4">
          <details class="bg-surface-container-low rounded-xl border border-outline-variant/10 p-6">
            <summary class="cursor-pointer font-headline font-bold text-white">What platforms does streamerStalker support?</summary>
            <p class="text-on-surface-variant text-sm mt-3">Twitch live status, Twitter/X updates (via RSS), and VTuber news digests from curated sources.</p>
          </details>
          <details class="bg-surface-container-low rounded-xl border border-outline-variant/10 p-6">
            <summary class="cursor-pointer font-headline font-bold text-white">How does de-duplication work?</summary>
            <p class="text-on-surface-variant text-sm mt-3">The bot caches recently posted items so you only get the notification once.</p>
          </details>
          <details class="bg-surface-container-low rounded-xl border border-outline-variant/10 p-6">
            <summary class="cursor-pointer font-headline font-bold text-white">Is OpenAI required?</summary>
            <p class="text-on-surface-variant text-sm mt-3">No. AI summaries are optional and run only if you configure an OpenAI API key.</p>
          </details>
          <details class="bg-surface-container-low rounded-xl border border-outline-variant/10 p-6">
            <summary class="cursor-pointer font-headline font-bold text-white">Where do I start?</summary>
            <p class="text-on-surface-variant text-sm mt-3">Follow the setup guide on GitHub. It includes Discord, Twitch, and database configuration.</p>
          </details>
        </div>
      </section>
    </main>

    <footer class="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center bg-[#0e0e0e] border-t border-[#494847]/15">
      <div class="mb-8 md:mb-0">
        <div class="text-[#c19cff] font-['Space_Grotesk'] text-xl font-bold mb-2">streamerStalker</div>
        <p class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa]">© 2024 streamerStalker Intelligence. All rights reserved.</p>
      </div>
      <div class="flex gap-8">
        <a class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa] hover:text-[#c19cff] transition-all opacity-80 hover:opacity-100" href="https://github.com/Qrytics/streamerStalker/blob/main/LICENSE" target="_blank" rel="noopener">Terms</a>
        <a class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa] hover:text-[#c19cff] transition-all opacity-80 hover:opacity-100" href="https://github.com/Qrytics/streamerStalker" target="_blank" rel="noopener">Privacy</a>
        <a class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa] hover:text-[#c19cff] transition-all opacity-80 hover:opacity-100" href="https://github.com/Qrytics/streamerStalker" target="_blank" rel="noopener">Status</a>
        <a class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa] hover:text-[#c19cff] transition-all opacity-80 hover:opacity-100" href="https://github.com/Qrytics/streamerStalker/issues" target="_blank" rel="noopener">Support</a>
      </div>
    </footer>
  </body>
</html>

<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>streamerStalker | High-End Digital Intelligence</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Space+Grotesk:wght@500;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              colors: {
                "error-container": "#a70138",
                "on-primary-fixed-variant": "#3c0080",
                "tertiary-fixed-dim": "#00e5ee",
                "on-error-container": "#ffb2b9",
                "outline": "#777575",
                "secondary-fixed-dim": "#babfff",
                "on-surface": "#ffffff",
                "surface-variant": "#262626",
                "surface-container": "#1a1919",
                "inverse-primary": "#7a27e8",
                "primary": "#c19cff",
                "surface": "#0e0e0e",
                "on-tertiary-container": "#00575b",
                "tertiary-container": "#00f4fe",
                "on-primary-container": "#300069",
                "surface-dim": "#0e0e0e",
                "surface-container-low": "#131313",
                "error": "#ff6e84",
                "surface-tint": "#c19cff",
                "error-dim": "#d73357",
                "on-error": "#490013",
                "outline-variant": "#494847",
                "on-tertiary": "#006165",
                "inverse-surface": "#fcf8f8",
                "primary-fixed-dim": "#ab78ff",
                "inverse-on-surface": "#565554",
                "on-secondary-fixed-variant": "#2f3bcc",
                "background": "#0e0e0e",
                "surface-container-high": "#201f1f",
                "surface-container-lowest": "#000000",
                "tertiary-fixed": "#00f4fe",
                "on-primary-fixed": "#000000",
                "surface-container-highest": "#262626",
                "on-surface-variant": "#adaaaa",
                "secondary-fixed": "#cbceff",
                "on-tertiary-fixed": "#004346",
                "secondary-dim": "#5764f1",
                "primary-container": "#b68aff",
                "on-secondary-container": "#cacdff",
                "on-tertiary-fixed-variant": "#006266",
                "secondary": "#8b95ff",
                "on-primary": "#3f0085",
                "on-background": "#ffffff",
                "secondary-container": "#222fc2",
                "primary-fixed": "#b68aff",
                "on-secondary-fixed": "#000fb0",
                "on-secondary": "#000776",
                "tertiary-dim": "#00e5ee",
                "surface-bright": "#2c2c2c",
                "primary-dim": "#9146ff",
                "tertiary": "#a1faff"
              },
              fontFamily: {
                "headline": ["Space Grotesk"],
                "body": ["Inter"],
                "label": ["Inter"]
              },
              borderRadius: {"DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem"},
            },
          },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .neon-border {
            border: 1px solid rgba(193, 156, 255, 0.15);
        }
        .glass-card {
            background: rgba(26, 25, 25, 0.6);
            backdrop-filter: blur(20px);
        }
        .gradient-text {
            background: linear-gradient(45deg, #c19cff, #8b95ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    </style>
</head>
<body class="bg-background text-on-surface font-body selection:bg-primary/30 selection:text-primary">
<!-- TopNavBar -->
<nav class="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 max-w-7xl mx-auto left-1/2 -translate-x-1/2 bg-[#131313]/80 backdrop-blur-md">
<div class="text-2xl font-bold tracking-tighter text-[#c19cff] font-['Space_Grotesk']">
            streamerStalker
        </div>
<div class="hidden md:flex items-center gap-8 font-['Inter'] text-sm font-medium">
<a class="text-[#c19cff] border-b-2 border-[#c19cff] pb-1 hover:text-white transition-colors duration-200" href="#">Features</a>
<a class="text-[#adaaaa] hover:text-white transition-colors duration-200" href="#">Pricing</a>
</div>
<button class="bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed px-5 py-2.5 rounded-lg font-headline font-bold text-sm scale-95 active:scale-90 transition-transform shadow-[0_0_15px_rgba(193,156,255,0.2)]">
            Add to Discord
        </button>
</nav>
<main class="pt-24">
<!-- Hero Section -->
<section class="relative min-h-[819px] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
<!-- Background Elements -->
<div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -z-10"></div>
<div class="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full -z-10"></div>
<div class="max-w-4xl mx-auto space-y-8">
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/20 text-xs font-label uppercase tracking-[0.2em] text-primary">
<span class="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                    Live Intelligence Feed
                </div>
<h1 class="font-headline text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] text-white">
                    The Ultimate <span class="gradient-text">Discord Bot</span> for Your Streamer Intel
                </h1>
<p class="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto font-body leading-relaxed">
                    Aggregate real-time data from Twitch, Twitter, and VTuber networks directly into your Discord server. Precision tracking for the elite creator community.
                </p>
<div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
<button class="w-full sm:w-auto px-8 py-4 glass-card neon-border rounded-xl font-headline font-bold text-lg text-primary flex items-center justify-center gap-3 hover:bg-primary/10 transition-all duration-300 scale-95 active:scale-90">
<span class="material-symbols-outlined" data-icon="add_box">add_box</span>
                        Add to Discord
                    </button>
<button class="w-full sm:w-auto px-8 py-4 rounded-xl font-headline font-bold text-lg text-on-surface-variant hover:text-white transition-all">
                        View Demo
                    </button>
</div>
</div>
<!-- Dashboard Preview Overlap -->
<div class="mt-20 w-full max-w-6xl mx-auto rounded-t-2xl border-x border-t border-outline-variant/15 bg-surface-container-low p-4 shadow-2xl">
<img alt="Intelligence Dashboard" class="w-full rounded-t-xl opacity-80 grayscale-[0.2] hover:grayscale-0 transition-all duration-700" data-alt="Futuristic dark mode dashboard interface with purple neon accents" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY7kqQrCaUoyOQIAcVro9xp_qMam6ZJyQFkO-5qZ2_xtxfBRo63_JxZWLy2L9ddlOjrj8RmdivH51dajeUKgGzsY99ul5jWXjSBVS0DLvtHjqjAT8zl0anOgBFvvw6SRMfzP7KkCEmdPfkRiWcGHGJAPvH5SKPYq60r9dgEgqkvGIuDpQ1Rn-fooiXICZW7u-vjb9t-KYSvY2-wAKcEoXQ_QjtoTGCGh_1XSoEGk2qTRjoxGwfCd5VhBCVFRxz0HH281yROLEt2y01"/>
</div>
</section>
<!-- Feature Grid (Bento Style) -->
<section class="py-32 px-6 max-w-7xl mx-auto">
<div class="mb-16 space-y-4">
<h2 class="font-headline text-3xl md:text-5xl font-bold text-white">Advanced <span class="text-primary">Capabilities</span></h2>
<p class="text-on-surface-variant max-w-xl">Harness the power of modular trackers designed for the modern streaming ecosystem.</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-full md:h-[600px]">
<!-- Twitch Alerts (Large) -->
<div class="md:col-span-2 md:row-span-2 bg-surface-container-low rounded-xl p-8 neon-border flex flex-col justify-between group hover:bg-surface-container-high transition-all">
<div class="space-y-4">
<div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-3xl" data-icon="radio">radio</span>
</div>
<h3 class="font-headline text-2xl font-bold text-white">Twitch Alerts</h3>
<p class="text-on-surface-variant">Real-time go-live notifications with custom embeds, viewer count tracking, and stream category detection.</p>
</div>
<div class="mt-8 overflow-hidden rounded-lg">
<img alt="Twitch Trackers" class="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Streaming setup with neon purple lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEONHAKwb66ehZADu1Yhxj5FTmckGw9c1a49j_DY7HCR9osEU7hkhiRW6EMRCMTXt3kRWpCXT5-ItLwTTZrufKNlzGj4BLPjIGqw_6rozoGK97j_UirAdsYlhmq0_w49lS4s3DhB0_CvvcOz_TDEpxEwgcnWic7f2Fb0yo7aXRp3P0hdpTcW-0fdQq2Fdj9d2Yjeisnp8NrfTtM4CfMRz4RfeDBrbAYJXKfS3MIszyOCeBIaD02k1S9Ck40jR5w7tTtric61A1bvJ2"/>
</div>
</div>
<!-- Twitter Updates -->
<div class="md:col-span-2 bg-surface-container-low rounded-xl p-8 border border-outline-variant/10 flex flex-col justify-between hover:bg-surface-container-high transition-all">
<div class="flex justify-between items-start">
<div class="space-y-4">
<h3 class="font-headline text-xl font-bold text-white">Twitter/X Intelligence</h3>
<p class="text-sm text-on-surface-variant">Track tweets, replies, and media from targeted creator accounts without leaving Discord.</p>
</div>
<div class="text-secondary">
<span class="material-symbols-outlined text-3xl" data-icon="campaign">campaign</span>
</div>
</div>
</div>
<!-- VTuber News -->
<div class="md:col-span-1 bg-surface-container-low rounded-xl p-6 border border-outline-variant/10 flex flex-col gap-4 hover:bg-surface-container-high transition-all">
<div class="text-tertiary">
<span class="material-symbols-outlined text-3xl" data-icon="newspaper">newspaper</span>
</div>
<h3 class="font-headline font-bold text-white">VTuber News</h3>
<p class="text-xs text-on-surface-variant">Curated feed from major agencies and independent talents across the globe.</p>
</div>
<!-- AI Summaries -->
<div class="md:col-span-1 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl p-6 border border-primary/20 flex flex-col gap-4 hover:brightness-125 transition-all">
<div class="text-white">
<span class="material-symbols-outlined text-3xl" data-icon="smart_toy">smart_toy</span>
</div>
<h3 class="font-headline font-bold text-white">AI Summaries</h3>
<p class="text-xs text-white/70">GPT-powered TL;DR for long streams and thread conversations.</p>
</div>
</div>
</section>
<!-- How it Works Stepper -->
<section class="py-32 bg-surface-container-low/50">
<div class="max-w-7xl mx-auto px-6">
<div class="text-center mb-20">
<h2 class="font-headline text-4xl font-bold text-white">Operational Protocol</h2>
<p class="text-on-surface-variant mt-4">Three steps to total server situational awareness.</p>
</div>
<div class="relative grid grid-cols-1 md:grid-cols-3 gap-12">
<!-- Connector Line -->
<div class="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent -z-10"></div>
<!-- Step 1 -->
<div class="flex flex-col items-center text-center space-y-6">
<div class="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center font-headline font-bold text-2xl text-primary border-2 border-primary/30 shadow-[0_0_20px_rgba(193,156,255,0.1)]">
                            1
                        </div>
<div class="space-y-2">
<h4 class="font-headline font-bold text-xl text-white">Add Bot</h4>
<p class="text-on-surface-variant text-sm px-4">Authorize streamerStalker to your Discord server via the official OAuth portal.</p>
</div>
</div>
<!-- Step 2 -->
<div class="flex flex-col items-center text-center space-y-6">
<div class="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center font-headline font-bold text-2xl text-primary border-2 border-primary/30 shadow-[0_0_20px_rgba(193,156,255,0.1)]">
                            2
                        </div>
<div class="space-y-2">
<h4 class="font-headline font-bold text-xl text-white">Choose Channels</h4>
<p class="text-on-surface-variant text-sm px-4">Select target streamers and assign specific Discord channels for each data feed.</p>
</div>
</div>
<!-- Step 3 -->
<div class="flex flex-col items-center text-center space-y-6">
<div class="w-16 h-16 rounded-full bg-primary flex items-center justify-center font-headline font-bold text-2xl text-on-primary shadow-[0_0_30px_rgba(193,156,255,0.4)]">
                            3
                        </div>
<div class="space-y-2">
<h4 class="font-headline font-bold text-xl text-white">Get Alerts</h4>
<p class="text-on-surface-variant text-sm px-4">Receive lightning-fast intelligence updates directly in your server's feed.</p>
</div>
</div>
</div>
</div>
</section>
<!-- CTA Section -->
<section class="py-32 px-6">
<div class="max-w-5xl mx-auto rounded-3xl bg-[#131313] p-12 md:p-20 text-center relative overflow-hidden border border-outline-variant/10">
<div class="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] -z-10"></div>
<div class="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blur-[80px] -z-10"></div>
<h2 class="font-headline text-4xl md:text-6xl font-black text-white mb-8">Ready to evolve your <span class="gradient-text">community?</span></h2>
<p class="text-on-surface-variant text-lg mb-12 max-w-2xl mx-auto">Join 2,500+ Discord servers already utilizing streamerStalker intelligence.</p>
<button class="bg-primary text-on-primary px-10 py-5 rounded-xl font-headline font-bold text-xl hover:bg-primary-container transition-all shadow-xl shadow-primary/20">
                    Deploy to Server Now
                </button>
</div>
</section>
</main>
<!-- Footer -->
<footer class="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center bg-[#0e0e0e] border-t border-[#494847]/15">
<div class="mb-8 md:mb-0">
<div class="text-[#c19cff] font-['Space_Grotesk'] text-xl font-bold mb-2">streamerStalker</div>
<p class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa]">© 2024 streamerStalker Intelligence. All rights reserved.</p>
</div>
<div class="flex gap-8">
<a class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa] hover:text-[#c19cff] transition-all opacity-80 hover:opacity-100" href="#">Terms</a>
<a class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa] hover:text-[#c19cff] transition-all opacity-80 hover:opacity-100" href="#">Privacy</a>
<a class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa] hover:text-[#c19cff] transition-all opacity-80 hover:opacity-100" href="#">Status</a>
<a class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa] hover:text-[#c19cff] transition-all opacity-80 hover:opacity-100" href="#">Support</a>
</div>
</footer>
</body></html>


<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>streamerStalker | Intelligence Feed</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&amp;family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "error-container": "#a70138",
              "on-primary-fixed-variant": "#3c0080",
              "tertiary-fixed-dim": "#00e5ee",
              "on-error-container": "#ffb2b9",
              "outline": "#777575",
              "secondary-fixed-dim": "#babfff",
              "on-surface": "#ffffff",
              "surface-variant": "#262626",
              "surface-container": "#1a1919",
              "inverse-primary": "#7a27e8",
              "primary": "#c19cff",
              "surface": "#0e0e0e",
              "on-tertiary-container": "#00575b",
              "tertiary-container": "#00f4fe",
              "on-primary-container": "#300069",
              "surface-dim": "#0e0e0e",
              "surface-container-low": "#131313",
              "error": "#ff6e84",
              "surface-tint": "#c19cff",
              "error-dim": "#d73357",
              "on-error": "#490013",
              "outline-variant": "#494847",
              "on-tertiary": "#006165",
              "inverse-surface": "#fcf8f8",
              "primary-fixed-dim": "#ab78ff",
              "inverse-on-surface": "#565554",
              "on-secondary-fixed-variant": "#2f3bcc",
              "background": "#0e0e0e",
              "surface-container-high": "#201f1f",
              "surface-container-lowest": "#000000",
              "tertiary-fixed": "#00f4fe",
              "on-primary-fixed": "#000000",
              "surface-container-highest": "#262626",
              "on-surface-variant": "#adaaaa",
              "secondary-fixed": "#cbceff",
              "on-tertiary-fixed": "#004346",
              "secondary-dim": "#5764f1",
              "primary-container": "#b68aff",
              "on-secondary-container": "#cacdff",
              "on-tertiary-fixed-variant": "#006266",
              "secondary": "#8b95ff",
              "on-primary": "#3f0085",
              "on-background": "#ffffff",
              "secondary-container": "#222fc2",
              "primary-fixed": "#b68aff",
              "on-secondary-fixed": "#000fb0",
              "on-secondary": "#000776",
              "tertiary-dim": "#00e5ee",
              "surface-bright": "#2c2c2c",
              "primary-dim": "#9146ff",
              "tertiary": "#a1faff"
            },
            fontFamily: {
              "headline": ["Space Grotesk"],
              "body": ["Inter"],
              "label": ["Inter"]
            },
            borderRadius: {"DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem"},
          },
        },
      }
    </script>
<style>
        body {
            background-color: #0e0e0e;
            color: #ffffff;
            font-family: 'Inter', sans-serif;
        }
        .glass-panel {
            background: rgba(38, 38, 38, 0.6);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
        }
        .neon-border-live {
            border: 1px solid transparent;
            background: linear-gradient(#1a1919, #1a1919) padding-box,
                        linear-gradient(45deg, #8b95ff, #c19cff) border-box;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
        .status-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .5; }
        }
    </style>
</head>
<body class="bg-background text-on-surface selection:bg-primary selection:text-on-primary">
<!-- SideNavBar Shell -->
<aside class="fixed left-0 top-0 h-full flex flex-col py-6 bg-[#0e0e0e] w-64 border-r border-[#494847]/15 z-50 hidden md:flex">
<div class="px-6 mb-10">
<h1 class="text-xl font-black text-[#c19cff] font-['Space_Grotesk'] tracking-tighter">streamerStalker</h1>
<p class="font-['Inter'] text-sm font-medium tracking-wide text-[#adaaaa] mt-1">Intelligence Feed</p>
</div>
<nav class="flex-1 space-y-1 px-3">
<a class="flex items-center px-3 py-3 font-['Inter'] text-sm font-medium tracking-wide text-[#adaaaa] hover:bg-[#262626] hover:text-white transition-all rounded-lg group" href="#">
<span class="material-symbols-outlined mr-3 text-lg">dashboard</span>
                Server Overview
            </a>
<a class="flex items-center px-3 py-3 font-['Inter'] text-sm font-medium tracking-wide bg-gradient-to-r from-[#9146ff]/20 to-transparent text-[#c19cff] border-l-4 border-[#c19cff] translate-x-1 duration-150 rounded-r-lg group" href="#">
<span class="material-symbols-outlined mr-3 text-lg">videocam</span>
                Twitch Trackers
            </a>
<a class="flex items-center px-3 py-3 font-['Inter'] text-sm font-medium tracking-wide text-[#adaaaa] hover:bg-[#262626] hover:text-white transition-all rounded-lg group" href="#">
<span class="material-symbols-outlined mr-3 text-lg">campaign</span>
                Twitter/X
            </a>
<a class="flex items-center px-3 py-3 font-['Inter'] text-sm font-medium tracking-wide text-[#adaaaa] hover:bg-[#262626] hover:text-white transition-all rounded-lg group" href="#">
<span class="material-symbols-outlined mr-3 text-lg">newspaper</span>
                VTuber News
            </a>
</nav>
<div class="px-6 mb-6">
<button class="w-full py-3 bg-gradient-to-r from-[#c19cff] to-[#9146ff] text-black font-bold rounded-lg text-sm transition-transform active:scale-95">
                Upgrade to Pro
            </button>
</div>
<div class="px-3 border-t border-[#494847]/15 pt-6 space-y-1">
<a class="flex items-center px-3 py-3 font-['Inter'] text-sm font-medium tracking-wide text-[#adaaaa] hover:bg-[#262626] hover:text-white transition-all rounded-lg group" href="#">
<span class="material-symbols-outlined mr-3 text-lg">settings</span>
                Settings
            </a>
<a class="flex items-center px-3 py-3 font-['Inter'] text-sm font-medium tracking-wide text-[#adaaaa] hover:bg-[#262626] hover:text-white transition-all rounded-lg group" href="#">
<span class="material-symbols-outlined mr-3 text-lg">logout</span>
                Logout
            </a>
</div>
</aside>
<!-- Main Content Area -->
<main class="md:ml-64 min-h-screen bg-background">
<!-- TopAppBar Mobile / Desktop Header -->
<header class="sticky top-0 w-full z-40 flex justify-between items-center px-6 py-6 bg-[#131313] md:bg-transparent">
<div class="md:hidden">
<h1 class="text-2xl font-bold tracking-tighter text-[#c19cff] font-['Space_Grotesk']">streamerStalker</h1>
</div>
<div class="hidden md:block">
<h2 class="font-headline text-2xl font-bold tracking-tight">Management View</h2>
</div>
<div class="flex items-center gap-4">
<div class="flex items-center gap-2 px-3 py-1.5 bg-surface-container-highest rounded-full border border-outline-variant/15">
<div class="w-2 h-2 rounded-full bg-error status-pulse"></div>
<span class="text-xs font-label uppercase tracking-widest text-on-surface-variant">System Live</span>
</div>
<img alt="User Profile" class="w-10 h-10 rounded-full border border-primary/20" data-alt="Cyberpunk style user profile avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7A2Jv9Ih71BUxDrjyQawudDR4MZHWg2XAabEG4CMo0HerHQhIqx4GylIHhij0_7BaHN8yXy0Jlws0yHIwz-QQz4mswNeNAX2D5j3_jBcF6fqxtueMHKmVKlZd0hpH0VU0F9PGOfhxxztVnSBnwsYCiZ0ZGHgQS3b4d_B4H2gR9C1DSkuKHs2Fk28V9kkDMKHoejgGeJseo7YxJ_e4f46y8TQ9XVwjcFWcXp0uMyzBxqG991hPimNXY1BBrdFbJ-Ju4zKmRcYRH9tv"/>
</div>
</header>
<div class="px-6 pb-20 max-w-7xl mx-auto space-y-12">
<!-- Quick Add Form -->
<section class="mt-8">
<div class="surface-container-low p-8 rounded-xl border border-outline-variant/10 relative overflow-hidden">
<div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
<h3 class="font-headline text-lg font-bold mb-6 flex items-center gap-2">
<span class="material-symbols-outlined text-primary">add_circle</span>
                        Deploy New Tracker
                    </h3>
<div class="grid grid-cols-1 md:grid-cols-12 gap-4 relative z-10">
<div class="md:col-span-3">
<label class="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2 ml-1">Platform</label>
<div class="relative">
<select class="w-full bg-surface-container-highest border-0 focus:ring-1 focus:ring-secondary/40 text-on-surface rounded-lg py-3 px-4 appearance-none font-body text-sm">
<option>Twitch</option>
<option>Twitter/X</option>
<option>VTuber News</option>
</select>
<span class="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-on-surface-variant">expand_more</span>
</div>
</div>
<div class="md:col-span-6">
<label class="block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2 ml-1">Channel Username</label>
<input class="w-full bg-surface-container-highest border-0 focus:ring-1 focus:ring-secondary/40 text-on-surface rounded-lg py-3 px-4 font-body text-sm placeholder:text-outline" placeholder="e.g. shroud" type="text"/>
</div>
<div class="md:col-span-3 flex items-end">
<button class="w-full glass-panel py-3 border border-primary/30 text-primary font-bold rounded-lg text-sm hover:bg-primary/10 transition-all flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-sm">rocket_launch</span>
                                Initialize Tracker
                            </button>
</div>
</div>
</div>
</section>
<!-- Active Trackers Feed -->
<section>
<div class="flex justify-between items-end mb-8">
<div>
<h3 class="font-headline text-2xl font-bold tracking-tight">Active Intelligence Nodes</h3>
<p class="text-on-surface-variant font-body text-sm mt-1">Currently monitoring 14 distinct data streams across 3 platforms.</p>
</div>
<div class="hidden sm:flex gap-2">
<button class="p-2 bg-surface-container-highest rounded-lg text-on-surface-variant hover:text-on-surface"><span class="material-symbols-outlined">filter_list</span></button>
<button class="p-2 bg-surface-container-highest rounded-lg text-on-surface-variant hover:text-on-surface"><span class="material-symbols-outlined">grid_view</span></button>
</div>
</div>
<!-- Intelligence Table -->
<div class="space-y-3">
<!-- Row Header (Desktop) -->
<div class="hidden md:grid grid-cols-12 px-6 py-2 text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant">
<div class="col-span-5">Entity / Stream</div>
<div class="col-span-2">Platform</div>
<div class="col-span-2">Current Status</div>
<div class="col-span-3 text-right">Operations</div>
</div>
<!-- Row 1 -->
<div class="grid grid-cols-1 md:grid-cols-12 items-center gap-4 bg-surface-container-low hover:bg-surface-bright p-4 md:px-6 md:py-4 rounded-xl transition-all group border border-outline-variant/5">
<div class="col-span-5 flex items-center gap-4">
<div class="relative">
<img alt="Streamer" class="w-12 h-12 rounded-lg border border-outline-variant/20" data-alt="Esports player portrait avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOUppEAuBKbkATrL6qc9i5_kyRLNutNMw5oivc-38j1JejetUHVAEjfykHkDmtCjKhNvBUsODVipQrAERDCNV1B6cUrGDZge9-q6fKIjsFs0t2ZgmK5iUQjEIfrKvxCqeFYSTKiqQ1G81hdBlwvwQyWlO6KHBjpI05fi4xMdeO4RapM0Q2cPv-4puHfTdNN7RAS8kgpXykPolnkOgzt6lws4RhnsreRfj380jIH7YLlbLI5tcFmrA0ijDhv7lAhTeP_lxuiwxdERkC"/>
<div class="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full border-2 border-surface status-pulse"></div>
</div>
<div>
<h4 class="font-headline font-bold text-on-surface">Ace_Sniper_Elite</h4>
<p class="text-xs text-on-surface-variant font-body tracking-tight">Last activity: 2 mins ago</p>
</div>
</div>
<div class="col-span-2 flex items-center">
<div class="flex items-center gap-2 px-3 py-1 bg-surface-container-highest rounded-full">
<span class="material-symbols-outlined text-primary text-sm">videocam</span>
<span class="text-xs font-medium">Twitch</span>
</div>
</div>
<div class="col-span-2">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-error-container/20 text-error border border-error/30 uppercase tracking-widest">
<span class="w-1.5 h-1.5 rounded-full bg-error mr-2"></span> LIVE
                            </span>
</div>
<div class="col-span-3 flex justify-end gap-2">
<button class="p-2 hover:bg-primary/10 rounded-lg text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined text-xl">edit</span>
</button>
<button class="p-2 hover:bg-error/10 rounded-lg text-on-surface-variant hover:text-error transition-colors">
<span class="material-symbols-outlined text-xl">delete</span>
</button>
<button class="px-4 py-2 bg-surface-container-highest text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                VIEW LOGS
                            </button>
</div>
</div>
<!-- Row 2 -->
<div class="grid grid-cols-1 md:grid-cols-12 items-center gap-4 bg-surface-container-low hover:bg-surface-bright p-4 md:px-6 md:py-4 rounded-xl transition-all group border border-outline-variant/5">
<div class="col-span-5 flex items-center gap-4">
<img alt="Streamer" class="w-12 h-12 rounded-lg border border-outline-variant/20 grayscale" data-alt="Technical professional profile avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCr6BWUhyiLQOQ-ppu5QratGCXtJDqK5QiHlReZVsQdaM9jWTZfgcmMT3taomCSKIhPKXqJe5vQfL6gc6wfaNSkZ_laMkn1MRwJpfVP8SG1xhh3mW41Nkv6gGIbwAOGA_hAcd0H9mjCtxiZSDPP46tm3XFRXjz6a-_E4G7Yw20jQR86Ph7hkr-d-bl_ly36bAxAxX2M3Pml_Tnb8IFN_0sRYqjexo3x7kJdVmNAeQ6jetBpfA5eW6Ot9otaQnxUsSSabo2wIPYgRQpx"/>
<div>
<h4 class="font-headline font-bold text-on-surface-variant group-hover:text-on-surface transition-colors">Digital_Nomad_VT</h4>
<p class="text-xs text-outline font-body tracking-tight">Offline since 04:30 AM</p>
</div>
</div>
<div class="col-span-2 flex items-center">
<div class="flex items-center gap-2 px-3 py-1 bg-surface-container-highest rounded-full opacity-60">
<span class="material-symbols-outlined text-on-surface-variant text-sm">newspaper</span>
<span class="text-xs font-medium">VTuber</span>
</div>
</div>
<div class="col-span-2">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-surface-container-highest text-outline border border-outline-variant/30 uppercase tracking-widest">
                                OFFLINE
                            </span>
</div>
<div class="col-span-3 flex justify-end gap-2">
<button class="p-2 hover:bg-primary/10 rounded-lg text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined text-xl">edit</span>
</button>
<button class="p-2 hover:bg-error/10 rounded-lg text-on-surface-variant hover:text-error transition-colors">
<span class="material-symbols-outlined text-xl">delete</span>
</button>
<button class="px-4 py-2 bg-surface-container-highest text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                VIEW LOGS
                            </button>
</div>
</div>
<!-- Row 3 (Featured/Pinned Node) -->
<div class="grid grid-cols-1 md:grid-cols-12 items-center gap-4 neon-border-live p-4 md:px-6 md:py-4 rounded-xl transition-all group relative">
<div class="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-full"></div>
<div class="col-span-5 flex items-center gap-4">
<div class="relative">
<img alt="Streamer" class="w-12 h-12 rounded-lg" data-alt="High quality 3D render avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc5_Vt2pCSBHf7mDIf331ToA7wkFeUo06cWMnt5F-hOKHX4mWo8k7h1vjtFr1liVwC2I7vQ8DB5WFwNH71w0JtTeSElls1pFzemhn-Jjn_aavyWyNKOdAU5XODUpVfcw3AyDVUQOjGyLU3ALMkjOttgOPwZUDHnwHggoYTamRgmk5aRfl0Q5SxTVvyIm47FfH7AJa85VwhM2zzJyzJzBlqibO7jGMiazM63yjJi37EGU3pYyS1AFkBz-JqcIHymKLIcU_9aw0GOldz"/>
<div class="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full border-2 border-surface status-pulse"></div>
</div>
<div>
<h4 class="font-headline font-bold text-on-surface flex items-center gap-2">
                                    Official_ST_News
                                    <span class="material-symbols-outlined text-primary text-[14px]" style="font-variation-settings: 'FILL' 1;">verified</span>
</h4>
<p class="text-xs text-primary font-body tracking-tight font-medium">Trending Spike: +420% activity</p>
</div>
</div>
<div class="col-span-2 flex items-center">
<div class="flex items-center gap-2 px-3 py-1 bg-surface-container-highest rounded-full">
<span class="material-symbols-outlined text-secondary text-sm">campaign</span>
<span class="text-xs font-medium">Twitter</span>
</div>
</div>
<div class="col-span-2">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-error-container/20 text-error border border-error/30 uppercase tracking-widest">
<span class="w-1.5 h-1.5 rounded-full bg-error mr-2"></span> URGENT
                            </span>
</div>
<div class="col-span-3 flex justify-end gap-2">
<button class="p-2 hover:bg-primary/10 rounded-lg text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined text-xl">edit</span>
</button>
<button class="p-2 hover:bg-error/10 rounded-lg text-on-surface-variant hover:text-error transition-colors">
<span class="material-symbols-outlined text-xl">delete</span>
</button>
<button class="px-4 py-2 bg-primary text-black text-xs font-bold rounded-lg transition-transform active:scale-95">
                                ANALYZE
                            </button>
</div>
</div>
</div>
</section>
<!-- Metrics / Bento Section -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-6">
<div class="surface-container-low p-6 rounded-xl border border-outline-variant/10 flex flex-col justify-between">
<div>
<span class="text-[10px] uppercase font-bold text-on-surface-variant tracking-[0.2em]">Total Notifications</span>
<div class="font-headline text-4xl font-bold mt-2">1,284</div>
</div>
<div class="mt-6 flex items-center text-xs text-tertiary-dim gap-1">
<span class="material-symbols-outlined text-sm">trending_up</span>
                        +12% from yesterday
                    </div>
</div>
<div class="surface-container-low p-6 rounded-xl border border-outline-variant/10 flex flex-col justify-between">
<div>
<span class="text-[10px] uppercase font-bold text-on-surface-variant tracking-[0.2em]">API Latency</span>
<div class="font-headline text-4xl font-bold mt-2">42ms</div>
</div>
<div class="mt-6 flex items-center text-xs text-secondary gap-1">
<span class="material-symbols-outlined text-sm">check_circle</span>
                        All systems operational
                    </div>
</div>
<div class="surface-container-low p-6 rounded-xl border border-outline-variant/10 flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:bg-surface-bright transition-colors">
<div class="relative z-10">
<span class="text-[10px] uppercase font-bold text-on-surface-variant tracking-[0.2em]">Discord Webhooks</span>
<div class="font-headline text-4xl font-bold mt-2">8 Active</div>
</div>
<div class="mt-6 relative z-10 flex items-center text-xs text-primary gap-1 font-bold">
                        Configure Endpoints <span class="material-symbols-outlined text-sm">arrow_forward</span>
</div>
<span class="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl opacity-5 group-hover:opacity-10 transition-opacity rotate-12">hub</span>
</div>
</section>
</div>
<!-- Footer -->
<footer class="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center border-t border-[#494847]/15">
<div class="mb-6 md:mb-0">
<span class="text-[#c19cff] font-['Space_Grotesk'] font-bold text-lg">streamerStalker</span>
<p class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa] mt-2">© 2024 streamerStalker Intelligence. All rights reserved.</p>
</div>
<div class="flex gap-8">
<a class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa] hover:text-[#c19cff] transition-colors" href="#">Terms</a>
<a class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa] hover:text-[#c19cff] transition-colors" href="#">Privacy</a>
<a class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa] hover:text-[#c19cff] transition-colors" href="#">Status</a>
<a class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa] hover:text-[#c19cff] transition-colors" href="#">Support</a>
</div>
</footer>
</main>
<!-- Mobile Bottom NavBar -->
<nav class="fixed bottom-0 left-0 w-full bg-[#131313] md:hidden z-50 flex justify-around items-center py-4 border-t border-outline-variant/10">
<a class="flex flex-col items-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="text-[10px] font-bold mt-1">HOME</span>
</a>
<a class="flex flex-col items-center text-primary" href="#">
<span class="material-symbols-outlined">videocam</span>
<span class="text-[10px] font-bold mt-1">STREAMS</span>
</a>
<a class="relative -top-6 w-14 h-14 bg-primary rounded-full flex items-center justify-center text-black shadow-lg shadow-primary/20" href="#">
<span class="material-symbols-outlined text-3xl">add</span>
</a>
<a class="flex flex-col items-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined">analytics</span>
<span class="text-[10px] font-bold mt-1">INTEL</span>
</a>
<a class="flex flex-col items-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined">settings</span>
<span class="text-[10px] font-bold mt-1">CONFIG</span>
</a>
</nav>
</body></html>


<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>streamerStalker Intelligence Dashboard</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&amp;family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "error-container": "#a70138",
              "on-primary-fixed-variant": "#3c0080",
              "tertiary-fixed-dim": "#00e5ee",
              "on-error-container": "#ffb2b9",
              "outline": "#777575",
              "secondary-fixed-dim": "#babfff",
              "on-surface": "#ffffff",
              "surface-variant": "#262626",
              "surface-container": "#1a1919",
              "inverse-primary": "#7a27e8",
              "primary": "#c19cff",
              "surface": "#0e0e0e",
              "on-tertiary-container": "#00575b",
              "tertiary-container": "#00f4fe",
              "on-primary-container": "#300069",
              "surface-dim": "#0e0e0e",
              "surface-container-low": "#131313",
              "error": "#ff6e84",
              "surface-tint": "#c19cff",
              "error-dim": "#d73357",
              "on-error": "#490013",
              "outline-variant": "#494847",
              "on-tertiary": "#006165",
              "inverse-surface": "#fcf8f8",
              "primary-fixed-dim": "#ab78ff",
              "inverse-on-surface": "#565554",
              "on-secondary-fixed-variant": "#2f3bcc",
              "background": "#0e0e0e",
              "surface-container-high": "#201f1f",
              "surface-container-lowest": "#000000",
              "tertiary-fixed": "#00f4fe",
              "on-primary-fixed": "#000000",
              "surface-container-highest": "#262626",
              "on-surface-variant": "#adaaaa",
              "secondary-fixed": "#cbceff",
              "on-tertiary-fixed": "#004346",
              "secondary-dim": "#5764f1",
              "primary-container": "#b68aff",
              "on-secondary-container": "#cacdff",
              "on-tertiary-fixed-variant": "#006266",
              "secondary": "#8b95ff",
              "on-primary": "#3f0085",
              "on-background": "#ffffff",
              "secondary-container": "#222fc2",
              "primary-fixed": "#b68aff",
              "on-secondary-fixed": "#000fb0",
              "on-secondary": "#000776",
              "tertiary-dim": "#00e5ee",
              "surface-bright": "#2c2c2c",
              "primary-dim": "#9146ff",
              "tertiary": "#a1faff"
            },
            fontFamily: {
              "headline": ["Space Grotesk"],
              "body": ["Inter"],
              "label": ["Inter"]
            },
            borderRadius: {"DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem"},
          },
        },
      }
    </script>
<style>
      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      }
      .glass-card {
        background: rgba(26, 25, 25, 0.6);
        backdrop-filter: blur(20px);
      }
      .neon-border {
        border: 1px solid rgba(73, 72, 71, 0.15);
      }
      .live-pulse {
        box-shadow: 0 0 0 0 rgba(215, 51, 87, 0.7);
        animation: pulse 2s infinite;
      }
      @keyframes pulse {
        0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(215, 51, 87, 0.7); }
        70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(215, 51, 87, 0); }
        100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(215, 51, 87, 0); }
      }
    </style>
</head>
<body class="bg-background text-on-surface font-body selection:bg-primary/30">
<!-- SideNavBar -->
<aside class="fixed left-0 top-0 h-full flex flex-col py-6 bg-[#0e0e0e] dark:bg-[#0e0e0e] h-screen w-64 border-r border-[#494847]/15 z-40 hidden md:flex">
<div class="px-6 mb-12">
<h1 class="text-xl font-black text-[#c19cff] font-['Space_Grotesk'] tracking-tighter">streamerStalker</h1>
<p class="font-['Inter'] text-sm font-medium tracking-wide text-on-surface-variant/60">Intelligence Feed</p>
</div>
<nav class="flex-1 space-y-1 px-3">
<a class="flex items-center px-3 py-3 gap-3 font-['Inter'] text-sm font-medium tracking-wide bg-gradient-to-r from-[#9146ff]/20 to-transparent text-[#c19cff] border-l-4 border-[#c19cff] translate-x-1 duration-150" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
                Server Overview
            </a>
<a class="flex items-center px-3 py-3 gap-3 font-['Inter'] text-sm font-medium tracking-wide text-[#adaaaa] hover:bg-[#262626] hover:text-white transition-all" href="#">
<span class="material-symbols-outlined" data-icon="videocam">videocam</span>
                Twitch Trackers
            </a>
<a class="flex items-center px-3 py-3 gap-3 font-['Inter'] text-sm font-medium tracking-wide text-[#adaaaa] hover:bg-[#262626] hover:text-white transition-all" href="#">
<span class="material-symbols-outlined" data-icon="campaign">campaign</span>
                Twitter/X
            </a>
<a class="flex items-center px-3 py-3 gap-3 font-['Inter'] text-sm font-medium tracking-wide text-[#adaaaa] hover:bg-[#262626] hover:text-white transition-all" href="#">
<span class="material-symbols-outlined" data-icon="newspaper">newspaper</span>
                VTuber News
            </a>
</nav>
<div class="px-4 mt-auto">
<button class="w-full py-3 bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed font-bold rounded-lg text-sm transition-transform active:scale-95">
                Upgrade to Pro
            </button>
<div class="mt-6 border-t border-outline-variant/15 pt-6 space-y-1">
<a class="flex items-center px-3 py-2 gap-3 font-['Inter'] text-sm font-medium tracking-wide text-[#adaaaa] hover:text-[#c19cff] transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
                    Settings
                </a>
<a class="flex items-center px-3 py-2 gap-3 font-['Inter'] text-sm font-medium tracking-wide text-[#adaaaa] hover:text-error transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="logout">logout</span>
                    Logout
                </a>
</div>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="md:ml-64 min-h-screen bg-background">
<!-- TopAppBar (Mobile & Global Context) -->
<header class="sticky top-0 w-full z-30 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 px-6 py-4 flex justify-between items-center">
<div class="flex items-center gap-4">
<button class="md:hidden text-on-surface">
<span class="material-symbols-outlined" data-icon="menu">menu</span>
</button>
<h2 class="font-headline font-bold text-lg tracking-tight md:block hidden">Dashboard / <span class="text-primary">Server Overview</span></h2>
<h2 class="font-headline font-bold text-lg tracking-tight md:hidden">streamerStalker</h2>
</div>
<div class="flex items-center gap-4">
<div class="relative hidden sm:block">
<span class="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant material-symbols-outlined text-sm" data-icon="search">search</span>
<input class="bg-surface-container-highest border-none rounded-lg pl-10 pr-4 py-1.5 text-sm focus:ring-1 focus:ring-secondary/40 w-64 text-on-surface" placeholder="Search streamers..." type="text"/>
</div>
<div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-[10px] font-bold text-on-primary-fixed">
                    JD
                </div>
</div>
</header>
<div class="p-6 lg:p-10 max-w-7xl mx-auto space-y-10">
<!-- Hero Stats Bento Grid -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-6">
<div class="bg-surface-container-low p-6 rounded-xl neon-border relative overflow-hidden group hover:bg-surface-container-highest transition-colors">
<div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span class="material-symbols-outlined text-6xl" data-icon="monitoring">monitoring</span>
</div>
<p class="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Total Trackers</p>
<h3 class="font-headline text-4xl font-bold text-primary">128</h3>
<div class="mt-4 flex items-center gap-2 text-[10px] font-bold text-secondary">
<span class="material-symbols-outlined text-sm" data-icon="trending_up">trending_up</span>
                        +12% FROM LAST MONTH
                    </div>
</div>
<div class="bg-surface-container-low p-6 rounded-xl neon-border relative overflow-hidden group hover:bg-surface-container-highest transition-colors">
<div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span class="material-symbols-outlined text-6xl" data-icon="sensors">sensors</span>
</div>
<p class="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Live Now</p>
<div class="flex items-center gap-3">
<h3 class="font-headline text-4xl font-bold text-error">42</h3>
<span class="flex h-3 w-3 rounded-full bg-error-dim live-pulse"></span>
</div>
<div class="mt-4 flex items-center gap-2 text-[10px] font-bold text-on-surface-variant">
                        PEAKING AT 12.4K VIEWERS
                    </div>
</div>
<div class="bg-surface-container-low p-6 rounded-xl neon-border relative overflow-hidden group hover:bg-surface-container-highest transition-colors">
<div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span class="material-symbols-outlined text-6xl" data-icon="psychology">psychology</span>
</div>
<p class="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">AI Summaries</p>
<h3 class="font-headline text-4xl font-bold text-tertiary">1,402</h3>
<div class="mt-4 flex items-center gap-2 text-[10px] font-bold text-tertiary-dim">
<span class="material-symbols-outlined text-sm" data-icon="bolt">bolt</span>
                        98.2% ACCURACY SCORE
                    </div>
</div>
</section>
<!-- Live Previews (Discord Mockups) -->
<section>
<div class="flex justify-between items-end mb-6">
<div>
<h2 class="font-headline text-2xl font-bold tracking-tight">Live Intelligence Feed</h2>
<p class="text-on-surface-variant text-sm mt-1">Real-time Discord notification previews for active trackers.</p>
</div>
<button class="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                        View All <span class="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
<!-- Notification Card 1 -->
<div class="bg-[#2f3136] rounded-lg p-4 flex gap-4 border-l-4 border-primary shadow-2xl relative overflow-hidden">
<div class="flex-shrink-0">
<img class="w-12 h-12 rounded-full border-2 border-primary-dim" data-alt="Streamer avatar placeholder" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAu40A7BVsLG2hm_aWc_zQl5Ko1rexGUMjDvZSryJzVLM3F_r7w-dDch4bdihZxvKzo_n4z0mEmKZKz4rBy-LPNbDaBGov-W7zdmxPeEh7JDowr0txxk4z250Xye2MpYwPBTQr80X19V9KzXOVyqc0OxxoRn571uUdAD49yEZgQ8k4W1EkJyyPRvPIRMJP-EczC5LdInhp-SIfsMHdAatE9HFZoCQqJ0iGpVnNV3kgNAjUGVaU6ilnVFR3JVpaX9-duxacfjcuRuwVZ"/>
</div>
<div class="flex-1 min-w-0">
<div class="flex items-center justify-between mb-1">
<span class="font-bold text-white">streamerStalker <span class="bg-primary/20 text-primary text-[9px] px-1.5 py-0.5 rounded ml-1">BOT</span></span>
<span class="text-[10px] text-[#adaaaa]">Just Now</span>
</div>
<div class="text-[#dcddde] text-sm">
<p class="font-bold text-white text-base">🔴 ironMouse is LIVE!</p>
<p class="mt-1">"Special Guest! Today we talk about the future of Vtubing..."</p>
<div class="mt-3 bg-[#202225] rounded-md border border-[#18191c] overflow-hidden">
<div class="relative aspect-video bg-surface">
<img class="w-full h-full object-cover opacity-80" data-alt="Twitch stream thumbnail preview" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-sQZDF7eHxMJpj7mSOsHvdDdFewcCaLdgpm20EuXsZIsX4tGpIFxWa8IWwOpN5cpK7TBcT5e-zX4vT4VxshvonDqkFyUooreHxi-oQ5VffzDXR-4cIvnU02p70K1Ft5gdpCM5LOLkN40PaDHKSqZn6cAyXhbnndkZ-9Y98SlH5pEIk8QiyD2vN4_dyXMImw0KIVu870IpRmEorXwlC5fMJ_pRcPqDPxSIl1oGSOckUr83nNJdvURB-VpFNqv3q9frR6nm9dHKHG5v"/>
<div class="absolute top-2 left-2 bg-error-container/80 text-white text-[10px] px-2 py-0.5 rounded font-bold flex items-center gap-1">
<span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> LIVE
                                        </div>
<div class="absolute bottom-2 right-2 bg-black/60 backdrop-blur text-white text-[10px] px-2 py-0.5 rounded">
                                            4.2k Viewers
                                        </div>
</div>
<div class="p-3">
<div class="text-xs font-bold text-on-surface-variant uppercase">Category</div>
<div class="text-primary text-sm font-medium">Just Chatting</div>
</div>
</div>
</div>
</div>
</div>
<!-- Notification Card 2 -->
<div class="bg-[#2f3136] rounded-lg p-4 flex gap-4 border-l-4 border-secondary shadow-2xl relative overflow-hidden">
<div class="flex-shrink-0">
<img class="w-12 h-12 rounded-full border-2 border-secondary-dim" data-alt="Streamer avatar female" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmMMNgoVYoyTjUqmgZ4bF_hSUVeqPwzPLoviBo9qQctgeXEhWw6y8SWTE6lFx-6b3mzPCSHYv0sWkXIK9JsuONiRdN7VA0uZWm2ylWNWV3W0MjrV_WOcDDKiQQVza4BMe4j32MvdmnQYN90MnwTjGHlNPGkJHfN6tsHQCWWRdL1STX2SNjpS-z7lLMCOpFa5bP32gAtYP_VGneV8QSTxmQbYZtFx7Wfezw_-4WVwPuPsXlmjdnlB3Gv7aznSJ54cMrgsV2Yurmczbb"/>
</div>
<div class="flex-1 min-w-0">
<div class="flex items-center justify-between mb-1">
<span class="font-bold text-white">streamerStalker <span class="bg-primary/20 text-primary text-[9px] px-1.5 py-0.5 rounded ml-1">BOT</span></span>
<span class="text-[10px] text-[#adaaaa]">12m ago</span>
</div>
<div class="text-[#dcddde] text-sm">
<p class="font-bold text-white text-base">🔴 Shroud is LIVE!</p>
<p class="mt-1">"New Valorant patch testing. Aim is crisp today."</p>
<div class="mt-3 bg-[#202225] rounded-md border border-[#18191c] overflow-hidden">
<div class="relative aspect-video bg-surface">
<img class="w-full h-full object-cover opacity-80" data-alt="Tactical shooter gameplay preview" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYf3BXI8mLD81pwCEq_0hK2v9w4UdDtGZEmhjBK6SJJIPMALhxmsLVBHPhCdsbJ8hl608vUsvt18-YA0gC4y3SCZeg6kw-4zRWcLbQFhwCEBcMfvMEr5Iuxpq2KCiylotRc_fZNI__U4FC1Xz3CAccUaVjAUY3isJP7sO6Ix3YBAYd1eEvLYFKmsMDTQ3PC4OKvLXcuVbwgeflGy39auVXu2SA2gy6GQfcO6Fa0LcTIHKH8XRLVX_dzDHM-eoUcR1w4yLVQixuRwG9"/>
<div class="absolute top-2 left-2 bg-error-container/80 text-white text-[10px] px-2 py-0.5 rounded font-bold flex items-center gap-1">
<span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> LIVE
                                        </div>
<div class="absolute bottom-2 right-2 bg-black/60 backdrop-blur text-white text-[10px] px-2 py-0.5 rounded">
                                            32.1k Viewers
                                        </div>
</div>
<div class="p-3">
<div class="text-xs font-bold text-on-surface-variant uppercase">Category</div>
<div class="text-secondary text-sm font-medium">Valorant</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Active Trackers List -->
<section>
<div class="mb-6">
<h2 class="font-headline text-2xl font-bold tracking-tight">Active Trackers</h2>
<p class="text-on-surface-variant text-sm mt-1">Currently monitoring these channels across all integrated platforms.</p>
</div>
<div class="bg-surface-container-low rounded-xl overflow-hidden neon-border">
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-surface-container-high/50 border-b border-outline-variant/10">
<th class="px-6 py-4 font-label text-xs uppercase tracking-widest text-on-surface-variant">Streamer</th>
<th class="px-6 py-4 font-label text-xs uppercase tracking-widest text-on-surface-variant">Platform</th>
<th class="px-6 py-4 font-label text-xs uppercase tracking-widest text-on-surface-variant">Status</th>
<th class="px-6 py-4 font-label text-xs uppercase tracking-widest text-on-surface-variant">Last Active</th>
<th class="px-6 py-4 font-label text-xs uppercase tracking-widest text-on-surface-variant text-right">Actions</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant/5">
<tr class="group hover:bg-surface-bright transition-colors">
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<img class="w-8 h-8 rounded-lg" data-alt="User profile icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB67S8QRFaF87n7tozRHcPkJ2OaWZ_XJkm8sJDBvk993fIHNRHQWAm9AArRJSHiGKgE8gs5qYjP5ku0yvPw53Q0VQUo_s3VKAAO4SlKqGgetPBdm7EwGgibxgT41bW95ZDVAHQyl-YAUOZ7gCJzkQrVuk_Lib1fI-3-IfvPenORDmxOt_W0GhxBfShJo6-47Uh9wuNwLjtuvL8Dvl4SFQlTWe1NyFz_i7Oj5mB7ZUnlK4BvoPE4QUVjVis0TdWN6wAvHgw1Y12ZzDaN"/>
<span class="font-bold text-sm tracking-wide">Pokimane</span>
</div>
</td>
<td class="px-6 py-4">
<div class="flex items-center gap-2 text-primary">
<span class="material-symbols-outlined text-base" data-icon="videocam">videocam</span>
<span class="text-xs font-medium">Twitch</span>
</div>
</td>
<td class="px-6 py-4">
<span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-error-dim/10 text-error text-[10px] font-bold">
<span class="w-1 h-1 bg-error rounded-full"></span> LIVE
                                        </span>
</td>
<td class="px-6 py-4 text-xs text-on-surface-variant">1m ago</td>
<td class="px-6 py-4 text-right">
<button class="text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined text-lg" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
<tr class="group hover:bg-surface-bright transition-colors">
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<img class="w-8 h-8 rounded-lg" data-alt="User profile male" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAidUUlmUHnapHfK1OLLsWhEYeo1IqnxdtpiQQGq5kWz06wIPOfqAk4cMmJ8V3aaeheDQAquVQYt2GnuivVv7qRd1gRxAqEnmCv6CZYoqm77HChApgfNpJ13Xj02TnelaaI-GZy5no-tzPZO7-alvPKthFB73CXhMJBKhw5y44VHNz5p2R5qVMISeBayJUTS6d4BwxkcIC_0QPYDLyiciiYNxn7LiHLSdskCi_-HEuiG94Cm4tFslHXwiZz6lo2H78N37ybzQxTRzDR"/>
<span class="font-bold text-sm tracking-wide">HasanAbi</span>
</div>
</td>
<td class="px-6 py-4">
<div class="flex items-center gap-2 text-primary">
<span class="material-symbols-outlined text-base" data-icon="videocam">videocam</span>
<span class="text-xs font-medium">Twitch</span>
</div>
</td>
<td class="px-6 py-4">
<span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-outline/10 text-outline text-[10px] font-bold">
                                            OFFLINE
                                        </span>
</td>
<td class="px-6 py-4 text-xs text-on-surface-variant">4h ago</td>
<td class="px-6 py-4 text-right">
<button class="text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined text-lg" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
<tr class="group hover:bg-surface-bright transition-colors">
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<img class="w-8 h-8 rounded-lg" data-alt="User profile profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrxHA3wQZvCOGsUXBS6h11sCYvE6fdjidtq8lkX5BhqStWQ7ln77N6HtaC3mdyzkLahNG7cZorbRQ0aVVEIdqGYYmfnxwZHi-XPKn1RqO51_g_iukTY004WW8dqW3Jdu58lm26H3DhYxzcaUhTNQbJJFp3ytm73CznS1FVeskOjBK2Yz1uLk-lcyr5BLft-ue8ZICvePMM7oSzpehPkcZ4WdnAZ4xwoPJwXcqndkooeI6XFv6yzopsNEpPrM5mCAtL0ldokBIw_m6z"/>
<span class="font-bold text-sm tracking-wide">MrBeast</span>
</div>
</td>
<td class="px-6 py-4">
<div class="flex items-center gap-2 text-secondary">
<span class="material-symbols-outlined text-base" data-icon="campaign">campaign</span>
<span class="text-xs font-medium">Twitter</span>
</div>
</td>
<td class="px-6 py-4">
<span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-tertiary-dim/10 text-tertiary text-[10px] font-bold">
                                            MONITORING
                                        </span>
</td>
<td class="px-6 py-4 text-xs text-on-surface-variant">2d ago</td>
<td class="px-6 py-4 text-right">
<button class="text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined text-lg" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</section>
</div>
<!-- Footer -->
<footer class="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center bg-[#0e0e0e] border-t border-[#494847]/15">
<div class="flex flex-col items-center md:items-start gap-2 mb-6 md:mb-0">
<span class="text-[#c19cff] font-['Space_Grotesk'] font-bold text-lg tracking-tighter">streamerStalker</span>
<p class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa]">© 2024 streamerStalker Intelligence. All rights reserved.</p>
</div>
<div class="flex gap-8">
<a class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa] hover:text-[#c19cff] transition-colors opacity-80 hover:opacity-100" href="#">Terms</a>
<a class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa] hover:text-[#c19cff] transition-colors opacity-80 hover:opacity-100" href="#">Privacy</a>
<a class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa] hover:text-[#c19cff] transition-colors opacity-80 hover:opacity-100" href="#">Status</a>
<a class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa] hover:text-[#c19cff] transition-colors opacity-80 hover:opacity-100" href="#">Support</a>
</div>
</footer>
</main>
<!-- BottomNavBar (Mobile Only) -->
<div class="fixed bottom-0 left-0 w-full bg-surface-container-high/90 backdrop-blur-xl md:hidden flex justify-around items-center py-4 z-50 border-t border-outline-variant/10">
<a class="flex flex-col items-center text-primary" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span class="text-[10px] mt-1 font-bold">Home</span>
</a>
<a class="flex flex-col items-center text-on-surface-variant" href="#">
<span class="material-symbols-outlined" data-icon="videocam">videocam</span>
<span class="text-[10px] mt-1 font-bold">Trackers</span>
</a>
<a class="flex flex-col items-center text-on-surface-variant" href="#">
<span class="material-symbols-outlined" data-icon="campaign">campaign</span>
<span class="text-[10px] mt-1 font-bold">Feeds</span>
</a>
<a class="flex flex-col items-center text-on-surface-variant" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="text-[10px] mt-1 font-bold">Config</span>
</a>
</div>
</body></html>


<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>streamerStalker Intelligence - AI Settings</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Space+Grotesk:wght@700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "error-container": "#a70138",
              "on-primary-fixed-variant": "#3c0080",
              "tertiary-fixed-dim": "#00e5ee",
              "on-error-container": "#ffb2b9",
              "outline": "#777575",
              "secondary-fixed-dim": "#babfff",
              "on-surface": "#ffffff",
              "surface-variant": "#262626",
              "surface-container": "#1a1919",
              "inverse-primary": "#7a27e8",
              "primary": "#c19cff",
              "surface": "#0e0e0e",
              "on-tertiary-container": "#00575b",
              "tertiary-container": "#00f4fe",
              "on-primary-container": "#300069",
              "surface-dim": "#0e0e0e",
              "surface-container-low": "#131313",
              "error": "#ff6e84",
              "surface-tint": "#c19cff",
              "error-dim": "#d73357",
              "on-error": "#490013",
              "outline-variant": "#494847",
              "on-tertiary": "#006165",
              "inverse-surface": "#fcf8f8",
              "primary-fixed-dim": "#ab78ff",
              "inverse-on-surface": "#565554",
              "on-secondary-fixed-variant": "#2f3bcc",
              "background": "#0e0e0e",
              "surface-container-high": "#201f1f",
              "surface-container-lowest": "#000000",
              "tertiary-fixed": "#00f4fe",
              "on-primary-fixed": "#000000",
              "surface-container-highest": "#262626",
              "on-surface-variant": "#adaaaa",
              "secondary-fixed": "#cbceff",
              "on-tertiary-fixed": "#004346",
              "secondary-dim": "#5764f1",
              "primary-container": "#b68aff",
              "on-secondary-container": "#cacdff",
              "on-tertiary-fixed-variant": "#006266",
              "secondary": "#8b95ff",
              "on-primary": "#3f0085",
              "on-background": "#ffffff",
              "secondary-container": "#222fc2",
              "primary-fixed": "#b68aff",
              "on-secondary-fixed": "#000fb0",
              "on-secondary": "#000776",
              "tertiary-dim": "#00e5ee",
              "surface-bright": "#2c2c2c",
              "primary-dim": "#9146ff",
              "tertiary": "#a1faff"
            },
            fontFamily: {
              "headline": ["Space Grotesk"],
              "body": ["Inter"],
              "label": ["Inter"]
            },
            borderRadius: {"DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem"},
          },
        },
      }
    </script>
<style>
      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      }
      .neon-glow {
        box-shadow: 0 0 15px 2px rgba(193, 156, 255, 0.04);
      }
      .glass-panel {
        background: rgba(14, 14, 14, 0.6);
        backdrop-filter: blur(20px);
      }
    </style>
</head>
<body class="bg-background text-on-surface font-body selection:bg-primary selection:text-on-primary-fixed">
<!-- Top Navigation (Mobile Only) -->
<nav class="md:hidden fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-[#131313]">
<span class="text-2xl font-bold tracking-tighter text-[#c19cff] font-['Space_Grotesk']">streamerStalker</span>
<button class="material-symbols-outlined text-primary">menu</button>
</nav>
<div class="flex min-h-screen">
<!-- Sidebar Navigation -->
<aside class="hidden md:flex fixed left-0 top-0 h-full w-64 flex-col py-6 bg-[#0e0e0e] border-r border-[#494847]/15 z-40">
<div class="px-6 mb-10">
<h1 class="text-xl font-black text-[#c19cff] font-['Space_Grotesk']">streamerStalker</h1>
<p class="font-['Inter'] text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mt-1">Intelligence Feed</p>
</div>
<nav class="flex-1 space-y-1 px-3">
<a class="flex items-center gap-3 px-3 py-3 text-[#adaaaa] hover:bg-[#262626] hover:text-white transition-all rounded-lg font-['Inter'] text-sm font-medium tracking-wide" href="#">
<span class="material-symbols-outlined text-lg">dashboard</span>
                    Server Overview
                </a>
<a class="flex items-center gap-3 px-3 py-3 text-[#adaaaa] hover:bg-[#262626] hover:text-white transition-all rounded-lg font-['Inter'] text-sm font-medium tracking-wide" href="#">
<span class="material-symbols-outlined text-lg">videocam</span>
                    Twitch Trackers
                </a>
<a class="flex items-center gap-3 px-3 py-3 text-[#adaaaa] hover:bg-[#262626] hover:text-white transition-all rounded-lg font-['Inter'] text-sm font-medium tracking-wide" href="#">
<span class="material-symbols-outlined text-lg">campaign</span>
                    Twitter/X
                </a>
<a class="flex items-center gap-3 px-3 py-3 text-[#adaaaa] hover:bg-[#262626] hover:text-white transition-all rounded-lg font-['Inter'] text-sm font-medium tracking-wide" href="#">
<span class="material-symbols-outlined text-lg">newspaper</span>
                    VTuber News
                </a>
</nav>
<div class="px-6 mb-8">
<div class="bg-gradient-to-br from-surface-container-highest to-surface-container-low p-4 rounded-xl border border-outline-variant/10">
<p class="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Status</p>
<p class="text-xs text-on-surface-variant leading-relaxed">Intelligence Pro Active</p>
<button class="mt-3 w-full py-2 bg-gradient-to-r from-[#c19cff] to-[#9146ff] text-on-primary-fixed text-[11px] font-bold uppercase tracking-tighter rounded-md scale-95 active:scale-90 transition-transform">Upgrade to Pro</button>
</div>
</div>
<div class="mt-auto px-3 border-t border-outline-variant/10 pt-4">
<a class="flex items-center gap-3 px-3 py-3 bg-gradient-to-r from-[#9146ff]/20 to-transparent text-[#c19cff] border-l-4 border-[#c19cff] transition-all duration-150 translate-x-1 font-['Inter'] text-sm font-medium tracking-wide" href="#">
<span class="material-symbols-outlined text-lg">settings</span>
                    Settings
                </a>
<a class="flex items-center gap-3 px-3 py-3 text-[#adaaaa] hover:bg-[#262626] hover:text-white transition-all rounded-lg font-['Inter'] text-sm font-medium tracking-wide" href="#">
<span class="material-symbols-outlined text-lg">logout</span>
                    Logout
                </a>
</div>
</aside>
<!-- Main Content Area -->
<main class="flex-1 md:ml-64 pt-20 md:pt-0">
<div class="max-w-5xl mx-auto px-6 py-12">
<!-- Header Section -->
<header class="mb-12">
<h2 class="text-4xl font-headline font-bold tracking-tight text-on-surface mb-2 uppercase">AI News Digest Settings</h2>
<p class="text-on-surface-variant text-lg max-w-2xl font-body">Toggle OpenAI GPT-3.5-turbo summaries for VTuber news notifications.</p>
</header>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
<!-- Settings Control Panel -->
<div class="lg:col-span-7 space-y-12">
<!-- Primary Toggle Section -->
<section class="p-8 bg-surface-container-low rounded-xl border border-outline-variant/10 neon-glow">
<div class="flex items-center justify-between mb-6">
<div>
<h3 class="text-lg font-headline font-bold text-primary mb-1">Enable AI Summarization</h3>
<p class="text-xs text-on-surface-variant font-medium uppercase tracking-wider">Neural Core Processing</p>
</div>
<button class="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-dim shadow-inner">
<span class="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-on-primary-fixed transition-transform"></span>
</button>
</div>
<p class="text-sm text-on-surface-variant leading-relaxed mb-6">
                                When enabled, our intelligence engine will condense long-form VTuber drama, debut announcements, and tech updates into readable 3-point bulletins.
                            </p>
<div class="flex gap-4 p-4 bg-surface-container-highest rounded-lg border border-outline-variant/15">
<span class="material-symbols-outlined text-secondary" style="font-variation-settings: 'FILL' 1;">info</span>
<p class="text-[11px] text-secondary leading-normal font-medium">Using gpt-3.5-turbo-0125 for optimal speed and context retention.</p>
</div>
</section>
<!-- Frequency Settings -->
<section>
<h3 class="text-sm font-headline font-bold text-on-surface uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
<span class="h-1 w-8 bg-primary"></span> Transmission Frequency
                            </h3>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
<label class="relative group cursor-pointer">
<input checked="" class="peer sr-only" name="freq" type="radio"/>
<div class="p-6 bg-surface-container-low border-2 border-transparent peer-checked:border-primary peer-checked:bg-surface-container-high transition-all rounded-xl">
<div class="flex justify-between items-start mb-2">
<span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">bolt</span>
<div class="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
</div>
<p class="font-headline font-bold text-on-surface">Immediate</p>
<p class="text-[11px] text-on-surface-variant mt-1 leading-relaxed">Summaries delivered as news breaks. High urgency.</p>
</div>
</label>
<label class="relative group cursor-pointer">
<input class="peer sr-only" name="freq" type="radio"/>
<div class="p-6 bg-surface-container-low border-2 border-transparent peer-checked:border-primary peer-checked:bg-surface-container-high transition-all rounded-xl">
<div class="flex justify-between items-start mb-2">
<span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">event_repeat</span>
</div>
<p class="font-headline font-bold text-on-surface">Daily Digest</p>
<p class="text-[11px] text-on-surface-variant mt-1 leading-relaxed">One consolidated intelligence report at 09:00 UTC.</p>
</div>
</label>
</div>
</section>
<!-- Source Filters -->
<section>
<h3 class="text-sm font-headline font-bold text-on-surface uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
<span class="h-1 w-8 bg-secondary"></span> Intelligence Scope
                            </h3>
<div class="flex flex-wrap gap-3">
<span class="px-4 py-2 bg-surface-container-highest border border-primary/20 rounded-full text-[11px] font-bold text-primary flex items-center gap-2">
<span class="w-1.5 h-1.5 rounded-full bg-primary"></span> HOLOLIVE
                                </span>
<span class="px-4 py-2 bg-surface-container-highest border border-secondary/20 rounded-full text-[11px] font-bold text-secondary flex items-center gap-2">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span> NIJISANJI
                                </span>
<span class="px-4 py-2 bg-surface-container-low border border-outline-variant/30 rounded-full text-[11px] font-bold text-on-surface-variant flex items-center gap-2 hover:border-on-surface transition-colors cursor-pointer">
<span class="w-1.5 h-1.5 rounded-full bg-outline"></span> INDEPENDENT
                                </span>
<span class="px-4 py-2 bg-surface-container-low border border-outline-variant/30 rounded-full text-[11px] font-bold text-on-surface-variant flex items-center gap-2 hover:border-on-surface transition-colors cursor-pointer">
<span class="w-1.5 h-1.5 rounded-full bg-outline"></span> VSPO!
                                </span>
</div>
</section>
</div>
<!-- Summary Preview Mockup -->
<div class="lg:col-span-5">
<div class="sticky top-12">
<h3 class="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.3em] mb-4 ml-2">Real-time Preview</h3>
<div class="relative group">
<!-- Background Glow behind card -->
<div class="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-10 blur-xl group-hover:opacity-20 transition-opacity"></div>
<div class="relative bg-surface-container-high rounded-2xl overflow-hidden border border-outline-variant/15 glass-panel">
<!-- Card Header -->
<div class="p-6 bg-gradient-to-b from-surface-container-highest to-transparent border-b border-outline-variant/10">
<div class="flex items-center gap-3 mb-4">
<div class="relative">
<img alt="Source Avatar" class="w-12 h-12 rounded-lg object-cover ring-2 ring-error-dim" data-alt="Digital avatar concept art with neon highlights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2nE1TJ95sP_2IyiCKoW3Dc7fBpY32gAf6wZHe0fOMYWtpKzvw7iAfxbPQ9_Aq5SUxgfsI6zsRxwgWlmV29qsIqtPjERgnSXTASMVVAhztx2xetmhJ8lL9QRhecdO57kWGY5nH_PzDIptn9naAtFxJ6iqkI-zbToQtoFtNrx9pvIlRTjk8k1erOamWquqGKSs8VDdqzOhKi0upZn7RAUvxNTh_x0IZKAzJfU192MFgd_oi5m8M3zcnU6VO8NgVcspToujueRG2fAkK"/>
<div class="absolute -bottom-1 -right-1 w-4 h-4 bg-error-dim rounded-full flex items-center justify-center border-2 border-surface-container-high">
<span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
</div>
</div>
<div>
<h4 class="font-headline font-bold text-on-surface leading-tight">News Transmission #842</h4>
<p class="text-[10px] text-error font-black uppercase tracking-widest">Live Alert • 2m ago</p>
</div>
</div>
<div class="h-32 w-full rounded-lg bg-surface-container-lowest overflow-hidden mb-2">
<img alt="Article Hero" class="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" data-alt="Abstract cyber landscape with purple grid lines" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXAo3Z3zRwd6g7hzBzDVs-2e2k-4VDzjNbOjSLHrVXxOTnPQjW4GuxwLbVR_k0etCITRcAZ3kdblZPpbJajXXYZKFkYc77Hv_EN3s-ALKYyuZxxFEsHJX5vXp5mwEfjx7bCPJ5pa613Tn8HO-62YrDeXomDXIob56JO0vuqdFqjIG3sCRBEm6kSgMTKKhK9sO2kaoh4uxiskSEANc4TZ7t_NTor_OtxbLhN7B9Ex2Z1qiyqg90r8UqLsm3Ap6P4O_e4kDx46nIPamx"/>
</div>
</div>
<!-- AI Summary Content -->
<div class="p-6 space-y-4">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-sm" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
<span class="text-[10px] font-black text-primary uppercase tracking-[0.2em]">AI Intelligence Report</span>
</div>
<div class="space-y-3">
<div class="flex gap-3">
<div class="mt-1.5 w-1 h-1 bg-primary rounded-full shrink-0"></div>
<p class="text-xs text-on-surface-variant leading-relaxed">Major Japanese VTuber agency announces "Project Supernova" for Q4 2024.</p>
</div>
<div class="flex gap-3">
<div class="mt-1.5 w-1 h-1 bg-primary rounded-full shrink-0"></div>
<p class="text-xs text-on-surface-variant leading-relaxed">Stock prices for parent companies surged 12.4% following the leak on Twitter/X.</p>
</div>
<div class="flex gap-3">
<div class="mt-1.5 w-1 h-1 bg-primary rounded-full shrink-0"></div>
<p class="text-xs text-on-surface-variant leading-relaxed font-bold text-on-surface">Community sentiment: 88% Positive excitement vs 12% Burnout concerns.</p>
</div>
</div>
<div class="pt-6 flex justify-between items-center border-t border-outline-variant/10">
<div class="flex -space-x-2">
<div class="w-6 h-6 rounded-full bg-surface-container-highest border border-outline-variant flex items-center justify-center text-[8px] font-bold">JD</div>
<div class="w-6 h-6 rounded-full bg-primary-dim border border-outline-variant flex items-center justify-center text-[8px] font-bold text-on-primary-fixed">+12</div>
</div>
<button class="text-[10px] font-bold text-primary hover:underline transition-all">READ FULL DOSSIER →</button>
</div>
</div>
</div>
</div>
<!-- Interactive Tooltip -->
<div class="mt-8 p-4 bg-surface-container-highest/40 border border-outline-variant/10 rounded-lg">
<p class="text-[11px] text-on-surface-variant italic">"This is how your notifications will appear across Discord, Web, and Mobile when AI Summaries are active."</p>
</div>
</div>
</div>
</div>
</div>
</main>
</div>
<!-- Footer -->
<footer class="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center md:ml-64 border-t border-[#494847]/15 bg-[#0e0e0e] z-10">
<div class="flex flex-col items-center md:items-start mb-6 md:mb-0">
<span class="text-[#c19cff] font-['Space_Grotesk'] font-bold text-lg mb-2">streamerStalker</span>
<p class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa]">© 2024 streamerStalker Intelligence. All rights reserved.</p>
</div>
<div class="flex gap-8">
<a class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa] hover:text-[#c19cff] transition-colors opacity-80 hover:opacity-100" href="#">Terms</a>
<a class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa] hover:text-[#c19cff] transition-colors opacity-80 hover:opacity-100" href="#">Privacy</a>
<a class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa] hover:text-[#c19cff] transition-colors opacity-80 hover:opacity-100" href="#">Status</a>
<a class="font-['Inter'] text-xs uppercase tracking-widest text-[#adaaaa] hover:text-[#c19cff] transition-colors opacity-80 hover:opacity-100" href="#">Support</a>
</div>
</footer>
</body></html>


