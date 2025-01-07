import React from 'react';

interface KeyMetricsCardProps {
    title: string;
    value: number;
    prefix?: string;
    suffix?: string;
}

const KeyMetricsCard: React.FC<KeyMetricsCardProps> = ({ title, value, prefix, suffix }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-3xl font-bold">
                {prefix}{value}{suffix}
            </p>
        </div>
    );
};

export default KeyMetricsCard;