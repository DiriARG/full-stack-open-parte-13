CREATE TABLE blogs (
  -- SERIAL crea un entero que se autoincrementa automáticamente con cada nuevo registro.
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title)
VALUES (
  'Robert C. Martin',
  'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
  'First class tests'
);

INSERT INTO blogs (author, url, title, likes)
VALUES (
  'Edsger W. Dijkstra',
  'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  'Go To Statement Considered Harmful',
  10
);