'use client';
import { funEmoji } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { signIn, signOut, useSession } from 'next-auth/react';
import { RefObject, useRef } from 'react';

export const Footer = () => {
  const avatarRef = useRef<HTMLUListElement>(null);
  function dropdownHandler(ref: RefObject<HTMLUListElement>) {
    if (ref && ref.current) {
      ref.current.classList.toggle('hidden');
    }
  }

  const handleLogIn = () => {
    signIn('keycloak', {
      // callbackUrl: 'http://localhost:3000/',
      callbackUrl: process.env.NEXT_PUBLIC_LOGIN_CALLBACK_URL,
    });
  };

  const handleLogOut = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'GET' });
      console.log('HEREREE');
      console.log(response);
      signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error(error);
    }
  };

  const { data: session, status } = useSession();

  return (
    <div className='hidden h-full items-center justify-end xl:flex'>
      <div className='flex h-full items-center'>
        <div className='flex h-full w-32 items-center justify-end border-r pr-16'></div>
        <div className='flex h-full w-full'>
          {/* <div className='flex h-full w-16 items-center justify-center xl:w-32 xl:border-r'>
            <div className='relative'>
              <a
                aria-label='show notifications'
                role='link'
                href='/'
                className='h-6 w-6 cursor-pointer text-gray-600 xl:h-auto xl:w-auto'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon icon-tabler icon-tabler-bell'
                  width='28'
                  height='28'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z'></path>
                  <path d='M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6'></path>
                  <path d='M9 17v1a3 3 0 0 0 6 0v-1'></path>
                </svg>
              </a>
              <div className='absolute inset-0 m-auto mr-1 mt-1 h-2 w-2 animate-ping rounded-full border border-white bg-red-400'></div>
            </div>
          </div> */}
          <div
            aria-haspopup='true'
            className='relative flex w-full cursor-pointer items-center justify-end'
          >
            {status === 'loading' && session && (
              <p className='ml-2 text-sm text-gray-800'>Loading...</p>
            )}
            {!session && status !== 'loading' && (
              <button
                className='h-12 w-20 border-spacing-2  rounded-lg border-2 border-slate-800 text-slate-800 hover:bg-slate-600 hover:font-medium hover:text-white'
                onClick={handleLogIn}
              >
                <p className='m-auto text-center text-sm'>Sign in</p>
              </button>
            )}
            {session && (
              <>
                <button
                  aria-haspopup='true'
                  onClick={() => dropdownHandler(avatarRef)}
                  className='flex items-center rounded focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2'
                >
                  {session.user?.name && (
                    <img
                      className='h-10 w-10 rounded-full object-cover'
                      src={createAvatar(funEmoji, {
                        seed: session?.user?.name,
                      }).toDataUriSync()}
                      alt='avatar'
                    />
                  )}

                  <p className='ml-2 text-sm text-gray-800'>
                    {session.user?.name}
                  </p>
                </button>
                <button
                  className='mx-2 h-12 w-20 border-spacing-2  rounded-lg border-2 border-slate-800 text-slate-800 hover:bg-slate-600 hover:font-medium hover:text-white'
                  onClick={handleLogOut}
                >
                  <p className='m-auto text-center text-sm'>Log out</p>
                </button>
              </>
            )}

            <ul
              ref={avatarRef}
              className='absolute left-0 z-40 mt-48 hidden w-40 rounded border-r bg-white p-2 shadow'
            >
              <li className='cursor-pointer py-2 text-sm leading-3 tracking-normal text-gray-600 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none'>
                <div className='flex items-center'>
                  {session?.user?.name && (
                    <img
                      className='h-8 w-8 rounded-full'
                      src={createAvatar(funEmoji, {
                        seed: session?.user?.name,
                      }).toDataUriSync()}
                    />
                  )}

                  {/* <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-user'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' />
                    <circle cx='12' cy='7' r='4' />
                    <path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' />
                  </svg> */}
                  <a href='/' className='ml-2'>
                    My Profile
                  </a>
                </div>
              </li>
              <li className='mt-2 flex cursor-pointer items-center py-2 text-sm leading-3 tracking-normal text-gray-600 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon icon-tabler icon-tabler-help'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' />
                  <circle cx='12' cy='12' r='9' />
                  <line x1='12' y1='17' x2='12' y2='17.01' />
                  <path d='M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4' />
                </svg>
                <a href='/' className='ml-2'>
                  Help Center
                </a>
              </li>
              <li className='mt-2 flex cursor-pointer items-center py-2 text-sm leading-3 tracking-normal text-gray-600 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon icon-tabler icon-tabler-settings'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' />
                  <path d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
                  <circle cx='12' cy='12' r='3' />
                </svg>
                <a href='/' className='ml-2'>
                  Account Settings
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
