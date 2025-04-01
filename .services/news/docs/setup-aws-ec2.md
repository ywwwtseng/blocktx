# Setup AWS EC2

```bash
# update
sudo yum update -y

# install git
sudo yum install -y git

# install node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 16.20.0
nvm use 16.20.0

# install pm2
npm install -g pm2

# install unzip
sudo yum install -y unzip

# install bun
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# generate ssh key
ssh-keygen -t ed25519 -C "blocktx-ec2" -f ~/.ssh/id_ed25519 -N ""
cat ~/.ssh/id_ed25519.pub

# update github ssh config
echo "Host github
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519" >> ~/.ssh/config

# change ssh permissions
sudo chmod 700 ~/.ssh
sudo chmod 600 ~/.ssh/id_ed25519
sudo chmod 600 ~/.ssh/id_ed25519.pub
sudo chmod 600 ~/.ssh/config

# install chromium dependencies
# sudo yum install -y \
#   chromium \
#   fontconfig \
#   freetype \
#   cairo \
#   pango \
#   alsa-lib \
#   gtk3 \
#   libXScrnSaver \
#   libappindicator3-1 \
#   libatk-bridge2.0-0 \
#   libatk1.0-0 \
#   libcups2 \
#   libdbus-1-3 \
#   libgdk-pixbuf2.0-0 \
#   libnspr4 \
#   libnss3 \
#   libx11-xcb1 \
#   libxcomposite1 \
#   libxdamage1 \
#   libxrandr2 \
#   xdg-utils

# install chromium dependencies
npx puppeteer browsers install chrome

sudo yum install -y \
  fontconfig \
  freetype \
  cairo \
  pango \
  alsa-lib \
  gtk3 \
  libXScrnSaver \
  xdg-utils

pm2 start ~/app/news.mjs --cron-restart="*/15 * * * *" --name "news-service"
```