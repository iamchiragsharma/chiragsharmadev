export const sampleBlogs = [
  {
    id: 1,
    title: 'How to Install Magento 2.4.9 (Latest Version) on Ubuntu - The Ultimate Guide',
    excerpt: 'The most complete, end-to-end guide to installing Magento 2.4.9 on Ubuntu. Covers LAMP, PHP 8.3/8.4, OpenSearch, Virtual Hosts, Cron Jobs, and solving the 2FA login issue.',
    category: 'Tutorial',
    content: `Installing Magento 2 is famous for being "difficult," but that is only because most guides miss the small details. In this ultimate end-to-end guide, we will install **Magento 2.4.9** (the latest stable version released May 2026) on Ubuntu with zero errors.

## Step 1: System Update
Start by making sure your Ubuntu server is completely up to date.
\`\`\`bash
sudo apt update && sudo apt upgrade -y
\`\`\`

## Step 2: Install Apache Web Server
Apache is our primary web server.
\`\`\`bash
sudo apt install apache2 -y
sudo systemctl enable apache2
sudo a2enmod rewrite
sudo systemctl restart apache2
\`\`\`

## Step 3: Install PHP 8.3 (or 8.4) & Extensions
Magento 2.4.9 supports the latest PHP versions. We will use **PHP 8.3** as it is the current standard for stability and speed.
\`\`\`bash
sudo apt install software-properties-common -y
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update
sudo apt install php8.3 php8.3-cli php8.3-fpm php8.3-mysql php8.3-xml php8.3-curl php8.3-gd php8.3-intl php8.3-mbstring php8.3-soap php8.3-zip php8.3-bcmath -y
\`\`\`
**Crucial:** Update your \`php.ini\` (both for Apache and CLI):
\`\`\`ini
memory_limit = 2G
max_execution_time = 1800
zlib.output_compression = On
\`\`\`

## Step 4: Install MySQL 8.0
\`\`\`bash
sudo apt install mysql-server -y
sudo mysql -u root -p
\`\`\`
Inside MySQL, create the database:
\`\`\`sql
CREATE DATABASE magento2;
CREATE USER 'magento_user'@'localhost' IDENTIFIED BY 'StrongPassword123!';
GRANT ALL PRIVILEGES ON magento2.* TO 'magento_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
\`\`\`

## Step 5: Install OpenSearch 2.x (Required)
Magento 2.4+ will NOT install without a search engine. OpenSearch is the modern, open-source requirement.
\`\`\`bash
curl -fsSL https://artifacts.opensearch.org/publickeys/opensearch.pgp | sudo gpg --dearmor -o /usr/share/keyrings/opensearch.gpg
echo "deb [signed-by=/usr/share/keyrings/opensearch.gpg] https://artifacts.opensearch.org/releases/bundle/opensearch/2.x/apt stable main" | sudo tee /etc/apt/sources.list.d/opensearch-2.x.list
sudo apt update
sudo apt install opensearch -y
sudo systemctl enable opensearch
sudo systemctl start opensearch
\`\`\`

## Step 6: Install Composer 2
\`\`\`bash
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
\`\`\`

## Step 7: Download Magento 2.4.9
Navigate to your web directory and pull the latest code:
\`\`\`bash
cd /var/www/html
sudo composer create-project --repository-url=https://repo.magento.com/ magento/project-community-edition=2.4.9 magento2
\`\`\`
*(Note: You need your Public/Private keys from marketplace.magento.com).*

## Step 8: Apache Virtual Host Configuration
You MUST point your DocumentRoot to the \`pub/\` folder.
\`\`\`bash
sudo nano /etc/apache2/sites-available/magento2.conf
\`\`\`
Paste this (replace \`example.com\` with your IP/Domain):
\`\`\`apache
<VirtualHost *:80>
    ServerName example.com
    DocumentRoot /var/www/html/magento2/pub
    <Directory /var/www/html/magento2/pub>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
\`\`\`
\`\`\`bash
sudo a2ensite magento2.conf
sudo a2dissite 000-default.conf
sudo systemctl restart apache2
\`\`\`

## Step 9: Permissions & Installation
\`\`\`bash
cd /var/www/html/magento2
sudo find var generated vendor pub/static pub/media app/etc -type f -exec chmod g+w {} +
sudo find var generated vendor pub/static pub/media app/etc -type d -exec chmod g+ws {} +
sudo chown -R www-data:www-data .

bin/magento setup:install \\
--base-url="http://example.com/" \\
--db-host="localhost" \\
--db-name="magento2" \\
--db-user="magento_user" \\
--db-password="StrongPassword123!" \\
--admin-firstname="Admin" \\
--admin-lastname="User" \\
--admin-email="admin@example.com" \\
--admin-user="admin" \\
--admin-password="AdminPassword123!" \\
--language="en_US" \\
--currency="USD" \\
--timezone="America/Chicago" \\
--use-rewrites="1" \\
--search-engine="opensearch" \\
--opensearch-host="localhost" \\
--opensearch-port="9200"
\`\`\`

## Step 10: The "2FA" Fix
By default, Magento enables Two-Factor Authentication. Disable it temporarily to log in for the first time:
\`\`\`bash
bin/magento module:disable Magento_TwoFactorAuth
bin/magento cache:flush
\`\`\`

## Step 11: Final Polish (Cron & Mode)
Install the crontab:
\`\`\`bash
bin/magento cron:install
\`\`\`
And set the mode to developer:
\`\`\`bash
bin/magento deploy:mode:set developer
\`\`\`

Congratulations! You have installed the latest stable **Magento 2.4.9** on Ubuntu.`,
    date: '2026-05-16',
    likes: 124,
    comments: []
  }
];
