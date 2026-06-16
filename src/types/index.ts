export type Subject = "fisica" | "matematica" | "quimica" | "programacion" | "electronica";
export type Level   = "secundaria" | "diversificado" | "universidad";

export interface CourseTopics {
  course: string;
  topics: string[];
}

export interface AvailabilitySlot {
  hour: string;
  days: { lun: boolean; mar: boolean; mie: boolean; jue: boolean; vie: boolean };
}

export interface Tutor {
  id:                string;
  slug:              string;
  name:              string;
  photo:             string;
  // NUEVO: imagen de banner para el perfil (estilo X/Twitter)
  // Si no tienes banner, deja como "" y se usará un fondo negro con el ícono de carrera
  banner:            string;
  career:            string;
  university:        string;
  badge:             string;
  since:             number;
  availabilityLabel: string;
  priceFrom:         number;
  subjects:          Subject[];
  levels:            Level[];
  bio:               string;
  topics:            CourseTopics[];
  schedule:          AvailabilitySlot[];
  whatsapp:          string;
}
