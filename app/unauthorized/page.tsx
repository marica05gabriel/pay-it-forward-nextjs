'use client';
import { RoutesEnum, getRouteSettings } from '@/utils/routes-util';
import { TitlePanel } from '@/components/panels/title-panel';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import _, { isEmpty } from 'lodash';
import { Suspense } from 'react';
import { UnauthorizedForm } from './UnauthorizedForm';

const Unauthorized = () => {
  const currentRoute = RoutesEnum.DASHBOARD;
  const routeSettings = getRouteSettings(currentRoute);
  return (
    <>
      <TitlePanel
        title={routeSettings.label}
        routeSegments={routeSettings.segments}
      />
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <Suspense>
          <UnauthorizedForm />
        </Suspense>
      </main>
    </>
  );
};

export default Unauthorized;
