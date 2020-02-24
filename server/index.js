const fs = require('fs');
const express = require('express');
const cors = require('cors');
const faker = require('faker');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const init = () => {
  if (fs.existsSync('./chat.json')) {
    console.log('The path exists.');
  } else {
    console.log('Creating file...');
    const items = [];
    for(i = 0; i < 10; i++) {
      items.push({
        "id": faker.random.uuid(),
        "message": faker.lorem.sentences(), 
      });
    }
    const data = JSON.stringify(items);
    fs.writeFileSync('chat.json', data);
    console.log('writed random data to chat.json...')
  }
};

init();

app.get('/api/chat', (req, res) => {
  let offset = Number(req.query.offset) || 0;
  let limit = Number(req.query.limit) || 10;

  fs.readFile('./chat.json', 'utf-8', (err, data) => {
    if(err) {
      res.status(500).send();
      throw err;
    }

    const messages = JSON.parse(data);
    if (messages.length <= offset + 10) {
      res.send({data: messages.slice(offset), hasMore: false});
    } else {
      res.send({data: messages.slice(offset), hasMore: true});
    }
  });  
});

app.post('/api/chat', (req, res)=>{
  console.log(typeof(req.body.id));

  fs.readFile('./chat.json', 'utf-8', (err, data) => {
    if(err) {
      res.status(500).send();
      throw err;
    }

    const messages = JSON.parse(data);
    messages.push(req.body);

    fs.writeFile('./chat.json', JSON.stringify(messages), (err) => {
      if(err) {
        res.status(500).send();
        throw err;
      }
      console.log(`write message: ${req.body.id} succesfully!`);
      res.status(200).send();
    });
  });
});

app.delete('/api/chat/:id', (req, res)=>{
  const id = req.params.id;

  if (id.trim()) {
    fs.readFile('./chat.json', 'utf-8', (err, data) => {
      if(err) {
        res.status(500).send();
        throw err;
      }
  
      const messages = JSON.parse(data);
      const filtered = JSON.stringify( messages.filter((m) => m.id != id) );

      fs.writeFile('./chat.json', filtered, (err) => {
        if(err) {
          res.status(500).send();
          throw err;
        }
        console.log(`delete message: ${id} succesfully!`);
        res.status(200).send();
      });
    });
  } 
  //change items from [] to file or use local store get 10 then if scroll up => load more 
});

app.listen(PORT, () => console.log(`listen on ${PORT}`));