// var test = require('tape');


test('First test', function (t) {

    t.equal(typeof function(){}, 'function');
    t.equal(1, 1);
    t.equal(2, 3);
    t.equal(3, 3);
    t.end();
});



test('All asserts', function(t){
    t.ok(true);
    t.equal(3, 1+2);
    t.deepEqual([1,2,[3,4]], [1,2,[3,4]]);
    t.notDeepEqual([1,2,[3,4,5]], [1,2,[3,4]]);
    t.end();
})


test('double end', function (t) {
    t.equal(1 + 1, 2);
    t.end();
    setTimeout(function () {
        t.end();
    }, 5);
});


test('Second test', function (t) {

    t.plan(7);
    
    t.equal(1, 1, 'more explain');
    t.equal(true, false);
    t.equal(1, 1);
    t.equal(true, false, 'more explain on fail');
    t.deepEqual([ 3, 4, 5 ], [ 3, 4, 2+3 ]);
    t.deepEqual([ 3, 4, 5 ], [ 3, 4, 2 ]);
    t.end('dadadada');

});


test('Third test', function (t) {

    t.plan(2);
    t.equal(1, 1, 'more explain');
    t.equal(true, false);
    t.equal(1, 1);
    t.equal(true, false, 'more explain on fail');
    t.pass('passed')

});

