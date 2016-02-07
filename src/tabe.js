

var tabe = {tape:require('tape')};

(function(){

    var isBrowser = typeof window != 'undefined';
    var id = 0;
    var pass = 0;
    var fail = 0;

    tabe.createStream = function ( ) {

        id = pass = fail = 0;
        var stream = tabe.tape.createStream({ objectMode: true });
        stream.on('data', tabe.onData);
        stream.on('end', tabe.onEnd);
        return stream;

    };


    tabe.onData = function( data ){
        // console.log(data);

        // Message
        if ( typeof data == 'string' )
            return console.log( data );

        // New test
        if ( data.type == 'test') {
            var strIdTest = (data.id+1)+') ';
            (isBrowser) ? 
                console.log('%c'+ strIdTest + data.name, 'font-weight:bold; color:###')
            :
                console.log('\n\033[1m'+strIdTest+data.name+'\033[0m');
        }

        // End test
        else if ( data.type == 'end' )
            console.log('');


        // Pass
        else if ( data.ok ) {
            id += 1;
            pass += 1;
            var strIdAssert = id+' ';
            (isBrowser) ? 
                console.log('   %c✔ %c'+ strIdAssert + data.name, 'color:green', 'color:#666')
            :
                console.log('   \033[32m✔\033[0m \033[90m'+strIdAssert+data.name+'\033[0m');
        }

        // Fail
        else if ( !data.ok ) {
            // console.log(2,data);
            id += 1;
            fail += 1;

            if (isBrowser) {
                console.warn('     '+id, data.error);
                console.warn('      '+spaces(id)+'operator: '+data.operator);
                console.warn('      '+spaces(id)+'expected: '+data.expected);
                console.warn('      '+spaces(id)+'actual: '+data.actual);
            }
            else {
                console.log('   \033[31m✘ '+ id+' '+ data.name+'\033[0m');
                console.log('     \033[31m----\033[0m');
                console.log('      \033[31m'+spaces(id)+'operator: '+data.operator+'\033[0m');
                console.log('      \033[31m'+spaces(id)+'expected: '+data.expected+'\033[0m');
                console.log('      \033[31m'+spaces(id)+'actual: '+data.actual+'\033[0m');
                console.log('      \033[31m'+spaces(id)+'at: '+data.at+'\033[0m');
                console.log('     \033[31m....\033[0m');
            }
        }



    };


    tabe.onEnd = function() {
        console.log('theend')
    };


    function spaces( str ) {
        var space = '';
        for (var i=0, t=str.toString().length; i<t; ++i)
            space += ' ';

        return space;
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

