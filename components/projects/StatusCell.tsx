import { StatusBadge } from ".."
import { STATUS_BADGES } from '../StatusBadge';

interface Props {
  status: number;
}

export const StatusCell = ({ status } : Props) => {
  return (
    <StatusBadge badgeType={STATUS_BADGES[status-1]} />
  )
}
