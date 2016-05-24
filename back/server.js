var express = require('express');
var app = express();
var banda  = require('./routes/banda');

// ROUTES //
app.get('/api', banda.index);
app.get('/api/banda/:id', banda.show_edit);
//app.post('/banda/:id', banda.update);
app.get('/api/rm/:id', banda.remove);
//app.get('/new-banda', banda.create);

app.listen(3000, function () {
  console.log('API is running on port 3000!');
});
