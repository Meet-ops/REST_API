const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

let posts = [
    {
        id: uuidv4(),
        username: "Meet",
        content: "Programmer!!"
    },
    {
        id: uuidv4(),
        username: "Kohli",
        content: "Cover Drive Expert!!"
    },
    {
        id: uuidv4(),
        username: "Krishna",
        content: "Makhan chor!!"
    }
];

app.get("/posts", (req, res) => {
    console.log(posts);
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let username = req.body.username;
    let content = req.body.content;
    let id = uuidv4();
    posts.push({ id, username, content });
    console.log(posts);
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let id = req.params.id;
    let post = posts.find((post) => post.id === id);
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let id = req.params.id;
    let post = posts.find((post) => post.id === id);
    post.content = req.body.content;
    console.log(post);
    console.log(posts);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let id = req.params.id;
    let post = posts.find((post) => id === post.id);
    res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
    let id = req.params.id;
    posts = posts.filter((post) => id !== post.id);
    console.log(posts);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});