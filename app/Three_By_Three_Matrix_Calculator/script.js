function main() {
  // Start Page
  Operate.newPage();

  // Display some equations or formulas using KaTeX
  function matrixToKaTeX(matrix) {
    return matrix.map((row) => row.join(" & ")).join("\\\\");
  }

  Operate.newStart("Three by Three Matrix Calculator");

  // Create two 3x3 matrices
  const matrix1_w = [
    ["a", "b", "c"],
    ["d", "e", "f"],
    ["g", "h", "i"],
  ];

  const matrix2_w = [
    ["j", "k", "l"],
    ["m", "n", "o"],
    ["p", "q", "r"],
  ];

  const matrix1Text =
    "\\begin{bmatrix}" + matrixToKaTeX(matrix1_w) + "\\end{bmatrix}";
  const matrix2Text =
    "\\begin{bmatrix}" + matrixToKaTeX(matrix2_w) + "\\end{bmatrix}";

  Operate.newStep(`Matrix 1:\\ ${matrix1Text}`);
  Operate.newStep(`Matrix 2:\\ ${matrix2Text}`);

  Operate.newStart("Use ',' to split numbers");
  Operate.newInput(["matrix values 1 (9)", "matrix values 2 (9)"]).then(
    (inputData) => {
      const matrix1Values = inputData[0].split(",");
      const matrix2Values = inputData[1].split(",");

      if (matrix1Values.length !== 9 || matrix2Values.length !== 9) {
        Operate.newSolution(
          "Invalid\\ input.\\ Please\\ provide\\ 9\\ values\\ for\\ each\\ matrix\\ separated\\ by\\ commas."
        );
        return;
      }

      const matrix1 = [
        [matrix1Values[0], matrix1Values[1], matrix1Values[2]],
        [matrix1Values[3], matrix1Values[4], matrix1Values[5]],
        [matrix1Values[6], matrix1Values[7], matrix1Values[8]],
      ];

      const matrix2 = [
        [matrix2Values[0], matrix2Values[1], matrix2Values[2]],
        [matrix2Values[3], matrix2Values[4], matrix2Values[5]],
        [matrix2Values[6], matrix2Values[7], matrix2Values[8]],
      ];

      performMatrixOperations(matrix1, matrix2);
    }
  );

  function performMatrixOperations(matrix1, matrix2) {
    if (matrix1 && matrix2) {
      const additionResult = addMatrices(matrix1, matrix2);
      const subtractionResult = subtractMatrices(matrix1, matrix2);
      const multiplicationResult = multiplyMatrices(matrix1, matrix2);
      const divisionResult = divideMatrices(matrix1, matrix2);

      Operate.newSolution("Addition\\ Result:");
      Operate.newSolution(
        "\\begin{bmatrix}" + matrixToString(additionResult) + "\\end{bmatrix}"
      );
      Operate.newSolution("Subtraction\\ Result:");
      Operate.newSolution(
        "\\begin{bmatrix}" +
          matrixToString(subtractionResult) +
          "\\end{bmatrix}"
      );
      Operate.newSolution("Multiplication\\ Result:");
      Operate.newSolution(
        "\\begin{bmatrix}" +
          matrixToString(multiplicationResult) +
          "\\end{bmatrix}"
      );
      Operate.newSolution("Division\\ Result:");
      Operate.newSolution(
        "\\begin{bmatrix}" + matrixToString(divisionResult) + "\\end{bmatrix}"
      );
    } else {
      Operate.newSolution("Please\\ enter\\ valid\\ matrices.");
    }
    Operate.newRestart();
  }

  // Convert a matrix to a string
  function matrixToString(matrix) {
    return matrix.map((row) => row.join(" & ")).join("\\\\");
  }

  // Add two matrices
  function addMatrices(matrix1, matrix2) {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        row.push(Number(matrix1[i][j]) + Number(matrix2[i][j]));
      }
      result.push(row);
    }
    return result;
  }

  // Subtract two matrices
  function subtractMatrices(matrix1, matrix2) {
    const result = [];

    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        row.push(matrix1[i][j] - matrix2[i][j]);
      }
      result.push(row);
    }
    return result;
  }

  // Multiply two matrices
  function multiplyMatrices(matrix1, matrix2) {
    const result = [];

    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        let sum = 0;
        for (let k = 0; k < 3; k++) {
          sum += matrix1[i][k] * matrix2[k][j];
        }
        row.push(sum);
      }
      result.push(row);
    }
    return result;
  }

  // Divide two matrices
  function divideMatrices(matrix1, matrix2) {
    const result = [];

    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        row.push(matrix1[i][j] / matrix2[i][j]);
      }
      result.push(row);
    }
    return result;
  }
}
