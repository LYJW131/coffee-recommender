module.exports = {
  apps: [
    {
      name: "liftttttt-frontend",
      script: "node",
      args: "--env-file=.env .output/server/index.mjs",
      cwd: "/var/www/liftttttt/frontend",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
  ],
};
