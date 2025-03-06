export const ENV = {
  MODE: (import.meta.env.MODE as 'development' | 'production' | 'test') || 'production',
  IS_DEV: import.meta.env.MODE === 'development',
  IS_PROD: import.meta.env.MODE === 'production',
  IS_TEST: import.meta.env.MODE === 'test',
};
