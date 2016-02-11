

var tabe = {};

(function(){

    var isBrowser = typeof window != 'undefined';
    var test_id = 0;
    var assert_id = 0;
    var pass = 0;
    var fail = 0;
    var fail_ids = [];
    var parents = {};
    var tabcli = ' ';
    var tabassert = '   ';
    var ms;

    tabe.createStream = function ( tape ) {

        console.log('');
        test_id = assert_id = pass = fail = 0;
        var stream = tape.createStream({ objectMode: true });
        stream.on('data', tabe.onData);
        stream.on('end', tabe.onEnd);
        return stream;

    };


    tabe.onData = function( data ){

        // Message
        if ( typeof data == 'string' )
            return console.log( data );

        // New test
        if ( data.type == 'test') {

            if (data.id === 0) ms = new Date().getTime();

            parents[data.id] = (typeof data.parent == 'number') ? parents[data.parent]+1 : 0;

            test_id += 1;
            var strIdTest = (test_id)+') ';
            var spaceinnertest = (parents[data.id]>0) ? '' : '\n';
            var tabnivel = repeatTab(tabassert, parents[data.id]);
            (isBrowser) ? 
                console.log(tabnivel+'%c'+ strIdTest + data.name, 'font-weight:bold; color:#555')
            :
                console.log(tabcli+tabnivel+'\033[1m'+strIdTest+data.name+'\033[0m');
        }


        // End test
        else if ( data.type == 'end' ) {
            if (parents[data.test] === 0)
                console.log('');
        }


        // Pass
        else if ( data.ok ) {
            assert_id += 1;
            pass += 1;
            var strIdAssert = assert_id+' ';
            var tabnivel = repeatTab(tabassert, parents[data.test]);
            (isBrowser) ? 
                console.log(tabnivel+tabassert+'%c✔ %c'+ strIdAssert + data.name, 'color:green', 'color:#666')
            :
                console.log(tabcli+tabnivel+tabassert+'\033[32m✔\033[0m \033[90m'+strIdAssert+data.name+'\033[0m');
        }

        // Fail
        else if ( !data.ok ) {
            // console.log(2,data);
            assert_id += 1;
            fail += 1;
            fail_ids.push(assert_id);
            var tabnivel = repeatTab(tabassert, parents[data.test]);

            if (isBrowser) {
                console.warn(tabnivel+tabassert+'  '+assert_id, data.error);
                console.warn(tabnivel+tabassert+'   '+calcSpacesForIdTest(assert_id)+'operator: '+data.operator);
                console.warn(tabnivel+tabassert+'   '+calcSpacesForIdTest(assert_id)+'expected: '+data.expected);
                console.warn(tabnivel+tabassert+'   '+calcSpacesForIdTest(assert_id)+'actual: '+data.actual);
            } else {
                console.log(tabcli+tabnivel+tabassert+'\033[31m✘ '+ assert_id+' '+ data.name+'\033[0m');
                console.log(tabcli+tabnivel+tabassert+'  \033[31m----\033[0m');
                console.log(tabcli+tabnivel+tabassert+'   \033[31m'+calcSpacesForIdTest(assert_id)+'operator: '+data.operator+'\033[0m');
                console.log(tabcli+tabnivel+tabassert+'   \033[31m'+calcSpacesForIdTest(assert_id)+'expected: '+data.expected+'\033[0m');
                console.log(tabcli+tabnivel+tabassert+'   \033[31m'+calcSpacesForIdTest(assert_id)+'actual: '+data.actual+'\033[0m');
                console.log(tabcli+tabnivel+tabassert+'   \033[31m'+calcSpacesForIdTest(assert_id)+'at: '+data.at+'\033[0m');
                console.log(tabcli+tabnivel+tabassert+'  \033[31m....\033[0m');
            }
        }

        // console.log(data);


    };


    tabe.onEnd = function() {
        var totalms = new Date().getTime()-ms;
        var fail_idsstr = (fail_ids.length>0) ? ' ('+fail_ids.join(',')+')' : '';
        if (isBrowser) {
            console.log('\n');
            console.log('%cTotal: '+(pass+fail)+' %c('+totalms+'ms)', 'font-weight:bold; font-size:11px; color:#555', '');
            console.log('%cPass:  '+(pass), 'font-weight:bold; font-size:11px; color:green');
            console.warn('%cFail:  '+(fail)+'%c'+fail_idsstr, 'font-weight:bold; font-size:11px', 'font-weight:normal');
            console.log('');
        } else {
            // console.log(tabcli+totalms+'ms');
            console.log('\n');
            console.log(tabcli+'\033[1mTotal: '+(pass+fail)+'\033[0m \033[90m('+totalms+'ms)\033[0m');
            console.log(tabcli+'\033[1m\033[32mPass:  '+pass+'\033[0m');
            console.log(tabcli+'\033[1m\033[31mFail:  '+fail+'\033[0m'+'\033[90m'+fail_idsstr+'\033[0m');
            console.log('');
        }

        test_id = assert_id = pass = fail = 0;
    };


    function calcSpacesForIdTest( str ) {
        var newstr = '';
        for (var i=0, t=str.toString().length; i<t; ++i)
            newstr += ' ';

        return newstr;
    }


    function repeatTab( tabstr, repeats ) {
        var newstr = '';
        for (var i=0; i<repeats; ++i)
            newstr += tabstr;

        return newstr;
    }

        // line = line.replace(/\-\-\-/, '\n  \033[31m---');
        // line = line.replace(/\n/, '');
        // line = line.replace(/^# tests (.+)/, '\033[1mFINISH: $1 tests');
        // line = line.replace(/^# pass (.+)/, '\033[0m\033[1;32m✔$1 pass\033[0m');
        // line = line.replace(/^# fail (.+)/, '\033[0m\033[1;31m✘$1 fail\033[0m');
        // line = line.replace(/^# (.+)/,      '\033[0m\n\n\033[1m$1\033[0m'); // »
        // line = line.replace(/^ok (.+)/,     '\033[0m  \033[32m✔\033[0m \033[90m$1\033[0m'); // ✓
        // line = line.replace(/^not ok (.+)/, '\033[0m  \033[31m✘ $1\033[0m'); // ✗ ✘ ✖
        // line = line.replace(/\.\.\./, '...\033[0m');


})()


module.exports = tabe;

