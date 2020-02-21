const express = require('express');
const cors = require('cors');
const faker = require('faker');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const items = [];

for(i = 0; i < 5; i++) {
  items.push({
    "id": faker.random.uuid(),
    "message": faker.lorem.sentences(), 
  });
}

app.get('/api/chat', (req, res)=>{
  res.send(items);
  // res.status(404).send();
});

app.listen(PORT, () => console.log(`listen on ${PORT}`));