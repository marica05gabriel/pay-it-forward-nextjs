import { Segment } from '@/utils/routes-util';
import Link from 'next/link';

interface Props {
  title: string;
  routeSegments: Segment[];
}

export const TitlePanel = ({ title, routeSegments }: Props) => {
  return (
    <div className='relative z-10 bg-gray-800 pb-16 pt-8'>
      <div className='container mx-auto flex flex-col items-start justify-between px-6 lg:flex-row lg:items-center'>
        <div className='flex flex-col items-start lg:flex-row lg:items-center'>
          <div className='my-6 ml-0 lg:my-0 lg:ml-20'>
            <h4 className='mb-2 text-2xl font-bold leading-tight text-white'>
              {title}
            </h4>
            <p className='flex items-center text-xs text-gray-300'>
              {routeSegments.map((segment, index) => {
                return (
                  <Link href={segment.route} key={index}>
                    <span className='mx-2'>&gt;</span>
                    <span className='cursor-pointer'>{segment.label}</span>
                  </Link>
                );
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
