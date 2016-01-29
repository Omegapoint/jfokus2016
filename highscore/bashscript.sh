
echo -e "-----------------------------------\nHello, "$USER".\nThis script will move all the .jason files from the given folder to another folder and append the filename to a file called filelist.txt."
echo -n "Please enter the folder-path where we should move the file from and press [ENTER]:"
read fromPath
echo -e "please provide the folder path where we should move the files to and press [ENTER]: "
read -e toPath
while true
do
    echo -e "I will move .jason files \nfrom:"$fromPath"\nto:"$toPath "\n--------------------------------------------"
    mv $fromPath/*.json $toPath
    find $fromPath -maxdepth 1 -name '*.json' |xargs rm -f
    rm $toPath/fileNames.txt
    find $toPath -maxdepth 1 -name '*.json' > $toPath/fileNames.txt
    echo "Now im done. I will wake up again in 5 second and move files."
    sleep 5
done
