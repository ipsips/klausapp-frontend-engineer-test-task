import { serve } from 'https://deno.land/std@0.114.0/http/server.ts';

serve((_req) => {
  /**
   * Known issue: https://github.com/justjavac/typescript-deno-plugin/blob/v1.29.0/lib/lib.deno.d.ts#L2675
   */
  // @ts-ignore
  return new Response('Hello World!', {
    headers: { 'content-type': 'text/plain' },
  });
});
