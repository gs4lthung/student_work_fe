'use client';

import { useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import '../../app/globals.css';

let timer: NodeJS.Timeout;
let state: 'idle' | 'loading' | 'stop' = 'idle';
let activeRequests = 0;
const delay = 250;

function load() {
  if (state === 'loading') return;

  state = 'loading';
  timer = setTimeout(() => {
    NProgress.start();
  }, delay);
}

function stop() {
  if (activeRequests > 0) return;

  state = 'stop';
  clearTimeout(timer);
  NProgress.done();
}

let fetchPatched = false;

function patchFetch() {
  if (fetchPatched) return;

  const originalFetch = window.fetch;

  window.fetch = async function (...args) {
    if (activeRequests === 0) load();
    activeRequests++;

    try {
      const response = await originalFetch(...args);
      return response;
    } catch (err) {
      return Promise.reject(err);
    } finally {
      activeRequests--;
      if (activeRequests === 0) stop();
    }
  };

  fetchPatched = true;
}

export default function ProgressBarManager() {
  useEffect(() => {
    Router.events.on('routeChangeStart', load);
    Router.events.on('routeChangeComplete', stop);
    Router.events.on('routeChangeError', stop);

    patchFetch(); // patch once on client

    return () => {
      Router.events.off('routeChangeStart', load);
      Router.events.off('routeChangeComplete', stop);
      Router.events.off('routeChangeError', stop);
    };
  }, []);

  return null; // This is a manager, it renders nothing
}
