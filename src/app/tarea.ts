export interface Tarea {
  id: number,
  fechaInicio?: Date,
  fechaTermino: Date,
  titulo: string,
  descripcion?: string,
  notas?: string,
  estado: Estado
}

export enum Estado {
  Completada,
  EnProgreso,
  Incompleta,
}
