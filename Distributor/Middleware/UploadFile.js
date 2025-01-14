import fs from "fs";

export function uploadJsonDataToVectorCollections(path, callback) {
  fs.readFile(path, (err, data) => {
    if (err) {
      callback(err);
      return;
    }

    try {
      callback(null, JSON.parse(data));
    } catch (error) {
      callback(error);
    }
  });
}

export function uploadTxtDataToVectorCollections(path, callback) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      callback(err);
      return;
    }

    try {
      const lines = data
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      const blocks = [];

      if (lines.length < 3) {
        blocks.push({ strings: lines.join(" ") });
      } else {
        for (let i = 0; i < lines.length - 2; i++) {
          const block = lines.slice(i, i + 3).join(" ");
          blocks.push({ strings: block });
        }
      }

      callback(null, blocks);
    } catch (error) {
      callback(error);
    }
  });
}
