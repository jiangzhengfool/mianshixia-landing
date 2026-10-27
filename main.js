// ===== 站点配置（开源模板：按需替换为你自己的地址）=====
const SITE_URL = "https://www.mianshixia.com.cn";

// ===== 功能特性数据 =====
const FEATURES = [
  {
    icon: "i-message",
    title: "文字 / 语音模拟面试",
    desc: "按岗位 JD 智能出题，实时多轮对话，逐题评分与改进建议；支持语音面试，还原真实考场节奏。",
  },
  {
    icon: "i-file",
    title: "AI 简历精修",
    desc: "上传简历一键诊断，AI 按目标岗位重写与润色，突出项目亮点与量化成果，自动生成改后成稿。",
  },
  {
    icon: "i-book",
    title: "智能题库与学习模式",
    desc: "数千道预置高频题，按标签 / 难度筛选，记录掌握度与我的答案，上一题下一题循序渐进。",
  },
  {
    icon: "i-database",
    title: "知识库面试",
    desc: "把资料、笔记、论文入库，AI 自动生成题库并基于知识库问答，打造只属于你的备考素材。",
  },
  {
    icon: "i-activity",
    title: "真实录音复盘",
    desc: "上传面试录音自动转写，定位表达与内容薄弱点，支持二次针对性面试，越练越稳。",
  },
  {
    icon: "i-columns",
    title: "求职追踪看板",
    desc: "管理投递进展与 Offer，时间线清晰，薪资、轮次与节点一目了然，不再错过关键时机。",
  },
  {
    icon: "i-users",
    title: "面经广场",
    desc: "来自真实候选人的面经分享，覆盖大厂与垂类岗位，避坑不踩雷，备考有参照。",
  },
  {
    icon: "i-award",
    title: "会员与点数体系",
    desc: "灵活的会员权益与点数包，按需使用 AI 能力，随时升级、随时停用，成本自己掌控。",
  },
];

// ===== 渲染功能卡片 =====
(function renderFeatures() {
  const grid = document.getElementById("featuresGrid");
  if (!grid) return;
  grid.innerHTML = FEATURES.map(
    (f, i) => `
    <article class="feature reveal" style="--reveal-delay:${(i % 4) * 80}ms">
      <div class="feature__icon"><svg><use href="#${f.icon}" /></svg></div>
      <h3 class="feature__title">${f.title}</h3>
      <p class="feature__desc">${f.desc}</p>
      <span class="feature__enter">进入功能 <svg><use href="#i-arrow" /></svg></span>
    </article>`
  ).join("");
})();

// ===== 主题切换 =====
(function theme() {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));

  const btn = document.getElementById("themeToggle");
  btn?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
})();

// ===== 移动端菜单 =====
(function menu() {
  const toggle = document.getElementById("menuToggle");
  const links = document.getElementById("navLinks");
  toggle?.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
    })
  );
})();

// ===== 滚动渐显 =====
(function reveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
})();

// ===== CTA 跳转（静态页：指向线上站点，可按需修改 SITE_URL）=====
(function actions() {
  document.querySelectorAll("[data-action]").forEach((el) => {
    const action = el.getAttribute("data-action");
    el.setAttribute("href", action === "login" ? SITE_URL + "/signin" : SITE_URL);
  });
})();

// ===== 邀请码捕获（兼容原站 ?invite= 分享链接）=====
(function invite() {
  const params = new URLSearchParams(location.search);
  const code = params.get("invite");
  if (code) localStorage.setItem("invite_code", code);
})();

// ===== 页脚年份 =====
document.getElementById("year") &&
  (document.getElementById("year").textContent = new Date().getFullYear());
