import { ValidAnteproyectoStatus } from "@/data/anteproyecto";

export type STATUS_BADGE_TYPE = {style: string, name: ValidAnteproyectoStatus}

const APROBADO: STATUS_BADGE_TYPE = {style: 'bg-green-100 text-green-800', name: 'aprobado'}
const NO_APROBADO:STATUS_BADGE_TYPE = {style: 'bg-red-100 text-red-800', name: 'no aprobado'}
const PENDIENTE: STATUS_BADGE_TYPE = {style: 'bg-amber-200 text-amber-800', name: 'pendiente'}

export const STATUS_BADGES = [
  APROBADO,
  NO_APROBADO,
  PENDIENTE
]

export interface Props {
  badgeType: STATUS_BADGE_TYPE;
}

export const StatusBadge = ({ badgeType } :Props) => {
  return (
    <>
      <span className={`${badgeType.style} text-sm uppercase font-medium text-center justify-center flex whitespace-nowrap px-2.5 py-0.5 rounded-full `}>
        {badgeType.name}
      </span>
    </>
  )
}
