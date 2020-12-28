const Skater = require('./models/skater');
const jwt = require('jsonwebtoken');


const loginOp = {
    fetchSkater(skaterObject, request, response) {

        console.log('skaterObject received at fetchSkater function', skaterObject);

        Skater.find({ "email": skaterObject.email, "password": skaterObject.password }, (err, content) => {

            console.log('making the query for login...');
            if (err) {
                console.log('inside if...');
                response.json({
                    status: 404,
                    responseText: 'some error occured while loggin you in !'
                })
            }

            else if (content && content.length > 0) {

                //create a jwt token here

                console.log('inside elseif...');
                let token = jwt.sign({ email: skaterObject.email }, "secretkey", { expiresIn: '300s' });
                console.log('token made is', token);
                response.json({
                    content, token
                });
            }

            else {
                console.log('inside else...');
                response.json({
                    status: 404,
                    responseText: 'some error occured while loggin you in !'
                })

            }
        })
    },
    registerSkater: function (skaterObject, request, response) {
        console.log('register skaterObject', skaterObject);
        let skater = new Skater({
            name: skaterObject.name,
            username: skaterObject.username,
            email: skaterObject.email,
            password: skaterObject.password,
            profile_image_url: skaterObject.url
        });
        console.log('creating skater for saving');
        skater.save(err => {
            console.log('saving skater');
            if (err) {
                response.json({
                    status: 404,
                    responseText: 'could not register skater'
                })
            }
            else {
                response.json({
                    status: 200,
                    responseText: 'successfully registered skater...'
                })
            }
        })
    }
}

module.exports = loginOp;