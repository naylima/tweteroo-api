import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];
const feed = [];

app.post('/sign-up', (req, res) => {

    const { username, avatar } = req.body;

    if (!username || !avatar) {
        return res.status(422).send({error: 'Todos os campos são obrigatórios!'});
    }    

    const user = {
        username,
        avatar
    }

    users.push(user);

    return res.status(201).json('OK');

});

app.post('/tweets', (req, res) => {

    const { username, tweet } = req.body;
    const user = users.find((value) => value.username === username);

    if (!username || !tweet) {
        return res.status(400).send({error: 'Todos os campos são obrigatórios!'});
    }

    const message = {
        username,
        tweet
    }

    tweets.push(message);
    feed.unshift({
        ...message,
        avatar: user.avatar
    });

    return res.status(201).json('OK');

});

app.get('/tweets', (req, res) => {

    const { username } = req.query;
    const feedFilter = feed.slice(0, 10);

    if (username) {
        const usernameFilter = feed.filter(
            (user) => user.username.toLowerCase().indexOf(username) >= 0
        );
        res.status(201).send(usernameFilter);
    } else {
        res.status(201).send(feedFilter);
    }

});

app.listen(5000, () => console.log('Listening on port 5000'));