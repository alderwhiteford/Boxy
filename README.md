NOTICE: I have been granted permission to move this repository to my account for resume display purposes.

to run application
1. clone repository onto your machine with `git clone https://github.com/GenerateNU/Boxy.git`
2. run `npm install` at <some path>/Boxy to install dependencies
3. create and run docker postgis container on port 3001 with POSTGRES_PASSWORD=password (make sure to shut down any existing containers)
4. add database to VSCode postgres extension (host: localhost, username: postgres, password: password)
5. run `npx prisma migrate dev --name init` at <some path>/Boxy to initialize the database
6. run `npm run dev` at <some path>/Boxy

test
