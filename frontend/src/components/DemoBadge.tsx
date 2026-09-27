import { FlaskConical } from 'lucide-react';

export default function DemoBadge({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-1.5 badge-demo w-fit">
      <FlaskConical size={11} />
      {!compact && <span>DEMO ENVIRONMENT</span>}
      {compact && <span>DEMO</span>}
    </div>
  );
}
