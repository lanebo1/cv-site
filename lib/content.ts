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
  "DevOps-инженер, 2+ года практики: CI/CD, контейнеры, observability. Держал прод на Docker и Kubernetes, поднимал self-hosted раннеры, NGINX+TLS и blue-green деплои. Диагностирую инциденты по логам и метрикам, читаю backend-код на TS, Python, Java и Go.";

export const HERO = {
  tagline:
    "Собираю инфраструктуру, которая не падает. Автоматизирую всё, что запускается дважды.",
  roles: ["DevOps Engineer", "Infra Architect", "AI-assisted Builder"],
};

export const FINALE = {
  headline: "Пойдём строить?",
  subline:
    "Прод, который падает по ночам, пайплайны, собранные на коленке, инфраструктура без метрик — я это чиню. Напишите: обсудим вашу.",
};

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
      "Пишу продовый Java — новый функционал внутреннего продукта. Закрываю фичи юнит-, интеграционными и e2e-тестами, ревьюю чужой код и оформляю RFC: сначала объясняю решение, потом реализую.",
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
      "Придумал идею и сам довёл её до MVP за один хакатон: совместное редактирование документов в реальном времени. Продуктовая логика, координация команды, frontend — и «Лучшее решение» MTS True Tech Hack 2026 в качестве результата.",
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
      "Держал на себе инфраструктуру Docker/K8s и пайплайны GitLab CI на Kotlin DSL — от раннеров до прод-релизов. Собрал observability-стек Prometheus + Loki + Grafana и разбирал прод-инциденты по логам и метрикам, пока релизы оставались стабильными.",
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
      "Вёл команду из 7 человек на микросервисной архитектуре. Поднял self-hosted GitHub Actions-раннеры и провёл blue-green деплой за HAProxy — релизы без минуты простоя.",
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
      "Собрал систему, которая собирает логи с распределённых серверов и делает их читаемыми: NGINX, RabbitMQ, MongoDB, автодеплой через self-hosted runner. Вёл одновременно команду и инфраструктуру.",
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
      "Распределял студентов на элективы Университета Иннополис — автоматически, а не через таблицы: REST API на PostgreSQL, CI/CD с автотестами и деплоем. Координировал 5 разработчиков.",
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
      "Совместное редактирование документов в реальном времени. Придумал, скоординировал и закрыл frontend на Yjs/BlockNote — синхронизация без конфликтов, редактор без задержек.",
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
      "Распределение студентов на элективы вместо ручных таблиц: REST API на PostgreSQL, CI/CD с автотестами и деплоем. Координировал 5 разработчиков.",
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
      "Микросервисная платформа, где релизы не останавливают сервис: blue-green за HAProxy без простоя, плюс self-hosted GitHub Actions-раннеры.",
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
      "Логи с распределённых серверов собираются в одном месте и становятся читаемыми: NGINX, RabbitMQ, MongoDB, автодеплой через self-hosted runner.",
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
    text: "Сейчас пишу ВКР — выпускную работу по направлению DevOps.",
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
