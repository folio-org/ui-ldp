// Only needed for debugging

import localforage from 'localforage';

const localforageWithDebugging = {
  setItem: async (namespace, value) => {
    const res = await localforage.setItem(namespace, value);
    // eslint-disable-next-line no-console
    console.log(`localforage: set '${namespace}' to`, value);
    return res;
  },
  getItem: async (namespace) => {
    const value = await localforage.getItem(namespace);
    // eslint-disable-next-line no-console
    console.log(`localforage: get '${namespace}' yielded`, value);
    return value;
  },

  // Full API also includes: removeItem, clear, length, key, keys, iterate
  // But we don't use those in ui-ldp, so no need to proxy them
  // See https://localforage.github.io/localForage/
};

export default localforageWithDebugging;
