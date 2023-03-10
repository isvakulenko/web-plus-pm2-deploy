require('dotenv').config();

const {
  NODE_ENV, JWT_SECRET, DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF,
} = process.env;

module.exports = {
  apps: [{
    name: 'mesto-backend',
    script: 'dist/app.js',
    env_production: {
      NODE_ENV,
      JWT_SECRET,
    },
  }],
  // Настройка деплоя
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'git@github.com:isvakulenko/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'cd backend && npm i && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
