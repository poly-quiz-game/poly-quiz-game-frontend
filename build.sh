npm run build
sudo scp -r ./build/* /var/www/poly-quiz-game-fe
sudo systemctl restart nginx