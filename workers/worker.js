const writeToDB = require('./writeToDB');
const { Consumer } = require('sinek');
const kafkaConfig = require('../kafkaConfig');
const consumer = new Consumer('events', kafkaConfig);
const withBackpressure = true;

const events = ['link_clicks', 'clicks', 'mouse_moves', 'key_presses', 'pageviews', 'form_submissions'];

// console.log(process.env['PGDATABASE']);

consumer.connect(withBackpressure).then(_ => {
  consumer.consume((message, callback) => {
    console.log(typeof message.value);
    console.log(message);
    callback();
  });
});

consumer.on('error', error => console.log(error));
// amqp.connect('amqp://localhost').then(conn => {
//   process.once('SIGINT', () => conn.close());
//   return conn.createChannel().then(ch => {
//     const ex = 'clientEvents';
//     let ok = ch.assertExchange(ex, 'direct', {durable: false});
//     ok = ok.then(() => ch.assertQueue('', {exclusive: true}));
//     ok = ok.then(qok => {
//       const queue = qok.queue;
//
//       return all(events.map(event => ch.bindQueue(queue, ex, event))).then(() => queue);
//     });
//     ok = ok.then(queue => ch.consume(queue, writeToDB, {noAck: true}));
//
//     return ok.then(() => console.log(' [*] Waiting for logs. To exit press CTRL+C'));
//   });
// }).catch(console.warn);
