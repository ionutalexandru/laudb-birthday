import fs from "fs";
import path from "path";

export const PLACES_PATH = path.join(process.cwd(), "places");

export const placeFilePaths = fs
  .readdirSync(PLACES_PATH)
  .filter((path) => /\.mdx?$/.test(path));
