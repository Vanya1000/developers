import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { HALF_MINUTE } from '../../constants';

interface TimeAgoDisplayProps {
    dateString: string;
    updateInterval?: number;
}

export const TimeAgo = ({ dateString, updateInterval = HALF_MINUTE }: TimeAgoDisplayProps) => {
    const [timeAgo, setTimeAgo] = useState('');

    useEffect(() => {
        const updateTimeAgo = () => {
            if (!dateString) return;

            try {
                const date = new Date(dateString);
                const newTimeAgo = formatDistanceToNow(date, { addSuffix: true });
                setTimeAgo(newTimeAgo);
            } catch (error) {
                console.error('Invalid date string provided:', error);
                setTimeAgo('Invalid date');
            }
        };
        updateTimeAgo();

        const intervalId = setInterval(updateTimeAgo, updateInterval);

        return () => clearInterval(intervalId);
    }, [dateString, updateInterval]);

    if (!dateString) return null;

    return <div className="mt-4 text-sm text-gray-500">Last updated: {timeAgo}</div>;
};
