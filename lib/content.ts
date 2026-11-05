// Источник истины: /opt/data/cv-v2-content/CONTENT.md (резюме v2, 03.11.2026)

export const CONTACTS = {
  name: "Кирилл Ефимович",
  role: "DevOps / Infrastructure Engineer",
  city: "Иннополис",
  telegram: "@Cblblblblblp",
  telegramUrl: "https://t.me/Cblblblblblp",
  email: "kirillefimovic141@gmail.com",
  github: "github.com/lanebo1",
  githubUrl: "https://github.com/lanebo1",
  phone: "+7 (916) 744-12-80",
  resume: "/resume.pdf",
};

export const ABOUT =
  "Инженер DevOps / Infra, 2+ года: автоматизация CI/CD, контейнерные развёртывания, observability. Production-инфраструктура на Docker/Kubernetes, self-hosted Linux-серверы: GitHub Actions-раннеры, NGINX+TLS, blue-green deployment. Диагностика по логам и метрикам, чтение backend-кода (TS, Python, Java, Go).";

export type Experience = {
  company: string;
  role: string;
  period: string;
  kind?: string;
  description: string;
  stack: string[];
  link?: { label: string; href: string };
  highlight?: boolean;
};

export const EXPERIENCE: Experience[] = [
  {
    company: "Т-Банк",
    role: "Разработчик (Java)",
    period: "Сентябрь 2026 — н.в.",
    kind: "Full-time",
    description:
      "Новый функционал внутреннего продукта; юнит-, интеграционные и e2e-тесты; ревью кода, RFC-документы.",
    stack: [
      "Java",
      "k8s",
      "GitLab CI/CD",
      "REST",
      "GraphQL",
      "Redis",
      "Spring Boot",
      "Maven",
      "Lombok",
      "Mockito",
      "Allure",
    ],
  },
  {
    company: "WikiLive",
    role: "Frontend инженер, тех. координатор",
    period: "Апрель 2026",
    description:
      "Совместная работа с документами в реальном времени. Идея, продуктовая логика, MVP-scope, координация, frontend. Победа «Лучшее решение» MTS True Tech Hack 2026.",
    stack: ["React", "TypeScript", "Vite", "Mantine", "Yjs", "BlockNote"],
    link: {
      label: "github.com/motor-screwdriver/mts-true-tech-hack-26",
      href: "https://github.com/motor-screwdriver/mts-true-tech-hack-26",
    },
  },
  {
    company: "ВК",
    role: "DevOps инженер (Junior)",
    period: "Ноябрь 2025 — Май 2026",
    kind: "Full-time",
    description:
      "Инфраструктура Docker/K8s: пайплайны GitLab CI (Kotlin DSL), observability-стек, диагностика production-инцидентов по логам и метрикам, стабильность релизов.",
    stack: [
      "Linux",
      "Docker",
      "GitLab CI/CD",
      "Kubernetes",
      "Kotlin DSL",
      "Prometheus",
      "Loki",
      "Grafana",
    ],
  },
  {
    company: "Open Labs Share",
    role: "DevOps инженер, тех. координатор",
    period: "Июнь — Август 2025",
    description:
      "Микросервисная архитектура, координация команды из 7 человек, self-hosted GitHub Actions-раннеры, blue-green за HAProxy без простоя.",
    stack: [
      "Docker",
      "PostgreSQL",
      "MinIO",
      "GitHub Actions",
      "HAProxy",
      "GitHub Projects",
    ],
    link: {
      label: "github.com/IU-Capstone-Project-2025/open-labs-share",
      href: "https://github.com/IU-Capstone-Project-2025/open-labs-share",
    },
  },
  {
    company: "Distributed Log Analysis Framework",
    role: "DevOps инженер, координатор",
    period: "Апрель 2025",
    description:
      "Сбор и анализ логов с распределённых серверов: Docker, NGINX, RabbitMQ, MongoDB, автодеплой через self-hosted runner. Руководил командой.",
    stack: [
      "Docker",
      "MongoDB",
      "NGINX",
      "RabbitMQ",
      "GitHub Actions",
      "Yandex Cloud",
    ],
    link: {
      label: "github.com/Linch-JG/Distributed-Log-Analysis-Framework",
      href: "https://github.com/Linch-JG/Distributed-Log-Analysis-Framework",
    },
  },
  {
    company: "Elect.Gen",
    role: "Backend + DevOps, координатор",
    period: "Июнь — Июль 2024",
    description:
      "Автоматическое распределение студентов на элективы для Университета Иннополис. REST API на PostgreSQL, CI/CD с автотестами и деплоем, координация 5 разработчиков.",
    stack: [
      "FastAPI",
      "SQLAlchemy",
      "PostgreSQL",
      "Docker",
      "Swagger",
      "GitHub Actions",
      "Yandex Cloud",
    ],
    link: {
      label: "github.com/quintet-sdr/elect-gen-backend",
      href: "https://github.com/quintet-sdr/elect-gen-backend",
    },
  },
];

