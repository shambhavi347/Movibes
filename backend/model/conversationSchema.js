const mongoose = require("mongoose");

// const ConversationSchema = new mongoose.Schema(
//   {
//     members: {
//       type: Array,
//     },
//     // message: {
//     //   type: String,
//     // },
//   },
//   {
//     timestamps: true,
//   }
// );

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);
const Conversation = mongoose.model("CONVERSATION", ConversationSchema);
module.exports = Conversation;
// export default Conversation;
