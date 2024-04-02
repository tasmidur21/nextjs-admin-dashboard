import dynamic from 'next/dynamic';

export const Chart = dynamic(():any => import('react-apexcharts'), { ssr: false });
