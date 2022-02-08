import Schema from "../mongooseModel/Schema.js";

export default {
  saveData: async (data) => {
    let login = new Schema(data);
    return await login.save();
  },

  login: async (data) => {
    let user = await Schema.find({ email: data.email });
    if (Object.keys(user).length === 0) {
      return 0;
    } else {
      if (data.password === user[0].password) {
        return 1;
      } else {
        return -1;
      }
    }
  },
};
