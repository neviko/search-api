import request from "supertest";
import { app } from "../../app";
import db from "../../db/videos.json";
import { TVideoItem } from "../../types/search.types";

describe("global testing", () => {
  it("test should pass", async () => {
    expect(1 + 1).toBe(2);
  });

  it("should return all videos", async () => {
    const res = await request(app).get("/api/search").expect(200);
    expect(res.body.length).toEqual(db.length);
  });

  it("should filter all authorId user2 ", async () => {
    const user = "user1";
    const res = await request(app)
      .get("/api/search")
      .query({ author_id: user })
      .expect(200);

    res.body.every((item: TVideoItem) => {
      expect(item.authorId).toEqual(user);
    });
  });

  it("should filter all filename exact match - Extended product demo.mp4 ", async () => {
    const str = "Extended product demo.mp4";
    const res = await request(app)
      .get("/api/search")
      .query({ filename: str })
      .expect(200);
    expect(res.body.length).toEqual(1);
    res.body.every((item: TVideoItem) => {
      expect(item.filename).toEqual(str);
    });
  });

  it("should filter all filename partial match - Webinar ", async () => {
    const str = "Webinar";
    const res = await request(app)
      .get("/api/search")
      .query({ filename: str })
      .expect(200);
    expect(res.body.length).toEqual(2);
    res.body.every((item: TVideoItem) => {
      expect(item.filename).toContain(str);
    });
  });

  it("should filter all filename partial match - p ", async () => {
    const str = "p";
    const res = await request(app)
      .get("/api/search")
      .query({ filename: str })
      .expect(200);
    expect(res.body.length).toEqual(6);
    res.body.every((item: TVideoItem) => {
      expect(item.filename).toContain(str);
    });
  });

  it("should filter all duration between 0-1000 ", async () => {
    const startDuration = 0;
    const endDuration = 1000;
    const res = await request(app)
      .get("/api/search")
      .query({ duration: `${startDuration}-${endDuration}` })
      .expect(200);
    expect(res.body.length).toEqual(6);
    res.body.every((item: TVideoItem) => {
      expect(item.duration).toBeGreaterThanOrEqual(startDuration);
      expect(item.duration).toBeLessThanOrEqual(endDuration);
    });
  });

  it("should filter a single tag - webinar ", async () => {
    const tags = "webinar";
    const res = await request(app)
      .get("/api/search")
      .query({ tags: tags })
      .expect(200);
    expect(res.body.length).toEqual(3);
    res.body.every((item: TVideoItem) => {
      expect(item.tags).toContain(tags);
    });
  });

  it("should filter multiple tags - webinar,marketing ", async () => {
    const tags = ["webinar", "marketing"];
    const res = await request(app)
      .get("/api/search")
      .query({ tags: "webinar,marketing" })
      .expect(200);
    expect(res.body.length).toEqual(3);
    res.body.every((item: TVideoItem) => {
      expect(item.tags).toContain(tags[0] || tags[1]);
    });
  });

  it("should filter all together", async () => {
    const filename = "Webinar";
    const author_id = "user2";
    const startDuration = 0;
    const endDuration = 100000;
    const tags = "webinar";

    const res = await request(app)
      .get("/api/search")
      .query({
        filename,
        author_id,
        duration: `${startDuration}-${endDuration}`,
        tags,
      })
      .expect(200);
    expect(res.body.length).toEqual(1);
    res.body.every((item: TVideoItem) => {
      expect(item.filename).toContain(filename);
      expect(item.authorId).toEqual(author_id);
      expect(item.duration).toBeGreaterThanOrEqual(startDuration);
      expect(item.duration).toBeLessThanOrEqual(endDuration);
      expect(item.tags).toContainEqual(tags);
    });
  });
});
