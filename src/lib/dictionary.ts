import 'server-only';
import type idDictionary from '@/dictionaries/id.json';

export type Dictionary = typeof idDictionary;

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  id: () => import('@/dictionaries/id.json').then((module) => module.default),
};

export const getDictionary = async (locale: 'en' | 'id'): Promise<Dictionary> => {
  return dictionaries[locale]();
};
