import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date: number): string => {
    const fromNow = formatDistanceToNow(date, { addSuffix: true, locale: es });

    return fromNow;
};
