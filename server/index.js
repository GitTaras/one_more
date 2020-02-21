const fs = require('fs');
const express = require('express');
const cors = require('cors');
const faker = require('faker');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

if (fs.existsSync('./chat.json')) {
  console.log('The path exists.');
} else {
  const items = [];
  for(i = 0; i < 10; i++) {
    items.push({
      "id": faker.random.uuid(),
      "message": faker.lorem.sentences(), 
    });
  }
  const data = JSON.stringify(items)
  fs.writeFileSync('chat.json', data);
}

app.get('/api/chat', (req, res) => {
  let offset = Number(req.query.offset) || 0;
  let limit = Number(req.query.limit) || 10;

  fs.readFile('./chat.json', 'utf-8', (err, data) => {
    if(err) {
      throw err;
    }

    const data = JSON.parse(data);
    if (data.length < offset + 10);
      res.send({data: data.slice(offset), hasMore: false});
    res.send();
  });  
  res.send(data, hasMore);
});

app.get('/api/chat/add', (req, res)=>{
  items.push(req.body.message);
  //change items from [] to file or use local store get 10 then if scroll up => load more 
});

app.listen(PORT, () => console.log(`listen on ${PORT}`));