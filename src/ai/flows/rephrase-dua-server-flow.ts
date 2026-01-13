'use server';

import { rephraseDua } from './rephrase-dua-flow';

// Server action wrapper for the rephrase dua flow
export async function rephraseDuaServer(intention: string) {
  return rephraseDua({ intention });
}