
# Keep-Notepad

Keep-notepad is a Full Stack project based on the google keep notepad, It is a notepad Web App with multi functional features where users can basically keep their notes, links, pictures and whatever else users store.

## Demo

https://keep-notepad.netlify.app/

![Logo](https://res.cloudinary.com/dsghy4siv/image/upload/v1705153077/k48h4trfrty3m0s6ylla.png)


## Features
- Masonry Layout & row Layout
- Create Notes & View each Notes
- Add a Canvas to any note / Create a Canvas as a note.
- Set Remainders for your notes for Morning, Afternoon, Evening, Tomorrow or Next Week Monday.
- Get notification of remainders
- Search and Send a note to another user.
- Mass select and pin, archive,trash and customize Notes.
- Pin your Notes.
- Archive Notes.
- Add a picture or video to any note.
- Add Custom background Images or Colors to suit your taste.
- Delete a Note
- Edit a Note
- Add Tags/Label to your notes for easier sorting and find notes by the tags.
- Add Location to your notes.
- View your profile && Edit your profile.
- See other users so you can send notes
- currently working on adding Drag and Drop functionality to each note.
- currently working on translating note to your custom language.
- working on Real time note writing with another person.
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

i did Code splitting for my code to reduce bundle dize

I avoided making too many API Calls and instead used context to share my data through out my application so the data is always readily available for users instead of requesting that same information from the server again.

I stored each users information on a cookie that way, the users login and information is better secured and persists instead of using Local storage.

When registering, I added a auto generate username, email and password functionality, so users can register with ease at a click of buttons, plus they don't have to remember all this info since it's all stored on a cookie, so they are always logged in
N:B: I'm well aware of the compatibility of cookies with phone, so user data might not save as it should.

I made sure Components were reusable so i didn't have to build as much many components as i could have from scratch.

All useEffects have a dependency Array, so there's no chance of your browser crashing from too many repeated API calls.


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

