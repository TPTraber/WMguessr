FILE="fileNamesList.txt"

if [ -f "$FILE" ]; then
    mv fileNamesList.txt oldFileNamesList.txt
else
    echo "File does not exist."
fi

printf "\"resources/panoramas/%s\",\n" panoramas/* >> filenames.txt