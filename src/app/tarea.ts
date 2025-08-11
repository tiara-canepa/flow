export interface Tarea {
  id: number,
  fechaInicio?: Date,
  fechaTermino: Date,
  titulo: string,
  descripcion?: string,
  notas?: string,
  estado: Estado
  notifDay: Boolean
  notifStart: Boolean
  notifEnd: Boolean
}

export enum Estado {
  Completada,
  EnProgreso,
  Incompleta,
}
