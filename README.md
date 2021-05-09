# newsgen
Website for marking favorite news.

## Demo
Click [here](https://newsgen.herokuapp.com/) for demo.

Use test credentials:
* Username: guest123
* Password: guest123

## How To Run In Development
Run the development server with `yarn dev` or `npm run dev`. Make sure to run the [backend](https://github.com/DHua5922/newsgen-backend) too.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To test application in docker, modify "start" in package.json to next start. Then, run npm run docker-start. When deploying to staging or production, be sure to change "start" back to next start -p $PORT.

## Technologies
* Next.js (React framework)
* Bootstrap
* JavaScript
* HTML
* CSS
* Tailwind
* Styled Components
* Redux
* Docker
