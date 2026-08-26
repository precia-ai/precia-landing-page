import 'server-only';
import type enDictionary from '@/dictionaries/en.json';
import type idDictionary from '@/dictionaries/id.json';

export type Dictionary = typeof idDictionary;

type Assignable<Source extends Target, Target> = [Source, Target];

/**
 * Compile time guard. en.json and id.json must stay structurally identical, so
 * a key added to one file and forgotten in the other fails the build here
 * instead of rendering as an empty string on the page.
 */
export type DictionariesInSync = [
  Assignable<typeof enDictionary, typeof idDictionary>,
  Assignable<typeof idDictionary, typeof enDictionary>,
];

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  id: () => import('@/dictionaries/id.json').then((module) => module.default),
};

export const getDictionary = async (locale: 'en' | 'id'): Promise<Dictionary> => {
  return dictionaries[locale]();
};
