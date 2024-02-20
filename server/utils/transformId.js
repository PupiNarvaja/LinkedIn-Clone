// const transformIdFromObject = (obj) => {
//   console.log(obj);
//   obj.id = obj._id;
//   delete obj._id;
//   return obj;
// };

// const transformIdFromArray = (array) => {
//   return array.map((obj) => {
//     return transformIdFromObject(obj);
//   });
// };

// module.exports = {
//   transformIdFromObject,
//   transformIdFromArray,
// };

// This exists to change every "_id" fields sended to client.
// If "id" is prefered this needs to be used.