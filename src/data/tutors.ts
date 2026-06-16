import type { Tutor } from "@/types";

export const TUTORS: Tutor[] = [
  {
    id:   "1",
    slug: "marcelo-ixquiac",
    name: "Marcelo Ixquiac",
    // CAMBIAR FOTO: coloca marcelo.jpg en public/FotoTutores/
    photo:  "/FotoTutores/marcelo.jpg",
    // CAMBIAR BANNER: coloca banner-marcelo.jpg en public/FotoTutores/
    banner: "",
    career:            "Física Pura",
    university:        "UVG",
    badge:             "Mentor UVG",
    since:             2023,
    availabilityLabel: "4PM - 9PM",
    priceFrom:         75,
    subjects:          ["fisica", "matematica"],
    levels:            ["diversificado", "universidad"],
    bio: "Estudiante de Física Pura en la UVG. Me apasiona explicar la física desde la intuición, no solo la fórmula. He ayudado a más de 30 estudiantes a aprobar Física 1 y 2.",
    topics: [
      { course: "Física 1",  topics: ["Leyes de Newton", "Fricción", "DCL", "Trabajo y Energía", "Momento Lineal"] },
      { course: "Física 2",  topics: ["Fluidos", "Bernoulli", "Hidrostática", "Termodinámica"] },
      { course: "Cálculo",   topics: ["Límites", "Derivadas", "Integrales", "Aplicaciones"] },
    ],
    schedule: [
      { hour: "4PM", days: { lun: true,  mar: true,  mie: false, jue: true,  vie: true } },
      { hour: "5PM", days: { lun: true,  mar: true,  mie: false, jue: true,  vie: true } },
      { hour: "6PM", days: { lun: true,  mar: true,  mie: false, jue: true,  vie: true } },
      { hour: "7PM", days: { lun: true,  mar: true,  mie: false, jue: true,  vie: true } },
      { hour: "8PM", days: { lun: true,  mar: true,  mie: false, jue: true,  vie: true } },
      { hour: "9PM", days: { lun: true,  mar: true,  mie: false, jue: true,  vie: true } },
    ],
    // CAMBIAR NÚMERO AQUÍ (formato 502XXXXXXXX)
    whatsapp: "50212345678",
  },
  {
    id:   "2",
    slug: "daniel-aguilar",
    name: "Daniel Aguilar",
    // CAMBIAR FOTO: coloca daniel.jpg en public/FotoTutores/
    photo:  "/FotoTutores/daniel.jpg",
    banner: "",
    career:            "Ingeniería en Ciencias de la Computación",
    university:        "UVG",
    badge:             "Mentor UVG",
    since:             2022,
    availabilityLabel: "5PM - 8PM",
    priceFrom:         90,
    subjects:          ["programacion", "matematica", "electronica"],
    levels:            ["diversificado", "universidad"],
    bio: "Estudiante de Ingeniería en Ciencias de la Computación. Tutorías de programación desde cero y matemática para ingeniería con ejemplos prácticos y proyectos reales.",
    topics: [
      { course: "Programación 1",             topics: ["Variables y tipos", "Condicionales", "Ciclos", "Funciones", "Arreglos"] },
      { course: "Estructuras de Datos",        topics: ["Listas enlazadas", "Pilas y colas", "Árboles", "Recursión"] },
      { course: "Matemática para Ingeniería",  topics: ["Álgebra lineal", "Vectores", "Matrices", "Ecuaciones diferenciales"] },
    ],
    schedule: [
      { hour: "4PM", days: { lun: false, mar: true,  mie: true,  jue: false, vie: true  } },
      { hour: "5PM", days: { lun: true,  mar: true,  mie: true,  jue: true,  vie: true  } },
      { hour: "6PM", days: { lun: true,  mar: true,  mie: true,  jue: true,  vie: false } },
      { hour: "7PM", days: { lun: true,  mar: false, mie: true,  jue: true,  vie: false } },
      { hour: "8PM", days: { lun: true,  mar: false, mie: true,  jue: true,  vie: false } },
      { hour: "9PM", days: { lun: false, mar: false, mie: false, jue: false, vie: false } },
    ],
    whatsapp: "50287654321",
  },
  {
    id:   "3",
    slug: "miguel-carranza",
    name: "Miguel Ángel Carranza",
    // CAMBIAR FOTO: coloca miguel.jpg en public/FotoTutores/
    photo:  "/FotoTutores/miguel.jpg",
    banner: "",
    career:            "Ingeniería en Sistemas",
    university:        "UVG",
    badge:             "Mentor UVG",
    since:             2023,
    availabilityLabel: "A coordinar",
    priceFrom:         40,   // Q40 por 40 minutos
    subjects:          ["matematica", "fisica"],
    levels:            ["secundaria", "diversificado"],
    bio: "21 años, estudiante de Ingeniería en Sistemas en la UVG. Me especializo en matemática y física para nivel secundario, con un enfoque claro y paso a paso. Q40 por sesión de 40 minutos.",
    topics: [
      {
        course: "Matemática Secundaria",
        topics: ["Álgebra", "Ecuaciones y desigualdades", "Factorización", "Productos notables", "Funciones", "Sistemas de ecuaciones", "Geometría", "Trigonometría", "Estadística básica", "Probabilidad", "Pre-cálculo"],
      },
      {
        course: "Física",
        topics: ["Leyes de Newton", "Fuerza y movimiento", "Fricción", "DCL", "Estática", "Trabajo y energía", "Cantidad de movimiento", "MRU", "MRUA"],
      },
    ],
    schedule: [
      { hour: "4PM", days: { lun: true,  mar: true,  mie: true,  jue: true,  vie: true } },
      { hour: "5PM", days: { lun: true,  mar: true,  mie: true,  jue: true,  vie: true } },
      { hour: "6PM", days: { lun: true,  mar: true,  mie: true,  jue: true,  vie: true } },
      { hour: "7PM", days: { lun: true,  mar: true,  mie: true,  jue: true,  vie: true } },
    ],
    // CAMBIAR NÚMERO DE WHATSAPP DE MIGUEL
    whatsapp: "50200000001",
  },
  {
    id:   "4",
    slug: "karmen",
    name: "Karmen",
    // CAMBIAR FOTO: coloca karmen.jpg en public/FotoTutores/
    photo:  "/FotoTutores/karmen.jpg",
    banner: "",
    career:            "Ingeniería Química",
    university:        "UVG",
    badge:             "Mentor UVG",
    since:             2023,
    availabilityLabel: "A coordinar",
    priceFrom:         75,
    subjects:          ["quimica", "matematica", "fisica"],
    levels:            ["secundaria", "diversificado", "universidad"],
    bio: "21 años, estudiante de Ingeniería Química en la UVG. Imparto tutorías de Matemática, Física, Química y Biología. Me apasiona hacer la ciencia accesible para todos los niveles.",
    topics: [
      { course: "Matemática",   topics: ["Álgebra", "Geometría", "Trigonometría", "Cálculo básico", "Estadística"] },
      { course: "Física",       topics: ["Mecánica", "Dinámica", "Estática", "Energía y trabajo", "Electricidad básica"] },
      { course: "Química",      topics: ["Química General", "Química Orgánica", "Química Inorgánica", "Bioquímica"] },
      { course: "Biología",     topics: ["Biología General", "Biología Celular", "Genética básica", "Microbiología básica"] },
    ],
    schedule: [
      { hour: "4PM", days: { lun: true,  mar: true,  mie: true,  jue: true,  vie: true } },
      { hour: "5PM", days: { lun: true,  mar: true,  mie: true,  jue: true,  vie: true } },
      { hour: "6PM", days: { lun: true,  mar: true,  mie: true,  jue: true,  vie: true } },
      { hour: "7PM", days: { lun: true,  mar: true,  mie: true,  jue: true,  vie: true } },
    ],
    // CAMBIAR NÚMERO DE WHATSAPP DE KARMEN
    whatsapp: "50200000002",
  },
];

// CAMBIAR NÚMERO PARA APLICACIONES DE MENTORES
export const MENTOR_APPLICATIONS_WHATSAPP = "50299999999";

export function getTutorBySlug(slug: string): Tutor | undefined {
  return TUTORS.find((t) => t.slug === slug);
}
