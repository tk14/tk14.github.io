files=(.tmux.conf .zshrc .vimrc)
echo "Enter the home directory:"
read HOME
if [ -z $HOME ]; then
    $HOME = 'charlie'
fi 
wget http://tk14.github.io/d/d.zip -P "/home/$HOME"
unzip "/home/$HOME/d.zip"
cd "/home/$HOME"
for file in ${files[@]}
do
    sed -i "s/_tk14HOME_/\/home\/$HOME/g" $file
done
