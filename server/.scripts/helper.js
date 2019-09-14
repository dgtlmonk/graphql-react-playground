// TODO: Use this for future reference
// once we want to seed collection dynamically
// for now we're not over engineering things here

import { ObjectId } from "mongodb";
import { createHash } from "crypto";

// Returns a predictable ObjectId based on input name
const getObjectId = name => {
  const hash = createHash("sha1")
    .update(name, "utf8")
    .digest("hex");

  return new ObjectId(hash.substring(0, 24));
};

const getObjectIds = names => {
  return names.map(name => getObjectId(name));
};

const mapToEntities = names => {
  return names.map(name => {
    const id = getObjectId(name);

    return {
      id,
      name
    };
  });
};

export { mapToEntities, getObjectId, getObjectIds };
