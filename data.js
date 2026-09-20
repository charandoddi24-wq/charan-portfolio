const PORTFOLIO = {
  name: "Rama Sri Charan Doddi",
  shortName: "RSC",
  brand: "Charan Doddi",
  title: "Computer Science · Data Science",
  location: "Tuni, Andhra Pradesh",
  email: "charandoddi08@gmail.com",
  tagline: "Building useful systems with code & data.",
  headlineAccent: "useful systems",
  summary:
    "a B.Tech CSE (Data Science) undergraduate focused on backend development, full-stack applications, and practical machine learning.",
  currently: {
    status: "Learning · Building · Shipping",
    stack: "Java · Python · MERN · Data Science",
  },
  stats: [
    { value: "8.74", label: "CGPA" },
    { value: "2024–28", label: "B.Tech" },
    { value: "4+", label: "Projects" },
  ],
  about: {
    kicker: "01 / ABOUT",
    heading: "Beyond coursework,",
    emphasis: "I build complete systems.",
    paragraphs: [
      "Computer Science (Data Science) undergraduate with hands-on backend development experience in Java, Python, and the MERN stack.",
      "Comfortable owning the API and database layer on team projects — authentication, schema design, and role-based access control — while building complete, working systems beyond coursework.",
    ],
  },
  skills: [
    { name: "Languages", items: "Java · Python · C" },
    { name: "Core CS", items: "Data Structures · OOP · Operating Systems" },
    { name: "Web", items: "HTML · CSS · MongoDB · Express.js · React · Node.js" },
    { name: "Database", items: "MySQL · MongoDB · Schema Design" },
    { name: "Developer Tools", items: "Git · GitHub · VS Code" },
    { name: "ML / Data", items: "Pandas · scikit-learn · SHAP · EDA" },
  ],
  projectsIntro:
    "From prediction pipelines to role-based platforms, each project is about making the pieces work together.",
  projects: [
    {
      id: "student-performance",
      title: "Student Performance\nScore Predictor",
      category: "ML",
      tags: ["Python", "Pandas", "scikit-learn", "SHAP"],
      featured: true,
      art: "ml",
      github: "https://github.com/charandoddi24-wq/Student-Performance-Analysis",
      summary:
        "End-to-end regression pipeline predicting student exam scores from study hours, attendance, tutoring, and demographic features. Included EDA, data cleaning, categorical encoding, model comparison, GridSearchCV tuning, cross-validation, MAE/RMSE/R² evaluation, and SHAP feature importance.",
      highlights: [
        "Compared multiple regression models and tuned with GridSearchCV",
        "Evaluated with MAE, RMSE, and R² plus cross-validation",
        "Explained predictions using SHAP feature importance",
      ],
    },
    {
      id: "leave-management",
      title: "Employee Leave\nManagement System",
      category: "Java",
      tags: ["Java", "Swing", "JDBC", "MySQL"],
      art: "java",
      github: "https://github.com/charandoddi24-wq/Employee-Leave-Management-System",
      summary:
        "Desktop leave management system with role-based access control, leave validation, automated approval workflow, and real-time leave-balance tracking for employees and admins.",
      highlights: [
        "Role-based access for employees and admins",
        "Leave validation with automated approval workflow",
        "Real-time leave-balance tracking on MySQL",
      ],
    },
    {
      id: "hospital-booking",
      title: "Hospital Appointment\nBooking System",
      category: "MERN",
      tags: ["MongoDB", "Express.js", "React", "Node.js"],
      art: "mern",
      github: "https://github.com/charandoddi24-wq/hospital-appointment-booking",
      summary:
        "Full-stack appointment platform supporting Patient, Doctor, and Admin roles with JWT authentication, role-based access control, and secure REST APIs for scheduling, appointment management, and doctor availability.",
      highlights: [
        "Patient, Doctor, and Admin roles with JWT auth",
        "Secure REST APIs for scheduling and availability",
        "Role-based access control across the platform",
      ],
    },
    {
      id: "library-analysis",
      title: "Library Dataset\nAnalysis",
      category: "Data",
      tags: ["Python", "Data Analysis"],
      art: "data",
      summary:
        "Analyzed library borrowing data to evaluate student academic engagement through borrowing frequency, duration, and book categories, surfacing patterns for data-driven library and academic planning.",
      highlights: [
        "Measured borrowing frequency, duration, and categories",
        "Linked library usage to academic engagement signals",
        "Surfaced patterns for data-driven planning",
      ],
    },
  ],
  education: [
    {
      years: "2024–2028",
      degree: "B.Tech – CSE (Data Science)",
      school: "Aditya University, Kakinada",
      score: "8.74 CGPA",
    },
    {
      years: "2022–2024",
      degree: "Intermediate",
      school: "Sri Harsha Junior College",
      score: "883 / 1000",
    },
    {
      years: "2020–2021",
      degree: "Secondary School of Education",
      school: "Loyola English Medium School",
      score: "569 / 600",
    },
  ],
  certifications: [
    "Agile Software Engineering — Coursera",
    "DBMS — Coursera",
    "Fundamentals of Data Science — Coursera",
    "Excel Basics for Data Analysis — IBM",
    "Getting Started with Artificial Intelligence — IBM",
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/charandoddi24-wq" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rama-sri-charan-doddi" },
  ],
  nav: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ],
};
