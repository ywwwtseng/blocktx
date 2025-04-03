# Setup AWS EC2

```bash
# update
sudo yum update -y

# install git
sudo yum install -y git

# install node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

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

pm2 start ~/app/sync-binance-news.mjs --cron-restart="*/15 * * * *" --name "sync-binance-news"
```