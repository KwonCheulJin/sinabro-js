import { describe, it, expect } from 'vitest';

describe('altogether', () => {
  it('extracts items', () => {
    const users = [
      {
        id: 1,
        username: 'a',
      },
      {
        id: 2,
        username: 'b',
      },
      {
        id: 3,
        username: 'c',
      },
      {
        id: 4,
        username: 'd',
      },
    ];
    const idsToExtract = [1, 2, 5];

    // TODO: do something here
    const extractedUsers = users.filter(user => idsToExtract.includes(user.id));
    expect(extractedUsers).toEqual([
      {
        id: 1,
        username: 'a',
      },
      {
        id: 2,
        username: 'b',
      },
    ]);
  });

  it('filters out duplicates', () => {
    const users = [
      {
        id: 1,
        username: 'a',
      },
      {
        id: 2,
        username: 'b',
      },
      {
        id: 3,
        username: 'c',
      },
      {
        id: 1,
        username: 'a',
      },
      {
        id: 3,
        username: 'c',
      },
    ];

    // TODO: do something here
    const uniqueUsers = users.filter((user, index) => {
      const firstMatchUserIndex = users.findIndex(
        _user => _user.id === user.id
      );
      return index === firstMatchUserIndex;
    });
    // const uniqueUsers = users.filter((user, index) => {
    //   return user.id === index + 1;
    // });
    expect(uniqueUsers).toEqual([
      {
        id: 1,
        username: 'a',
      },
      {
        id: 2,
        username: 'b',
      },
      {
        id: 3,
        username: 'c',
      },
    ]);
  });

  it('gets movie titles before 2020 that starts with "A"', () => {
    const movies = [
      {
        title: 'Frozen',
        actors: ['Kristen Bell', 'Idina Menzel', 'Josh Gad'],
        year: 2013,
      },
      {
        title: 'A Quiet Place',
        actors: [
          'Emily Blunt',
          'John Krasinski',
          'Millicent Simmonds',
          'Noah Jupe',
        ],
        year: 2018,
      },
      {
        title: 'Enola Holmes',
        actors: ['Millie Bobby Brown', 'Henry Cavill'],
        year: 2020,
      },
    ];
    // TODO: do something here
    const movieTitles = movies
      .filter(movie => movie.year < 2020 && movie.title.startsWith('A'))
      .map(movie => movie.title);
    // const movieTitles = movies
    //   .map(movie => {
    //     if (movie.year < 2020 && movie.title.startsWith('A')) {
    //       return movie.title;
    //     }
    //   })
    //   .filter(Boolean);
    expect(movieTitles).toEqual(['A Quiet Place']);
  });
});
