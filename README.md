# fetch
## Build and run in docker container
## Build
cd to where the project file is
    
    docker build -t fetch .

run the application in docker container

    docker run fetch https://www.google.com https://autify.com <...>

## Get the result

Result files can be found on volume in docker containers.

## Improvements
- check for shared images so we do not download same image everytime it occurs.
- validate argument
- check for duplicate arguments