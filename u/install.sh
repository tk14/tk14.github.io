files=(.tmux.conf .zshrc .vimrc)
echo "Enter the home directory (e.g. username) :"
read HOME
if [ -z $HOME ]; then
    $HOME = 'username'
fi 
wget http://tk14.github.io/d/d.zip -P "/home/$HOME"
wget -q http://tk14.github.io/d/vvimrc -P "/home/$HOME"
unzip "/home/$HOME/d.zip"
cd "/home/$HOME"
mv vvimrc .vimrc
for file in ${files[@]}
do
    sed -i "s/_tk14HOME_/\/home\/$HOME/g" $file
done
rm -rf d.zip
