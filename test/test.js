// var test = require('tape');


test('First test', function (t) {

    t.equal(typeof function(){}, 'function');
    t.equal(true, true);
    t.equal(true, false);
    t.equal(true, true);
    t.end();
});



test('Second', function(t){
    t.ok(true);



    t.equal(3, 1+2);
    t.deepEqual([1,2,[3,4]], [1,2,[3,4]]);
    t.notDeepEqual([1,2,[3,4,5]], [1,2,[3,4]]);

    t.test('Inside second', function(t){
        t.equal(3, 1+2);
        t.equal(1, 1+2);
        t.equal(3, 1+2);
        t.end();
    })

    t.end();
})


test('Third double end', function (t) {
    t.equal(1 + 1, 2);
    t.end();
});


test('Four test', function (t) {

    t.plan(7);
    
    t.equal(1, 1, 'more explain');
    t.equal(true, false);
    t.equal(1, 1);
    t.equal(true, false, 'more explain on fail');
    t.deepEqual([ 3, 4, 5 ], [ 3, 4, 2+3 ]);
    t.deepEqual([ 3, 4, 5 ], [ 3, 4, 2 ]);
    t.end('dadadada');

});

