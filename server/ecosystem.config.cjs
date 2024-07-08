module.exports = {
  apps: [
    {
      name: "payment-reminder-app",
      script: "./dist/app.js",
      cwd: "./",
      env: {
        NODE_ENV: "production",
        PORT: 8080
      },
      watch: ["./dist"],
      ignore_watch: ["node_modules"],
      watch_delay: 1000,
      instances: 1,
      exec_mode: "cluster",
      log_file: '',
      out_file: '',
      error_file: '',
      time: true
    }
  ]
};
