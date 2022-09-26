// MongoDB
const SCHEMA = process.env.SCHEMA
const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const HOSTNAME = process.env.HOSTNAME
const DATABASE = process.env.DATABASE
const OPTIONS = process.env.OPTIONS
const URI_CLOUD_CONNECTION = `${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`

const PORT = process.env.PORT

module.exports = {
  URI_CLOUD_CONNECTION,
  PORT,
};