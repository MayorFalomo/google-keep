
# Tweeks

Keep-notepad is a Full Stack project based on the google keep notepad, It is a notepad Web App with multi functional features where users can basically keep their notes, links, pictures and whatever else users store.

## Demo

https://keep-notepad.netlify.app/

![Logo](https://res.cloudinary.com/dsghy4siv/image/upload/v1702017241/tom7hzs0ed1tgo6xu7xc.png)


## Features

- Create Notes.
- Set Remainders for your notes for Morning, Afternoon, Evening, Tomorrow or Next Week Monday.
- Send or Collaborate on a note with another user. 
- Pin Notes
- Archive Notes.
- Add Images to any note.
- Add Custom background Images or colour to suit your taste.
- Delete Note
- View your profile
- See other users so you can send notes
- currently working on adding Canvas to each note
- currently working on adding Drag and Drop functionality to each note.
- currently working on translating note to your custom language.
## Tech Stack

**Client:** Next Js, Tailwind, CSS, PWA, Firebase

**Backend:** Node Js, Express and MongoDB



## License

[MIT](https://choosealicense.com/licenses/mit/)


## Support

For support, email mayorfalomo@gmail.com or contact me via any platform.


## Optimizations

What optimizations did you make in your code? E.g. refactors, performance improvements, accessibility

I needed my web application to be fast so i used Next Js which is known for it's speed.

I avoided making too many API Calls and instead used context to pass my data through out my application so the data is always readily available for users instead of requesting that same information from the server again.

I stored each users information on a cookie that way, the users login and information is better secured and persists instead of using Local storage.

When registering, I added a auto generate username, email and password functionality, so users can register with ease at a click of buttons, plus they don't have to remember all this info since it's all stored on a cookie that makes sure they are always logged in of course the can all be edited later by each user if you don't like the names.

i made sure Components were reusable so i didn't have to build as much many components as i should have from screatch.

All useEfects have a dependency Array, so there's no chance of your browser crashing from too many repeated API calls.
## Deployment

To deploy this project run

```bash
  npm run dev
```


## 🛠 Skills
Javascript, HTML, CSS...

React, Next Js, Typescript, Vue js...

Styled Components, Sass , Tailwind

Node Js, Express, MongoDb...

Firebase.
## Lessons Learned

loading......
## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

