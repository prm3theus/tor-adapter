const { Validator } = require('external-adapter')
const tor = require('tor-request')

const createRequest = (input, torIP, torPort, callback) => {
  console.log(input)
  console.log(callback)

  const validator = new Validator(input, {}, callback)
  const jobRunID = validator.validated.id

  console.log(torIP)

  tor.setTorAddress(torIP, torPort)
  // tor.request(input.data.endpoint, (error, res, body) => {
  tor.request(`http://${input.data.endPoint}/status`, (error, res, body) => {
  // tor.request('https://api.ipify.org', (error, res, body) => {
    console.log(body)
    if (!error) {
      callback(res.statusCode, {
        jobRunID,
        data: JSON.parse(body)
      })
    } else {
      console.log('ERROR')
      console.log(error)
      callback(200, {
        jobRunID,
        data: JSON.parse({STATUS: `${input.data.endPoint},${500}`})
      })

      // callback(500, {
      //   jobRunID,
      //   status: 'errored',
      //   error
      // })
    }
  })
}

module.exports.createRequest = createRequest
