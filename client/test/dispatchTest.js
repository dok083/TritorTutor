var Dispatch = require('../app/dispatch.js');

Dispatch.addListener('test', function(data) {
    if (data.a != 1 || data.b != '1' || data.c != true) {
        console.log('Dispatch data not correct!');
    }

    console.log('Success!');
});

Dispatch.addListener('test2', function(data) {
    console.log('test2 got: ' + data.test);
});

var a = Dispatch.createAction('test');
a.set('a', 1);
a.set('b', '1');
a.set('c', true);

console.log('Sent action...');

a.dispatch();

var b = Dispatch.createAction('test2');
b.set('test', 'Hello World!');
b.dispatch();


var c = Dispatch.createAction('test2');
b.set('test', 'Bye World!');
b.dispatch();

for (var i = 0; i < 10; i++) {
    var d = Dispatch.createAction('test2');
    d.set('test', i);
    d.dispatch();
}
