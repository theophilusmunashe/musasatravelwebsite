module.exports = {
  apps: [
    {
      name: "kumusha",
      script: "server.js",
      cwd: "/var/www/kumusha",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      env_file: "/var/www/kumusha/.env",
    },
  ],
};
