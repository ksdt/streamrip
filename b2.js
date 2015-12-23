var argv = require('minimist')(process.argv.slice(2));
var b2 = require('backblaze-b2');
var fs = require('fs');
var path = require('path');

b2 = new b2({
    accountId: 'accoundid',
    applicationKey: 'appkey'
});

var bucket = 'bukket';

b2.authorize().then(
    () => { 
        b2.getUploadUrl(bucket).then(
                (response) => {
                    fs.readFile(argv._[0], function(err, data) {
                        b2.uploadFile( {
                            uploadUrl: response.uploadUrl,
                            uploadAuthToken: response.authorizationToken,
                            filename: encodeURIComponent(path.basename(argv._[0])),
                            data: data
                        }).then(
                            (response) => {console.log('Successfully uploaded.')},
                            (error) => {console.log('[UPLOAD ERROR]:', error)}
                        );
                    });
                },
                (error) => { console.log('[getUploadURL ERROR]:', error); }
        );
    },
    (error) => { console.log('[authorize error]:', error); }
);
