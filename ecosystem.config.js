module.exports = {
  apps: [
    {
      name: 'office-nest',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 150, // Updated to user's specified port
      },
    },
  ],
};
