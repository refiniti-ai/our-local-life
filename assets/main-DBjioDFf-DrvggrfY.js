(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function t(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=t(a);fetch(a.href,i)}})();const ce=e=>`https://images.unsplash.com/${e}?q=80&w=2000&auto=format&fit=crop`,de={restoringSoil:ce("photo-1574943321392-2563b0bca50b")},A=[{id:"the-practice-of-presence-inside-atmas-approach-to-healing",title:"Meet Atma Erice: The Practice of Presence",description:"For Atma, healing isn’t about fixing something broken.",image:"/assets/image/The-Practice-of-Presence-Inside-Atma’s-Approach-to-Healing.webp",url:"/pages/stories/the-practice-of-presence-inside-atmas-approach-to-healing.html",category:"soul",label:"Soul",cta:"Read story",date:"2026-03-10"},{id:"dustin-defrates-building-people-places-purpose",title:"Meet Dustin DeFrates: Builder of People, Places, and Purpose",description:"A curated story and interview transcript with Dustin DeFrates.",image:"/assets/image/Building-People-Building-Places-Building-Purpose.webp",url:"/pages/stories/dustin-defrates-building-people-places-purpose.html",category:"mind",label:"Mind",cta:"Read story",date:"2026-01-24"},{id:"intentional-dating-resumate-lai-lam",title:"Meet Lai Lam: Intentional Dating in a Swipe Driven World",description:"A curated story and interview transcript with Lai Lam.",image:"/assets/image/A-Conversation-with-Resumate-Founder-Lai-Lam.webp",url:"/pages/stories/intentional-dating-resumate-lai-lam.html",category:"community",label:"Community",cta:"Read story",date:"2026-01-23"},{id:"linking-the-body-demarius-parker",title:"Meet Demarius Parker: Linking the Body",description:"A curated story and interview transcript with Demarius Parker.",image:"/assets/image/Linking-the-Body-A-Conversation-with-Demarius-Parker.webp",url:"/pages/stories/linking-the-body-demarius-parker.html",category:"body",label:"Body",cta:"Read story",date:"2026-01-19"},{id:"restoring-the-soil-with-christina-kat-cat",title:"Meet Christina 'Kat' Cat: Restoring the Soil",description:"A curated story and interview transcript with Christina 'Kat' Cat.",image:"/assets/image/Restoring-the-Soil-with-Christina-Kat-Cat.webp",url:"/pages/stories/restoring-the-soil-with-christina-kat-cat.html",category:"community",label:"Community",cta:"Read story",date:"2026-01-21"},{id:"meet-chris-wuehr-mind-body-connection",title:"Meet Chris Wuehr: The Mind Behind the Mind Body Connection",description:"A curated story and interview transcript with Chris Wuehr.",image:"/assets/image/The-Mind-Behind-the-Mind-Body-Connection.webp",url:"/pages/stories/meet-chris-wuehr-mind-body-connection.html",category:"mind",label:"Mind",cta:"Read story",date:"2026-01-18"}],m=e=>{var t;return((t=A.find(r=>r.url===e))==null?void 0:t.image)??""},K=[{id:"dustin-defrates-builder-of-people-places-purpose",name:"Dustin DeFrates",pillar:"mind",archetype:"The Builder",description:"A high vibe, editorial profile celebrating Dustin DeFrates.",image:"/assets/image/dustin-building-people-places-ourlocallife.webp",url:"/pages/practice/dustin-defrates-practice.html",date:"2026-01-23"},{id:"lai-lam-resumate-intentional-dating",name:"Lai Lam",pillar:"community",archetype:"The Intentional Matchmaker",description:"A high vibe, editorial profile celebrating Lai Lam.",image:"/assets/image/lailam-founder-resumate-our-local-life.webp",url:"/pages/spotlight/lai-lam-resumate-intentional-dating.html",date:"2026-01-22"},{id:"christina-kat-cat-sapropel-organics",name:"Christina 'Kat' Cat",pillar:"community",archetype:"The Regenerator",description:"A high vibe, editorial profile celebrating Christina 'Kat' Cat.",image:"/assets/image/kristina-cat-humuson-soil-regeneration.webp",url:"/pages/spotlight/christina-kat-cat-sapropel-organics.html",date:"2026-01-20"},{id:"demarius-parker-body-whisperer",name:"Demarius Parker",pillar:"body",archetype:"The Linker",description:"An editorial spotlight on Demarius Parker, the Body lead in the Mind Body Soul collective.",image:"/assets/image/Demarius-Parker-Body-Savant-Our-local-life.webp",url:"/pages/practice/demarius-parker-practice.html",date:"2026-01-19"},{id:"chris-wuehr-mind-body-connection",name:"Chris Wuehr",pillar:"mind",archetype:"The Mindful Architect",description:"A high vibe, editorial profile celebrating Chris Wuehr.",image:"/assets/image/chris-wuehr-thought-our-local-life.webp",url:"/pages/practice/chris-wuehr-practice.html",date:"2026-01-17"},{id:"atma-practice-of-presence",name:"Atma",pillar:"soul",archetype:"The Soul Guide",description:"Kundalini Yoga, meditation, and ancestral healing to bring people back into presence and nervous system balance.",image:"/assets/image/Atma-Approach-to-Healings.webp",url:"/pages/practice/atma-practice.html",date:"2026-03-10"}],f=[{id:"podcast-restoring-soil",title:"Meet Christina “Kat” Cat: Restoring the Soil",description:"Integrity led business and regenerative soil practices.",image:de.restoringSoil,url:"/pages/podcast/restoring-the-soil-with-kat-cat.html",blogUrl:"/pages/blog/restoring-the-soil-with-kat-cat.html",date:"2026-01-22"}],y=[{id:"blog-atma-presence",title:"Meet Atma Erice: The Practice of Presence",description:"Kundalini Yoga, ancestral healing, and nervous system regulation with Our Local Life's Soul lead.",image:m("/pages/stories/the-practice-of-presence-inside-atmas-approach-to-healing.html"),url:"/pages/blog/meet-atma-erice-the-practice-of-presence.html",storyUrl:"/pages/stories/the-practice-of-presence-inside-atmas-approach-to-healing.html",date:"2026-03-10"},{id:"blog-dustin-builder",title:"Meet Dustin DeFrates: Builder of People, Places, and Purpose",description:"Co-founder Dustin DeFrates on lifelong learning, Our Local Life, and building people and places.",image:m("/pages/stories/dustin-defrates-building-people-places-purpose.html"),url:"/pages/blog/meet-dustin-defrates-builder-of-people-places-purpose.html",storyUrl:"/pages/stories/dustin-defrates-building-people-places-purpose.html",date:"2026-01-24"},{id:"blog-lai-resumate",title:"Meet Lai Lam: Intentional Dating in a Swipe Driven World",description:"Resumate founder Lai Lam on depth over dopamine, video-first dating, and protecting your heart.",image:m("/pages/stories/intentional-dating-resumate-lai-lam.html"),url:"/pages/blog/meet-lai-lam-intentional-dating-resumate.html",storyUrl:"/pages/stories/intentional-dating-resumate-lai-lam.html",date:"2026-01-23"},{id:"blog-restoring-soil",title:"Meet Christina 'Kat' Cat: Restoring the Soil",description:"Sapropel, HumusOn, soil and gut health, and integrity-led business with Christina Kat Cat.",image:m("/pages/stories/restoring-the-soil-with-christina-kat-cat.html"),url:"/pages/blog/restoring-the-soil-with-kat-cat.html",podcastUrl:"/pages/podcast/restoring-the-soil-with-kat-cat.html",storyUrl:"/pages/stories/restoring-the-soil-with-christina-kat-cat.html",date:"2026-01-22"},{id:"blog-demarius-body",title:"Meet Demarius Parker: Linking the Body",description:"Body lead Demarius Parker on baseline health, bodywork, humor in healing, and embodied sovereignty.",image:m("/pages/stories/linking-the-body-demarius-parker.html"),url:"/pages/blog/meet-demarius-parker-linking-the-body.html",storyUrl:"/pages/stories/linking-the-body-demarius-parker.html",date:"2026-01-19"},{id:"blog-chris-mind",title:"Meet Chris Wuehr: The Mind Behind the Mind Body Connection",description:"Mind lead Chris Wuehr on the mind-body link, body literacy, and trusting your signals.",image:m("/pages/stories/meet-chris-wuehr-mind-body-connection.html"),url:"/pages/blog/meet-chris-wuehr-mind-body-connection.html",storyUrl:"/pages/stories/meet-chris-wuehr-mind-body-connection.html",date:"2026-01-18"}],pe=[{id:"issue-jan-2026",title:"January Issue",subtitle:"Rooted Regeneration",description:"A complete issue featuring curated stories, entrepreneurs, and lifestyle rituals.",image:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2000&auto=format&fit=crop",url:"pages/magazine/january-issue.html",date:"2026-01-28"}],P=[{id:"home",label:"Home",path:"index.html",activePatterns:[/^\/$/,/\/index\.html$/],icon:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />'},{id:"about",label:"About",path:"about.html",activePatterns:[/\/about\.html$/],icon:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />'},{id:"stories",label:"Stories",path:"curated-stories.html",activePatterns:[/\/curated-stories\.html$/,/\/pages\/stories\//],icon:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />'},{id:"hub",label:"Hub",path:"hub.html",activePatterns:[/\/hub\.html$/],icon:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m0-4a4 4 0 110-8 4 4 0 010 8zm8 0a4 4 0 100-8 4 4 0 000 8z" />'},{id:"spotlight",label:"Spotlight",path:"featured-entrepreneur.html",activePatterns:[/\/featured-entrepreneur\.html$/,/\/pages\/spotlight\//],icon:'<circle cx="12" cy="12" r="10" stroke-width="1.5" />'},{id:"podcast",label:"Podcast",path:"pages/podcast/index.html",activePatterns:[/\/pages\/podcast\//],icon:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />'},{id:"blog",label:"Blog",path:"pages/blog/index.html",activePatterns:[/\/pages\/blog\//],icon:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />'}],V=()=>{const e=window.location.pathname.split("/").filter(Boolean);e.length&&/\.[a-z0-9]+$/i.test(e[e.length-1])&&e.pop();const t=e.length;return t?"../".repeat(t):""},T=(e,t=window.location.pathname)=>e.activePatterns.some(r=>r.test(t)),ue=`
        <div class="w-full h-px bg-oll-dark/10 dark:bg-white/10 my-2"></div>
        <button
          type="button"
          onclick="toggleSubscribe()"
          class="nav-item flex items-center h-10 px-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-all group/item w-full"
        >
          <div class="w-8 h-8 flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span class="nav-label ml-3 text-xs uppercase tracking-widest font-medium whitespace-nowrap">Join The Movement</span>
        </button>
        <div class="w-full h-px bg-oll-dark/10 dark:bg-white/10 my-2"></div>
        <div class="px-2 flex justify-center pt-2">
          <label class="theme-switch">
            <input type="checkbox" class="theme-toggle-input" onchange="toggleTheme(this)" />
            <span class="slider"></span>
          </label>
        </div>`,me=`
          <div class="w-full h-px bg-oll-dark/10 dark:bg-white/10 my-2"></div>
          <button
            type="button"
            onclick="toggleSubscribe()"
            class="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors w-full text-left"
          >
            <div class="w-6 h-6 flex justify-center items-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span class="uppercase tracking-widest text-xs font-medium">Join The Movement</span>
          </button>`;function he(){const e=V(),t=window.location.pathname,r=P.map(n=>{const l=T(n,t);return`
          <a
            href="${`${e}${n.path}`}"
            class="flex items-center space-x-4 p-3 rounded-xl transition-colors ${l?"bg-gray-100 dark:bg-white/10":"hover:bg-gray-100 dark:hover:bg-white/5"}"
          >
            <div class="w-6 h-6 flex justify-center items-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">${n.icon}</svg>
            </div>
            <span class="uppercase tracking-widest text-xs font-medium">${n.label}</span>
          </a>`}).join(""),a=P.map(n=>{const l=T(n,t);return`
        <a
          href="${`${e}${n.path}`}"
          class="nav-item flex items-center h-10 px-2 rounded-xl transition-all group/item ${l?"bg-gray-100 dark:bg-white/10":"hover:bg-gray-100 dark:hover:bg-white/10"}"
        >
          <div class="w-8 h-8 flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">${n.icon}</svg>
          </div>
          <span class="nav-label ml-3 text-xs uppercase tracking-widest font-medium">${n.label}</span>
        </a>`}).join(""),i=document.querySelector("#mobile-menu > .flex.flex-col");if(i){i.querySelectorAll("a").forEach(d=>d.remove());const n=i.querySelector(".w-full.h-px"),l=document.createRange().createContextualFragment(r);n?i.insertBefore(l,n):i.insertAdjacentHTML("afterbegin",r),i.querySelector('button[onclick*="toggleSubscribe"]')||i.insertAdjacentHTML("beforeend",me)}const s=document.querySelector("#sidebar .flex-1.flex.flex-col");if(s){s.querySelectorAll("a.nav-item").forEach(d=>d.remove());const n=s.querySelector(".w-full.h-px"),l=document.createRange().createContextualFragment(a);n?s.insertBefore(l,n):s.insertAdjacentHTML("afterbegin",a),s.querySelector('button[onclick*="toggleSubscribe"]')||s.insertAdjacentHTML("beforeend",ue)}ge()}function ge(){const e=V();document.querySelectorAll("footer ul").forEach(t=>{const r=[...t.querySelectorAll("a")].map(a=>a.textContent.trim());if(r.includes("Stories")&&!t.querySelector('[data-nav-injected="hub"]')){if(!r.includes("Hub")){const a=document.createElement("li");a.innerHTML=`<a href="${e}hub.html" data-nav-injected="hub" class="hover:opacity-100">Hub</a>`;const i=t.querySelector('a[href*="curated-stories"], a[href*="stories"]');i!=null&&i.parentElement?i.parentElement.after(a):t.appendChild(a)}if(!r.includes("Blog")){const a=document.createElement("li");a.innerHTML=`<a href="${e}pages/blog/index.html" data-nav-injected="blog" class="hover:opacity-100">Blog</a>`;const i=t.querySelector('a[href*="podcast"]');i!=null&&i.parentElement?i.parentElement.after(a):t.appendChild(a)}}})}const be={mind:"Mind",body:"Body",soul:"Soul",community:"Community"},J=e=>be[e]||"",fe="America/Phoenix",R=["january","february","march","april","may","june","july","august","september","october","november","december"],D=new Set(["january-issue.html"]);function N(){return new Intl.DateTimeFormat("en-US",{timeZone:fe,month:"long"}).format(new Date)}function ye(){const e=N(),t=R.indexOf(e.toLowerCase()),r=`${t>=0?R[t]:"january"}-issue.html`,a=[...D][0]||"january-issue.html",i=D.has(r)?`pages/magazine/${r}`:`pages/magazine/${a}`;return new URL(i,window.location.href).href}function ve(){const e=`${N().toUpperCase()} ISSUE`,t=ye();document.querySelectorAll("[data-hero-magazine-link]").forEach(r=>{r.setAttribute("href",t)}),document.querySelectorAll("[data-hero-magazine-label]").forEach(r=>{r.textContent=e})}function we(e){const t=document.documentElement;e.checked?(t.classList.add("dark"),t.classList.remove("light")):(t.classList.remove("dark"),t.classList.add("light")),document.querySelectorAll(".theme-toggle-input").forEach(r=>{r.checked=e.checked})}window.toggleTheme=we;function xe(){const e=document.getElementById("subscribe-modal");if(!e)return;const t=e.classList.contains("visible-modal");e.classList.toggle("visible-modal",!t),e.classList.toggle("hidden-modal",t)}window.toggleSubscribe=xe;const H=document.getElementById("mobile-toggle"),U=document.getElementById("mobile-menu");H&&U&&H.addEventListener("click",()=>{U.classList.toggle("open");const e=document.getElementById("mobile-nav");e&&e.classList.toggle("mobile-open")});const q=document.getElementById("menu-toggle"),k=document.getElementById("sidebar"),$=document.getElementById("main-content"),L=document.getElementById("icon-contracted"),E=document.getElementById("icon-expanded"),h=document.getElementById("logo-expanded");let B=!1;q&&k&&$&&L&&E&&q.addEventListener("click",()=>{B=!B,B?(k.classList.add("expanded"),$.classList.add("sidebar-expanded"),L.classList.add("hidden"),E.classList.remove("hidden"),h&&(h.style.opacity="1",h.style.pointerEvents="auto")):(k.classList.remove("expanded"),$.classList.remove("sidebar-expanded"),L.classList.remove("hidden"),E.classList.add("hidden"),h&&(h.style.opacity="0",h.style.pointerEvents="none"))});const M=document.getElementById("mbs-grid"),z=document.getElementById("scroll-left"),F=document.getElementById("scroll-right");M&&z&&F&&(z.addEventListener("click",()=>{M.scrollBy({left:-350,behavior:"smooth"})}),F.addEventListener("click",()=>{M.scrollBy({left:350,behavior:"smooth"})}));const C=document.getElementById("podcast-grid"),O=document.getElementById("podcast-scroll-left"),W=document.getElementById("podcast-scroll-right");C&&O&&W&&(O.addEventListener("click",()=>{C.scrollBy({left:-350,behavior:"smooth"})}),W.addEventListener("click",()=>{C.scrollBy({left:350,behavior:"smooth"})}));function ke(){const e=document.querySelectorAll("#mbs-filters .filter-btn"),t=document.querySelectorAll(".mbs-card");!e.length||!t.length||e.forEach(r=>{r.addEventListener("click",()=>{e.forEach(i=>{i.classList.remove("active"),i.classList.add("opacity-50")}),r.classList.add("active"),r.classList.remove("opacity-50");const a=r.getAttribute("data-filter");t.forEach(i=>{a==="all"||i.getAttribute("data-category")===a?i.style.display="block":i.style.display="none"})})})}function G(){const e=window.location.hash;if(!e)return;const t=e.match(/^#mbs(?:-(mind|body|soul|community|all))?$/);if(!t)return;const r=t[1]||"all",a=document.querySelector(`#mbs-filters .filter-btn[data-filter="${r}"]`);a&&a.click();const i=document.getElementById("mbs");i&&i.scrollIntoView({behavior:"smooth",block:"start"})}window.addEventListener("hashchange",G);function $e(){const e=document.querySelectorAll("#podcast-filters .filter-btn"),t=document.querySelectorAll(".podcast-card");!e.length||!t.length||e.forEach(r=>{r.addEventListener("click",()=>{e.forEach(i=>{i.classList.remove("active"),i.classList.add("opacity-50")}),r.classList.add("active"),r.classList.remove("opacity-50");const a=r.getAttribute("data-filter");t.forEach(i=>{a==="all"||i.getAttribute("data-category")===a?i.style.display="flex":i.style.display="none"})})})}const S=e=>[...e].sort((t,r)=>new Date(r.date)-new Date(t.date)),Y=e=>S(e)[0],v=(e,t,r=[])=>{const a=[...e];if(!r.length||a.length>=t)return a;let i=0;for(;a.length<t;)a.push(r[i%r.length]),i+=1;return a};let u=A||[],g=K||[];const Le=({stories:e,entrepreneurList:t}={})=>{Array.isArray(e)&&e.length&&(u=S(e)),Array.isArray(t)&&t.length&&(g=S(t)),Z(),_(),Q(),Ee(),X(),ae(),ie(),ee(),se(),oe()};function Z(){const e=document.getElementById("latest-entrepreneur-card");if(!e)return;const t=Y(g);if(!t)return;const r=encodeURI(t.image),a=new URL(t.url,window.location.href).href;e.innerHTML=`
    <a href="${a}" class="block group flex flex-col flex-1">
      <div class="aspect-[4/3] overflow-hidden mb-8 w-full">
        <img
          src="${r}"
          alt="${t.name}"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <h3 class="featured-promo-headline font-serif text-3xl mb-4 text-balance min-h-[4.5rem] flex items-center justify-center">
        Meet the Great Minds of Our Local Life
      </h3>
      <p class="featured-promo-description text-sm opacity-70 max-w-md mx-auto leading-relaxed font-sans text-pretty flex-1">
        Explore the stories, visions, and impact of the ethical entrepreneurs and creative leaders shaping our community. Discover how these thinkers are turning high-vibe concepts into local reality.
      </p>
    </a>
  `}function _(){const e=document.getElementById("mbs-grid");e&&(e.innerHTML=u.map(t=>`
        <a
          href="${t.url}"
          class="mbs-card flex-shrink-0 w-full md:w-[350px] relative h-[500px] rounded-[30px] overflow-hidden group cursor-pointer scroll-item"
          data-category="${t.category}"
        >
          <img
            src="${encodeURI(t.image)}"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt="${t.title}"
          />
          <div class="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
          <div class="absolute top-6 left-6 px-4 py-2 rounded-full bg-white/20 backdrop-blur text-white text-[10px] uppercase tracking-widest">
            ${t.label}
          </div>
          <div class="absolute bottom-8 left-8 right-8 text-white">
            <span class="text-[10px] uppercase tracking-widest opacity-80 mb-2 block">
              ${t.label}
            </span>
            <h3 class="font-serif text-3xl mb-3 leading-tight">
              ${t.title}
            </h3>
            <span class="text-xs uppercase tracking-widest border-b border-white pb-1">
              ${t.cta}
            </span>
          </div>
        </a>
      `).join(""))}function Q(){const e=document.getElementById("curated-stories-grid");if(!e)return;e.innerHTML=u.map(r=>`
        <a
          href="${r.url}"
          class="group block overflow-hidden rounded-[28px] border border-oll-dark/10 dark:border-white/20 bg-white/80 dark:bg-oll-dark/80"
        >
          <div class="aspect-[4/3] overflow-hidden">
            <img
              src="${encodeURI(r.image)}"
              alt="${r.title}"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 bg-white"
            />
          </div>
          <div class="p-6 space-y-3">
            <p class="text-xs uppercase tracking-widest opacity-60">${r.label}</p>
            <h3 class="font-serif text-2xl">${r.title}</h3>
            <p class="text-sm opacity-70">${r.description}</p>
            <span class="text-xs uppercase tracking-widest border-b border-current pb-1">
              ${r.cta}
            </span>
          </div>
        </a>
      `).join("");const t=document.getElementById("curated-story-count");t&&(t.textContent=`${u.length} story${u.length===1?"":"ies"} live`)}function Ee(){const e=document.getElementById("community-hub-grid");if(!e)return;const t=u.filter(a=>a.category==="community");e.innerHTML=t.map(a=>`
        <a
          href="${a.url}"
          class="group block overflow-hidden rounded-[28px] border border-oll-dark/10 dark:border-white/20 bg-white/80 dark:bg-oll-dark/80"
        >
          <div class="aspect-[4/3] overflow-hidden">
            <img
              src="${a.image}"
              alt="${a.title}"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 bg-white"
            />
          </div>
          <div class="p-6 space-y-3">
            <p class="text-xs uppercase tracking-widest opacity-60">${a.label}</p>
            <h3 class="font-serif text-2xl">${a.title}</h3>
            <p class="text-sm opacity-70">${a.description}</p>
            <span class="text-xs uppercase tracking-widest border-b border-current pb-1">
              ${a.cta}
            </span>
          </div>
        </a>
      `).join("");const r=document.getElementById("community-story-count");r&&(r.textContent=`${t.length} communit${t.length===1?"y story":"y stories"} live`)}function X(){const e=document.getElementById("entrepreneur-grid");if(!e)return;e.innerHTML=g.map(r=>`
        <a
          href="${r.url}"
          class="group block overflow-hidden rounded-[28px] border border-oll-dark/10 dark:border-white/20 bg-white/80 dark:bg-oll-dark/80"
        >
          <div class="aspect-[4/3] overflow-hidden">
            <img
              src="${encodeURI(r.image)}"
              alt="${r.name}"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div class="p-6 space-y-3">
            ${r.pillar?`<p class="text-xs uppercase tracking-widest opacity-90">${J(r.pillar)}</p>`:""}
            <p class="text-xs uppercase tracking-widest opacity-60">${r.archetype}</p>
            <h3 class="font-serif text-2xl">${r.name}</h3>
            <p class="text-sm opacity-70">${r.description}</p>
            <span class="text-xs uppercase tracking-widest border-b border-current pb-1">
              ${r.placeholder?"Coming soon":"View profile"}
            </span>
          </div>
        </a>
      `).join("");const t=document.getElementById("entrepreneur-count");if(t){const r=g.length;t.textContent=`${r} profile${r===1?"":"s"} live`}}function ee(){const e=document.getElementById("podcast-grid-page");if(!e)return;const t=f.filter(s=>s.placeholder),r=f.filter(s=>!s.placeholder),a=v(r,6,t);e.innerHTML=a.map(s=>te(s,"grid")).join("");const i=document.getElementById("podcast-count");i&&(i.textContent=`${r.length} episode${r.length===1?"":"s"} live`)}const te=(e,t="grid")=>{const r=t==="carousel";return`
    <article class="${r?"podcast-card flex-shrink-0 w-full md:w-[320px] rounded-[28px] border border-oll-dark/10 dark:border-white/20 bg-white/80 dark:bg-oll-dark/80 overflow-hidden scroll-item":"overflow-hidden rounded-[28px] border border-oll-dark/10 dark:border-white/20 bg-white/80 dark:bg-oll-dark/80"}"${r?' data-category="interviews"':""}>
      <a href="${e.url}" class="group block">
        <div class="aspect-[4/3] overflow-hidden">
          <img
            src="${encodeURI(e.image)}"
            alt="${e.title}"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </a>
      <div class="p-6 space-y-3">
        <p class="text-xs uppercase tracking-widest opacity-60">Podcast</p>
        <h3 class="font-serif text-2xl leading-snug">
          <a href="${e.url}" class="hover:opacity-80">${e.title}</a>
        </h3>
        <p class="text-sm opacity-70">${e.description}</p>
        <div class="flex flex-wrap gap-4 pt-1">
          <a href="${e.url}" class="text-xs uppercase tracking-widest border-b border-current pb-1">
            ${e.placeholder?"Episode coming soon":"Listen now"}
          </a>
          ${e.blogUrl?`<a href="${e.blogUrl}" class="text-xs uppercase tracking-widest border-b border-current pb-1 opacity-70 hover:opacity-100">Read article</a>`:""}
        </div>
      </div>
    </article>`},re=e=>`
    <article class="overflow-hidden rounded-[28px] border border-oll-dark/10 dark:border-white/20 bg-white/80 dark:bg-oll-dark/80">
      <a href="${e.url}" class="group block">
        <div class="aspect-[4/3] overflow-hidden">
          <img
            src="${encodeURI(e.image)}"
            alt="${e.title}"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </a>
      <div class="p-6 space-y-3">
        <p class="text-xs uppercase tracking-widest opacity-60">Companion article</p>
        <h3 class="font-serif text-2xl leading-snug">
          <a href="${e.url}" class="hover:opacity-80">${e.title}</a>
        </h3>
        <p class="text-sm opacity-70">${e.description}</p>
        <div class="flex flex-wrap gap-4 pt-1">
          <a href="${e.url}" class="text-xs uppercase tracking-widest border-b border-current pb-1">
            ${e.placeholder?"Article in progress":"Read article"}
          </a>
          ${e.podcastUrl&&e.podcastUrl!=="#"?`<a href="${e.podcastUrl}" class="text-xs uppercase tracking-widest border-b border-current pb-1 opacity-70 hover:opacity-100">Listen to episode</a>`:e.storyUrl?`<a href="${e.storyUrl}" class="text-xs uppercase tracking-widest border-b border-current pb-1 opacity-70 hover:opacity-100">Read interview</a>`:""}
        </div>
      </div>
    </article>`;function Be(){const e=f.filter(r=>r.placeholder),t=f.filter(r=>!r.placeholder);return v(t,3,e)}function Me(){const e=y.filter(r=>r.placeholder),t=y.filter(r=>!r.placeholder);return v(t,3,e)}function ae(){const e=document.getElementById("podcast-grid");if(!e)return;const t=Be();e.innerHTML=t.map(r=>te(r,"carousel")).join("")}function ie(){const e=document.getElementById("home-blog-grid");if(!e)return;const t=Me();e.innerHTML=t.map(r=>re(r)).join("")}function se(){const e=document.getElementById("blog-grid-page");if(!e)return;const t=y.filter(s=>s.placeholder),r=y.filter(s=>!s.placeholder),a=v(r,6,t);e.innerHTML=a.map(s=>re(s)).join("");const i=document.getElementById("blog-count");if(i){const s=r.length;i.textContent=`${s} article${s===1?"":"s"} live`}}function Ce(){const e=document.getElementById("issue-hero");if(!e)return;const t=Y(pe);t&&(e.innerHTML=`
    <div class="absolute inset-0">
      <video autoplay loop muted playsinline class="w-full h-full object-cover opacity-90">
        <source
          src="https://zyq.has.mybluehost.me/website_ee8080dc/wp-content/uploads/2025/11/Our-Local-Life-2.mp4"
          type="video/mp4"
        />
      </video>
      <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>
    </div>
    <div class="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
      <span class="text-xs uppercase tracking-[0.4em] text-oll-sand">
        ${t.title}
      </span>
      <h1 class="font-serif text-4xl md:text-6xl leading-tight mt-6">
        ${t.subtitle}
      </h1>
      <p class="text-lg md:text-xl text-white/80 mt-6 max-w-2xl mx-auto">
        ${t.description}
      </p>
    </div>
  `)}function oe(){const e=document.getElementById("magazine-stories-grid");e&&(e.innerHTML=u.slice(0,3).map(r=>`
          <a
            href="${r.url}"
            class="group block overflow-hidden rounded-[28px] border border-oll-dark/10 dark:border-white/20 bg-white/80 dark:bg-oll-dark/80"
          >
            <div class="aspect-[4/3] overflow-hidden">
              <img
                src="${encodeURI(r.image)}"
                alt="${r.title}"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div class="p-6 space-y-3">
              <p class="text-xs uppercase tracking-widest opacity-60">${r.label}</p>
              <h3 class="font-serif text-2xl">${r.title}</h3>
              <p class="text-sm opacity-70">${r.description}</p>
              <span class="text-xs uppercase tracking-widest border-b border-current pb-1">
                ${r.cta}
              </span>
            </div>
          </a>
        `).join(""));const t=document.getElementById("magazine-entrepreneurs-grid");t&&(t.innerHTML=g.map(r=>`
          <a
            href="${r.url}"
            class="group block overflow-hidden rounded-[28px] border border-oll-dark/10 dark:border-white/20 bg-white/80 dark:bg-oll-dark/80"
          >
            <div class="aspect-[4/3] overflow-hidden">
              <img
                src="${r.image}"
                alt="${r.name}"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div class="p-6 space-y-3">
              ${r.pillar?`<p class="text-xs uppercase tracking-widest opacity-90">${J(r.pillar)}</p>`:""}
              <p class="text-xs uppercase tracking-widest opacity-60">${r.archetype}</p>
              <h3 class="font-serif text-2xl">${r.name}</h3>
              <p class="text-sm opacity-70">${r.description}</p>
              <span class="text-xs uppercase tracking-widest border-b border-current pb-1">
                View profile
              </span>
            </div>
          </a>
        `).join(""))}he();Z();_();Q();X();ae();ie();ee();se();$e();Ce();oe();ke();ve();G();const j="https://images.unsplash.com/photo-1474314243412-cd4a79f02c5a?q=80&w=2000&auto=format&fit=crop",Se=Object.fromEntries((K||[]).map(e=>[e.url.replace(/^\//,""),e.image])),Ae=Object.fromEntries((A||[]).map(e=>[e.url.replace(/^\//,""),e.image])),ne=(e,t="")=>{if(!e)return j;if(/^https?:\/\//i.test(e)||e.startsWith("/"))return e;if(e.startsWith("assets/"))return`/${e}`;if(t)try{return new URL(e,new URL(t,window.location.origin).href).pathname}catch{}return`/${e.replace(/^(\.\/)+/,"")}`},c=(e,t)=>{var r;const a=e.querySelector(`meta[name="${t}"], meta[property="${t}"]`);return a?(r=a.getAttribute("content"))==null?void 0:r.trim():""},I=e=>{var t,r;return((r=(t=e.querySelector("title"))==null?void 0:t.textContent)==null?void 0:r.trim())||""},le=e=>(e||"").replace("| Curated Story","").replace("| Featured Entrepreneur","").trim(),je=["mind","body","soul","community"],Ie=e=>{if(!e)return"community";const t=e.toLowerCase();return t.includes("chris-wuehr")||t.includes("dustin-defrates")?"mind":t.includes("demarius-parker")?"body":t.includes("atma")?"soul":"community"},Pe=e=>{const t=c(e,"oll:category");if(t)return t.toLowerCase();const r=c(e,"og:title")||I(e),a=c(e,"og:description")||c(e,"description"),i=`${r} ${a}`;return/mind\b/i.test(i)?"mind":/body\b/i.test(i)?"body":/soul\b/i.test(i)?"soul":"community"},Te=(e,t)=>{const r=le(c(t,"og:title")||I(t)),a=c(t,"og:description")||c(t,"description")||"A curated story from Our Local Life.",i=Ae[e],s=ne(i||c(t,"og:image")||j,e),n=c(t,"oll:date")||"1900-01-01",l=Pe(t),d=l==="community"?"Community":l.charAt(0).toUpperCase()+l.slice(1);return{id:e.split("/").pop().replace(".html",""),title:r||"Curated Story",description:a,image:s,url:e.startsWith("/")?e:`/${e}`,category:l,label:d,cta:"Read story",date:n}},Re=(e,t)=>{const r=le(c(t,"og:title")||I(t)),a=c(t,"og:description")||c(t,"description")||"A featured entrepreneur spotlight.",i=Se[e],s=ne(i||c(t,"og:image")||j,e),n=c(t,"oll:date")||"1900-01-01",l=c(t,"oll:archetype")||"Featured Entrepreneur",d=e.split("/").pop().replace(".html",""),b=c(t,"oll:pillar").toLowerCase(),o=je.includes(b)?b:Ie(d);return{id:d,name:r||"Featured Entrepreneur",pillar:o,archetype:l,description:a,image:s,url:e.startsWith("/")?e:`/${e}`,date:n}},De=async()=>{let e="";try{const o=await fetch("sitemap.xml",{cache:"no-store"});if(!o.ok)return null;e=await o.text()}catch{return null}const t=new DOMParser().parseFromString(e,"application/xml"),r=Array.from(t.querySelectorAll("url > loc")).map(o=>{var p;return(p=o.textContent)==null?void 0:p.trim()}).filter(Boolean),a=r.filter(o=>o.includes("/stories/")).map(o=>`pages/stories/${new URL(o).pathname.split("/").pop()}.html`),i=new Set(["chris-wuehr-mind-body-connection","demarius-parker-body-whisperer","dustin-defrates-builder-of-people-places-purpose","atma-practice-of-presence"]),s=["pages/practice/chris-wuehr-practice.html","pages/practice/demarius-parker-practice.html","pages/practice/dustin-defrates-practice.html","pages/practice/atma-practice.html"],n=r.filter(o=>o.includes("/spotlight/")).map(o=>`pages/spotlight/${new URL(o).pathname.split("/").pop()}.html`).filter(o=>{const p=o.replace("pages/spotlight/","").replace(".html","");return!i.has(p)}),l=[...s,...n],d=await Promise.all(a.map(async o=>{try{const p=await fetch(o,{cache:"no-store"});if(!p.ok)return null;const w=await p.text(),x=new DOMParser().parseFromString(w,"text/html");return Te(o,x)}catch{return null}})),b=await Promise.all(l.map(async o=>{try{const p=await fetch(o,{cache:"no-store"});if(!p.ok)return null;const w=await p.text(),x=new DOMParser().parseFromString(w,"text/html");return Re(o,x)}catch{return null}}));return{stories:d.filter(Boolean),entrepreneurList:b.filter(Boolean)}};De().then(e=>{e&&Le(e)}).catch(()=>{});
