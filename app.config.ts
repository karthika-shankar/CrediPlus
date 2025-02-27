export default {
    expo: {
      name: "App",
      slug: "app",
      version: "1.0.0",
      extra: {
        SUPABASE_URL: process.env.database_url ,
        SUPABASE_ANON_KEY: process.env.database_key ,
      },
    },
  };
  