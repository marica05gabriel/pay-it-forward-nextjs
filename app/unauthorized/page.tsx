'use client';
import { RoutesEnum, getRouteSettings } from '@/utils/routes-util';
import { TitlePanel } from '@/components/panels/title-panel';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import _, { isEmpty } from 'lodash';

const Unauthorized = () => {
  const searchParams = useSearchParams();

  const currentRoute = RoutesEnum.DASHBOARD;
  const routeSettings = getRouteSettings(currentRoute);

  const callbackUrlFromParams = searchParams.get('callbackUrl');
  const callbackUrl =
    callbackUrlFromParams != null
      ? callbackUrlFromParams
      : 'http://localhost:3000/';

  console.log('CALLBACK URL HERE');
  console.log(callbackUrlFromParams);
  console.log(callbackUrl);

  const handleLogIn = () => {
    if (_.isEmpty(callbackUrl)) {
      signIn('keycloak', {
        callbackUrl: callbackUrl,
      });
      return;
    }
    signIn('keycloak', {
      callbackUrl: callbackUrl,
    });
  };
  return (
    <>
      <TitlePanel
        title={routeSettings.label}
        routeSegments={routeSettings.segments}
      />
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <div className='flex flex-col items-center text-gray-700'>
          <div role='alert'>
            <div className='rounded-t bg-red-500 px-4 py-2 font-bold text-white'>
              UNAUTHORIZED
            </div>
            <div className='rounded-b border border-t-0 border-red-400 bg-red-100 px-4 py-3 text-red-700'>
              <p>You need to be logged in to access this page!</p>
            </div>
          </div>
          <div className='m-5 h-16 w-24 items-center'>
            <button
              onClick={handleLogIn}
              type='button'
              className='mb-2 me-2 rounded-lg bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800'
            >
              Log in
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Unauthorized;
