// Formatted version of bodyHtml. Markup and scripts are unchanged; only line breaks/indentation were added.
const bodyHtml: string = `
<script>
  // Ensure browser's default scroll restoration is enabled
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "auto";
  }
</script>
<style>
  astro-island,
  astro-slot,
  astro-static-slot {
    display: contents;
  }</style
><script>
  (() => {
    var e = async (t) => {
      await (
        await t()
      )();
    };
    (self.Astro || (self.Astro = {})).load = e;
    window.dispatchEvent(new Event("astro:load"));
  })();</script
><script>
  (() => {
    var g = Object.defineProperty;
    var w = (c, s, d) => (s in c ? g(c, s, { enumerable: !0, configurable: !0, writable: !0, value: d }) : (c[s] = d));
    var l = (c, s, d) => w(c, typeof s != "symbol" ? s + "" : s, d);
    var E = new Set(["__proto__", "constructor", "prototype"]);
    {
      let c = {
          0: (t) => y(t),
          1: (t) => d(t),
          2: (t) => new RegExp(t),
          3: (t) => new Date(t),
          4: (t) => new Map(d(t)),
          5: (t) => new Set(d(t)),
          6: (t) => BigInt(t),
          7: (t) => new URL(t),
          8: (t) => new Uint8Array(t),
          9: (t) => new Uint16Array(t),
          10: (t) => new Uint32Array(t),
          11: (t) => Number.POSITIVE_INFINITY * t,
        },
        s = (t) => {
          let [p, e] = t;
          return p in c ? c[p](e) : void 0;
        },
        d = (t) => t.map(s),
        y = (t) =>
          typeof t != "object" || t === null ? t : Object.fromEntries(Object.entries(t).map(([p, e]) => [p, s(e)]));
      class f extends HTMLElement {
        constructor() {
          super(...arguments);
          l(this, "Component");
          l(this, "hydrator");
          l(this, "hydrate", async () => {
            var b;
            if (!this.hydrator || !this.isConnected) return;
            let e = (b = this.parentElement) == null ? void 0 : b.closest("astro-island[ssr]");
            if (e) {
              e.addEventListener("astro:hydrate", this.hydrate, { once: !0 });
              return;
            }
            let n = this.querySelectorAll("astro-slot"),
              r = {},
              i = this.querySelectorAll("template[data-astro-template]");
            for (let o of i) {
              let a = o.closest(this.tagName);
              a != null &&
                a.isSameNode(this) &&
                ((r[o.getAttribute("data-astro-template") || "default"] = o.innerHTML), o.remove());
            }
            for (let o of n) {
              let a = o.closest(this.tagName);
              a != null && a.isSameNode(this) && (r[o.getAttribute("name") || "default"] = o.innerHTML);
            }
            let u;
            try {
              u = this.hasAttribute("props") ? y(JSON.parse(this.getAttribute("props"))) : {};
            } catch (o) {
              let a = this.getAttribute("component-url") || "<unknown>",
                v = this.getAttribute("component-export");
              throw (
                v && (a += \` (export \${v})\`),
                console.error(\`[hydrate] Error parsing props for component \${a}\`, this.getAttribute("props"), o),
                o
              );
            }
            let h;
            (await this.hydrator(this)(this.Component, u, r, { client: this.getAttribute("client") }),
              this.removeAttribute("ssr"),
              this.dispatchEvent(new CustomEvent("astro:hydrate")));
          });
          l(this, "unmount", () => {
            this.isConnected || this.dispatchEvent(new CustomEvent("astro:unmount"));
          });
        }
        disconnectedCallback() {
          (document.removeEventListener("astro:after-swap", this.unmount),
            document.addEventListener("astro:after-swap", this.unmount, { once: !0 }));
        }
        connectedCallback() {
          if (
            !this.hasAttribute("await-children") ||
            document.readyState === "interactive" ||
            document.readyState === "complete"
          )
            this.childrenConnectedCallback();
          else {
            let e = () => {
                (document.removeEventListener("DOMContentLoaded", e), n.disconnect(), this.childrenConnectedCallback());
              },
              n = new MutationObserver(() => {
                var r;
                ((r = this.lastChild) == null ? void 0 : r.nodeType) === Node.COMMENT_NODE &&
                  this.lastChild.nodeValue === "astro:end" &&
                  (this.lastChild.remove(), e());
              });
            (n.observe(this, { childList: !0 }), document.addEventListener("DOMContentLoaded", e));
          }
        }
        async childrenConnectedCallback() {
          let e = this.getAttribute("before-hydration-url");
          (e && (await import(e)), this.start());
        }
        getRetryImportUrl(e) {
          let n = new URL(e, document.baseURI),
            r = \`astro-retry=\${Date.now()}\`,
            i = n.hash.replace(/^#/, "");
          return ((n.hash = i ? \`\${i}&\${r}\` : r), n.toString());
        }
        async importWithRetry(e) {
          try {
            return await import(e);
          } catch (n) {
            return (await new Promise((r) => setTimeout(r, 1e3)), import(this.getRetryImportUrl(e)));
          }
        }
        handleHydrationError(e) {
          let n = this.getAttribute("component-url"),
            r = new CustomEvent("astro:hydration-error", {
              cancelable: !0,
              bubbles: !0,
              composed: !0,
              detail: { error: e, componentUrl: n },
            });
          this.dispatchEvent(r) && console.error(\`[astro-island] Error hydrating \${n}\`, e);
        }
        async start() {
          let e = JSON.parse(this.getAttribute("opts")),
            n = this.getAttribute("client");
          if (Astro[n] === void 0) {
            window.addEventListener(\`astro:\${n}\`, () => this.start(), { once: !0 });
            return;
          }
          try {
            await Astro[n](
              async () => {
                let r = this.getAttribute("renderer-url");
                try {
                  let [i, { default: u }] = await Promise.all([
                      this.importWithRetry(this.getAttribute("component-url")),
                      r ? this.importWithRetry(r) : Promise.resolve({ default: () => () => {} }),
                    ]),
                    h = this.getAttribute("component-export") || "default";
                  if (h.includes(".")) {
                    this.Component = i;
                    for (let m of h.split(".")) {
                      if (
                        E.has(m) ||
                        !this.Component ||
                        (typeof this.Component != "object" && typeof this.Component != "function") ||
                        !Object.hasOwn(this.Component, m)
                      )
                        throw new Error(\`Invalid component export path: \${h}\`);
                      this.Component = this.Component[m];
                    }
                  } else {
                    if (E.has(h)) throw new Error(\`Invalid component export path: \${h}\`);
                    this.Component = i[h];
                  }
                  return ((this.hydrator = u), this.hydrate);
                } catch (i) {
                  return (this.handleHydrationError(i), () => {});
                }
              },
              e,
              this,
            );
          } catch (r) {
            this.handleHydrationError(r);
          }
        }
        attributeChangedCallback() {
          this.hydrate();
        }
      }
      (l(f, "observedAttributes", ["props"]),
        customElements.get("astro-island") || customElements.define("astro-island", f));
    }
  })();</script
><astro-island
  uid="1xmG7U"
  prefix="r23"
  component-url="/_astro/Header.B8havCWi.js"
  component-export="default"
  renderer-url="/_astro/client.B3N4hhPH.js"
  props='{"contactOnlyCta":[0],"hideTicker":[0,false],"overlayDark":[0,false],"includeDevOnlyProducts":[0,false]}'
  ssr
  client="load"
  opts='{"name":"Header","value":true}'
  await-children
  ><header class="top-0 right-0 left-0 z-10000 fixed w-full"
    ><div class="relative z-10"
      ><div class="relative hidden lg:block w-full overflow-hidden"
        ><div aria-hidden="true" class="absolute inset-0 bg-white -translate-y-full opacity-0 transition-none"
          ><div class="absolute inset-x-0 bottom-0 h-px bg-st-secondary"></div></div
        ><div class="relative flex justify-between items-center mx-auto w-10/12 2xl:max-w-width-mx py-3.5"
          ><a href="" class="flex flex-1 items-center"
            ><span class="relative block h-4 w-[113px]"
              ><img
                src="cdn/assets/brand/logos/sarvam-wordmark-black.svg"
                alt="Sarvam AI"
                class="absolute inset-0 block h-4 w-auto max-w-none object-contain object-left transition-opacity duration-300 opacity-100"
                width="113"
                height="18"
                decoding="async" /><img
                src="cdn/assets/brand/logos/sarvam-wordmark-white.svg"
                alt=""
                aria-hidden="true"
                class="absolute inset-0 block h-4 w-auto max-w-none object-contain object-left transition-opacity duration-300 opacity-0"
                width="113"
                height="18"
                decoding="async" /></span></a
          ><div class="flex items-center gap-0 shrink-0"
            ><button
              type="button"
              aria-expanded="false"
              aria-haspopup="true"
              aria-label="Products menu"
              class="flex items-center cursor-pointer px-4 min-h-10"
              ><span
                class="font-matter text-[15px] leading-[normal] whitespace-nowrap transition-colors duration-200 text-tx hover:text-tx-secondary"
                >Products</span
              ></button
            ><button
              type="button"
              aria-expanded="false"
              aria-haspopup="true"
              aria-label="Developers menu"
              class="flex items-center cursor-pointer px-4 min-h-10"
              ><span
                class="font-matter text-[15px] leading-[normal] whitespace-nowrap transition-colors duration-200 text-tx hover:text-tx-secondary"
                >Developers</span
              ></button
            ><button
              type="button"
              aria-expanded="false"
              aria-haspopup="true"
              aria-label="Resources menu"
              class="flex items-center cursor-pointer px-4 min-h-10"
              ><span
                class="font-matter text-[15px] leading-[normal] whitespace-nowrap transition-colors duration-200 text-tx hover:text-tx-secondary"
                >Resources</span
              ></button
            ><button
              type="button"
              aria-expanded="false"
              aria-haspopup="true"
              aria-label="Company menu"
              class="flex items-center cursor-pointer px-4 min-h-10"
              ><span
                class="font-matter text-[15px] leading-[normal] whitespace-nowrap transition-colors duration-200 text-tx hover:text-tx-secondary"
                >Company</span
              ></button
            ></div
          ><div class="flex flex-1 justify-end items-center gap-2"
            ><button
              class="group relative inline-flex items-center justify-center cursor-pointer font-matter font-medium overflow-hidden rounded-full touch-manipulation disabled:opacity-40 disabled:pointer-events-none min-h-[40px] text-white bg-[#2a2c33] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_0_rgba(0,0,0,0.2)] active:scale-[0.97] active:duration-150 transition-[background-color,box-shadow] duration-350 ease-[cubic-bezier(0.2,0,0,1)] px-5 py-2 text-[15px] text-nowrap transition-opacity duration-150 opacity-0"
              ><span
                aria-hidden="true"
                class="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-[cubic-bezier(0.2,0,0,1)] bg-[radial-gradient(circle_80px_at_var(--gx)_var(--gy),rgba(255,255,255,0.16)_0%,transparent_100%)]"
                style="--gx: 50%; --gy: 50%"
              ></span
              ><span class="relative z-10 flex items-center gap-2">Log In</span></button
            ><button
              class="group relative inline-flex items-center justify-center cursor-pointer font-matter font-medium rounded-full touch-manipulation disabled:opacity-40 disabled:pointer-events-none overflow-hidden min-h-[40px] text-tx bg-sf-secondary hover:bg-white shadow-[inset_0_2px_0_rgba(200,200,200,0.1),inset_0_-1px_0_rgba(0,0,0,0.05)] active:scale-[0.97] active:duration-150 transition-[background-color,box-shadow] duration-350 ease-[cubic-bezier(0.2,0,0,1)] px-5 py-2 text-[15px] text-nowrap"
              ><span class="relative z-10 flex items-center gap-2">Contact Us</span></button
            ></div
          ></div
        ></div
      ></div
    ><div class="lg:hidden relative z-10"
      ><div class="relative w-full overflow-hidden"
        ><div aria-hidden="true" class="absolute inset-0 bg-white -translate-y-full opacity-0 transition-none"
          ><div class="absolute inset-x-[6%] bottom-0 h-px bg-st-secondary"></div></div
        ><div class="relative flex justify-between items-center mx-auto w-[88%] py-3"
          ><a href="" class="flex items-center"
            ><span class="relative block h-4 w-[101px]"
              ><img
                src="cdn/assets/brand/logos/sarvam-wordmark-black.svg"
                alt="Sarvam AI"
                class="absolute inset-0 block h-4 w-auto max-w-none object-contain object-left transition-opacity duration-300 opacity-100"
                width="101"
                height="16"
                decoding="async" /><img
                src="cdn/assets/brand/logos/sarvam-wordmark-white.svg"
                alt=""
                aria-hidden="true"
                class="absolute inset-0 block h-4 w-auto max-w-none object-contain object-left transition-opacity duration-300 opacity-0"
                width="101"
                height="16"
                decoding="async" /></span></a
          ><div class="flex items-center gap-3"
            ><button
              class="group relative inline-flex items-center justify-center cursor-pointer font-matter font-medium rounded-full touch-manipulation disabled:opacity-40 disabled:pointer-events-none overflow-hidden min-h-[40px] text-tx bg-sf-secondary hover:bg-white shadow-[inset_0_2px_0_rgba(200,200,200,0.1),inset_0_-1px_0_rgba(0,0,0,0.05)] active:scale-[0.97] active:duration-150 transition-[background-color,box-shadow] duration-350 ease-[cubic-bezier(0.2,0,0,1)] px-5 py-2 text-[15px] transition-opacity duration-150 opacity-0"
              ><span class="relative z-10 flex items-center gap-2">Log In</span></button
            ><button
              type="button"
              class="flex flex-col justify-center items-center space-y-[3px] focus:outline-none min-w-10 min-h-10 w-7 h-7"
              aria-label="Toggle menu"
              aria-expanded="false"
              ><span
                class="w-[18px] h-[1.5px] transition-[transform,opacity,background-color] duration-300 ease-out origin-center bg-tx"
              ></span
              ><span
                class="w-[18px] h-[1.5px] transition-[transform,opacity,background-color] duration-300 ease-out bg-tx"
              ></span
              ><span
                class="w-[18px] h-[1.5px] transition-[transform,opacity,background-color] duration-300 ease-out origin-center bg-tx"
              ></span></button></div></div></div></div></header
  ><!--astro:end--></astro-island
>
<main class="z-100 flex-1 font-matter bg-sf relative flex flex-col">
  <div class="flex flex-col gap-24 md:gap-44 bg-sf mx-auto w-full">
    <section
      class="relative flex flex-col gap-8 md:gap-0 pt-36 md:pt-40 md:h-fit min-h-screen 2xl:min-h-[75vh] lg:max-h-height-mx overflow-x-clip"
    >
      <div
        class="top-0 left-0 z-10 absolute bg-gradient-to-b from-white to-transparent w-full h-28"
        aria-hidden="true"
      ></div>
      <img
        src="cdn/assets/pages/home/hero-gradient.svg"
        alt=""
        class="top-[-150%] md:-top-[110%] left-1/2 z-0 absolute max-w-none scale-60 md:scale-x-90 md:scale-y-80 -translate-x-1/2 pointer-events-none"
        aria-hidden="true"
      />
      <div
        class="z-10 relative flex flex-col md:flex-1 justify-center items-center mx-auto pb-[14vh] w-[85%] md:w-9/12 max-w-width-mx"
      >
        <div
          class="top-1/2 left-1/2 -z-10 absolute opacity-30 md:opacity-40 blur-[80px] md:blur-[100px] w-72 md:w-[600px] h-72 md:h-[400px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style="background: radial-gradient(ellipse, #a5bbfc 0%, #d5e2ff 40%, transparent 70%)"
          aria-hidden="true"
        ></div>
        <img src="cdn/assets/motifs/ui/motif.svg" alt="" role="presentation" class="w-auto h-6 md:h-8 object-cover" />
        <div class="flex flex-col items-center gap-1.5 md:gap-2.5 mt-5 md:mt-7 w-fit">
          <div
            class="w-full h-px"
            style="background: radial-gradient(circle, #6a88e2 0%, transparent 100%)"
            aria-hidden="true"
          ></div>
          <p class="px-8 font-matter text-sr-indigo-900 text-sm md:text-base text-center leading-normal tracking-wide">
            India's Sovereign AI Platform
          </p>
          <div
            class="w-full h-px"
            style="background: radial-gradient(circle, #6a88e2 0%, transparent 100%)"
            aria-hidden="true"
          ></div>
        </div>
        <h1
  class="hero-title mt-5 md:mt-8 max-w-4xl text-tx text-center leading-[1.1]"
  style="font-size: clamp(38px, 5.8vw, 60px); letter-spacing: -0.01em;"
>
  Super Intelligence from&nbsp;India
</h1>
        <p
          class="mt-2.5 md:mt-3.5 w-full font-matter text-tx-secondary md:text-[20px] text-base text-center leading-[1.75]"
        >
          Built on sovereign compute. Powered by frontier-class&nbsp;models.
          <br class="hidden md:block" />
          Delivering population-scale&nbsp;impact.
        </p>
        <div class="flex flex-wrap justify-center items-center gap-4 md:gap-5 mt-5 md:mt-8">
          <a href="https://indus.sarvam.ai/" aria-label="Sign up for Sarvam">
            <script>
              (() => {
                var l = (n, t) => {
                  let i = async () => {
                      await (
                        await n()
                      )();
                    },
                    e = typeof t.value == "object" ? t.value : void 0,
                    s = { timeout: e == null ? void 0 : e.timeout };
                  "requestIdleCallback" in window ? window.requestIdleCallback(i, s) : setTimeout(i, s.timeout || 200);
                };
                (self.Astro || (self.Astro = {})).idle = l;
                window.dispatchEvent(new Event("astro:idle"));
              })();</script
            ><astro-island
              uid="AxXvP"
              prefix="r19"
              component-url="/_astro/BlurButton.Ba1Hwkkz.js"
              component-export="default"
              renderer-url="/_astro/client.B3N4hhPH.js"
              props='{"variant":[0,"filled"],"size":[0,"md"],"className":[0,"px-6 py-3.5"]}'
              ssr
              client="idle"
              opts='{"name":"BlurButton","value":true}'
              await-children
              ><button
                class="group relative inline-flex items-center justify-center cursor-pointer font-season-mix font-medium overflow-hidden rounded-full touch-manipulation disabled:opacity-40 disabled:pointer-events-none min-h-[44px] text-white active:scale-[0.97] active:duration-150 transition-all duration-350 ease-[cubic-bezier(0.2,0,0,1)] px-6 py-3 text-base px-6 py-3.5"
                style="background: linear-gradient(to bottom, #3a3f5c 0%, #1e2033 100%)"
                ><span
                  aria-hidden="true"
                  class="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-[cubic-bezier(0.2,0,0,1)]"
                  style="
                    --gx: 50%;
                    --gy: 50%;
                    background: radial-gradient(
                      circle 80px at var(--gx) var(--gy),
                      rgba(255, 255, 255, 0.16) 0%,
                      transparent 100%
                    );
                  "
                ></span
                ><span class="relative z-10 flex items-center gap-2"><astro-slot> Sign up </astro-slot></span></button
              ><!--astro:end--></astro-island
            >
          </a>
          <a href="contact-us" aria-label="Contact Sarvam">
            <astro-island
              uid="Z2ophEt"
              prefix="r20"
              component-url="/_astro/BlurButton.Ba1Hwkkz.js"
              component-export="default"
              renderer-url="/_astro/client.B3N4hhPH.js"
              props='{"variant":[0,"outline"],"size":[0,"md"],"className":[0,"px-6 py-3.5"]}'
              ssr
              client="idle"
              opts='{"name":"BlurButton","value":true}'
              await-children
              ><button
                class="group relative inline-flex items-center justify-center cursor-pointer font-season-mix font-medium rounded-full touch-manipulation disabled:opacity-40 disabled:pointer-events-none overflow-hidden min-h-[44px] text-[#1e2033] active:scale-[0.97] active:duration-150 transition-all duration-350 ease-[cubic-bezier(0.2,0,0,1)] px-6 py-3 text-base px-6 py-3.5"
                style="
                  background: linear-gradient(to bottom, #ffffff 0%, #f0f1f5 100%);
                  box-shadow: inset 0 0 0 1px rgba(30, 32, 51, 0.14);
                "
                ><span class="relative z-10 flex items-center gap-2"
                  ><astro-slot> Contact Us </astro-slot></span
                ></button
              ><!--astro:end--></astro-island
            >
          </a>
        </div>
      </div>
      <div class="z-10 relative flex flex-col items-center gap-5 md:gap-8 md:pb-12 w-full shrink-0">
        <p class="font-matter font-medium text-tx-tertiary text-xs uppercase tracking-[2px]">
          India builds with Sarvam
        </p>
        <script>
          (() => {
            var a = (s, i, o) => {
              let r = async () => {
                  await (
                    await s()
                  )();
                },
                t = typeof i.value == "object" ? i.value : void 0,
                c = { rootMargin: t == null ? void 0 : t.rootMargin },
                n = new IntersectionObserver((e) => {
                  for (let l of e)
                    if (l.isIntersecting) {
                      (n.disconnect(), r());
                      break;
                    }
                }, c);
              for (let e of o.children) n.observe(e);
            };
            (self.Astro || (self.Astro = {})).visible = a;
            window.dispatchEvent(new Event("astro:visible"));
          })();</script
        ><astro-island
          uid="ZDCExx"
          prefix="r26"
          component-url="/_astro/LogoCarousel.MF0MQHTI.js"
          component-export="default"
          renderer-url="/_astro/client.B3N4hhPH.js"
          props='{"speed":[0,100],"logoHeight":[0,45],"gap":[0,60],"className":[0,"mx-auto"]}'
          ssr
          client="visible"
          opts='{"name":"LogoCarousel","value":true}'
          await-children
          ><div class="logo-carousel-container w-full mx-auto" role="region" aria-label="Partner logos carousel"
            ><div
              class="logo-carousel-track"
              style="overflow-x: clip; overflow-y: visible; width: 100%; position: relative; height: 45px"
              ><div class="logo-carousel-inner" style="display: flex; align-items: center; width: 4942px; height: 45px"
                ><div
                  class="logo-item"
                  style="
                    width: 61px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/aadhaar.svg"
                      alt="Partner logo 1"
                      loading="eager"
                      style="
                        width: 55px;
                        height: 36px;
                        max-width: 55px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 136px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/axis-bank.svg"
                      alt="Partner logo 2"
                      loading="eager"
                      style="
                        width: 123px;
                        height: 30px;
                        max-width: 123px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 124px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/cred.svg"
                      alt="Partner logo 3"
                      loading="eager"
                      style="
                        width: 112px;
                        height: 37px;
                        max-width: 112px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 162px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/cred-resolve.svg"
                      alt="Partner logo 4"
                      loading="eager"
                      style="
                        width: 147px;
                        height: 17px;
                        max-width: 147px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 149px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/decentro.svg"
                      alt="Partner logo 5"
                      loading="eager"
                      style="
                        width: 135px;
                        height: 27px;
                        max-width: 135px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 134px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/idfc.svg"
                      alt="Partner logo 6"
                      loading="eager"
                      style="
                        width: 121px;
                        height: 34px;
                        max-width: 121px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 38px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/india-mart.svg"
                      alt="Partner logo 7"
                      loading="eager"
                      style="
                        width: 34px;
                        height: 32px;
                        max-width: 34px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 102px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/infosys.svg"
                      alt="Partner logo 8"
                      loading="eager"
                      style="
                        width: 92px;
                        height: 36px;
                        max-width: 92px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 77px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/lic.svg"
                      alt="Partner logo 9"
                      loading="eager"
                      style="
                        width: 70px;
                        height: 35px;
                        max-width: 70px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 116px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/mahindra-finance.svg"
                      alt="Partner logo 10"
                      loading="eager"
                      style="
                        width: 105px;
                        height: 34px;
                        max-width: 105px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 28px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/nabard.svg"
                      alt="Partner logo 11"
                      loading="eager"
                      style="
                        width: 25px;
                        height: 34px;
                        max-width: 25px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 150px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/sbi-life.svg"
                      alt="Partner logo 12"
                      loading="eager"
                      style="
                        width: 136px;
                        height: 25px;
                        max-width: 136px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 98px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/skill-india.svg"
                      alt="Partner logo 13"
                      loading="eager"
                      style="
                        width: 89px;
                        height: 33px;
                        max-width: 89px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 65px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/tata-capital.svg"
                      alt="Partner logo 14"
                      loading="eager"
                      style="
                        width: 59px;
                        height: 34px;
                        max-width: 59px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 131px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/urban-company.svg"
                      alt="Partner logo 15"
                      loading="eager"
                      style="
                        width: 119px;
                        height: 34px;
                        max-width: 119px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 61px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/aadhaar.svg"
                      alt="Partner logo 1"
                      loading="eager"
                      style="
                        width: 55px;
                        height: 36px;
                        max-width: 55px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 136px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/axis-bank.svg"
                      alt="Partner logo 2"
                      loading="eager"
                      style="
                        width: 123px;
                        height: 30px;
                        max-width: 123px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 124px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/cred.svg"
                      alt="Partner logo 3"
                      loading="eager"
                      style="
                        width: 112px;
                        height: 37px;
                        max-width: 112px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 162px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/cred-resolve.svg"
                      alt="Partner logo 4"
                      loading="eager"
                      style="
                        width: 147px;
                        height: 17px;
                        max-width: 147px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 149px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/decentro.svg"
                      alt="Partner logo 5"
                      loading="eager"
                      style="
                        width: 135px;
                        height: 27px;
                        max-width: 135px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 134px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/idfc.svg"
                      alt="Partner logo 6"
                      loading="eager"
                      style="
                        width: 121px;
                        height: 34px;
                        max-width: 121px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 38px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/india-mart.svg"
                      alt="Partner logo 7"
                      loading="eager"
                      style="
                        width: 34px;
                        height: 32px;
                        max-width: 34px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 102px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/infosys.svg"
                      alt="Partner logo 8"
                      loading="eager"
                      style="
                        width: 92px;
                        height: 36px;
                        max-width: 92px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 77px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/lic.svg"
                      alt="Partner logo 9"
                      loading="eager"
                      style="
                        width: 70px;
                        height: 35px;
                        max-width: 70px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 116px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/mahindra-finance.svg"
                      alt="Partner logo 10"
                      loading="eager"
                      style="
                        width: 105px;
                        height: 34px;
                        max-width: 105px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 28px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/nabard.svg"
                      alt="Partner logo 11"
                      loading="eager"
                      style="
                        width: 25px;
                        height: 34px;
                        max-width: 25px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 150px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/sbi-life.svg"
                      alt="Partner logo 12"
                      loading="eager"
                      style="
                        width: 136px;
                        height: 25px;
                        max-width: 136px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 98px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/skill-india.svg"
                      alt="Partner logo 13"
                      loading="eager"
                      style="
                        width: 89px;
                        height: 33px;
                        max-width: 89px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 65px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/tata-capital.svg"
                      alt="Partner logo 14"
                      loading="eager"
                      style="
                        width: 59px;
                        height: 34px;
                        max-width: 59px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div
                ><div
                  class="logo-item"
                  style="
                    width: 131px;
                    height: 45px;
                    margin-right: 60px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                    z-index: 1;
                  "
                  ><div class="flex items-center justify-center h-full w-full overflow-visible"
                    ><img
                      class="max-w-none shrink-0"
                      src="cdn/assets/logos/customers/urban-company.svg"
                      alt="Partner logo 15"
                      loading="eager"
                      style="
                        width: 119px;
                        height: 34px;
                        max-width: 119px;
                        object-fit: contain;
                        transform-origin: center center;
                        transform: scale(1);
                        filter: grayscale(100%) brightness(0.8);
                        opacity: 0.5;
                        transition:
                          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      " /></div></div></div></div
            ><style>
              .logo-carousel-container {
                position: relative;
                width: 100%;
                will-change: transform;
              }

              .logo-carousel-container,
              .logo-carousel-container * {
                border-radius: 0 !important;
              }

              .logo-carousel-track {
                mask: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
                -webkit-mask: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
              }

              .logo-item img {
                max-width: none;
                will-change: filter, transform;
                pointer-events: none;
              }

              .logo-item:focus-visible {
                outline: 2px solid #3b82f6;
                outline-offset: 2px;
              }

              .logo-carousel-container * {
                backface-visibility: hidden;
                -webkit-backface-visibility: hidden;
              }
            </style></div
          ><!--astro:end--></astro-island
        >
      </div>
    </section>
    <section
      class="relative mx-auto -mt-10 md:-mt-24 w-full max-w-[1680px] overflow-x-clip playground-section"
      data-scale-reveal
    >
      <div
        class="hidden md:block -right-[10vw] bottom-[40%] md:bottom-[28%] -left-[10vw] absolute blur-[80px] h-1/5 md:h-2/5 pointer-events-none"
        style="
          transform: scaleY(1.2);
          background: linear-gradient(180deg, #c7d2fe 0%, #a5b4fc 30%, #818cf8 50%, #a5b4fc 70%, #c7d2fe 100%);
        "
      ></div>
      <div class="relative flex flex-col items-center gap-8 md:gap-14 mx-auto w-[88%] md:w-10/12 2xl:max-w-width-mx">
        <astro-island
          uid="ZrCush"
          prefix="r27"
          component-url="/_astro/SectionHeading.Cd13ITnb.js"
          component-export="default"
          renderer-url="/_astro/client.B3N4hhPH.js"
          props='{"heading":[0,"The AI Platform India Builds On"]}'
          ssr
          client="idle"
          opts='{"name":"SectionHeading","value":true}'
          await-children
          ><div class="section-heading-reveal flex flex-col items-center text-center gap-6 w-full"
            ><div class="flex flex-col items-center gap-6 w-full text-center"
              ><div class="flex flex-col items-center gap-4 w-full text-center"
                ><h2
                  class="font-season-mix font-medium leading-[1.2] tracking-[-0.02em] w-full text-tx whitespace-pre-line text-[28px] md:text-[36px]"
                  >The AI Platform<br />India Builds On</h2
                ></div
              ></div
            ></div
          ><!--astro:end--></astro-island
        >
        <astro-island
          uid="8657Q"
          prefix="r28"
          component-url="/_astro/PlaygroundShowcase.CIXc3ouJ.js"
          component-export="default"
          renderer-url="/_astro/client.B3N4hhPH.js"
          props='{"voiceAgentsMotifs":[1,[[0,{"src":[0,"cdn/assets/products/voice-agents/motifs/voice-agents-motif-01.svg"],"type":[0,"Cart Recovery"]}],[0,{"src":[0,"cdn/assets/products/voice-agents/motifs/voice-agents-motif-02.svg"],"type":[0,"Appointment Booking"]}],[0,{"src":[0,"cdn/assets/products/voice-agents/motifs/voice-agents-motif-03.svg"],"type":[0,"Payment follow-ups"]}]]]}'
          ssr
          client="visible"
          opts='{"name":"PlaygroundShowcase","value":true}'
          await-children
          ><div class="flex flex-col w-full"
            ><div
              class="relative w-full rounded-2xl md:rounded-3xl border border-white/20 outline-1 outline outline-white/10 bg-gradient-to-b from-black/15 to-black/5 backdrop-blur-xl p-1.5"
              ><div class="relative z-30 md:hidden mb-0.5 rounded-t-xl md:rounded-t-2xl rounded-b-sm"
                ><div class="relative"
                  ><button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded="false"
                    aria-label="Product demos"
                    class="type-body font-matter font-medium leading-[1.35] flex items-center gap-2.5 px-5 py-3 w-full text-left bg-white text-tx cursor-pointer transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-sr-indigo-200 rounded-t-xl rounded-b-sm"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="currentColor"
                      class="shrink-0 text-tx-tertiary"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        d="M5.59988 5.65676C6.79984 4.48521 9.79974 3.3138 11.5997 4.48521C14.9486 6.66473 12.8 10.3431 9.20016 10.9288C10.8001 10.9288 14 11.6318 14 14.4435C14 18.7942 9.19988 21.1845 5.6 19.4092C2.00012 17.6339 2 14.7573 2 13"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      ></path>
                      <path
                        d="M19.0006 10C18.052 13.7503 14.9728 13.2464 13.1992 12.3941"
                        stroke="currentColor"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      ></path>
                      <path
                        d="M19 5L19 20"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      ></path>
                      <path
                        d="M16 4C17.5 4.43301 19.5 4.86603 22 4"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      ></path></svg
                    ><span class="flex-1 truncate">Voice Agents</span
                    ><svg
                      class="shrink-0 text-tx-tertiary transition-transform duration-150"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M6 9l6 6 6-6"></path></svg></button></div></div
              ><div
                class="relative z-[2] hidden md:flex items-center gap-0 mb-0.5 overflow-hidden rounded-t-xl md:rounded-t-2xl rounded-b-sm"
                role="tablist"
                aria-label="Product demos"
                ><button
                  type="button"
                  role="tab"
                  aria-selected="true"
                  id="playground-tab-voice-agents"
                  class="type-body font-matter font-medium leading-[1.35] flex flex-1 items-center justify-center gap-2 px-6 py-3 rounded-none whitespace-nowrap cursor-pointer transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sr-indigo-400 border-x border-transparent text-ct-accent-indigo bg-white shadow-[inset_0_0_6px_rgba(0,0,0,0.08)] border-st ring-1 ring-st"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="shrink-0"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      d="M5.59988 5.65676C6.79984 4.48521 9.79974 3.3138 11.5997 4.48521C14.9486 6.66473 12.8 10.3431 9.20016 10.9288C10.8001 10.9288 14 11.6318 14 14.4435C14 18.7942 9.19988 21.1845 5.6 19.4092C2.00012 17.6339 2 14.7573 2 13"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    ></path>
                    <path
                      d="M19.0006 10C18.052 13.7503 14.9728 13.2464 13.1992 12.3941"
                      stroke="currentColor"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    ></path>
                    <path
                      d="M19 5L19 20"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    ></path>
                    <path
                      d="M16 4C17.5 4.43301 19.5 4.86603 22 4"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    ></path></svg
                  >Voice Agents</button
                ><button
                  type="button"
                  role="tab"
                  aria-selected="false"
                  id="playground-tab-tts"
                  class="type-body font-matter font-medium leading-[1.35] flex flex-1 items-center justify-center gap-2 px-6 py-3 rounded-none whitespace-nowrap cursor-pointer transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sr-indigo-400 border-x border-transparent text-tx-tertiary bg-sf-tertiary"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="shrink-0"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      d="M9 11V14"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    ></path>
                    <path
                      d="M11.5 3C7.27027 3 5.1554 3 3.75276 4.19797C3.55358 4.36808 3.36808 4.55358 3.19797 4.75276C2 6.1554 2 8.27027 2 12.5C2 16.7297 2 18.8446 3.19797 20.2472C3.36808 20.4464 3.55358 20.6319 3.75276 20.802C5.1554 22 7.27027 22 11.5 22C15.7297 22 17.8446 22 19.2472 20.802C19.4464 20.6319 19.6319 20.4464 19.802 20.2472C21 18.8446 21 16.7297 21 12.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    ></path>
                    <path
                      d="M12 8V17"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    ></path>
                    <path
                      d="M15 10V15"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    ></path>
                    <path
                      d="M6 12V13"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    ></path>
                    <path
                      d="M15.3881 5.08714C16.796 4.91193 17.9119 3.79602 18.0871 2.38812C18.1137 2.17498 18.2852 2 18.5 2C18.7148 2 18.8863 2.17498 18.9129 2.38812C19.0881 3.79602 20.204 4.91193 21.6119 5.08714C21.825 5.11366 22 5.28522 22 5.5C22 5.71478 21.825 5.88634 21.6119 5.91286C20.204 6.08807 19.0881 7.20398 18.9129 8.61188C18.8863 8.82502 18.7148 9 18.5 9C18.2852 9 18.1137 8.82502 18.0871 8.61188C17.9119 7.20398 16.796 6.08807 15.3881 5.91286C15.175 5.88634 15 5.71478 15 5.5C15 5.28522 15.175 5.11366 15.3881 5.08714Z"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    ></path></svg
                  >Text to Speech</button
                ><button
                  type="button"
                  role="tab"
                  aria-selected="false"
                  id="playground-tab-stt"
                  class="type-body font-matter font-medium leading-[1.35] flex flex-1 items-center justify-center gap-2 px-6 py-3 rounded-none whitespace-nowrap cursor-pointer transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sr-indigo-400 border-x border-transparent text-tx-tertiary bg-sf-tertiary"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="shrink-0"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      d="M17 11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V7C7 4.23858 9.23858 2 12 2"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    ></path>
                    <path
                      d="M20 11C20 15.4183 16.4183 19 12 19M12 19C7.58172 19 4 15.4183 4 11M12 19V22"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    ></path>
                    <path
                      d="M14.3327 4.64612C15.5394 4.49594 16.4959 3.53944 16.6461 2.33267C16.6689 2.14999 16.8159 2 17 2C17.1841 2 17.3311 2.14999 17.3539 2.33267C17.5041 3.53944 18.4606 4.49594 19.6673 4.64612C19.85 4.66885 20 4.81591 20 5C20 5.1841 19.85 5.33115 19.6673 5.35388C18.4606 5.50406 17.5041 6.46056 17.3539 7.66733C17.3311 7.85001 17.1841 8 17 8C16.8159 8 16.6689 7.85001 16.6461 7.66733C16.4959 6.46056 15.5394 5.50406 14.3327 5.35388C14.15 5.33115 14 5.1841 14 5C14 4.81591 14.15 4.66885 14.3327 4.64612Z"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    ></path></svg
                  >Speech to Text</button
                ><button
                  type="button"
                  role="tab"
                  aria-selected="false"
                  id="playground-tab-vision"
                  class="type-body font-matter font-medium leading-[1.35] flex flex-1 items-center justify-center gap-2 px-6 py-3 rounded-none whitespace-nowrap cursor-pointer transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sr-indigo-400 border-x border-transparent text-tx-tertiary bg-sf-tertiary"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="shrink-0"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      d="M19 12.001V10.6578C19 9.84033 19 9.43158 18.8478 9.06404C18.6955 8.69649 18.4065 8.40746 17.8284 7.8294L13.0919 3.09286C12.593 2.59397 12.3436 2.34453 12.0345 2.19672C11.9702 2.16598 11.9044 2.1387 11.8372 2.11499C11.5141 2.00098 11.1614 2.00098 10.4558 2.00098C7.21082 2.00098 5.58831 2.00098 4.48933 2.88705C4.26731 3.06606 4.06508 3.26829 3.88607 3.49031C3 4.58928 3 6.2118 3 9.45682V14.001C3 17.7722 3 19.6578 4.17157 20.8294C5.34315 22.001 7.22876 22.001 11 22.001H13.0345M12 2.50098V3.00098C12 5.8294 12 7.24362 12.8787 8.1223C13.7574 9.00098 15.1716 9.00098 18 9.00098H18.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    ></path>
                    <path
                      d="M17.5 15.001L17.7579 15.698C18.0961 16.612 18.2652 17.069 18.5986 17.4024C18.932 17.7357 19.389 17.9048 20.303 18.2431L21 18.501L20.303 18.7589C19.389 19.0971 18.932 19.2662 18.5986 19.5996C18.2652 19.933 18.0961 20.39 17.7579 21.3039L17.5 22.001L17.2421 21.3039C16.9039 20.39 16.7348 19.933 16.4014 19.5996C16.068 19.2662 15.611 19.0971 14.697 18.7589L14 18.501L14.697 18.2431C15.611 17.9048 16.068 17.7357 16.4014 17.4024C16.7348 17.069 16.9039 16.612 17.2421 15.698L17.5 15.001Z"
                      stroke="currentColor"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    ></path></svg
                  >Document Digitisation</button
                ></div
              ><div class="relative w-full bg-sf rounded-t-sm rounded-b-xl md:rounded-b-[20px] overflow-hidden"
                ><!--$?--><template id="r28B:0"></template
                ><div class="flex justify-center items-center w-full bg-sf min-h-[460px] md:min-h-[620px]"
                  ><div
                    class="border-2 border-st-secondary border-t-sr-indigo-400 rounded-full w-8 h-8 animate-spin"
                  ></div></div
                ><!--/$--></div
              ></div
            ></div
          ><script>
            requestAnimationFrame(function () {
              $RT = performance.now();
            });</script
          ><div hidden id="r28S:0"
            ><div class="relative w-full min-h-[460px] md:min-h-[620px]"
              ><div
                class="absolute inset-0 w-full transition-opacity duration-300 ease-in-out opacity-100 z-10"
                aria-hidden="false"
                ><div class="relative [&amp;&gt;*]:!border-0 [&amp;&gt;*]:!outline-none [&amp;&gt;*]:!rounded-none"
                  ><template id="r28P:1"></template></div></div></div></div
          ><div hidden id="r28S:1"
            ><div class="w-full"
              ><div class="relative"
                ><div class="border-b border-st-secondary px-4 py-4 lg:hidden"
                  ><p class="font-matter text-base font-medium text-tx-secondary">Choose an agent</p
                  ><div class="mt-3"
                    ><div class="relative"
                      ><button
                        type="button"
                        aria-haspopup="listbox"
                        aria-expanded="false"
                        aria-label="Available voice agents"
                        class="type-body font-matter font-medium leading-[1.35] flex items-center gap-2.5 w-full text-left bg-transparent text-tx cursor-pointer transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-sr-indigo-200 py-2.5"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          color="currentColor"
                          class="shrink-0 text-sr-green-700"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            d="M10.5 20.25C10.5 20.6642 10.1642 21 9.75 21C9.33579 21 9 20.6642 9 20.25C9 19.8358 9.33579 19.5 9.75 19.5C10.1642 19.5 10.5 19.8358 10.5 20.25Z"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                          ></path>
                          <path
                            d="M19 20.25C19 20.6642 18.6642 21 18.25 21C17.8358 21 17.5 20.6642 17.5 20.25C17.5 19.8358 17.8358 19.5 18.25 19.5C18.6642 19.5 19 19.8358 19 20.25Z"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                          ></path>
                          <path
                            d="M2 3H2.20664C3.53124 3 4.19354 3 4.6255 3.40221C5.05746 3.80441 5.10464 4.46503 5.19902 5.78626L5.45035 9.30496C5.5924 11.2936 5.66342 12.2879 5.96476 13.0961C6.62531 14.8677 8.08229 16.2244 9.89648 16.757C10.7241 17 11.7267 17 13.7317 17C15.8373 17 16.89 17 17.7417 16.7416C19.6593 16.1599 21.1599 14.6593 21.7416 12.7417C22 11.89 22 10.8433 22 8.75C22 8.05222 22 7.70333 21.9139 7.41943C21.72 6.78023 21.2198 6.28002 20.5806 6.08612C20.2967 6 19.9478 6 19.25 6H5.5"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                          ></path>
                          <path
                            d="M16 10V13M11 10V13"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                          ></path></svg
                        ><span class="flex-1 truncate">Cart Recovery Nudge</span
                        ><svg
                          class="shrink-0 text-tx-tertiary transition-transform duration-150"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M6 9l6 6 6-6"></path></svg></button></div></div></div
                ><div class="grid min-w-0 lg:overflow-hidden lg:h-[620px] lg:grid-cols-[0.72fr_1fr_1.16fr]"
                  ><div
                    class="flex min-w-0 flex-col p-6 md:p-8 hidden border-b border-st-secondary lg:flex lg:min-h-0 lg:border-b-0 lg:border-r"
                    ><div class="border-b border-st-secondary pb-5"
                      ><p class="font-matter text-base font-medium text-tx-secondary">Choose an agent</p></div
                    ><div
                      class="mt-5 flex min-h-0 flex-1 flex-col gap-2.5"
                      role="group"
                      aria-label="Available voice agents"
                      ><button
                        type="button"
                        aria-pressed="true"
                        class="cursor-pointer text-left transition-colors active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ct-accent-indigo/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-lg disabled:cursor-not-allowed disabled:opacity-45 min-h-11 min-w-0 py-2"
                        ><span class="flex items-start justify-between gap-2"
                          ><span class="flex items-center gap-3"
                            ><span class="relative flex shrink-0 items-center" style="width: 20px; height: 20px"
                              ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                color="currentColor"
                                class="absolute inset-0 transition-opacity duration-150 opacity-0 text-tx-tertiary"
                                stroke-width="2"
                                stroke="currentColor"
                              >
                                <path
                                  d="M10.5 20.25C10.5 20.6642 10.1642 21 9.75 21C9.33579 21 9 20.6642 9 20.25C9 19.8358 9.33579 19.5 9.75 19.5C10.1642 19.5 10.5 19.8358 10.5 20.25Z"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                ></path>
                                <path
                                  d="M19 20.25C19 20.6642 18.6642 21 18.25 21C17.8358 21 17.5 20.6642 17.5 20.25C17.5 19.8358 17.8358 19.5 18.25 19.5C18.6642 19.5 19 19.8358 19 20.25Z"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                ></path>
                                <path
                                  d="M2 3H2.20664C3.53124 3 4.19354 3 4.6255 3.40221C5.05746 3.80441 5.10464 4.46503 5.19902 5.78626L5.45035 9.30496C5.5924 11.2936 5.66342 12.2879 5.96476 13.0961C6.62531 14.8677 8.08229 16.2244 9.89648 16.757C10.7241 17 11.7267 17 13.7317 17C15.8373 17 16.89 17 17.7417 16.7416C19.6593 16.1599 21.1599 14.6593 21.7416 12.7417C22 11.89 22 10.8433 22 8.75C22 8.05222 22 7.70333 21.9139 7.41943C21.72 6.78023 21.2198 6.28002 20.5806 6.08612C20.2967 6 19.9478 6 19.25 6H5.5"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                ></path>
                                <path
                                  d="M16 10V13M11 10V13"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                ></path></svg
                              ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                color="currentColor"
                                class="absolute inset-0 transition-opacity duration-150 opacity-100 text-sr-green-700"
                              >
                                <path
                                  d="M8.24997 20.25C8.24997 19.4216 8.92154 18.75 9.74997 18.75C10.5784 18.75 11.25 19.4216 11.25 20.25C11.25 21.0784 10.5784 21.75 9.74997 21.75C8.92154 21.75 8.24997 21.0784 8.24997 20.25Z"
                                  fill="currentColor"
                                ></path>
                                <path
                                  d="M16.75 20.25C16.75 19.4216 17.4215 18.75 18.25 18.75C19.0784 18.75 19.75 19.4216 19.75 20.25C19.75 21.0784 19.0784 21.75 18.25 21.75C17.4215 21.75 16.75 21.0784 16.75 20.25Z"
                                  fill="currentColor"
                                ></path>
                                <path
                                  d="M2.457 2.25L3.35739 2.25684C3.63809 2.26392 3.89755 2.27829 4.12985 2.30859C4.62309 2.37298 5.12894 2.5219 5.55661 2.91992C5.98434 3.31819 6.16913 3.81228 6.26852 4.2998C6.32538 4.57871 6.36044 4.8994 6.39059 5.25H19.25C19.8927 5.25 20.3808 5.2418 20.7978 5.36816C21.6766 5.63475 22.3642 6.32335 22.6308 7.20215C22.7573 7.61925 22.75 8.107 22.75 8.75C22.75 10.7885 22.7576 11.9741 22.459 12.959C21.8045 15.1163 20.1162 16.8046 17.959 17.459C16.974 17.7577 15.7816 17.75 13.7314 17.75C11.7786 17.75 10.6415 17.7575 9.68454 17.4766C7.64398 16.8772 6.00477 15.3511 5.26169 13.3584C4.94213 12.5012 4.82222 11.2842 4.70309 9.62598L4.45114 6.10742C4.40202 5.41976 4.37009 5.001 4.30856 4.69922C4.25287 4.42614 4.19864 4.38779 4.19431 4.38379C4.19009 4.37987 4.14796 4.32814 3.87106 4.29199C3.71832 4.27207 3.53698 4.26134 3.30759 4.25586L2.457 4.25H2.24997C1.69768 4.25 1.24997 3.80228 1.24997 3.25C1.24997 2.69772 1.69768 2.25 2.24997 2.25H2.457ZM11 9.25C10.5858 9.25 10.25 9.58579 10.25 10V13C10.25 13.4142 10.5858 13.75 11 13.75C11.4142 13.75 11.75 13.4142 11.75 13V10C11.75 9.58579 11.4142 9.25 11 9.25ZM16 9.25C15.5858 9.25 15.25 9.58579 15.25 10V13C15.25 13.4142 15.5858 13.75 16 13.75C16.4142 13.75 16.75 13.4142 16.75 13V10C16.75 9.58579 16.4142 9.25 16 9.25Z"
                                  fill="currentColor"
                                ></path></svg></span
                            ><span
                              class="font-matter font-medium leading-snug transition-colors duration-150 text-sr-green-700 text-base"
                              >Cart Recovery Nudge</span
                            ></span
                          ></span
                        ></button
                      ><button
                        type="button"
                        aria-pressed="false"
                        class="cursor-pointer text-left transition-colors active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ct-accent-indigo/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-lg disabled:cursor-not-allowed disabled:opacity-45 min-h-11 min-w-0 py-2"
                        ><span class="flex items-start justify-between gap-2"
                          ><span class="flex items-center gap-3"
                            ><span class="relative flex shrink-0 items-center" style="width: 20px; height: 20px"
                              ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                color="currentColor"
                                class="absolute inset-0 transition-opacity duration-150 opacity-100 text-tx-tertiary"
                                stroke-width="2"
                                stroke="currentColor"
                              >
                                <path
                                  d="M2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 15.5375 22 17.3062 20.9472 18.4871C20.7788 18.676 20.5932 18.8506 20.3925 19.0091C19.1379 20 17.2586 20 13.5 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12Z"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                ></path>
                                <path
                                  d="M10 16H11.5"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                ></path>
                                <path
                                  d="M14.5 16L18 16"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                ></path>
                                <path
                                  d="M2 9H22"
                                  stroke="currentColor"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                ></path></svg
                              ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                color="currentColor"
                                class="absolute inset-0 transition-opacity duration-150 opacity-0 text-sr-indigo-700"
                              >
                                <path
                                  d="M13.5476 3.25C15.3866 3.24999 16.8308 3.24998 17.9694 3.3786C19.1316 3.50988 20.074 3.78362 20.8574 4.40228C21.0919 4.58749 21.3093 4.79205 21.507 5.0138C22.1732 5.76101 22.4707 6.66669 22.6124 7.77785C22.6287 7.9057 22.6368 7.96963 22.6222 8.02578C22.5987 8.11553 22.5299 8.19375 22.4438 8.22835C22.39 8.25 22.3226 8.25 22.1878 8.25H1.81224H1.81223C1.67746 8.25 1.61007 8.25 1.55622 8.22835C1.47015 8.19375 1.40128 8.11553 1.37784 8.02578C1.36318 7.96963 1.37133 7.9057 1.38764 7.77785C1.52933 6.66669 1.82682 5.76101 2.49299 5.0138C2.69069 4.79205 2.90812 4.58749 3.14264 4.40228C3.92602 3.78362 4.86843 3.50988 6.03059 3.3786C7.16918 3.24998 8.61347 3.24999 10.4525 3.25H13.5476ZM22.75 12.0527C22.75 13.7768 22.75 15.1427 22.6124 16.2222C22.4707 17.3333 22.1732 18.239 21.507 18.9862C21.3093 19.2079 21.0919 19.4125 20.8574 19.5977C20.074 20.2164 19.1316 20.4901 17.9694 20.6214C16.8308 20.75 15.3866 20.75 13.5475 20.75H10.4525C8.61345 20.75 7.16917 20.75 6.03058 20.6214C4.86842 20.4901 3.926 20.2164 3.14263 19.5977C2.90811 19.4125 2.69068 19.2079 2.49298 18.9862C1.82681 18.239 1.52932 17.3333 1.38763 16.2222C1.24998 15.1427 1.24999 13.7767 1.25 12.0527V11.9473C1.25 11.3715 1.24999 10.8357 1.25512 10.3371C1.25795 10.0614 1.25937 9.92356 1.34704 9.83678C1.43472 9.75 1.57361 9.75 1.85139 9.75H22.1486C22.4264 9.75 22.5653 9.75 22.653 9.83678C22.7406 9.92356 22.7421 10.0614 22.7449 10.3371C22.75 10.8355 22.75 11.3712 22.75 11.9467V11.9468V11.947V11.9471V11.9472V12.0527ZM10.25 16C10.25 15.5858 10.5858 15.25 11 15.25H12.5C12.9142 15.25 13.25 15.5858 13.25 16C13.25 16.4142 12.9142 16.75 12.5 16.75H11C10.5858 16.75 10.25 16.4142 10.25 16ZM15.5 15.25C15.0858 15.25 14.75 15.5858 14.75 16C14.75 16.4142 15.0858 16.75 15.5 16.75H19C19.4142 16.75 19.75 16.4142 19.75 16C19.75 15.5858 19.4142 15.25 19 15.25H15.5Z"
                                  fill="currentColor"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                ></path></svg></span
                            ><span
                              class="font-matter font-medium leading-snug transition-colors duration-150 text-tx-tertiary text-base"
                              >EMI Payment Reminder</span
                            ></span
                          ></span
                        ></button
                      ><button
                        type="button"
                        aria-pressed="false"
                        class="cursor-pointer text-left transition-colors active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ct-accent-indigo/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-lg disabled:cursor-not-allowed disabled:opacity-45 min-h-11 min-w-0 py-2"
                        ><span class="flex items-start justify-between gap-2"
                          ><span class="flex items-center gap-3"
                            ><span class="relative flex shrink-0 items-center" style="width: 20px; height: 20px"
                              ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                color="currentColor"
                                class="absolute inset-0 transition-opacity duration-150 opacity-100 text-tx-tertiary"
                                stroke-width="2"
                                stroke="currentColor"
                              >
                                <path
                                  d="M16 2V6M8 2V6"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                ></path>
                                <path
                                  d="M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                ></path>
                                <path
                                  d="M3 10H21"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                ></path>
                                <path
                                  d="M12.1258 14H12.0008M12.1258 18H12.0008M7.625 14H7.5M7.625 18H7.5M16.625 14H16.5M12.2508 14C12.2508 14.1381 12.1389 14.25 12.0008 14.25C11.8628 14.25 11.7508 14.1381 11.7508 14C11.7508 13.8619 11.8628 13.75 12.0008 13.75C12.1389 13.75 12.2508 13.8619 12.2508 14ZM12.2508 18C12.2508 18.1381 12.1389 18.25 12.0008 18.25C11.8628 18.25 11.7508 18.1381 11.7508 18C11.7508 17.8619 11.8628 17.75 12.0008 17.75C12.1389 17.75 12.2508 17.8619 12.2508 18ZM7.75 14C7.75 14.1381 7.63807 14.25 7.5 14.25C7.36193 14.25 7.25 14.1381 7.25 14C7.25 13.8619 7.36193 13.75 7.5 13.75C7.63807 13.75 7.75 13.8619 7.75 14ZM7.75 18C7.75 18.1381 7.63807 18.25 7.5 18.25C7.36193 18.25 7.25 18.1381 7.25 18C7.25 17.8619 7.36193 17.75 7.5 17.75C7.63807 17.75 7.75 17.8619 7.75 18ZM16.75 14C16.75 14.1381 16.6381 14.25 16.5 14.25C16.3619 14.25 16.25 14.1381 16.25 14C16.25 13.8619 16.3619 13.75 16.5 13.75C16.6381 13.75 16.75 13.8619 16.75 14Z"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                ></path></svg
                              ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                color="currentColor"
                                class="absolute inset-0 transition-opacity duration-150 opacity-0 text-sr-orange-700"
                              >
                                <path
                                  d="M8.1 1.25C8.63848 1.25 9.075 1.68754 9.075 2.22727V3.21284C9.6529 3.20453 10.2784 3.20453 10.9537 3.20454H13.0463C13.7216 3.20453 14.3471 3.20453 14.925 3.21284V2.22727C14.925 1.68754 15.3615 1.25 15.9 1.25C16.4385 1.25 16.875 1.68754 16.875 2.22727V3.29947C17.0513 3.31556 17.221 3.33437 17.3843 3.35638C18.5544 3.51407 19.5397 3.85141 20.3221 4.63573C21.1046 5.42004 21.4412 6.40758 21.5985 7.58045C21.75 8.71014 21.75 10.1465 21.75 11.9285V14.026C21.75 15.808 21.75 17.2444 21.5985 18.3741C21.4412 19.547 21.1046 20.5345 20.3221 21.3188C19.5397 22.1031 18.5544 22.4405 17.3843 22.5982C16.2572 22.75 14.8242 22.75 13.0463 22.75H10.9537C9.17581 22.75 7.74279 22.75 6.61573 22.5982C5.44558 22.4405 4.46035 22.1031 3.67786 21.3188C2.89537 20.5345 2.5588 19.547 2.40148 18.3741C2.24995 17.2444 2.24998 15.8081 2.25 14.0261V11.9285C2.24998 10.1465 2.24995 8.71012 2.40148 7.58045C2.5588 6.40758 2.89537 5.42004 3.67786 4.63573C4.46035 3.85141 5.44558 3.51407 6.61573 3.35638C6.77902 3.33437 6.94874 3.31556 7.125 3.29947V2.22727C7.125 1.68754 7.56152 1.25 8.1 1.25ZM4.21386 9.75C4.20045 10.3958 4.20001 11.1378 4.20001 12V13.9545C4.20001 15.8249 4.20208 17.1294 4.3341 18.1137C4.46235 19.0698 4.69693 19.5761 5.05673 19.9367C5.41652 20.2974 5.92166 20.5325 6.87557 20.6611C7.85752 20.7934 9.15897 20.7955 11.025 20.7955H12.975C14.8411 20.7955 16.1425 20.7934 17.1245 20.6611C18.0784 20.5325 18.5835 20.2974 18.9433 19.9367C19.3031 19.5761 19.5377 19.0698 19.6659 18.1137C19.7979 17.1294 19.8 15.8249 19.8 13.9545V12C19.8 11.1378 19.7996 10.3958 19.7862 9.75H4.21386Z"
                                  fill="currentColor"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                ></path>
                                <path
                                  d="M6.49042 13.2734C6.49042 12.7212 6.93813 12.2734 7.49042 12.2734H7.49939C8.05167 12.2734 8.49939 12.7212 8.49939 13.2734C8.49939 13.8257 8.05167 14.2734 7.49939 14.2734H7.49042C6.93813 14.2734 6.49042 13.8257 6.49042 13.2734ZM10.9955 13.2734C10.9955 12.7212 11.4432 12.2734 11.9955 12.2734H12.0045C12.5568 12.2734 13.0045 12.7212 13.0045 13.2734C13.0045 13.8257 12.5568 14.2734 12.0045 14.2734H11.9955C11.4432 14.2734 10.9955 13.8257 10.9955 13.2734ZM15.5 13.2734C15.5 12.7212 15.9477 12.2734 16.5 12.2734H16.509C17.0613 12.2734 17.509 12.7212 17.509 13.2734C17.509 13.8257 17.0613 14.2734 16.509 14.2734H16.5C15.9477 14.2734 15.5 13.8257 15.5 13.2734ZM6.49042 17.2734C6.49042 16.7212 6.93813 16.2734 7.49042 16.2734H7.49939C8.05167 16.2734 8.49939 16.7212 8.49939 17.2734C8.49939 17.8257 8.05167 18.2734 7.49939 18.2734H7.49042C6.93813 18.2734 6.49042 17.8257 6.49042 17.2734ZM10.9955 17.2734C10.9955 16.7212 11.4432 16.2734 11.9955 16.2734H12.0045C12.5568 16.2734 13.0045 16.7212 13.0045 17.2734C13.0045 17.8257 12.5568 18.2734 12.0045 18.2734H11.9955C11.4432 18.2734 10.9955 17.8257 10.9955 17.2734Z"
                                  fill="currentColor"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                ></path></svg></span
                            ><span
                              class="font-matter font-medium leading-snug transition-colors duration-150 text-tx-tertiary text-base"
                              >Appointment Booking</span
                            ></span
                          ></span
                        ></button
                      ></div
                    ></div
                  ><div
                    class="relative flex min-w-0 flex-col items-center overflow-hidden border-b border-st-secondary bg-sf-secondary px-5 py-6 lg:min-h-0 lg:justify-center lg:border-b-0 lg:border-r lg:p-8"
                    ><div
                      class="pointer-events-none absolute inset-0 opacity-[0.08]"
                      style="
                        background-image: radial-gradient(circle, #1e2033 1px, transparent 1px);
                        background-size: 12px 12px;
                      "
                      aria-hidden="true"
                    ></div
                    ><p class="hidden lg:block text-center font-matter text-lg font-medium text-tx"
                      >Cart Recovery Nudge</p
                    ><div class="w-full max-w-[240px] lg:max-w-[280px]"
                      ><div class="relative aspect-square w-full"
                        ><canvas class="block h-full w-full"></canvas
                        ><div
                          class="pointer-events-none absolute top-1/2 left-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 leading-none opacity-[0.04] filter-none [&amp;_svg]:block [&amp;_svg]:h-full [&amp;_svg]:w-full"
                          aria-hidden="true"
                          ><svg viewBox="0 0 403 403" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M0.0167597 202.069C0.389108 179.757 4.45934 158.281 10.9801 137.176C17.8453 114.961 28.918 94.9075 43.2743 76.4286C56.3042 59.6551 71.9451 45.6229 89.7387 33.762C109.555 20.5553 131.116 11.0444 154.516 5.68171C171.646 1.75522 189.011 -0.606102 206.703 0.135769C230.382 1.1287 253.388 5.0959 275.394 14.0278C299.962 23.9978 322.238 37.2994 341.12 55.6313C362.584 76.4693 378.835 100.524 389.032 128.396C394.576 143.543 397.929 159.12 400.529 174.93C402.716 188.241 402.926 201.631 402.279 214.998C400.966 242.121 394.494 268.033 381.969 292.474C372.1 311.735 359.945 329.429 344.236 344.624C326.541 361.744 306.35 375.484 283.406 385.359C270.705 390.834 257.531 395.208 244.038 398.43C236.502 400.23 228.734 400.837 221.022 401.554C213.705 402.237 206.342 402.809 198.993 402.526C187.652 402.092 176.34 401.189 165.144 399.26C141.535 395.189 119.587 386.884 99.0125 375.025C84.733 366.796 71.61 357.134 60.0672 345.542C34.1122 319.477 15.6926 289.217 6.2629 254.014C3.5564 243.892 1.90643 233.599 0.919704 223.177C0.261113 216.222 -0.0879632 209.278 0.0190869 202.067L0.0167597 202.069ZM124.439 58.5129C117.16 58.3138 109.894 58.4269 102.678 59.4877C101.151 59.7139 99.5385 59.6325 98.7496 61.6319C92.4313 77.6047 90.8092 94.0978 93.2993 110.91C95.5101 125.829 101.119 139.635 109.403 152.4C110.032 153.373 110.497 154.526 111.917 155.087C130.595 122.902 158.309 103.939 196.805 100.944C196.752 100.524 196.794 100.254 196.682 100.073C196.309 99.4628 195.914 98.8566 195.469 98.2912C190.673 92.1546 185.227 86.5243 179.221 81.4928C168.695 72.7079 157.071 65.8027 143.604 62.0707C137.469 60.3721 131.216 59.2932 124.439 58.5129ZM252.967 63.7716C233.505 71.2694 218.078 83.5058 206.002 100.944C245.355 103.606 272.72 122.895 291.226 155.298C291.917 154.4 292.359 153.929 292.68 153.391C294.358 150.58 296.101 147.797 297.649 144.918C306.013 129.35 310.758 112.907 310.316 95.2174C310.22 91.4967 310.202 87.7874 309.85 84.0667C309.101 76.1346 307.411 68.4512 304.288 61.071C303.716 59.7161 302.764 59.0942 301.323 59.0037C296.266 58.687 291.216 58.2301 286.155 58.0583C274.817 57.6715 263.898 59.7342 252.967 63.7716ZM200.275 10.3297C200.287 9.45665 200.305 8.58586 200.308 7.7128C200.315 3.75691 199.982 3.49228 195.974 3.81572C186.952 4.54176 177.899 5.04388 168.974 6.62262C162 7.85982 154.869 8.65145 148.398 11.6891C133.764 18.5559 121.025 27.7614 111.244 40.5383C107.693 45.175 104.533 50.0289 101.738 55.5657C142.612 51.6483 174.993 65.7348 199.823 97.6398V92.1029C199.83 69.8219 199.814 47.5431 199.861 25.2621C199.872 20.4309 199.628 15.5884 200.275 10.3297ZM218.674 80.9432C241.973 59.7456 269.63 51.6687 301.16 55.6449C301.195 53.8626 300.513 52.7702 299.857 51.6822C292.82 40.0498 283.904 30.0142 272.601 22.0979C264.014 16.0883 254.95 10.9381 244.454 8.60169C238.571 7.29211 232.665 6.08657 226.681 5.31529C220.044 4.45807 213.365 4.03964 206.675 3.76596C204.918 3.69584 204.031 4.12106 204.022 6.13633C203.98 14.3014 203.687 22.462 203.607 30.6249C203.405 51.551 203.258 72.4795 203.128 93.4057C203.119 94.8148 202.784 96.3415 203.903 97.9655C208.273 91.6935 213.084 86.2177 218.674 80.9432ZM49.2784 235.114C67.2629 247.224 86.9112 253.887 109.087 252.37C112.61 252.128 112.976 251.773 111.5 248.782C105.45 236.535 102.578 223.477 101.761 210.063C100.828 194.721 102.01 179.524 107.835 164.976C108.086 164.354 108.561 163.693 107.988 162.838C107.43 162.8 106.785 162.682 106.155 162.721C98.5753 163.192 91.1048 164.718 83.972 167.254C60.3139 175.581 42.0037 190.109 29.0972 211.065C28.0755 212.723 28.0802 213.919 29.2601 215.525C34.7662 223.027 41.4894 229.335 49.2784 235.114ZM327.213 170.377C317.009 166.114 306.587 162.743 294.663 162.639C306.317 193.122 304.609 222.582 290.649 251.162C291.433 251.967 292.036 251.856 292.589 251.858C299.694 251.881 306.781 252.026 313.864 250.981C329.098 248.733 343.045 243.632 355.302 234.422C362.198 229.243 368.339 223.369 373.571 216.592C374.59 215.272 374.674 214.161 373.875 212.695C372.079 209.395 370.231 206.125 368.009 203.085C357.518 188.745 344.213 177.669 327.213 170.377ZM109.862 324.935C112.317 331.922 115.345 338.666 118.775 345.253C119.68 346.992 120.844 347.804 122.82 347.528C124.995 347.225 127.185 347.001 129.35 346.637C157.136 341.964 178.723 327.889 195.048 305.854C195.367 305.425 195.828 305.006 195.32 303.918C160.683 300.627 133.21 285.335 114.972 255.484C106.269 271.959 101.505 300.076 109.862 324.935ZM256.448 342.649C263.849 345.294 271.563 346.538 279.345 347.506C281.659 347.793 283.134 347.094 284.24 344.981C291.926 330.302 296.525 314.854 297.034 298.332C297.451 284.86 295.059 271.862 290.134 259.286C289.697 258.171 289.513 256.828 287.93 255.982C278.978 270.025 268.205 282.404 253.607 291.058C239.048 299.684 222.732 303.005 205.371 304.425C218.853 322.196 235.171 335.226 256.448 342.649ZM354.567 83.3882C342.365 72.1199 327.872 65.0088 311.6 61.123C308.961 60.4942 308.244 61.0416 308.933 63.2038C311.088 69.9531 312.34 76.8493 313.213 83.8677C314.437 93.7178 313.841 103.482 312.354 113.203C310.041 128.326 303.695 142.019 295.924 155.16C295.37 156.096 294.6 156.962 294.528 158.24C295.901 158.885 297.237 159.174 298.719 158.561C302.026 157.193 305.405 155.976 308.666 154.515C322.335 148.395 335.607 141.528 348.721 134.369C358.127 129.235 367.559 124.146 376.926 118.948C380.163 117.152 380.257 116.65 378.462 113.497C372.139 102.385 364.425 92.2974 354.567 83.3882ZM52.1409 288.871C45.5224 292.331 39.1436 296.224 32.3296 299.322C30.1886 300.295 30.0583 301.372 31.2358 303.156C33.307 306.296 35.3712 309.433 37.8916 312.262C45.7179 321.052 53.9468 329.386 64.5517 335.154C79.1408 343.086 94.8003 347.291 111.482 347.978C112.631 348.026 113.934 348.333 115.331 346.922C99.9643 318.236 98.1026 288.371 109.487 257.683L108.866 257.563C90.0669 267.949 71.2656 278.335 52.1409 288.871ZM289.476 347.709C301.393 347.917 312.785 345.398 323.962 341.605C344.357 334.683 359.64 321.805 370.848 304.115C372.703 301.186 372.63 300.985 369.426 299.304C364.332 296.613 359.27 293.863 354.243 291.055C336.226 281.056 318.128 271.197 300.057 261.292C298.049 260.193 296.015 259.139 293.637 257.875C294.265 259.92 294.723 261.514 295.242 263.091C302.019 283.621 302.361 304.28 296.518 325.05C294.575 331.951 291.654 338.49 288.51 344.945C288.044 345.904 286.897 347.162 289.476 347.709ZM30.4772 104.102C28.5968 107.166 26.6722 110.209 24.8501 113.305C22.9953 116.46 23.093 116.623 26.2184 118.423C34.1588 122.999 42.02 127.701 50.0371 132.153C67.1349 141.645 84.4398 150.767 102.557 158.349C104.6 159.204 106.59 159.319 109.201 158.665C88.5612 128.192 83.0202 95.7715 95.1145 60.6706C67.2419 66.6938 46.309 81.5312 30.4772 104.102ZM134.216 366.009C138.024 369.945 142.129 373.598 146.499 376.938C161.339 388.299 178.043 395.356 196.903 397.444C199.342 397.713 199.821 397.338 199.821 394.707C199.819 365.763 200.026 336.816 199.319 307.877C199.312 307.582 199.421 307.223 198.879 307.008C198.406 307.578 197.866 308.155 197.417 308.79C191.094 317.702 183.156 325.102 174.355 331.641C160.005 342.297 143.683 348.336 125.852 350.724C123.152 351.086 122.678 352.158 124.376 354.329C127.441 358.247 130.529 362.148 134.216 366.009ZM203.212 308.094C203.142 308.72 203.005 309.347 203.007 309.973C203.035 337.407 203.075 364.84 203.116 392.276C203.119 393.384 203.13 394.497 203.219 395.6C203.338 397.059 204.11 397.636 205.69 397.433C214.871 396.247 223.779 394.189 232.378 390.717C251.249 383.1 266.518 371.264 278.042 354.897C280.637 351.21 280.481 350.821 275.941 350.303C256.143 348.046 238.685 340.564 223.423 328.215C215.995 322.205 209.46 315.345 203.212 308.094ZM349.487 179.194C360.171 187.189 368.842 196.888 375.623 208.194C376.95 210.406 377.811 210.402 379.174 208.151C386.712 195.707 391.108 182.24 391.688 167.86C392.23 154.409 390.498 141.146 385.246 128.516C384.136 125.842 383.347 122.999 381.522 120.47C356.263 133.317 332.447 148.293 306.529 159.787C322.079 163.628 336.419 169.694 349.487 179.194ZM20.2702 122.33C13.9333 136.62 10.3006 151.317 11.4339 167.093C12.2949 179.047 15.0294 190.367 20.34 201.129C21.7991 204.091 23.3816 207.016 25.5971 210.04C42.0665 183.758 65.571 167.306 95.943 159.824C93.7531 158.552 91.6866 157.618 89.6433 156.643C67.0348 145.864 45.1942 133.745 23.5841 121.217C22.0668 120.339 21.0614 120.199 20.2702 122.33ZM187.571 135.656C189.549 124.872 192.919 114.542 199.021 104.615C178.518 105.364 160.818 111.647 144.832 122.836C131.563 132.123 121.621 143.998 114.53 158.46C115.182 158.557 115.57 158.668 115.957 158.663C122.086 158.575 128.205 158.629 134.334 159.016C142.228 159.514 149.922 160.914 157.245 163.689C170.096 168.559 181.046 176.213 190.389 186.042C191.327 187.031 192.204 188.144 193.938 188.79C190.58 180.684 188.427 172.7 187.315 164.404C186.044 154.922 185.714 145.502 187.571 135.656ZM286.839 154.705C278.775 140.824 268.298 128.997 254.743 119.919C241.124 110.794 225.902 105.943 209.437 104.719C207.962 104.611 206.375 104.299 204.727 105.217C219.972 132.266 219.995 160.124 209.444 189.159C210.861 187.702 211.813 186.746 212.739 185.766C232.218 165.191 256.516 156.438 285.045 158.05C286.073 158.109 287.109 158.141 288.096 157.53C287.693 156.609 287.346 155.811 286.837 154.71L286.839 154.705ZM215.374 264.176C213.875 276.985 209.097 288.791 203.161 300.279C209.702 301.761 231.34 298.022 243.372 292.46C261.173 284.236 274.34 271.443 284.156 254.724C254.338 250.085 229.711 237.08 210.121 215.091C215.267 231.011 217.885 247.127 215.374 264.176ZM169.573 235.178C154.504 245.79 137.336 251.526 118.733 255.242C127.793 268.908 138.633 279.936 152.71 287.884C166.675 295.769 181.813 299.492 198.346 300.745C184.953 272.314 182.947 243.825 193.528 214.152C186.219 222.385 178.521 229.202 169.573 235.178ZM60.2069 245.523C46.8046 238.742 35.2828 229.749 26.1835 217.671C24.2729 220.266 23.6446 222.835 22.7742 225.273C19.6744 233.974 17.3216 242.827 17.0145 252.11C16.7585 259.766 17.7289 267.273 19.6 274.68C21.3686 281.68 23.3839 288.599 26.6327 295.136C27.6217 297.131 28.7481 297.486 30.6471 296.423C32.3436 295.471 34.1448 294.697 35.8506 293.758C52.2712 284.725 68.9035 276.053 85.0611 266.569C90.893 263.145 96.8413 259.904 103.306 256.258C87.8002 255.728 73.8115 252.015 60.2069 245.523ZM362.542 233.287C361.837 233.83 361.125 234.363 360.431 234.918C346.275 246.218 329.996 252.594 311.838 254.588C307.486 255.068 303.12 255.425 298.096 255.903C301.03 257.545 303.408 258.881 305.792 260.209C327.986 272.561 350.276 284.749 372.661 296.773C374.169 297.583 374.985 297.438 375.739 295.959C377.119 293.258 378.441 290.544 379.516 287.71C384.541 274.501 386.47 260.946 384.995 246.885C384.087 238.224 382.116 229.894 378.506 221.933C378.097 221.03 377.873 219.94 376.507 219.363C374.408 221.677 372.36 224.117 370.108 226.366C367.776 228.695 365.249 230.842 362.542 233.287ZM291.179 241.667C301.754 215.468 301.528 189.367 290.635 162.481C272.72 183.864 250.633 197.093 223.058 201.33C252.057 206.849 273.248 222.564 288.158 246.959C289.718 245.385 290.109 243.542 291.179 241.667ZM107.279 225.669C108.936 232.821 110.963 239.851 114.567 246.98C130.336 222.797 150.909 206.007 180.613 201.687C152.375 198.331 131.009 183.78 112.529 163.146C104.067 183.839 102.894 204.329 107.279 225.669ZM53.1392 332.688C54.3959 335.147 56.5322 336.929 58.3893 338.895C70.6373 351.846 84.7563 362.565 100.213 371.691C123.918 385.685 149.577 394.062 177.096 397.193C176.259 396.679 175.363 396.32 174.471 395.951C174.169 395.827 173.887 395.662 173.58 395.553C150.494 387.399 133.175 372.299 119.282 353.108C118.337 351.801 117.334 351.143 115.675 351.158C111.833 351.204 107.99 351.074 104.16 350.769C90.4532 349.675 77.4908 346.205 65.4733 339.673C61.3495 337.431 57.3724 334.943 53.1392 332.688ZM320.197 346.492C310.05 349.451 299.694 351.242 289.089 351.102C285.908 351.059 284.072 352.054 282.352 354.601C271.647 370.458 257.71 382.848 240.023 391.165C235.343 393.366 230.538 395.273 225.874 397.439C275.943 390.462 317.953 369.033 351.048 331.637C341.928 338.565 331.511 342.984 320.197 346.492ZM229.402 206.227C221.943 204.621 214.457 203.291 206.372 203.788C206.973 204.775 207.287 205.41 207.708 205.964C211.885 211.458 216.249 216.807 221.348 221.532C237.566 236.562 256.956 245.711 278.726 250.323C280.916 250.786 283.264 251.578 285.592 250.635C285.71 249.355 284.935 248.57 284.428 247.699C281.847 243.266 278.699 239.215 275.406 235.268C263.404 220.879 248.087 211.402 229.402 206.227ZM117.884 248.751C117.567 249.538 116.867 250.212 117.225 251.655C134.244 249.493 149.836 243.519 164.257 234.75C177.089 226.947 187.403 216.468 196.179 204.426C183.482 204.064 171.376 206.154 159.905 211.031C141.563 218.827 128.458 232.244 117.884 248.751ZM195.218 182.24C197.077 187.067 198.944 191.891 201.653 196.718C202.195 195.994 202.423 195.764 202.56 195.492C203.072 194.499 203.589 193.509 204.033 192.486C210.163 178.474 213.512 163.963 213.226 148.634C213.042 138.626 211.569 128.95 207.78 119.638C206.142 115.617 203.966 111.86 201.311 107.954C187.506 131.969 186.466 156.548 195.218 182.24ZM190.68 260.51C191.401 273.266 194.241 285.458 200.757 297.072C211.431 278.457 214.836 259.004 212.078 238.471C210.57 227.218 207.408 216.457 201.48 206.132C200.608 207.819 199.863 209.131 199.237 210.49C196.23 217.022 194.006 223.796 192.423 230.781C190.226 240.457 189.863 250.23 190.682 260.51H190.68ZM282.122 161.291C274.828 161.077 267.577 161.518 260.43 162.963C240.514 166.989 224.266 176.81 211.636 192.258C209.947 194.325 208.076 196.281 206.768 198.726C229.039 202.82 273.988 181.976 286.276 161.972C285.191 160.979 283.816 161.443 282.122 161.291ZM123.176 162.115H117.209L116.981 162.87C127.651 174.301 139.519 184.292 154.15 190.833C167.59 196.84 181.79 199.292 196.87 199.201C196.233 198.229 195.881 197.605 195.444 197.044C187.725 187.151 178.579 178.739 167.569 172.361C154.053 164.528 139.226 161.791 123.176 162.115ZM327.946 48.2782C309.75 34.2324 278.719 16.9568 271.435 16.8844C271.866 17.2463 272.22 17.5697 272.601 17.857C273.116 18.2483 273.651 18.6124 274.179 18.9834C287.102 28.112 297.383 39.4481 304.374 53.4306C305.566 55.8145 307.162 56.7283 309.673 57.2666C326.738 60.9307 342.184 67.8021 355.223 79.3192C356.389 80.3483 357.473 81.5358 359.191 81.8931C350.764 69.0913 339.801 58.5219 327.946 48.2805V48.2782ZM88.9498 38.5072C70.3976 51.49 54.2237 66.7413 41.4475 85.2361C46.5207 80.5225 51.9128 76.1889 57.7075 72.3483C68.9966 64.8663 81.5471 60.2454 94.8027 57.3119C96.4084 56.9568 97.344 56.2262 98.0281 54.7877C104.77 40.579 114.916 29.0642 127.749 19.6958C128.27 19.3113 128.784 18.9223 129.291 18.5197C129.731 18.1714 130.152 17.8027 130.585 17.4431C115.584 22.3851 102.105 29.7925 88.9498 38.5072ZM3.6937 211.338C3.84729 229.06 9.64429 259.169 14.6314 268.155C14.4988 267.463 14.3196 266.775 14.2451 266.078C12.3764 248.782 14.5244 232.095 22.4065 216.314C23.3002 214.527 23.2397 213.166 22.1389 211.506C15.5553 201.561 11.8714 190.523 9.33943 179.065C8.38761 174.758 8.06414 170.366 7.58008 165.985C4.52859 180.912 3.22484 196.126 3.6937 211.338ZM398.336 185.97C397.852 180.467 397.345 174.964 395.746 168.975C395.404 169.945 395.271 170.232 395.202 170.535C395.004 171.384 394.752 172.232 394.659 173.091C393.068 187.589 388.162 200.979 380.275 213.356C379.44 214.668 379.461 215.717 380.142 217.081C381.299 219.441 382.336 221.854 383.252 224.312C387.752 236.107 389.714 248.298 389.207 260.867C389.165 261.928 388.879 263.077 389.844 264.255C391.299 261.157 392.011 258.008 392.784 254.887C395.96 242.033 398.171 229.057 398.818 215.814C399.297 205.987 399.246 196.198 398.336 185.97Z"
                              fill="white"
                            ></path></svg></div
                        ><button
                          class="group absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center h-[2.5em] px-[1.7em] whitespace-nowrap font-matter font-medium tracking-[0.01em] leading-none rounded-full backdrop-blur-[14px] [backdrop-filter:blur(14px)_saturate(1.25)] cursor-pointer [transition:background_.25s_ease,transform_.25s_cubic-bezier(0.2,0.8,0.3,1),box-shadow_.7s_ease,text-shadow_.7s_ease] motion-reduce:[transition:none] disabled:opacity-50 disabled:cursor-not-allowed enabled:active:scale-[0.96] enabled:active:translate-x-[-50%] enabled:active:translate-y-[-50%] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] min-h-11 border border-black/[0.18] bg-white/92 text-[#262626] enabled:hover:bg-white focus-visible:outline-[#262626] shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_7px_24px_rgba(70,100,60,.16)]"
                          type="button"
                          data-playing="false"
                          aria-label="Start voice call with Simran"
                          ><span class="group-data-[playing=true]:hidden">Start Speaking</span
                          ><span class="hidden group-data-[playing=true]:inline">Pause</span></button
                        ></div
                      ></div
                    ><p
                      class="mt-5 hidden max-w-[260px] text-center font-matter text-sm leading-relaxed text-tx-tertiary lg:block"
                      >Press Start Speaking to call<br />Simran<!-- -->.</p
                    ></div
                  ><div class="flex min-w-0 flex-col border-l border-st-secondary p-4 md:p-6 lg:min-h-0 lg:p-8"
                    ><div class="flex items-center justify-between gap-4"
                      ><p class="font-matter text-base font-medium text-tx-secondary">Illustrative transcript</p
                      ><span class="flex items-center gap-1.5 font-matter text-sm text-tx-tertiary"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          color="currentColor"
                          class=""
                          stroke-width="1.8"
                          stroke="currentColor"
                        >
                          <path
                            d="M14.5 16.5L18.216 17.6177C19.6034 18.0423 20.6341 19.1553 20.9763 20.5099C21.1115 21.0456 20.6489 21.5 20.0936 21.5H3.90639C3.35107 21.5 2.88845 21.0456 3.02375 20.5099C3.36593 19.1553 4.39659 18.0423 5.78401 17.6177L9.5 16.5V14.345C8.21522 14.1822 7.03039 13.897 6 13.5161C6.5 12.5322 7 11.0563 7 7.61264C7 1.70919 12.5 1.70912 14 3.67672C17 3.18499 17 5.64483 17 8.59655C17 10.9579 17.6667 12.8602 18 13.5161C16.9696 13.897 15.7848 14.1822 14.5 14.345V16.5Z"
                            stroke="currentColor"
                            stroke-linejoin="round"
                            stroke-width="1.8"
                          ></path></svg
                        >Simran</span
                      ></div
                    ><div
                      class="mt-5 flex min-h-0 flex-1 flex-col scrollbar-thin-st max-h-[16rem] overflow-y-auto lg:max-h-none"
                      role="log"
                      aria-live="polite"
                      aria-relevant="additions text"
                      aria-label="Simran conversation transcript"
                      ><div
                        class="max-w-[75%] px-[18px] py-3.5 font-matter text-[15px] leading-[1.35] mt-4 rounded-2xl rounded-bl-sm mr-auto bg-sr-sf-accent-indigo text-tx shadow-[inset_0_2px_8px_rgba(99,102,241,0.3)]"
                        >Hi, I noticed you left a few items in your cart. Would you like help completing the order?</div
                      ><div
                        class="max-w-[75%] px-[18px] py-3.5 font-matter text-[15px] leading-[1.35] mt-4 rounded-2xl rounded-br-sm ml-auto bg-sr-sf-accent-orange text-tx shadow-[inset_0_2px_8px_rgba(249,115,22,0.3)]"
                        >Yes, but I need delivery by Friday.</div
                      ><div
                        class="max-w-[75%] px-[18px] py-3.5 font-matter text-[15px] leading-[1.35] mt-4 rounded-2xl rounded-bl-sm mr-auto bg-sr-sf-accent-indigo text-tx shadow-[inset_0_2px_8px_rgba(99,102,241,0.3)]"
                        >I can check the available delivery window before you continue.</div
                      ></div
                    ><div class="mt-auto pt-4"
                      ><a href="https://indus.sarvam.ai/samvaad/home" target="_blank" rel="noopener noreferrer"
                        ><button
                          class="group relative inline-flex items-center justify-center cursor-pointer font-matter font-medium overflow-hidden rounded-full touch-manipulation disabled:opacity-40 disabled:pointer-events-none min-h-[40px] text-white bg-[#2a2c33] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_0_rgba(0,0,0,0.2)] active:scale-[0.97] active:duration-150 transition-[background-color,box-shadow] duration-350 ease-[cubic-bezier(0.2,0,0,1)] px-5 py-2.5 text-base w-full justify-center"
                          ><span
                            aria-hidden="true"
                            class="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-[cubic-bezier(0.2,0,0,1)] bg-[radial-gradient(circle_80px_at_var(--gx)_var(--gy),rgba(255,255,255,0.16)_0%,transparent_100%)]"
                            style="--gx: 50%; --gy: 50%"
                          ></span
                          ><span class="relative z-10 flex items-center gap-2">Build your own agent</span></button
                        ></a
                      ></div
                    ></div
                  ></div
                ></div
              ></div
            ></div
          ><script>
            $RS = function (a, b) {
              a = document.getElementById(a);
              b = document.getElementById(b);
              for (a.parentNode.removeChild(a); a.firstChild;) b.parentNode.insertBefore(a.firstChild, b);
              b.parentNode.removeChild(b);
            };
            $RS("r28S:1", "r28P:1");</script
          ><script>
            $RB = [];
            $RV = function (a) {
              $RT = performance.now();
              for (var b = 0; b < a.length; b += 2) {
                var c = a[b],
                  e = a[b + 1];
                null !== e.parentNode && e.parentNode.removeChild(e);
                var f = c.parentNode;
                if (f) {
                  var g = c.previousSibling,
                    h = 0;
                  do {
                    if (c && 8 === c.nodeType) {
                      var d = c.data;
                      if ("/$" === d || "/&" === d)
                        if (0 === h) break;
                        else h--;
                      else ("$" !== d && "$?" !== d && "$~" !== d && "$!" !== d && "&" !== d) || h++;
                    }
                    d = c.nextSibling;
                    f.removeChild(c);
                    c = d;
                  } while (c);
                  for (; e.firstChild;) f.insertBefore(e.firstChild, c);
                  g.data = "$";
                  g._reactRetry && requestAnimationFrame(g._reactRetry);
                }
              }
              a.length = 0;
            };
            $RC = function (a, b) {
              if ((b = document.getElementById(b)))
                (a = document.getElementById(a))
                  ? ((a.previousSibling.data = "$~"),
                    $RB.push(a, b),
                    2 === $RB.length &&
                      ("number" !== typeof $RT
                        ? requestAnimationFrame($RV.bind(null, $RB))
                        : ((a = performance.now()),
                          setTimeout($RV.bind(null, $RB), 2300 > a && 2e3 < a ? 2300 - a : $RT + 300 - a))))
                  : b.parentNode.removeChild(b);
            };
            $RC("r28B:0", "r28S:0");</script
          ><!--astro:end--></astro-island
        >
      </div>
    </section>
    <section class="relative mx-auto w-[88%] md:w-10/12 2xl:max-w-width-mx" data-section-reveal>
      <astro-island
        uid="Z1bxv44"
        prefix="r29"
        component-url="/_astro/HomeDeveloperSection.eRRLwZTT.js"
        component-export="default"
        renderer-url="/_astro/client.B3N4hhPH.js"
        props="{}"
        ssr
        client="visible"
        opts='{"name":"HomeDeveloperSection","value":true}'
        await-children
        ><div class="flex flex-col gap-10 md:gap-14"
          ><div class="section-heading-reveal flex flex-col items-center text-center gap-6 w-full"
            ><div class="flex flex-col items-center gap-6 w-full text-center"
              ><div class="flex flex-col items-center gap-4 w-full text-center"
                ><h2
                  class="font-season-mix font-medium leading-[1.2] tracking-[-0.02em] w-full text-tx whitespace-pre-line text-[28px] md:text-[36px]"
                  >Build anything with<br />Sarvam APIs</h2
                ><p
                  class="text-base md:text-lg font-matter font-normal leading-[1.65] max-w-2xl text-tx-tertiary type-supporting"
                  >Everything you need to add Indic AI to your product.</p
                ></div
              ></div
            ></div
          ><div class="grid grid-cols-1 lg:grid-cols-[50fr_50fr] lg:grid-rows-[1fr] gap-2 lg:h-[580px]"
            ><div
              class="hidden lg:flex relative overflow-hidden border border-st-secondary/50 flex-col gap-4 rounded-xl md:rounded-2xl bg-white p-6 md:p-12"
              ><h3 class="font-matter font-medium leading-tighter tracking-[-1px] text-tx text-[28px]"
                >Add<!-- -->
                <span class="text-sr-indigo-600">Text to Speech</span><br />to your app in minutes</h3
              ><div class="relative mt-8 -mb-16"
                ><div class="overflow-hidden border border-st-secondary rounded-xl"
                  ><div class="flex items-stretch bg-sf-secondary border-b border-st-secondary overflow-x-auto"
                    ><button
                      class="type-label font-matter leading-[1.55] relative flex items-center gap-1.5 px-4 py-2.5 font-medium whitespace-nowrap transition-colors duration-150 shrink-0 cursor-pointer bg-white text-tx border-r border-st-secondary"
                      ><span class="absolute top-0 left-0 right-0 h-[2px] bg-sr-indigo-500"></span
                      ><span></span>Python</button
                    ><button
                      class="type-label font-matter leading-[1.55] relative flex items-center gap-1.5 px-4 py-2.5 font-medium whitespace-nowrap transition-colors duration-150 shrink-0 cursor-pointer text-tx-tertiary hover:text-tx-secondary border-r border-st-secondary"
                      ><span></span>JavaScript</button
                    ><button
                      class="type-label font-matter leading-[1.55] relative flex items-center gap-1.5 px-4 py-2.5 font-medium whitespace-nowrap transition-colors duration-150 shrink-0 cursor-pointer text-tx-tertiary hover:text-tx-secondary border-r border-st-secondary"
                      ><span></span>cURL</button
                    ><div class="flex-1"></div
                    ><button
                      class="type-label font-matter font-normal leading-[1.55] flex items-center gap-1.5 px-3 py-2.5 text-tx-tertiary hover:text-tx-secondary transition-colors duration-150 shrink-0 cursor-pointer border-l border-st-secondary"
                      title="Copy code"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        color="currentColor"
                        class="w-3.5 h-3.5"
                        stroke-width="1.5"
                        stroke="currentColor"
                      >
                        <path
                          d="M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                        ></path>
                        <path
                          d="M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                        ></path></svg
                      ><span>Copy</span></button
                    ></div
                  ><div class="h-[340px] bg-white overflow-auto p-4">
                    <pre
                      class="type-label font-mono font-normal text-tx leading-[180%] whitespace-pre"
                    ><span class="text-sr-indigo-600">from</span> sarvamai <span class="text-sr-indigo-600">import</span> SarvamAI
<span class="text-sr-indigo-600">from</span> sarvamai.play <span class="text-sr-indigo-600">import</span> save

client = SarvamAI(api_subscription_key=<span class="text-sr-green-600">"YOUR_API_KEY"</span>)

response = client.text_to_speech.convert(
    text=<span class="text-sr-green-600">"नमस्ते, कैसे हैं आप?"</span>,
    target_language_code=<span class="text-sr-green-600">"hi-IN"</span>,
    model=<span class="text-sr-green-600">"bulbul:v3"</span>,
    speaker=<span class="text-sr-green-600">"anushka"</span>,
)

save(response, <span class="text-sr-green-600">"output.wav"</span>)</pre>
                  </div></div
                ></div
              ><div
                class="absolute bottom-0 left-0 right-0 h-fit flex flex-col justify-end pointer-events-none bg-[linear-gradient(to_top,theme(colors.sr-indigo.100)_0%,theme(colors.sr-indigo.50)_50%,transparent_100%)]"
                ><div class="pointer-events-auto p-12 pt-40"
                  ><a href="https://indus.sarvam.ai/" target="_blank" rel="noopener noreferrer"
                    ><button
                      class="group relative inline-flex items-center justify-center cursor-pointer font-matter font-medium overflow-hidden rounded-full touch-manipulation disabled:opacity-40 disabled:pointer-events-none min-h-[40px] text-white bg-[#2a2c33] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_0_rgba(0,0,0,0.2)] active:scale-[0.97] active:duration-150 transition-[background-color,box-shadow] duration-350 ease-[cubic-bezier(0.2,0,0,1)] px-5 py-2.5 text-base w-full"
                      ><span
                        aria-hidden="true"
                        class="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-[cubic-bezier(0.2,0,0,1)] bg-[radial-gradient(circle_80px_at_var(--gx)_var(--gy),rgba(255,255,255,0.16)_0%,transparent_100%)]"
                        style="--gx: 50%; --gy: 50%"
                      ></span
                      ><span class="relative z-10 flex items-center gap-2"
                        >Get your API key &amp; get started</span
                      ></button
                    ></a
                  ></div
                ></div
              ></div
            ><div class="flex flex-col gap-2 min-h-0 flex-1"
              ><div class="grid grid-cols-2 gap-2 flex-1"
                ><div class="contents"
                  ><a
                    href="https://indus.sarvam.ai/text-to-speech"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="relative group flex flex-col justify-between gap-4 p-5 md:p-8 text-left rounded-xl transition-colors duration-150 cursor-pointer bg-white overflow-hidden border border-sr-indigo-200 lg:hidden"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="currentColor"
                      class="w-6 h-6"
                      style="color: #818cf8"
                    >
                      <path
                        d="M16.5242 2.40522C16.5936 2.41364 16.6622 2.42255 16.7301 2.43198C16.374 3.02669 15.7573 3.44836 15.0392 3.53773C14.2677 3.63374 13.5 4.27993 13.5 5.25C13.5 6.22007 14.2677 6.86627 15.0392 6.96228C16.0803 7.09183 16.9082 7.91975 17.0377 8.9608C17.1337 9.73231 17.7799 10.5 18.75 10.5C19.7201 10.5 20.3663 9.73231 20.4623 8.9608C20.5516 8.24268 20.9733 7.62597 21.568 7.26994C21.5774 7.33783 21.5864 7.40644 21.5948 7.47578C21.75 8.75376 21.75 10.4798 21.75 12.5513C21.75 14.6227 21.75 16.2462 21.5948 17.5242C21.4361 18.8302 21.1059 19.8754 20.3723 20.7343C20.1767 20.9634 19.9634 21.1767 19.7343 21.3723C18.8754 22.1059 17.8302 22.4361 16.5242 22.5948C15.2462 22.75 13.6227 22.75 11.5513 22.75C9.47982 22.75 7.75376 22.75 6.47578 22.5948C5.16982 22.4361 4.12456 22.1059 3.26567 21.3723C3.03662 21.1767 2.8233 20.9634 2.62767 20.7343C1.89411 19.8754 1.56386 18.8302 1.40522 17.5242C1.24998 16.2462 1.24999 14.6227 1.25 12.5513V12.5513C1.24999 10.4798 1.24998 8.75376 1.40522 7.47578C1.56386 6.16982 1.89411 5.12456 2.62767 4.26567C2.8233 4.03662 3.03662 3.8233 3.26568 3.62767C4.12456 2.89411 5.16982 2.56386 6.47578 2.40522C7.75375 2.24998 9.37731 2.24999 11.4487 2.25C13.5202 2.24999 15.2462 2.24998 16.5242 2.40522ZM12.75 8C12.75 7.58579 12.4142 7.25 12 7.25C11.5858 7.25 11.25 7.58579 11.25 8V17C11.25 17.4142 11.5858 17.75 12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V8ZM15.75 10C15.75 9.58579 15.4142 9.25 15 9.25C14.5858 9.25 14.25 9.58579 14.25 10V15C14.25 15.4142 14.5858 15.75 15 15.75C15.4142 15.75 15.75 15.4142 15.75 15V10ZM9.75 11C9.75 10.5858 9.41421 10.25 9 10.25C8.58579 10.25 8.25 10.5858 8.25 11V14C8.25 14.4142 8.58579 14.75 9 14.75C9.41421 14.75 9.75 14.4142 9.75 14V11ZM6.75 12C6.75 11.5858 6.41421 11.25 6 11.25C5.58579 11.25 5.25 11.5858 5.25 12V13C5.25 13.4142 5.58579 13.75 6 13.75C6.41421 13.75 6.75 13.4142 6.75 13V12Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                      <path
                        d="M15.1936 4.77816C16.8026 4.57792 18.0779 3.30259 18.2782 1.69356C18.3085 1.44998 18.5045 1.25 18.75 1.25C18.9955 1.25 19.1915 1.44998 19.2218 1.69356C19.4221 3.30259 20.6974 4.57792 22.3064 4.77816C22.55 4.80847 22.75 5.00454 22.75 5.25C22.75 5.49546 22.55 5.69153 22.3064 5.72184C20.6974 5.92208 19.4221 7.19741 19.2218 8.80644C19.1915 9.05002 18.9955 9.25 18.75 9.25C18.5045 9.25 18.3085 9.05002 18.2782 8.80644C18.0779 7.19741 16.8026 5.92208 15.1936 5.72184C14.95 5.69153 14.75 5.49546 14.75 5.25C14.75 5.00454 14.95 4.80847 15.1936 4.77816Z"
                        fill="currentColor"
                      ></path></svg
                    ><div class="flex flex-col gap-2"
                      ><span class="font-matter font-medium leading-snug text-[18px] text-tx">Text to Speech</span
                      ><span class="font-matter font-normal leading-[1.55] text-tx-tertiary text-[14px]"
                        >Natural voices across 11 Indic languages</span
                      ></div
                    ></a
                  ><button
                    class="relative group flex flex-col justify-between gap-4 p-5 md:p-8 text-left rounded-xl transition-colors duration-150 cursor-pointer bg-white overflow-hidden border border-sr-indigo-200 hidden lg:flex"
                    ><img
                      src="assets/motifs/models/model-03.svg"
                      alt=""
                      aria-hidden="true"
                      class="hidden lg:block absolute -top-8 -right-8 w-28 h-28 pointer-events-none select-none transition-all duration-500 ease-out opacity-100 rotate-12 scale-100 blur-none"
                    /><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="currentColor"
                      class="w-6 h-6 text-st"
                      style="color: #818cf8; transition: color 150ms"
                    >
                      <path
                        d="M16.5242 2.40522C16.5936 2.41364 16.6622 2.42255 16.7301 2.43198C16.374 3.02669 15.7573 3.44836 15.0392 3.53773C14.2677 3.63374 13.5 4.27993 13.5 5.25C13.5 6.22007 14.2677 6.86627 15.0392 6.96228C16.0803 7.09183 16.9082 7.91975 17.0377 8.9608C17.1337 9.73231 17.7799 10.5 18.75 10.5C19.7201 10.5 20.3663 9.73231 20.4623 8.9608C20.5516 8.24268 20.9733 7.62597 21.568 7.26994C21.5774 7.33783 21.5864 7.40644 21.5948 7.47578C21.75 8.75376 21.75 10.4798 21.75 12.5513C21.75 14.6227 21.75 16.2462 21.5948 17.5242C21.4361 18.8302 21.1059 19.8754 20.3723 20.7343C20.1767 20.9634 19.9634 21.1767 19.7343 21.3723C18.8754 22.1059 17.8302 22.4361 16.5242 22.5948C15.2462 22.75 13.6227 22.75 11.5513 22.75C9.47982 22.75 7.75376 22.75 6.47578 22.5948C5.16982 22.4361 4.12456 22.1059 3.26567 21.3723C3.03662 21.1767 2.8233 20.9634 2.62767 20.7343C1.89411 19.8754 1.56386 18.8302 1.40522 17.5242C1.24998 16.2462 1.24999 14.6227 1.25 12.5513V12.5513C1.24999 10.4798 1.24998 8.75376 1.40522 7.47578C1.56386 6.16982 1.89411 5.12456 2.62767 4.26567C2.8233 4.03662 3.03662 3.8233 3.26568 3.62767C4.12456 2.89411 5.16982 2.56386 6.47578 2.40522C7.75375 2.24998 9.37731 2.24999 11.4487 2.25C13.5202 2.24999 15.2462 2.24998 16.5242 2.40522ZM12.75 8C12.75 7.58579 12.4142 7.25 12 7.25C11.5858 7.25 11.25 7.58579 11.25 8V17C11.25 17.4142 11.5858 17.75 12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V8ZM15.75 10C15.75 9.58579 15.4142 9.25 15 9.25C14.5858 9.25 14.25 9.58579 14.25 10V15C14.25 15.4142 14.5858 15.75 15 15.75C15.4142 15.75 15.75 15.4142 15.75 15V10ZM9.75 11C9.75 10.5858 9.41421 10.25 9 10.25C8.58579 10.25 8.25 10.5858 8.25 11V14C8.25 14.4142 8.58579 14.75 9 14.75C9.41421 14.75 9.75 14.4142 9.75 14V11ZM6.75 12C6.75 11.5858 6.41421 11.25 6 11.25C5.58579 11.25 5.25 11.5858 5.25 12V13C5.25 13.4142 5.58579 13.75 6 13.75C6.41421 13.75 6.75 13.4142 6.75 13V12Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                      <path
                        d="M15.1936 4.77816C16.8026 4.57792 18.0779 3.30259 18.2782 1.69356C18.3085 1.44998 18.5045 1.25 18.75 1.25C18.9955 1.25 19.1915 1.44998 19.2218 1.69356C19.4221 3.30259 20.6974 4.57792 22.3064 4.77816C22.55 4.80847 22.75 5.00454 22.75 5.25C22.75 5.49546 22.55 5.69153 22.3064 5.72184C20.6974 5.92208 19.4221 7.19741 19.2218 8.80644C19.1915 9.05002 18.9955 9.25 18.75 9.25C18.5045 9.25 18.3085 9.05002 18.2782 8.80644C18.0779 7.19741 16.8026 5.92208 15.1936 5.72184C14.95 5.69153 14.75 5.49546 14.75 5.25C14.75 5.00454 14.95 4.80847 15.1936 4.77816Z"
                        fill="currentColor"
                      ></path></svg
                    ><div class="flex flex-col gap-2"
                      ><span class="font-matter font-medium leading-snug text-[18px] text-tx">Text to Speech</span
                      ><span class="font-matter font-normal leading-[1.55] text-tx-tertiary text-[14px]"
                        >Natural voices across 11 Indic languages</span
                      ></div
                    ></button
                  ></div
                ><div class="contents"
                  ><a
                    href="https://indus.sarvam.ai/speech-to-text"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="relative group flex flex-col justify-between gap-4 p-5 md:p-8 text-left rounded-xl transition-colors duration-150 cursor-pointer bg-white overflow-hidden border border-st-secondary/50 lg:hidden"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="currentColor"
                      class="w-6 h-6"
                      style="color: #f87171"
                    >
                      <path
                        d="M4 10.25C4.41421 10.25 4.75 10.5858 4.75 11C4.75 15.0041 7.99593 18.25 12 18.25C16.0041 18.25 19.25 15.0041 19.25 11C19.25 10.5858 19.5858 10.25 20 10.25C20.4142 10.25 20.75 10.5858 20.75 11C20.75 15.5799 17.2314 19.3379 12.75 19.7183V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V19.7183C6.7686 19.3379 3.25 15.5799 3.25 11C3.25 10.5858 3.58579 10.25 4 10.25Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                      <path
                        d="M13.1936 4.77816C14.8026 4.57792 16.0779 3.30259 16.2782 1.69356C16.3085 1.44998 16.5045 1.25 16.75 1.25C16.9955 1.25 17.1915 1.44998 17.2218 1.69356C17.4221 3.30259 18.6974 4.57792 20.3064 4.77816C20.55 4.80847 20.75 5.00454 20.75 5.25C20.75 5.49546 20.55 5.69153 20.3064 5.72184C18.6974 5.92208 17.4221 7.19741 17.2218 8.80644C17.1915 9.05002 16.9955 9.25 16.75 9.25C16.5045 9.25 16.3085 9.05002 16.2782 8.80644C16.0779 7.19741 14.8026 5.92208 13.1936 5.72184C12.95 5.69153 12.75 5.49546 12.75 5.25C12.75 5.00454 12.95 4.80847 13.1936 4.77816Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M14.9158 2.04306C14.0609 1.53911 13.0642 1.25 12 1.25C8.82437 1.25 6.25 3.82437 6.25 7V11C6.25 14.1756 8.82436 16.75 12 16.75C15.1756 16.75 17.75 14.1756 17.75 11V10.1761C17.4791 10.3754 17.1408 10.5 16.75 10.5C15.7799 10.5 15.1337 9.7323 15.0377 8.9608C14.9082 7.91975 14.0803 7.09183 13.0392 6.96227C12.2677 6.86627 11.5 6.22007 11.5 5.25C11.5 4.27993 12.2677 3.63373 13.0392 3.53773C13.9055 3.42992 14.6243 2.83848 14.9158 2.04306Z"
                        fill="currentColor"
                      ></path></svg
                    ><div class="flex flex-col gap-2"
                      ><span class="font-matter font-medium leading-snug text-[18px] text-tx">Speech to Text</span
                      ><span class="font-matter font-normal leading-[1.55] text-tx-tertiary text-[14px]"
                        >High-accuracy ASR across 12 Indic languages</span
                      ></div
                    ></a
                  ><button
                    class="relative group flex flex-col justify-between gap-4 p-5 md:p-8 text-left rounded-xl transition-colors duration-150 cursor-pointer bg-white overflow-hidden border border-st-secondary/50 hidden lg:flex"
                    ><img
                      src="assets/motifs/models/model-07.svg"
                      alt=""
                      aria-hidden="true"
                      class="hidden lg:block absolute -top-8 -right-8 w-28 h-28 pointer-events-none select-none transition-all duration-500 ease-out opacity-0 rotate-45 scale-75 group-hover:opacity-100 group-hover:rotate-0 group-hover:scale-100"
                    /><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="currentColor"
                      class="w-6 h-6 text-st"
                      style="transition: color 150ms"
                    >
                      <path
                        d="M4 10.25C4.41421 10.25 4.75 10.5858 4.75 11C4.75 15.0041 7.99593 18.25 12 18.25C16.0041 18.25 19.25 15.0041 19.25 11C19.25 10.5858 19.5858 10.25 20 10.25C20.4142 10.25 20.75 10.5858 20.75 11C20.75 15.5799 17.2314 19.3379 12.75 19.7183V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V19.7183C6.7686 19.3379 3.25 15.5799 3.25 11C3.25 10.5858 3.58579 10.25 4 10.25Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                      <path
                        d="M13.1936 4.77816C14.8026 4.57792 16.0779 3.30259 16.2782 1.69356C16.3085 1.44998 16.5045 1.25 16.75 1.25C16.9955 1.25 17.1915 1.44998 17.2218 1.69356C17.4221 3.30259 18.6974 4.57792 20.3064 4.77816C20.55 4.80847 20.75 5.00454 20.75 5.25C20.75 5.49546 20.55 5.69153 20.3064 5.72184C18.6974 5.92208 17.4221 7.19741 17.2218 8.80644C17.1915 9.05002 16.9955 9.25 16.75 9.25C16.5045 9.25 16.3085 9.05002 16.2782 8.80644C16.0779 7.19741 14.8026 5.92208 13.1936 5.72184C12.95 5.69153 12.75 5.49546 12.75 5.25C12.75 5.00454 12.95 4.80847 13.1936 4.77816Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M14.9158 2.04306C14.0609 1.53911 13.0642 1.25 12 1.25C8.82437 1.25 6.25 3.82437 6.25 7V11C6.25 14.1756 8.82436 16.75 12 16.75C15.1756 16.75 17.75 14.1756 17.75 11V10.1761C17.4791 10.3754 17.1408 10.5 16.75 10.5C15.7799 10.5 15.1337 9.7323 15.0377 8.9608C14.9082 7.91975 14.0803 7.09183 13.0392 6.96227C12.2677 6.86627 11.5 6.22007 11.5 5.25C11.5 4.27993 12.2677 3.63373 13.0392 3.53773C13.9055 3.42992 14.6243 2.83848 14.9158 2.04306Z"
                        fill="currentColor"
                      ></path></svg
                    ><div class="flex flex-col gap-2"
                      ><span class="font-matter font-medium leading-snug text-[18px] text-tx">Speech to Text</span
                      ><span class="font-matter font-normal leading-[1.55] text-tx-tertiary text-[14px]"
                        >High-accuracy ASR across 12 Indic languages</span
                      ></div
                    ></button
                  ></div
                ><div class="contents"
                  ><a
                    href="https://indus.sarvam.ai/translate"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="relative group flex flex-col justify-between gap-4 p-5 md:p-8 text-left rounded-xl transition-colors duration-150 cursor-pointer bg-white overflow-hidden border border-st-secondary/50 lg:hidden"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="currentColor"
                      class="w-6 h-6"
                      style="color: #f97316"
                    >
                      <path
                        d="M22.3276 4.94518C22.8494 4.76441 23.1259 4.19481 22.9451 3.67295C22.7644 3.15109 22.1948 2.87458 21.6729 3.05536C19.4606 3.82173 17.7007 3.45031 16.2776 3.0395C15.747 2.88633 15.1926 3.1923 15.0395 3.72292C14.8863 4.25354 15.1923 4.80787 15.7229 4.96104C16.3722 5.14849 17.134 5.34263 18.0002 5.43872V9.87312C17.7971 10.6131 17.512 11.0831 17.2235 11.3825C16.9251 11.6922 16.5803 11.8645 16.2013 11.9452C15.4613 12.1027 14.5751 11.9089 13.8201 11.579C13.4733 11.2384 13.0764 10.9636 12.6664 10.7474C12.5762 10.6999 12.4848 10.6548 12.3927 10.6121C13.0626 10.087 13.5923 9.43947 13.9179 8.7148C14.2904 7.88584 14.3942 6.94743 14.0955 6.02213C13.7975 5.09946 13.1321 4.28965 12.1452 3.64734C10.906 2.84088 9.37174 2.89976 8.12286 3.22489C6.86023 3.5536 5.64654 4.2139 4.9013 4.94149C4.50613 5.32731 4.49854 5.96043 4.88436 6.35561C5.27018 6.75078 5.9033 6.75836 6.29847 6.37255C6.7532 5.92859 7.63944 5.41741 8.62674 5.16038C9.62778 4.89977 10.4934 4.95865 11.0542 5.32361C11.7417 5.77105 12.0636 6.23835 12.1922 6.63667C12.32 7.03235 12.2896 7.4588 12.0936 7.89509C11.6875 8.79874 10.5725 9.69265 9.03956 9.94209C8.52528 10.0258 8.16144 10.4903 8.20342 11.0097C8.2454 11.529 8.67912 11.9291 9.20017 11.9291C9.89121 11.9291 10.9184 12.0868 11.7337 12.5166C12.1558 12.7712 13 13.513 13 14.4438C13 17.9344 9.08771 20.0144 6.04231 18.5126C4.45969 17.7321 3.73899 16.7563 3.38243 15.8366C3.00846 14.872 3.00001 13.8907 3.00001 13.0003C3.00001 12.448 2.55229 12.0003 2.00001 12.0003C1.44772 12.0003 1.00001 12.448 1.00001 13.0003L1 13.0405C0.999876 13.9081 0.999681 15.2235 1.51768 16.5596C2.06115 17.9613 3.14045 19.3115 5.15771 20.3063C9.31207 22.355 15 19.6546 15 14.4438C15 14.2768 14.9913 14.1155 14.9745 13.9597C15.5075 14.0246 16.0652 14.019 16.6177 13.9014C17.0948 13.7998 17.5644 13.6149 18.0002 13.3252L18.0002 20.0003C18.0002 20.5526 18.4479 21.0003 19.0002 21.0003C19.5525 21.0003 20.0002 20.5526 20.0002 20.0003L20.0002 5.45765C20.7261 5.38875 21.5029 5.23087 22.3276 4.94518Z"
                        fill="currentColor"
                      ></path></svg
                    ><div class="flex flex-col gap-2"
                      ><span class="font-matter font-medium leading-snug text-[18px] text-tx">Translation</span
                      ><span class="font-matter font-normal leading-[1.55] text-tx-tertiary text-[14px]"
                        >State-of-the-art translation across 23 languages</span
                      ></div
                    ></a
                  ><button
                    class="relative group flex flex-col justify-between gap-4 p-5 md:p-8 text-left rounded-xl transition-colors duration-150 cursor-pointer bg-white overflow-hidden border border-st-secondary/50 hidden lg:flex"
                    ><img
                      src="assets/motifs/models/model-01.svg"
                      alt=""
                      aria-hidden="true"
                      class="hidden lg:block absolute -top-8 -right-8 w-28 h-28 pointer-events-none select-none transition-all duration-500 ease-out opacity-0 rotate-45 scale-75 group-hover:opacity-100 group-hover:rotate-0 group-hover:scale-100"
                    /><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="currentColor"
                      class="w-6 h-6 text-st"
                      style="transition: color 150ms"
                    >
                      <path
                        d="M22.3276 4.94518C22.8494 4.76441 23.1259 4.19481 22.9451 3.67295C22.7644 3.15109 22.1948 2.87458 21.6729 3.05536C19.4606 3.82173 17.7007 3.45031 16.2776 3.0395C15.747 2.88633 15.1926 3.1923 15.0395 3.72292C14.8863 4.25354 15.1923 4.80787 15.7229 4.96104C16.3722 5.14849 17.134 5.34263 18.0002 5.43872V9.87312C17.7971 10.6131 17.512 11.0831 17.2235 11.3825C16.9251 11.6922 16.5803 11.8645 16.2013 11.9452C15.4613 12.1027 14.5751 11.9089 13.8201 11.579C13.4733 11.2384 13.0764 10.9636 12.6664 10.7474C12.5762 10.6999 12.4848 10.6548 12.3927 10.6121C13.0626 10.087 13.5923 9.43947 13.9179 8.7148C14.2904 7.88584 14.3942 6.94743 14.0955 6.02213C13.7975 5.09946 13.1321 4.28965 12.1452 3.64734C10.906 2.84088 9.37174 2.89976 8.12286 3.22489C6.86023 3.5536 5.64654 4.2139 4.9013 4.94149C4.50613 5.32731 4.49854 5.96043 4.88436 6.35561C5.27018 6.75078 5.9033 6.75836 6.29847 6.37255C6.7532 5.92859 7.63944 5.41741 8.62674 5.16038C9.62778 4.89977 10.4934 4.95865 11.0542 5.32361C11.7417 5.77105 12.0636 6.23835 12.1922 6.63667C12.32 7.03235 12.2896 7.4588 12.0936 7.89509C11.6875 8.79874 10.5725 9.69265 9.03956 9.94209C8.52528 10.0258 8.16144 10.4903 8.20342 11.0097C8.2454 11.529 8.67912 11.9291 9.20017 11.9291C9.89121 11.9291 10.9184 12.0868 11.7337 12.5166C12.1558 12.7712 13 13.513 13 14.4438C13 17.9344 9.08771 20.0144 6.04231 18.5126C4.45969 17.7321 3.73899 16.7563 3.38243 15.8366C3.00846 14.872 3.00001 13.8907 3.00001 13.0003C3.00001 12.448 2.55229 12.0003 2.00001 12.0003C1.44772 12.0003 1.00001 12.448 1.00001 13.0003L1 13.0405C0.999876 13.9081 0.999681 15.2235 1.51768 16.5596C2.06115 17.9613 3.14045 19.3115 5.15771 20.3063C9.31207 22.355 15 19.6546 15 14.4438C15 14.2768 14.9913 14.1155 14.9745 13.9597C15.5075 14.0246 16.0652 14.019 16.6177 13.9014C17.0948 13.7998 17.5644 13.6149 18.0002 13.3252L18.0002 20.0003C18.0002 20.5526 18.4479 21.0003 19.0002 21.0003C19.5525 21.0003 20.0002 20.5526 20.0002 20.0003L20.0002 5.45765C20.7261 5.38875 21.5029 5.23087 22.3276 4.94518Z"
                        fill="currentColor"
                      ></path></svg
                    ><div class="flex flex-col gap-2"
                      ><span class="font-matter font-medium leading-snug text-[18px] text-tx">Translation</span
                      ><span class="font-matter font-normal leading-[1.55] text-tx-tertiary text-[14px]"
                        >State-of-the-art translation across 23 languages</span
                      ></div
                    ></button
                  ></div
                ><div class="contents"
                  ><a
                    href="https://indus.sarvam.ai/vision"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="relative group flex flex-col justify-between gap-4 p-5 md:p-8 text-left rounded-xl transition-colors duration-150 cursor-pointer bg-white overflow-hidden border border-st-secondary/50 lg:hidden"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="currentColor"
                      class="w-6 h-6"
                      style="color: #e879a0"
                    >
                      <path
                        d="M10.5879 1.25085C11.1577 1.25009 11.6624 1.24922 12.1377 1.41784C12.2355 1.45255 12.3312 1.49298 12.4248 1.53796C12.8796 1.75663 13.2362 2.11572 13.6387 2.52136L18.4219 7.32898C18.8891 7.7972 19.3033 8.21312 19.5273 8.75671C19.7514 9.30045 19.751 9.88927 19.75 10.5526V14.0272C19.75 14.4753 19.7495 14.9015 19.7471 15.3065C19.7132 15.2165 19.6754 15.1162 19.6338 15.0038L19.376 14.3065C19.3313 14.1857 19.2701 14.068 19.2451 14.0243C18.8959 13.4001 18.2328 13.0009 17.5 13.0009L17.3447 13.0067C16.6233 13.0626 15.9877 13.5054 15.6846 14.162C15.5002 14.6603 15.0535 15.8187 14.9795 15.9794C14.819 16.0533 13.8023 16.4417 13.3047 16.6259C12.5208 16.9166 12 17.6642 12 18.5009L12.0059 18.6561C12.0658 19.4289 12.5696 20.1033 13.3047 20.3759C13.803 20.5602 14.8188 20.9474 14.9795 21.0214C15.0476 21.1693 15.3809 22.0442 15.5771 22.5702C15.5173 22.5794 15.4574 22.5913 15.3965 22.5995C14.2727 22.7513 12.8439 22.7509 11.0713 22.7509C9.29869 22.7509 7.72733 22.7513 6.60352 22.5995C5.43673 22.4418 4.45408 22.1035 3.67383 21.3192C2.89372 20.5349 2.55822 19.5476 2.40137 18.3749C2.25029 17.2453 2.24997 15.8091 2.25 14.0272V9.453C2.24998 7.91954 2.24999 6.68284 2.36426 5.69909C2.48251 4.68127 2.73458 3.80896 3.32715 3.07019C3.54452 2.79923 3.79002 2.55237 4.05957 2.33386C4.7946 1.73815 5.66309 1.48494 6.67578 1.36609C7.65452 1.25126 9.06236 1.25083 10.5879 1.25085ZM11.4902 3.27136C11.4902 4.63276 11.4902 5.28045 11.6064 6.14538C11.7274 7.04526 11.9863 7.80331 12.5879 8.40515C13.1898 9.00707 13.9485 9.26655 14.8486 9.38757C15.7154 9.50408 16.3641 9.50478 17.7314 9.50476C17.6747 9.36693 17.5693 9.23641 16.9512 8.61511L12.3467 3.9862C11.8137 3.45048 11.6719 3.31726 11.4902 3.26257V3.27136Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                      <path
                        d="M18.2031 14.7401C18.0941 14.4461 17.8137 14.2509 17.5 14.2509C17.2256 14.2509 16.9767 14.4004 16.8457 14.6346L16.7969 14.7401L16.5391 15.4374C16.177 16.4157 16.0612 16.6818 15.8711 16.8719C15.6809 17.0621 15.4149 17.1779 14.4365 17.5399L13.7393 17.7977C13.4452 17.9068 13.25 18.1872 13.25 18.5009C13.25 18.8145 13.4452 19.0949 13.7393 19.204L14.4365 19.4618C15.4149 19.8238 15.6809 19.9396 15.8711 20.1298C16.0612 20.3199 16.177 20.586 16.5391 21.5643L16.7969 22.2616C16.9059 22.5556 17.1863 22.7509 17.5 22.7509C17.8137 22.7509 18.0941 22.5556 18.2031 22.2616L18.4609 21.5643C18.823 20.586 18.9388 20.3199 19.1289 20.1298C19.3191 19.9396 19.5851 19.8238 20.5635 19.4618L21.2607 19.204C21.5548 19.0949 21.75 18.8145 21.75 18.5009C21.75 18.1872 21.5548 17.9068 21.2607 17.7977L20.5635 17.5399C19.5851 17.1779 19.3191 17.0621 19.1289 16.8719C18.9388 16.6818 18.823 16.4157 18.4609 15.4374L18.2031 14.7401Z"
                        fill="currentColor"
                      ></path></svg
                    ><div class="flex flex-col gap-2"
                      ><span class="font-matter font-medium leading-snug text-[18px] text-tx"
                        >Document Digitisation</span
                      ><span class="font-matter font-normal leading-[1.55] text-tx-tertiary text-[14px]"
                        >Digitize PDFs and images into structured formats</span
                      ></div
                    ></a
                  ><button
                    class="relative group flex flex-col justify-between gap-4 p-5 md:p-8 text-left rounded-xl transition-colors duration-150 cursor-pointer bg-white overflow-hidden border border-st-secondary/50 hidden lg:flex"
                    ><img
                      src="assets/motifs/models/model-11.svg"
                      alt=""
                      aria-hidden="true"
                      class="hidden lg:block absolute -top-8 -right-8 w-28 h-28 pointer-events-none select-none transition-all duration-500 ease-out opacity-0 rotate-45 scale-75 group-hover:opacity-100 group-hover:rotate-0 group-hover:scale-100"
                    /><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="currentColor"
                      class="w-6 h-6 text-st"
                      style="transition: color 150ms"
                    >
                      <path
                        d="M10.5879 1.25085C11.1577 1.25009 11.6624 1.24922 12.1377 1.41784C12.2355 1.45255 12.3312 1.49298 12.4248 1.53796C12.8796 1.75663 13.2362 2.11572 13.6387 2.52136L18.4219 7.32898C18.8891 7.7972 19.3033 8.21312 19.5273 8.75671C19.7514 9.30045 19.751 9.88927 19.75 10.5526V14.0272C19.75 14.4753 19.7495 14.9015 19.7471 15.3065C19.7132 15.2165 19.6754 15.1162 19.6338 15.0038L19.376 14.3065C19.3313 14.1857 19.2701 14.068 19.2451 14.0243C18.8959 13.4001 18.2328 13.0009 17.5 13.0009L17.3447 13.0067C16.6233 13.0626 15.9877 13.5054 15.6846 14.162C15.5002 14.6603 15.0535 15.8187 14.9795 15.9794C14.819 16.0533 13.8023 16.4417 13.3047 16.6259C12.5208 16.9166 12 17.6642 12 18.5009L12.0059 18.6561C12.0658 19.4289 12.5696 20.1033 13.3047 20.3759C13.803 20.5602 14.8188 20.9474 14.9795 21.0214C15.0476 21.1693 15.3809 22.0442 15.5771 22.5702C15.5173 22.5794 15.4574 22.5913 15.3965 22.5995C14.2727 22.7513 12.8439 22.7509 11.0713 22.7509C9.29869 22.7509 7.72733 22.7513 6.60352 22.5995C5.43673 22.4418 4.45408 22.1035 3.67383 21.3192C2.89372 20.5349 2.55822 19.5476 2.40137 18.3749C2.25029 17.2453 2.24997 15.8091 2.25 14.0272V9.453C2.24998 7.91954 2.24999 6.68284 2.36426 5.69909C2.48251 4.68127 2.73458 3.80896 3.32715 3.07019C3.54452 2.79923 3.79002 2.55237 4.05957 2.33386C4.7946 1.73815 5.66309 1.48494 6.67578 1.36609C7.65452 1.25126 9.06236 1.25083 10.5879 1.25085ZM11.4902 3.27136C11.4902 4.63276 11.4902 5.28045 11.6064 6.14538C11.7274 7.04526 11.9863 7.80331 12.5879 8.40515C13.1898 9.00707 13.9485 9.26655 14.8486 9.38757C15.7154 9.50408 16.3641 9.50478 17.7314 9.50476C17.6747 9.36693 17.5693 9.23641 16.9512 8.61511L12.3467 3.9862C11.8137 3.45048 11.6719 3.31726 11.4902 3.26257V3.27136Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                      <path
                        d="M18.2031 14.7401C18.0941 14.4461 17.8137 14.2509 17.5 14.2509C17.2256 14.2509 16.9767 14.4004 16.8457 14.6346L16.7969 14.7401L16.5391 15.4374C16.177 16.4157 16.0612 16.6818 15.8711 16.8719C15.6809 17.0621 15.4149 17.1779 14.4365 17.5399L13.7393 17.7977C13.4452 17.9068 13.25 18.1872 13.25 18.5009C13.25 18.8145 13.4452 19.0949 13.7393 19.204L14.4365 19.4618C15.4149 19.8238 15.6809 19.9396 15.8711 20.1298C16.0612 20.3199 16.177 20.586 16.5391 21.5643L16.7969 22.2616C16.9059 22.5556 17.1863 22.7509 17.5 22.7509C17.8137 22.7509 18.0941 22.5556 18.2031 22.2616L18.4609 21.5643C18.823 20.586 18.9388 20.3199 19.1289 20.1298C19.3191 19.9396 19.5851 19.8238 20.5635 19.4618L21.2607 19.204C21.5548 19.0949 21.75 18.8145 21.75 18.5009C21.75 18.1872 21.5548 17.9068 21.2607 17.7977L20.5635 17.5399C19.5851 17.1779 19.3191 17.0621 19.1289 16.8719C18.9388 16.6818 18.823 16.4157 18.4609 15.4374L18.2031 14.7401Z"
                        fill="currentColor"
                      ></path></svg
                    ><div class="flex flex-col gap-2"
                      ><span class="font-matter font-medium leading-snug text-[18px] text-tx"
                        >Document Digitisation</span
                      ><span class="font-matter font-normal leading-[1.55] text-tx-tertiary text-[14px]"
                        >Digitize PDFs and images into structured formats</span
                      ></div
                    ></button
                  ></div
                ></div
              ><div class="grid grid-cols-1 sm:grid-cols-3 gap-2"
                ><div
                  class="flex flex-col gap-1.5 md:gap-2 h-fit p-4 md:p-6 overflow-hidden rounded-xl bg-white border border-st-secondary/50"
                  ><span class="font-matter font-medium leading-[1.3] tracking-[-0.015em] text-tx text-[18px]"
                    >REST API</span
                  ><p class="font-matter font-normal leading-[1.55] text-tx-tertiary text-[14px]"
                    >Clean, well-documented endpoints</p
                  ></div
                ><div
                  class="flex flex-col gap-1.5 md:gap-2 h-fit p-4 md:p-6 overflow-hidden rounded-xl bg-white border border-st-secondary/50"
                  ><span class="font-matter font-medium leading-[1.3] tracking-[-0.015em] text-tx text-[18px]"
                    >Python SDK</span
                  ><p class="font-matter font-normal leading-[1.55] text-tx-tertiary text-[14px]"
                    >One line to install<!-- -->
                    <code
                      class="type-label font-mono font-normal leading-[1.55] underline underline-offset-2 transition-colors duration-150 cursor-pointer text-tx-secondary hover:text-sr-indigo-600"
                      title="Copy to clipboard"
                      >pip install sarvamai</code
                    ></p
                  ></div
                ><div
                  class="flex flex-col gap-1.5 md:gap-2 h-fit p-4 md:p-6 overflow-hidden rounded-xl bg-white border border-st-secondary/50"
                  ><span class="font-matter font-medium leading-[1.3] tracking-[-0.015em] text-tx text-[18px]"
                    >Playground</span
                  ><p class="font-matter font-normal leading-[1.55] text-tx-tertiary text-[14px]"
                    >Test in browser, no setup</p
                  ></div
                ></div
              ></div
            ></div
          ></div
        ><!--astro:end--></astro-island
      >
    </section>
    <section class="relative mx-auto w-[88%] md:w-10/12 2xl:max-w-width-mx" data-section-reveal>
      <astro-island
        uid="udmPF"
        prefix="r30"
        component-url="/_astro/HomeIndiaCanSection.Be5xB5Xh.js"
        component-export="default"
        renderer-url="/_astro/client.B3N4hhPH.js"
        props="{}"
        ssr
        client="visible"
        opts='{"name":"HomeIndiaCanSection","value":true}'
        await-children
        ><div class="relative w-full"
          ><div class="pointer-events-none absolute left-1/2 top-1/2 w-screen -translate-x-1/2 -translate-y-1/2"
            ><div class="relative 2xl:overflow-hidden"
              ><div
                class="hidden 2xl:block absolute inset-y-0 left-0 z-10 w-[20%] pointer-events-none"
                style="background: linear-gradient(to right, #fafafa 10%, transparent)"
              ></div
              ><div
                class="hidden 2xl:block absolute inset-y-0 right-0 z-10 w-[20%] pointer-events-none"
                style="background: linear-gradient(to left, #fafafa 10%, transparent)"
              ></div
              ><canvas class="h-[240px] w-full md:h-[420px]" aria-hidden="true"></canvas></div></div
          ><div class="relative z-10 flex w-full flex-col md:flex-row"
            ><div
              class="flex flex-col justify-between gap-6 w-full md:w-[30%] shrink-0 bg-sf rounded-xl border border-st-secondary p-6 md:p-8"
              ><div class="flex flex-col gap-4"
                ><h2
                  class="font-season-mix font-medium text-tx text-[28px] md:text-[36px] leading-tight tracking-[-0.02em]"
                  >India Can</h2
                ><p class="font-matter font-normal leading-[1.65] text-tx-tertiary text-[14px] md:text-[16px]"
                  >From government services reaching 800 million citizens to enterprises transforming customer
                  experience, AI that speaks India&#x27;s languages is changing what&#x27;s possible.</p
                ></div
              ><a href="products/voice-agents"
                ><button
                  class="group relative inline-flex items-center justify-center cursor-pointer font-matter font-medium overflow-hidden rounded-full touch-manipulation disabled:opacity-40 disabled:pointer-events-none min-h-[40px] text-white bg-[#2a2c33] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_0_rgba(0,0,0,0.2)] active:scale-[0.97] active:duration-150 transition-[background-color,box-shadow] duration-350 ease-[cubic-bezier(0.2,0,0,1)] px-5 py-2.5 text-base"
                  ><span
                    aria-hidden="true"
                    class="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-[cubic-bezier(0.2,0,0,1)] bg-[radial-gradient(circle_80px_at_var(--gx)_var(--gy),rgba(255,255,255,0.16)_0%,transparent_100%)]"
                    style="--gx: 50%; --gy: 50%"
                  ></span
                  ><span class="relative z-10 flex items-center gap-2">Explore Sarvam</span></button
                ></a
              ></div
            ><div class="relative w-full md:flex-1 md:pl-2"
              ><div
                class="relative overflow-hidden w-full rounded-xl border border-st-secondary group"
                style="aspect-ratio: 16/9"
                ><video
                  src="cdn/Pages/home/india-can.mp4_updatedAt_1777885741173"
                  title="India Can"
                  aria-label="India Can"
                  class="w-full h-full object-contain bg-white cursor-pointer"
                  muted=""
                  playsinline=""
                  preload="metadata"
                ></video
                ><button
                  class="z-10 absolute inset-0 flex justify-center items-center cursor-pointer"
                  aria-label="Play video"
                  ><div
                    class="flex justify-center items-center bg-black/25 backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-full px-5 py-3 hover:bg-black/35 hover:scale-105 transition-[transform,background-color] duration-300"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="white"
                      class="ml-0.5"
                    >
                      <path
                        d="M5.25 5.78987C5.25 4.42081 6.7512 3.58195 7.91717 4.29947L18.0091 10.5099C19.1196 11.1933 19.1196 12.8074 18.0091 13.4907L7.91717 19.7011C6.7512 20.4187 5.25 19.5798 5.25 18.2107V5.78987Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path></svg></div></button></div></div></div></div
        ><!--astro:end--></astro-island
      >
    </section>
    <section class="relative mx-auto w-[88%] md:w-10/12 2xl:max-w-width-mx" data-section-reveal>
      <astro-island
        uid="1BtMIC"
        prefix="r31"
        component-url="/_astro/WhySarvamSection.CLx9QZaq.js"
        component-export="default"
        renderer-url="/_astro/client.B3N4hhPH.js"
        props='{"features":[1,[[0,{"id":[0,"sovereign"],"title":[0,"Sovereign by design"],"description":[0,"build, deploy, and run AI with full control, developed and operated entirely in India"]}],[0,{"id":[0,"state-of-art"],"title":[0,"State of the art models"],"description":[0,"built for India&#39;s languages, culture, and context"]}],[0,{"id":[0,"humans"],"title":[0,"Human at the core"],"description":[0,"forward deployed engineers work alongside your teams to deliver production-ready agents"]}]]],"ctaHref":[0,"https://indus.sarvam.ai"],"ctaText":[0,"Get Started"]}'
        ssr
        client="visible"
        opts='{"name":"WhySarvamSection","value":true}'
        await-children
        ><div class="flex flex-col gap-12 md:gap-16 lg:gap-20"
          ><div data-animate="true"
            ><div class="section-heading-reveal flex flex-col items-center text-center gap-6 w-full"
              ><div class="flex flex-col items-center gap-6 w-full text-center"
                ><div class="flex flex-col items-center gap-4 w-full text-center"
                  ><h2
                    class="font-season-mix font-medium leading-[1.2] tracking-[-0.02em] w-full text-tx whitespace-pre-line text-[28px] md:text-[36px]"
                    >Powering India's AI-first future</h2
                  ></div
                ></div
              ></div
            ></div
          ><div
            data-animate="true"
            class="flex flex-col items-start gap-6 md:flex-row md:items-stretch md:justify-between md:gap-4"
            ><div
              class="relative h-auto min-h-[220px] w-full md:w-[45%] overflow-hidden rounded-xl border border-st md:min-h-0 md:flex-none"
              ><img
                src="cdn/tr_q-70_f-auto_dpr-auto/assets/logos/customers/home-section-2.webp"
                alt="Sarvam AI Platform"
                class="absolute inset-0 h-full w-full object-cover" /><div
                class="absolute inset-0 flex justify-center items-center mix-blend-overlay"
                ><img
                  src="cdn/assets/brand/logos/sarvam-logo-white.svg"
                  alt=""
                  class="opacity-90 mb-20 md:mb-36 w-20 md:w-24 h-auto"
                  style="opacity: 0; filter: blur(5px) brightness(2); transform: scale(0.5) rotate(90deg)" /></div></div
            ><div
              class="flex min-w-0 w-full md:w-[55%] flex-col justify-between gap-8 md:gap-14 pt-4 px-5 md:px-10 lg:px-12"
              ><div class="flex flex-col gap-7"
                ><div class="flex min-w-0 items-start gap-2 md:gap-5"
                  ><svg
                    class="md:mt-1 shrink-0 scale-70 md:scale-90"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#why-sarvam-star-f-sovereign)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.0035 0C13.927 1.92336 14.7378 4.55104 14.4269 7.06239C15.3696 6.39209 16.5224 5.99794 17.7672 5.99791H17.9981C17.998 7.2792 17.5948 8.4699 16.9085 9.4474C19.3436 9.12122 21.8977 9.89379 23.7691 11.7651L24 11.996C22.0413 13.9546 19.3522 14.7596 16.7993 14.4011C17.5521 15.4058 17.9984 16.6535 17.9983 18.0015C16.6523 18.0015 15.4063 17.5566 14.4024 16.8059C14.7587 19.3568 13.9535 22.0429 11.9964 23.9999C10.0408 22.0444 9.23528 19.3609 9.58954 16.8117C8.58701 17.5588 7.34402 18.0014 6.00159 18.0014V17.7706C6.00162 16.5237 6.39701 15.3691 7.06934 14.4255C4.55586 14.7387 1.92515 13.9283 0 12.0032L0.230859 11.7723C2.10358 9.89968 4.65997 9.12739 7.09662 9.45536C6.407 8.47643 6.00174 7.28284 6.00176 5.99816C7.3476 5.99814 8.5935 6.44286 9.59732 7.19339C9.24126 4.64272 10.0466 1.95683 12.0035 0ZM11.9994 11.9889C11.9969 11.9927 11.9934 11.9958 11.9891 11.9977C11.9893 11.999 11.9895 12.0004 11.9895 12.0018C11.9938 12.0037 11.9974 12.0069 11.9998 12.0109H12.0004C12.0029 12.007 12.0065 12.0038 12.0108 12.0019C12.0105 12.0005 12.0105 11.9991 12.0104 11.9977C12.0061 11.9958 12.0025 11.9927 12 11.9889H11.9994Z"
                        fill="url(#why-sarvam-star-p-sovereign)"
                      ></path>
                    </g>
                    <defs>
                      <filter
                        id="why-sarvam-star-f-sovereign"
                        x="0"
                        y="0"
                        width="24"
                        height="25"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        ></feColorMatrix>
                        <feOffset dy="1"></feOffset>
                        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.647059 0 0 0 0 0.733333 0 0 0 0 0.988235 0 0 0 1 0"
                        ></feColorMatrix>
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_9981_1736"></feBlend>
                      </filter>
                      <linearGradient
                        id="why-sarvam-star-p-sovereign"
                        x1="12"
                        y1="23.9999"
                        x2="12"
                        y2="-3.67886"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E3F1D8"></stop>
                        <stop offset="0.33" stop-color="#C8E4B0"></stop>
                        <stop offset="0.66" stop-color="#83C040"></stop>
                        <stop offset="1" stop-color="#496D21"></stop>
                      </linearGradient>
                    </defs></svg
                  ><div class="flex min-w-0 flex-1 flex-col gap-1 md:gap-1"
                    ><h3
                      class="font-matter font-medium text-tx text-lg sm:text-xl md:text-[21px] text-balance leading-snug md:leading-normal"
                      >Sovereign by design</h3
                    ><p class="font-matter text-tx-tertiary text-[15px] sm:text-base leading-[155%] sm:leading-[165%]"
                      >build, deploy, and run AI with full control, developed and operated entirely in India</p
                    ></div
                  ></div
                ><div class="flex min-w-0 items-start gap-2 md:gap-5"
                  ><svg
                    class="md:mt-1 shrink-0 scale-70 md:scale-90"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#why-sarvam-star-f-state-of-art)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.0035 0C13.927 1.92336 14.7378 4.55104 14.4269 7.06239C15.3696 6.39209 16.5224 5.99794 17.7672 5.99791H17.9981C17.998 7.2792 17.5948 8.4699 16.9085 9.4474C19.3436 9.12122 21.8977 9.89379 23.7691 11.7651L24 11.996C22.0413 13.9546 19.3522 14.7596 16.7993 14.4011C17.5521 15.4058 17.9984 16.6535 17.9983 18.0015C16.6523 18.0015 15.4063 17.5566 14.4024 16.8059C14.7587 19.3568 13.9535 22.0429 11.9964 23.9999C10.0408 22.0444 9.23528 19.3609 9.58954 16.8117C8.58701 17.5588 7.34402 18.0014 6.00159 18.0014V17.7706C6.00162 16.5237 6.39701 15.3691 7.06934 14.4255C4.55586 14.7387 1.92515 13.9283 0 12.0032L0.230859 11.7723C2.10358 9.89968 4.65997 9.12739 7.09662 9.45536C6.407 8.47643 6.00174 7.28284 6.00176 5.99816C7.3476 5.99814 8.5935 6.44286 9.59732 7.19339C9.24126 4.64272 10.0466 1.95683 12.0035 0ZM11.9994 11.9889C11.9969 11.9927 11.9934 11.9958 11.9891 11.9977C11.9893 11.999 11.9895 12.0004 11.9895 12.0018C11.9938 12.0037 11.9974 12.0069 11.9998 12.0109H12.0004C12.0029 12.007 12.0065 12.0038 12.0108 12.0019C12.0105 12.0005 12.0105 11.9991 12.0104 11.9977C12.0061 11.9958 12.0025 11.9927 12 11.9889H11.9994Z"
                        fill="url(#why-sarvam-star-p-state-of-art)"
                      ></path>
                    </g>
                    <defs>
                      <filter
                        id="why-sarvam-star-f-state-of-art"
                        x="0"
                        y="0"
                        width="24"
                        height="25"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        ></feColorMatrix>
                        <feOffset dy="1"></feOffset>
                        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.647059 0 0 0 0 0.733333 0 0 0 0 0.988235 0 0 0 1 0"
                        ></feColorMatrix>
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_9981_1736"></feBlend>
                      </filter>
                      <linearGradient
                        id="why-sarvam-star-p-state-of-art"
                        x1="12"
                        y1="23.9999"
                        x2="12"
                        y2="-3.67886"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E3F1D8"></stop>
                        <stop offset="0.33" stop-color="#C8E4B0"></stop>
                        <stop offset="0.66" stop-color="#83C040"></stop>
                        <stop offset="1" stop-color="#496D21"></stop>
                      </linearGradient>
                    </defs></svg
                  ><div class="flex min-w-0 flex-1 flex-col gap-1 md:gap-1"
                    ><h3
                      class="font-matter font-medium text-tx text-lg sm:text-xl md:text-[21px] text-balance leading-snug md:leading-normal"
                      >State of the art models</h3
                    ><p class="font-matter text-tx-tertiary text-[15px] sm:text-base leading-[155%] sm:leading-[165%]"
                      >built for India&#x27;s languages, culture, and context</p
                    ></div
                  ></div
                ><div class="flex min-w-0 items-start gap-2 md:gap-5"
                  ><svg
                    class="md:mt-1 shrink-0 scale-70 md:scale-90"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#why-sarvam-star-f-humans)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.0035 0C13.927 1.92336 14.7378 4.55104 14.4269 7.06239C15.3696 6.39209 16.5224 5.99794 17.7672 5.99791H17.9981C17.998 7.2792 17.5948 8.4699 16.9085 9.4474C19.3436 9.12122 21.8977 9.89379 23.7691 11.7651L24 11.996C22.0413 13.9546 19.3522 14.7596 16.7993 14.4011C17.5521 15.4058 17.9984 16.6535 17.9983 18.0015C16.6523 18.0015 15.4063 17.5566 14.4024 16.8059C14.7587 19.3568 13.9535 22.0429 11.9964 23.9999C10.0408 22.0444 9.23528 19.3609 9.58954 16.8117C8.58701 17.5588 7.34402 18.0014 6.00159 18.0014V17.7706C6.00162 16.5237 6.39701 15.3691 7.06934 14.4255C4.55586 14.7387 1.92515 13.9283 0 12.0032L0.230859 11.7723C2.10358 9.89968 4.65997 9.12739 7.09662 9.45536C6.407 8.47643 6.00174 7.28284 6.00176 5.99816C7.3476 5.99814 8.5935 6.44286 9.59732 7.19339C9.24126 4.64272 10.0466 1.95683 12.0035 0ZM11.9994 11.9889C11.9969 11.9927 11.9934 11.9958 11.9891 11.9977C11.9893 11.999 11.9895 12.0004 11.9895 12.0018C11.9938 12.0037 11.9974 12.0069 11.9998 12.0109H12.0004C12.0029 12.007 12.0065 12.0038 12.0108 12.0019C12.0105 12.0005 12.0105 11.9991 12.0104 11.9977C12.0061 11.9958 12.0025 11.9927 12 11.9889H11.9994Z"
                        fill="url(#why-sarvam-star-p-humans)"
                      ></path>
                    </g>
                    <defs>
                      <filter
                        id="why-sarvam-star-f-humans"
                        x="0"
                        y="0"
                        width="24"
                        height="25"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        ></feColorMatrix>
                        <feOffset dy="1"></feOffset>
                        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.647059 0 0 0 0 0.733333 0 0 0 0 0.988235 0 0 0 1 0"
                        ></feColorMatrix>
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_9981_1736"></feBlend>
                      </filter>
                      <linearGradient
                        id="why-sarvam-star-p-humans"
                        x1="12"
                        y1="23.9999"
                        x2="12"
                        y2="-3.67886"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E3F1D8"></stop>
                        <stop offset="0.33" stop-color="#C8E4B0"></stop>
                        <stop offset="0.66" stop-color="#83C040"></stop>
                        <stop offset="1" stop-color="#496D21"></stop>
                      </linearGradient>
                    </defs></svg
                  ><div class="flex min-w-0 flex-1 flex-col gap-1 md:gap-1"
                    ><h3
                      class="font-matter font-medium text-tx text-lg sm:text-xl md:text-[21px] text-balance leading-snug md:leading-normal"
                      >Human at the core</h3
                    ><p class="font-matter text-tx-tertiary text-[15px] sm:text-base leading-[155%] sm:leading-[165%]"
                      >forward deployed engineers work alongside your teams to deliver production-ready agents</p
                    ></div
                  ></div
                ></div
              ><div class="w-full" data-animate="true"
                ><a href="https://indus.sarvam.ai" class="block w-full"
                  ><button
                    class="group relative inline-flex items-center justify-center cursor-pointer font-matter font-medium overflow-hidden rounded-full touch-manipulation disabled:opacity-40 disabled:pointer-events-none min-h-[40px] text-white bg-[#2a2c33] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_0_rgba(0,0,0,0.2)] active:scale-[0.97] active:duration-150 transition-[background-color,box-shadow] duration-350 ease-[cubic-bezier(0.2,0,0,1)] px-5 py-2.5 text-base w-full"
                    ><span
                      aria-hidden="true"
                      class="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-[cubic-bezier(0.2,0,0,1)] bg-[radial-gradient(circle_80px_at_var(--gx)_var(--gy),rgba(255,255,255,0.16)_0%,transparent_100%)]"
                      style="--gx: 50%; --gy: 50%"
                    ></span
                    ><span class="relative z-10 flex items-center gap-2">Get Started</span></button
                  ></a
                ></div
              ></div
            ></div
          ></div
        ><!--astro:end--></astro-island
      >
    </section>
    <section class="relative mx-auto w-[88%] md:w-10/12 2xl:max-w-width-mx" data-section-reveal>
      <astro-island
        uid="2aGSB3"
        prefix="r32"
        component-url="/_astro/StackLayersSection.DDA4NYeF.js"
        component-export="default"
        renderer-url="/_astro/client.B3N4hhPH.js"
        props='{"heading":[0,"India&#39;s Full-Stack Sovereign AI Platform"],"layers":[1,[[0,{"id":[0,"applications"],"image":[0,"/assets/pages/home/home-fstack-01.png"],"title":[0,"Population-scale Applications"],"description":[0,"Building products India can use. Conversational agents fluent in India&#39;s languages. Platforms that run enterprise workflows from start to finish."],"tags":[1,[[0,{"label":[0,"Voice Agents"],"href":[0,"/products/voice-agents"],"icon":[1,[[1,[[0,"path"],[0,{"d":[0,"M5.59988 5.65676C6.79984 4.48521 9.79974 3.3138 11.5997 4.48521C14.9486 6.66473 12.8 10.3431 9.20016 10.9288C10.8001 10.9288 14 11.6318 14 14.4435C14 18.7942 9.19988 21.1845 5.6 19.4092C2.00012 17.6339 2 14.7573 2 13"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"0"]}]]],[1,[[0,"path"],[0,{"d":[0,"M19.0006 10C18.052 13.7503 14.9728 13.2464 13.1992 12.3941"],"stroke":[0,"currentColor"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"1"]}]]],[1,[[0,"path"],[0,{"d":[0,"M19 5L19 20"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"2"]}]]],[1,[[0,"path"],[0,{"d":[0,"M16 4C17.5 4.43301 19.5 4.86603 22 4"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"3"]}]]]]],"iconHoverColor":[0,"#6366f1"]}],[0,{"label":[0,"Content Studio"],"href":[0,"/products/content-agents"],"icon":[1,[[1,[[0,"path"],[0,{"d":[0,"M3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3C16.2426 3 18.364 3 19.682 4.31802C21 5.63604 21 7.75736 21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12Z"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"0"]}]]],[1,[[0,"path"],[0,{"d":[0,"M3.5 8H20.5"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"1"]}]]],[1,[[0,"path"],[0,{"d":[0,"M13 12L17 12"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"2"]}]]],[1,[[0,"path"],[0,{"d":[0,"M13 16H15"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"3"]}]]],[1,[[0,"path"],[0,{"d":[0,"M9 8V21"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"4"]}]]]]],"iconHoverColor":[0,"#16a34a"]}],[0,{"label":[0,"Doc Agents"],"href":[0,"/products/doc-agents"],"icon":[1,[[1,[[0,"path"],[0,{"d":[0,"M11 20C7.25027 20 5.3754 20 4.06107 19.0451C3.6366 18.7367 3.26331 18.3634 2.95491 17.9389C2 16.6246 2 14.7497 2 11C2 7.25027 2 5.3754 2.95491 4.06107C3.26331 3.6366 3.6366 3.26331 4.06107 2.95491C5.3754 2 7.25027 2 11 2H11.5C14.7734 2 16.4101 2 17.6125 2.7368C18.2853 3.14908 18.8509 3.71473 19.2632 4.38751C20 5.58985 20 7.22657 20 10.5"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"0"]}]]],[1,[[0,"path"],[0,{"d":[0,"M17.4069 14.4036C17.6192 13.8655 18.3808 13.8655 18.5931 14.4036L18.6298 14.4969C19.1482 15.8113 20.1887 16.8518 21.5031 17.3702L21.5964 17.4069C22.1345 17.6192 22.1345 18.3808 21.5964 18.5931L21.5031 18.6298C20.1887 19.1482 19.1482 20.1887 18.6298 21.5031L18.5931 21.5964C18.3808 22.1345 17.6192 22.1345 17.4069 21.5964L17.3702 21.5031C16.8518 20.1887 15.8113 19.1482 14.4969 18.6298L14.4036 18.5931C13.8655 18.3808 13.8655 17.6192 14.4036 17.4069L14.4969 17.3702C15.8113 16.8518 16.8518 15.8113 17.3702 14.4969L17.4069 14.4036Z"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"1"]}]]],[1,[[0,"path"],[0,{"d":[0,"M11 7H7V8M11 7H15V8M11 7V15M11 15H10M11 15H12"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"2"]}]]]]],"iconHoverColor":[0,"#ea580c"]}],[0,{"label":[0,"Work Agents"],"href":[0,"/products/work-agents"],"icon":[1,[[1,[[0,"path"],[0,{"d":[0,"M3 4.4C3 3.26863 3 2.70294 3.35147 2.35147C3.70294 2 4.26863 2 5.4 2H5.6C6.73137 2 7.29706 2 7.64853 2.35147C8 2.70294 8 3.26863 8 4.4V4.6C8 5.73137 8 6.29706 7.64853 6.64853C7.29706 7 6.73137 7 5.6 7H5.4C4.26863 7 3.70294 7 3.35147 6.64853C3 6.29706 3 5.73137 3 4.6V4.4Z"],"stroke":[0,"currentColor"],"strokeWidth":[0,"1.5"],"key":[0,"0"]}]]],[1,[[0,"path"],[0,{"d":[0,"M16 9.4C16 8.26863 16 7.70294 16.3515 7.35147C16.7029 7 17.2686 7 18.4 7H18.6C19.7314 7 20.2971 7 20.6485 7.35147C21 7.70294 21 8.26863 21 9.4V9.6C21 10.7314 21 11.2971 20.6485 11.6485C20.2971 12 19.7314 12 18.6 12H18.4C17.2686 12 16.7029 12 16.3515 11.6485C16 11.2971 16 10.7314 16 9.6V9.4Z"],"stroke":[0,"currentColor"],"strokeWidth":[0,"1.5"],"key":[0,"1"]}]]],[1,[[0,"path"],[0,{"d":[0,"M3 14.4C3 13.2686 3 12.7029 3.35147 12.3515C3.70294 12 4.26863 12 5.4 12H5.6C6.73137 12 7.29706 12 7.64853 12.3515C8 12.7029 8 13.2686 8 14.4V14.6C8 15.7314 8 16.2971 7.64853 16.6485C7.29706 17 6.73137 17 5.6 17H5.4C4.26863 17 3.70294 17 3.35147 16.6485C3 16.2971 3 15.7314 3 14.6V14.4Z"],"stroke":[0,"currentColor"],"strokeWidth":[0,"1.5"],"key":[0,"2"]}]]],[1,[[0,"path"],[0,{"d":[0,"M16 19.4C16 18.2686 16 17.7029 16.3515 17.3515C16.7029 17 17.2686 17 18.4 17H18.6C19.7314 17 20.2971 17 20.6485 17.3515C21 17.7029 21 18.2686 21 19.4V19.6C21 20.7314 21 21.2971 20.6485 21.6485C20.2971 22 19.7314 22 18.6 22H18.4C17.2686 22 16.7029 22 16.3515 21.6485C16 21.2971 16 20.7314 16 19.6V19.4Z"],"stroke":[0,"currentColor"],"strokeWidth":[0,"1.5"],"key":[0,"3"]}]]],[1,[[0,"path"],[0,{"d":[0,"M8 4.5L15 9.5L9 14.5L16 19.5"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"4"]}]]]]],"iconHoverColor":[0,"#16a34a"]}]]],"contactCta":[0,{"text":[0,"Start building with Sarvam"],"href":[0,"https://indus.sarvam.ai/"]}]}],[0,{"id":[0,"foundation-models"],"image":[0,"/assets/pages/home/home-fstack-02.png"],"title":[0,"State-of-the-Art Models"],"description":[0,"State-of-the-art models trained on sovereign data, delivering strong performance across Indian languages."],"tags":[1,[[0,{"label":[0,"Natural Voices"],"href":[0,"/apis/text-to-speech"],"icon":[1,[[1,[[0,"path"],[0,{"d":[0,"M9 11V14"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"0"]}]]],[1,[[0,"path"],[0,{"d":[0,"M11.5 3C7.27027 3 5.1554 3 3.75276 4.19797C3.55358 4.36808 3.36808 4.55358 3.19797 4.75276C2 6.1554 2 8.27027 2 12.5C2 16.7297 2 18.8446 3.19797 20.2472C3.36808 20.4464 3.55358 20.6319 3.75276 20.802C5.1554 22 7.27027 22 11.5 22C15.7297 22 17.8446 22 19.2472 20.802C19.4464 20.6319 19.6319 20.4464 19.802 20.2472C21 18.8446 21 16.7297 21 12.5"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"1"]}]]],[1,[[0,"path"],[0,{"d":[0,"M12 8V17"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"2"]}]]],[1,[[0,"path"],[0,{"d":[0,"M15 10V15"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"3"]}]]],[1,[[0,"path"],[0,{"d":[0,"M6 12V13"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"4"]}]]],[1,[[0,"path"],[0,{"d":[0,"M15.3881 5.08714C16.796 4.91193 17.9119 3.79602 18.0871 2.38812C18.1137 2.17498 18.2852 2 18.5 2C18.7148 2 18.8863 2.17498 18.9129 2.38812C19.0881 3.79602 20.204 4.91193 21.6119 5.08714C21.825 5.11366 22 5.28522 22 5.5C22 5.71478 21.825 5.88634 21.6119 5.91286C20.204 6.08807 19.0881 7.20398 18.9129 8.61188C18.8863 8.82502 18.7148 9 18.5 9C18.2852 9 18.1137 8.82502 18.0871 8.61188C17.9119 7.20398 16.796 6.08807 15.3881 5.91286C15.175 5.88634 15 5.71478 15 5.5C15 5.28522 15.175 5.11366 15.3881 5.08714Z"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"5"]}]]]]],"iconHoverColor":[0,"#ea580c"]}],[0,{"label":[0,"Accurate Transcription"],"href":[0,"/apis/speech-to-text"],"icon":[1,[[1,[[0,"path"],[0,{"d":[0,"M17 11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V7C7 4.23858 9.23858 2 12 2"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"0"]}]]],[1,[[0,"path"],[0,{"d":[0,"M20 11C20 15.4183 16.4183 19 12 19M12 19C7.58172 19 4 15.4183 4 11M12 19V22"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"1"]}]]],[1,[[0,"path"],[0,{"d":[0,"M14.3327 4.64612C15.5394 4.49594 16.4959 3.53944 16.6461 2.33267C16.6689 2.14999 16.8159 2 17 2C17.1841 2 17.3311 2.14999 17.3539 2.33267C17.5041 3.53944 18.4606 4.49594 19.6673 4.64612C19.85 4.66885 20 4.81591 20 5C20 5.1841 19.85 5.33115 19.6673 5.35388C18.4606 5.50406 17.5041 6.46056 17.3539 7.66733C17.3311 7.85001 17.1841 8 17 8C16.8159 8 16.6689 7.85001 16.6461 7.66733C16.4959 6.46056 15.5394 5.50406 14.3327 5.35388C14.15 5.33115 14 5.1841 14 5C14 4.81591 14.15 4.66885 14.3327 4.64612Z"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"2"]}]]]]],"iconHoverColor":[0,"#6366f1"]}],[0,{"label":[0,"Multilingual Translation"],"href":[0,"/apis/translation"],"icon":[1,[[1,[[0,"circle"],[0,{"cx":[0,"12"],"cy":[0,"12"],"r":[0,"10"],"stroke":[0,"currentColor"],"strokeWidth":[0,"1.5"],"key":[0,"0"]}]]],[1,[[0,"path"],[0,{"d":[0,"M7 8.37931H11.5M17 8.37931H14.5M11.5 8.37931H14.5M11.5 8.37931V7M14.5 8.37931C13.9725 10.2656 12.8679 12.0487 11.6071 13.6158M8.39286 17C9.41205 16.0628 10.5631 14.9134 11.6071 13.6158M11.6071 13.6158C10.9643 12.8621 10.0643 11.6426 9.80714 11.0909M11.6071 13.6158L13.5357 15.6207"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"1"]}]]]]],"iconHoverColor":[0,"#16a34a"]}],[0,{"label":[0,"Document Intelligence"],"href":[0,"/apis/document-digitisation"],"icon":[1,[[1,[[0,"path"],[0,{"d":[0,"M12.6974 3.5H11.303C10.5884 3.5 10.2311 3.5 9.91067 3.612C9.71499 3.68039 9.53113 3.77879 9.36568 3.90367C9.09474 4.10816 8.89655 4.40544 8.50018 5L8.50017 5.00001C8.29717 5.30453 7.99794 5.75337 7.87867 5.87871C7.58314 6.18927 7.19563 6.39666 6.77329 6.47029C6.60284 6.5 6.41985 6.5 6.05387 6.5C5.07379 6.5 4.58376 6.5 4.18307 6.61342C3.18074 6.89716 2.39734 7.68055 2.1136 8.68289C2.00018 9.08357 2.00018 9.57361 2.00018 10.5537V14.5C2.00018 17.3284 2.00018 18.7426 2.87886 19.6213C3.75754 20.5 5.17176 20.5 8.00018 20.5H16.0002C18.8286 20.5 20.2428 20.5 21.1215 19.6213C22.0002 18.7426 22.0002 17.3284 22.0002 14.5V10.5537C22.0002 9.57361 22.0002 9.08357 21.8868 8.68289C21.603 7.68055 20.8196 6.89716 19.8173 6.61342C19.4166 6.5 18.9266 6.5 17.9465 6.5C17.5805 6.5 17.3975 6.5 17.2271 6.47029C16.8047 6.39666 16.4172 6.18927 16.1217 5.87871C16.0024 5.75336 15.7032 5.30451 15.5002 5C15.1038 4.40544 14.9056 4.10816 14.6347 3.90367C14.4692 3.77879 14.2854 3.68039 14.0897 3.612C13.7693 3.5 13.412 3.5 12.6974 3.5Z"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"0"]}]]],[1,[[0,"path"],[0,{"d":[0,"M16.0002 13C16.0002 15.2091 14.2093 17 12.0002 17C9.79104 17 8.00018 15.2091 8.00018 13C8.00018 10.7909 9.79104 9 12.0002 9C14.2093 9 16.0002 10.7909 16.0002 13Z"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeLinejoin":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"1"]}]]],[1,[[0,"path"],[0,{"d":[0,"M19.1252 9.5H19.0002M19.2502 9.5C19.2502 9.63807 19.1383 9.75 19.0002 9.75C18.8621 9.75 18.7502 9.63807 18.7502 9.5C18.7502 9.36193 18.8621 9.25 19.0002 9.25C19.1383 9.25 19.2502 9.36193 19.2502 9.5Z"],"stroke":[0,"currentColor"],"strokeLinecap":[0,"round"],"strokeWidth":[0,"1.5"],"key":[0,"2"]}]]]]],"iconHoverColor":[0,"#dc2626"]}]]]}],[0,{"id":[0,"infrastructure"],"image":[0,"/assets/pages/home/home-fstack-03.png"],"title":[0,"Infrastructure to Serve Models Efficiently"],"description":[0,"A token factory built to handle complexity of model serving so teams can focus on building products, not managing infrastructure."],"stats":[1,[[0,{"value":[0,"10B+"],"label":[0,"tokens served"]}],[0,{"value":[0,"&lt;100ms"],"label":[0,"median latency"]}],[0,{"value":[0,"99.9%"],"label":[0,"uptime SLA"]}]]]}]]]}'
        ssr
        client="visible"
        opts='{"name":"StackLayersSection","value":true}'
        await-children
        ><div class="flex flex-col gap-10 md:gap-14"
          ><div class="section-heading-reveal flex flex-col items-center text-center gap-6 w-full"
            ><div class="flex flex-col items-center gap-6 w-full text-center"
              ><div class="flex flex-col items-center gap-4 w-full text-center"
                ><h2
                  class="font-season-mix font-medium leading-[1.2] tracking-[-0.02em] w-full text-tx whitespace-pre-line text-[28px] md:text-[36px]"
                  >India's Full-Stack Sovereign<br />AI Platform</h2
                ></div
              ></div
            ></div
          ><div class="grid grid-cols-1 md:grid-cols-3 gap-x-0 md:gap-x-12 gap-y-10 md:gap-y-16"
            ><div class="flex flex-col gap-6"
              ><img
                src="assets/pages/home/home-fstack-01.png"
                alt=""
                aria-hidden="true"
                class="w-full h-auto rounded-lg" /><div class="flex flex-col gap-3.5"
                ><h3
                  class="type-heading-5 font-matter font-medium leading-[1.3] tracking-[-0.3px] text-tx"
                  style="text-wrap: balance"
                  >Population-scale Applications</h3
                ><p class="type-body font-matter font-normal leading-[1.6] text-tx-tertiary" style="text-wrap: pretty"
                  >Building products India can use. Conversational agents fluent in India&#x27;s languages. Platforms
                  that run enterprise workflows from start to finish.</p
                ></div
              ><div class="flex flex-col -mt-4 md:mt-0"
                ><a
                  href="products/voice-agents"
                  class="group text-[16px] font-matter font-normal leading-[1.55] tracking-[-0.14px] inline-flex items-center justify-between py-3 border-b border-st last:border-b-0 text-tx-secondary transition-colors duration-200 hover:text-tx hover:border-tx-tertiary/50"
                  style="transition-property: color, border-color"
                  ><span class="flex items-center gap-3"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="currentColor"
                      class="text-tx-tertiary shrink-0"
                      stroke-width="2"
                      stroke="currentColor"
                      style="transition: color 200ms cubic-bezier(0.2, 0, 0, 1)"
                    >
                      <path
                        d="M5.59988 5.65676C6.79984 4.48521 9.79974 3.3138 11.5997 4.48521C14.9486 6.66473 12.8 10.3431 9.20016 10.9288C10.8001 10.9288 14 11.6318 14 14.4435C14 18.7942 9.19988 21.1845 5.6 19.4092C2.00012 17.6339 2 14.7573 2 13"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M19.0006 10C18.052 13.7503 14.9728 13.2464 13.1992 12.3941"
                        stroke="currentColor"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M19 5L19 20"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M16 4C17.5 4.43301 19.5 4.86603 22 4"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path></svg
                    ><span>Voice Agents</span></span
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="text-st shrink-0"
                    stroke-width="1.75"
                    stroke="currentColor"
                    style="
                      transform: rotate(0deg);
                      transition:
                        color 200ms cubic-bezier(0.2, 0, 0, 1),
                        transform 200ms cubic-bezier(0.2, 0, 0, 1);
                    "
                  >
                    <path
                      d="M18.5 12L4.99997 12"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.75"
                    ></path>
                    <path
                      d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.75"
                    ></path></svg></a
                ><a
                  href="products/content-agents"
                  class="group text-[16px] font-matter font-normal leading-[1.55] tracking-[-0.14px] inline-flex items-center justify-between py-3 border-b border-st last:border-b-0 text-tx-secondary transition-colors duration-200 hover:text-tx hover:border-tx-tertiary/50"
                  style="transition-property: color, border-color"
                  ><span class="flex items-center gap-3"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="currentColor"
                      class="text-tx-tertiary shrink-0"
                      stroke-width="2"
                      stroke="currentColor"
                      style="transition: color 200ms cubic-bezier(0.2, 0, 0, 1)"
                    >
                      <path
                        d="M3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3C16.2426 3 18.364 3 19.682 4.31802C21 5.63604 21 7.75736 21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12Z"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M3.5 8H20.5"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M13 12L17 12"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M13 16H15"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M9 8V21"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path></svg
                    ><span>Content Studio</span></span
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="text-st shrink-0"
                    stroke-width="1.75"
                    stroke="currentColor"
                    style="
                      transform: rotate(0deg);
                      transition:
                        color 200ms cubic-bezier(0.2, 0, 0, 1),
                        transform 200ms cubic-bezier(0.2, 0, 0, 1);
                    "
                  >
                    <path
                      d="M18.5 12L4.99997 12"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.75"
                    ></path>
                    <path
                      d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.75"
                    ></path></svg></a
                ><a
                  href="products/doc-agents"
                  class="group text-[16px] font-matter font-normal leading-[1.55] tracking-[-0.14px] inline-flex items-center justify-between py-3 border-b border-st last:border-b-0 text-tx-secondary transition-colors duration-200 hover:text-tx hover:border-tx-tertiary/50"
                  style="transition-property: color, border-color"
                  ><span class="flex items-center gap-3"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="currentColor"
                      class="text-tx-tertiary shrink-0"
                      stroke-width="2"
                      stroke="currentColor"
                      style="transition: color 200ms cubic-bezier(0.2, 0, 0, 1)"
                    >
                      <path
                        d="M11 20C7.25027 20 5.3754 20 4.06107 19.0451C3.6366 18.7367 3.26331 18.3634 2.95491 17.9389C2 16.6246 2 14.7497 2 11C2 7.25027 2 5.3754 2.95491 4.06107C3.26331 3.6366 3.6366 3.26331 4.06107 2.95491C5.3754 2 7.25027 2 11 2H11.5C14.7734 2 16.4101 2 17.6125 2.7368C18.2853 3.14908 18.8509 3.71473 19.2632 4.38751C20 5.58985 20 7.22657 20 10.5"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M17.4069 14.4036C17.6192 13.8655 18.3808 13.8655 18.5931 14.4036L18.6298 14.4969C19.1482 15.8113 20.1887 16.8518 21.5031 17.3702L21.5964 17.4069C22.1345 17.6192 22.1345 18.3808 21.5964 18.5931L21.5031 18.6298C20.1887 19.1482 19.1482 20.1887 18.6298 21.5031L18.5931 21.5964C18.3808 22.1345 17.6192 22.1345 17.4069 21.5964L17.3702 21.5031C16.8518 20.1887 15.8113 19.1482 14.4969 18.6298L14.4036 18.5931C13.8655 18.3808 13.8655 17.6192 14.4036 17.4069L14.4969 17.3702C15.8113 16.8518 16.8518 15.8113 17.3702 14.4969L17.4069 14.4036Z"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M11 7H7V8M11 7H15V8M11 7V15M11 15H10M11 15H12"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path></svg
                    ><span>Doc Agents</span></span
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="text-st shrink-0"
                    stroke-width="1.75"
                    stroke="currentColor"
                    style="
                      transform: rotate(0deg);
                      transition:
                        color 200ms cubic-bezier(0.2, 0, 0, 1),
                        transform 200ms cubic-bezier(0.2, 0, 0, 1);
                    "
                  >
                    <path
                      d="M18.5 12L4.99997 12"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.75"
                    ></path>
                    <path
                      d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.75"
                    ></path></svg></a
                ><a
                  href="products/work-agents"
                  class="group text-[16px] font-matter font-normal leading-[1.55] tracking-[-0.14px] inline-flex items-center justify-between py-3 border-b border-st last:border-b-0 text-tx-secondary transition-colors duration-200 hover:text-tx hover:border-tx-tertiary/50"
                  style="transition-property: color, border-color"
                  ><span class="flex items-center gap-3"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="currentColor"
                      class="text-tx-tertiary shrink-0"
                      stroke-width="2"
                      stroke="currentColor"
                      style="transition: color 200ms cubic-bezier(0.2, 0, 0, 1)"
                    >
                      <path
                        d="M3 4.4C3 3.26863 3 2.70294 3.35147 2.35147C3.70294 2 4.26863 2 5.4 2H5.6C6.73137 2 7.29706 2 7.64853 2.35147C8 2.70294 8 3.26863 8 4.4V4.6C8 5.73137 8 6.29706 7.64853 6.64853C7.29706 7 6.73137 7 5.6 7H5.4C4.26863 7 3.70294 7 3.35147 6.64853C3 6.29706 3 5.73137 3 4.6V4.4Z"
                        stroke="currentColor"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M16 9.4C16 8.26863 16 7.70294 16.3515 7.35147C16.7029 7 17.2686 7 18.4 7H18.6C19.7314 7 20.2971 7 20.6485 7.35147C21 7.70294 21 8.26863 21 9.4V9.6C21 10.7314 21 11.2971 20.6485 11.6485C20.2971 12 19.7314 12 18.6 12H18.4C17.2686 12 16.7029 12 16.3515 11.6485C16 11.2971 16 10.7314 16 9.6V9.4Z"
                        stroke="currentColor"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M3 14.4C3 13.2686 3 12.7029 3.35147 12.3515C3.70294 12 4.26863 12 5.4 12H5.6C6.73137 12 7.29706 12 7.64853 12.3515C8 12.7029 8 13.2686 8 14.4V14.6C8 15.7314 8 16.2971 7.64853 16.6485C7.29706 17 6.73137 17 5.6 17H5.4C4.26863 17 3.70294 17 3.35147 16.6485C3 16.2971 3 15.7314 3 14.6V14.4Z"
                        stroke="currentColor"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M16 19.4C16 18.2686 16 17.7029 16.3515 17.3515C16.7029 17 17.2686 17 18.4 17H18.6C19.7314 17 20.2971 17 20.6485 17.3515C21 17.7029 21 18.2686 21 19.4V19.6C21 20.7314 21 21.2971 20.6485 21.6485C20.2971 22 19.7314 22 18.6 22H18.4C17.2686 22 16.7029 22 16.3515 21.6485C16 21.2971 16 20.7314 16 19.6V19.4Z"
                        stroke="currentColor"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M8 4.5L15 9.5L9 14.5L16 19.5"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path></svg
                    ><span>Work Agents</span></span
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="text-st shrink-0"
                    stroke-width="1.75"
                    stroke="currentColor"
                    style="
                      transform: rotate(0deg);
                      transition:
                        color 200ms cubic-bezier(0.2, 0, 0, 1),
                        transform 200ms cubic-bezier(0.2, 0, 0, 1);
                    "
                  >
                    <path
                      d="M18.5 12L4.99997 12"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.75"
                    ></path>
                    <path
                      d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.75"
                    ></path></svg></a></div></div
            ><div class="flex flex-col gap-6"
              ><img
                src="assets/pages/home/home-fstack-02.png"
                alt=""
                aria-hidden="true"
                class="w-full h-auto rounded-lg" /><div class="flex flex-col gap-3.5"
                ><h3
                  class="type-heading-5 font-matter font-medium leading-[1.3] tracking-[-0.3px] text-tx"
                  style="text-wrap: balance"
                  >State-of-the-Art Models</h3
                ><p class="type-body font-matter font-normal leading-[1.6] text-tx-tertiary" style="text-wrap: pretty"
                  >State-of-the-art models trained on sovereign data, delivering strong performance across Indian
                  languages.</p
                ></div
              ><div class="flex flex-col -mt-4 md:mt-0"
                ><a
                  href="apis/text-to-speech"
                  class="group text-[16px] font-matter font-normal leading-[1.55] tracking-[-0.14px] inline-flex items-center justify-between py-3 border-b border-st last:border-b-0 text-tx-secondary transition-colors duration-200 hover:text-tx hover:border-tx-tertiary/50"
                  style="transition-property: color, border-color"
                  ><span class="flex items-center gap-3"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="currentColor"
                      class="text-tx-tertiary shrink-0"
                      stroke-width="2"
                      stroke="currentColor"
                      style="transition: color 200ms cubic-bezier(0.2, 0, 0, 1)"
                    >
                      <path
                        d="M9 11V14"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M11.5 3C7.27027 3 5.1554 3 3.75276 4.19797C3.55358 4.36808 3.36808 4.55358 3.19797 4.75276C2 6.1554 2 8.27027 2 12.5C2 16.7297 2 18.8446 3.19797 20.2472C3.36808 20.4464 3.55358 20.6319 3.75276 20.802C5.1554 22 7.27027 22 11.5 22C15.7297 22 17.8446 22 19.2472 20.802C19.4464 20.6319 19.6319 20.4464 19.802 20.2472C21 18.8446 21 16.7297 21 12.5"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M12 8V17"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M15 10V15"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M6 12V13"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M15.3881 5.08714C16.796 4.91193 17.9119 3.79602 18.0871 2.38812C18.1137 2.17498 18.2852 2 18.5 2C18.7148 2 18.8863 2.17498 18.9129 2.38812C19.0881 3.79602 20.204 4.91193 21.6119 5.08714C21.825 5.11366 22 5.28522 22 5.5C22 5.71478 21.825 5.88634 21.6119 5.91286C20.204 6.08807 19.0881 7.20398 18.9129 8.61188C18.8863 8.82502 18.7148 9 18.5 9C18.2852 9 18.1137 8.82502 18.0871 8.61188C17.9119 7.20398 16.796 6.08807 15.3881 5.91286C15.175 5.88634 15 5.71478 15 5.5C15 5.28522 15.175 5.11366 15.3881 5.08714Z"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path></svg
                    ><span>Natural Voices</span></span
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="text-st shrink-0"
                    stroke-width="1.75"
                    stroke="currentColor"
                    style="
                      transform: rotate(0deg);
                      transition:
                        color 200ms cubic-bezier(0.2, 0, 0, 1),
                        transform 200ms cubic-bezier(0.2, 0, 0, 1);
                    "
                  >
                    <path
                      d="M18.5 12L4.99997 12"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.75"
                    ></path>
                    <path
                      d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.75"
                    ></path></svg></a
                ><a
                  href="apis/speech-to-text"
                  class="group text-[16px] font-matter font-normal leading-[1.55] tracking-[-0.14px] inline-flex items-center justify-between py-3 border-b border-st last:border-b-0 text-tx-secondary transition-colors duration-200 hover:text-tx hover:border-tx-tertiary/50"
                  style="transition-property: color, border-color"
                  ><span class="flex items-center gap-3"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="currentColor"
                      class="text-tx-tertiary shrink-0"
                      stroke-width="2"
                      stroke="currentColor"
                      style="transition: color 200ms cubic-bezier(0.2, 0, 0, 1)"
                    >
                      <path
                        d="M17 11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V7C7 4.23858 9.23858 2 12 2"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M20 11C20 15.4183 16.4183 19 12 19M12 19C7.58172 19 4 15.4183 4 11M12 19V22"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M14.3327 4.64612C15.5394 4.49594 16.4959 3.53944 16.6461 2.33267C16.6689 2.14999 16.8159 2 17 2C17.1841 2 17.3311 2.14999 17.3539 2.33267C17.5041 3.53944 18.4606 4.49594 19.6673 4.64612C19.85 4.66885 20 4.81591 20 5C20 5.1841 19.85 5.33115 19.6673 5.35388C18.4606 5.50406 17.5041 6.46056 17.3539 7.66733C17.3311 7.85001 17.1841 8 17 8C16.8159 8 16.6689 7.85001 16.6461 7.66733C16.4959 6.46056 15.5394 5.50406 14.3327 5.35388C14.15 5.33115 14 5.1841 14 5C14 4.81591 14.15 4.66885 14.3327 4.64612Z"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path></svg
                    ><span>Accurate Transcription</span></span
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="text-st shrink-0"
                    stroke-width="1.75"
                    stroke="currentColor"
                    style="
                      transform: rotate(0deg);
                      transition:
                        color 200ms cubic-bezier(0.2, 0, 0, 1),
                        transform 200ms cubic-bezier(0.2, 0, 0, 1);
                    "
                  >
                    <path
                      d="M18.5 12L4.99997 12"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.75"
                    ></path>
                    <path
                      d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.75"
                    ></path></svg></a
                ><a
                  href="apis/translation"
                  class="group text-[16px] font-matter font-normal leading-[1.55] tracking-[-0.14px] inline-flex items-center justify-between py-3 border-b border-st last:border-b-0 text-tx-secondary transition-colors duration-200 hover:text-tx hover:border-tx-tertiary/50"
                  style="transition-property: color, border-color"
                  ><span class="flex items-center gap-3"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="currentColor"
                      class="text-tx-tertiary shrink-0"
                      stroke-width="2"
                      stroke="currentColor"
                      style="transition: color 200ms cubic-bezier(0.2, 0, 0, 1)"
                    >
                      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"></circle>
                      <path
                        d="M7 8.37931H11.5M17 8.37931H14.5M11.5 8.37931H14.5M11.5 8.37931V7M14.5 8.37931C13.9725 10.2656 12.8679 12.0487 11.6071 13.6158M8.39286 17C9.41205 16.0628 10.5631 14.9134 11.6071 13.6158M11.6071 13.6158C10.9643 12.8621 10.0643 11.6426 9.80714 11.0909M11.6071 13.6158L13.5357 15.6207"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path></svg
                    ><span>Multilingual Translation</span></span
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="text-st shrink-0"
                    stroke-width="1.75"
                    stroke="currentColor"
                    style="
                      transform: rotate(0deg);
                      transition:
                        color 200ms cubic-bezier(0.2, 0, 0, 1),
                        transform 200ms cubic-bezier(0.2, 0, 0, 1);
                    "
                  >
                    <path
                      d="M18.5 12L4.99997 12"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.75"
                    ></path>
                    <path
                      d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.75"
                    ></path></svg></a
                ><a
                  href="apis/document-digitisation"
                  class="group text-[16px] font-matter font-normal leading-[1.55] tracking-[-0.14px] inline-flex items-center justify-between py-3 border-b border-st last:border-b-0 text-tx-secondary transition-colors duration-200 hover:text-tx hover:border-tx-tertiary/50"
                  style="transition-property: color, border-color"
                  ><span class="flex items-center gap-3"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="currentColor"
                      class="text-tx-tertiary shrink-0"
                      stroke-width="2"
                      stroke="currentColor"
                      style="transition: color 200ms cubic-bezier(0.2, 0, 0, 1)"
                    >
                      <path
                        d="M12.6974 3.5H11.303C10.5884 3.5 10.2311 3.5 9.91067 3.612C9.71499 3.68039 9.53113 3.77879 9.36568 3.90367C9.09474 4.10816 8.89655 4.40544 8.50018 5L8.50017 5.00001C8.29717 5.30453 7.99794 5.75337 7.87867 5.87871C7.58314 6.18927 7.19563 6.39666 6.77329 6.47029C6.60284 6.5 6.41985 6.5 6.05387 6.5C5.07379 6.5 4.58376 6.5 4.18307 6.61342C3.18074 6.89716 2.39734 7.68055 2.1136 8.68289C2.00018 9.08357 2.00018 9.57361 2.00018 10.5537V14.5C2.00018 17.3284 2.00018 18.7426 2.87886 19.6213C3.75754 20.5 5.17176 20.5 8.00018 20.5H16.0002C18.8286 20.5 20.2428 20.5 21.1215 19.6213C22.0002 18.7426 22.0002 17.3284 22.0002 14.5V10.5537C22.0002 9.57361 22.0002 9.08357 21.8868 8.68289C21.603 7.68055 20.8196 6.89716 19.8173 6.61342C19.4166 6.5 18.9266 6.5 17.9465 6.5C17.5805 6.5 17.3975 6.5 17.2271 6.47029C16.8047 6.39666 16.4172 6.18927 16.1217 5.87871C16.0024 5.75336 15.7032 5.30451 15.5002 5C15.1038 4.40544 14.9056 4.10816 14.6347 3.90367C14.4692 3.77879 14.2854 3.68039 14.0897 3.612C13.7693 3.5 13.412 3.5 12.6974 3.5Z"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M16.0002 13C16.0002 15.2091 14.2093 17 12.0002 17C9.79104 17 8.00018 15.2091 8.00018 13C8.00018 10.7909 9.79104 9 12.0002 9C14.2093 9 16.0002 10.7909 16.0002 13Z"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M19.1252 9.5H19.0002M19.2502 9.5C19.2502 9.63807 19.1383 9.75 19.0002 9.75C18.8621 9.75 18.7502 9.63807 18.7502 9.5C18.7502 9.36193 18.8621 9.25 19.0002 9.25C19.1383 9.25 19.2502 9.36193 19.2502 9.5Z"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-width="2"
                      ></path></svg
                    ><span>Document Intelligence</span></span
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="text-st shrink-0"
                    stroke-width="1.75"
                    stroke="currentColor"
                    style="
                      transform: rotate(0deg);
                      transition:
                        color 200ms cubic-bezier(0.2, 0, 0, 1),
                        transform 200ms cubic-bezier(0.2, 0, 0, 1);
                    "
                  >
                    <path
                      d="M18.5 12L4.99997 12"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.75"
                    ></path>
                    <path
                      d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.75"
                    ></path></svg></a></div></div
            ><div class="flex flex-col gap-6"
              ><img
                src="assets/pages/home/home-fstack-03.png"
                alt=""
                aria-hidden="true"
                class="w-full h-auto rounded-lg"
              /><div class="flex flex-col gap-3.5"
                ><h3
                  class="type-heading-5 font-matter font-medium leading-[1.3] tracking-[-0.3px] text-tx"
                  style="text-wrap: balance"
                  >Infrastructure to Serve Models Efficiently</h3
                ><p class="type-body font-matter font-normal leading-[1.6] text-tx-tertiary" style="text-wrap: pretty"
                  >A token factory built to handle complexity of model serving so teams can focus on building products,
                  not managing infrastructure.</p
                ></div
              ><div class="flex flex-col -mt-4 md:mt-0"
                ><a
                  href="trust-center"
                  class="group flex items-baseline justify-between py-3 border-b border-st last:border-b-0 transition-colors duration-200 hover:border-tx-tertiary/50"
                  style="transition-property: border-color"
                  ><span
                    class="text-[16px] font-matter font-normal leading-[1.55] text-tx-tertiary"
                    style="transition: color 200ms cubic-bezier(0.2, 0, 0, 1)"
                    >tokens served</span
                  ><span
                    class="type-heading-5 font-matter font-medium leading-[1.3] tracking-[-0.5px] text-tx"
                    style="font-variant-numeric: tabular-nums"
                    >10B+</span
                  ></a
                ><a
                  href="trust-center"
                  class="group flex items-baseline justify-between py-3 border-b border-st last:border-b-0 transition-colors duration-200 hover:border-tx-tertiary/50"
                  style="transition-property: border-color"
                  ><span
                    class="text-[16px] font-matter font-normal leading-[1.55] text-tx-tertiary"
                    style="transition: color 200ms cubic-bezier(0.2, 0, 0, 1)"
                    >median latency</span
                  ><span
                    class="type-heading-5 font-matter font-medium leading-[1.3] tracking-[-0.5px] text-tx"
                    style="font-variant-numeric: tabular-nums"
                    >&lt;100ms</span
                  ></a
                ><a
                  href="trust-center"
                  class="group flex items-baseline justify-between py-3 border-b border-st last:border-b-0 transition-colors duration-200 hover:border-tx-tertiary/50"
                  style="transition-property: border-color"
                  ><span
                    class="text-[16px] font-matter font-normal leading-[1.55] text-tx-tertiary"
                    style="transition: color 200ms cubic-bezier(0.2, 0, 0, 1)"
                    >uptime SLA</span
                  ><span
                    class="type-heading-5 font-matter font-medium leading-[1.3] tracking-[-0.5px] text-tx"
                    style="font-variant-numeric: tabular-nums"
                    >99.9%</span
                  ></a
                ></div
              ></div
            ></div
          ><div class="flex justify-center"
            ><a href="https://indus.sarvam.ai/"
              ><button
                class="group relative inline-flex items-center justify-center cursor-pointer font-matter font-medium overflow-hidden rounded-full touch-manipulation disabled:opacity-40 disabled:pointer-events-none min-h-[40px] text-white bg-[#2a2c33] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_0_rgba(0,0,0,0.2)] active:scale-[0.97] active:duration-150 transition-[background-color,box-shadow] duration-350 ease-[cubic-bezier(0.2,0,0,1)] px-5 py-2.5 text-base"
                ><span
                  aria-hidden="true"
                  class="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-[cubic-bezier(0.2,0,0,1)] bg-[radial-gradient(circle_80px_at_var(--gx)_var(--gy),rgba(255,255,255,0.16)_0%,transparent_100%)]"
                  style="--gx: 50%; --gy: 50%"
                ></span
                ><span class="relative z-10 flex items-center gap-2">Start building with Sarvam</span></button
              ></a
            ></div
          ></div
        ><!--astro:end--></astro-island
      >
    </section>
    <section
      class="relative flex flex-col items-center gap-8 md:gap-12 mx-auto w-[88%] md:w-10/12 2xl:max-w-width-mx"
      data-section-reveal
    >
      <astro-island
        uid="1AhYIp"
        prefix="r33"
        component-url="/_astro/SectionHeading.Cd13ITnb.js"
        component-export="default"
        renderer-url="/_astro/client.B3N4hhPH.js"
        props='{"heading":[0,"Enterprise-grade. Out of the box."],"subtext":[0,"Compliance, control, and confidence. Not bolted on. Built in from day one."]}'
        ssr
        client="visible"
        opts='{"name":"SectionHeading","value":true}'
        await-children
        ><div class="section-heading-reveal flex flex-col items-center text-center gap-6 w-full"
          ><div class="flex flex-col items-center gap-6 w-full text-center"
            ><div class="flex flex-col items-center gap-4 w-full text-center"
              ><h2
                class="font-season-mix font-medium leading-[1.2] tracking-[-0.02em] w-full text-tx whitespace-pre-line text-[28px] md:text-[36px]"
                >Enterprise-grade. Out of<br />the box.</h2
              ><p class="text-base md:text-lg font-matter font-normal leading-[1.65] max-w-2xl text-tx-tertiary"
                >Compliance, control, and confidence. Not bolted on. Built in from day one.</p
              ></div
            ></div
          ></div
        ><!--astro:end--></astro-island
      >
      <astro-island
        uid="Z2hcdjE"
        prefix="r34"
        component-url="/_astro/AryaEnterprise.dFIK5qu1.js"
        component-export="default"
        renderer-url="/_astro/client.B3N4hhPH.js"
        props='{"data":[0,{"heading":[0,"Enterprise-grade. Out of the box."],"subtext":[0,"Compliance, control, and confidence. Not bolted on. Built in from day one."],"cards":[1,[[0,{"title":[0,"Forward deployed"],"description":[0,"Our engineers work alongside yours, designing agents, integrating systems, and staying until you&#39;re live. Not a handoff. A partnership."],"bullets":[1,[[0,"Dedicated engineer from day one"],[0,"Joint workflow design and build"],[0,"Ongoing accuracy and cost optimisation"],[0,"SLA-backed production support"]]]}],[0,{"title":[0,"Deployment flexibility"],"description":[0,"Work Agents deploy where your data already lives. Private cloud, on-premise, hybrid, or fully air-gapped environments. Your agents run on your terms."],"bullets":[1,[[0,"Private cloud, on-premise, or hybrid"],[0,"Bring your own model or use ours"],[0,"Swap vendors without rewriting workflows"],[0,"Air-gapped deployment available"]]]}]]],"security":[0,{"title":[0,"Security and governance"],"description":[0,"Every agent action is logged and traceable. Role-based access, audit trails, and data residency controls built into the core, not retrofitted. Work Agents meet you where your risk team is."],"badges":[1,[[0,"SOC 2 Type II"],[0,"ISO 27001"],[0,"DPDP compliant"],[0,"Role-based access"],[0,"Full audit trail"],[0,"Data residency controls"]]]}]}],"semanticTypography":[0,true]}'
        ssr
        client="visible"
        opts='{"name":"AryaEnterprise","value":true}'
        await-children
        ><div class="flex flex-col gap-2 w-full"
          ><div class="grid grid-cols-1 md:grid-cols-2 gap-2"
            ><div class="rounded-lg md:rounded-xl border border-st-secondary bg-white p-8 md:p-10 flex flex-col"
              ><h3
                class="type-body-lg md:type-heading-5 font-matter font-medium leading-[1.3] tracking-[-0.015em] text-tx text-balance"
                >Forward deployed</h3
              ><p class="type-body font-matter font-normal leading-[1.6] mt-1.5 md:mt-2.5 text-pretty text-tx-tertiary"
                >Our engineers work alongside yours, designing agents, integrating systems, and staying until
                you&#x27;re live. Not a handoff. A partnership.</p
              ><ul class="flex flex-col gap-2.5 md:gap-3.5 mt-5 md:mt-7"
                ><li class="flex items-start gap-3"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="text-sr-indigo-600 mt-0.5 shrink-0"
                  >
                    <path
                      d="M12 1.25C11.4388 1.25 10.9816 1.48611 10.5656 1.80358C10.1759 2.10089 9.74606 2.53075 9.24319 3.03367L9.20782 3.06904C8.69316 3.5837 8.24449 3.78626 7.55208 3.78626C7.4653 3.78626 7.35579 3.78318 7.23212 3.7797C6.91509 3.77078 6.50497 3.75924 6.14615 3.79027C5.62128 3.83566 4.96532 3.97929 4.46745 4.48134C3.9734 4.97955 3.83327 5.63282 3.78923 6.15439C3.75922 6.50995 3.77075 6.91701 3.77966 7.23178L3.77966 7.23181C3.78317 7.35581 3.78628 7.46549 3.78628 7.55206C3.78628 8.24448 3.58371 8.69315 3.06902 9.20784L3.03367 9.24319C2.53075 9.74606 2.10089 10.1759 1.80358 10.5655C1.48612 10.9816 1.25001 11.4388 1.25 12C1.25001 12.5611 1.48613 13.0183 1.80358 13.4344C2.10095 13.8242 2.53091 14.2541 3.03395 14.7571L3.06906 14.7922C3.40272 15.1258 3.56011 15.3422 3.64932 15.5464C3.73619 15.7453 3.78628 15.9971 3.78628 16.4479C3.78628 16.5347 3.7832 16.6442 3.77972 16.7679C3.7708 17.0849 3.75926 17.495 3.79029 17.8539C3.83569 18.3787 3.97933 19.0347 4.48139 19.5326C4.97961 20.0266 5.63287 20.1667 6.15443 20.2107C6.50997 20.2408 6.91703 20.2292 7.23179 20.2203C7.35581 20.2168 7.4655 20.2137 7.55206 20.2137C7.99328 20.2137 8.24126 20.2581 8.43645 20.3386C8.63147 20.4191 8.84006 20.5632 9.15424 20.8774C9.22129 20.9444 9.30963 21.0391 9.41153 21.1483L9.41176 21.1486L9.41179 21.1486L9.4118 21.1486C9.64176 21.3951 9.94071 21.7155 10.22 21.9596C10.6437 22.33 11.2516 22.75 12 22.75C12.7485 22.75 13.3563 22.33 13.7801 21.9596C14.0593 21.7155 14.3583 21.3951 14.5882 21.1486C14.6902 21.0392 14.7787 20.9445 14.8458 20.8773C15.1599 20.5632 15.3685 20.4191 15.5635 20.3386C15.7587 20.2581 16.0067 20.2137 16.4479 20.2137C16.5345 20.2137 16.6442 20.2168 16.7682 20.2203C17.083 20.2292 17.49 20.2408 17.8456 20.2107C18.3671 20.1667 19.0204 20.0266 19.5186 19.5326C20.0207 19.0347 20.1643 18.3787 20.2097 17.8539C20.2407 17.495 20.2292 17.0849 20.2203 16.7679L20.2203 16.7676C20.2168 16.644 20.2137 16.5346 20.2137 16.4479C20.2137 15.9971 20.2638 15.7453 20.3507 15.5464C20.4399 15.3422 20.5973 15.1258 20.9309 14.7922L20.9661 14.7571C21.4691 14.2541 21.8991 13.8242 22.1964 13.4344C22.5139 13.0183 22.75 12.5611 22.75 12C22.75 11.4388 22.5139 10.9816 22.1964 10.5655C21.8991 10.1759 21.4693 9.74607 20.9664 9.24322L20.931 9.20784C20.5973 8.87416 20.4399 8.65779 20.3507 8.45354C20.2638 8.25468 20.2137 8.00288 20.2137 7.55206C20.2137 7.46534 20.2168 7.35593 20.2203 7.23236L20.2203 7.2321C20.2292 6.91507 20.2407 6.50496 20.2097 6.14615C20.1643 5.62129 20.0207 4.96533 19.5187 4.46747C19.0205 3.97339 18.3672 3.83325 17.8456 3.78921C17.49 3.75919 17.083 3.77072 16.7682 3.77964C16.6442 3.78315 16.5345 3.78626 16.4479 3.78626C15.7553 3.78626 15.3067 3.58361 14.7922 3.06904L14.7568 3.03368C14.2539 2.53075 13.8241 2.10089 13.4344 1.80358C13.0184 1.48611 12.5612 1.25 12 1.25ZM15.7657 10.1432C16.1209 9.72033 16.0661 9.08954 15.6432 8.73432C15.2203 8.37909 14.5895 8.43394 14.2343 8.85683L10.6972 13.0676L9.66603 12.1469C9.25406 11.7791 8.6219 11.8149 8.25407 12.2269C7.88624 12.6388 7.92202 13.271 8.33399 13.6388L10.134 15.246C10.3357 15.4261 10.6018 15.5168 10.8716 15.4975C11.1413 15.4781 11.3918 15.3503 11.5657 15.1432L15.7657 10.1432Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path></svg
                  ><span class="type-body font-matter font-normal leading-[1.6] text-tx-secondary"
                    >Dedicated engineer from day one</span
                  ></li
                ><li class="flex items-start gap-3"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="text-sr-indigo-600 mt-0.5 shrink-0"
                  >
                    <path
                      d="M12 1.25C11.4388 1.25 10.9816 1.48611 10.5656 1.80358C10.1759 2.10089 9.74606 2.53075 9.24319 3.03367L9.20782 3.06904C8.69316 3.5837 8.24449 3.78626 7.55208 3.78626C7.4653 3.78626 7.35579 3.78318 7.23212 3.7797C6.91509 3.77078 6.50497 3.75924 6.14615 3.79027C5.62128 3.83566 4.96532 3.97929 4.46745 4.48134C3.9734 4.97955 3.83327 5.63282 3.78923 6.15439C3.75922 6.50995 3.77075 6.91701 3.77966 7.23178L3.77966 7.23181C3.78317 7.35581 3.78628 7.46549 3.78628 7.55206C3.78628 8.24448 3.58371 8.69315 3.06902 9.20784L3.03367 9.24319C2.53075 9.74606 2.10089 10.1759 1.80358 10.5655C1.48612 10.9816 1.25001 11.4388 1.25 12C1.25001 12.5611 1.48613 13.0183 1.80358 13.4344C2.10095 13.8242 2.53091 14.2541 3.03395 14.7571L3.06906 14.7922C3.40272 15.1258 3.56011 15.3422 3.64932 15.5464C3.73619 15.7453 3.78628 15.9971 3.78628 16.4479C3.78628 16.5347 3.7832 16.6442 3.77972 16.7679C3.7708 17.0849 3.75926 17.495 3.79029 17.8539C3.83569 18.3787 3.97933 19.0347 4.48139 19.5326C4.97961 20.0266 5.63287 20.1667 6.15443 20.2107C6.50997 20.2408 6.91703 20.2292 7.23179 20.2203C7.35581 20.2168 7.4655 20.2137 7.55206 20.2137C7.99328 20.2137 8.24126 20.2581 8.43645 20.3386C8.63147 20.4191 8.84006 20.5632 9.15424 20.8774C9.22129 20.9444 9.30963 21.0391 9.41153 21.1483L9.41176 21.1486L9.41179 21.1486L9.4118 21.1486C9.64176 21.3951 9.94071 21.7155 10.22 21.9596C10.6437 22.33 11.2516 22.75 12 22.75C12.7485 22.75 13.3563 22.33 13.7801 21.9596C14.0593 21.7155 14.3583 21.3951 14.5882 21.1486C14.6902 21.0392 14.7787 20.9445 14.8458 20.8773C15.1599 20.5632 15.3685 20.4191 15.5635 20.3386C15.7587 20.2581 16.0067 20.2137 16.4479 20.2137C16.5345 20.2137 16.6442 20.2168 16.7682 20.2203C17.083 20.2292 17.49 20.2408 17.8456 20.2107C18.3671 20.1667 19.0204 20.0266 19.5186 19.5326C20.0207 19.0347 20.1643 18.3787 20.2097 17.8539C20.2407 17.495 20.2292 17.0849 20.2203 16.7679L20.2203 16.7676C20.2168 16.644 20.2137 16.5346 20.2137 16.4479C20.2137 15.9971 20.2638 15.7453 20.3507 15.5464C20.4399 15.3422 20.5973 15.1258 20.9309 14.7922L20.9661 14.7571C21.4691 14.2541 21.8991 13.8242 22.1964 13.4344C22.5139 13.0183 22.75 12.5611 22.75 12C22.75 11.4388 22.5139 10.9816 22.1964 10.5655C21.8991 10.1759 21.4693 9.74607 20.9664 9.24322L20.931 9.20784C20.5973 8.87416 20.4399 8.65779 20.3507 8.45354C20.2638 8.25468 20.2137 8.00288 20.2137 7.55206C20.2137 7.46534 20.2168 7.35593 20.2203 7.23236L20.2203 7.2321C20.2292 6.91507 20.2407 6.50496 20.2097 6.14615C20.1643 5.62129 20.0207 4.96533 19.5187 4.46747C19.0205 3.97339 18.3672 3.83325 17.8456 3.78921C17.49 3.75919 17.083 3.77072 16.7682 3.77964C16.6442 3.78315 16.5345 3.78626 16.4479 3.78626C15.7553 3.78626 15.3067 3.58361 14.7922 3.06904L14.7568 3.03368C14.2539 2.53075 13.8241 2.10089 13.4344 1.80358C13.0184 1.48611 12.5612 1.25 12 1.25ZM15.7657 10.1432C16.1209 9.72033 16.0661 9.08954 15.6432 8.73432C15.2203 8.37909 14.5895 8.43394 14.2343 8.85683L10.6972 13.0676L9.66603 12.1469C9.25406 11.7791 8.6219 11.8149 8.25407 12.2269C7.88624 12.6388 7.92202 13.271 8.33399 13.6388L10.134 15.246C10.3357 15.4261 10.6018 15.5168 10.8716 15.4975C11.1413 15.4781 11.3918 15.3503 11.5657 15.1432L15.7657 10.1432Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path></svg
                  ><span class="type-body font-matter font-normal leading-[1.6] text-tx-secondary"
                    >Joint workflow design and build</span
                  ></li
                ><li class="flex items-start gap-3"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="text-sr-indigo-600 mt-0.5 shrink-0"
                  >
                    <path
                      d="M12 1.25C11.4388 1.25 10.9816 1.48611 10.5656 1.80358C10.1759 2.10089 9.74606 2.53075 9.24319 3.03367L9.20782 3.06904C8.69316 3.5837 8.24449 3.78626 7.55208 3.78626C7.4653 3.78626 7.35579 3.78318 7.23212 3.7797C6.91509 3.77078 6.50497 3.75924 6.14615 3.79027C5.62128 3.83566 4.96532 3.97929 4.46745 4.48134C3.9734 4.97955 3.83327 5.63282 3.78923 6.15439C3.75922 6.50995 3.77075 6.91701 3.77966 7.23178L3.77966 7.23181C3.78317 7.35581 3.78628 7.46549 3.78628 7.55206C3.78628 8.24448 3.58371 8.69315 3.06902 9.20784L3.03367 9.24319C2.53075 9.74606 2.10089 10.1759 1.80358 10.5655C1.48612 10.9816 1.25001 11.4388 1.25 12C1.25001 12.5611 1.48613 13.0183 1.80358 13.4344C2.10095 13.8242 2.53091 14.2541 3.03395 14.7571L3.06906 14.7922C3.40272 15.1258 3.56011 15.3422 3.64932 15.5464C3.73619 15.7453 3.78628 15.9971 3.78628 16.4479C3.78628 16.5347 3.7832 16.6442 3.77972 16.7679C3.7708 17.0849 3.75926 17.495 3.79029 17.8539C3.83569 18.3787 3.97933 19.0347 4.48139 19.5326C4.97961 20.0266 5.63287 20.1667 6.15443 20.2107C6.50997 20.2408 6.91703 20.2292 7.23179 20.2203C7.35581 20.2168 7.4655 20.2137 7.55206 20.2137C7.99328 20.2137 8.24126 20.2581 8.43645 20.3386C8.63147 20.4191 8.84006 20.5632 9.15424 20.8774C9.22129 20.9444 9.30963 21.0391 9.41153 21.1483L9.41176 21.1486L9.41179 21.1486L9.4118 21.1486C9.64176 21.3951 9.94071 21.7155 10.22 21.9596C10.6437 22.33 11.2516 22.75 12 22.75C12.7485 22.75 13.3563 22.33 13.7801 21.9596C14.0593 21.7155 14.3583 21.3951 14.5882 21.1486C14.6902 21.0392 14.7787 20.9445 14.8458 20.8773C15.1599 20.5632 15.3685 20.4191 15.5635 20.3386C15.7587 20.2581 16.0067 20.2137 16.4479 20.2137C16.5345 20.2137 16.6442 20.2168 16.7682 20.2203C17.083 20.2292 17.49 20.2408 17.8456 20.2107C18.3671 20.1667 19.0204 20.0266 19.5186 19.5326C20.0207 19.0347 20.1643 18.3787 20.2097 17.8539C20.2407 17.495 20.2292 17.0849 20.2203 16.7679L20.2203 16.7676C20.2168 16.644 20.2137 16.5346 20.2137 16.4479C20.2137 15.9971 20.2638 15.7453 20.3507 15.5464C20.4399 15.3422 20.5973 15.1258 20.9309 14.7922L20.9661 14.7571C21.4691 14.2541 21.8991 13.8242 22.1964 13.4344C22.5139 13.0183 22.75 12.5611 22.75 12C22.75 11.4388 22.5139 10.9816 22.1964 10.5655C21.8991 10.1759 21.4693 9.74607 20.9664 9.24322L20.931 9.20784C20.5973 8.87416 20.4399 8.65779 20.3507 8.45354C20.2638 8.25468 20.2137 8.00288 20.2137 7.55206C20.2137 7.46534 20.2168 7.35593 20.2203 7.23236L20.2203 7.2321C20.2292 6.91507 20.2407 6.50496 20.2097 6.14615C20.1643 5.62129 20.0207 4.96533 19.5187 4.46747C19.0205 3.97339 18.3672 3.83325 17.8456 3.78921C17.49 3.75919 17.083 3.77072 16.7682 3.77964C16.6442 3.78315 16.5345 3.78626 16.4479 3.78626C15.7553 3.78626 15.3067 3.58361 14.7922 3.06904L14.7568 3.03368C14.2539 2.53075 13.8241 2.10089 13.4344 1.80358C13.0184 1.48611 12.5612 1.25 12 1.25ZM15.7657 10.1432C16.1209 9.72033 16.0661 9.08954 15.6432 8.73432C15.2203 8.37909 14.5895 8.43394 14.2343 8.85683L10.6972 13.0676L9.66603 12.1469C9.25406 11.7791 8.6219 11.8149 8.25407 12.2269C7.88624 12.6388 7.92202 13.271 8.33399 13.6388L10.134 15.246C10.3357 15.4261 10.6018 15.5168 10.8716 15.4975C11.1413 15.4781 11.3918 15.3503 11.5657 15.1432L15.7657 10.1432Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path></svg
                  ><span class="type-body font-matter font-normal leading-[1.6] text-tx-secondary"
                    >Ongoing accuracy and cost optimisation</span
                  ></li
                ><li class="flex items-start gap-3"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="text-sr-indigo-600 mt-0.5 shrink-0"
                  >
                    <path
                      d="M12 1.25C11.4388 1.25 10.9816 1.48611 10.5656 1.80358C10.1759 2.10089 9.74606 2.53075 9.24319 3.03367L9.20782 3.06904C8.69316 3.5837 8.24449 3.78626 7.55208 3.78626C7.4653 3.78626 7.35579 3.78318 7.23212 3.7797C6.91509 3.77078 6.50497 3.75924 6.14615 3.79027C5.62128 3.83566 4.96532 3.97929 4.46745 4.48134C3.9734 4.97955 3.83327 5.63282 3.78923 6.15439C3.75922 6.50995 3.77075 6.91701 3.77966 7.23178L3.77966 7.23181C3.78317 7.35581 3.78628 7.46549 3.78628 7.55206C3.78628 8.24448 3.58371 8.69315 3.06902 9.20784L3.03367 9.24319C2.53075 9.74606 2.10089 10.1759 1.80358 10.5655C1.48612 10.9816 1.25001 11.4388 1.25 12C1.25001 12.5611 1.48613 13.0183 1.80358 13.4344C2.10095 13.8242 2.53091 14.2541 3.03395 14.7571L3.06906 14.7922C3.40272 15.1258 3.56011 15.3422 3.64932 15.5464C3.73619 15.7453 3.78628 15.9971 3.78628 16.4479C3.78628 16.5347 3.7832 16.6442 3.77972 16.7679C3.7708 17.0849 3.75926 17.495 3.79029 17.8539C3.83569 18.3787 3.97933 19.0347 4.48139 19.5326C4.97961 20.0266 5.63287 20.1667 6.15443 20.2107C6.50997 20.2408 6.91703 20.2292 7.23179 20.2203C7.35581 20.2168 7.4655 20.2137 7.55206 20.2137C7.99328 20.2137 8.24126 20.2581 8.43645 20.3386C8.63147 20.4191 8.84006 20.5632 9.15424 20.8774C9.22129 20.9444 9.30963 21.0391 9.41153 21.1483L9.41176 21.1486L9.41179 21.1486L9.4118 21.1486C9.64176 21.3951 9.94071 21.7155 10.22 21.9596C10.6437 22.33 11.2516 22.75 12 22.75C12.7485 22.75 13.3563 22.33 13.7801 21.9596C14.0593 21.7155 14.3583 21.3951 14.5882 21.1486C14.6902 21.0392 14.7787 20.9445 14.8458 20.8773C15.1599 20.5632 15.3685 20.4191 15.5635 20.3386C15.7587 20.2581 16.0067 20.2137 16.4479 20.2137C16.5345 20.2137 16.6442 20.2168 16.7682 20.2203C17.083 20.2292 17.49 20.2408 17.8456 20.2107C18.3671 20.1667 19.0204 20.0266 19.5186 19.5326C20.0207 19.0347 20.1643 18.3787 20.2097 17.8539C20.2407 17.495 20.2292 17.0849 20.2203 16.7679L20.2203 16.7676C20.2168 16.644 20.2137 16.5346 20.2137 16.4479C20.2137 15.9971 20.2638 15.7453 20.3507 15.5464C20.4399 15.3422 20.5973 15.1258 20.9309 14.7922L20.9661 14.7571C21.4691 14.2541 21.8991 13.8242 22.1964 13.4344C22.5139 13.0183 22.75 12.5611 22.75 12C22.75 11.4388 22.5139 10.9816 22.1964 10.5655C21.8991 10.1759 21.4693 9.74607 20.9664 9.24322L20.931 9.20784C20.5973 8.87416 20.4399 8.65779 20.3507 8.45354C20.2638 8.25468 20.2137 8.00288 20.2137 7.55206C20.2137 7.46534 20.2168 7.35593 20.2203 7.23236L20.2203 7.2321C20.2292 6.91507 20.2407 6.50496 20.2097 6.14615C20.1643 5.62129 20.0207 4.96533 19.5187 4.46747C19.0205 3.97339 18.3672 3.83325 17.8456 3.78921C17.49 3.75919 17.083 3.77072 16.7682 3.77964C16.6442 3.78315 16.5345 3.78626 16.4479 3.78626C15.7553 3.78626 15.3067 3.58361 14.7922 3.06904L14.7568 3.03368C14.2539 2.53075 13.8241 2.10089 13.4344 1.80358C13.0184 1.48611 12.5612 1.25 12 1.25ZM15.7657 10.1432C16.1209 9.72033 16.0661 9.08954 15.6432 8.73432C15.2203 8.37909 14.5895 8.43394 14.2343 8.85683L10.6972 13.0676L9.66603 12.1469C9.25406 11.7791 8.6219 11.8149 8.25407 12.2269C7.88624 12.6388 7.92202 13.271 8.33399 13.6388L10.134 15.246C10.3357 15.4261 10.6018 15.5168 10.8716 15.4975C11.1413 15.4781 11.3918 15.3503 11.5657 15.1432L15.7657 10.1432Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path></svg
                  ><span class="type-body font-matter font-normal leading-[1.6] text-tx-secondary"
                    >SLA-backed production support</span
                  ></li
                ></ul
              ></div
            ><div class="rounded-lg md:rounded-xl border border-st-secondary bg-white p-8 md:p-10 flex flex-col"
              ><h3
                class="type-body-lg md:type-heading-5 font-matter font-medium leading-[1.3] tracking-[-0.015em] text-tx text-balance"
                >Deployment flexibility</h3
              ><p class="type-body font-matter font-normal leading-[1.6] mt-1.5 md:mt-2.5 text-pretty text-tx-tertiary"
                >Work Agents deploy where your data already lives. Private cloud, on-premise, hybrid, or fully
                air-gapped environments. Your agents run on your terms.</p
              ><ul class="flex flex-col gap-2.5 md:gap-3.5 mt-5 md:mt-7"
                ><li class="flex items-start gap-3"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="text-sr-indigo-600 mt-0.5 shrink-0"
                  >
                    <path
                      d="M12 1.25C11.4388 1.25 10.9816 1.48611 10.5656 1.80358C10.1759 2.10089 9.74606 2.53075 9.24319 3.03367L9.20782 3.06904C8.69316 3.5837 8.24449 3.78626 7.55208 3.78626C7.4653 3.78626 7.35579 3.78318 7.23212 3.7797C6.91509 3.77078 6.50497 3.75924 6.14615 3.79027C5.62128 3.83566 4.96532 3.97929 4.46745 4.48134C3.9734 4.97955 3.83327 5.63282 3.78923 6.15439C3.75922 6.50995 3.77075 6.91701 3.77966 7.23178L3.77966 7.23181C3.78317 7.35581 3.78628 7.46549 3.78628 7.55206C3.78628 8.24448 3.58371 8.69315 3.06902 9.20784L3.03367 9.24319C2.53075 9.74606 2.10089 10.1759 1.80358 10.5655C1.48612 10.9816 1.25001 11.4388 1.25 12C1.25001 12.5611 1.48613 13.0183 1.80358 13.4344C2.10095 13.8242 2.53091 14.2541 3.03395 14.7571L3.06906 14.7922C3.40272 15.1258 3.56011 15.3422 3.64932 15.5464C3.73619 15.7453 3.78628 15.9971 3.78628 16.4479C3.78628 16.5347 3.7832 16.6442 3.77972 16.7679C3.7708 17.0849 3.75926 17.495 3.79029 17.8539C3.83569 18.3787 3.97933 19.0347 4.48139 19.5326C4.97961 20.0266 5.63287 20.1667 6.15443 20.2107C6.50997 20.2408 6.91703 20.2292 7.23179 20.2203C7.35581 20.2168 7.4655 20.2137 7.55206 20.2137C7.99328 20.2137 8.24126 20.2581 8.43645 20.3386C8.63147 20.4191 8.84006 20.5632 9.15424 20.8774C9.22129 20.9444 9.30963 21.0391 9.41153 21.1483L9.41176 21.1486L9.41179 21.1486L9.4118 21.1486C9.64176 21.3951 9.94071 21.7155 10.22 21.9596C10.6437 22.33 11.2516 22.75 12 22.75C12.7485 22.75 13.3563 22.33 13.7801 21.9596C14.0593 21.7155 14.3583 21.3951 14.5882 21.1486C14.6902 21.0392 14.7787 20.9445 14.8458 20.8773C15.1599 20.5632 15.3685 20.4191 15.5635 20.3386C15.7587 20.2581 16.0067 20.2137 16.4479 20.2137C16.5345 20.2137 16.6442 20.2168 16.7682 20.2203C17.083 20.2292 17.49 20.2408 17.8456 20.2107C18.3671 20.1667 19.0204 20.0266 19.5186 19.5326C20.0207 19.0347 20.1643 18.3787 20.2097 17.8539C20.2407 17.495 20.2292 17.0849 20.2203 16.7679L20.2203 16.7676C20.2168 16.644 20.2137 16.5346 20.2137 16.4479C20.2137 15.9971 20.2638 15.7453 20.3507 15.5464C20.4399 15.3422 20.5973 15.1258 20.9309 14.7922L20.9661 14.7571C21.4691 14.2541 21.8991 13.8242 22.1964 13.4344C22.5139 13.0183 22.75 12.5611 22.75 12C22.75 11.4388 22.5139 10.9816 22.1964 10.5655C21.8991 10.1759 21.4693 9.74607 20.9664 9.24322L20.931 9.20784C20.5973 8.87416 20.4399 8.65779 20.3507 8.45354C20.2638 8.25468 20.2137 8.00288 20.2137 7.55206C20.2137 7.46534 20.2168 7.35593 20.2203 7.23236L20.2203 7.2321C20.2292 6.91507 20.2407 6.50496 20.2097 6.14615C20.1643 5.62129 20.0207 4.96533 19.5187 4.46747C19.0205 3.97339 18.3672 3.83325 17.8456 3.78921C17.49 3.75919 17.083 3.77072 16.7682 3.77964C16.6442 3.78315 16.5345 3.78626 16.4479 3.78626C15.7553 3.78626 15.3067 3.58361 14.7922 3.06904L14.7568 3.03368C14.2539 2.53075 13.8241 2.10089 13.4344 1.80358C13.0184 1.48611 12.5612 1.25 12 1.25ZM15.7657 10.1432C16.1209 9.72033 16.0661 9.08954 15.6432 8.73432C15.2203 8.37909 14.5895 8.43394 14.2343 8.85683L10.6972 13.0676L9.66603 12.1469C9.25406 11.7791 8.6219 11.8149 8.25407 12.2269C7.88624 12.6388 7.92202 13.271 8.33399 13.6388L10.134 15.246C10.3357 15.4261 10.6018 15.5168 10.8716 15.4975C11.1413 15.4781 11.3918 15.3503 11.5657 15.1432L15.7657 10.1432Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path></svg
                  ><span class="type-body font-matter font-normal leading-[1.6] text-tx-secondary"
                    >Private cloud, on-premise, or hybrid</span
                  ></li
                ><li class="flex items-start gap-3"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="text-sr-indigo-600 mt-0.5 shrink-0"
                  >
                    <path
                      d="M12 1.25C11.4388 1.25 10.9816 1.48611 10.5656 1.80358C10.1759 2.10089 9.74606 2.53075 9.24319 3.03367L9.20782 3.06904C8.69316 3.5837 8.24449 3.78626 7.55208 3.78626C7.4653 3.78626 7.35579 3.78318 7.23212 3.7797C6.91509 3.77078 6.50497 3.75924 6.14615 3.79027C5.62128 3.83566 4.96532 3.97929 4.46745 4.48134C3.9734 4.97955 3.83327 5.63282 3.78923 6.15439C3.75922 6.50995 3.77075 6.91701 3.77966 7.23178L3.77966 7.23181C3.78317 7.35581 3.78628 7.46549 3.78628 7.55206C3.78628 8.24448 3.58371 8.69315 3.06902 9.20784L3.03367 9.24319C2.53075 9.74606 2.10089 10.1759 1.80358 10.5655C1.48612 10.9816 1.25001 11.4388 1.25 12C1.25001 12.5611 1.48613 13.0183 1.80358 13.4344C2.10095 13.8242 2.53091 14.2541 3.03395 14.7571L3.06906 14.7922C3.40272 15.1258 3.56011 15.3422 3.64932 15.5464C3.73619 15.7453 3.78628 15.9971 3.78628 16.4479C3.78628 16.5347 3.7832 16.6442 3.77972 16.7679C3.7708 17.0849 3.75926 17.495 3.79029 17.8539C3.83569 18.3787 3.97933 19.0347 4.48139 19.5326C4.97961 20.0266 5.63287 20.1667 6.15443 20.2107C6.50997 20.2408 6.91703 20.2292 7.23179 20.2203C7.35581 20.2168 7.4655 20.2137 7.55206 20.2137C7.99328 20.2137 8.24126 20.2581 8.43645 20.3386C8.63147 20.4191 8.84006 20.5632 9.15424 20.8774C9.22129 20.9444 9.30963 21.0391 9.41153 21.1483L9.41176 21.1486L9.41179 21.1486L9.4118 21.1486C9.64176 21.3951 9.94071 21.7155 10.22 21.9596C10.6437 22.33 11.2516 22.75 12 22.75C12.7485 22.75 13.3563 22.33 13.7801 21.9596C14.0593 21.7155 14.3583 21.3951 14.5882 21.1486C14.6902 21.0392 14.7787 20.9445 14.8458 20.8773C15.1599 20.5632 15.3685 20.4191 15.5635 20.3386C15.7587 20.2581 16.0067 20.2137 16.4479 20.2137C16.5345 20.2137 16.6442 20.2168 16.7682 20.2203C17.083 20.2292 17.49 20.2408 17.8456 20.2107C18.3671 20.1667 19.0204 20.0266 19.5186 19.5326C20.0207 19.0347 20.1643 18.3787 20.2097 17.8539C20.2407 17.495 20.2292 17.0849 20.2203 16.7679L20.2203 16.7676C20.2168 16.644 20.2137 16.5346 20.2137 16.4479C20.2137 15.9971 20.2638 15.7453 20.3507 15.5464C20.4399 15.3422 20.5973 15.1258 20.9309 14.7922L20.9661 14.7571C21.4691 14.2541 21.8991 13.8242 22.1964 13.4344C22.5139 13.0183 22.75 12.5611 22.75 12C22.75 11.4388 22.5139 10.9816 22.1964 10.5655C21.8991 10.1759 21.4693 9.74607 20.9664 9.24322L20.931 9.20784C20.5973 8.87416 20.4399 8.65779 20.3507 8.45354C20.2638 8.25468 20.2137 8.00288 20.2137 7.55206C20.2137 7.46534 20.2168 7.35593 20.2203 7.23236L20.2203 7.2321C20.2292 6.91507 20.2407 6.50496 20.2097 6.14615C20.1643 5.62129 20.0207 4.96533 19.5187 4.46747C19.0205 3.97339 18.3672 3.83325 17.8456 3.78921C17.49 3.75919 17.083 3.77072 16.7682 3.77964C16.6442 3.78315 16.5345 3.78626 16.4479 3.78626C15.7553 3.78626 15.3067 3.58361 14.7922 3.06904L14.7568 3.03368C14.2539 2.53075 13.8241 2.10089 13.4344 1.80358C13.0184 1.48611 12.5612 1.25 12 1.25ZM15.7657 10.1432C16.1209 9.72033 16.0661 9.08954 15.6432 8.73432C15.2203 8.37909 14.5895 8.43394 14.2343 8.85683L10.6972 13.0676L9.66603 12.1469C9.25406 11.7791 8.6219 11.8149 8.25407 12.2269C7.88624 12.6388 7.92202 13.271 8.33399 13.6388L10.134 15.246C10.3357 15.4261 10.6018 15.5168 10.8716 15.4975C11.1413 15.4781 11.3918 15.3503 11.5657 15.1432L15.7657 10.1432Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path></svg
                  ><span class="type-body font-matter font-normal leading-[1.6] text-tx-secondary"
                    >Bring your own model or use ours</span
                  ></li
                ><li class="flex items-start gap-3"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="text-sr-indigo-600 mt-0.5 shrink-0"
                  >
                    <path
                      d="M12 1.25C11.4388 1.25 10.9816 1.48611 10.5656 1.80358C10.1759 2.10089 9.74606 2.53075 9.24319 3.03367L9.20782 3.06904C8.69316 3.5837 8.24449 3.78626 7.55208 3.78626C7.4653 3.78626 7.35579 3.78318 7.23212 3.7797C6.91509 3.77078 6.50497 3.75924 6.14615 3.79027C5.62128 3.83566 4.96532 3.97929 4.46745 4.48134C3.9734 4.97955 3.83327 5.63282 3.78923 6.15439C3.75922 6.50995 3.77075 6.91701 3.77966 7.23178L3.77966 7.23181C3.78317 7.35581 3.78628 7.46549 3.78628 7.55206C3.78628 8.24448 3.58371 8.69315 3.06902 9.20784L3.03367 9.24319C2.53075 9.74606 2.10089 10.1759 1.80358 10.5655C1.48612 10.9816 1.25001 11.4388 1.25 12C1.25001 12.5611 1.48613 13.0183 1.80358 13.4344C2.10095 13.8242 2.53091 14.2541 3.03395 14.7571L3.06906 14.7922C3.40272 15.1258 3.56011 15.3422 3.64932 15.5464C3.73619 15.7453 3.78628 15.9971 3.78628 16.4479C3.78628 16.5347 3.7832 16.6442 3.77972 16.7679C3.7708 17.0849 3.75926 17.495 3.79029 17.8539C3.83569 18.3787 3.97933 19.0347 4.48139 19.5326C4.97961 20.0266 5.63287 20.1667 6.15443 20.2107C6.50997 20.2408 6.91703 20.2292 7.23179 20.2203C7.35581 20.2168 7.4655 20.2137 7.55206 20.2137C7.99328 20.2137 8.24126 20.2581 8.43645 20.3386C8.63147 20.4191 8.84006 20.5632 9.15424 20.8774C9.22129 20.9444 9.30963 21.0391 9.41153 21.1483L9.41176 21.1486L9.41179 21.1486L9.4118 21.1486C9.64176 21.3951 9.94071 21.7155 10.22 21.9596C10.6437 22.33 11.2516 22.75 12 22.75C12.7485 22.75 13.3563 22.33 13.7801 21.9596C14.0593 21.7155 14.3583 21.3951 14.5882 21.1486C14.6902 21.0392 14.7787 20.9445 14.8458 20.8773C15.1599 20.5632 15.3685 20.4191 15.5635 20.3386C15.7587 20.2581 16.0067 20.2137 16.4479 20.2137C16.5345 20.2137 16.6442 20.2168 16.7682 20.2203C17.083 20.2292 17.49 20.2408 17.8456 20.2107C18.3671 20.1667 19.0204 20.0266 19.5186 19.5326C20.0207 19.0347 20.1643 18.3787 20.2097 17.8539C20.2407 17.495 20.2292 17.0849 20.2203 16.7679L20.2203 16.7676C20.2168 16.644 20.2137 16.5346 20.2137 16.4479C20.2137 15.9971 20.2638 15.7453 20.3507 15.5464C20.4399 15.3422 20.5973 15.1258 20.9309 14.7922L20.9661 14.7571C21.4691 14.2541 21.8991 13.8242 22.1964 13.4344C22.5139 13.0183 22.75 12.5611 22.75 12C22.75 11.4388 22.5139 10.9816 22.1964 10.5655C21.8991 10.1759 21.4693 9.74607 20.9664 9.24322L20.931 9.20784C20.5973 8.87416 20.4399 8.65779 20.3507 8.45354C20.2638 8.25468 20.2137 8.00288 20.2137 7.55206C20.2137 7.46534 20.2168 7.35593 20.2203 7.23236L20.2203 7.2321C20.2292 6.91507 20.2407 6.50496 20.2097 6.14615C20.1643 5.62129 20.0207 4.96533 19.5187 4.46747C19.0205 3.97339 18.3672 3.83325 17.8456 3.78921C17.49 3.75919 17.083 3.77072 16.7682 3.77964C16.6442 3.78315 16.5345 3.78626 16.4479 3.78626C15.7553 3.78626 15.3067 3.58361 14.7922 3.06904L14.7568 3.03368C14.2539 2.53075 13.8241 2.10089 13.4344 1.80358C13.0184 1.48611 12.5612 1.25 12 1.25ZM15.7657 10.1432C16.1209 9.72033 16.0661 9.08954 15.6432 8.73432C15.2203 8.37909 14.5895 8.43394 14.2343 8.85683L10.6972 13.0676L9.66603 12.1469C9.25406 11.7791 8.6219 11.8149 8.25407 12.2269C7.88624 12.6388 7.92202 13.271 8.33399 13.6388L10.134 15.246C10.3357 15.4261 10.6018 15.5168 10.8716 15.4975C11.1413 15.4781 11.3918 15.3503 11.5657 15.1432L15.7657 10.1432Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path></svg
                  ><span class="type-body font-matter font-normal leading-[1.6] text-tx-secondary"
                    >Swap vendors without rewriting workflows</span
                  ></li
                ><li class="flex items-start gap-3"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="text-sr-indigo-600 mt-0.5 shrink-0"
                  >
                    <path
                      d="M12 1.25C11.4388 1.25 10.9816 1.48611 10.5656 1.80358C10.1759 2.10089 9.74606 2.53075 9.24319 3.03367L9.20782 3.06904C8.69316 3.5837 8.24449 3.78626 7.55208 3.78626C7.4653 3.78626 7.35579 3.78318 7.23212 3.7797C6.91509 3.77078 6.50497 3.75924 6.14615 3.79027C5.62128 3.83566 4.96532 3.97929 4.46745 4.48134C3.9734 4.97955 3.83327 5.63282 3.78923 6.15439C3.75922 6.50995 3.77075 6.91701 3.77966 7.23178L3.77966 7.23181C3.78317 7.35581 3.78628 7.46549 3.78628 7.55206C3.78628 8.24448 3.58371 8.69315 3.06902 9.20784L3.03367 9.24319C2.53075 9.74606 2.10089 10.1759 1.80358 10.5655C1.48612 10.9816 1.25001 11.4388 1.25 12C1.25001 12.5611 1.48613 13.0183 1.80358 13.4344C2.10095 13.8242 2.53091 14.2541 3.03395 14.7571L3.06906 14.7922C3.40272 15.1258 3.56011 15.3422 3.64932 15.5464C3.73619 15.7453 3.78628 15.9971 3.78628 16.4479C3.78628 16.5347 3.7832 16.6442 3.77972 16.7679C3.7708 17.0849 3.75926 17.495 3.79029 17.8539C3.83569 18.3787 3.97933 19.0347 4.48139 19.5326C4.97961 20.0266 5.63287 20.1667 6.15443 20.2107C6.50997 20.2408 6.91703 20.2292 7.23179 20.2203C7.35581 20.2168 7.4655 20.2137 7.55206 20.2137C7.99328 20.2137 8.24126 20.2581 8.43645 20.3386C8.63147 20.4191 8.84006 20.5632 9.15424 20.8774C9.22129 20.9444 9.30963 21.0391 9.41153 21.1483L9.41176 21.1486L9.41179 21.1486L9.4118 21.1486C9.64176 21.3951 9.94071 21.7155 10.22 21.9596C10.6437 22.33 11.2516 22.75 12 22.75C12.7485 22.75 13.3563 22.33 13.7801 21.9596C14.0593 21.7155 14.3583 21.3951 14.5882 21.1486C14.6902 21.0392 14.7787 20.9445 14.8458 20.8773C15.1599 20.5632 15.3685 20.4191 15.5635 20.3386C15.7587 20.2581 16.0067 20.2137 16.4479 20.2137C16.5345 20.2137 16.6442 20.2168 16.7682 20.2203C17.083 20.2292 17.49 20.2408 17.8456 20.2107C18.3671 20.1667 19.0204 20.0266 19.5186 19.5326C20.0207 19.0347 20.1643 18.3787 20.2097 17.8539C20.2407 17.495 20.2292 17.0849 20.2203 16.7679L20.2203 16.7676C20.2168 16.644 20.2137 16.5346 20.2137 16.4479C20.2137 15.9971 20.2638 15.7453 20.3507 15.5464C20.4399 15.3422 20.5973 15.1258 20.9309 14.7922L20.9661 14.7571C21.4691 14.2541 21.8991 13.8242 22.1964 13.4344C22.5139 13.0183 22.75 12.5611 22.75 12C22.75 11.4388 22.5139 10.9816 22.1964 10.5655C21.8991 10.1759 21.4693 9.74607 20.9664 9.24322L20.931 9.20784C20.5973 8.87416 20.4399 8.65779 20.3507 8.45354C20.2638 8.25468 20.2137 8.00288 20.2137 7.55206C20.2137 7.46534 20.2168 7.35593 20.2203 7.23236L20.2203 7.2321C20.2292 6.91507 20.2407 6.50496 20.2097 6.14615C20.1643 5.62129 20.0207 4.96533 19.5187 4.46747C19.0205 3.97339 18.3672 3.83325 17.8456 3.78921C17.49 3.75919 17.083 3.77072 16.7682 3.77964C16.6442 3.78315 16.5345 3.78626 16.4479 3.78626C15.7553 3.78626 15.3067 3.58361 14.7922 3.06904L14.7568 3.03368C14.2539 2.53075 13.8241 2.10089 13.4344 1.80358C13.0184 1.48611 12.5612 1.25 12 1.25ZM15.7657 10.1432C16.1209 9.72033 16.0661 9.08954 15.6432 8.73432C15.2203 8.37909 14.5895 8.43394 14.2343 8.85683L10.6972 13.0676L9.66603 12.1469C9.25406 11.7791 8.6219 11.8149 8.25407 12.2269C7.88624 12.6388 7.92202 13.271 8.33399 13.6388L10.134 15.246C10.3357 15.4261 10.6018 15.5168 10.8716 15.4975C11.1413 15.4781 11.3918 15.3503 11.5657 15.1432L15.7657 10.1432Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path></svg
                  ><span class="type-body font-matter font-normal leading-[1.6] text-tx-secondary"
                    >Air-gapped deployment available</span
                  ></li
                ></ul
              ></div
            ></div
          ><div class="rounded-lg md:rounded-xl border border-st-secondary bg-white p-8 md:p-10"
            ><div class="flex flex-col md:flex-row gap-8"
              ><div class="flex flex-col gap-1.5 md:gap-2.5 justify-between md:flex-1 h-auto"
                ><h3
                  class="type-body-lg md:type-heading-5 font-matter font-medium leading-[1.3] tracking-[-0.015em] text-tx text-balance"
                  >Security and governance</h3
                ><p class="type-body font-matter font-normal leading-[1.6] text-tx-tertiary max-w-lg text-pretty"
                  >Every agent action is logged and traceable. Role-based access, audit trails, and data residency
                  controls built into the core, not retrofitted. Work Agents meet you where your risk team is.</p
                ></div
              ><div class="flex flex-wrap gap-2 md:hidden"
                ><span
                  class="inline-flex h-fit w-fit items-center gap-2 font-matter font-semibold text-sm text-sr-indigo-600 bg-sr-indigo-50 border border-sr-indigo-200/75 px-3.5 py-2 rounded-xl shadow-[inset_0px_-0.5px_1px_0px_var(--color-sr-indigo-200)] cursor-default hover:animate-wiggle"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="shrink-0"
                  >
                    <path
                      d="M11.5566 1.25C13.5045 1.24998 15.056 1.24996 16.2718 1.44227C17.5369 1.64238 18.5409 2.06461 19.3179 2.97873C20.0799 3.87527 20.4179 5.00361 20.5808 6.42849C20.7109 7.56695 20.7355 8.96746 20.7401 10.6906C19.8483 10.0964 18.7771 9.75 17.625 9.75H17.375C14.2684 9.75 11.75 12.2684 11.75 15.375C11.75 16.6204 12.1562 17.7722 12.8402 18.7032L12.6469 19.3115C12.5496 19.6179 12.4498 19.9319 12.382 20.197C12.3216 20.4329 12.1962 20.943 12.2765 21.5191C12.3377 21.9576 12.4905 22.3763 12.7183 22.7483C12.3506 22.75 11.9665 22.75 11.5656 22.75H11.4346C9.48668 22.75 7.93526 22.75 6.71943 22.5577C5.45432 22.3576 4.45035 21.9354 3.67334 21.0213C2.91129 20.1247 2.57328 18.9964 2.41045 17.5715C2.24999 16.1674 2.24999 14.3646 2.25 12.0495V12.0495V11.9505C2.24999 9.63539 2.24999 7.83262 2.41045 6.42849C2.57328 5.00361 2.91129 3.87527 3.67334 2.97873C4.44994 2.06508 5.45123 1.64255 6.71481 1.4423C7.92855 1.24996 9.47789 1.24998 11.4256 1.25H11.4256H11.5566H11.5566ZM8 7.25C7.58579 7.25 7.25 7.58579 7.25 8C7.25 8.41421 7.58579 8.75 8 8.75H15C15.4142 8.75 15.75 8.41421 15.75 8C15.75 7.58579 15.4142 7.25 15 7.25H8ZM8 12.25C7.58579 12.25 7.25 12.5858 7.25 13C7.25 13.4142 7.58579 13.75 8 13.75H10.209C10.6232 13.75 10.959 13.4142 10.959 13C10.959 12.5858 10.6232 12.25 10.209 12.25H8Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                    <path
                      d="M17.375 11.25C15.0968 11.25 13.25 13.0968 13.25 15.375C13.25 16.5477 13.7399 17.606 14.5242 18.3563L14.0863 19.7349C13.981 20.0665 13.8922 20.3459 13.8351 20.569C13.7808 20.7811 13.7251 21.0465 13.7621 21.3118C13.8731 22.1077 14.5353 22.7469 15.372 22.75C15.6508 22.751 15.9096 22.6473 16.1015 22.5611C16.306 22.4692 16.5587 22.3366 16.855 22.1811C17.1509 22.0258 17.2334 21.9861 17.2866 21.9701C17.4263 21.928 17.5737 21.928 17.7134 21.9701C17.7666 21.9861 17.849 22.0258 18.1449 22.1811C18.4412 22.3366 18.694 22.4692 18.8985 22.5611C19.0904 22.6473 19.3492 22.751 19.628 22.75C20.4647 22.7469 21.1269 22.1077 21.2379 21.3118C21.2749 21.0465 21.2192 20.7811 21.1649 20.569C21.1078 20.3459 21.019 20.0665 20.9137 19.7349L20.4758 18.3563C21.2601 17.606 21.75 16.5477 21.75 15.375C21.75 13.0968 19.9032 11.25 17.625 11.25H17.375ZM15.5231 20.167L15.8301 19.2002C16.3077 19.3932 16.8295 19.4996 17.3753 19.4996H17.6253C18.1711 19.4996 18.6929 19.3932 19.1705 19.2002L19.4775 20.167C19.5915 20.5259 19.6668 20.7641 19.712 20.9406C19.8192 21.3051 19.6243 21.2603 19.5134 21.1924C19.356 21.1216 19.0981 20.9867 18.7748 20.817C18.5511 20.6994 18.3552 20.5964 18.1468 20.5336C17.7246 20.4062 17.276 20.4062 16.8538 20.5336C16.6454 20.5964 16.4495 20.6994 16.2258 20.817C15.9025 20.9867 15.6446 21.1216 15.4872 21.1924C15.2109 21.3285 15.2397 21.0813 15.2886 20.9406C15.3338 20.7641 15.4091 20.5259 15.5231 20.167Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path></svg
                  >SOC 2 Type II</span
                ><span
                  class="inline-flex h-fit w-fit items-center gap-2 font-matter font-semibold text-sm text-sr-green-600 bg-sr-green-50/75 border border-sr-green-200/75 px-3.5 py-2 rounded-xl shadow-[inset_0px_-0.5px_1px_0px_var(--color-sr-green-200)] cursor-default hover:animate-wiggle"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="shrink-0"
                  >
                    <path
                      d="M12 1.25C11.6078 1.25 11.2201 1.37021 10.8559 1.50793C10.4857 1.64786 10.0263 1.85229 9.46536 2.10188C8.64145 2.46848 7.53729 2.89491 6.37208 3.22691C5.52116 3.46934 4.81671 3.67004 4.27941 3.87888C3.73868 4.08904 3.20601 4.36452 2.84102 4.84886C2.48959 5.3152 2.36196 5.85147 2.30468 6.39346C2.24995 6.91131 2.24997 7.55591 2.25 8.3133L2.25 11.2019C2.25 14.2676 3.63195 16.6922 5.28517 18.4873C6.93169 20.2751 8.96116 21.5258 10.2464 22.2057C10.781 22.4893 11.2726 22.75 12 22.75C12.7274 22.75 13.219 22.4893 13.7536 22.2057C15.0388 21.5258 17.0683 20.2751 18.7148 18.4873C20.3681 16.6922 21.75 14.2676 21.75 11.2019V8.31333C21.75 7.55593 21.7501 6.91132 21.6953 6.39346C21.638 5.85147 21.5104 5.3152 21.159 4.84886C20.794 4.36452 20.2613 4.08904 19.7206 3.87888C19.1833 3.67004 18.4788 3.46934 17.6279 3.2269C16.4627 2.89491 15.3585 2.46846 14.5346 2.10187C13.9737 1.85229 13.5143 1.64786 13.1441 1.50793C12.7799 1.37021 12.3922 1.25 12 1.25ZM10.2288 3.90068C10.8242 3.63577 11.2324 3.45455 11.544 3.33674C11.8676 3.21441 11.9788 3.20459 12 3.20459C12.0211 3.20459 12.1323 3.21441 12.4559 3.33674C12.7675 3.45455 13.1757 3.63577 13.7711 3.90068C14.6619 4.29703 15.7784 4.73197 17.0478 5.09365L17.4088 5.19671L6.1445 16.4909C5.00589 15.051 4.19995 13.2966 4.19995 11.2019V8.36487C4.19995 7.54186 4.20124 7.0019 4.24378 6.59939C4.285 6.2093 4.35438 6.08348 4.39696 6.02697C4.42597 5.98848 4.53573 5.87562 4.98436 5.70125C5.42658 5.52938 6.04241 5.35286 6.95214 5.09365C8.22153 4.73197 9.33803 4.29703 10.2288 3.90068Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path></svg
                  >ISO 27001</span
                ><span
                  class="inline-flex h-fit w-fit items-center gap-2 font-matter font-semibold text-sm text-sr-orange-600 bg-sr-orange-50 border border-sr-orange-200/75 px-3.5 py-2 rounded-xl shadow-[inset_0px_-0.5px_1px_0px_var(--color-sr-orange-200)] cursor-default hover:animate-wiggle"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="shrink-0"
                  >
                    <path
                      d="M2.25 5C2.25 4.19711 2.68749 3.55194 3.21527 3.08401C3.74422 2.61504 4.45256 2.2384 5.24202 1.94235C6.82833 1.34749 8.95269 1 11.25 1C13.5473 1 15.6717 1.34749 17.258 1.94235C18.0474 2.2384 18.7558 2.61504 19.2847 3.08401C19.8125 3.55194 20.25 4.19711 20.25 5V9.98763C20.25 10.4811 20.2082 10.8617 20.0535 11.1879C19.9881 11.3259 19.9554 11.3948 19.8715 11.4208C19.7876 11.4468 19.7042 11.3982 19.5372 11.3011C18.9319 10.9487 18.2309 10.75 17.5 10.75C15.7401 10.75 14.1536 11.9019 13.6588 13.5776C13.6177 13.7166 13.5972 13.7861 13.5509 13.8249C13.5045 13.8637 13.4387 13.871 13.3071 13.8855C12.6174 13.9615 11.9254 14 11.25 14C8.8613 14 6.26354 13.5188 4.3008 12.5952C3.89779 12.4055 3.53325 12.2037 3.20806 11.9907C2.40337 11.4637 2.25 10.9324 2.25 9.98763V5ZM5.82313 6.13845C5.22883 5.9045 4.80524 5.65279 4.54209 5.41948C4.1854 5.10324 4.1854 4.89676 4.54209 4.58052C4.82279 4.33166 5.28602 4.06185 5.94427 3.81501C7.2534 3.32409 9.12903 3 11.25 3C13.371 3 15.2466 3.32409 16.5557 3.81501C17.214 4.06185 17.6772 4.33166 17.9579 4.58052C18.3146 4.89676 18.3146 5.10324 17.9579 5.41948C17.6772 5.66834 17.214 5.93815 16.5557 6.18499C15.2466 6.67591 13.371 7 11.25 7C10.3529 7 9.49969 6.94202 8.71467 6.83796C7.73782 6.70847 6.77272 6.51225 5.82313 6.13845ZM6.46587 10.1237C6.06919 10.0045 5.65095 10.2294 5.5317 10.6261C5.41246 11.0228 5.63736 11.441 6.03404 11.5602C6.67365 11.7525 7.38136 11.9087 8.1374 12.0234C8.54692 12.0856 8.9293 11.804 8.99146 11.3945C9.05362 10.9849 8.77203 10.6026 8.36251 10.5404C7.66722 10.4349 7.02942 10.2932 6.46587 10.1237Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                    <path
                      d="M12.0575 16.6632C12.192 16.3302 12.2592 16.1636 12.1982 16.075C12.1372 15.9865 11.9691 15.9897 11.6329 15.9961C11.5046 15.9986 11.377 15.9998 11.25 15.9998C8.596 15.9998 5.85931 15.5388 3.4492 14.4046C3.25604 14.3137 3.06512 14.2177 2.87747 14.1164C2.5892 13.9608 2.44506 13.883 2.34753 13.9412C2.25 13.9993 2.25 14.1584 2.25 14.4765V18.9998C2.25 19.8027 2.68749 20.4479 3.21527 20.9158C3.74422 21.3848 4.45256 21.7614 5.24202 22.0575C6.82833 22.6523 8.95269 22.9998 11.25 22.9998C11.505 22.9998 11.7579 22.9955 12.0081 22.9871C12.35 22.9756 12.5209 22.9698 12.5756 22.8697C12.6303 22.7695 12.534 22.6077 12.3412 22.284C12.2217 22.0832 12.119 21.8723 12.0346 21.6539C11.8502 21.1769 11.7946 20.7239 11.7712 20.3564C11.7221 19.5855 11.7221 18.7897 11.7712 18.0186C11.7946 17.6511 11.8502 17.1981 12.0346 16.7211C12.0421 16.7018 12.0497 16.6825 12.0575 16.6632ZM6.46587 17.1237C6.06919 17.0045 5.65095 17.2294 5.5317 17.6261C5.41246 18.0228 5.63736 18.441 6.03404 18.5602C6.67365 18.7525 7.38136 18.9087 8.1374 19.0234C8.54692 19.0856 8.9293 18.804 8.99146 18.3945C9.05362 17.9849 8.77203 17.6026 8.36251 17.5404C7.66722 17.4349 7.02942 17.2932 6.46587 17.1237Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                    <path
                      d="M20 15.7492V14.6875C20 13.3158 18.8548 12.25 17.5 12.25C16.1452 12.25 15 13.3158 15 14.6875V15.7492C14.9249 15.772 14.8502 15.7993 14.7761 15.8322C14.1559 16.1074 13.6789 16.6277 13.4337 17.262C13.3278 17.536 13.2871 17.8173 13.2682 18.1139C13.25 18.3994 13.25 18.7471 13.25 19.1639V19.2111C13.25 19.6278 13.25 19.9756 13.2682 20.2611C13.2871 20.5577 13.3278 20.839 13.4337 21.113C13.6789 21.7474 14.1559 22.2676 14.7761 22.5428C15.0484 22.6637 15.3272 22.7093 15.6128 22.7302C15.8844 22.75 16.2134 22.75 16.5989 22.75H18.4011C18.7866 22.75 19.1156 22.75 19.3872 22.7302C19.6728 22.7093 19.9516 22.6637 20.2239 22.5428C20.8441 22.2676 21.3211 21.7474 21.5663 21.113C21.6722 20.839 21.7129 20.5577 21.7318 20.2611C21.75 19.9756 21.75 19.6279 21.75 19.2111V19.1639C21.75 18.7472 21.75 18.3994 21.7318 18.1139C21.7129 17.8173 21.6722 17.536 21.5663 17.262C21.3211 16.6277 20.8441 16.1074 20.2239 15.8322C20.1498 15.7993 20.0751 15.772 20 15.7492ZM16.5 14.6875C16.5 14.1952 16.9218 13.75 17.5 13.75C18.0782 13.75 18.5 14.1952 18.5 14.6875V15.625H16.5V14.6875Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path></svg
                  >DPDP compliant</span
                ><span
                  class="inline-flex h-fit w-fit items-center gap-2 font-matter font-semibold text-sm text-sr-pink-400 bg-sr-pink-50/50 border border-sr-pink-100 px-3.5 py-2 rounded-xl shadow-[inset_0px_-0.5px_1px_0px_var(--color-sr-pink-100)] cursor-default hover:animate-wiggle"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="shrink-0"
                  >
                    <path
                      d="M8 7.75C8.89848 7.74997 9.6997 7.74995 10.2945 7.82991C10.9223 7.91432 11.4891 8.09999 11.9445 8.55546C12.4 9.01093 12.5857 9.57773 12.6701 10.2055C12.7501 10.8003 12.75 11.5495 12.75 12.448V12.448L12.75 13C12.75 13.4142 12.4142 13.75 12 13.75H4C3.58579 13.75 3.25 13.4142 3.25 13L3.25 12.448V12.448C3.24997 11.5495 3.24995 10.8003 3.32991 10.2055C3.41432 9.57773 3.59999 9.01093 4.05546 8.55546C4.51093 8.09999 5.07773 7.91432 5.70552 7.82991C6.3003 7.74995 7.10152 7.74997 8 7.75Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M14.25 13C14.25 11.4812 15.4812 10.25 17 10.25C18.5188 10.25 19.75 11.4812 19.75 13C19.75 14.5188 18.5188 15.75 17 15.75C15.4812 15.75 14.25 14.5188 14.25 13Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M5.25 4C5.25 2.48122 6.48122 1.25 8 1.25C9.51878 1.25 10.75 2.48122 10.75 4C10.75 5.51878 9.51878 6.75 8 6.75C6.48122 6.75 5.25 5.51878 5.25 4Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M1.43448 15.6393C1.61815 15.3949 1.91314 15.25 2.22728 15.25H10.0455C10.4661 15.25 10.8396 15.5082 10.9726 15.891L12.7044 20.875H15.5227C16.0625 20.875 16.5 21.2947 16.5 21.8125C16.5 22.3303 16.0625 22.75 15.5227 22.75H3.47745L1.30016 16.484C1.20082 16.1981 1.2508 15.8838 1.43448 15.6393Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M12.9773 17.5938C12.9773 17.076 13.4148 16.6562 13.9545 16.6562H19.8182C21.4374 16.6562 22.75 17.9154 22.75 19.4688V19.9375C22.75 21.4908 21.4374 22.75 19.8182 22.75H18.9773C18.4375 22.75 18 22.3303 18 21.8125C18 21.2947 18.4375 20.875 18.9773 20.875H19.8182C20.3579 20.875 20.7955 20.4553 20.7955 19.9375V19.4688C20.7955 18.951 20.3579 18.5312 19.8182 18.5312H13.9545C13.4148 18.5312 12.9773 18.1115 12.9773 17.5938Z"
                      fill="currentColor"
                    ></path></svg
                  >Role-based access</span
                ><span
                  class="inline-flex h-fit w-fit items-center gap-2 font-matter font-semibold text-sm text-sr-yellow-700/90 bg-sr-yellow-50/50 border border-sr-yellow-200 px-3.5 py-2 rounded-xl shadow-[inset_0px_-0.5px_1px_0px_var(--color-sr-yellow-300)] cursor-default hover:animate-wiggle"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="shrink-0"
                  >
                    <path
                      d="M18.5238 18.427C18.5758 17.8186 18.7054 17.338 18.8417 16.8956C18.8649 16.8205 18.8893 16.7437 18.9144 16.6652C19.0714 16.1726 19.25 15.6121 19.25 15C19.25 13.4812 18.0188 12.25 16.5 12.25C14.9812 12.25 13.75 13.4812 13.75 15C13.75 15.6121 13.9286 16.1726 14.0856 16.6652C14.1106 16.7437 14.1351 16.8206 14.1583 16.8956C14.2946 17.338 14.4242 17.8186 14.4762 18.427L12.4258 19.0779C11.6873 19.3124 11.25 20.0258 11.25 20.7543V22C11.25 22.4142 11.5858 22.75 12 22.75H21C21.4142 22.75 21.75 22.4142 21.75 22V20.7543C21.75 20.0258 21.3127 19.3124 20.5742 19.0779L18.5238 18.427ZM15.25 15C15.25 14.3096 15.8096 13.75 16.5 13.75C17.1904 13.75 17.75 14.3096 17.75 15C17.75 15.3625 17.6508 15.6787 17.4922 16.1846C17.4658 16.2687 17.4378 16.3581 17.4083 16.4538C17.2578 16.9422 17.1008 17.5184 17.0337 18.25H15.9663C15.8992 17.5184 15.7422 16.9422 15.5917 16.4538C15.5623 16.3582 15.5343 16.2689 15.5079 16.1848C15.3492 15.6789 15.25 15.3625 15.25 15Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                    <path
                      d="M11.0564 1.25C12.8942 1.24999 14.3498 1.24997 15.489 1.40314C16.6614 1.56076 17.6104 1.89288 18.3588 2.64124C19.1071 3.38961 19.4392 4.33856 19.5969 5.51098C19.75 6.65018 19.75 8.10585 19.75 9.94359V12.2612C18.9704 11.3371 17.8038 10.75 16.5 10.75C14.1528 10.75 12.25 12.6528 12.25 15C12.25 15.8485 12.5 17 12.7405 17.4043L11.9719 17.6482C10.5232 18.1082 9.75 19.4687 9.75 20.7543V22C9.75 22.2624 9.79491 22.5142 9.87745 22.7483C8.54537 22.7425 7.39805 22.7161 6.51098 22.5969C5.33856 22.4392 4.38961 22.1071 3.64124 21.3588C2.89288 20.6104 2.56076 19.6614 2.40314 18.489C2.24997 17.3498 2.24999 15.8942 2.25 14.0564V14.0564V9.94357V9.94356C2.24999 8.10581 2.24997 6.65019 2.40314 5.51098C2.56076 4.33856 2.89288 3.38961 3.64124 2.64124C4.38961 1.89288 5.33856 1.56076 6.51098 1.40314C7.65019 1.24997 9.21867 1.24999 11.0564 1.25H11.0564ZM7 6.25C6.58579 6.25 6.25 6.58579 6.25 7C6.25 7.41421 6.58579 7.75 7 7.75H15C15.4142 7.75 15.75 7.41421 15.75 7C15.75 6.58579 15.4142 6.25 15 6.25H7ZM7 10.25C6.58579 10.25 6.25 10.5858 6.25 11C6.25 11.4142 6.58579 11.75 7 11.75H11C11.4142 11.75 11.75 11.4142 11.75 11C11.75 10.5858 11.4142 10.25 11 10.25H7Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path></svg
                  >Full audit trail</span
                ><span
                  class="inline-flex h-fit w-fit items-center gap-2 font-matter font-semibold text-sm text-sr-red-300 bg-sr-red-50/50 border border-sr-red-100 px-3.5 py-2 rounded-xl shadow-[inset_0px_-0.5px_1px_0px_var(--color-sr-red-100)] cursor-default hover:animate-wiggle"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    class="shrink-0"
                  >
                    <path
                      d="M21.751 12.75C21.7489 14.4982 21.732 15.9084 21.5801 17.0381C21.4041 18.3464 21.0354 19.3904 20.2139 20.2119C19.3924 21.0334 18.3484 21.4022 17.04 21.5781C15.7616 21.75 14.1241 21.75 12.0439 21.75H11.96C9.87981 21.75 8.24228 21.75 6.96387 21.5781C5.65551 21.4022 4.61153 21.0334 3.79004 20.2119C2.96855 19.3904 2.59979 18.3464 2.42383 17.0381C2.27194 15.9084 2.25498 14.4982 2.25293 12.75H21.751ZM6.99902 16.25C6.44674 16.25 5.99902 16.6977 5.99902 17.25C5.99902 17.8023 6.44674 18.25 6.99902 18.25C7.5513 18.25 7.99902 17.8023 7.99902 17.25C7.99902 16.6977 7.55131 16.25 6.99902 16.25ZM10.999 16.25C10.4467 16.25 9.99902 16.6977 9.99902 17.25C9.99902 17.8023 10.4467 18.25 10.999 18.25H16.999C17.5513 18.25 17.999 17.8023 17.999 17.25C17.999 16.6977 17.5513 16.25 16.999 16.25H10.999Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M12.0439 2.25C14.1241 2.24999 15.7616 2.25 17.04 2.42188C18.3484 2.59783 19.3924 2.9666 20.2139 3.78809C21.0354 4.60957 21.4041 5.65356 21.5801 6.96191C21.732 8.09163 21.7489 9.50179 21.751 11.25H2.25293C2.25498 9.50179 2.27194 8.09163 2.42383 6.96191C2.59979 5.65356 2.96855 4.60957 3.79004 3.78809C4.61153 2.9666 5.65551 2.59783 6.96387 2.42188C8.24228 2.25 9.87981 2.24999 11.96 2.25H12.0439ZM6.99902 5.75C6.44674 5.75 5.99902 6.19772 5.99902 6.75C5.99902 7.30228 6.44674 7.75 6.99902 7.75C7.5513 7.75 7.99902 7.30229 7.99902 6.75C7.99902 6.19772 7.55131 5.75 6.99902 5.75ZM10.999 5.75C10.4467 5.75 9.99902 6.19772 9.99902 6.75C9.99902 7.30228 10.4467 7.75 10.999 7.75H16.999C17.5513 7.75 17.999 7.30228 17.999 6.75C17.999 6.19772 17.5513 5.75 16.999 5.75H10.999Z"
                      fill="currentColor"
                    ></path></svg
                  >Data residency controls</span
                ></div
              ><div class="hidden md:flex flex-col gap-2 md:flex-1"
                ><div class="flex flex-row gap-2 md:justify-end"
                  ><span
                    class="inline-flex h-fit w-fit items-center gap-2 font-matter font-semibold text-sm text-sr-indigo-600 bg-sr-indigo-50 border border-sr-indigo-200/75 px-3.5 py-2 rounded-xl shadow-[inset_0px_-0.5px_1px_0px_var(--color-sr-indigo-200)] cursor-default hover:animate-wiggle"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="currentColor"
                      class="shrink-0"
                    >
                      <path
                        d="M11.5566 1.25C13.5045 1.24998 15.056 1.24996 16.2718 1.44227C17.5369 1.64238 18.5409 2.06461 19.3179 2.97873C20.0799 3.87527 20.4179 5.00361 20.5808 6.42849C20.7109 7.56695 20.7355 8.96746 20.7401 10.6906C19.8483 10.0964 18.7771 9.75 17.625 9.75H17.375C14.2684 9.75 11.75 12.2684 11.75 15.375C11.75 16.6204 12.1562 17.7722 12.8402 18.7032L12.6469 19.3115C12.5496 19.6179 12.4498 19.9319 12.382 20.197C12.3216 20.4329 12.1962 20.943 12.2765 21.5191C12.3377 21.9576 12.4905 22.3763 12.7183 22.7483C12.3506 22.75 11.9665 22.75 11.5656 22.75H11.4346C9.48668 22.75 7.93526 22.75 6.71943 22.5577C5.45432 22.3576 4.45035 21.9354 3.67334 21.0213C2.91129 20.1247 2.57328 18.9964 2.41045 17.5715C2.24999 16.1674 2.24999 14.3646 2.25 12.0495V12.0495V11.9505C2.24999 9.63539 2.24999 7.83262 2.41045 6.42849C2.57328 5.00361 2.91129 3.87527 3.67334 2.97873C4.44994 2.06508 5.45123 1.64255 6.71481 1.4423C7.92855 1.24996 9.47789 1.24998 11.4256 1.25H11.4256H11.5566H11.5566ZM8 7.25C7.58579 7.25 7.25 7.58579 7.25 8C7.25 8.41421 7.58579 8.75 8 8.75H15C15.4142 8.75 15.75 8.41421 15.75 8C15.75 7.58579 15.4142 7.25 15 7.25H8ZM8 12.25C7.58579 12.25 7.25 12.5858 7.25 13C7.25 13.4142 7.58579 13.75 8 13.75H10.209C10.6232 13.75 10.959 13.4142 10.959 13C10.959 12.5858 10.6232 12.25 10.209 12.25H8Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                      <path
                        d="M17.375 11.25C15.0968 11.25 13.25 13.0968 13.25 15.375C13.25 16.5477 13.7399 17.606 14.5242 18.3563L14.0863 19.7349C13.981 20.0665 13.8922 20.3459 13.8351 20.569C13.7808 20.7811 13.7251 21.0465 13.7621 21.3118C13.8731 22.1077 14.5353 22.7469 15.372 22.75C15.6508 22.751 15.9096 22.6473 16.1015 22.5611C16.306 22.4692 16.5587 22.3366 16.855 22.1811C17.1509 22.0258 17.2334 21.9861 17.2866 21.9701C17.4263 21.928 17.5737 21.928 17.7134 21.9701C17.7666 21.9861 17.849 22.0258 18.1449 22.1811C18.4412 22.3366 18.694 22.4692 18.8985 22.5611C19.0904 22.6473 19.3492 22.751 19.628 22.75C20.4647 22.7469 21.1269 22.1077 21.2379 21.3118C21.2749 21.0465 21.2192 20.7811 21.1649 20.569C21.1078 20.3459 21.019 20.0665 20.9137 19.7349L20.4758 18.3563C21.2601 17.606 21.75 16.5477 21.75 15.375C21.75 13.0968 19.9032 11.25 17.625 11.25H17.375ZM15.5231 20.167L15.8301 19.2002C16.3077 19.3932 16.8295 19.4996 17.3753 19.4996H17.6253C18.1711 19.4996 18.6929 19.3932 19.1705 19.2002L19.4775 20.167C19.5915 20.5259 19.6668 20.7641 19.712 20.9406C19.8192 21.3051 19.6243 21.2603 19.5134 21.1924C19.356 21.1216 19.0981 20.9867 18.7748 20.817C18.5511 20.6994 18.3552 20.5964 18.1468 20.5336C17.7246 20.4062 17.276 20.4062 16.8538 20.5336C16.6454 20.5964 16.4495 20.6994 16.2258 20.817C15.9025 20.9867 15.6446 21.1216 15.4872 21.1924C15.2109 21.3285 15.2397 21.0813 15.2886 20.9406C15.3338 20.7641 15.4091 20.5259 15.5231 20.167Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path></svg
                    >SOC 2 Type II</span
                  ><span
                    class="inline-flex h-fit w-fit items-center gap-2 font-matter font-semibold text-sm text-sr-green-600 bg-sr-green-50/75 border border-sr-green-200/75 px-3.5 py-2 rounded-xl shadow-[inset_0px_-0.5px_1px_0px_var(--color-sr-green-200)] cursor-default hover:animate-wiggle"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="currentColor"
                      class="shrink-0"
                    >
                      <path
                        d="M12 1.25C11.6078 1.25 11.2201 1.37021 10.8559 1.50793C10.4857 1.64786 10.0263 1.85229 9.46536 2.10188C8.64145 2.46848 7.53729 2.89491 6.37208 3.22691C5.52116 3.46934 4.81671 3.67004 4.27941 3.87888C3.73868 4.08904 3.20601 4.36452 2.84102 4.84886C2.48959 5.3152 2.36196 5.85147 2.30468 6.39346C2.24995 6.91131 2.24997 7.55591 2.25 8.3133L2.25 11.2019C2.25 14.2676 3.63195 16.6922 5.28517 18.4873C6.93169 20.2751 8.96116 21.5258 10.2464 22.2057C10.781 22.4893 11.2726 22.75 12 22.75C12.7274 22.75 13.219 22.4893 13.7536 22.2057C15.0388 21.5258 17.0683 20.2751 18.7148 18.4873C20.3681 16.6922 21.75 14.2676 21.75 11.2019V8.31333C21.75 7.55593 21.7501 6.91132 21.6953 6.39346C21.638 5.85147 21.5104 5.3152 21.159 4.84886C20.794 4.36452 20.2613 4.08904 19.7206 3.87888C19.1833 3.67004 18.4788 3.46934 17.6279 3.2269C16.4627 2.89491 15.3585 2.46846 14.5346 2.10187C13.9737 1.85229 13.5143 1.64786 13.1441 1.50793C12.7799 1.37021 12.3922 1.25 12 1.25ZM10.2288 3.90068C10.8242 3.63577 11.2324 3.45455 11.544 3.33674C11.8676 3.21441 11.9788 3.20459 12 3.20459C12.0211 3.20459 12.1323 3.21441 12.4559 3.33674C12.7675 3.45455 13.1757 3.63577 13.7711 3.90068C14.6619 4.29703 15.7784 4.73197 17.0478 5.09365L17.4088 5.19671L6.1445 16.4909C5.00589 15.051 4.19995 13.2966 4.19995 11.2019V8.36487C4.19995 7.54186 4.20124 7.0019 4.24378 6.59939C4.285 6.2093 4.35438 6.08348 4.39696 6.02697C4.42597 5.98848 4.53573 5.87562 4.98436 5.70125C5.42658 5.52938 6.04241 5.35286 6.95214 5.09365C8.22153 4.73197 9.33803 4.29703 10.2288 3.90068Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path></svg
                    >ISO 27001</span
                  ><span
                    class="inline-flex h-fit w-fit items-center gap-2 font-matter font-semibold text-sm text-sr-orange-600 bg-sr-orange-50 border border-sr-orange-200/75 px-3.5 py-2 rounded-xl shadow-[inset_0px_-0.5px_1px_0px_var(--color-sr-orange-200)] cursor-default hover:animate-wiggle"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="currentColor"
                      class="shrink-0"
                    >
                      <path
                        d="M2.25 5C2.25 4.19711 2.68749 3.55194 3.21527 3.08401C3.74422 2.61504 4.45256 2.2384 5.24202 1.94235C6.82833 1.34749 8.95269 1 11.25 1C13.5473 1 15.6717 1.34749 17.258 1.94235C18.0474 2.2384 18.7558 2.61504 19.2847 3.08401C19.8125 3.55194 20.25 4.19711 20.25 5V9.98763C20.25 10.4811 20.2082 10.8617 20.0535 11.1879C19.9881 11.3259 19.9554 11.3948 19.8715 11.4208C19.7876 11.4468 19.7042 11.3982 19.5372 11.3011C18.9319 10.9487 18.2309 10.75 17.5 10.75C15.7401 10.75 14.1536 11.9019 13.6588 13.5776C13.6177 13.7166 13.5972 13.7861 13.5509 13.8249C13.5045 13.8637 13.4387 13.871 13.3071 13.8855C12.6174 13.9615 11.9254 14 11.25 14C8.8613 14 6.26354 13.5188 4.3008 12.5952C3.89779 12.4055 3.53325 12.2037 3.20806 11.9907C2.40337 11.4637 2.25 10.9324 2.25 9.98763V5ZM5.82313 6.13845C5.22883 5.9045 4.80524 5.65279 4.54209 5.41948C4.1854 5.10324 4.1854 4.89676 4.54209 4.58052C4.82279 4.33166 5.28602 4.06185 5.94427 3.81501C7.2534 3.32409 9.12903 3 11.25 3C13.371 3 15.2466 3.32409 16.5557 3.81501C17.214 4.06185 17.6772 4.33166 17.9579 4.58052C18.3146 4.89676 18.3146 5.10324 17.9579 5.41948C17.6772 5.66834 17.214 5.93815 16.5557 6.18499C15.2466 6.67591 13.371 7 11.25 7C10.3529 7 9.49969 6.94202 8.71467 6.83796C7.73782 6.70847 6.77272 6.51225 5.82313 6.13845ZM6.46587 10.1237C6.06919 10.0045 5.65095 10.2294 5.5317 10.6261C5.41246 11.0228 5.63736 11.441 6.03404 11.5602C6.67365 11.7525 7.38136 11.9087 8.1374 12.0234C8.54692 12.0856 8.9293 11.804 8.99146 11.3945C9.05362 10.9849 8.77203 10.6026 8.36251 10.5404C7.66722 10.4349 7.02942 10.2932 6.46587 10.1237Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                      <path
                        d="M12.0575 16.6632C12.192 16.3302 12.2592 16.1636 12.1982 16.075C12.1372 15.9865 11.9691 15.9897 11.6329 15.9961C11.5046 15.9986 11.377 15.9998 11.25 15.9998C8.596 15.9998 5.85931 15.5388 3.4492 14.4046C3.25604 14.3137 3.06512 14.2177 2.87747 14.1164C2.5892 13.9608 2.44506 13.883 2.34753 13.9412C2.25 13.9993 2.25 14.1584 2.25 14.4765V18.9998C2.25 19.8027 2.68749 20.4479 3.21527 20.9158C3.74422 21.3848 4.45256 21.7614 5.24202 22.0575C6.82833 22.6523 8.95269 22.9998 11.25 22.9998C11.505 22.9998 11.7579 22.9955 12.0081 22.9871C12.35 22.9756 12.5209 22.9698 12.5756 22.8697C12.6303 22.7695 12.534 22.6077 12.3412 22.284C12.2217 22.0832 12.119 21.8723 12.0346 21.6539C11.8502 21.1769 11.7946 20.7239 11.7712 20.3564C11.7221 19.5855 11.7221 18.7897 11.7712 18.0186C11.7946 17.6511 11.8502 17.1981 12.0346 16.7211C12.0421 16.7018 12.0497 16.6825 12.0575 16.6632ZM6.46587 17.1237C6.06919 17.0045 5.65095 17.2294 5.5317 17.6261C5.41246 18.0228 5.63736 18.441 6.03404 18.5602C6.67365 18.7525 7.38136 18.9087 8.1374 19.0234C8.54692 19.0856 8.9293 18.804 8.99146 18.3945C9.05362 17.9849 8.77203 17.6026 8.36251 17.5404C7.66722 17.4349 7.02942 17.2932 6.46587 17.1237Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                      <path
                        d="M20 15.7492V14.6875C20 13.3158 18.8548 12.25 17.5 12.25C16.1452 12.25 15 13.3158 15 14.6875V15.7492C14.9249 15.772 14.8502 15.7993 14.7761 15.8322C14.1559 16.1074 13.6789 16.6277 13.4337 17.262C13.3278 17.536 13.2871 17.8173 13.2682 18.1139C13.25 18.3994 13.25 18.7471 13.25 19.1639V19.2111C13.25 19.6278 13.25 19.9756 13.2682 20.2611C13.2871 20.5577 13.3278 20.839 13.4337 21.113C13.6789 21.7474 14.1559 22.2676 14.7761 22.5428C15.0484 22.6637 15.3272 22.7093 15.6128 22.7302C15.8844 22.75 16.2134 22.75 16.5989 22.75H18.4011C18.7866 22.75 19.1156 22.75 19.3872 22.7302C19.6728 22.7093 19.9516 22.6637 20.2239 22.5428C20.8441 22.2676 21.3211 21.7474 21.5663 21.113C21.6722 20.839 21.7129 20.5577 21.7318 20.2611C21.75 19.9756 21.75 19.6279 21.75 19.2111V19.1639C21.75 18.7472 21.75 18.3994 21.7318 18.1139C21.7129 17.8173 21.6722 17.536 21.5663 17.262C21.3211 16.6277 20.8441 16.1074 20.2239 15.8322C20.1498 15.7993 20.0751 15.772 20 15.7492ZM16.5 14.6875C16.5 14.1952 16.9218 13.75 17.5 13.75C18.0782 13.75 18.5 14.1952 18.5 14.6875V15.625H16.5V14.6875Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path></svg
                    >DPDP compliant</span
                  ></div
                ><div class="flex flex-row gap-2 md:justify-end"
                  ><span
                    class="inline-flex h-fit w-fit items-center gap-2 font-matter font-semibold text-sm text-sr-pink-400 bg-sr-pink-50/50 border border-sr-pink-100 px-3.5 py-2 rounded-xl shadow-[inset_0px_-0.5px_1px_0px_var(--color-sr-pink-100)] cursor-default hover:animate-wiggle"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="currentColor"
                      class="shrink-0"
                    >
                      <path
                        d="M8 7.75C8.89848 7.74997 9.6997 7.74995 10.2945 7.82991C10.9223 7.91432 11.4891 8.09999 11.9445 8.55546C12.4 9.01093 12.5857 9.57773 12.6701 10.2055C12.7501 10.8003 12.75 11.5495 12.75 12.448V12.448L12.75 13C12.75 13.4142 12.4142 13.75 12 13.75H4C3.58579 13.75 3.25 13.4142 3.25 13L3.25 12.448V12.448C3.24997 11.5495 3.24995 10.8003 3.32991 10.2055C3.41432 9.57773 3.59999 9.01093 4.05546 8.55546C4.51093 8.09999 5.07773 7.91432 5.70552 7.82991C6.3003 7.74995 7.10152 7.74997 8 7.75Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M14.25 13C14.25 11.4812 15.4812 10.25 17 10.25C18.5188 10.25 19.75 11.4812 19.75 13C19.75 14.5188 18.5188 15.75 17 15.75C15.4812 15.75 14.25 14.5188 14.25 13Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M5.25 4C5.25 2.48122 6.48122 1.25 8 1.25C9.51878 1.25 10.75 2.48122 10.75 4C10.75 5.51878 9.51878 6.75 8 6.75C6.48122 6.75 5.25 5.51878 5.25 4Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M1.43448 15.6393C1.61815 15.3949 1.91314 15.25 2.22728 15.25H10.0455C10.4661 15.25 10.8396 15.5082 10.9726 15.891L12.7044 20.875H15.5227C16.0625 20.875 16.5 21.2947 16.5 21.8125C16.5 22.3303 16.0625 22.75 15.5227 22.75H3.47745L1.30016 16.484C1.20082 16.1981 1.2508 15.8838 1.43448 15.6393Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M12.9773 17.5938C12.9773 17.076 13.4148 16.6562 13.9545 16.6562H19.8182C21.4374 16.6562 22.75 17.9154 22.75 19.4688V19.9375C22.75 21.4908 21.4374 22.75 19.8182 22.75H18.9773C18.4375 22.75 18 22.3303 18 21.8125C18 21.2947 18.4375 20.875 18.9773 20.875H19.8182C20.3579 20.875 20.7955 20.4553 20.7955 19.9375V19.4688C20.7955 18.951 20.3579 18.5312 19.8182 18.5312H13.9545C13.4148 18.5312 12.9773 18.1115 12.9773 17.5938Z"
                        fill="currentColor"
                      ></path></svg
                    >Role-based access</span
                  ><span
                    class="inline-flex h-fit w-fit items-center gap-2 font-matter font-semibold text-sm text-sr-yellow-700/90 bg-sr-yellow-50/50 border border-sr-yellow-200 px-3.5 py-2 rounded-xl shadow-[inset_0px_-0.5px_1px_0px_var(--color-sr-yellow-300)] cursor-default hover:animate-wiggle"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="currentColor"
                      class="shrink-0"
                    >
                      <path
                        d="M18.5238 18.427C18.5758 17.8186 18.7054 17.338 18.8417 16.8956C18.8649 16.8205 18.8893 16.7437 18.9144 16.6652C19.0714 16.1726 19.25 15.6121 19.25 15C19.25 13.4812 18.0188 12.25 16.5 12.25C14.9812 12.25 13.75 13.4812 13.75 15C13.75 15.6121 13.9286 16.1726 14.0856 16.6652C14.1106 16.7437 14.1351 16.8206 14.1583 16.8956C14.2946 17.338 14.4242 17.8186 14.4762 18.427L12.4258 19.0779C11.6873 19.3124 11.25 20.0258 11.25 20.7543V22C11.25 22.4142 11.5858 22.75 12 22.75H21C21.4142 22.75 21.75 22.4142 21.75 22V20.7543C21.75 20.0258 21.3127 19.3124 20.5742 19.0779L18.5238 18.427ZM15.25 15C15.25 14.3096 15.8096 13.75 16.5 13.75C17.1904 13.75 17.75 14.3096 17.75 15C17.75 15.3625 17.6508 15.6787 17.4922 16.1846C17.4658 16.2687 17.4378 16.3581 17.4083 16.4538C17.2578 16.9422 17.1008 17.5184 17.0337 18.25H15.9663C15.8992 17.5184 15.7422 16.9422 15.5917 16.4538C15.5623 16.3582 15.5343 16.2689 15.5079 16.1848C15.3492 15.6789 15.25 15.3625 15.25 15Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                      <path
                        d="M11.0564 1.25C12.8942 1.24999 14.3498 1.24997 15.489 1.40314C16.6614 1.56076 17.6104 1.89288 18.3588 2.64124C19.1071 3.38961 19.4392 4.33856 19.5969 5.51098C19.75 6.65018 19.75 8.10585 19.75 9.94359V12.2612C18.9704 11.3371 17.8038 10.75 16.5 10.75C14.1528 10.75 12.25 12.6528 12.25 15C12.25 15.8485 12.5 17 12.7405 17.4043L11.9719 17.6482C10.5232 18.1082 9.75 19.4687 9.75 20.7543V22C9.75 22.2624 9.79491 22.5142 9.87745 22.7483C8.54537 22.7425 7.39805 22.7161 6.51098 22.5969C5.33856 22.4392 4.38961 22.1071 3.64124 21.3588C2.89288 20.6104 2.56076 19.6614 2.40314 18.489C2.24997 17.3498 2.24999 15.8942 2.25 14.0564V14.0564V9.94357V9.94356C2.24999 8.10581 2.24997 6.65019 2.40314 5.51098C2.56076 4.33856 2.89288 3.38961 3.64124 2.64124C4.38961 1.89288 5.33856 1.56076 6.51098 1.40314C7.65019 1.24997 9.21867 1.24999 11.0564 1.25H11.0564ZM7 6.25C6.58579 6.25 6.25 6.58579 6.25 7C6.25 7.41421 6.58579 7.75 7 7.75H15C15.4142 7.75 15.75 7.41421 15.75 7C15.75 6.58579 15.4142 6.25 15 6.25H7ZM7 10.25C6.58579 10.25 6.25 10.5858 6.25 11C6.25 11.4142 6.58579 11.75 7 11.75H11C11.4142 11.75 11.75 11.4142 11.75 11C11.75 10.5858 11.4142 10.25 11 10.25H7Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path></svg
                    >Full audit trail</span
                  ><span
                    class="inline-flex h-fit w-fit items-center gap-2 font-matter font-semibold text-sm text-sr-red-300 bg-sr-red-50/50 border border-sr-red-100 px-3.5 py-2 rounded-xl shadow-[inset_0px_-0.5px_1px_0px_var(--color-sr-red-100)] cursor-default hover:animate-wiggle"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      color="currentColor"
                      class="shrink-0"
                    >
                      <path
                        d="M21.751 12.75C21.7489 14.4982 21.732 15.9084 21.5801 17.0381C21.4041 18.3464 21.0354 19.3904 20.2139 20.2119C19.3924 21.0334 18.3484 21.4022 17.04 21.5781C15.7616 21.75 14.1241 21.75 12.0439 21.75H11.96C9.87981 21.75 8.24228 21.75 6.96387 21.5781C5.65551 21.4022 4.61153 21.0334 3.79004 20.2119C2.96855 19.3904 2.59979 18.3464 2.42383 17.0381C2.27194 15.9084 2.25498 14.4982 2.25293 12.75H21.751ZM6.99902 16.25C6.44674 16.25 5.99902 16.6977 5.99902 17.25C5.99902 17.8023 6.44674 18.25 6.99902 18.25C7.5513 18.25 7.99902 17.8023 7.99902 17.25C7.99902 16.6977 7.55131 16.25 6.99902 16.25ZM10.999 16.25C10.4467 16.25 9.99902 16.6977 9.99902 17.25C9.99902 17.8023 10.4467 18.25 10.999 18.25H16.999C17.5513 18.25 17.999 17.8023 17.999 17.25C17.999 16.6977 17.5513 16.25 16.999 16.25H10.999Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M12.0439 2.25C14.1241 2.24999 15.7616 2.25 17.04 2.42188C18.3484 2.59783 19.3924 2.9666 20.2139 3.78809C21.0354 4.60957 21.4041 5.65356 21.5801 6.96191C21.732 8.09163 21.7489 9.50179 21.751 11.25H2.25293C2.25498 9.50179 2.27194 8.09163 2.42383 6.96191C2.59979 5.65356 2.96855 4.60957 3.79004 3.78809C4.61153 2.9666 5.65551 2.59783 6.96387 2.42188C8.24228 2.25 9.87981 2.24999 11.96 2.25H12.0439ZM6.99902 5.75C6.44674 5.75 5.99902 6.19772 5.99902 6.75C5.99902 7.30228 6.44674 7.75 6.99902 7.75C7.5513 7.75 7.99902 7.30229 7.99902 6.75C7.99902 6.19772 7.55131 5.75 6.99902 5.75ZM10.999 5.75C10.4467 5.75 9.99902 6.19772 9.99902 6.75C9.99902 7.30228 10.4467 7.75 10.999 7.75H16.999C17.5513 7.75 17.999 7.30228 17.999 6.75C17.999 6.19772 17.5513 5.75 16.999 5.75H10.999Z"
                        fill="currentColor"
                      ></path></svg
                    >Data residency controls</span
                  ></div
                ></div
              ></div
            ></div
          ></div
        ><!--astro:end--></astro-island
      >
      <a href="contact-us">
        <astro-island
          uid="Z1z75zd"
          prefix="r21"
          component-url="/_astro/CustomButton.DmcZeIki.js"
          component-export="default"
          renderer-url="/_astro/client.B3N4hhPH.js"
          props='{"variant":[0,"primary"],"size":[0,"md"]}'
          ssr
          client="visible"
          opts='{"name":"CustomButton","value":true}'
          await-children
          ><button
            class="group relative inline-flex items-center justify-center cursor-pointer font-matter font-medium overflow-hidden rounded-full touch-manipulation disabled:opacity-40 disabled:pointer-events-none min-h-[40px] text-white bg-[#2a2c33] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_0_rgba(0,0,0,0.2)] active:scale-[0.97] active:duration-150 transition-[background-color,box-shadow] duration-350 ease-[cubic-bezier(0.2,0,0,1)] px-5 py-2.5 text-base"
            ><span
              aria-hidden="true"
              class="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-[cubic-bezier(0.2,0,0,1)] bg-[radial-gradient(circle_80px_at_var(--gx)_var(--gy),rgba(255,255,255,0.16)_0%,transparent_100%)]"
              style="--gx: 50%; --gy: 50%"
            ></span
            ><span class="relative z-10 flex items-center gap-2"><astro-slot> Contact Us </astro-slot></span></button
          ><!--astro:end--></astro-island
        >
      </a>
    </section>
    <section class="relative mx-auto w-10/12 2xl:max-w-width-mx" data-section-reveal>
      <astro-island
        uid="CQon0"
        prefix="r35"
        component-url="/_astro/ApiFeatuesSection.CDK5eqjF.js"
        component-export="default"
        renderer-url="/_astro/client.B3N4hhPH.js"
        props='{"heading":[0,"Built to run&lt;br/&gt;anywhere your business runs"],"features":[1,[[0,{"id":[0,"sarvam-cloud"],"title":[0,"Sarvam Cloud"],"description":[0,"Fully managed, automatic scaling, fastest time-to-value"],"image":[0,"cdn/tr_q-70_f-auto_dpr-auto/assets/products/voice-agents/built-for/built-for-01.png"]}],[0,{"id":[0,"private-cloud"],"title":[0,"Private Cloud (VPC)"],"description":[0,"Your security perimeter, our management"],"image":[0,"cdn/tr_q-70_f-auto_dpr-auto/assets/products/voice-agents/built-for/built-for-02.png"]}],[0,{"id":[0,"on-premises"],"title":[0,"On-Premises"],"description":[0,"Full control, air-gapped for regulated industries"],"image":[0,"cdn/tr_q-70_f-auto_dpr-auto/assets/products/voice-agents/built-for/built-for-03.png"]}]]],"variant":[0,"extra-small-card"]}'
        ssr
        client="visible"
        opts='{"name":"ApiFeaturesSection","value":true}'
        await-children
        ><div class="flex flex-col items-center gap-12"
          ><div class="section-heading-reveal flex flex-col items-center text-center gap-6 w-full"
            ><div class="flex flex-col items-center gap-6 w-full text-center"
              ><div class="flex flex-col items-center gap-4 w-full text-center"
                ><h2
                  class="font-season-mix font-medium leading-[1.2] tracking-[-0.02em] w-full text-tx whitespace-pre-line text-[28px] md:text-[36px]"
                  >Built to run<br />anywhere your business runs</h2
                ></div
              ></div
            ></div
          ><div class="gap-4 lg:gap-6 grid grid-cols-1 lg:grid-cols-3 w-full"
            ><div
              class="flex flex-row items-center gap-5 bg-white p-2 md:p-4 border border-st-secondary rounded-[26px] w-full overflow-hidden"
              ><div class="flex justify-center items-center w-20 h-20 shrink-0 overflow-hidden"
                ><img
                  src="cdn/tr_q-70_f-auto_dpr-auto/assets/products/voice-agents/built-for/built-for-01.png"
                  alt="Sarvam Cloud"
                  class="max-h-20 max-w-20 w-auto h-auto object-contain" /></div
              ><div class="flex flex-col gap-2 w-full"
                ><h3 class="font-matter font-medium text-tx-secondary text-[18px] leading-[1.3]">Sarvam Cloud</h3
                ><p class="font-matter text-tx-tertiary text-[16px] leading-normal"
                  >Fully managed, automatic scaling, fastest time-to-value</p
                ></div
              ></div
            ><div
              class="flex flex-row items-center gap-5 bg-white p-2 md:p-4 border border-st-secondary rounded-[26px] w-full overflow-hidden"
              ><div class="flex justify-center items-center w-20 h-20 shrink-0 overflow-hidden"
                ><img
                  src="cdn/tr_q-70_f-auto_dpr-auto/assets/products/voice-agents/built-for/built-for-02.png"
                  alt="Private Cloud (VPC)"
                  class="max-h-20 max-w-20 w-auto h-auto object-contain" /></div
              ><div class="flex flex-col gap-2 w-full"
                ><h3 class="font-matter font-medium text-tx-secondary text-[18px] leading-[1.3]">Private Cloud (VPC)</h3
                ><p class="font-matter text-tx-tertiary text-[16px] leading-normal"
                  >Your security perimeter, our management</p
                ></div
              ></div
            ><div
              class="flex flex-row items-center gap-5 bg-white p-2 md:p-4 border border-st-secondary rounded-[26px] w-full overflow-hidden"
              ><div class="flex justify-center items-center w-20 h-20 shrink-0 overflow-hidden"
                ><img
                  src="cdn/tr_q-70_f-auto_dpr-auto/assets/products/voice-agents/built-for/built-for-03.png"
                  alt="On-Premises"
                  class="max-h-20 max-w-20 w-auto h-auto object-contain" /></div
              ><div class="flex flex-col gap-2 w-full"
                ><h3 class="font-matter font-medium text-tx-secondary text-[18px] leading-[1.3]">On-Premises</h3
                ><p class="font-matter text-tx-tertiary text-[16px] leading-normal"
                  >Full control, air-gapped for regulated industries</p
                ></div
              ></div
            ></div
          ></div
        ><!--astro:end--></astro-island
      >
    </section>
    <section class="relative mx-auto w-10/12 2xl:max-w-width-mx" data-section-reveal>
      <astro-island
        uid="o0phf"
        prefix="r36"
        component-url="/_astro/TestimonialSection.QBTaa-kk.js"
        component-export="default"
        renderer-url="/_astro/client.B3N4hhPH.js"
        props='{"testimonials":[1,[[0,{"logo":[0,"cdn/assets/logos/investors/tata-capital.svg"],"quote":[0,"Our partnership with Sarvam has enabled us to scale highly personalized, product and segment-specific conversations across the customer lifecycle. By embedding multilingual interactions across our consumer loan products, we are reaching more customers with greater relevance, breaking access barriers, and deepening engagement in a cost-effective manner."],"authorName":[0,"Shallu Kaushik"],"authorTitle":[0,"Chief Digital Officer, Tata Capital"],"authorImage":[0,"cdn/tr_q-70_f-auto_dpr-auto/assets/products/voice-agents/logos/testimonial-profiel.png"],"link":[0,"/stories/tata-capital-ai-voice-transformation"]}]]],"semanticTypography":[0,true]}'
        ssr
        client="visible"
        opts='{"name":"TestimonialSection","value":true}'
        await-children
        ><section class="flex flex-col gap-10 md:gap-12"
          ><div class="section-heading-reveal flex flex-col items-center text-center gap-6 w-full"
            ><div class="flex flex-col items-center gap-6 w-full text-center"
              ><div class="flex flex-col items-center gap-4 w-full text-center"
                ><h2
                  class="font-season-mix font-medium leading-[1.2] tracking-[-0.02em] w-full text-tx whitespace-pre-line text-[28px] md:text-[36px]"
                  >What our customers say</h2
                ></div
              ></div
            ></div
          ><div class="flex flex-col gap-8 w-full"
            ><div
              class="flex flex-col gap-8 md:gap-16 bg-white p-6 md:p-16 border border-[#f0f0f0] rounded-4xl md:rounded-4xl w-full overflow-hidden"
              ><div class="flex flex-col items-start gap-6 md:gap-10 py-3 md:py-2"
                ><img
                  src="cdn/assets/logos/investors/tata-capital.svg"
                  alt="Company logo"
                  class="w-auto h-7 object-contain"
                /><p class="type-heading-3 font-matter font-normal leading-[160%] text-tx"
                  >Our partnership with Sarvam has enabled us to scale highly personalized, product and segment-specific
                  conversations across the customer lifecycle. By embedding multilingual interactions across our
                  consumer loan products, we are reaching more customers with greater relevance, breaking access
                  barriers, and deepening engagement in a cost-effective manner.</p
                ></div
              ><div class="flex md:flex-row flex-col md:justify-between md:items-center gap-6"
                ><div class="flex items-center gap-4"
                  ><img
                    src="cdn/tr_q-70_f-auto_dpr-auto/assets/products/voice-agents/logos/testimonial-profiel.png"
                    alt="Shallu Kaushik"
                    class="rounded-full w-12 h-12 object-cover"
                  /><div class="flex flex-col gap-1"
                    ><p class="font-matter font-medium text-base text-tx leading-normal">Shallu Kaushik</p
                    ><p class="type-supporting font-matter font-normal leading-normal text-tx-tertiary"
                      >Chief Digital Officer, Tata Capital</p
                    ></div
                  ></div
                ><a href="stories/tata-capital-ai-voice-transformation"
                  ><button
                    class="group relative inline-flex items-center justify-center cursor-pointer font-matter font-medium rounded-full touch-manipulation disabled:opacity-40 disabled:pointer-events-none overflow-hidden min-h-[40px] text-tx bg-sf-secondary hover:bg-white shadow-[inset_0_2px_0_rgba(200,200,200,0.1),inset_0_-1px_0_rgba(0,0,0,0.05)] active:scale-[0.97] active:duration-150 transition-[background-color,box-shadow] duration-350 ease-[cubic-bezier(0.2,0,0,1)] px-5 py-2.5 text-base w-full md:w-auto"
                    ><span class="relative z-10 flex items-center gap-2">Read full story</span></button
                  ></a
                ></div
              ></div
            ></div
          ></section
        ><!--astro:end--></astro-island
      >
    </section>
    <section class="relative flex flex-col items-center gap-8 md:gap-12 mx-auto w-[88%] md:w-10/12 2xl:max-w-width-mx">
      <astro-island
        uid="imjh1"
        prefix="r37"
        component-url="/_astro/SectionHeading.Cd13ITnb.js"
        component-export="default"
        renderer-url="/_astro/client.B3N4hhPH.js"
        props='{"heading":[0,"Research &amp; Updates"]}'
        ssr
        client="idle"
        opts='{"name":"SectionHeading","value":true}'
        await-children
        ><div class="section-heading-reveal flex flex-col items-center text-center gap-6 w-full"
          ><div class="flex flex-col items-center gap-6 w-full text-center"
            ><div class="flex flex-col items-center gap-4 w-full text-center"
              ><h2
                class="font-season-mix font-medium leading-[1.2] tracking-[-0.02em] w-full text-tx whitespace-pre-line text-[28px] md:text-[36px]"
                >Research & Updates</h2
              ></div
            ></div
          ></div
        ><!--astro:end--></astro-island
      >
      <div class="items-start gap-6 md:gap-8 grid grid-cols-1 md:grid-cols-3 w-full" data-blog-grid>
        <a
          href="blogs/building-ai-agents"
          class="group flex flex-col h-full justify-between gap-1 md:gap-2.5 bg-white p-3 border border-sf-tertiary hover:border-sr-indigo-200 rounded-[24px] md:rounded-4xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
          ><div class="flex shrink-0 flex-col gap-2 md:gap-3 px-2.5 py-3"
            ><div class="flex flex-col gap-2"
              ><span class="font-matter-monos font-medium text-tx-tertiary text-xs uppercase tracking-wide"
                >COMPANY</span
              ><h3 class="font-matter font-medium text-lg md:text-xl leading-snug text-tx line-clamp-2"
                >Building AI Agents: A First-Principles Guide</h3
              ></div
            ><span class="font-matter font-normal text-sm text-tx-tertiary">September 29, 2026</span></div
          ><div
            class="mt-0 shrink-0 rounded-[20px] w-full aspect-video bg-linear-to-br from-sr-pink-100 to-sr-orange-50 transition-transform duration-500 group-hover:scale-[1.02]"
          ></div></a
        ><a
          href="blogs/sarvam-vision-2-1"
          class="group flex flex-col h-full justify-between gap-1 md:gap-2.5 bg-white p-3 border border-sf-tertiary hover:border-sr-indigo-200 rounded-[24px] md:rounded-4xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
          ><div class="flex shrink-0 flex-col gap-2 md:gap-3 px-2.5 py-3"
            ><div class="flex flex-col gap-2"
              ><span class="font-matter-monos font-medium text-tx-tertiary text-xs uppercase tracking-wide"
                >COMPANY</span
              ><h3 class="font-matter font-medium text-lg md:text-xl leading-snug text-tx line-clamp-2"
                >Sarvam Vision 2.1: Pushing the Pareto frontier of document intelligence</h3
              ></div
            ><span class="font-matter font-normal text-sm text-tx-tertiary">September 24, 2026</span></div
          ><div class="mt-0 shrink-0 rounded-[20px] w-full aspect-video overflow-hidden"
            ><img
              src="cdn/tr_w-800_q-70_f-auto_dpr-auto/images/03117ysv/production/1a855fb8970a94f498b89ab0a4d6a86d8bf5b503-2160x1440.png"
              alt="Sarvam Vision 2.1: Pushing the Pareto frontier of document intelligence"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" /></div></a
        ><a
          href="blogs/introducing-saaras-v4"
          class="group flex flex-col h-full justify-between gap-1 md:gap-2.5 bg-white p-3 border border-sf-tertiary hover:border-sr-indigo-200 rounded-[24px] md:rounded-4xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
          ><div class="flex shrink-0 flex-col gap-2 md:gap-3 px-2.5 py-3"
            ><div class="flex flex-col gap-2"
              ><span class="font-matter-monos font-medium text-tx-tertiary text-xs uppercase tracking-wide"
                >COMPANY</span
              ><h3 class="font-matter font-medium text-lg md:text-xl leading-snug text-tx line-clamp-2"
                >Introducing Saaras V4</h3
              ></div
            ><span class="font-matter font-normal text-sm text-tx-tertiary">August 24, 2026</span></div
          ><div class="mt-0 shrink-0 rounded-[20px] w-full aspect-video overflow-hidden"
            ><img
              src="cdn/tr_w-800_q-70_f-auto_dpr-auto/images/03117ysv/production/e90bbe68a55d47ad208848a7b12a1b4c07378605-3840x2160.png"
              alt="Introducing Saaras V4"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" /></div
        ></a>
      </div>
      <a href="blogs">
        <astro-island
          uid="ZYe3mE"
          prefix="r22"
          component-url="/_astro/BlurButton.Ba1Hwkkz.js"
          component-export="default"
          renderer-url="/_astro/client.B3N4hhPH.js"
          props='{"variant":[0,"outline"],"size":[0,"lg"]}'
          ssr
          client="idle"
          opts='{"name":"BlurButton","value":true}'
          await-children
          ><button
            class="group relative inline-flex items-center justify-center cursor-pointer font-season-mix font-medium rounded-full touch-manipulation disabled:opacity-40 disabled:pointer-events-none overflow-hidden min-h-[44px] text-[#1e2033] active:scale-[0.97] active:duration-150 transition-all duration-350 ease-[cubic-bezier(0.2,0,0,1)] px-6 py-3.5 text-lg"
            style="
              background: linear-gradient(to bottom, #ffffff 0%, #f0f1f5 100%);
              box-shadow: inset 0 0 0 1px rgba(30, 32, 51, 0.14);
            "
            ><span class="relative z-10 flex items-center gap-2"
              ><astro-slot> View All Updates </astro-slot></span
            ></button
          ><!--astro:end--></astro-island
        >
      </a>
    </section>
    <section class="relative mx-auto mb-10 md:mb-0 w-[88%] md:w-10/12 2xl:max-w-width-mx">
      <astro-island
        uid="40LCs"
        prefix="r41"
        component-url="/_astro/FinalCtaSection.CHRoox5d.js"
        component-export="default"
        renderer-url="/_astro/client.B3N4hhPH.js"
        props='{"title":[0,"Build the Future of India&#39;s AI"],"subtitle":[0,"with Sarvam"],"buttonText":[0,"Sign Up"],"buttonLink":[0,"https://indus.sarvam.ai"],"noiseOpacity":[0,0.5],"showNoiseOverlay":[0,true]}'
        ssr
        client="visible"
        opts='{"name":"FinalCtaSection","value":true}'
        await-children
        ><div class="rounded-2xl md:rounded-[24px] outline outline-2 outline-st outline-offset-2"
          ><div
            class="relative flex flex-col justify-between items-center gap-8 md:gap-10 px-4 py-[50px] md:py-[60px] rounded-2xl md:rounded-[24px] min-h-[450px] overflow-hidden"
            style="background: linear-gradient(to bottom, #13121e 0%, #a5bbfc 116.55%)"
            ><div
              class="absolute inset-0 rotate-180 pointer-events-none mix-blend-soft-light"
              style="
                background-image: url(cdn/tr_q-70_f-auto_dpr-auto/assets/misc/white-noise.webp);
                background-size: 512px 512px;
                background-position: top left;
                opacity: 0.5;
              "
            ></div
            ><div
              class="z-10 relative w-10/12 text-white text-center not-italic font-season-mix type-display-sm md:text-[36px] leading-normal"
              ><p class="md:hidden">Build the Future of India&#x27;s AI with Sarvam<!-- --> </p
              ><p class="hidden md:block mb-0">Build the Future of India&#x27;s AI</p
              ><p class="hidden md:block">with Sarvam</p></div
            ><div
              class="top-[225px] md:top-[237px] left-1/2 z-0 absolute w-fit h-fit scale-75 md:scale-100 -translate-x-1/2"
              ><svg width="903" height="895" viewBox="0 0 903 895" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M451.01 873.19C469.316 880.341 488.271 884.433 507.216 885.643C470.693 897.058 431.329 897.058 394.807 885.644C413.75 884.433 432.704 880.34 451.01 873.19ZM282.316 856.278C300.932 859.973 320.31 860.885 339.859 858.678C355.676 870.283 372.917 879.101 390.899 885.133C352.64 886.785 314.616 876.68 282.316 856.278ZM619.702 856.279C587.403 876.68 549.38 886.784 511.122 885.132C529.104 879.101 546.344 870.283 562.16 858.678C581.709 860.885 601.087 859.973 619.702 856.279ZM398.585 842.198C406.934 849.176 416.017 855.524 425.804 861.128C433.704 865.652 441.8 869.536 450.029 872.804C431.416 879.985 412.14 883.999 392.897 885.036C374.582 879.095 357.01 870.27 340.905 858.556C349.707 857.512 358.543 855.839 367.355 853.497C378.27 850.597 388.7 846.795 398.585 842.198ZM503.435 842.198C513.32 846.795 523.75 850.596 534.665 853.496C543.478 855.838 552.312 857.512 561.114 858.556C545.01 870.27 527.439 879.096 509.123 885.036C489.881 883.999 470.604 879.985 451.991 872.804C460.22 869.536 468.316 865.652 476.217 861.128C486.003 855.525 495.085 849.176 503.435 842.198ZM451.01 805.745C465.796 820.376 483.187 832.677 502.719 841.86C494.472 848.728 485.51 854.981 475.86 860.506C467.761 865.144 459.454 869.106 451.01 872.419C442.566 869.106 434.26 865.143 426.16 860.506C416.511 854.981 407.549 848.728 399.302 841.86C418.834 832.677 436.224 820.376 451.01 805.745ZM297.309 815.286C303.552 824.169 310.67 832.632 318.66 840.557C325.111 846.954 331.916 852.784 339.012 858.052C319.158 860.211 299.49 859.141 280.633 855.203C264.492 844.764 249.821 831.729 237.323 816.28C246.099 817.532 255.071 818.183 264.196 818.183C275.496 818.183 286.561 817.189 297.309 815.286ZM604.712 815.286C615.46 817.189 626.526 818.183 637.825 818.183C646.949 818.183 655.92 817.531 664.695 816.28C652.197 831.729 637.527 844.764 621.386 855.203C602.528 859.141 582.861 860.211 563.008 858.052C570.103 852.784 576.911 846.954 583.361 840.557C591.352 832.632 598.468 824.169 604.712 815.286ZM357.461 793.531C367.925 811.458 381.512 827.804 397.98 841.688C388.222 846.204 377.934 849.944 367.172 852.804C358.137 855.205 349.079 856.9 340.058 857.933C332.766 852.566 325.778 846.606 319.165 840.048C311.286 832.234 304.261 823.894 298.087 815.144C319.351 811.286 339.36 803.868 357.461 793.531ZM544.56 793.531C562.661 803.868 582.669 811.286 603.933 815.144C597.759 823.894 590.735 832.234 582.856 840.048C576.243 846.606 569.254 852.565 561.962 857.933C552.941 856.9 543.884 855.204 534.85 852.804C524.087 849.944 513.798 846.204 504.039 841.688C520.508 827.803 534.096 811.458 544.56 793.531ZM181.323 799.04C198.341 807.388 216.822 813.243 236.282 816.129C248.531 831.399 262.883 844.342 278.679 854.784C241.291 846.56 207.198 827.039 181.323 799.04ZM720.696 799.04C694.821 827.039 660.727 846.56 623.339 854.784C639.135 844.343 653.487 831.399 665.735 816.13C685.197 813.244 703.678 807.388 720.696 799.04ZM411.153 747.524C420.47 768.972 433.811 788.594 450.503 805.238C435.699 819.886 418.274 832.191 398.696 841.354C382.178 827.478 368.559 811.121 358.082 793.173C378.55 781.38 396.557 765.85 411.153 747.524ZM490.866 747.524C505.463 765.851 523.471 781.38 543.939 793.173C533.463 811.121 519.843 827.478 503.324 841.354C483.746 832.191 466.321 819.886 451.517 805.238C468.209 788.594 481.55 768.972 490.866 747.524ZM270.286 757.722C275.715 777.723 284.574 796.999 296.858 814.637C286.253 816.495 275.339 817.466 264.196 817.466C254.843 817.466 245.651 816.779 236.667 815.461C231.025 808.406 225.831 800.855 221.155 792.823C215.584 783.253 210.975 773.394 207.295 763.356C228.841 765.089 250.104 763.06 270.286 757.722ZM631.733 757.722C651.916 763.06 673.179 765.089 694.726 763.356C691.046 773.394 686.437 783.253 680.866 792.822C676.19 800.854 670.995 808.405 665.353 815.461C656.369 816.779 647.178 817.466 637.825 817.466C626.682 817.466 615.767 816.495 605.162 814.637C617.447 796.999 626.304 777.723 631.733 757.722ZM148.305 748.857C156.455 752.319 164.952 755.25 173.767 757.593C184.681 760.493 195.629 762.374 206.507 763.295C210.219 773.478 214.885 783.478 220.535 793.184C225.096 801.019 230.149 808.398 235.628 815.308C215.886 812.297 197.167 806.215 179.979 797.57C167.113 783.343 156.345 766.987 148.305 748.857ZM753.715 748.857C745.674 766.988 734.906 783.344 722.039 797.571C704.851 806.215 686.132 812.298 666.391 815.308C671.87 808.397 676.924 801.019 681.485 793.184C687.135 783.479 691.8 773.477 695.513 763.295C706.391 762.374 717.339 760.494 728.254 757.594C737.068 755.252 745.565 752.319 753.715 748.857ZM334.156 727.063C337.558 750.171 345.323 772.548 357.103 792.91C338.98 803.259 318.937 810.673 297.635 814.498C285.3 796.855 276.413 777.56 270.978 757.534C293.827 751.397 315.274 741.019 334.156 727.063ZM567.864 727.064C586.747 741.02 608.193 751.397 631.042 757.534C625.606 777.56 616.719 796.855 604.385 814.498C583.082 810.673 563.04 803.26 544.917 792.911C556.697 772.549 564.462 750.172 567.864 727.064ZM451.01 644.121C453.405 682.767 467.725 718.213 490.362 746.89C481.075 768.392 467.729 788.06 451.01 804.731C434.29 788.06 420.944 768.392 411.657 746.89C434.295 718.213 448.614 682.767 451.01 644.121ZM98.7109 717.829C112.971 730.262 129.295 740.662 147.341 748.445C155.188 766.339 165.673 782.526 178.206 796.667C144.236 779.126 116.398 751.517 98.7109 717.829ZM803.31 717.828C785.622 751.517 757.783 779.126 723.812 796.667C736.346 782.526 746.832 766.34 754.679 748.445C772.725 740.662 789.049 730.261 803.31 717.828ZM399.639 637.418C391.869 675.36 396.45 713.272 410.832 746.78C396.249 765.166 378.225 780.74 357.724 792.552C345.925 772.157 338.167 749.733 334.808 726.58C364.157 704.692 387.239 674.131 399.639 637.418ZM502.382 637.423C514.782 674.134 537.864 704.693 567.212 726.58C563.853 749.733 556.096 772.157 544.297 792.552C523.795 780.74 505.771 765.166 491.188 746.779C505.57 713.272 510.15 675.363 502.382 637.423ZM265.122 687.537C262.378 710.73 264.038 734.337 270.103 757.028C249.896 762.373 228.602 764.39 207.026 762.617C199.717 742.41 196.168 721.491 196.145 700.752C219.816 700.689 243.241 696.17 265.122 687.537ZM636.898 687.538C658.779 696.171 682.204 700.69 705.876 700.753C705.852 721.491 702.304 742.41 694.994 762.617C673.419 764.39 652.125 762.373 631.918 757.028C637.982 734.338 639.643 710.731 636.898 687.538ZM133.111 690.03C153.471 697.234 174.54 700.731 195.428 700.755C195.452 721.468 198.978 742.361 206.241 762.551C195.512 761.624 184.714 759.761 173.95 756.9C164.916 754.5 156.218 751.477 147.885 747.898C144.276 739.635 141.23 731.009 138.81 722.051C135.926 711.377 134.046 700.67 133.111 690.03ZM768.908 690.03C767.973 700.67 766.095 711.377 763.211 722.051C760.791 731.009 757.743 739.635 754.135 747.898C745.802 751.477 737.104 754.5 728.07 756.9C717.306 759.761 706.509 761.624 695.779 762.551C703.042 742.361 706.569 721.469 706.593 700.756C727.48 700.732 748.549 697.234 768.908 690.03ZM351.765 617.76C334.361 652.412 328.892 690.205 334.039 726.261C315.155 740.278 293.68 750.694 270.794 756.842C264.72 734.114 263.08 710.463 265.878 687.237C299.938 673.63 330.206 650.036 351.765 617.76ZM550.257 617.763C571.815 650.038 602.083 673.631 636.143 687.238C638.94 710.464 637.299 734.114 631.226 756.842C608.34 750.694 586.866 740.277 567.981 726.261C573.128 690.206 567.66 652.414 550.257 617.763ZM79.9141 660.881C86.8843 666.317 94.3276 671.331 102.231 675.856C112.017 681.459 122.1 686.087 132.367 689.769C133.296 700.556 135.193 711.413 138.117 722.237C140.479 730.977 143.433 739.403 146.923 747.485C128.639 739.511 112.145 728.831 97.7988 716.069C89.0826 699.023 82.949 680.459 79.9141 660.881ZM822.105 660.882C819.071 680.459 812.938 699.023 804.222 716.068C789.875 728.83 773.381 739.511 755.097 747.485C758.586 739.403 761.542 730.978 763.903 722.237C766.828 711.413 768.724 700.556 769.652 689.769C779.92 686.087 790.003 681.46 799.789 675.857C807.693 671.332 815.135 666.318 822.105 660.882ZM435.978 560.527C445.426 582.664 450.652 607.004 450.652 632.554C450.652 675.373 435.973 714.792 411.337 746.136C395.721 709.537 391.83 667.694 403.005 626.334C409.673 601.654 421.073 579.484 435.978 560.527ZM406.935 552.811C410.284 576.617 408.98 601.468 402.312 626.147C391.138 667.508 366.671 701.816 334.694 725.769C329.214 686.775 336.193 645.765 357.313 608.949L357.913 607.912C370.795 585.785 387.591 567.296 406.935 552.811ZM495.084 552.811C514.428 567.296 531.226 585.785 544.108 607.913C565.696 644.995 572.857 686.409 567.325 725.769C535.348 701.816 510.882 667.508 499.707 626.147C493.039 601.469 491.734 576.617 495.084 552.811ZM40.1064 618.178C50.6367 633.849 63.6918 648.086 79.0928 660.237C82.0027 679.538 87.9069 697.867 96.3242 714.744C68.0857 689.08 48.3986 655.262 40.1064 618.178ZM861.913 618.178C853.621 655.262 833.934 689.078 805.696 714.742C814.113 697.865 820.018 679.537 822.928 660.236C838.328 648.085 851.383 633.848 861.913 618.178ZM763.341 626.697C768.73 646.735 770.762 667.852 768.975 689.247C748.597 696.497 727.503 700.015 706.59 700.039C706.526 676.565 701.97 653.336 693.267 631.638C716.654 634.36 740.46 632.712 763.341 626.697ZM138.68 626.697C161.561 632.713 185.367 634.36 208.755 631.638C200.052 653.336 195.495 676.564 195.431 700.038C174.518 700.015 153.422 696.496 133.045 689.246C131.258 667.852 133.291 646.735 138.68 626.697ZM591.375 586.488C620.62 612.125 656.011 627.141 692.457 631.542C701.221 653.258 705.808 676.524 705.873 700.036C682.163 699.972 658.701 695.423 636.802 686.73C632.364 650.587 617.223 615.49 591.375 586.488ZM310.645 586.488C284.798 615.49 269.657 650.587 265.219 686.729C243.32 695.422 219.858 699.971 196.147 700.035C196.212 676.523 200.801 653.258 209.564 631.542C246.01 627.141 281.4 612.124 310.645 586.488ZM36.8145 558.35C42.1286 565.39 48.0111 572.144 54.4648 578.544C62.4541 586.467 70.9857 593.525 79.9414 599.716C78.023 610.374 77.0225 621.348 77.0225 632.554C77.0225 641.603 77.6788 650.501 78.9404 659.204C63.3599 646.808 50.2135 632.257 39.6855 616.247C35.7153 597.545 34.6365 578.039 36.8145 558.35ZM824.281 632.554C824.281 641.828 823.589 650.942 822.26 659.85C815.145 665.445 807.533 670.598 799.434 675.235C789.782 680.762 779.839 685.332 769.716 688.981C771.462 667.615 769.416 646.53 764.034 626.517C784.204 621.132 803.642 612.345 821.428 600.16C823.302 610.678 824.281 621.503 824.281 632.554ZM521.122 537.902C543.587 546.929 564.638 560.476 582.856 578.544C613.386 608.821 631.111 646.986 636.04 686.424C599.248 671.634 566.924 645.135 545.334 608.586L544.728 607.553L544.128 606.515C531.606 584.687 524.053 561.385 521.122 537.902ZM380.897 537.902C377.966 561.384 370.415 584.686 357.893 606.514L357.293 607.552C335.705 644.635 303.119 671.493 265.98 686.422C270.864 647.352 288.307 609.531 318.315 579.392L319.165 578.544C337.383 560.477 358.433 546.929 380.897 537.902ZM279.089 545.722C246.559 567.1 222.777 597.112 209.06 630.882C185.638 633.657 161.789 632.03 138.87 626.006C145.069 603.312 155.571 582.016 169.704 563.289C206.054 568.393 244.153 562.974 279.089 545.722ZM622.932 545.721C657.867 562.973 695.967 568.393 732.316 563.289C746.449 582.016 756.952 603.312 763.15 626.006C740.232 632.03 716.383 633.657 692.962 630.882C679.244 597.112 655.462 567.099 622.932 545.721ZM359.637 516.818C350.677 538.747 337.302 559.317 319.51 577.187L318.66 578.035C288.129 608.313 249.644 625.893 209.876 630.78C224.929 593.952 252.012 561.639 289.402 540.229C311.714 527.454 335.582 519.771 359.637 516.818ZM542.383 516.818C566.438 519.771 590.307 527.454 612.619 540.229C650.01 561.639 677.091 593.952 692.145 630.78C652.747 625.938 614.608 608.64 584.216 578.878L583.361 578.035L582.511 577.187C564.719 559.317 551.342 538.748 542.383 516.818ZM102.5 540.415C123.032 552.098 145.596 559.8 168.896 563.174C154.827 581.899 144.364 603.166 138.176 625.824C117.982 620.434 98.5233 611.621 80.7324 599.388C84.59 578.263 92.0648 558.387 102.5 540.415ZM799.521 540.414C809.956 558.386 817.43 578.263 821.288 599.388C803.497 611.621 784.039 620.434 763.845 625.824C757.657 603.166 747.193 581.898 733.124 563.173C756.425 559.799 778.989 552.097 799.521 540.414ZM451.01 543.648C456.15 548.754 461.002 554.176 465.537 559.892C457.399 578.846 452.348 599.416 451.011 620.983C449.673 599.416 444.62 578.846 436.482 559.892C441.017 554.176 445.87 548.754 451.01 543.648ZM425.861 540.365C429.493 546.616 432.765 553.097 435.653 559.781C422.846 576.001 412.599 594.574 405.679 615.063C410.015 593.888 410.504 572.723 407.59 552.326C413.462 547.969 419.564 543.978 425.861 540.365ZM476.158 540.365C482.456 543.978 488.558 547.969 494.43 552.326C491.516 572.723 492.006 593.888 496.342 615.063C489.421 594.574 479.173 576.002 466.366 559.782C469.254 553.098 472.526 546.616 476.158 540.365ZM892.511 506.883C894.18 544.834 883.99 582.553 863.41 614.592C867.137 596.128 868.056 576.907 865.83 557.517C877.535 541.826 886.429 524.723 892.511 506.883ZM9.50879 506.883C15.5904 524.723 24.4844 541.826 36.1895 557.517C33.9633 576.907 34.8831 596.127 38.6094 614.591C18.0304 582.552 7.83966 544.833 9.50879 506.883ZM848.702 499.871C853.258 509.551 857.03 519.756 859.914 530.432C862.334 539.39 864.044 548.371 865.085 557.316C859.673 564.547 853.664 571.477 847.052 578.035C839.171 585.851 830.759 592.819 821.934 598.942C818.045 577.855 810.567 558.012 800.145 540.062C818.221 529.683 834.702 516.206 848.702 499.871ZM53.3174 499.871C67.3172 516.206 83.7991 529.682 101.876 540.061C91.454 558.011 83.9749 577.854 80.0859 598.941C71.2606 592.818 62.849 585.85 54.9688 578.035C48.3559 571.477 42.3463 564.547 36.9346 557.315C37.9756 548.37 39.6861 539.389 42.1064 530.431C44.9908 519.755 48.7618 509.55 53.3174 499.871ZM402.427 530.739C404.303 537.709 405.772 544.809 406.817 552.006C390.215 564.385 375.47 579.694 363.438 597.707C373.152 578.368 379.147 558.051 381.655 537.604C388.464 534.902 395.401 532.612 402.427 530.739ZM499.593 530.739C506.619 532.613 513.556 534.902 520.365 537.604C522.873 558.049 528.867 578.364 538.578 597.701C526.547 579.69 511.803 564.383 495.202 552.006C496.248 544.809 497.716 537.709 499.593 530.739ZM382.303 515.425C382.297 522.638 381.862 529.874 380.993 537.094C361.73 544.787 343.496 555.786 327.177 570.093C341.601 553.909 352.69 535.826 360.447 516.724C367.729 515.862 375.027 515.431 382.303 515.425ZM519.717 515.424C526.993 515.43 534.291 515.862 541.573 516.724C549.33 535.827 560.42 553.909 574.844 570.093C558.524 555.786 540.29 544.787 521.026 537.094C520.158 529.873 519.723 522.638 519.717 515.424ZM270.653 495.582C295.538 488.969 320.597 487.675 344.602 490.996C329.996 510.177 311.356 526.833 289.046 539.607C251.653 561.017 209.893 568.12 170.204 562.634C194.356 530.925 228.949 506.664 270.653 495.582ZM557.419 490.995C581.424 487.674 606.483 488.968 631.368 495.581C673.072 506.663 707.665 530.925 731.816 562.634C692.498 568.069 651.145 561.149 614.021 540.202L612.976 539.607L611.933 539.006C590.084 526.312 571.796 509.877 557.419 490.995ZM149.016 487.132C182.793 501.391 221.006 505.935 259.251 498.24C222.252 510.541 191.45 533.425 169.388 562.522C146.041 559.191 123.429 551.498 102.863 539.797C114.774 519.467 130.477 501.593 149.016 487.132ZM753.004 487.131C771.543 501.592 787.247 519.466 799.157 539.796C778.592 551.497 755.98 559.19 732.633 562.521C710.57 533.424 679.769 510.54 642.77 498.239C681.014 505.934 719.227 501.39 753.004 487.131ZM462.417 533.221C466.871 535.307 471.246 537.574 475.534 540.012C471.953 546.175 468.721 552.563 465.86 559.146C461.378 553.521 456.589 548.18 451.521 543.146C455.026 539.691 458.66 536.378 462.417 533.221ZM439.602 533.221C443.359 536.379 446.994 539.69 450.499 543.146C445.431 548.18 440.641 553.52 436.159 559.146C433.298 552.562 430.067 546.174 426.486 540.011C430.774 537.573 435.148 535.307 439.602 533.221ZM880.077 448.249C887.32 466.709 891.368 485.828 892.414 504.913C886.423 523.08 877.523 540.509 865.709 556.482C864.656 547.751 862.967 538.986 860.605 530.244C857.681 519.42 853.849 509.078 849.215 499.275C856.25 490.996 862.651 481.989 868.301 472.284C872.864 464.446 876.782 456.413 880.077 448.249ZM21.9424 448.248C25.2381 456.413 29.1571 464.446 33.7207 472.285C39.37 481.989 45.7699 490.995 52.8047 499.274C48.17 509.077 44.3395 519.42 41.415 530.244C39.0531 538.986 37.3641 547.75 36.3115 556.481C24.4973 540.509 15.5963 523.08 9.60547 504.913C10.6513 485.828 14.6995 466.709 21.9424 448.248ZM484.456 527.365C489.303 528.237 494.12 529.303 498.898 530.558C497.048 537.43 495.593 544.429 494.548 551.522C488.75 547.239 482.731 543.309 476.521 539.747C479.005 535.511 481.651 531.38 484.456 527.365ZM417.564 527.365C420.369 531.379 423.014 535.511 425.498 539.747C419.289 543.309 413.269 547.238 407.472 551.521C406.426 544.428 404.971 537.43 403.121 530.558C407.899 529.303 412.718 528.237 417.564 527.365ZM451.009 528.334C454.616 529.741 458.182 531.26 461.7 532.89C458.017 535.997 454.451 539.25 451.01 542.643C447.569 539.25 444.003 535.997 440.319 532.89C443.837 531.26 447.402 529.741 451.009 528.334ZM811.949 447.785C826.72 462.467 839.127 479.748 848.366 499.163C834.374 515.546 817.88 529.053 799.78 539.443C787.89 519.145 772.233 501.286 753.756 486.811C775.382 477.571 795.166 464.34 811.949 447.785ZM90.0703 447.785C106.853 464.34 126.637 477.571 148.263 486.812C129.786 501.287 114.129 519.145 102.239 539.442C84.14 529.052 67.6452 515.545 53.6533 499.162C62.8928 479.747 75.2999 462.467 90.0703 447.785ZM472.16 525.572C476.013 526.006 479.854 526.558 483.679 527.229C480.932 531.176 478.336 535.234 475.897 539.394C471.688 537 467.394 534.773 463.024 532.717C465.997 530.24 469.044 527.857 472.16 525.572ZM429.858 525.572C432.975 527.857 436.022 530.24 438.994 532.717C434.625 534.773 430.331 536.999 426.122 539.393C423.684 535.233 421.088 531.176 418.342 527.229C422.166 526.558 426.006 526.006 429.858 525.572ZM519 515.427C519.006 522.54 519.428 529.675 520.27 536.795C513.551 534.146 506.711 531.895 499.783 530.048C501.077 525.318 502.553 520.648 504.215 516.051C509.124 515.649 514.057 515.442 519 515.427ZM383.02 515.428C387.963 515.443 392.895 515.65 397.805 516.052C399.466 520.649 400.944 525.318 402.237 530.048C395.31 531.895 388.469 534.145 381.751 536.794C382.592 529.674 383.013 522.541 383.02 515.428ZM345.411 491.112C352.67 492.149 359.831 493.606 366.86 495.468C364.972 502.434 362.664 509.311 359.94 516.062C339.329 518.548 318.85 524.49 299.355 534.117C317.508 522.188 332.935 507.571 345.411 491.112ZM556.609 491.111C569.084 507.568 584.509 522.184 602.659 534.112C583.167 524.487 562.688 518.546 542.079 516.061C539.356 509.31 537.049 502.433 535.16 495.467C542.189 493.605 549.351 492.148 556.609 491.111ZM440.737 524.665C443.86 525.68 446.957 526.772 450.024 527.949C446.546 529.323 443.108 530.801 439.713 532.381C436.846 529.983 433.909 527.674 430.908 525.454C434.178 525.104 437.456 524.844 440.737 524.665ZM461.28 524.665C464.562 524.843 467.84 525.104 471.11 525.454C468.109 527.674 465.173 529.983 462.307 532.381C458.911 530.801 455.472 529.323 451.993 527.949C455.06 526.772 458.158 525.68 461.28 524.665ZM398.59 516.12C402.46 516.453 406.315 516.907 410.149 517.477C412.563 520.483 414.885 523.566 417.109 526.721C412.352 527.585 407.622 528.634 402.931 529.866C401.661 525.223 400.213 520.637 398.59 516.12ZM503.43 516.12C501.806 520.637 500.359 525.223 499.089 529.866C494.398 528.635 489.668 527.585 484.911 526.721C487.136 523.565 489.458 520.483 491.872 517.476C495.706 516.906 499.561 516.453 503.43 516.12ZM442.725 524.566C448.244 524.324 453.772 524.325 459.292 524.566C456.509 525.501 453.747 526.501 451.009 527.564C448.27 526.501 445.508 525.501 442.725 524.566ZM411.192 517.631C414.443 518.133 417.678 518.722 420.895 519.392C423.646 521.173 426.352 523.024 429.007 524.947C425.288 525.381 421.581 525.926 417.889 526.581C415.745 523.529 413.512 520.545 411.192 517.631ZM490.828 517.63C488.508 520.544 486.275 523.529 484.132 526.581C480.439 525.926 476.731 525.381 473.012 524.947C475.667 523.023 478.374 521.173 481.126 519.392C484.343 518.722 487.578 518.132 490.828 517.63ZM422.837 519.807C428.232 520.99 433.572 522.409 438.841 524.06C435.908 524.248 432.979 524.504 430.057 524.829C427.689 523.099 425.282 521.424 422.837 519.807ZM479.183 519.806C476.737 521.423 474.33 523.098 471.962 524.829C469.039 524.504 466.11 524.248 463.177 524.06C468.446 522.409 473.787 520.989 479.183 519.806ZM404.868 510.103C409.772 512.631 414.562 515.373 419.222 518.32C416.339 517.749 413.441 517.244 410.532 516.808C408.697 514.528 406.808 512.293 404.868 510.103ZM497.154 510.101C495.214 512.291 493.324 514.527 491.487 516.808C488.578 517.244 485.682 517.749 482.799 518.32C487.459 515.372 492.249 512.629 497.154 510.101ZM394.188 505.013C397.198 506.332 400.17 507.732 403.104 509.205C405.296 511.632 407.427 514.114 409.489 516.653C405.783 516.118 402.059 515.692 398.321 515.377C397.047 511.879 395.669 508.423 394.188 505.013ZM507.831 505.012C506.351 508.422 504.973 511.878 503.699 515.376C499.961 515.691 496.237 516.117 492.531 516.652C494.594 514.113 496.725 511.631 498.917 509.204C501.85 507.731 504.822 506.331 507.831 505.012ZM367.553 495.655C372.323 496.938 377.034 498.404 381.671 500.052C382.076 504.919 382.285 509.808 382.3 514.708C375.126 514.714 367.931 515.132 360.751 515.967C363.421 509.306 365.691 502.524 367.553 495.655ZM534.468 495.654C536.33 502.523 538.598 509.305 541.269 515.966C534.088 515.131 526.893 514.713 519.72 514.707C519.735 509.807 519.944 504.918 520.349 500.051C524.986 498.402 529.697 496.937 534.468 495.654ZM382.411 500.319C386.062 501.634 389.667 503.061 393.223 504.596C394.769 508.12 396.207 511.694 397.532 515.312C392.712 514.926 387.869 514.725 383.017 514.711C383.002 509.9 382.8 505.099 382.411 500.319ZM519.608 500.319C519.219 505.099 519.018 509.899 519.003 514.71C514.15 514.724 509.308 514.925 504.487 515.312C505.813 511.693 507.25 508.119 508.797 504.595C512.352 503.06 515.958 501.634 519.608 500.319ZM390.043 496.114C394.122 499.817 398.035 503.698 401.769 507.743C399.132 506.451 396.464 505.219 393.767 504.05C392.588 501.375 391.346 498.729 390.043 496.114ZM511.977 496.115C510.674 498.73 509.432 501.375 508.253 504.05C505.556 505.219 502.888 506.45 500.251 507.742C503.984 503.697 507.897 499.818 511.977 496.115ZM381.058 488.458C383.621 490.505 386.125 492.621 388.574 494.797C390.059 497.704 391.471 500.649 392.801 503.633C389.36 502.164 385.873 500.797 382.345 499.533C382.027 495.826 381.597 492.133 381.058 488.458ZM509.22 503.632C510.549 500.649 511.96 497.705 513.444 494.798C515.894 492.621 518.399 490.505 520.962 488.458C520.422 492.133 519.993 495.826 519.675 499.532C516.146 500.796 512.66 502.163 509.22 503.632ZM893.021 391.529C904.538 427.759 904.538 466.809 893.021 503.038C891.803 484.246 887.676 465.442 880.465 447.282C887.676 429.123 891.803 410.321 893.021 391.529ZM8.99902 391.528C10.2178 410.32 14.3447 429.123 21.5557 447.282C14.3445 465.442 10.2169 484.245 8.99805 503.037C-2.51855 466.808 -2.51782 427.758 8.99902 391.528ZM264.196 447.642C289.959 447.642 314.501 452.823 336.82 462.192C317.708 476.971 295.356 488.275 270.474 494.888L270.47 494.889C228.764 505.971 186.573 502.113 149.669 486.627C181.273 462.197 221.02 447.642 264.196 447.642ZM637.825 447.642C681.001 447.642 720.746 462.197 752.351 486.627C715.447 502.112 673.257 505.97 631.552 494.888C606.667 488.275 584.314 476.971 565.2 462.192C587.52 452.823 612.062 447.642 637.825 447.642ZM370.907 480.903C374.091 483.111 377.201 485.414 380.235 487.81C380.81 491.611 381.266 495.432 381.602 499.269C377.046 497.658 372.42 496.222 367.736 494.962C368.978 490.31 370.036 485.621 370.907 480.903ZM531.113 480.903C531.985 485.62 533.042 490.31 534.283 494.961C529.599 496.221 524.974 497.657 520.418 499.268C520.754 495.431 521.211 491.61 521.785 487.809C524.819 485.413 527.93 483.111 531.113 480.903ZM53.1445 396C62.4042 415.371 74.8075 432.619 89.5596 447.283C74.8077 461.947 62.4042 479.194 53.1445 498.565C46.2182 490.385 39.9128 481.496 34.3408 471.925C29.6647 463.893 25.6683 455.655 22.3281 447.281C25.6681 438.908 29.6644 430.673 34.3398 422.642C39.912 413.07 46.218 404.18 53.1445 396ZM848.875 396C855.802 404.18 862.108 413.07 867.681 422.642C872.356 430.673 876.352 438.91 879.692 447.283C876.352 455.656 872.356 463.892 867.681 471.924C862.108 481.496 855.802 490.385 848.875 498.565C839.615 479.194 827.212 461.947 812.46 447.282C827.212 432.618 839.615 415.371 848.875 396ZM357.773 472.584C362.047 475.048 366.214 477.673 370.263 480.455C369.384 485.261 368.309 490.038 367.045 494.775C360.114 492.94 353.056 491.496 345.902 490.459C350.22 484.71 354.182 478.741 357.773 472.584ZM544.247 472.583C547.838 478.74 551.799 484.709 556.117 490.458C548.964 491.495 541.906 492.939 534.976 494.774C533.711 490.037 532.637 485.26 531.758 480.455C535.807 477.673 539.974 475.047 544.247 472.583ZM522.645 478.798C522.068 481.66 521.559 484.535 521.118 487.423C518.817 489.245 516.561 491.119 514.351 493.045C516.902 488.177 519.669 483.423 522.645 478.798ZM379.376 478.8C382.351 483.424 385.117 488.177 387.668 493.044C385.458 491.119 383.202 489.245 380.901 487.423C380.461 484.536 379.952 481.661 379.376 478.8ZM337.573 462.514C344.313 465.378 350.849 468.623 357.152 472.225C353.51 478.469 349.486 484.52 345.094 490.342C324.542 487.454 303.215 487.936 281.879 492.228C302.52 485.364 321.231 475.206 337.573 462.514ZM564.448 462.513C580.79 475.205 599.501 485.363 620.142 492.227C598.805 487.935 577.479 487.453 556.927 490.341C552.534 484.519 548.509 478.469 544.867 472.225C551.171 468.622 557.708 465.377 564.448 462.513ZM372.695 469.101C374.637 471.736 376.505 474.422 378.303 477.152C378.978 480.342 379.573 483.55 380.079 486.773C377.139 484.472 374.128 482.256 371.049 480.129C371.709 476.467 372.258 472.789 372.695 469.101ZM529.324 469.099C529.762 472.788 530.311 476.466 530.972 480.129C527.893 482.256 524.881 484.471 521.941 486.772C522.447 483.549 523.041 480.342 523.717 477.152C525.515 474.421 527.382 471.734 529.324 469.099ZM148.908 408.258C177.813 430.701 213.538 444.899 252.486 447.283C213.537 449.668 177.812 463.865 148.907 486.309C127.225 477.098 107.393 463.863 90.582 447.282C107.393 430.702 127.227 417.468 148.908 408.258ZM753.112 408.257C774.794 417.467 794.627 430.702 811.438 447.282C794.627 463.863 774.794 477.097 753.112 486.308C724.208 463.865 688.483 449.667 649.534 447.283C688.483 444.899 724.208 430.7 753.112 408.257ZM364.863 459.196C367.362 462.146 369.765 465.169 372.07 468.262C371.633 472.081 371.076 475.89 370.399 479.682C366.419 476.957 362.326 474.382 358.131 471.963C360.544 467.788 362.79 463.529 364.863 459.196ZM537.157 459.195C539.23 463.529 541.476 467.788 543.89 471.963C539.694 474.382 535.601 476.956 531.62 479.682C530.943 475.89 530.386 472.081 529.949 468.261C532.255 465.168 534.658 462.145 537.157 459.195ZM373.592 459.338C375.259 464.57 376.691 469.874 377.886 475.231C376.253 472.803 374.562 470.412 372.814 468.061C373.142 465.158 373.402 462.25 373.592 459.338ZM528.429 459.336C528.619 462.248 528.877 465.157 529.205 468.06C527.458 470.411 525.767 472.802 524.134 475.23C525.328 469.872 526.762 464.569 528.429 459.336ZM354.348 447.79C357.832 451.267 361.173 454.871 364.357 458.598C362.254 463.014 359.969 467.352 357.511 471.604C351.296 468.052 344.855 464.847 338.217 462.01C343.888 457.565 349.272 452.816 354.348 447.79ZM547.672 447.789C552.748 452.815 558.132 457.564 563.804 462.009C557.165 464.846 550.725 468.052 544.51 471.604C542.052 467.352 539.767 463.013 537.663 458.597C540.848 454.87 544.188 451.266 547.672 447.789ZM369.671 448.254C370.859 451.298 371.962 454.372 372.985 457.471C372.805 460.726 372.543 463.978 372.19 467.223C369.951 464.244 367.62 461.331 365.201 458.486C366.795 455.118 368.285 451.705 369.671 448.254ZM532.349 448.253C533.734 451.704 535.225 455.117 536.819 458.485C534.4 461.33 532.069 464.243 529.83 467.222C529.477 463.978 529.214 460.727 529.034 457.472C530.058 454.372 531.161 451.297 532.349 448.253ZM337.464 432.878C343.226 437.374 348.693 442.186 353.841 447.283C348.693 452.38 343.227 457.192 337.465 461.688C318.365 453.622 297.636 448.613 275.904 447.283C297.636 445.953 318.364 440.944 337.464 432.878ZM564.556 432.877C583.656 440.943 604.383 445.953 626.115 447.283C604.384 448.614 583.656 453.622 564.556 461.688C558.793 457.191 553.327 452.379 548.179 447.282C553.327 442.185 558.793 437.373 564.556 432.877ZM364.69 436.679C366.334 440.168 367.866 443.705 369.285 447.283C367.866 450.861 366.334 454.398 364.69 457.888C361.557 454.234 358.276 450.697 354.854 447.283C358.276 443.87 361.557 440.333 364.69 436.679ZM537.33 436.678C540.463 440.331 543.744 443.869 547.165 447.282C543.744 450.695 540.463 454.233 537.33 457.887C535.686 454.397 534.154 450.86 532.734 447.281C534.154 443.703 535.686 440.167 537.33 436.678ZM373.084 439.054C373.329 444.537 373.329 450.029 373.084 455.513C372.14 452.747 371.131 450.004 370.057 447.283C371.131 444.563 372.14 441.819 373.084 439.054ZM528.937 439.054C529.88 441.819 530.889 444.562 531.963 447.282C530.889 450.002 529.88 452.747 528.937 455.512C528.692 450.029 528.692 444.537 528.937 439.054ZM149.669 407.938C186.572 392.453 228.764 388.595 270.469 399.678C295.352 406.29 317.705 417.595 336.818 432.373C314.847 441.596 290.724 446.762 265.401 446.921L264.196 446.925L262.99 446.921C220.28 446.653 180.979 432.141 149.669 407.938ZM631.552 399.678C673.257 388.595 715.448 392.453 752.352 407.938C721.042 432.141 681.741 446.653 639.031 446.921L637.825 446.925L636.619 446.921C611.296 446.762 587.172 441.596 565.2 432.372C584.314 417.593 606.668 406.29 631.552 399.678ZM102.239 355.123C114.13 375.421 129.788 393.279 148.265 407.755C126.639 416.995 106.854 430.225 90.0713 446.779C75.301 432.098 62.8927 414.818 53.6533 395.403C67.6452 379.021 84.14 365.513 102.239 355.123ZM799.78 355.123C817.879 365.513 834.374 379.02 848.366 395.402C839.127 414.818 826.719 432.098 811.948 446.779C795.166 430.225 775.381 416.994 753.756 407.754C772.233 393.278 787.89 375.421 799.78 355.123ZM357.511 422.962C359.969 427.214 362.253 431.552 364.356 435.969C361.172 439.695 357.833 443.3 354.349 446.776C349.273 441.751 343.888 437.001 338.217 432.557C344.855 429.719 351.296 426.514 357.511 422.962ZM544.51 422.962C550.724 426.513 557.165 429.719 563.803 432.557C558.132 437.001 552.747 441.75 547.672 446.775C544.188 443.299 540.848 439.694 537.663 435.968C539.766 431.552 542.052 427.214 544.51 422.962ZM865.709 338.083C877.523 354.056 886.423 371.486 892.414 389.652C891.368 408.737 887.32 427.856 880.077 446.316C876.782 438.152 872.863 430.12 868.3 422.281C862.65 412.577 856.251 403.569 849.216 395.29C853.85 385.487 857.682 375.145 860.606 364.321C862.968 355.579 864.656 346.815 865.709 338.083ZM36.3115 338.085C37.3641 346.816 39.0531 355.58 41.415 364.322C44.3393 375.146 48.1694 385.488 52.8037 395.291C45.769 403.57 39.37 412.577 33.7207 422.281C29.1576 430.119 25.2388 438.151 21.9434 446.315C14.7007 427.855 10.6521 408.736 9.60645 389.651C15.5973 371.485 24.4978 354.057 36.3115 338.085ZM372.19 427.343C372.543 430.587 372.805 433.84 372.985 437.096C371.962 440.195 370.859 443.269 369.671 446.312C368.285 442.861 366.796 439.449 365.202 436.08C367.621 433.235 369.951 430.321 372.19 427.343ZM529.83 427.344C532.069 430.322 534.401 433.234 536.819 436.079C535.225 439.447 533.734 442.859 532.349 446.311C531.161 443.267 530.058 440.193 529.034 437.094C529.214 433.839 529.477 430.587 529.83 427.344ZM370.399 414.884C371.076 418.676 371.633 422.485 372.07 426.305C369.765 429.397 367.362 432.42 364.863 435.369C362.79 431.036 360.544 426.777 358.131 422.603C362.326 420.184 366.419 417.609 370.399 414.884ZM531.62 414.884C535.601 417.609 539.693 420.184 543.889 422.603C541.475 426.777 539.229 431.036 537.156 435.369C534.657 432.42 532.255 429.396 529.949 426.304C530.386 422.484 530.943 418.676 531.62 414.884ZM377.887 419.333C376.692 424.692 375.259 429.996 373.592 435.229C373.402 432.317 373.142 429.408 372.814 426.505C374.562 424.153 376.253 421.762 377.887 419.333ZM524.134 419.335C525.767 421.763 527.458 424.154 529.205 426.505C528.877 429.408 528.619 432.317 528.429 435.229C526.762 429.997 525.328 424.693 524.134 419.335ZM281.872 402.337C303.211 406.63 324.539 407.112 345.094 404.224C349.486 410.046 353.51 416.097 357.152 422.341C350.849 425.943 344.313 429.187 337.572 432.052C321.229 419.359 302.515 409.2 281.872 402.337ZM620.144 402.338C599.502 409.201 580.791 419.359 564.448 432.052C557.708 429.187 551.171 425.943 544.867 422.341C548.51 416.096 552.534 410.046 556.927 404.224C577.479 407.112 598.807 406.63 620.144 402.338ZM380.079 407.791C379.573 411.015 378.979 414.223 378.304 417.413C376.506 420.144 374.638 422.831 372.696 425.467C372.259 421.778 371.709 418.099 371.049 414.437C374.128 412.31 377.139 410.093 380.079 407.791ZM521.941 407.792C524.881 410.094 527.893 412.31 530.972 414.437C530.311 418.099 529.762 421.777 529.324 425.466C527.383 422.831 525.514 420.145 523.717 417.414C523.041 414.224 522.447 411.016 521.941 407.792ZM534.976 399.791C541.906 401.627 548.964 403.069 556.117 404.106C551.799 409.855 547.838 415.825 544.247 421.982C539.974 419.519 535.807 416.893 531.758 414.11C532.637 409.305 533.711 404.528 534.976 399.791ZM367.045 399.791C368.309 404.528 369.384 409.305 370.263 414.11C366.214 416.893 362.047 419.518 357.773 421.981C354.182 415.824 350.22 409.855 345.902 404.106C353.056 403.069 360.114 401.627 367.045 399.791ZM387.671 401.519C385.119 406.387 382.351 411.142 379.375 415.769C379.952 412.907 380.461 410.031 380.902 407.143C383.204 405.32 385.46 403.445 387.671 401.519ZM514.35 401.519C516.56 403.445 518.817 405.32 521.118 407.143C521.559 410.03 522.068 412.905 522.645 415.767C519.669 411.141 516.901 406.387 514.35 401.519ZM381.602 395.298C381.266 399.134 380.81 402.955 380.235 406.756C377.201 409.151 374.091 411.455 370.907 413.662C370.036 408.945 368.978 404.255 367.736 399.604C372.42 398.344 377.046 396.908 381.602 395.298ZM520.418 395.297C524.974 396.907 529.6 398.344 534.284 399.604C533.043 404.255 531.985 408.945 531.113 413.662C527.93 411.455 524.819 409.151 521.785 406.756C521.211 402.954 520.754 399.133 520.418 395.297ZM169.387 332.044C191.448 361.14 222.25 384.023 259.247 396.324C221.004 388.631 182.792 393.176 149.017 407.435C130.477 392.973 114.774 375.099 102.863 354.769C123.428 343.068 146.04 335.375 169.387 332.044ZM732.633 332.044C755.98 335.375 778.592 343.068 799.157 354.77C787.247 375.1 771.544 392.973 753.005 407.435C719.23 393.176 681.018 388.63 642.775 396.323C679.772 384.022 710.572 361.139 732.633 332.044ZM392.801 390.933C391.471 393.915 390.061 396.861 388.576 399.768C386.127 401.944 383.622 404.059 381.059 406.106C381.598 402.432 382.027 398.739 382.345 395.033C385.874 393.769 389.36 392.401 392.801 390.933ZM509.219 390.932C512.659 392.4 516.146 393.768 519.675 395.032C519.993 398.739 520.422 402.432 520.962 406.106C518.398 404.059 515.893 401.943 513.443 399.767C511.959 396.86 510.548 393.914 509.219 390.932ZM170.204 331.932C209.892 326.446 251.654 333.549 289.046 354.959C311.356 367.733 329.997 384.389 344.603 403.57C320.972 406.84 296.321 405.637 271.819 399.291L270.653 398.985L269.489 398.672C228.305 387.45 194.131 363.346 170.204 331.932ZM612.975 354.959C650.367 333.549 692.128 326.446 731.816 331.932C707.665 363.641 673.072 387.902 631.368 398.984C606.483 405.597 581.423 406.892 557.418 403.57C572.023 384.389 590.665 367.733 612.975 354.959ZM299.355 360.449C318.85 370.076 339.329 376.018 359.94 378.504C362.664 385.255 364.972 392.132 366.86 399.099C359.831 400.96 352.67 402.416 345.411 403.453C332.935 386.995 317.508 372.378 299.355 360.449ZM602.662 360.45C584.511 372.379 569.084 386.996 556.608 403.453C549.35 402.416 542.189 400.96 535.16 399.099C537.049 392.132 539.356 385.255 542.079 378.504C562.69 376.018 583.169 370.077 602.662 360.45ZM360.751 378.599C367.932 379.433 375.126 379.851 382.3 379.857C382.285 384.758 382.076 389.647 381.671 394.515C377.034 396.163 372.323 397.628 367.553 398.911C365.691 392.042 363.422 385.26 360.751 378.599ZM541.269 378.599C538.598 385.26 536.33 392.042 534.468 398.911C529.697 397.628 524.986 396.162 520.349 394.514C519.944 389.647 519.735 384.757 519.72 379.857C526.893 379.851 534.088 379.433 541.269 378.599ZM401.767 386.824C398.033 390.869 394.122 394.749 390.043 398.451C391.346 395.836 392.588 393.19 393.767 390.516C396.463 389.347 399.13 388.116 401.767 386.824ZM500.252 386.823C502.888 388.115 505.556 389.347 508.253 390.516C509.432 393.19 510.674 395.835 511.977 398.45C507.898 394.748 503.985 390.868 500.252 386.823ZM80.0859 295.624C83.9748 316.711 91.454 336.554 101.876 354.505C83.7991 364.883 67.3172 378.36 53.3174 394.694C48.762 385.015 44.9916 374.811 42.1074 364.136C39.687 355.177 37.9756 346.196 36.9346 337.25C42.3462 330.019 48.3561 323.089 54.9688 316.531C62.8492 308.716 71.2604 301.748 80.0859 295.624ZM821.934 295.623C830.76 301.747 839.171 308.716 847.052 316.531C853.664 323.089 859.674 330.019 865.086 337.25C864.045 346.195 862.334 355.177 859.914 364.135C857.03 374.81 853.258 385.014 848.702 394.693C834.702 378.359 818.22 364.883 800.144 354.505C810.566 336.554 818.045 316.711 821.934 295.623ZM397.533 379.253C396.208 382.872 394.77 386.446 393.224 389.97C389.668 391.505 386.062 392.931 382.411 394.246C382.8 389.467 383.003 384.666 383.018 379.854C387.87 379.84 392.712 379.639 397.533 379.253ZM504.487 379.253C509.308 379.639 514.15 379.84 519.003 379.854C519.018 384.666 519.219 389.467 519.608 394.246C515.957 392.931 512.352 391.504 508.796 389.969C507.249 386.445 505.812 382.871 504.487 379.253ZM409.49 377.911C407.427 380.451 405.296 382.934 403.103 385.361C400.169 386.835 397.198 388.234 394.188 389.554C395.669 386.143 397.047 382.687 398.321 379.188C402.059 378.873 405.784 378.447 409.49 377.911ZM492.531 377.912C496.237 378.447 499.961 378.873 503.698 379.188C504.972 382.686 506.351 386.142 507.831 389.553C504.821 388.233 501.849 386.834 498.916 385.36C496.724 382.934 494.593 380.451 492.531 377.912ZM863.411 279.976C883.99 312.014 894.18 349.732 892.511 387.683C886.429 369.843 877.535 352.739 865.83 337.049C868.056 317.659 867.137 298.439 863.411 279.976ZM38.6094 279.976C34.8831 298.439 33.9634 317.66 36.1895 337.05C24.4851 352.739 15.5914 369.842 9.50977 387.681C7.84119 349.731 18.0311 312.014 38.6094 279.976ZM419.222 376.245C414.561 379.193 409.771 381.936 404.866 384.465C406.807 382.274 408.696 380.038 410.532 377.758C413.441 377.321 416.339 376.816 419.222 376.245ZM482.799 376.245C485.682 376.816 488.578 377.321 491.487 377.758C493.323 380.037 495.212 382.272 497.151 384.462C492.248 381.934 487.458 379.192 482.799 376.245ZM327.18 324.477C343.498 338.782 361.731 349.779 380.993 357.472C381.862 364.692 382.297 371.927 382.303 379.141C375.027 379.135 367.729 378.704 360.447 377.842C352.691 358.74 341.602 340.66 327.18 324.477ZM574.844 324.473C560.42 340.657 549.33 358.739 541.573 377.842C534.291 378.704 526.993 379.135 519.717 379.141C519.723 371.927 520.158 364.692 521.026 357.472C540.29 349.778 558.524 338.779 574.844 324.473ZM381.751 357.771C388.469 360.421 395.31 362.67 402.237 364.518C400.944 369.247 399.467 373.916 397.806 378.514C392.896 378.916 387.964 379.123 383.021 379.138C383.014 372.025 382.592 364.891 381.751 357.771ZM520.269 357.771C519.427 364.891 519.006 372.025 519 379.138C514.057 379.123 509.124 378.916 504.215 378.514C502.553 373.916 501.076 369.247 499.782 364.518C506.71 362.67 513.55 360.421 520.269 357.771ZM499.089 364.699C500.359 369.343 501.806 373.928 503.43 378.445C499.56 378.112 495.706 377.659 491.871 377.089C489.457 374.082 487.136 371 484.911 367.845C489.668 366.98 494.398 365.931 499.089 364.699ZM402.931 364.699C407.622 365.931 412.352 366.98 417.109 367.845C414.885 371 412.563 374.083 410.149 377.09C406.315 377.66 402.46 378.111 398.591 378.444C400.214 373.928 401.661 369.343 402.931 364.699ZM209.875 263.785C249.644 268.673 288.129 286.253 318.66 316.531C336.876 334.597 350.535 355.471 359.637 377.747C335.958 374.84 312.459 367.351 290.448 354.932L289.402 354.337L288.359 353.735C251.507 332.325 224.788 300.27 209.875 263.785ZM692.145 263.785C677.091 300.613 650.01 332.928 612.619 354.337C590.307 367.113 566.438 374.794 542.383 377.747C551.342 355.818 564.719 335.249 582.511 317.38L583.36 316.531C613.891 286.253 652.376 268.673 692.145 263.785ZM417.889 367.984C421.581 368.639 425.289 369.184 429.008 369.618C426.353 371.542 423.646 373.392 420.895 375.174C417.677 375.844 414.442 376.433 411.191 376.935C413.511 374.02 415.745 371.036 417.889 367.984ZM484.132 367.984C486.275 371.036 488.509 374.02 490.828 376.935C487.578 376.433 484.343 375.844 481.126 375.174C478.375 373.392 475.668 371.542 473.013 369.618C476.732 369.184 480.44 368.639 484.132 367.984ZM471.962 369.736C474.33 371.467 476.738 373.141 479.183 374.759C473.788 373.576 468.447 372.156 463.179 370.506C466.111 370.318 469.039 370.061 471.962 369.736ZM430.057 369.737C432.979 370.062 435.908 370.318 438.841 370.506C433.573 372.156 428.233 373.575 422.839 374.758C425.283 373.141 427.69 371.467 430.057 369.737ZM451.01 367.001C453.748 368.065 456.51 369.064 459.294 369.999C453.774 370.241 448.246 370.241 442.726 369.999C445.509 369.064 448.271 368.065 451.01 367.001ZM439.713 362.185C443.107 363.765 446.546 365.243 450.023 366.616C446.957 367.793 443.86 368.886 440.737 369.9C437.456 369.722 434.179 369.461 430.909 369.111C433.91 366.892 436.846 364.582 439.713 362.185ZM462.307 362.185C465.173 364.582 468.109 366.892 471.11 369.111C467.841 369.461 464.564 369.722 461.283 369.9C458.161 368.886 455.063 367.793 451.996 366.616C455.474 365.243 458.912 363.765 462.307 362.185ZM426.122 355.172C430.331 357.565 434.625 359.793 438.994 361.849C436.022 364.325 432.976 366.708 429.859 368.993C426.007 368.559 422.166 368.007 418.342 367.336C421.089 363.389 423.684 359.332 426.122 355.172ZM475.897 355.172C478.336 359.332 480.931 363.389 483.678 367.336C479.854 368.007 476.013 368.56 472.161 368.993C469.045 366.708 465.998 364.326 463.025 361.849C467.394 359.793 471.688 357.565 475.897 355.172ZM407.472 343.044C413.269 347.327 419.289 351.256 425.498 354.818C423.014 359.055 420.369 363.186 417.564 367.2C412.718 366.328 407.899 365.262 403.121 364.008C404.971 357.136 406.426 350.137 407.472 343.044ZM494.548 343.044C495.593 350.137 497.048 357.136 498.898 364.008C494.12 365.262 489.303 366.328 484.456 367.2C481.651 363.186 479.005 359.055 476.521 354.818C482.731 351.256 488.75 347.327 494.548 343.044ZM451.01 351.922C454.451 355.314 458.016 358.568 461.699 361.675C458.181 363.304 454.617 364.824 451.01 366.231C447.403 364.824 443.838 363.304 440.32 361.675C444.003 358.568 447.569 355.314 451.01 351.922ZM363.442 296.864C375.473 314.876 390.217 330.182 406.818 342.56C405.773 349.757 404.304 356.857 402.428 363.826C395.401 361.953 388.465 359.664 381.655 356.962C379.147 336.516 373.154 316.201 363.442 296.864ZM538.579 296.862C528.867 316.2 522.872 336.516 520.364 356.962C513.555 359.663 506.619 361.953 499.593 363.826C497.716 356.857 496.247 349.757 495.202 342.56C511.804 330.182 526.548 314.874 538.579 296.862ZM436.159 335.419C440.641 341.044 445.431 346.385 450.499 351.42C446.994 354.875 443.36 358.186 439.603 361.344C435.149 359.258 430.774 356.992 426.486 354.554C430.067 348.39 433.298 342.002 436.159 335.419ZM465.86 335.42C468.721 342.003 471.953 348.39 475.534 354.554C471.246 356.992 466.871 359.258 462.417 361.344C458.66 358.186 455.025 354.875 451.521 351.42C456.588 346.385 461.378 341.045 465.86 335.42ZM265.98 208.143C303.119 223.071 335.705 249.931 357.294 287.015C370.175 309.14 377.92 332.809 380.897 356.663C358.783 347.777 338.041 334.511 320.021 316.865L319.165 316.022L318.315 315.175C288.306 285.035 270.863 247.213 265.98 208.143ZM636.04 208.142C631.157 247.212 613.715 285.033 583.706 315.174L582.856 316.022C564.638 334.09 543.587 347.636 521.122 356.663C524.1 332.809 531.847 309.141 544.728 287.015C566.316 249.931 598.901 223.07 636.04 208.142ZM405.68 279.508C412.6 299.995 422.847 318.566 435.653 334.784C432.765 341.468 429.493 347.95 425.861 354.2C419.564 350.587 413.462 346.595 407.59 342.238C410.503 321.844 410.015 300.681 405.68 279.508ZM496.342 279.502C492.005 300.677 491.516 321.842 494.43 342.238C488.558 346.595 482.456 350.587 476.158 354.2C472.526 347.949 469.254 341.467 466.366 334.783C479.173 318.564 489.422 299.991 496.342 279.502ZM763.845 268.741C784.039 274.132 803.497 282.945 821.288 295.178C817.431 316.303 809.956 336.179 799.521 354.151C778.989 342.468 756.425 334.766 733.124 331.392C747.193 312.667 757.657 291.399 763.845 268.741ZM138.176 268.741C144.364 291.399 154.826 312.667 168.896 331.392C145.595 334.766 123.031 342.467 102.5 354.15C92.0648 336.178 84.5899 316.303 80.7324 295.178C98.5232 282.945 117.982 274.132 138.176 268.741ZM451.01 273.58C452.347 295.148 457.399 315.719 465.537 334.674C461.002 340.389 456.15 345.811 451.01 350.917C445.87 345.811 441.017 340.389 436.482 334.674C444.62 315.719 449.673 295.148 451.01 273.58ZM138.869 268.56C161.788 262.535 185.637 260.909 209.059 263.684C222.776 297.454 246.558 327.465 279.089 348.844C244.154 331.592 206.053 326.172 169.704 331.275C155.572 312.548 145.068 291.254 138.869 268.56ZM692.96 263.684C716.381 260.908 740.231 262.536 763.15 268.56C756.952 291.254 746.449 312.549 732.316 331.276C695.967 326.172 657.866 331.592 622.931 348.844C655.461 327.465 679.242 297.453 692.96 263.684ZM334.694 168.797C366.672 192.75 391.138 227.059 402.313 268.42C408.981 293.098 410.286 317.949 406.937 341.755C387.895 327.496 371.32 309.358 358.52 287.688L357.913 286.654L357.313 285.616C336.193 248.8 329.214 207.79 334.694 168.797ZM567.325 168.797C572.857 208.157 565.695 249.571 544.107 286.653C531.225 308.781 514.428 327.269 495.084 341.755C491.735 317.949 493.039 293.098 499.707 268.419C510.882 227.058 535.348 192.75 567.325 168.797ZM769.716 205.583C779.839 209.233 789.782 213.805 799.434 219.331C807.532 223.968 815.146 229.119 822.26 234.714C823.589 243.622 824.281 252.738 824.281 262.013C824.281 273.064 823.302 283.888 821.428 294.405C803.642 282.221 784.204 273.433 764.034 268.049C769.416 248.035 771.462 226.95 769.716 205.583ZM77.0225 262.013C77.0225 273.218 78.0231 284.191 79.9414 294.85C70.9855 301.041 62.4542 308.099 54.4648 316.022C48.0113 322.423 42.1285 329.175 36.8145 336.216C34.6365 316.526 35.7167 297.019 39.6875 278.316C50.2152 262.307 63.3607 247.757 78.9404 235.361C77.6787 244.065 77.0225 252.963 77.0225 262.013ZM450.652 262.013C450.652 287.563 445.426 311.902 435.978 334.038C421.074 315.081 409.673 292.912 403.005 268.232C391.83 226.873 395.721 185.029 411.337 148.43C435.973 179.774 450.652 219.193 450.652 262.013ZM705.873 194.529C705.808 218.042 701.22 241.307 692.456 263.023C656.009 267.424 620.617 282.442 591.372 308.08C617.221 279.077 632.364 243.98 636.802 207.835C658.701 199.143 682.163 194.593 705.873 194.529ZM196.147 194.529C219.858 194.593 243.32 199.144 265.219 207.836C269.656 243.979 284.798 279.075 310.645 308.077C281.4 282.441 246.009 267.424 209.563 263.023C200.8 241.307 196.212 218.041 196.147 194.529ZM270.794 137.724C293.68 143.871 315.154 154.289 334.039 168.306C328.893 204.36 334.361 242.151 351.763 276.802C330.205 244.528 299.937 220.935 265.878 207.328C263.08 184.102 264.72 160.451 270.794 137.724ZM631.226 137.724C637.299 160.451 638.94 184.101 636.143 207.327C602.084 220.934 571.816 244.528 550.258 276.802C567.66 242.15 573.127 204.359 567.98 168.305C586.865 154.288 608.34 143.871 631.226 137.724ZM96.3232 179.825C87.9068 196.702 82.0026 215.029 79.0928 234.328C63.6926 246.479 50.6384 260.716 40.1084 276.386C48.4008 239.303 68.0868 205.489 96.3232 179.825ZM805.696 179.823C833.933 205.487 853.62 239.302 861.912 276.385C851.382 260.715 838.328 246.478 822.928 234.328C820.018 215.028 814.113 196.7 805.696 179.823ZM195.43 194.526C195.494 218.001 200.051 241.229 208.754 262.928C185.366 260.206 161.56 261.854 138.679 267.869C133.29 247.831 131.258 226.714 133.045 205.318C153.422 198.068 174.517 194.55 195.43 194.526ZM706.59 194.526C727.503 194.55 748.598 198.068 768.976 205.318C770.763 226.713 768.73 247.83 763.341 267.868C740.459 261.853 716.653 260.206 693.265 262.928C701.968 241.229 706.526 218.001 706.59 194.526ZM357.724 102.014C378.225 113.826 396.249 129.399 410.832 147.785C396.45 181.294 391.869 219.207 399.64 257.149C387.24 220.436 364.158 189.873 334.808 167.985C338.167 144.832 345.925 122.408 357.724 102.014ZM544.296 102.014C556.095 122.408 563.853 144.832 567.212 167.985C537.863 189.873 514.781 220.434 502.381 257.146C510.15 219.204 505.57 181.294 491.188 147.786C505.771 129.4 523.795 113.826 544.296 102.014ZM451.01 89.834C467.729 106.505 481.075 126.174 490.362 147.676C467.724 176.352 453.406 211.799 451.01 250.444C448.614 211.798 434.295 176.352 411.657 147.676C420.944 126.174 434.29 106.505 451.01 89.834ZM146.923 147.081C143.433 155.163 140.479 163.589 138.117 172.329C135.193 183.153 133.296 194.01 132.367 204.798C122.1 208.479 112.017 213.106 102.231 218.709C94.3278 223.234 86.8842 228.247 79.9141 233.684C82.949 214.107 89.0822 195.543 97.7979 178.498C112.145 165.736 128.639 155.056 146.923 147.081ZM755.096 147.079C773.38 155.054 789.875 165.734 804.222 178.496C812.938 195.542 819.07 214.105 822.105 233.683C815.136 228.247 807.693 223.234 799.79 218.709C790.004 213.106 779.92 208.479 769.652 204.797C768.724 194.009 766.828 183.152 763.903 172.328C761.542 163.587 758.586 155.162 755.096 147.079ZM207.025 131.949C228.601 130.176 249.896 132.192 270.103 137.537C264.038 160.228 262.378 183.835 265.122 207.028C243.241 198.395 219.816 193.876 196.145 193.812C196.169 173.075 199.716 152.156 207.025 131.949ZM631.917 137.536C652.124 132.191 673.419 130.176 694.994 131.948C702.304 152.155 705.852 173.074 705.876 193.812C682.204 193.876 658.779 198.395 636.898 207.027C639.643 183.834 637.981 160.227 631.917 137.536ZM206.24 132.016C198.978 152.205 195.451 173.097 195.427 193.81C174.539 193.833 153.471 197.332 133.111 204.536C134.046 193.896 135.926 183.19 138.81 172.516C141.23 163.557 144.276 154.931 147.885 146.668C156.218 143.089 164.917 140.067 173.951 137.666C184.715 134.806 195.511 132.943 206.24 132.016ZM695.779 132.015C706.509 132.942 717.306 134.805 728.07 137.665C737.104 140.066 745.802 143.087 754.135 146.666C757.744 154.93 760.791 163.557 763.212 172.516C766.096 183.189 767.974 193.895 768.909 204.535C748.549 197.331 727.481 193.833 706.593 193.81C706.569 173.097 703.042 152.204 695.779 132.015ZM178.207 97.8975C165.673 112.038 155.188 128.226 147.341 146.12C129.295 153.903 112.97 164.305 98.71 176.737C116.397 143.048 144.236 115.439 178.207 97.8975ZM723.814 97.8984C757.784 115.439 785.621 143.047 803.309 176.734C789.048 164.302 772.724 153.901 754.679 146.118C746.832 128.225 736.347 112.039 723.814 97.8984ZM297.635 80.0674C318.937 83.8927 338.98 91.3054 357.103 101.654C345.323 122.016 337.558 144.394 334.156 167.502C315.274 153.547 293.826 143.168 270.978 137.031C276.413 117.006 285.3 97.7099 297.635 80.0674ZM604.385 80.0674C616.72 97.7099 625.606 117.005 631.042 137.031C608.193 143.169 586.746 153.546 567.863 167.502C564.461 144.394 556.697 122.017 544.917 101.655C563.04 91.3061 583.082 83.8929 604.385 80.0674ZM398.695 53.2119C418.273 62.3746 435.698 74.6792 450.503 89.3271C433.811 105.972 420.47 125.593 411.153 147.041C396.556 128.715 378.549 113.185 358.081 101.393C368.558 83.4447 382.177 67.0872 398.695 53.2119ZM503.323 53.2119C519.842 67.0872 533.462 83.4445 543.938 101.393C523.471 113.185 505.463 128.715 490.866 147.041C481.55 125.593 468.209 105.972 451.517 89.3271C466.321 74.6792 483.746 62.3747 503.323 53.2119ZM235.629 79.2568C230.149 86.1673 225.097 93.547 220.535 101.383C214.885 111.088 210.219 121.088 206.507 131.271C195.629 132.191 184.681 134.073 173.767 136.974C164.952 139.316 156.454 142.246 148.304 145.708C156.345 127.577 167.114 111.22 179.981 96.9932C197.169 88.3494 215.888 82.2668 235.629 79.2568ZM666.391 79.2568C686.132 82.2668 704.851 88.3501 722.039 96.9941C734.906 111.221 745.674 127.577 753.715 145.707C745.565 142.246 737.068 139.315 728.254 136.973C717.339 134.072 706.391 132.19 695.513 131.27C691.8 121.087 687.135 111.087 681.485 101.383C676.924 93.5468 671.87 86.1675 666.391 79.2568ZM264.196 77.1006C275.339 77.1006 286.253 78.0714 296.858 79.9297C284.574 97.5674 275.715 116.842 270.286 136.844C250.104 131.505 228.841 129.476 207.295 131.209C210.975 121.172 215.583 111.314 221.154 101.744C225.83 93.7117 231.025 86.1604 236.668 79.1045C245.651 77.7862 254.843 77.1006 264.196 77.1006ZM637.825 77.1006C647.178 77.1006 656.369 77.7862 665.353 79.1045C670.995 86.1604 676.19 93.7108 680.866 101.743C686.437 111.312 691.045 121.171 694.725 131.208C673.179 129.476 651.916 131.505 631.733 136.844C626.304 116.842 617.447 97.5665 605.162 79.9287C615.767 78.0704 626.682 77.1006 637.825 77.1006ZM561.961 36.6318C569.253 41.9994 576.243 47.9595 582.856 54.5186C590.735 62.3317 597.758 70.6719 603.932 79.4219C582.668 83.2791 562.659 90.6971 544.559 101.034C534.095 83.1074 520.508 66.7617 504.039 52.8779C513.798 48.361 524.087 44.6218 534.85 41.7617C543.883 39.3612 552.94 37.6643 561.961 36.6318ZM340.058 36.6328C349.079 37.6652 358.137 39.362 367.171 41.7627C377.933 44.6227 388.222 48.3622 397.98 52.8789C381.512 66.7626 367.924 83.1067 357.46 101.033C339.359 90.6966 319.351 83.2789 298.088 79.4219C304.261 70.6717 311.287 62.3319 319.165 54.5186C325.778 47.9602 332.766 41.9999 340.058 36.6328ZM278.681 39.7812C262.885 50.223 248.532 63.1667 236.283 78.4365C216.823 81.3223 198.342 87.1778 181.324 95.5254C207.2 67.5269 241.293 48.0055 278.681 39.7812ZM623.34 39.7812C660.728 48.0056 694.822 67.5265 720.697 95.5254C703.679 87.1775 685.197 81.3213 665.736 78.4355C653.488 63.1662 639.136 50.2228 623.34 39.7812ZM451.01 22.1465C459.454 25.4593 467.76 29.4227 475.86 34.0605C485.509 39.5854 494.471 45.8378 502.718 52.7051C483.186 61.8887 465.796 74.1897 451.01 88.8203C436.223 74.1896 418.833 61.8886 399.301 52.7051C407.548 45.8374 416.511 39.5857 426.16 34.0605C434.26 29.4229 442.566 25.4592 451.01 22.1465ZM280.634 39.3623C299.491 35.4248 319.159 34.3545 339.012 36.5137C331.916 41.7818 325.111 47.6126 318.66 54.0098C310.67 61.9336 303.554 70.3958 297.311 79.2783C286.562 77.3753 275.496 76.3838 264.196 76.3838C255.072 76.3838 246.1 77.0339 237.324 78.2852C249.823 62.8368 264.492 49.8017 280.634 39.3623ZM563.007 36.5127C582.861 34.3532 602.529 35.4237 621.387 39.3613C637.528 49.8008 652.198 62.8366 664.696 78.2852C655.921 77.0339 646.95 76.3838 637.825 76.3838C626.525 76.3838 615.459 77.3754 604.711 79.2783C598.468 70.3957 591.35 61.9337 583.36 54.0098C576.909 47.6121 570.103 41.7811 563.007 36.5127ZM392.897 9.5293C412.14 10.5661 431.416 14.5804 450.029 21.7617C441.8 25.0292 433.704 28.9148 425.804 33.4385C416.018 39.0418 406.935 45.3893 398.586 52.3672C388.7 47.7701 378.27 43.9708 367.355 41.0703C358.543 38.7284 349.708 37.0536 340.905 36.0098C357.01 24.2957 374.582 15.4699 392.897 9.5293ZM509.123 9.5293C527.438 15.4697 545.009 24.2953 561.113 36.0088C552.312 37.0527 543.477 38.7276 534.665 41.0693C523.75 43.9698 513.32 47.7691 503.435 52.3662C495.086 45.3886 486.003 39.0417 476.217 33.4385C468.316 28.9146 460.22 25.0292 451.99 21.7617C470.603 14.5802 489.881 10.5661 509.123 9.5293ZM511.12 9.43262C549.379 7.78032 587.404 17.8853 619.704 38.2871C601.088 34.5926 581.71 33.6799 562.16 35.8877C546.344 24.2826 529.103 15.4639 511.12 9.43262ZM282.317 38.2861C314.617 17.8852 352.64 7.78178 390.898 9.43359C372.916 15.465 355.675 24.2827 339.859 35.8877C320.311 33.6801 300.932 34.5919 282.317 38.2861ZM394.804 8.92285C431.326 -2.49262 470.691 -2.49291 507.214 8.92188C488.27 10.132 469.315 14.2251 451.01 21.375C432.704 14.225 413.748 10.1327 394.804 8.92285ZM77.7393 632.554C77.7393 621.502 78.7186 610.677 80.5928 600.159C98.3786 612.344 117.816 621.131 137.985 626.516C132.603 646.529 130.557 667.615 132.304 688.981C122.181 685.332 112.238 680.76 102.587 675.234C94.4878 670.597 86.8743 665.445 79.7598 659.85C78.4308 650.942 77.7393 641.828 77.7393 632.554ZM451.369 632.554C451.369 607.004 456.594 582.664 466.043 560.528C480.947 579.485 492.348 601.655 499.016 626.335C510.19 667.695 506.299 709.537 490.683 746.136C466.276 715.084 451.644 676.107 451.373 633.75L451.369 632.554ZM824.998 632.554C824.998 621.348 823.997 610.374 822.078 599.716C831.034 593.524 839.567 586.468 847.557 578.544C854.01 572.144 859.891 565.39 865.205 558.35C867.383 578.039 866.304 597.546 862.334 616.248C851.806 632.258 838.66 646.808 823.08 659.204C824.342 650.501 824.998 641.603 824.998 632.554ZM77.7393 262.013C77.7393 252.738 78.4307 243.624 79.7598 234.716C86.8744 229.12 94.4886 223.969 102.588 219.331C112.239 213.805 122.181 209.234 132.304 205.584C130.557 226.951 132.603 248.037 137.985 268.051C117.816 273.435 98.3785 282.222 80.5928 294.406C78.7187 283.888 77.7393 273.064 77.7393 262.013ZM451.373 260.816C451.644 218.459 466.276 179.482 490.683 148.43C506.295 185.02 510.188 226.852 499.023 268.202L499.016 268.232C492.348 292.912 480.947 315.08 466.043 334.037C456.742 312.247 451.533 288.321 451.373 263.208L451.369 262.013L451.373 260.816ZM824.998 262.013C824.998 252.963 824.342 244.064 823.08 235.36C838.661 247.757 851.806 262.307 862.334 278.317C866.305 297.02 867.383 316.527 865.205 336.217C859.891 329.176 854.01 322.423 847.557 316.022C839.567 308.099 831.034 301.041 822.078 294.85C823.996 284.191 824.998 273.218 824.998 262.013Z"
                  stroke="#F5F5F5"
                  stroke-opacity="0.15"
                  stroke-width="0.7168"
                ></path></svg></div
            ><div class="z-10 relative w-fit h-fit shrink-0" style="will-change: transform, filter, opacity"
              ><svg width="54" height="55" viewBox="0 0 54 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M26.6816 55C22.4084 50.5975 20.605 44.5849 21.29 38.8359C19.0727 40.3552 16.3294 41.2537 13.3594 41.2539L13.3594 39.8096C13.3595 37.4651 14.0681 35.2743 15.2969 33.4092C10.0253 33.9921 4.55356 32.2031 0.512697 28.04L-0.000974451 27.5107C4.23184 23.15 9.99828 21.2855 15.5303 21.9365C14.1564 19.999 13.3564 17.6815 13.3564 15.1904L13.3564 13.7461C16.3368 13.746 19.0883 14.6511 21.3096 16.1797C20.6194 10.426 22.4221 4.40646 26.6992 -2.17597e-06C30.9759 4.40617 32.7787 10.4254 32.0889 16.1787C34.3098 14.651 37.0599 13.7453 40.0391 13.7451L40.0391 15.6152C40.039 17.9206 39.3278 20.0716 38.1006 21.8936C43.5551 21.3278 49.2105 23.2007 53.3789 27.4951L52.8652 28.0244C48.8273 32.1843 43.3607 33.9736 38.0928 33.3945C39.3271 35.2626 40.0392 37.4592 40.0391 39.8096L40.0391 41.2539C37.0522 41.254 34.2941 40.3452 32.0703 38.8105C32.7637 44.5671 30.961 50.5911 26.6816 55ZM26.7002 27.5264C26.7039 27.5203 26.7088 27.5158 26.7148 27.5117C26.713 27.5032 26.7119 27.4949 26.7129 27.4863C26.7088 27.4831 26.7062 27.4787 26.7031 27.4746C26.7009 27.4747 26.6986 27.4747 26.6963 27.4746C26.6896 27.4853 26.6781 27.4935 26.665 27.4971C26.6654 27.499 26.6658 27.5009 26.666 27.5029C26.6808 27.5063 26.6932 27.5142 26.7002 27.5264Z"
                  fill="white"
                ></path></svg></div
            ><div class="z-10 relative flex flex-wrap justify-center items-center gap-3"
              ><a
                href="https://indus.sarvam.ai"
                target="_blank"
                rel="noopener noreferrer"
                class="group relative inline-flex items-center justify-center cursor-pointer font-matter font-medium overflow-hidden rounded-full touch-manipulation disabled:opacity-40 disabled:pointer-events-none min-h-[40px] text-white bg-[#2a2c33] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_0_rgba(0,0,0,0.2)] active:scale-[0.97] active:duration-150 transition-[background-color,box-shadow] duration-350 ease-[cubic-bezier(0.2,0,0,1)] px-5 py-2.5 text-base"
                ><span
                  aria-hidden="true"
                  class="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-[cubic-bezier(0.2,0,0,1)] bg-[radial-gradient(circle_80px_at_var(--gx)_var(--gy),rgba(255,255,255,0.16)_0%,transparent_100%)]"
                  style="--gx: 50%; --gy: 50%"
                ></span
                ><span class="relative z-10 flex items-center gap-2">Sign Up</span></a
              ></div
            ></div
          ></div
        ><!--astro:end--></astro-island
      >
    </section>
  </div>
  <div class="relative bg-sf -mb-4 border-sf-tertiary border-b rounded-b-4xl w-full h-16 md:h-28"></div>
</main>
<astro-island
  uid="1bPykh"
  prefix="r24"
  component-url="/_astro/Footer.Dx_gbudI.js"
  component-export="default"
  renderer-url="/_astro/client.B3N4hhPH.js"
  props="{}"
  ssr
  client="load"
  opts='{"name":"Footer","value":true}'
  await-children
  ><footer
    class="relative flex flex-col bg-gradient-to-b from-white to-sf-secondary gap-12 md:gap-24 items-center justify-between border-t pt-12 md:pt-20 border-st-secondary mx-auto overflow-hidden w-screen"
    ><div class="relative z-10 mx-auto w-10/12 2xl:max-w-width-mx"
      ><div class="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-8 lg:gap-24"
        ><div class="flex flex-col gap-8 md:gap-10 shrink-0 w-full md:w-[182px] relative z-10"
          ><div class="flex flex-col gap-5 md:gap-4"
            ><a href="" class="w-fit"
              ><img
                src="cdn/assets/brand/logos/sarvam-wordmark-black.svg"
                alt="Sarvam AI"
                class="w-[151px] h-auto" /></a
            ><p class="font-matter font-normal text-xs text-tx-tertiary leading-none whitespace-nowrap w-fit"
              >AI for all from India</p
            ><div class="flex gap-3 w-fit"
              ><div class="flex justify-center items-center bg-sr-grey-50 rounded-xl w-16 h-16 overflow-hidden"
                ><img
                  src="cdn/tr_q-70_f-auto_dpr-auto/assets/misc/sec-iso.png"
                  alt="ISO Certified"
                  class="w-10 h-10 object-contain" /></div
              ><div class="flex justify-center items-center bg-sr-grey-50 rounded-xl w-16 h-16 overflow-hidden"
                ><img
                  src="cdn/tr_q-70_f-auto_dpr-auto/assets/misc/sec-soc2.png"
                  alt="SOC 2 Type II"
                  class="w-10 h-10 object-contain" /></div></div></div
          ><div class="flex flex-col gap-4 md:gap-3"
            ><p class="font-matter font-normal text-xs text-tx-tertiary leading-[18px]">Find us at</p
            ><div class="flex items-center gap-3"
              ><a
                href="https://www.linkedin.com/company/sarvam-ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                class="group text-tx-tertiary transition-colors duration-200"
                style="--hover-color: #0a66c2"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  class="group-hover:[color:var(--hover-color)] transition-colors duration-200"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  /></svg></a
              ><a
                href="https://x.com/SarvamAI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                class="group text-tx-tertiary transition-colors duration-200"
                style="--hover-color: #000000"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  class="group-hover:[color:var(--hover-color)] transition-colors duration-200"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584l-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
                  /></svg></a
              ><a
                href="https://youtube.com/@sarvamai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                class="group text-tx-tertiary transition-colors duration-200"
                style="--hover-color: #ff0000"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  class="group-hover:[color:var(--hover-color)] transition-colors duration-200"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                  /></svg></a
              ><a
                href="https://github.com/sarvamai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                class="group text-tx-tertiary transition-colors duration-200"
                style="--hover-color: #181717"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  class="group-hover:[color:var(--hover-color)] transition-colors duration-200"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  /></svg></a
              ><a
                href="https://discord.com/invite/5rAsykttcs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                class="group text-tx-tertiary transition-colors duration-200"
                style="--hover-color: #5865f2"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  class="group-hover:[color:var(--hover-color)] transition-colors duration-200"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418Z"
                  /></svg></a
              ><a
                href="https://www.instagram.com/sarvam.ai_official"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                class="group text-tx-tertiary transition-colors duration-200"
                style="--hover-color: #e4405f"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  class="group-hover:[color:var(--hover-color)] transition-colors duration-200"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 0C8.74 0 8.333.015 7.053.072C5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053C.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 0 0 1.384 2.126A5.868 5.868 0 0 0 4.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 0 0 2.126-1.384a5.86 5.86 0 0 0 1.384-2.126c.296-.765.499-1.636.558-2.913c.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 0 0-1.384-2.126A5.847 5.847 0 0 0 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071c1.17.055 1.805.249 2.227.415c.562.217.96.477 1.382.896c.419.42.679.819.896 1.381c.164.422.36 1.057.413 2.227c.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.899 1.382a3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.235.413c-1.274.057-1.649.07-4.859.07c-3.211 0-3.586-.015-4.859-.074c-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 0 1-1.379-.899a3.644 3.644 0 0 1-.9-1.38c-.165-.42-.359-1.065-.42-2.235c-.045-1.26-.061-1.649-.061-4.844c0-3.196.016-3.586.061-4.861c.061-1.17.255-1.814.42-2.234c.21-.57.479-.96.9-1.381c.419-.419.81-.689 1.379-.898c.42-.166 1.051-.361 2.221-.421c1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324a6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 0 1-2.88 0a1.44 1.44 0 0 1 2.88 0z"
                  /></svg></a></div></div
          ><div class="border border-st p-3 w-full"
            ><div class="flex flex-col gap-5 font-matter font-normal text-xs text-tx-tertiary leading-[1.5] w-full"
              ><p>© 2026 Axonwise Private Limited. All rights reserved.</p
              ><p>732, Chinmaya Mission Hospital Road, Indiranagar Stage 1, Bengaluru, Karnataka 560038</p></div
            ></div
          ></div
        ><div class="flex flex-col gap-12 w-full min-w-0 md:flex-1"
          ><div class="grid grid-cols-2 sm:grid-cols-3 md:flex md:justify-between gap-4 w-full min-w-0"
            ><div class="flex flex-col gap-6 md:min-w-0 p-6 border border-st-secondary md:p-0 md:border-none"
              ><h3 class="font-matter-mono font-normal text-xs text-tx uppercase leading-[18px]">Products</h3
              ><ul class="flex flex-col gap-[10px] font-matter font-normal"
                ><li
                  ><a
                    href="products/voice-agents"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Voice Agents</a
                  ></li
                ><li
                  ><a
                    href="products/content-agents"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Content Studio</a
                  ></li
                ><li
                  ><a
                    href="products/doc-agents"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Doc Agents</a
                  ></li
                ><li
                  ><a
                    href="products/work-agents"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Work Agents</a
                  ></li
                ><li
                  ><a
                    href="products/coding-agents"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Coding Agents</a
                  ></li
                ><li
                  ><a
                    href="products/edge"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Sarvam Edge</a
                  ></li
                ><li
                  ><a
                    href="products/model-training"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Model Training</a
                  ></li
                ></ul
              ></div
            ><div class="flex flex-col gap-6 md:min-w-0 p-6 border border-st-secondary md:p-0 md:border-none"
              ><h3 class="font-matter-mono font-normal text-xs text-tx uppercase leading-[18px]">APIs</h3
              ><ul class="flex flex-col gap-[10px] font-matter font-normal"
                ><li
                  ><a
                    href="apis/text-to-speech"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Text to Speech</a
                  ></li
                ><li
                  ><a
                    href="apis/speech-to-text"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Speech to Text</a
                  ></li
                ><li
                  ><a
                    href="apis/document-digitisation"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Doc Digitisation</a
                  ></li
                ><li
                  ><a
                    href="apis/translation"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Translation</a
                  ></li
                ><li
                  ><a
                    href="models"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Models</a
                  ></li
                ></ul
              ></div
            ><div class="flex flex-col gap-6 md:min-w-0 p-6 border border-st-secondary md:p-0 md:border-none"
              ><h3 class="font-matter-mono font-normal text-xs text-tx uppercase leading-[18px]">Resources</h3
              ><ul class="flex flex-col gap-[10px] font-matter font-normal"
                ><li
                  ><a
                    href="blogs"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Blogs</a
                  ></li
                ><li
                  ><a
                    href="events"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Events</a
                  ></li
                ><li
                  ><a
                    href="stories"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Customer Stories</a
                  ></li
                ><li
                  ><a
                    href="https://docs.sarvam.ai/sarvam-api-docs"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Documentation</a
                  ></li
                ><li
                  ><a
                    href="api-pricing"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >API Pricing</a
                  ></li
                ><li
                  ><a
                    href="integrations"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Integrations</a
                  ></li
                ><li
                  ><a
                    href="startup-program"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Startup Program</a
                  ></li
                ><li
                  ><a
                    href="sarvam-champions"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Sarvam Champions</a
                  ></li
                ></ul
              ></div
            ><div class="flex flex-col gap-6 md:min-w-0 p-6 border border-st-secondary md:p-0 md:border-none"
              ><h3 class="font-matter-mono font-normal text-xs text-tx uppercase leading-[18px]">Company</h3
              ><ul class="flex flex-col gap-[10px] font-matter font-normal"
                ><li
                  ><a
                    href="about-us"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >About Us</a
                  ></li
                ><li
                  ><a
                    href="careers"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Careers</a
                  ></li
                ><li
                  ><a
                    href="contact-us"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Contact Us</a
                  ></li
                ><li
                  ><a
                    href="brand"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Brand</a
                  ></li
                ><li
                  ><a
                    href="brand-guidelines"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Brand Guidelines</a
                  ></li
                ><li
                  ><a
                    href="partnerships"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Partnerships</a
                  ></li
                ></ul
              ></div
            ><div class="flex flex-col gap-6 md:min-w-0 p-6 border border-st-secondary md:p-0 md:border-none"
              ><h3 class="font-matter-mono font-normal text-xs text-tx uppercase leading-[18px]">Legal</h3
              ><ul class="flex flex-col gap-[10px] font-matter font-normal"
                ><li
                  ><a
                    href="trust-center"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Trust Center</a
                  ></li
                ><li
                  ><a
                    href="terms-of-service"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Terms of Service</a
                  ></li
                ><li
                  ><a
                    href="privacy-policy"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >Privacy Policy</a
                  ></li
                ><li
                  ><a
                    href="eula"
                    class="block text-base text-tx-tertiary hover:text-sr-indigo-800 leading-6 transition-colors duration-200"
                    >EULA</a
                  ></li
                ></ul
              ></div
            ></div
          ></div
        ></div
      ></div
    ><div class="relative -mt-24 md:-mt-0 -mb-2 md:-mb-5 mx-auto w-auto 2xl:max-w-width-mx" aria-hidden="true"
      ><div class="hidden md:block"
        ><video
          class="w-full aspect-[202/32] 2xl:max-w-width-mx object-cover"
          style="
            -webkit-mask-image: url(cdn/assets/brand/logos/sarvam-wordmark-black.svg);
            mask-image: url(cdn/assets/brand/logos/sarvam-wordmark-black.svg);
            -webkit-mask-size: contain;
            mask-size: contain;
            -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
            -webkit-mask-position: center;
            mask-position: center;
          "
          src="cdn/assets/solutions/indian-art-mask.mp4"
          loop=""
          muted=""
          playsinline=""
          preload="none"
          disablePictureInPicture=""
          aria-hidden="true"
        ></video></div
      ><div class="block md:hidden overflow-hidden translate-y-1/3"
        ><video
          class="w-full aspect-square 2xl:max-w-width-mx object-cover"
          style="
            -webkit-mask-image: url(cdn/assets/brand/logos/sarvam-logo-black.svg);
            mask-image: url(cdn/assets/brand/logos/sarvam-logo-black.svg);
            -webkit-mask-size: contain;
            mask-size: contain;
            -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
            -webkit-mask-position: center;
            mask-position: center;
          "
          src="cdn/assets/solutions/indian-art-mask.mp4"
          loop=""
          muted=""
          playsinline=""
          preload="none"
          disablePictureInPicture=""
          aria-hidden="true"
        ></video></div></div></footer
  ><!--astro:end--></astro-island
>
<script>
  (() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveal = (el) => {
      el.classList.add("is-revealed");
    };

    const revealStaggeredChildren = (container) => {
      const children = container.querySelectorAll(":scope > *");
      children.forEach((child, index) => {
        child.style.transitionDelay = \`\${index * 120}ms\`;
        reveal(child);
      });
    };

    const isInsideReactIsland = (el) => el.closest("astro-island") !== null;

    const initReveals = () => {
      const revealElements = Array.from(
        document.querySelectorAll(".section-heading-reveal, [data-section-reveal], [data-scale-reveal]"),
      ).filter((el) => {
        if (el.classList.contains("section-heading-reveal") && isInsideReactIsland(el)) {
          return false;
        }
        return true;
      });
      const blogGrids = document.querySelectorAll("[data-blog-grid]");

      if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        revealElements.forEach(reveal);
        blogGrids.forEach(revealStaggeredChildren);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            reveal(entry.target);
            observer.unobserve(entry.target);
          });
        },
        {
          rootMargin: "0px 0px -10% 0px",
          threshold: 0,
        },
      );

      revealElements.forEach((el) => observer.observe(el));

      const gridObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            revealStaggeredChildren(entry.target);
            gridObserver.unobserve(entry.target);
          });
        },
        {
          rootMargin: "0px 0px -10% 0px",
          threshold: 0,
        },
      );

      blogGrids.forEach((grid) => gridObserver.observe(grid));
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initReveals, {
        once: true,
      });
    } else {
      initReveals();
    }
  })();
</script>
<astro-island
  uid="Z2l3XaI"
  prefix="r25"
  component-url="/_astro/CookieConsent.BvB38JR2.js"
  component-export="default"
  renderer-url="/_astro/client.B3N4hhPH.js"
  props='{"enabled":[0,true]}'
  ssr
  client="load"
  opts='{"name":"CookieConsent","value":true}'
></astro-island>
`;

export default bodyHtml;