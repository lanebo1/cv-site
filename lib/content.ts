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
    "Делаю инфраструктуру, которая не падает, и автоматизирую всё, что делается руками.",
  roles: ["DevOps Engineer", "Infra Architect", "AI-assisted Builder"],
};

export const FINALE = {
  headline: "Пойдём строить?",
  subline:
    "Пайплайны, мониторинг, предсказуемые релизы и инфраструктура, которую не стыдно показать. Напишите — обсудим вашу задачу.",
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
      "Разрабатываю новый функционал внутреннего продукта на Java. Каждый компонент закрываю тестами трёх уровней: юнит, интеграция, e2e. К значимым изменениям готовлю RFC — решение сначала формулирую и согласовываю, затем реализую. Участвую в код-ревью команды.",
    stack: [
      "Java",
      "k8s",
      "GitLab CI/CD",
      "REST",
      "GraphQL",
      "Redis",
      "Spring Boot",
      "Maven",
      "Mockito",
      "Allure",
    ],
  },
  {
    company: "ВК",
    role: "DevOps инженер",
    period: "Ноябрь 2025 — Май 2026",
    kind: "Full-time",
    description:
      "Моя первая большая прод-инфраструктура: Docker и Kubernetes, пайплайны GitLab CI на Kotlin DSL, собственные раннеры. Собрал observability-стек — Prometheus собирает, Loki хранит, Grafana показывает. Инциденты разбирал по логам и метрикам — с причиной и способом исправления. Релизы шли без остановки сервиса.",
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
];

export type Project = {
  name: string;
  tag: string;
  role: string;
  period: string;
  description: string;
  result: string;
  stack: string[];
  link: { label: string; href: string };
};

export const PROJECTS: Project[] = [
  {
    name: "WikiLive",
    tag: "MTS True Tech Hack 2026",
    role: "Идея, продуктовая логика, frontend, координация",
    period: "Апрель 2026",
    description:
      "Документы, которые редактирует вся команда одновременно — без конфликтов и потерянных правок. За один хакатон: идея, MVP на Yjs + BlockNote, frontend и командная координация.",
    result: "Победа в номинации «Лучшее решение»",
    stack: ["React", "TypeScript", "Vite", "Mantine", "Yjs", "BlockNote"],
    link: {
      label: "mts-true-tech-hack-26",
      href: "https://github.com/motor-screwdriver/mts-true-tech-hack-26",
    },
  },
  {
    name: "Open Labs Share",
    tag: "IU Capstone Project 2025",
    role: "DevOps, технический координатор команды из 7 человек",
    period: "Июнь — Август 2025",
    description:
      "Микросервисная платформа для Иннополиса. Я поднял self-hosted GitHub Actions-раннеры и провёл blue-green деплой за HAProxy — новые версии выкатываются без минуты простоя, откат занимает секунды.",
    result: "Релизы без простоя, инфраструктура пережила весь капстоун",
    stack: ["Docker", "PostgreSQL", "MinIO", "GitHub Actions", "HAProxy"],
    link: {
      label: "open-labs-share",
      href: "https://github.com/IU-Capstone-Project-2025/open-labs-share",
    },
  },
  {
    name: "Distributed Log Analysis",
    tag: "Distributed systems",
    role: "DevOps, координатор разработки",
    period: "Апрель 2025",
    description:
      "Фреймворк, который собирает логи с кучи разрозненных серверов и складывает их в одно читаемое место: NGINX принимает, RabbitMQ развозит, MongoDB хранит. Деплой на собственный сервер — полностью автоматический.",
    result: "Анализ логов превратился из ручного разбора в автоматический пайплайн",
    stack: ["Docker", "MongoDB", "NGINX", "RabbitMQ", "Yandex Cloud"],
    link: {
      label: "Distributed-Log-Analysis-Framework",
      href: "https://github.com/Linch-JG/Distributed-Log-Analysis-Framework",
    },
  },
  {
    name: "Elect.Gen",
    tag: "Университет Иннополис",
    role: "Backend + DevOps, координатор команды из 5 человек",
    period: "Июнь — Июль 2024",
    description:
      "Распределение сотен студентов по элективам — автоматически, вместо ручных таблиц и согласований в чатах. REST API на PostgreSQL, CI/CD с автотестами, деплой в Yandex Cloud по кнопке.",
    result: "Работает на реальном потоке Университета Иннополис",
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
