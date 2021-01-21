// scheme-model
const db = require("../../data/db-config");

module.exports = {
  find() {
    return db("schemes");
  },

  findById(id) {
    const schemeObject = db("schemes").where("id", id).first();
    if (!schemeObject) {
      // Promise.resolve(null);
      return null;
    } else {
      return schemeObject;
    }
  },

  findSteps(id) {
    return db("schemes")
      .join("steps", "schemes.id", "steps.scheme_id")
      .select(
        // "schemes.id",
        "schemes.scheme_name",
        "steps.step_number",
        "steps.instructions"
      )
      .where("schemes.id", id)
      .orderBy("steps.step_number");
  },
  add(scheme) {
    return db("schemes")
      .insert(scheme)
      .then(([id]) => {
        return db("schemes").where("id", id);
      });
  },
  update(changes, id) {
    return db("schemes")
      .update(changes)
      .where("id", id)
      .then((message) => {
        if (message) {
          return db("schemes").where("id", id);
        }
      });
  },
  remove(id) {
    const targetScheme = db("schemes").where("id", id);

    return db("schemes")
      .where("id", id)
      .del()
      .then((res) => {
        return targetScheme;
      });
  },
};
