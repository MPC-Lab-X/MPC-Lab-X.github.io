// Levenshtein distance algorithm
function levenshteinDistance(a, b) {
  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

// Jaro-Winkler similarity algorithm
function jaroWinklerSimilarity(s1, s2) {
  var m = 0;

  // Exit early if either are empty.
  if (s1.length === 0 || s2.length === 0) {
    return 0;
  }

  // Exit early if they're an exact match.
  if (s1 === s2) {
    return 1;
  }

  var range = Math.floor(Math.max(s1.length, s2.length) / 2) - 1,
    s1Matches = new Array(s1.length),
    s2Matches = new Array(s2.length);

  for (i = 0; i < s1.length; i++) {
    var low = i >= range ? i - range : 0,
      high = i + range <= s2.length - 1 ? i + range : s2.length - 1;

    for (j = low; j <= high; j++) {
      if (s1Matches[i] !== true && s2Matches[j] !== true && s1[i] === s2[j]) {
        ++m;
        s1Matches[i] = s2Matches[j] = true;
        break;
      }
    }
  }

  // Exit early if no matches were found.
  if (m === 0) {
    return 0;
  }

  // Count the transpositions.
  var k = (n_trans = 0);

  for (i = 0; i < s1.length; i++) {
    if (s1Matches[i] === true) {
      for (j = k; j < s2.length; j++) {
        if (s2Matches[j] === true) {
          k = j + 1;
          break;
        }
      }

      if (s1[i] !== s2[j]) {
        ++n_trans;
      }
    }
  }

  var weight = (m / s1.length + m / s2.length + (m - n_trans / 2) / m) / 3,
    l = (p = 0.1);

  if (weight > 0.7) {
    while (s1[l] === s2[l] && l < 4) {
      ++l;
    }

    weight = weight + l * p * (1 - weight);
  }

  return weight;
}

// n-gram similarity algorithm
function createNGrams(text, n) {
  const nGrams = [];
  for (let i = 0; i <= text.length - n; i++) {
    nGrams.push(text.substr(i, n));
  }
  return nGrams;
}

function calculateNGramSimilarity(text1, text2, n) {
  const nGramsText1 = createNGrams(text1, n);
  const nGramsText2 = createNGrams(text2, n);
  const setNGramsText1 = new Set(nGramsText1);
  const setNGramsText2 = new Set(nGramsText2);
  const intersection = new Set(
    [...setNGramsText1].filter((x) => setNGramsText2.has(x))
  );
  return intersection.size / Math.min(setNGramsText1.size, setNGramsText2.size);
}

// Fuzzy search algorithm
function fuzzySearchApps(
  query,
  maxDistanceLevenshtein = 3,
  minSimilarityJaroWinkler = 0.7,
  minSimilarityNGram = 0.4
) {
  const apps = APP.apps;
  const queryWords = query.toLowerCase().split(" ");
  const matchedIndexes = [];

  for (let i = 0; i < apps.length; i++) {
    const app = apps[i];
    const titleLower = app.title.toLowerCase();
    const descriptionLower = app.description.toLowerCase();

    for (let j = 0; j < queryWords.length; j++) {
      const queryWord = queryWords[j];

      // Calculate Levenshtein distance
      const levenshteinDistanceTitle = levenshteinDistance(
        queryWord,
        titleLower
      );
      const levenshteinDistanceDescription = levenshteinDistance(
        queryWord,
        descriptionLower
      );

      // Calculate Jaro-Winkler similarity
      const jaroWinklerSimilarityTitle = jaroWinklerSimilarity(
        queryWord,
        titleLower
      );
      const jaroWinklerSimilarityDescription = jaroWinklerSimilarity(
        queryWord,
        descriptionLower
      );

      // Calculate n-gram similarity
      const nGramSimilarityTitle = calculateNGramSimilarity(
        queryWord,
        titleLower,
        3
      );
      const nGramSimilarityDescription = calculateNGramSimilarity(
        queryWord,
        descriptionLower,
        3
      );

      // Add the index to the matched indexes if any of the conditions are met
      if (
        levenshteinDistanceTitle <= maxDistanceLevenshtein ||
        levenshteinDistanceDescription <= maxDistanceLevenshtein ||
        jaroWinklerSimilarityTitle >= minSimilarityJaroWinkler ||
        jaroWinklerSimilarityDescription >= minSimilarityJaroWinkler ||
        nGramSimilarityTitle >= minSimilarityNGram ||
        nGramSimilarityDescription >= minSimilarityNGram
      ) {
        matchedIndexes.push(i);
        break;
      }
    }
  }

  return matchedIndexes;
}

window.addEventListener("load", () => {
  document.getElementById("search_bar").addEventListener("input", function () {
    let result = document.getElementById("result");
    result.innerHTML = "";

    let search_index = fuzzySearchApps(
      document.getElementById("search_bar").value
    );

    function to_app(url) {
      window.location = url;
    }

    result.innerHTML = "";
    for (var i = 0; i < APP.apps.length; i++) {
      if (search_index.includes(i)) {
        let new_flow = document.createElement("div");
        new_flow.className = "flow-element";
        if (APP.apps[i].full_line == true) new_flow.className += " full-line";
        let new_img = document.createElement("img");
        new_img.src = APP.apps[i].img;
        new_flow.append(new_img);
        let new_title = document.createElement("h2");
        new_title.innerHTML = APP.apps[i].title;
        if (APP.apps[i].hot == true) {
          let new_hot = document.createElement("sup");
          new_hot.className = "hot-tag";
          new_hot.innerHTML = `&nbsp;HOT`;
          new_title.append(new_hot);
        }
        new_flow.append(new_title);
        let new_p = document.createElement("p");
        new_p.innerText = APP.apps[i].description;
        new_flow.append(new_p);
        new_flow.url = APP.apps[i].url;
        new_flow.addEventListener("click", function () {
          to_app(this.url);
        });
        result.append(new_flow);
      }
    }
  });
});
