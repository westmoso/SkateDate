const Skater = require('./models/skater');

const skaterOp = {
    likeSkater: function (skaterObject, cb) {
        let targetEmail = skaterObject.targetEmail;
        let email = skaterObject.email;
        console.log('token received from middleware', skaterEmail);
        Skater.findOneAndUpdate({ email: email }, { $push: { liked: targetEmail } }, (err, content) => {
            if (err) {
                console.log('error occured...');
            }

            else {
                console.log('the like skaterOperation performed successfully..');
                cb();
            }
        });
    },
    getSkater: function (request, response) {
        console.log('inside getSkater function in skateroperations');
        Skater.find({}, (err, content) => {
            if (err) {
                console.log('error occured in finding Skater..');
                response.json({
                    err: err
                })
            }

            else if (content && content.length > 0) {
                console.log('retreived Skater');
                response.json({
                    status: 200,
                    content: content
                })
            }
            else {
                console.log('some other error occured in finding Skater..');
                response.json({
                    status: 404,
                    responseText: 'some other error occured in finding Skater'
                })
            }
        })
    }

};

module.exports = skaterOp;