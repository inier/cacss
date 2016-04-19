@echo off
echo ########  Gulp Install START  ######## 
browser-sync start --server --files="*.html,css/*.css,*.css" --browser="google chrome" --open="external"
echo ########  Gulp Install END    ########
pause