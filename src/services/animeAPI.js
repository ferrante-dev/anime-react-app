const API_URL = "https://graphql.anilist.co";

const LIST_QUERY = `
  query ($search: String) {
    Page(page: 1, perPage: 24) {
      media(
        type: ANIME
        search: $search
        sort: POPULARITY_DESC
        isAdult: false
      ) {
        id
        title {
          english
          romaji
        }
        coverImage {
          extraLarge
          large
        }
        averageScore
        description(asHtml: false)
        genres
        popularity
      }
    }
  }
`;

const DETAIL_QUERY = `
  query ($id: Int!) {
    Media(id: $id, type: ANIME) {
      id
      title {
        english
        romaji
        native
      }
      coverImage {
        extraLarge
        large
      }
      bannerImage
      averageScore
      meanScore
      description(asHtml: false)
      genres
      episodes
      duration
      status
      season
      seasonYear
      format
      popularity
      favourites
      startDate {
        year
        month
        day
      }
      studios(isMain: true) {
        nodes {
          name
        }
      }
      siteUrl
    }
  }
`;

async function requestAnime(query, variables, signal) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    signal,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.errors?.[0]?.message ||
        `AniList request failed (${response.status})`,
    );
  }

  if (result.errors?.length) {
    throw new Error(result.errors[0].message);
  }

  return result.data;
}

export async function getAnime(search = "", signal) {
  const data = await requestAnime(
    LIST_QUERY,
    { search: search.trim() || null },
    signal,
  );

  return data.Page?.media || [];
}

export async function getAnimeById(id, signal) {
  const animeId = Number(id);

  if (!Number.isInteger(animeId) || animeId <= 0) {
    throw new Error("Invalid anime ID");
  }

  const data = await requestAnime(DETAIL_QUERY, { id: animeId }, signal);

  return data.Media;
}

export function animeTitle(anime) {
  return (
    anime.title?.english ||
    anime.title?.romaji ||
    anime.title?.native ||
    "Untitled anime"
  );
}

export function animeRating(score) {
  return score == null ? "Not rated" : `${(score / 10).toFixed(1)} / 10`;
}

export function cleanDescription(description) {
  if (!description) return "No description available.";

  return description
    .replace(/<br\s*\/?\s*>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}