export type Project = {
  name: string;
  tag: string;
  description: string;
  stack: string[];
  link: { label: string; href: string };
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    name: "WikiLive",
    tag: "MTS True Tech Hack 2026 · «Лучшее решение»",
    description:
      "Совместное редактирование документов в реальном времени: идея, продуктовая логика, MVP-scope, координация и frontend на Yjs/BlockNote.",
    stack: ["React", "TypeScript", "Vite", "Mantine", "Yjs", "BlockNote"],
    link: {
      label: "mts-true-tech-hack-26",
      href: "https://github.com/motor-screwdriver/mts-true-tech-hack-26",
    },
    featured: true,
  },
  {
    name: "Elect.Gen",
    tag: "Университет Иннополис · 2024",
    description:
      "Автоматическое распределение студентов на элективы. REST API на PostgreSQL, CI/CD с автотестами и деплоем, координация 5 разработчиков.",
    stack: [
      "FastAPI",
      "SQLAlchemy",
      "PostgreSQL",
      "Docker",
      "Swagger",
      "GitHub Actions",
    ],
    link: {
      label: "elect-gen-backend",
      href: "https://github.com/quintet-sdr/elect-gen-backend",
    },
    featured: true,
  },
  {
    name: "Open Labs Share",
    tag: "IU Capstone Project 2025",
    description:
      "Микросервисная платформа с blue-green деплоем за HAProxy без простоя и self-hosted GitHub Actions-раннерами.",
    stack: ["Docker", "PostgreSQL", "MinIO", "GitHub Actions", "HAProxy"],
    link: {
      label: "open-labs-share",
      href: "https://github.com/IU-Capstone-Project-2025/open-labs-share",
    },
  },
  {
    name: "Distributed Log Analysis",
    tag: "Distributed systems · 2025",
    description:
      "Сбор и анализ логов с распределённых серверов: NGINX, RabbitMQ, MongoDB, автодеплой через self-hosted runner.",
    stack: ["Docker", "MongoDB", "NGINX", "RabbitMQ", "Yandex Cloud"],
    link: {
      label: "Distributed-Log-Analysis-Framework",
      href: "https://github.com/Linch-JG/Distributed-Log-Analysis-Framework",
    },
  },
];

export const AWARDS = [
  "MTS True Tech Hack 2026 — победитель «Лучшее решение» (WikiLive)",
  "AdventureX 2026 Hackathon (Китай) — 5 место",
  "TechArena Innopolis 2025 — 2 место",
  "МТС Engineering Hack 2025 — финалист DevOps-трека",
  "IT_ONE Cup. Code & Analyst — сертификат участника",
  "Студент года Университета Иннополис 2025 и 2026 — за социальную деятельность",
];

export const STATS = [
  { value: 6, suffix: "", label: "наград", decimals: 0 },
  { value: 4, suffix: "", label: "хакатона", decimals: 0 },
  { value: 4.6, suffix: "", label: "GPA", decimals: 1 },
  { value: 2, suffix: "+", label: "года опыта", decimals: 0 },
];

export const SKILLS: { group: string; items: string[] }[] = [
  {
    group: "DevOps / Инфра",
    items: [
      "Linux",
      "Docker",
      "Docker Compose",
      "Kubernetes",
      "NGINX",
      "HAProxy",
      "Caddy",
      "Ansible",
      "Yandex Cloud",
    ],
  },
  {
    group: "CI/CD",
    items: [
      "GitHub Actions",
      "GitLab CI/CD",
      "self-hosted runners",
      "TeamCity",
      "Kotlin DSL",
      "blue-green",
    ],
  },
  {
    group: "Мониторинг",
    items: ["Prometheus", "Grafana", "Loki"],
  },
  {
    group: "Данные",
    items: ["PostgreSQL", "Redis", "MongoDB", "MinIO/S3"],
  },
  {
    group: "Сети",
    items: ["DNS", "HTTP/HTTPS", "TLS", "TCP/IP", "Firewall", "Reverse proxy"],
  },
  {
    group: "Backend",
    items: [
      "TypeScript",
      "Go",
      "Python/FastAPI",
      "Java/Spring Boot",
      "Bash",
      "REST API",
      "RabbitMQ",
    ],
  },
  {
    group: "Изучаю",
    items: ["Terraform", "Valkey", "LiveKit", "WebRTC/TURN"],
  },
  {
    group: "Софт",
    items: [
      "лидерство (команды 5–7)",
      "ревью",
      "коммуникация",
      "самостоятельная диагностика",
      "AI-assisted разработка",
    ],
  },
];

export const EDUCATION = {
  university: "Университет Иннополис",
  program: "«Разработка ПО»",
  years: "2023 — 2027",
  course: "4 курс",
  gpa: "GPA 4.6",
  thesis: {
    title: "Выпускная квалификационная работа",
    status: "в разработке",
    period: "2026 — 2027",
  },
  languages: [
    { name: "Русский", level: "родной" },
    { name: "Английский", level: "B2+" },
  ],
  studentLife:
    "Староста группы (с 2023), 20+ волонтёрств, студенческий совет: участник → председатель совета (июнь 2025 — январь 2026).",
};

export const NAV_SECTIONS = [
  { id: "experience", label: "опыт" },
  { id: "projects", label: "проекты" },
  { id: "achievements", label: "достижения" },
  { id: "skills", label: "навыки" },
  { id: "education", label: "образование" },
  { id: "contacts", label: "контакты" },
] as const;
