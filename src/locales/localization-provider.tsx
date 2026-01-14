'use client';

import 'dayjs/locale/en';
import 'dayjs/locale/vi';
import 'dayjs/locale/fr';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/ar-sa';

import dayjs from 'dayjs';
import { useEffect } from 'react';

import { useTranslate } from './use-locales';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

/**
 * LocalizationProvider - Wrapper simple pour gérer la locale dayjs
 * MUI X Date Pickers a été supprimé, donc on gère juste la locale dayjs
 */
export function LocalizationProvider({ children }: Props) {
  const { currentLang } = useTranslate();

  useEffect(() => {
    dayjs.locale(currentLang.adapterLocale);
  }, [currentLang.adapterLocale]);

  return <>{children}</>;
}
