import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyargs: false, // tells apollo we will take care of everything.
    // read comes with auto passed in args
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      // read num of items on page from cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // check for existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // if there are items and not enough items to satidfy how many were requested and we're on the last page, we just send it
      // this can come into play if we're on the last page and we might not have full num of items to fill last page
      if (items.length && items.length !== first && page === pages)
        return items;
      if (items.length !== first) {
        // no items, need to go to network to fetch
        return false;
      }

      // if items in cache return those
      if (items.length) return items;
      // fallback to network in all other cases.
      return false;

      // first as read function for items
      // could return items because they are in the cache
      // or return false which will trigger a network request
    },

    merge(existing, incoming, { args }) {
      // this runs when appollo client comes back from the network with our product
      const { skip, first } = args;

      const merged = existing ? existing.slice(0) : [];
      merged.push(incoming);
      // eslint-disable-next-line no-plusplus
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      // when returning from merge apollo will go back to the read function and try it again.
      return merged;
    },
  };
}
