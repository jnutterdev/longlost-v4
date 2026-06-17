import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '76a6ea953bc357c340b6b27801fc4d2cf97e3113', queries,  });
export default client;
  