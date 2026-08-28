import { ReactNode } from 'react';

import { useSortable } from '@dnd-kit/react/sortable';

interface SortableProps {
  id: string;
  index: number;
  children: ReactNode;
}

const Sortable = ({ id, index, children }: SortableProps) => {
  const { ref } = useSortable({ id, index });

  return <div ref={ref}>{children}</div>;
};

export default Sortable;
