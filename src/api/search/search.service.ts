import db from "../../db/videos.json";
import { TSearchParams } from "../../types/search.types";
import { BadRequestError } from "../../errors/bad-request-error";

export const filterVideos = ({
  filename,
  author_id,
  duration,
  tags,
}: TSearchParams) => {
  const durations = duration?.split("-");
  // if (!duration || durations.length !== 2) {
  //   throw new BadRequestError("duration structure should be X-Y");
  // }
  const tagsArr = tags?.split(",");
  // if (!tageArr || tagsArr.length < 1) {
  //   throw new BadRequestError("tags should be greater than 1 - a,b,c,d");
  // }

  return db.filter((item) => {
    return (
      (!filename || isPartialMatch(item.filename, filename)) &&
      (!author_id || isStrictEqual(item.authorId, author_id)) &&
      (!duration ||
        isNumInRange(
          item.duration,
          parseInt(durations[0]),
          parseInt(durations[1])
        )) &&
      (!tags || isSubset(item.tags, tagsArr))
    );
  });
};

const isStrictEqual = (a: any, b: any): boolean => {
  return a === b;
};

const isPartialMatch = (str: string, subStr: string): boolean => {
  return str.includes(subStr);
};

const isNumInRange = (num: number, start: number, end: number): boolean => {
  return num >= start && num <= end;
};

const isSubset = (array1: string[], array2: string[]): boolean => {
  return array2.every((item) => array1.includes(item));
};
