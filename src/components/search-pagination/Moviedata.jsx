const MoviesData = [
  {
    id: 1,
    name: "The Avengers",
    image:
      "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SY1000_SX677_AL_.jpg",
    tags: ["Action", "Sci-Fi"],
    rating: "8.7",
    year: "2012",
    desc: "The Avengers is a 2012 American superhero film based on the Marvel Comics superhero team of the same name. Produced by Marvel Studios and ... ",
  },
  {
    id: 2,
    name: "Inception",
    image:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SY1000_SX677_AL_.jpg",
    tags: ["Action", "Adventure", "Sci-Fi"],
    rating: "8.8",
    year: "2010",
    desc: "Inception is a 2010 science fiction action film written and directed by Christopher Nolan, who also produced the film with Emma Thomas.",
  },
  {
    id: 3,
    name: "The Shawshank Redemption",
    image:
      "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SY1000_SX677_AL_.jpg",
    tags: ["Drama"],
    rating: "9.3",
    year: "1994",
    desc: "The Shawshank Redemption is a 1994 American drama film written and directed by Frank Darabont, based on the 1982 Stephen King novella Rita Hayworth and Shawshank Redemption.",
  },
  {
    id: 4,
    name: "The Godfather",
    image:
      "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_SX677_AL_.jpg",
    tags: ["Crime", "Drama"],
    rating: "9.2",
    year: "1972",
    desc: "The Godfather is a 1972 American crime film directed by Francis Ford Coppola, who co-wrote the screenplay with Mario Puzo, based on Puzo's best-selling 1969 novel of the same name.",
  },
  {
    id: 5,
    name: "The Dark Knight",
    image:
      "https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_FMjpg_UX1000_.jpg",
    tags: ["Action", "Crime", "Drama"],
    rating: "9.0",
    year: "2008",
    desc: "The Dark Knight is a 2008 superhero film directed, produced, and co-written by Christopher Nolan. Based on the DC Comics character Batman.",
  },
  {
    id: 6,
    name: "Pulp Fiction",
    image:
      "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p15684_p_v10_ag.jpg",
    tags: ["Crime", "Drama"],
    rating: "8.9",
    year: "1994",
    desc: "Pulp Fiction is a 1994 American crime film written and directed by Quentin Tarantino, who conceived it with Roger Avary.",
  },
  {
    id: 7,
    name: "Forrest Gump",
    image:
      "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p15829_v_v13_aa.jpg",
    tags: ["Drama", "Romance"],
    rating: "8.8",
    year: "1994",
    desc: "Forrest Gump is a 1994 American comedy-drama film directed by Robert Zemeckis and written by Eric Roth. It is based on the 1986 novel of the same name by Winston Groom.",
  },
  {
    id: 8,
    name: "Fight Club",
    image:
      "https://upload.wikimedia.org/wikipedia/en/0/09/Fight_Club_%282023_film%29.jpg",
    tags: ["Drama"],
    rating: "8.8",
    year: "1999",
    desc: "Fight Club is a 1999 American film directed by David Fincher and starring Brad Pitt, Edward Norton, and Helena Bonham Carter.",
  },
  {
    id: 9,
    name: "The Matrix",
    image:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_SX677_AL_.jpg",
    tags: ["Action", "Sci-Fi"],
    rating: "8.7",
    year: "1999",
    desc: "The Matrix is a 1999 science fiction action film written and directed by the Wachowskis.",
  },
  {
    id: 10,
    name: "Interstellar",
    image:
      "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SY1000_SX677_AL_.jpg",
    tags: ["Adventure", "Drama", "Sci-Fi"],
    rating: "8.6",
    year: "2014",
    desc: "Interstellar is a 2014 epic science fiction film directed and produced by Christopher Nolan.",
  },
  {
    id: 11,
    name: "The Lord of the Rings: The Return of the King ",
    image:
      "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_SX677_AL_.jpg",
    tags: ["Action", "Adventure", "Drama"],
    rating: "8.9",
    year: "2003",
    desc: "The Lord of the Rings: The Return of the King is a 2003 epic fantasy film directed by Peter Jackson, based on the third volume of J. R. R. Tolkien's The Lord of the Rings.",
  },
  {
    id: 12,
    name: "The Lion King",
    image:
      "https://musicart.xboxlive.com/7/78235100-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080",
    tags: ["Animation", "Adventure", "Drama"],
    rating: "8.5",
    year: "1994",
    desc: "The Lion King is a 1994 American animated musical drama film produced by Walt Disney Feature Animation and released by Walt Disney Pictures.",
  },
  {
    id: 13,
    name: "Gladiator",
    image:
      "https://m.media-amazon.com/images/I/81QVTiMK1wL._AC_UF1000,1000_QL80_.jpg",
    tags: ["Action", "Adventure", "Drama"],
    rating: "8.5",
    year: "2000",
    desc: "Gladiator is a 2000 epic historical drama film directed by Ridley Scott and written by David Franzoni, John Logan, and William Nicholson.",
  },
  {
    id: 14,
    name: "The Prestige",
    image:
      "https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_SY1000_SX677_AL_.jpg",
    tags: ["Drama", "Mystery", "Sci-Fi"],
    rating: "8.5",
    year: "2006",
    desc: "The Prestige is a 2006 psychological thriller film directed by Christopher Nolan and written by Nolan and his brother Jonathan, based on the 1995 novel of the same name by Christopher Priest.",
  },
];

export default MoviesData;
